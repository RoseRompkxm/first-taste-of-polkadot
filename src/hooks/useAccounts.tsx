import { useState } from 'react';
import BN from 'bn.js';
import { toast } from 'react-toastify';
import { web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { Unsubcall, InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useAsyncEffect } from 'use-async-effect';
import { info, warn } from 'utils/logger';
import useApi from './useApi';
import { IAccount } from 'types/Account';
import { isExtensionReady } from 'utils/extension';

// unsubsribe calls
let unsubsribeAccount: Unsubcall | null = null;
let unsubsribeBalance: Unsubcall | null = null;

const useAccounts = () => {
    const [rawAccounts, setRawAccounts] = useState<InjectedAccountWithMeta[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);

    const { api } = useApi();

    // fetch initial accounts and subscribe account listener
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            warn(`api is not ready`);
            return;
        }
        if (!(await isExtensionReady())) {
            warn('no extension detected');
            return;
        }

        // avoid old subscriptions come to play
        unsubsribeAccount && unsubsribeAccount();

        unsubsribeAccount = await web3AccountsSubscribe(async (injectedAccounts) => {
            console.log('=== update accounts!');
            if (isMounted()) {
                setRawAccounts(injectedAccounts);
            }
        });
    }, () => {
        info('unsubsribe account listener!');
        unsubsribeAccount && unsubsribeAccount();
    }, [api]);

    // patch accounts data
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            warn(`api is not ready`);
            return;
        }

        if (isMounted()) {
            setAccounts(rawAccounts.map((account, i) => ({
                name: account.meta.name || '',
                address: account.address,
                balance: new BN(0),
            })));
        }
        
    }, [api, rawAccounts])

    // subscribe balance listener
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            warn(`api is not ready`);
            return;
        }
        if (!(await isExtensionReady())) {
            warn('no extension detected');
            return;
        }
        if (!rawAccounts.length) {
            warn('no accounts');
            return;
        }

        // avoid old subscriptions come to play
        unsubsribeBalance && unsubsribeBalance();

        unsubsribeBalance = await api.query.system.account.multi(rawAccounts.map(account => account.address), (dataItems) => {
            console.log('== updated balance', dataItems.length);
            if (!isMounted()) {
                return;
            }

            // @ts-ignore
            const newBalances = dataItems.map(({ data: { free: balance } }) => balance);
            setAccounts(rawAccounts.map((account, i) => ({
                name: account.meta.name || '',
                address: account.address,
                balance: newBalances[i],
            })));
        });
    }, () => {
        info('unsubsribe balance listener!');
        unsubsribeBalance && unsubsribeBalance();
    }, [api, rawAccounts]);

    return { accounts };
}

export default useAccounts;

