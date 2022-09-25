import BN from 'bn.js';
import { DOL_DECIMAL } from 'constants/chain';
import React from 'react';
import { IAccount } from 'types/Account';


const DECIMALS = new BN(10).pow(new BN(DOL_DECIMAL));

export default (account: IAccount) => {
    return <div className="account-container">
        <div>{account.name}</div>
        <div>{account.address}</div>
        <div>{account.balance.div(DECIMALS).toString()} DOL</div>
    </div>
}
