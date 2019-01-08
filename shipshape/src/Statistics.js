import React, { Component } from 'react';
import './App.css';
import style_guide from './shipshape_style';
import keys from './keys';
import DonutChart from './DonutChart';
import * as d3 from "d3";

export default class Statistics extends React.Component {
	constructor(props){
	    super(props)
	    this.state={
	    	highlightedSlice:null
	    }
	    this.data = [{name:'T',value:30},{name:'K',value:50},{name:'S',value:50}]
	    this.secondaryData = [{name:'Cool',value:13},{name:'Hot',value:55},{name:'Medium',value:31}]
	    this.mouseOver = this.mouseOver.bind(this)
	}
	mouseOver(e){
		this.setState({highlightedSlice:e.data})
	}
	render(){
		return(
			<div>
			<DonutChart data={this.data} onMouseOver={(e) => this.mouseOver(e)} onMouseLeave={(e) => this.mouseLeave(e)}/>
			
			<StatsShow highlightedSlice={this.state.highlightedSlice}/>

			<DonutChart data={this.secondaryData} onMouseOver={(e) => this.mouseOver(e)} onMouseLeave={(e) => this.mouseLeave(e)}/>
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