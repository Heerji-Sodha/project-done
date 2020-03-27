import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import api from '../api'

class OrderList extends Component {
    constructor(props) {
        super();
    
        this.state = {
          checked: false
        };
    
        this.handleClick = this.handleClick.bind(this);
      }

    componentDidMount() {
        console.log("WTF ");
        //api.get()
        //.then(json => this.setState({ items: json }, () => { console.log('state:' + this.state)}))
        //.catch(err => { console.log("err!" + err) });
    }
    
    render() {
        return (
            <div>
                <h3 style={{ marginTop: '20px', textAlign: 'center' }}>Order History Here</h3>
                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>Apple </h3>
                    <span>Store: Whole Foods Market </span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>$12.98</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Date: 10/11/19 2:19 PM Est</p>
                </Paper>

                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>Apple </h3>
                    <span>Store: Whole Foods Market </span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>$12.98</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Date: 10/11/19 2:19 PM Est</p>
                </Paper>

                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>Apple </h3>
                    <span>Store: Whole Foods Market </span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>$12.98</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Date: 10/11/19 2:19 PM Est</p>
                </Paper>

                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>Apple </h3>
                    <span>Store: Whole Foods Market </span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>$12.98</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Date: 10/11/19 2:19 PM Est</p>
                </Paper>

                <Paper style={{ padding: "10px", width: '70%', margin: 'auto', marginTop: '20px', borderRadius: '20px' }}>
                    <h3>Apple </h3>
                    <span>Store: Whole Foods Market </span><span style={{ backgroundColor: 'gray', fontWeight: 'bold', float: 'right', marginTop: '10px' }}>$12.98</span>
                    <br />
                    <p style={{ display: 'inline-block' }} >Date: 10/11/19 2:19 PM Est</p>
                </Paper>
            </div>
        )
    }
}

export default OrderList;