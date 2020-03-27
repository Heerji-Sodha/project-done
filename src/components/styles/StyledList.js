import styled from 'styled-components';

const StyledList = styled.div`
  // background: #e9f1df;
  min-height: 100vh;
  padding: 0 1rem;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;

  .add-item {
    padding: 1rem;
  }

  .add-item input {
    width: 70%;
    padding: 12px;
    border-radius: 8px;
  }
  .add-item input:nth-child(1) {
    margin-bottom: 8px;
  }

  .add-item button {
    background: #f2385a;
    width: 150px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
    cursor: pointer;
    height: 55px;
    text-align: center;
    border: none;
    background-size: 300% 100%;

    border-radius: 50px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .add-item button:hover {
    opacity: 0.75;
    background-position: 100% 0;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }

  .add-item button:focus {
    outline: none;
  }

  .display.item {
    display: flex;
  }

  .display-item h3 {
    margin: 0;
  }

  .display-item ul {
    margin: 0;
    // background: #fff;
    border: 0px #fff solid;
    border-radius: 8px;
    padding: 1rem;
    padding-top: 0.5rem;
    list-style: none;
  }

  .display-item li {
    margin: 0;
    padding: 0;
  }

  .display-item-p {
    padding-top: 0.25rem;
    margin-top: 0.25rem;
  }

  .list-item {
    font-size: 30px;
  }
  .list-item.check-off {
    font-size: 25px;
  }


  .wrapper li {
    padding-top: 0.5rem;
  }

  .display-item-p {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  hr {
    margin-block-start: 0;
    margin-block-end: 0;
    margin: 0;
    padding: 0;
  }
`;

export default StyledList;
