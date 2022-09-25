import BN from 'bn.js';

export type IAccount = {
    name: string;
    balance: BN;
    address: string;
};