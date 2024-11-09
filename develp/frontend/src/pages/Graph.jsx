import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Graph = () => {
    const svgRef = useRef();

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr('width', '50%')
            .attr('height', '50%')
            .attr('viewBox', `0 0 800 600`)
            .attr('preserveAspectRatio', 'xMidYMid meet');

        const width = 800;
        const height = 600;

        const entidadesPeruanas = [
            "Ministerio de Economía y Finanzas",
            "Ministerio de Salud",
            "Ministerio de Educación",
            "Ministerio del Interior",
            "Ministerio de Defensa",
            "Ministerio de Transportes y Comunicaciones",
            "Ministerio de Energía y Minas",
            "Ministerio de Agricultura y Riego",
            "Ministerio de la Producción",
            "Ministerio de Comercio Exterior y Turismo",
            "Ministerio de Vivienda, Construcción y Saneamiento",
            "Ministerio de Trabajo y Promoción del Empleo",
            "Ministerio de Justicia y Derechos Humanos",
            "Ministerio de la Mujer y Poblaciones Vulnerables",
            "Ministerio del Ambiente",
            "Ministerio de Cultura",
            "Ministerio de Desarrollo e Inclusión Social",
            "Contraloría General de la República",
            "Superintendencia Nacional de Aduanas y de Administración Tributaria (SUNAT)",
            "Superintendencia de Banca, Seguros y AFP (SBS)",
            "Instituto Nacional de Estadística e Informática (INEI)",
            "Instituto Nacional de Defensa Civil (INDECI)",
            "Instituto Nacional de Salud (INS)",
            "Instituto Nacional de Innovación Agraria (INIA)",
            "Instituto Nacional de Defensa de la Competencia y de la Protección de la Propiedad Intelectual (INDECOPI)",
            "Superintendencia Nacional de Educación Superior Universitaria (SUNEDU)",
            "Superintendencia Nacional de los Registros Públicos (SUNARP)",
            "Superintendencia Nacional de Migraciones",
            "Organismo Supervisor de la Inversión en Energía y Minería (OSINERGMIN)",
            "Organismo Supervisor de la Inversión en Infraestructura de Transporte de Uso Público (OSITRAN)",
            "Organismo Supervisor de la Inversión Privada en Telecomunicaciones (OSIPTEL)",
            "Organismo de Evaluación y Fiscalización Ambiental (OEFA)",
            "Servicio Nacional de Áreas Naturales Protegidas por el Estado (SERNANP)",
            "Servicio Nacional de Meteorología e Hidrología del Perú (SENAMHI)",
            "Servicio Nacional de Sanidad Agraria (SENASA)",
            "Superintendencia Nacional de Fiscalización Laboral (SUNAFIL)",
            "Superintendencia Nacional de Servicios de Saneamiento (SUNASS)",
            "Superintendencia Nacional de Control de Servicios de Seguridad, Armas, Municiones y Explosivos de Uso Civil (SUCAMEC)",
            "Agencia de Compras de las Fuerzas Armadas (ACFFAA)",
            "Agencia de Promoción de la Inversión Privada (PROINVERSIÓN)",
            "Agencia Peruana de Cooperación Internacional (APCI)",
            "Banco Central de Reserva del Perú (BCRP)",
            "Banco de la Nación",
            "Comisión Nacional para el Desarrollo y Vida sin Drogas (DEVIDA)",
            "Consejo Nacional de Ciencia, Tecnología e Innovación Tecnológica (CONCYTEC)",
            "Defensoría del Pueblo",
            "Registro Nacional de Identificación y Estado Civil (RENIEC)",
            "Superintendencia Nacional de Bienes Estatales (SBN)",
            "Superintendencia Nacional de Salud (SUSALUD)"
          ];
          
          const graphData = {
            nodes: entidadesPeruanas.map(entidad => ({
              name: entidad,
              contrataciones: Math.floor(Math.random() * 200)/15 + 1 // Genera un número aleatorio entre 1 y 200
            }))
          };

        {/*
            
             nodes: [
                { name: "Oferente A", contrataciones: 5 },
                { name: "Oferente B", contrataciones: 3 },
                { name: "Oferente C", contrataciones: 8 },
                { name: "Oferente D", contrataciones: 2 }
            ]

            nodos: [
                {
                    "id": 3123456, proveedor o de la entidad
                    "name": "Nombre de la empresa",
                    "procesos" : 190
                }
            ]
            Estructura de la api 
            [
                {
                    "id": 12345678,
                    "nombre": "Nombre de la empresa",
                    "procesos": 109.95,
                    "monto": 500.0
                  }
            ]
            */}

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