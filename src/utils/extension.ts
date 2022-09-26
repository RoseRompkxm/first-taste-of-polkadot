import { APP_NAME } from 'constants/app';
import { web3Enable } from '@polkadot/extension-dapp';
import { error, warn } from 'utils/logger';

// periodically run to check whether the extension is ready or not
// !!! It's really shitty for Polkadot.js to have no `isReady` listeners injected into webpage for ppl to use !!!!
let timer = 0;
let retryTime = 0;
const MAX_RETRY = 5;
const RETY_INTERVAL = 500;

const clear = () => {
    timer && window.clearInterval(timer);
    timer = 0;
};

export const isExtensionReady = async (): Promise<boolean> => {
    if (timer) {
        return false;
    }
    return new Promise((resolve, reject) => {
        timer = window.setInterval(async () => {
            const extensions = await web3Enable(APP_NAME);
            if (extensions.length > 0) {
                warn(`connected to extension the ${retryTime + 1} times`, timer);
                clear();
                resolve(true);
            } else {
                if (retryTime >= MAX_RETRY) {
                    clear();
                    reject(false);
                    error('cannot connect to extension after trying several times');
                }
                retryTime++;
                warn(`try to connect to extension the ${retryTime + 1} times`, timer);
            }
        }, RETY_INTERVAL);

    });
};
