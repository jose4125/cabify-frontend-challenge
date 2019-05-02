import React, { Component } from 'react';

export const CardContext = React.createContext();

class CardProvider extends Component {
  state = {
    fullName: '',
    jobDescription: '',
    prefix: '',
    phoneNumber: '',
    email: '',
    website: '',
    address: ''
  };

  render() {
    return (
      <CardContext.Provider
        value={{
          state: this.state,
          handleChange: (value, key) => this.setState({ [key]: value }),
          handlePrefix: prefix => {
            this.setState({ prefix });
          },
          handleReset: prefix => {
            this.setState({
              fullName: '',
              jobDescription: '',
              prefix: prefix,
              phoneNumber: '',
              email: '',
              website: '',
              address: ''
            });
          }
        }}
      >
        {this.props.children}
      </CardContext.Provider>
    );
  }
}

export default CardProvider;
