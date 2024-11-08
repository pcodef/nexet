import React, { useEffect, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import * as d3 from "d3";

const HeroSection = () => {
  const svgRef = useRef();

  useEffect(() => {
    const svg = d3.select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 800 600")
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("opacity", 0.7); // Set the overall opacity of the SVG

    const width = 800;
    const height = 600;

    const graphData = {
      nodes: [
        { name: "Petróleos del Perú S.A.", contrataciones: 15 },
        { name: "Banco de la Nación", contrataciones: 30 },
        { name: "Sedapal", contrataciones: 70 },
        { name: "CORPAC", contrataciones: 75 }
      ],
      links: [
        { source: "Petróleos del Perú S.A.", target: "Banco de la Nación" },
        { source: "Banco de la Nación", target: "Sedapal" },
        { source: "CORPAC", target: "Sedapal" }
      ]
    };

    const simulation = d3.forceSimulation(graphData.nodes)
      .force("charge", d3.forceManyBody().strength(300))
      .force("link", d3.forceLink(graphData.links).id(d => d.name).distance(100))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide().radius(d => d.contrataciones * 5).strength(0.7))
      .on("tick", ticked);

    const links = svg.append("g")
      .selectAll("line")
      .data(graphData.links)
      .enter()
      .append("line")
      .attr("stroke-width", 3)
      .style("stroke", "orange")
      .style("opacity", 0.7); // Set the opacity of the links

    const drag = d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);

    const textsAndNodes = svg.append("g")
      .selectAll("g")
      .data(graphData.nodes)
      .enter()
      .append("g")
      .call(drag);

    textsAndNodes.append("circle")
      .attr("r", d => d.contrataciones * 5)
      .attr("fill", d => {
        if (d.contrataciones < 20) return "blue";
        if (d.contrataciones >= 20 && d.contrataciones <= 40) return "yellow";
        return "red";
      })
      .style("opacity", 0.7); // Set the opacity of the circles

    textsAndNodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "black")
      .style("font-size", d => Math.min(d.contrataciones * 2, d.contrataciones * 5) + "px")
      .style("opacity", 0.7) // Set the opacity of the text
      .text(d => d.name);

    function ticked() {
      textsAndNodes.attr("transform", d => `translate(${d.x},${d.y})`);
      links
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);
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

  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '60vh',
        textAlign: 'center',
        padding: '2rem',
        overflow: 'hidden',
      }}
    >
      <Box
        component="svg"
        ref={svgRef}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
        }}
      />
      <Typography variant="h3" gutterBottom>
        Nexet - Monitoreo de Redes de Influencia
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Transparencia y rendición de cuentas en las contrataciones públicas.
      </Typography>
      <Button variant="contained" color="primary" sx={{ mt: 3 }}>
        Get Started
      </Button>
    </Box>
  );
};

export default HeroSection;