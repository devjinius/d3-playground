import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { select } from 'd3';

function App() {
	const [data, setData] = useState([25, 30, 45, 20, 100, 60]);
	
	const svgRef = useRef();
	useEffect(() => {
		const svg = select(svgRef.current);
		svg
			.selectAll('circle')
			.data(data)
			.join('circle')
			.attr('r', v => v)
			.attr('cx', v => v * 2)
			.attr('cy', v => v * 2)
			.attr('stroke', 'red');
	}, [data]);
	return <>
		<svg ref={svgRef}></svg>
		<br/>
		<button onClick={() => setData(data.map(value => value + 5))}>update</button>
		<button onClick={() => setData(data.filter(value => value > 40))}>filter</button>
	</>;
}

export default App;
