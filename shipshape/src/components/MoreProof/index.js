import React, { Component } from 'react';
export default function MoreProof(props){
     return(<button className="btn btn-primary" onClick={()=>{props.addProof()}}>
         RENDER MORE PICTURES
       </button>
     )
}
