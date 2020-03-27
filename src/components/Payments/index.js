import React, { Component } from "react";
import Wallet from '../Wallet';
import firebase from '../../firebase';
import styled from 'styled-components';
import Delete from '../images/delete.png';
import Cryptr from 'cryptr';
import api from '../../api';

/**
 * TODO
 * pass in onChange for all credit card pieces
 * fix style
 */

const StyledDelete = styled.img`
color: #f2385a;
padding-bottom: 0.5rem;
clear: all;

:hover {
  cursor: pointer;
}
`;

export default class Payments extends Component {
  constructor() {
    super();
    this.state = {
      cardNumber: '',
      expiryDate: '',
      items: [],
      cvc: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.encryptString = this.encryptString.bind(this);
    this.decryptString = this.decryptString.bind(this);
    this.updateCardState = this.updateCardState.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
    //console.log(e.target.name);
    //console.log(e.target.value);
  }

  encryptString(stringToEncrypt) {
    console.log("Encrypting...");
    const cryptr = new Cryptr('myTotalySecretKey');
    const encryptedString = cryptr.encrypt(stringToEncrypt);
    console.log(encryptedString); 
  }

  decryptString(stringToDecrypt) {
    console.log("Decrypting...");
    const cryptr = new Cryptr('myTotalySecretKey');
    const decryptedString = cryptr.decrypt(stringToDecrypt);
    console.log(decryptedString);
    return decryptedString;
  }

  handleSubmit(e) {
    e.preventDefault();
    api.getCustomerData().then(dbUser => {
      console.log("DBUser?");
      console.log(dbUser);
      const finalFo = this.state.cardNumber.substr(this.state.cardNumber.length - 4);
      const newCard = {
        cardNumber: this.state.cardNumber,
        lastFourDigits: finalFo,
        expiryDate: this.state.expiryDate,
        cvc: this.state.cvc,
      };
      dbUser[0].cards.push(newCard);

      api.replaceCustomerData(dbUser);
      this.setState({
        userData : dbUser
      });
      //this.state.userData[0].cards
      this.updateCardState();
      /*
      this.setState({
        cardNumber: '',
        expiryDate: '',
        cvc: ''
      });
      */
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

        api.getCustomerData()
          .then(json => this.setState({ userData: json }, () => { 
            console.log("mounted, get the userdata");
            console.log(this.state.userData);
            this.updateCardState();
            /*
            let newState = [];
            for(let card in this.state.userData[0].cards) {
              console.log("Here is the card...");
              console.log(card);
              newState.push({
                id: card,
                lastFourDigits: this.state.userData[0].cards[card].lastFourDigits
              });  
            }
            this.setState({
              items: newState
            });  
            */
          }))
          .catch(err => { console.log("err!" + err) });
      }
    })
  }

  removeItem(itemId) {
    console.log("remove");
    console.log(itemId);
    this.state.userData[0].cards.splice(itemId,1);
    //console.log(moreCards);
    api.replaceCustomerData(this.state.userData);
    //this.setState({ items: moreCards });
    this.updateCardState();
  }

  updateCardState() {
    console.log("UPDATEING CARD STATE");
    let newState = [];
    for(let card in this.state.userData[0].cards) {
      console.log("Here is the card...");
      console.log(card);
      newState.push({
        id: card,
        lastFourDigits: this.state.userData[0].cards[card].lastFourDigits
      });  
    }
    this.setState({
      items: newState,
      cardNumber: '',
      expiryDate: '',
      cvc: ''
    });  
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <Wallet changeFunction={
            this.handleChange
          } />
          { //this.state.userData.cards &&
          this.state.items.map(item => {
            return (
              <div>
                Card with final four digits: {item.lastFourDigits}
                <StyledDelete
                  className="delete"
                  src={Delete}
                  onClick={() => this.removeItem(item.id)}
                  alt="delete item"
                />
              </div>
            );
          })}
          <button className="Add">Add Payment Method</button>
        </form>
        <br />
        {/* <BotomNbar/> */}
      </div>
    );
  }
}