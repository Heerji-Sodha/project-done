import React, { Component } from 'react';
import firebase from '../firebase';
import StyledList from './styles/StyledList';
import ListItem from './ListItem';
import styled from 'styled-components';
import Delete from './images/delete.png';
import Paper from '@material-ui/core/Paper';
import './listApp.css';
import api from '../api';
// import message from './../components/images/questionmark.png'
import { Link } from 'react-router-dom';
import { Widget ,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';


const StyledDelete = styled.img`
  color: #f2385a;
  padding-bottom: 0.5rem;

  :hover {
    cursor: pointer;
  }
`;

const StylishButton = styled.button`
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
  width: 100%;

  border-radius: 50px;
  moz-transition: all 0.4s ease-in-out;
  -o-transition: all 0.4s ease-in-out;
  -webkit-transition: all 0.4s ease-in-out;
  transition: all 0.4s ease-in-out;
`;

class ListApp extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: '',
      username: '',
      items: [],
      strikethrough: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // documentation here: https://firebase.google.com/docs/database/admin/retrieve-data
    console.log("MOUNT POINT...");

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

        api.getItemsForCustomer('')
        .then(json => this.setState({ items: json }, () => { console.log('state:' + this.state)}))
        .catch(err => { 
          console.log("err!" + err);
          // this.setState({ items: {}});
        });
      }
      else {
        this.props.history.push("/")
      }
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    console.log("submit called...");
    e.preventDefault();
    const items = this.state.items;

    const item = {
      title: this.state.currentItem,
      user: this.state.user.email,
      userId: this.state.user.uid,
      dateAdded: Date(),
      status: 'queue'
    };

    console.log("CALLING UPSERT...");
    items.push(item);
    api.upsert(item);

    this.setState({
      currentItem: '',
      username: this.state.user.email,
      items: items
    });
  }

  removeItem(item) {
    console.log("REMOVING ITEM ID:" + item.id);
    api.destroy(item);
    const items = this.state.items;
    var index = items.indexOf(item);
    if (index !== -1) items.splice(index, 1);
    this.setState({ items: items })
  }

  triggerShop() {
    console.log("TRIGGERING SHOP");
    const items = this.state.items;
    const newItems = [];
    var item;
    for(item of items) {
      const newItem = {
        title: item.title,
        user: item.user,
        status: 'shop',
        dateAdded: item.dateAdded,
        id: item.id,
        _rid: item._rid,
        _self: item._self,
        _etag: item._etag, 
        _attachments: item._attachments, 
        _ts: item._ts
      };
      newItems.push(newItem);
      console.log("NEW ITEMS");
      console.log(newItems);
      api.replace(newItem);
    }
    this.setState({ items: newItems });

  }

  render() {
    return (
      <div>
        <StyledList>
          <center>
            <h3>Shopping List</h3>
            <section className="add-item">
              <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  name="currentItem"
                  placeholder="What can I get you today?"
                  onChange={this.handleChange}
                  value={this.state.currentItem}
                  required={true}
                  style={{ width: '100%', borderRadius: '50px', border: 'none', outline: "none" }}
                />
                <p />
                <br />
                <button style={{ width: '100%' }}>Add</button>
              </form>
            </section>
          </center>
          <section className="display-item" style={{ marginTop: '30px', width: '100%', margin: "0 auot", height: 'auto' }}>
            <div className="wrapper">
              <ul>
                {this.state.items.map(item => {
                  return (
                    <li key={item.id}>
                      { /*item.bgcolor = (item.status == 'shop') ? 'blue' : 'white'*/ }
                      <Paper style={{  padding: "10px", backgroundColor: (item.status === 'shop') ? '#f1f8e9' : 'white' }}>
                        <StyledDelete
                          src={Delete}
                          onClick={() => this.removeItem(item)}
                          alt="delete item"
                          id="dlet"
                          style={{ float: "right" }}
                        />
                        <h1>
                          <ListItem message={item.title} style={{ fontWeight: "bold" }} />
                        </h1>
                        <p>Date Added: {item.dateAdded} {/*.format('MM dd YYYY h:mm')*/}</p>
                      </Paper>
                    </li>
                  );
                })}
              </ul>

              
              <StylishButton onClick={()=>this.triggerShop()}>Shop!</StylishButton>
            </div>
          </section>
          {/* <Link to="/chat">
             */}
          {/* <img src = {message} style = {{height:'70px' , width : "80px" ,float : "right" , display: "fixed" ,marginTop:'90px'} }/> */}
          {/* </Link> */}
          <div className="App">
        <Widget
            handleNewUserMessage={this.newMessage}
                // username={this.state.user.userId}
        />
     </div>
        </StyledList>
      </div>
    );
  }
}

export default ListApp;
