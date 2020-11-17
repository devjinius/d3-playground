import React, { useRef, useEffect } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand, svg } from 'd3';

export const BarChart = ({ data }) => {
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
    
    return (
        <svg ref={svgRef} id="bar-chart">
            <g className="x-axis"/>
            <g className="y-axis"/>
        </svg>
    );
}