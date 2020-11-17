import React, { useRef, useEffect, useState } from 'react';
import { select, axisBottom, axisRight, scaleLinear, scaleBand, svg, entries } from 'd3';

const useResizeObserver = (ref) => {
    const [dimension, setDimension] = useState(null);

    useEffect(() => {
        const target = ref.current;
        const resizeObserver = new ResizeObserver(entries => {
            entries.forEach((entry) => {
                setDimension(entry.contentRect);
            });
        });

        resizeObserver.observe(target);
        return () => {
            resizeObserver.unobserve(target);
        }
    }, [ref]);

    return dimension;
}

export const BarChart = ({ data }) => {
    const svgRef = useRef();
    const wrapperRef = useRef();
    const dimension = useResizeObserver(wrapperRef);

	useEffect(() => {
        const svg = select(svgRef.current);

        if (!dimension) {
            return;
        }
        
		const xScale = scaleBand()
						.domain(data.map((value, index) => index))
						.range([0, dimension.width])
						.padding(0.5);
		const yScale = scaleLinear().domain([0, 120]).range([dimension.height, 0]);

		const colorScale = scaleLinear()
		.domain([75, 100, 150])
		.range(["green", "orange", "red"])
		.clamp(true);
	  
		const xAxis = axisBottom(xScale).ticks(data.length);

		svg
			.select('.x-axis')
			.style('transform', `translateY(${dimension.height}px)`)
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
			.style('transform', `translateX(${dimension.width}px)`)
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
    }, [data, dimension]);
    
    return (
        <div ref={wrapperRef} id="bar-chart-wrapper">
            <svg ref={svgRef} id="bar-chart">
                <g className="x-axis"/>
                <g className="y-axis"/>
            </svg>
        </div>
    );
}