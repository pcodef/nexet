import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as d3 from "d3";
import Loading from "./Loading";
import { Container } from "@mui/material";

function Graph() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const svgRef = useRef();
  const location = useLocation();
  const isProvider = location.pathname.includes("providers");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const entityType = isProvider ? "suppliers" : "buyers";
        await fetch(`http://localhost:8000/api/${entityType}/${id}/contracts`);

        const response = await fetch(`http://localhost:8000/api/node/${id}/`);
        const json = await response.json();

        const transformedData = {
          title: json.name,
          nodes: json[isProvider ? "buyers" : "suppliers"].map((entity) => ({
            id: entity[isProvider ? "id_buyer" : "id_sup"], // Correct `id` for each node
            name: entity.name,
            type: isProvider ? "buyer" : "supplier", // Define type based on context
            weight: entity.weight,
          })),
          links: json[isProvider ? "buyers" : "suppliers"].map((entity) => ({
            source: id,
            target: entity[isProvider ? "id_buyer" : "id_sup"],
            weight: entity.weight,
          })),
        };
        setData(transformedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return data ? (
    <Container maxWidth="lg" sx={{ mt: 12, border: "solid" }}>
      <GraphD3 data={data} svgRef={svgRef} id={id} isProvider={isProvider} />
    </Container>
  ) : (
    <Loading />
  );
}

function GraphD3({ data, svgRef, id, isProvider }) {
  useEffect(() => {
    const width = 1000;
    const height = 800;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove();

    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", 100)
      .attr("text-anchor", "middle")
      .style("font-size", "24px")
      .style("font-weight", "bold")
      .text(`CONTRATOS CON: ${data.title}`);

    const colorScale = d3.scaleLinear().domain([1, 10]).range(["blue", "red"]);

    const simulation = d3
      .forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.weight * 50)
          .strength(1)
      )
      .on("tick", ticked);

    const drag = d3
      .drag()
      .on("start", (event, d) => {
        simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      })
      .on("drag", (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
      })
      .on("end", (event, d) => {
        simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      });

    const nodeGroup = svg
      .append("g")
      .selectAll("g")
      .data(data.nodes)
      .enter()
      .append("g")
      .call(drag);

    // Add circles with `onClick` to open a new page and cursor style
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.weight * 40)
      .attr("fill", (d) => colorScale(d.weight))
      .style("cursor", "pointer") // Change cursor on hover
      .on("click", (event, d) => {
        // Construct the URL with the correct `id` values
        const targetType = isProvider ? "buyers" : "suppliers";
        const url = `http://localhost:5173/contracts/${id}/${d.id}`;
        window.open(url);
      });

    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-weight", "bold")
      .style("text-shadow", "1px 1px 2px rgba(0, 0, 0, 0.6)")
      .each(function (d) {
        const radius = d.weight * 20;
        const lines = wrapText(d.name, radius);
        const fontSize = 10;

        d3.select(this)
          .selectAll("tspan")
          .data(lines)
          .enter()
          .append("tspan")
          .attr("x", 0)
          .attr("dy", (d, i) => (i === 0 ? 5 : 10))
          .style("font-size", fontSize + "px")
          .text((d) => d);
      });

    function wrapText(text, radius) {
      const maxCharsPerLine = Math.floor(radius / 6);
      const words = text.split(" ");
      const lines = [];
      let currentLine = "";

      words.forEach((word) => {
        if ((currentLine + word).length > maxCharsPerLine) {
          lines.push(currentLine);
          currentLine = word;
        } else {
          currentLine = currentLine ? currentLine + " " + word : word;
        }
      });

      if (currentLine) {
        lines.push(currentLine);
      }

      return lines;
    }

    function ticked() {
      data.nodes.forEach((d) => {
        const radius = d.weight * 3;

        if (d.x - radius < 0) {
          d.x = radius;
          d.vx = -d.vx;
        } else if (d.x + radius > width) {
          d.x = width - radius;
          d.vx = -d.vx;
        }

        if (d.y - radius < 0) {
          d.y = radius;
          d.vy = -d.vy;
        } else if (d.y + radius > height) {
          d.y = height - radius;
          d.vy = -d.vy;
        }
      });

      nodeGroup.attr("transform", (d) => `translate(${d.x},${d.y})`);
    }

    return () => {
      simulation.stop();
    };
  }, [data]);

  return <svg ref={svgRef}></svg>;
}

export default Graph;
