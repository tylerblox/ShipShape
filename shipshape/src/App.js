import React, { Component } from 'react';
import './App.css';
import style_guide from './shipshape_style';
import keys from './keys';
const testGoogle = function(){
  const googleCxId = keys.googleCxId
  const googleKey = keys.googleApiKey

  fetch('https://www.googleapis.com/customsearch/v1?key=+'+ googleKey +'&cx='+ googleCxId +'&q=ass\u0020rash&num=10&searchType=image')
  .then((response)=> response.json())
  .then((jsonInformation)=> console.log(jsonInformation))
}
testGoogle()

const MainDivStyle={width:'90%',
                   margin:'auto',
                   backgroundColor:style_guide.darkGrey,
                   color:'white',
                   padding:'15px'
                   }
function MoreProof(props){
     return(<button className="btn btn-primary" onClick={()=>{props.addProof()}}>
         RENDER MORE PICTURES
       </button>
     )
}
class ProbablyGuess extends React.Component {
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

class PhotoUploader extends React.Component{
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

class ComparePhotos extends React.Component{
  render(){
    let pics = this.props.photos
    .map((photo)=> <img src={photo} style={{display:'inline-block',padding:'10px'}} />)
    return(<ul>{pics}</ul>)
  }
}

class App extends React.Component{
   constructor(props){
    super(props)
    this.state={
      photo:'url',
      allImg:[''],
      allImg2:[],
      offset:0,
      upperBound:4
    }
  }
  renderMoreProof=(prev_o,prev_u)=>{
  console.log(prev_o)
    this.setState({
      offset:prev_o + 4,
      upperBound:prev_u + 4
    })
    this.componentReload()
  }
  componentReload(){
    console.log('REFRESH!')
    fetch('https://www.googleapis.com/books/v1/volumes?q=ass&maxResults=40')
    .then((data)=> data.json())
    .then((jsondata)=>{
        let c=jsondata['items'].slice(this.state.offset,this.state.upperBound)
        return c.map((item)=>item.volumeInfo.imageLinks.thumbnail)
        })
    .then(info=>{
        this.setState({allImg:info})}
    )
   console.log('fetch AGIN MOAR')
   fetch('https://www.googleapis.com/books/v1/volumes?q=hole&maxResults=40')
     .then((data)=> data.json())
     .then((jsondata)=>{
       let c=jsondata['items'].slice(this.state.offset,this.state.upperBound)
       return c.map((item)=>item.volumeInfo.imageLinks.thumbnail)})
     .then(info=>{
       this.setState({allImg2:info})
       }
     )
}
  componentDidMount(){
    console.log('starting to fetch')
    fetch('https://www.googleapis.com/books/v1/volumes?q=butt')
      .then((data)=> data.json())
      .then((jsondata)=>jsondata['items'][0].volumeInfo.imageLinks.thumbnail)
      .then(info=>{
        let k={}
        k.src=info
        this.setState({photo:k.src})
      })
    window.setTimeout(()=>{
      console.log('starting to fetch again!')
      fetch('https://www.googleapis.com/books/v1/volumes?q=ass')
        .then((data)=> data.json())
        .then((jsondata)=>{
          let c=jsondata['items'].slice(this.state.offset,this.state.upperBound)
          return c.map((item)=>item.volumeInfo.imageLinks.thumbnail)})
        .then(info=>{
          this.setState({allImg:info})
        })
    },500)
window.setTimeout(()=>{
    console.log('fetch Moar')
    fetch('https://www.googleapis.com/books/v1/volumes?q=hole')
      .then((data)=> data.json())
      .then((jsondata)=>{
        let c=jsondata['items'].slice(this.state.offset,this.state.upperBound)
        return c.map((item)=>item.volumeInfo.imageLinks.thumbnail)})
      .then(info=>{
        this.setState({allImg2:info})
      })
    },1000)  
}
  render(props){
    return (
      <div style={{...MainDivStyle}}>
        <div className="header">
          <h1>
            <center>COMPARE YOUR BUTT</center>
          </h1>
        </div>
        <div className="aside">This goes to the side of the images</div>
        <PhotoUploader photo={this.state.photo}/>
        <MoreProof addProof=
           {()=>this.renderMoreProof(this.state.offset,this.state.upperBound)}
         />
        <ComparePhotos photos={this.state.allImg}/>
        <ComparePhotos photos={this.state.allImg2}/>
        <ProbablyGuess guess={'this will eventually be a best guess based on image recognition of what your rash actually is.'}/>
      </div>
    );
    } 
}


export default App;
