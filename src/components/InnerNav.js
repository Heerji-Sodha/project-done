import React, { Component } from 'react';
import {
    Route, Switch
  } from "react-router-dom";
import Chat from './Chat';
import ListApp from './ListApp';
import Payments from './Payments';
import Settings from './Settings';
import OrderHistory from './OrderHistory'

class InnerNav extends Component {
    render() {
        return (
            <div className="container">
                <Switch>
                    <Route path="/oderhistory" render={()=><Settings user={this.props.user}/>}  />
                    <Route path="/chat" render={()=><Chat user={this.props.user}/>} />
                    <Route path="/wallet" render={()=><Payments user={this.props.user}/>} />
                    <Route path="/settings" render={()=><Settings user={this.props.user}/>}  />
                    <Route path="/lists" render={()=><ListApp user={this.props.user}/>}/>
                    <Route path="/orderlist" render={()=><OrderHistory user={this.props.user}/>}/>
                    <Route path="/" render={()=><ListApp user={this.props.user}/>}/>
                </Switch>
            </div>
        );
    }
}

export default InnerNav;
