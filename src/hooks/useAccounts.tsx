import React, { useState } from 'react';
import BN from 'bn.js';
import { toast } from 'react-toastify';
import { web3Enable, web3AccountsSubscribe } from '@polkadot/extension-dapp';
import { Unsubcall, InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { useAsyncEffect } from 'use-async-effect';
import { info, warn } from 'utils/logger';
import useApi from './useApi';
import { IAccount } from 'types/Account';
import { APP_NAME } from 'constants/app';

// unsubsribe calls
let unsubsribeAccount: Unsubcall | null = null;
let unsubsribeBalance: Unsubcall | null = null;

export default () => {
    const [rawAccounts, setRawAccounts] = useState<InjectedAccountWithMeta[]>([]);
    const [accounts, setAccounts] = useState<IAccount[]>([]);
    const [extensionReady, setExtensionReady] = useState<boolean>(false);

    const { api } = useApi();

    // compute extensionReady 
    useAsyncEffect(async () => {
        const extensions = await web3Enable(APP_NAME);
        setExtensionReady(extensions.length > 0);
    }, [web3Enable]);

    // fetch initial accounts and subscribe account listener
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            toast.warn(`api is not ready`);
            return;
        }
        if (!extensionReady) {
            toast.warn('no extension detected');
            return;
        }

        if (!isMounted()) {
            warn('comp unmounted');
            return;
        }

        // avoid old subscriptions come to play
        unsubsribeAccount && unsubsribeAccount();
        unsubsribeAccount = await web3AccountsSubscribe(async (injectedAccounts) => {
            console.log('=== update accounts!');
            setRawAccounts(injectedAccounts);
        });
    }, () => {
        info('unsubsribe account listener!');
        unsubsribeAccount && unsubsribeAccount();
    }, [api, extensionReady]);

    // patch accounts data
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            toast.warn(`api is not ready`);
            return;
        }
        if (!isMounted()) {
            return;
        }
        
        setAccounts(rawAccounts.map((account, i) => ({
            name: account.meta.name || '',
            address: account.address,
            balance: new BN(0),
        })));
    }, [api, rawAccounts])

    // subscribe balance listener
    useAsyncEffect(async (isMounted) => {
        if (!api) {
            toast.warn(`api is not ready`);
            return;
        }
        if (!extensionReady) {
            toast.warn('no extension detected');
            return;
        }
        if (!rawAccounts.length) {
            toast.warn('no accounts');
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
    }, [api, rawAccounts, extensionReady]);

    return { accounts };

}
