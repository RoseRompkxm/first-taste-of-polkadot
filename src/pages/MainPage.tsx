import React from 'react';
import useAccounts from 'hooks/useAccounts';
import List from 'components/List';
import Account from 'components/Account';
import MainPageStyle from 'components/styles/MainPageStyle';
import useBlocks from 'hooks/useBlocks';
import Block from 'components/Block';

export default function MainPage() {
    const { accounts } = useAccounts();
    const { blocks } = useBlocks({ limit: 20 });
    const accountsWithId = accounts.map(account => {
        return {
            ...account,
            id: account.address,
        };
    });
    const blocksWithId = blocks.map(block => {
        return {
            ...block,
            id: block.hash,
        };
    });
    return (
        <MainPageStyle>
            <div className="container">
                <div className="section">
                    <h3>Recent Blocks</h3>
                    {accounts.length === 0
                        ? 'No blocks'
                        : <List items={blocksWithId} render={(index) => {
                            return <Block {...blocks[index]} />;
                        }} />
                    }
                </div>
                <div className="section">
                    <h3>Accounts</h3>
                    {accounts.length === 0
                        ? 'No account'
                        : <List items={accountsWithId} render={(index) => {
                            return <Account {...accounts[index]} />;
                        }} />
                    }
                </div>
            </div>
        </MainPageStyle>
    );
}
