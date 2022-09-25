import { dolpinNetworkConfig } from 'constants/network';
import { useState } from 'react';
import { ApiPromise, WsProvider } from '@polkadot/api';
import useAsyncEffect from 'use-async-effect';
// only Dolpin testnet is supported in this demo
import { info } from 'utils/logger';

const useApi = () => {
    const [provider, setProvider] = useState(() => new WsProvider(dolpinNetworkConfig.PROVIDER_SOCKET));
    const [api, setApi] = useState<ApiPromise | null>(null);

    useAsyncEffect(async (isMounted) => {
        // there will be network request
        const apiCreated = await ApiPromise.create({ provider });

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

    return { api, setProvider };
};

export default useApi;
