export const shortifyAddress = (addr: string, front: number = 8, back: number = 6) => {
    return `${addr.slice(0, front)} ... ${addr.slice(addr.length - back)}`;
};

export const makeBlockLinkWithHash = (hash: string) => {
    return `https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fws.rococo.dolphin.engineering#/explorer/query/${hash}`;
};

