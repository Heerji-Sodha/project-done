/**
 *
 * Header
 *
 */
import React from 'react';
import styled from 'styled-components';
import {
  Link
} from 'react-router-dom'

//import NetworkIndicator from 'components/NetworkIndicator';
import Logo from '../../components/Logo';

const HeaderWrapped = styled.header`
  transition: opacity 0.5s;
  // margin-bottom: 30px;
  // padding: 0;
  width: 100%;
  font-size: 16px;
  background-color: #dc3545;
`;

function Header(props) {
  /*
  const {
    //loading,
    //error,
    //networkName,
    //blockNumber,
    //availableNetworks,
    //onLoadNetwork,
   } = props;
   */

  const HorizontalMenuList = styled.ul`
    list-style-type: none;
    // margin: 0;
    // padding: 0;
    overflow: hidden;
    background-color: #dc3545;
  `;

  const HorizontalMenuItem = styled.li`
    float: right;
    a {
      display: block;
      color: white;
      text-align: center;
      padding: 10px 12px;
      text-decoration: none;
    }

    a:hover {
      color: #111;
    }

    .active {
      color: #222222;
    }
  `;

  return (
    <div>
    <HeaderWrapped>
        <Logo />
        <HorizontalMenuList>
            <HorizontalMenuItem>
                <Link to="/settings">Profile</Link>
            </HorizontalMenuItem>
            <HorizontalMenuItem>
                <Link to="/wallet">Wallet</Link>
            </HorizontalMenuItem>
            <HorizontalMenuItem>
                <Link to="/lists">Lists</Link>
            </HorizontalMenuItem>
            {/* <HorizontalMenuItem>
                <Link to="/chat">Chat</Link>              
            </HorizontalMenuItem> */} 
            <HorizontalMenuItem>
                <Link to="/orderlist">History</Link>              
            </HorizontalMenuItem>
        </HorizontalMenuList>
    </HeaderWrapped >
 
 </div>







  
  );
}

export default Header;