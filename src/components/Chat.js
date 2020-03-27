import { DirectLine } from 'botframework-directlinejs';
import React from 'react';
import ReactWebChat from 'botframework-webchat';
// import ReactWebChat, { createDirectLine } from 'botframework-webchat';
import firebase from './../firebase'
import './style.css'

import { Widget ,addResponseMessage} from 'react-chat-widget';
import 'react-chat-widget/lib/styles.css';

/*
const styleOptions = {
  bubbleBackground: 'rgba(0, 0, 255, .1)',
  bubbleFromUserBackground: 'rgba(0, 255, 0, .1)'
};
*/
export default class extends React.Component {
  constructor(props) {
    super(props);

    //const subscriptionKey = 'd7a157d6445848788b229cee8f130e5f';
    //this.webSpeechPonyfillFactory = new CognitiveServicesBingSpeechPonyfillFactory({ subscriptionKey });

    this.state = {
      directLine: null,
      webSpeechPonyfill: null,

    };
  }

  componentDidMount() {
    // this.fetchToken();
    this.setDirectLine();
    this.fetchSpeechPonyfill();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ user });

      }
      else {
        this.props.history.push("/")
      }
    });

      addResponseMessage("Welcome to  Usere!");
  }
  handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    addResponseMessage(newMessage);
  }
 
  async fetchSpeechPonyfill() {
    this.setState({
      webSpeechPonyfill: await window.WebChat.createCognitiveServicesSpeechServicesPonyfillFactory({
        subscriptionKey: process.env.REACT_APP_CHAT_SUBSRIPTION_KEY, region: process.env.d7a157d6445848788b229cee8f130e5f, textNormalization: 'lexical'
      })
    });
    //subscriptionKey: 'd7a157d6445848788b229cee8f130e5f', region: 'westus', textNormalization: 'lexical'

  }
  async setDirectLine() {
    //to load a specific conversation, add the following to the direct line
    // , conversationId: 'BxnJHcNz70AHxLkhJxm2n0-o', webSocket:false
    //this.state.directLine = new DirectLine({ token: 'L-QtvwFPEbM.iIbv6FNOOJeydKbF_CGJSlQwKehRtIsQdmn8mlFMtLs' });
    this.state.directLine = new DirectLine({ token: process.env.REACT_APP_DIRECT_LINE_TOKEN });
    const botConnection = this.state.directLine;

    botConnection.connectionStatus$.subscribe(function (connectionStatus) {
      switch (connectionStatus) {
        case 2:
          console.log("Conversation Id:" + botConnection.conversationId + " and watermark: " + botConnection.watermarkId);
      }
    });
  }

  async fetchToken() {
    const res = await fetch('https://shprotobot.azurewebsites.net/directline/token', { method: 'POST' });
    const { token } = await res.json();
    this.setState(() => ({
      // directLine: createDirectLine({ token })
    }));

  }

  render() {
    console.log(this.props)
    return (
      this.state.directLine && this.state.user && this.state.webSpeechPonyfill ?
        // <div>
        //   <ReactWebChat
        //     directLine={this.state.directLine}
        //     webSpeechPonyfillFactory={this.state.webSpeechPonyfill}
        //   />
        // </div>
        <div className="App">
        <Widget
            handleNewUserMessage={this.newMessage}
                username={this.state.user.userId}
        />
     </div>
        :
        <div>Connecting to bot&hellip;</div>
    );
  }
}