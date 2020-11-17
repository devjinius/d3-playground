import React, { useState } from 'react';
import './App.css';
import {BarChart} from './BarChart';

const getRandomData = (min, max) => {
	min = 1;
	max = 120;
	return Math.floor(Math.random() * (max - min + 1)) + min;
};

function App() {
	const [data, setData] = useState([25, 30, 45, 20, 100, 60]);	
	
	return <>
		<BarChart data={data} />
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
