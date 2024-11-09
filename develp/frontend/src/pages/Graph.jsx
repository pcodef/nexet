import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import * as d3 from "d3";
import Loading from "./Loading";

function Graph() {
  const { id } = useParams(); // "id" será el valor dinámico de la URL
  const [data, setData] = useState(null);
  const svgRef = useRef();
  const location = useLocation(); // Para obtener la parte de la URL (entities o providers)

  const isProvider = location.pathname.includes("providers");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Llama al primer endpoint y espera que termine
        const entityType = isProvider ? "suppliers" : "buyers"; // Define qué tipo de datos usar
        await fetch(`http://localhost:8000/api/${entityType}/${id}/contracts`);

        // Llama al segundo endpoint
        const response = await fetch(`http://localhost:8000/api/node/${id}/`);
        const json = await response.json();

        // Transforma el JSON en el formato necesario para D3
        const transformedData = {
          nodes: [
            {
              id: json[entityType + "_id"], // Dynamically set the ID
              name: json.name,
              type: entityType, // Cambia a "supplier" o "buyer" según corresponda
              contrataciones: json.contrataciones || 10,
            },
            ...json[isProvider ? "buyers" : "suppliers"].map((entity) => ({
              id: entity[isProvider ? "id_sup" : "id_buyer"],
              name: entity.name,
              type: isProvider ? "supplier" : "buyer",
              contrataciones: entity.contrataciones || 5,
            })),
          ],
          links: json[isProvider ? "buyers" : "suppliers"].map((entity) => ({
            source: json[entityType + "_id"],
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

  return data ? <GraphD3 data={data} svgRef={svgRef} /> : <Loading />;
}

function GraphD3({ data, svgRef }) {
  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height);

    svg.selectAll("*").remove(); // Limpia elementos previos

    const simulation = d3
      .forceSimulation(data.nodes)
      .force("charge", d3.forceManyBody().strength(300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force(
        "collide",
        d3
          .forceCollide()
          .radius((d) => d.contrataciones * 10) // Ajusta el radio para mayor separación
          .strength(1) // Aumenta la fuerza para evitar superposición
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

    // Añadir círculos para nodos con tamaño dinámico
    nodeGroup
      .append("circle")
      .attr("r", (d) => d.contrataciones * 10)
      .attr("fill", (d) =>
        d.type === "buyer" || d.type === "supplier" ? "blue" : "green"
      );

    // Añadir texto dentro de los círculos
    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .style("font-weight", "bold")
      .style("text-shadow", "1px 1px 2px rgba(0, 0, 0, 0.6)")
      .each(function (d) {
        // Calcular el radio del círculo
        const radius = d.contrataciones * 16; // Ajusta el tamaño si es necesario

        // Dividir el texto en líneas para ajustarse al espacio
        const lines = wrapText(d.name, radius);

        // Ajustar el tamaño de la fuente según el número de líneas
        const fontSize = 10;

        // Añadir cada línea de texto usando tspan
        d3.select(this)
          .selectAll("tspan")
          .data(lines)
          .enter()
          .append("tspan")
          .attr("x", 0) // Mantener el texto centrado
          .attr("dy", (d, i) => (i === 0 ? 1 : 10)) // Ajustar el espacio entre líneas
          .style("font-size", fontSize + "px") // Ajustar el tamaño de la fuente
          .text((d) => d);
      });

    // Función para dividir el texto en líneas, ajustando el texto al radio del círculo
    function wrapText(text, radius) {
      const maxCharsPerLine = Math.floor(radius / 6); // Aproximación a la longitud máxima por línea
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
      // Aplica límites en los bordes para que los nodos "reboten"
      data.nodes.forEach((d) => {
        const radius = d.contrataciones * 3;

        // Rebote en el borde izquierdo y derecho
        if (d.x - radius < 0) {
          d.x = radius;
          d.vx = -d.vx;
        } else if (d.x + radius > width) {
          d.x = width - radius;
          d.vx = -d.vx;
        }

        // Rebote en el borde superior e inferior
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
