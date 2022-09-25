import { useState } from 'react';
import { Unsubcall } from '@polkadot/extension-inject/types';
import { useAsyncEffect } from 'use-async-effect';
import { info, warn } from 'utils/logger';
import useApi from './useApi';
import { isExtensionReady } from 'utils/extension';
import { IBlock } from 'types/Block';

type IUseBlockProps = {
    limit?: number;
}

let unsubsribeBlocks: Unsubcall | null = null;

const useBlocks = ({ limit }: IUseBlockProps) => {
    const [blocks, setBlocks] = useState<IBlock[]>([]);
    const { api } = useApi();

    useAsyncEffect(async (isMounted) => {
        if (!api) {
            warn(`api is not ready`);
            return;
        }
        if (!(await isExtensionReady())) {
            warn('no extension detected');
            return;
        }

        unsubsribeBlocks && unsubsribeBlocks();
        unsubsribeBlocks = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
            console.log(`last block #${lastHeader.number} has hash ${lastHeader.hash}`);
            console.log({ blocks }, limit);
            const currentBlocks = [
                ...blocks,
                {
                    blockNumber: lastHeader.number.toNumber(),
                    hash: lastHeader.hash.toString(),
                }
            ];
            if (isMounted()) {
                setBlocks(limit ? currentBlocks.slice(0, limit) : currentBlocks);
            }
        });
    }, () => {
        info('unsubsribe blocks!');
        unsubsribeBlocks && unsubsribeBlocks();
    }, [api]);

    return { blocks };
};

export default useBlocks;
