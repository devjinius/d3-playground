import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { line, select, curveCatmullRom, axisBottom, axisRight, scaleLinear } from 'd3';

function App() {
	const [data, setData] = useState([25, 30, 45, 20, 100, 60]);	
	const svgRef = useRef();

	useEffect(() => {
		const svg = select(svgRef.current);
		const xScale = scaleLinear().domain([0, data.length - 1]).range([0, 300]);
		const yScale = scaleLinear().domain([0, 120]).range([150, 0]);

		const drawLine = line()
			.x((v, i) => xScale(i))
			.y(yScale)
			.curve(curveCatmullRom);

		const xAxis = axisBottom(xScale).ticks(data.length);

		svg
			.select('.x-axis')
			.style('transform', 'translateY(150px)')
			.call(xAxis);

		const yAxis = axisRight(yScale).ticks(5);

		svg
			.select('.y-axis')
			.style('transform', 'translateX(300px)')
			.call(yAxis);

		yAxis(svg.select('y-axis'));

		svg
			.selectAll('.line')
			.data([data])
			.join('path')
			.attr('class', 'line')
			.attr('d', drawLine)
			.attr('fill', 'none')
			.attr('stroke', 'red');
	}, [data]);
	return <>
		<svg ref={svgRef}>
			<g className="x-axis"/>
			<g className="y-axis"/>
		</svg>
		<br/>
		<button onClick={() => setData(data.map(value => value + 5))}>update</button>
		<button onClick={() => setData(data.filter(value => value < 40))}>filter</button>
	</>;
}

export default App;
