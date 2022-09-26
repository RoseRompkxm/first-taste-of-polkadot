import React from 'react';
import BigNumber from 'bignumber.js';
import Identicon from '@polkadot/react-identicon';
import { IAccount } from 'types/Account';
import { shortifyAddress } from 'utils/string';
import AccountStyle from './styles/AccountStyle';


const Account = (account: IAccount) => {
    const balanceString = new BigNumber(account.balance.toString()).div(1e18).toFixed(4);
    return <AccountStyle>
        <a className="account">
            <div className="account-icon">
                <Identicon
                    value={account.address}
                    size={28}
                    theme={'polkadot'}
                />
            </div>
            <div className="account-name">{account.name}</div>
            <div className="account-address">{shortifyAddress(account.address, 16, 16)}</div>
            <div className="account-balance">{balanceString} DOL</div>
        </a>
    </AccountStyle>;
};

export default Account;
