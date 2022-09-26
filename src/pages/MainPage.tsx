import React from 'react';
import useAccounts from 'hooks/useAccounts';
import List from 'components/List';
import Account from 'components/Account';
import MainPageStyle from 'components/styles/MainPageStyle';
import useBlocks from 'hooks/useBlocks';
import Block from 'components/Block';
import useApi from 'hooks/useApi';
import ErrorPage, { ErrorType } from 'components/ErrorPage';

export default function MainPage() {
    const { api, extensionReady } = useApi();
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

    if (!api) {
        return <ErrorPage errorType={ErrorType.API_CONNECTING} />;
    }
    if (!extensionReady) {
        return <ErrorPage errorType={ErrorType.NO_EXTENSION} />;
    }
    
    return (
        <MainPageStyle>
            <div className="container">
                <div className="section">
                    <h3 className="title">Recent Blocks</h3>
                    {accounts.length === 0
                        ? <div className="no-results">∅ No blocks</div>
                        : <List items={blocksWithId} render={(index) => {
                            return <Block {...blocks[index]} />;
                        }} />
                    }
                </div>
                <div className="section">
                    <h3 className="title">Accounts</h3>
                    {accounts.length === 0
                        ? <div className="no-results">∅ No accounts</div>
                        : <List items={accountsWithId} render={(index) => {
                            return <Account {...accounts[index]} />;
                        }} />
                    }
                </div>
            </div>
        </MainPageStyle>
    );
}
