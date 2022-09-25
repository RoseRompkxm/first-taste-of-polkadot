import React from 'react';
import useAccounts from 'hooks/useAccounts';
import List from 'components/List';
import Account from 'components/Account';

export default function MainPage() {
    const { accounts } = useAccounts();
    console.log(accounts);
    const accountsWithId = accounts.map(account => {
        return {
            id: account.address,
            ...account,
        }
    });
    return (
        <div className="container">
            <div className="section">
                <h3>Recent Blocks</h3>
                {accounts.length === 0
                    ? 'No blocks'
                    : <List items={[]} render={() => null} />
                }
            </div>
            <div className="section">
                <h3>Accounts</h3>
                {accounts.length === 0
                    ? 'No account'
                    : <List items={accountsWithId} render={(index) => {
                        return <Account {...accounts[index]} />
                    }} />
                }
            </div>
        </div>
    );
}
