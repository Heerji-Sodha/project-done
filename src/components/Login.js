import React, { Component } from 'react';
import styled from 'styled-components';
import firebase from '../firebase';
import InnerNav from './InnerNav';
import Fb from './images/facebook-logo.png'
import Footer from './PageFooter/index'
import Google from './images/google-plus-social-logotype.png'
import Twiter from './images/twitter-social-logotype.png'
import Logo from './images/logo.png'
import Paper from '@material-ui/core/Paper';
import api from '../api'
import ErrorBoundary from './ErrorBoundary';

const StyledLogin = styled.div`
  .App-header-login button {
    display: flex;
  }

  .App-header-login button {
    background: #e9f1df;
    width: 100px;
    font-size: 12px;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    height: 20px;
    text-align: center;
    border: none;
    background-size: 300% 100%;
    border-radius: 50px;
    moz-transition: all 0.4s ease-in-out;
    -o-transition: all 0.4s ease-in-out;
    -webkit-transition: all 0.4s ease-in-out;
    transition: all 0.4s ease-in-out;
  }
  .App-header-login button:hover {
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

  .Pre-login {
    text-align: center;
  }
`;

const StyledLoginPage = styled.div`
  text-align: center;
`;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    };

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });
      }
    });
  }

  handleChange(e) {
    /* ... */
  }

  logout() {
    firebase.auth().signOut().then(() => {
      this.setState({
        user: null
      });
    });
  }

  login(provider) {
    //var provider = new firebase.auth.GoogleAuthProvider();
    //var provider = new firebase.auth.FacebookAuthProvider();
    //var provider = new firebase.auth.TwitterAuthProvider();
    firebase.auth().signInWithPopup(provider).then(result => {
      const user = result.user;
      this.setState({
        user
      });

      /*
      firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
        // Send token to your backend via HTTPS
        // ...
        console.log("TOKENIDO:" + idToken);
        localStorage.setItem('jwt', idToken);
      }).catch(function(error) {
        // Handle error
      });
      */

      api.getCustomerData().then(dbUser => {
        console.log("here is teh DB user!");
        console.log(dbUser);
        if(dbUser.length < 1)  {
          console.log("adding new user...");
  
          const newCustomer = {
            userId: result.user.uid,
            providerId: result.user.providerId,
            displayName: result.user.displayName,
            user: result.user.email,
            cards: []
          };
          console.log(result.user);
          console.log(result.user.email);
          api.upsertCustomerData(newCustomer);
        }
      });

      /* for reference, here is what you can get from a user
      var displayName = user.displayName;
      var email = user.email;
      var emailVerified = user.emailVerified;
      var photoURL = user.photoURL;
      var isAnonymous = user.isAnonymous;
      var uid = user.uid;
      var providerData = user.providerData;
      */
    });
  }

  render() {
    return (

      <Paper style={{
        width: '100%',
        height: '100%',
        flex: 1,
        margin: "10px",
        padding: '10px',
        marginTop: 0,
        marginRight: 'auto',
        marginBottom: 0,
        marginLeft: 'auto',
        backgroundColor: "#f7f7f7"
      }}>
        <div>
          {/* <Chat /> */}
          <StyledLogin>
            {this.state.user ? (
              <ErrorBoundary>
                <InnerNav user={this.state.user} logoutFunction={this.logout} />
              </ErrorBoundary>
            ) : (
                <StyledLoginPage>
                  <img src={Logo} width="80px" style={{ marginTop: "50px" }} alt="Shopr" />
                  <div>
                    <div style={{ marginTop: "50px", marginBottom: "50px" }}>Login with one of the following:</div>
                    {
                      /* 
                    <span style={{ cursor: "pointer" }} onClick={() => this.login(new firebase.auth.FacebookAuthProvider())}><img width="40px" src={Fb} alt="facebook" /></span>
                    <span style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => this.login(new firebase.auth.TwitterAuthProvider())}><img width="40px" src={Twiter} alt="twitter" /></span>                      
                      */
                    }
                    <span style={{ marginLeft: 10, cursor: "pointer" }} onClick={() => this.login(new firebase.auth.GoogleAuthProvider())}><img width="40px" src={Google} alt="google" /></span>
                  </div>
                </StyledLoginPage>
              )}
          </StyledLogin>
          <Footer />

        </div>
      </Paper>
    );
  }
}

export default Login;
