import styled from 'styled-components';

export default styled.div`
  .block {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: .3rem;
    justify-content: space-between;
  }
  .block-number {
    font-size: 1.5rem;
  }
  .block-hash {
    flex: 1;
    text-align: right;
  }
`;
