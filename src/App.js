import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, axisBottom, axisRight, scaleLinear, scaleBand } from 'd3';

function App() {
	const [data, setData] = useState([25, 30, 45, 20, 100, 60]);	
	const svgRef = useRef();

	useEffect(() => {
		const svg = select(svgRef.current);
		const xScale = scaleBand()
						.domain(data.map((value, index) => index))
						.range([0, 300])
						.padding(0.5);
		const yScale = scaleLinear().domain([0, 120]).range([150, 0]);

		const colorScale = scaleLinear()
		.domain([75, 100, 150])
		.range(["green", "orange", "red"])
		.clamp(true);
	  
		const xAxis = axisBottom(xScale).ticks(data.length);

		svg
			.select('.x-axis')
			.style('transform', 'translateY(150px)')
			.call(xAxis);

		const yAxis = axisRight(yScale);

		svg
			.select('.y-axis')
			.style('transform', 'translateX(300px)')
			.call(yAxis);

			svg
			.selectAll('.bar')
			.data(data)
			.join('rect')
			.attr('class', 'bar')
	  
			.style("transform", "scale(1, -1)")
			.attr("x", (value, index) => xScale(index))
			.attr("y", -150)
			.attr("width", xScale.bandwidth())
			.transition()
			.attr("fill", colorScale)
			.attr('attr', 50)
			.attr("height", value => 150 - yScale(value));
	  
	}, [data]);
	return <>
		<svg ref={svgRef}>
			<g className="x-axis"/>
			<g className="y-axis"/>
		</svg>
		<br/>
		<button onClick={() => setData(data.map(value => {
			const newValue = value + 5;
			return newValue > 120 ? 120 : newValue;
		}))}>update</button>
		<button onClick={() => setData(data.filter(value => value < 40))}>filter</button>
	</>;
}

export default App;
