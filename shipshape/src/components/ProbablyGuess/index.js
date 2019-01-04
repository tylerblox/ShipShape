import React, { Component } from 'react';
export default class ProbablyGuess extends React.Component {
  render(){
    return(
      <div>
        <h3 style={{color:'white'}}>
          ITS PROBABLY:
        </h3>
        {this.props.guess}
      </div>)
  }
}