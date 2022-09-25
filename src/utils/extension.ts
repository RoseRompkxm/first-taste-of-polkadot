import { web3Enable } from '@polkadot/extension-dapp';
import { APP_NAME } from 'constants/app';

export const isExtensionReady = async () => {
    const extensions = await web3Enable(APP_NAME);
    return extensions.length > 0;
}
