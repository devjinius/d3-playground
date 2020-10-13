import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { line, select, curveBasis, curveCatmullRom } from 'd3';

function App() {
	const [data, setData] = useState([25, 30, 45, 20, 100, 60]);
	
	const svgRef = useRef();
	useEffect(() => {
		const svg = select(svgRef.current);
		const drawLine = line()
			.x((v, i) => i * 50)
			.y(v => 170 - v)
			.curve(curveCatmullRom);

		svg
			.selectAll('path')
			.data([data])
			.join('path')
			.attr('d', v => drawLine(v))
			.attr('fill', 'none')
			.attr('stroke', 'red');
	}, [data]);
	return <>
		<svg ref={svgRef}></svg>
		<br/>
		<button onClick={() => setData(data.map(value => value + 5))}>update</button>
		<button onClick={() => setData(data.filter(value => value < 40))}>filter</button>
	</>;
}

export default App;
