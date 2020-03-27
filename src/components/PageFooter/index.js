import React from 'react';
import styled from 'styled-components';

const height = 60;

const Footer = styled.div`
  height: ${`${height}px`};
  @media only screen and (min-device-width : 300px) and (max-device-width : 768px) {
    height: ${`${80 + height}px`};
  }
  textAlign: center;
  background: #efeeee;
  color: #5a5a5a;
  padding: 10px;
  font-size: 14px;
  margin-top:50px;
`;

function PageFooter() {
  return (

    <center>
    <Footer>
        &copy; 2020 Shopr
    </Footer>
    </center>
  );
}

PageFooter.propTypes = {

};

export default PageFooter;
