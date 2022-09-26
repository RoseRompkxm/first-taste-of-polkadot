import React from 'react';
import { IBlock } from 'types/Block';
import { makeBlockLinkWithHash, shortifyAddress } from 'utils/string';
import BlockStyle from './styles/BlockStyle';

const Block = (block: IBlock) => {
    return <BlockStyle>
        <a className="block" href={makeBlockLinkWithHash(block.hash)}
            target="_blank" rel="noreferrer">
            <div className="block-number">#{block.number}</div>
            <div className="block-hash">{shortifyAddress(block.hash, 16, 16)}</div>
        </a>
    </BlockStyle>;
};

export default Block;
