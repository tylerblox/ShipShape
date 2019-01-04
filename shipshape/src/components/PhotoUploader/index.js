import React, { Component } from 'react';
export default class PhotoUploader extends React.Component{
 render() {
   return(
     <div className="well" style={{paddingBottom:'15px',
                 width:'75%',
                 margin:'auto'
                 }}>
       <button className="btn btn-success"style={{'padding':'15px','display':'inline-block'}}>
         Compare your BUTT!
       </button>
       <img src={this.props.photo} style={{
           'display':'inline-block',
           'height':'150px',
         }}/>
     </div>
   )
 }
}