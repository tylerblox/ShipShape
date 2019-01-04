import React, { Component } from 'react';
import './App.css';
import style_guide from './shipshape_style';
import keys from './keys';
import ProbablyGuess from './components/ProbablyGuess'
import MoreProof from './components/MoreProof'
import PhotoUploader from './components/PhotoUploader'
import ComparePhotos from './components/ComparePhotos'

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




class App extends React.Component{
   constructor(props){
    super(props)
    this.state={
      searchThumbnail:'butt',
      photo:'url',
      allImg:{
        row:{
          0:{
            images:['']
          },
          1:{
            images:['']
          }
        }
      },
      offset:0,
      upperBound:4
    }
    this.componentReload = this.componentReload.bind(this)
    this.renderMoreProof = this.renderMoreProof.bind(this)
    this.fetchSearchThumbnail = this.fetchSearchThumbnail.bind(this)
    this.fetchRowMatches = this.fetchRowMatches.bind(this)
    this.fetchSecondRowMatches = this.fetchSecondRowMatches.bind(this)
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
    this.fetchRowMatches()
    this.fetchSecondRowMatches()
  }
  fetchSearchThumbnail = ()=>{
    console.log('starting to fetch search thumbnail')
    fetch('https://www.googleapis.com/books/v1/volumes?q=' + this.state.searchThumnail)
      .then((data)=> data.json())
      .then((jsondata)=>jsondata['items'][0].volumeInfo.imageLinks.thumbnail)
      .then(info=>{
        let k={}
        k.src=info
        this.setState({photo:k.src})
      })
  }
  fetchRowMatches = (term='ass',row=0)=>{
  const currState = this.state
  window.setTimeout(()=>{
      console.log('fetch row' + row)
      fetch('https://www.googleapis.com/books/v1/volumes?q='+ term +'&maxResults=40')
        .then((data)=> data.json())
        .then((jsondata)=>{
          let c=jsondata['items'].slice(currState.offset,currState.upperBound)
          return c.map((item)=>item.volumeInfo.imageLinks.thumbnail)})
        .catch((err)=>console.log(err))
        .then(info=>{
          this.setState((function statify(){
            let prevState=currState
            let newState = Object.assign({},prevState)
            newState.allImg.row[row].images = info
            return {allImg:newState.allImg}
        }()));
        })
    },0)
  }
  fetchSecondRowMatches = (term='hole',row=1)=>{
    this.fetchRowMatches(term,row)
  }

  componentDidMount(){
    this.fetchSearchThumbnail()
    this.fetchRowMatches()
    this.fetchSecondRowMatches()  
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
        <ComparePhotos photos={this.state.allImg.row[0].images}/>
        <ComparePhotos photos={this.state.allImg.row[1].images}/>
        <ProbablyGuess guess={'this will eventually be a best guess based on image recognition of what your rash actually is.'}/>
      </div>
    );
    } 
}


export default App;
