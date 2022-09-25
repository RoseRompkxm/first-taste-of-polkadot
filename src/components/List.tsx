import React, { createRef } from 'react';
import {
    CSSTransition,
} from 'react-transition-group';

type IListProps = {
    items: {
        id: string;
        [key: string]: any;
    }[],
    render: (index: number) => React.ReactNode;
}

const List = ({ items, render }: IListProps) => {
    const itemsWithRef = items.map(item => ({
        ...item,
        nodeRef: createRef<HTMLDivElement>(),
    }));
    return <div className="list">
        {itemsWithRef.map(({ id, nodeRef }, index) => (
            <CSSTransition
                key={id}
                nodeRef={nodeRef}
                timeout={500}
                classNames="list-transition-item"
            >
                <div ref={nodeRef} className="list-item">
                    {render(index)}
                </div>
            </CSSTransition>
        ))}
    </div>;
};

export default List;
