import React, { Component } from 'react';
import firebase from '../firebase';
import Paper from '@material-ui/core/Paper';
import './listApp.css'
// import message from './../components/images/questionmark.png'

import api from '../api'

/*
const StyledDelete = styled.img`
  color: #f2385a;
  padding-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;
*/

class OrderHistory extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      strikethrough: '',
    };
  }

  componentDidMount() {
    // documentation here: https://firebase.google.com/docs/database/admin/retrieve-data

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

        api.getShoppingHistoryForCustomer(user.email)
        .then(json => this.setState({ items: json }, () => { console.log('state:' + this.state)}))
        .catch(err => { console.log("err!" + err) });
      }
      else {
        this.props.history.push("/")
      }
    })
  }

  render() {
    return (
        <div>
        <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Order History</h3>
        {this.state.items.map(item => {
            return (
                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>{item.item}</h3>
                    <span>Store: {item.pick.source}</span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>{item.pick.price}</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Purchase Date: {item.dateTime}</p>
                    <br />
                    <p style={{ display: 'inline-block' }} >Status: {item.status}</p>
                </Paper>
            );
        })}

{/* <img src = {message} style = {{height:'70px' , width : "70px" ,float : "right" , display: "fixed" ,marginTop:'340px'} }/> */}

    </div>
    );
  }
}

export default OrderHistory;
