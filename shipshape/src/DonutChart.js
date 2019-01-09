import React from 'react';
import './App.css';

import * as d3 from "d3";

// code inspired by https://www.youtube.com/watch?v=kK5kKA-0PUQ
export default class DonutChart extends React.Component{
	constructor(props){
	    super(props)
	    this.state={

	    }
	    this.input = this.props.data || [{name:'Tyler',value:30},{name:'Other',value:50},{name:'MyNameJeff',value:50},{name:'Kanye',value:50},{name:'Special',value:50}]
	    this.initialStartAngle = 0
	    this.initialEndAngle = 0
	    this.width = this.props.width ||500
	    this.height = this.props.height || this.props.width || 500
	    this.radius = this.width/2
	    this.renderChart = this.renderChart.bind(this)
	    this.pieTween = this.pieTween.bind(this)
	    this.pie = d3.pie()
			.sort(null)
			.value((d) => d.value)
		this.arc = d3.arc()
			.outerRadius(this.radius-20)
			.innerRadius(this.radius-80)
		this.labelArc = d3.arc()
			.outerRadius(this.radius-90)
			.innerRadius(this.radius-110)
		this.pathTwo = d3.arc()
  		.outerRadius(this.radius)
  		.innerRadius(this.radius - 60);

	}
	pieTween(b){
		const self = this
		b.innerRadius=0
		var i = d3.interpolate({startAngle:0,endAngle:0}, b)
		return function(t){return self.arc(i(t))};
	}
	renderChart(){
		


  // .on('mouseout', function(d) {
  //   const tooltip = d3.select('.tooltip')
  //     .style('display', 'none')
  
  //   d3.select(this)
  //     .transition()
  //     .attr('d', path);
  // });
		window.setTimeout(()=>{
			const self = this
			const color = d3.scaleOrdinal()
	    		.domain(this.input.map(d => d.name))
	    		.range(d3.quantize(t => d3.interpolateSpectral(t * 0.6 + 0.1), this.input.length).reverse())
			const svg = d3.select(document.getElementById('d-chart')).append('svg')
				.attr('width',self.width+15)
				.attr('height',self.height+10)
				.append('g')
				.attr('transform',`translate(${self.width/2+15},${self.height/2})`)
			const g = svg.selectAll('.arc')
				.data(self.pie(self.input))
				.enter().append('g')
				.attr('class','arc')
			g.append('path')
			.attr('d',self.arc)
			.on("mouseenter", (e)=>self.props.onMouseOver(e))
			.on('mouseover', function(d) {
   				 d3.select(this)
      			.transition()
      			.style('cursor', 'pointer')
      			.attr('d', self.pathTwo)
      		})
			.on('mouseout', function(d) {
    			d3.select(this)
      			.transition()
      			.attr('d', self.arc);
  			})
			.attr('id',function(d,i){return 'chart-piece-' + i})
			.style('fill',(d)=>{return color(d.data.name)})
			.style ("stroke", "white")
			.style ("stroke-width", "3px")
			.transition()
			.duration(1500)
			.ease(d3.easeBounce)
			.attrTween("d", self.pieTween)

			return new Promise((resolve) => {
				window.setTimeout(()=>{g.append('text')
				.attr('transform',(d)=> `translate(${self.labelArc.centroid(d)})`)
				.text(function(d){return d.data.name})},1000)
				}
			)
		},0)
	}
	
	componentDidMount(){
		this.renderChart()
	}
	render(){
		return(	<div id="d-chart" className="statistics__chart"></div>)
	}
}
