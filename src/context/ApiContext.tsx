import { dolpinNetworkConfig } from 'constants/network';
import { ApiPromise, WsProvider } from '@polkadot/api';
import React, { ReactElement, useState } from 'react';
import useAsyncEffect from 'use-async-effect';
import { isExtensionReady } from 'utils/extension';
import { info } from 'utils/logger';

export interface ApiContextValue {
    api: ApiPromise | null;
    extensionReady: boolean;
}

export const ApiContext = React.createContext<ApiContextValue>({
    api: null,
    extensionReady: false,
});

const PROVIDER = new WsProvider(dolpinNetworkConfig.PROVIDER_SOCKET);

export const ApiProvider = ({ children }: { children: ReactElement }) => {
    const [api, setApi] = useState<ApiPromise | null>(null);
    const [extensionReady, setExtensionReady] = useState<boolean>(false);

    useAsyncEffect(async (isMounted) => {
        // there will be network request inside the creation, so we might need to add a looding status to ease ppl
        const apiCreated = await ApiPromise.create({ provider: PROVIDER });

        const [chain, nodeName, nodeVersion] = await Promise.all([
            apiCreated.rpc.system.chain(),
            apiCreated.rpc.system.name(),
            apiCreated.rpc.system.version()
        ]);

        info(`You are connected to chain ${chain} using ${nodeName} v${nodeVersion}`);

        if (!isMounted()) {
            setApi(apiCreated);
        }
    }, []);

    useAsyncEffect(async (isMounted) => {
        const result = await isExtensionReady();
        if (!isMounted()) {
            setExtensionReady(result);
        }
    }, [api]);

    return (
        <ApiContext.Provider
            value={{
                api,
                extensionReady,
            }}
        >
            {children}
        </ApiContext.Provider>
    );
};


