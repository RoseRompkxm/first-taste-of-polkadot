import { useState } from 'react';
import useApi from 'hooks/useApi';
import { Unsubcall } from '@polkadot/extension-inject/types';
import { useAsyncEffect } from 'use-async-effect';
import { info, warn } from 'utils/logger';
import { IBlock } from 'types/Block';

type IUseBlockProps = {
    limit?: number;
}

let unsubsribeBlocks: Unsubcall | null = null;

const useBlocks = ({ limit }: IUseBlockProps) => {
    const [blocks, setBlocks] = useState<IBlock[]>([]);
    const { api, extensionReady } = useApi();

    useAsyncEffect(async (isMounted) => {
        if (!api) {
            warn('api is not ready');
            return;
        }
        if (!extensionReady) {
            warn('no extension detected');
            return;
        }

        // only sub once
        if (!unsubsribeBlocks) {
            unsubsribeBlocks = await api.rpc.chain.subscribeNewHeads((lastHeader) => {
                info(`last block #${lastHeader.number} has hash ${lastHeader.hash}`);
                if (isMounted()) {
                    // to make the `blocks` is the latest reference
                    setBlocks((blocks) => {
                        const currentBlocks = [
                            ...blocks,
                            {
                                number: lastHeader.number.toNumber(),
                                hash: lastHeader.hash.toString(),
                            }
                        ];
                        return limit ? currentBlocks.slice(0, limit) : currentBlocks;
                    });
                }
            });
        } 
    }, () => {
        info('unsubsribe blocks!');
        unsubsribeBlocks && unsubsribeBlocks();
    }, [api]);

    return { blocks };
};

export default useBlocks;
