import React from 'react';
import { IBlock } from 'types/Block';

const Block = (block: IBlock) => {
    return <div className="block">
        <div>{block.number}</div>
        <div>{block.hash}</div>
    </div>;
};

export default Block;
