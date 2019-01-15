import React from 'react';
import './App.css';

import DonutChart from './DonutChart';


export default class Statistics extends React.Component {
	constructor(props){
	    super(props)
	    this.state={
	    	highlightedSlice:null,
	    	data:[{name:'T',value:30},{name:'K',value:50},{name:'S',value:50}] 
	    }
	    //data will need to be formatted. {name:x, value:y} even if donut chart should change.
	    //data for the new chart should be changed to that format.
	    this.secondaryData = [{name:'Cool',value:13},{name:'Hot',value:55},{name:'Medium',value:31}]
	    this.mouseOver = this.mouseOver.bind(this)
	    this.grandTotal = this.state.data.reduce((a,b) => a + b.value, 0)
	}
	mouseOver(e){
		this.setState({highlightedSlice:e.data})
	}
	componentDidMount(){
		setTimeout(()=>{
			this.setState({data:[{name:'T',value:70},{name:'K',value:10},{name:'S',value:17}]})
		},2000)
	}
	render(){
		return(
			<div>
			<DonutChart data={this.state.data} onMouseOver={(e) => this.mouseOver(e)} onMouseLeave={(e) => this.mouseLeave(e)}/>
			
			<StatsShow grandTotal={this.grandTotal} highlightedSlice={this.state.highlightedSlice}/>

			</div>
		)
	}
}

class StatsShow extends React.Component {
	constructor(props){
	    super(props)
	}
	render(){
		if (this.props.highlightedSlice){
			return(
				<div className="statistics__table">
					<table>
						<thead>
						<tr>
							<th>
								Statistics
							</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>
								Name
							</td>
						
							<td>
								{this.props.highlightedSlice.name}
							</td>
						</tr>
						<tr>
							<td>
								Value
							</td>
						
							<td>
								{this.props.highlightedSlice.value}
							</td>
						</tr>
						<tr>
							<td>
								Percent
							</td>
						
							<td>
								{`${(this.props.highlightedSlice.value/this.props.grandTotal*100).toFixed(2)}%`}
							</td>
						</tr>
						</tbody>
					</table>
				</div>
			)
		}
		else {
			return(
				<div>
					
				</div>
			)
		}
	}
}