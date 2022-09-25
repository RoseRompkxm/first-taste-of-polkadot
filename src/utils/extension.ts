import { APP_NAME } from 'constants/app';
import { web3Enable } from '@polkadot/extension-dapp';

export const isExtensionReady = async () => {
    const extensions = await web3Enable(APP_NAME);
    return extensions.length > 0;
};
