/**
*
* Logo
*
*/

import React from 'react';
import styled from 'styled-components';
import walletLogo from './shopr-logo-raw.svg';

const Div = styled.div`
  height: 50px;
  font-size: 18px;
  // line-height: 50px; 
  color: white;
  padding: 20, 20, 20, 20;
  `;

const Img = styled.img`
  height: 50px;
  // line-height: 40px;
  width: 40px;
  margin-right: 10px;
  vertical-align: middle;
  `;

function Logo() {
  return (
    <Div>
      <Img alt="logo" src={walletLogo} />
        Shopr
    </Div>
  );
}

Logo.propTypes = {

};

export default Logo;
