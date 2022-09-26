import styled from 'styled-components';

export default styled.div`
    .account {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: .3rem;
        justify-content: space-between;
    }
    .account-icon {
        margin-right: .3rem;
    }
    .account-name {
        min-width: 5rem;
        margin: 0 .8rem 0 .5rem;
        flex: 1;
        text-align: left;
    }
    .account-address {
        margin-right: 1rem;
    }
    .account-balance {
        font-size: 1.3rem;
    }
`;
