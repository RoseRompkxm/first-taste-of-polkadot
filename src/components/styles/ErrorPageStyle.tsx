import styled from 'styled-components';

export default styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

    .loading-desc {
        font-size: 1.2rem;
        margin-top: 2rem;
    }

    .download-link {
        font-size: 1.2rem;
        display: inline-block;
        margin: 0 .2rem;
        text-decoration: underline;
    }
`;
