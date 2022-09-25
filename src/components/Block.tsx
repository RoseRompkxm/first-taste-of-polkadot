import React from 'react';
import { IBlock } from 'types/Block';

export default (block: IBlock) => {
    return <div className="block">
        <div>{block.blockNumber}</div>
        <div>{block.hash}</div>
    </div>
}
