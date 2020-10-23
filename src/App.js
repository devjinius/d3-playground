import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select, axisBottom, axisRight, scaleLinear, scaleBand, svg } from 'd3';

const getRandomData = (min, max) => {
	min = 1;
	max = 120;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

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

		const onMouseEnterAtBar = (e, value) => {
			svg
				.selectAll('.tooltip')
				.data([value])
				.join('text')
				.attr('class', 'tooltip')
				.text(value)
				.attr('x', e.target.getAttribute('x'))
				.attr('y', yScale(value) - 8);
		};

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
			.on('mouseenter', (e, value) => onMouseEnterAtBar(e, value))
			.on('mouseleave', () => svg.select('.tooltip').remove())
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
		<button onClick={() => {
			const newValue = getRandomData();
			setData([...data, newValue]);
		}}>add</button>
	</>;
}

export default App;
