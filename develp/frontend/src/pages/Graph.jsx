import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', '100%')
            .attr('height', '100%')
            .attr('viewBox', `0 0 800 600`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        const width = 800;
        const height = 600;

        const graphData = {
            nodes: [
                { name: "Oferente A", contrataciones: 5 },
                { name: "Oferente B", contrataciones: 3 },
                { name: "Oferente C", contrataciones: 8 },
                { name: "Oferente D", contrataciones: 2 }
            ],
            links: [
                { source: "Oferente A", target: "Oferente B" },
                { source: "Oferente B", target: "Oferente C" },
                { source: "Oferente D", target: "Oferente C" }
            ]
        };

        const simulation = d3.forceSimulation(graphData.nodes)
            .force('charge', d3.forceManyBody().strength(300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(d => d.contrataciones * 5).strength(0.7))
            .on('tick', ticked);

        const drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);

        const textsAndNodes = svg.append('g')
            .selectAll('g')
            .data(graphData.nodes)
            .enter()
            .append('g')
            .call(drag);

        textsAndNodes.append('circle')
            .attr('r', d => d.contrataciones * 5)
            .attr('fill', 'blue');

        textsAndNodes.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('font-size', d => d.contrataciones * 2 + 'px')
            .text(d => d.name);

        function ticked() {
            textsAndNodes.attr('transform', d => `translate(${d.x},${d.y})`);
        }

        function dragstarted(event, d) {
            simulation.alphaTarget(0.3).restart();
            d.fx = d.x;
            d.fy = d.y;
        }

        function dragged(event, d) {
            d.fx = event.x;
            d.fy = event.y;
        }

        function dragended(event, d) {
            simulation.alphaTarget(0);
            d.fx = null;
            d.fy = null;
        }
    }, []);

    return <svg ref={svgRef}></svg>;
};

export default Graph;