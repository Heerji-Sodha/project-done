import React, { Component } from 'react';
import styled from 'styled-components';
const StyledItems = styled.div`
  h3:hover {
    cursor: pointer;
  }

  strike {
    color: #f2385a;
  }
`;

class ListItem extends Component {
  constructor(props) {
    super();

    this.state = {
      checked: false
    };

    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    this.setState({
      checked: !this.state.checked
    });
  }
  render() {
    let text = this.state.checked ? (
      <strike>{this.props.message}</strike>
    ) : (
        this.props.message
      );
    return (
      <div >
        <StyledItems>
          <h3 onClick={this.handleClick}>{text}</h3>
        </StyledItems>
      </div>
    );
  }
}

export default ListItem;
