import styled from 'styled-components';

export default styled.div`
  .list {
    height: 80vh;
    overflow-y: scroll;
    border-top: 1px solid #aaa;
    border-bottom: 1px solid #aaa;
  }
  .list-item {
    border: 1px solid #aaa;
    margin: 1rem .5rem;
    padding: .8rem;
    border-radius: 9px;
    box-shadow: 2px 2px 1px -1px #aaa;
    transition: .3s;
  }
  .list-item:hover {
    transform: translateX(-5px)
  }
`;
