import { DOL_DECIMAL } from 'constants/chain';
import React from 'react';
import BN from 'bn.js';
import Identicon from '@polkadot/react-identicon';
import { IAccount } from 'types/Account';
import { shortifyAddress } from 'utils/string';
import AccountStyle from './styles/AccountStyle';

const DECIMALS = new BN(10).pow(new BN(DOL_DECIMAL));

const Account = (account: IAccount) => {
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
            <div className="account-balance">{account.balance.div(DECIMALS).toString()} DOL</div>
        </a>
    </AccountStyle>;
};

export default Account;
