import React, { Component } from 'react';

export default class ComparePhotos extends React.Component{
  render(){
    let pics = this.props.photos ? this.props.photos : []
    .map((photo)=> <img src={photo} style={{display:'inline-block',padding:'10px'}} />)
    return(<ul>{pics}</ul>)
  }
}