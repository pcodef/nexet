import React, { useEffect, useRef, useState,useParams } from 'react';
import * as d3 from 'd3';
import { Box, FormControl, InputLabel, Select, MenuItem, Typography, Paper, Container } from '@mui/material';
import Footer from '../components/Footer';

const Graph = () => {
    const {typeEntity, id} = useParams();
    const [data, setData] = useState([]);
    const svgRef = useRef();
    const [filters, setFilters] = useState({
        year: '',
        category: '',
        selectionProcedure: '',
    });

    const entidadesPeruanas = [
        { 
            name: "Empresa1", 
            contrataciones: 10,
            year: 2022,
            category: "A",
            procedimientoSeleccion: "Contrato Ilicito" 
        },
        { 
            name: "Empresa2", 
            contrataciones: 20,
            year: 2021,
            category: "A",
            procedimientoSeleccion: "Acuerdo de Colusión" 
        },
        { 
            name: "Empresa3", 
            contrataciones: 50,
            year: 2024,
            category: "A",
            procedimientoSeleccion: "Licitación Pública" 
        },
        { 
            name: "Empresa4", 
            contrataciones: 5 ,
            year: 2019,
            category: "A",
            procedimientoSeleccion: "Licitación Pública"
        },
        { 
            name: "Empresa5", 
            contrataciones: 15,
            year: 2021,
            category: "A",
            procedimientoSeleccion: "Licitación Pública" 
        },
    ];

    const uniqueYears = [...new Set(entidadesPeruanas.map(entidad => entidad.year))];
    const uniqueCategories = [...new Set(entidadesPeruanas.map(entidad => entidad.category))];
    const uniqueSelectionProcedures = [...new Set(entidadesPeruanas.map(entidad => entidad.procedimientoSeleccion))];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const endpoint = `http://localhost:8000/api/${typeEntity}/${id}/contracts`;
                const response = await axios.get(endpoint);
                setData(response.data.contracts);
            } catch (error) {
                console.error('Error al cargar los datos:', error);
            }
        };

        fetchData();

        const svg = d3.select(svgRef.current)
            .attr('width', 800)
            .attr('height', 600);

        const width = 800;
        const height = 600;

        const filteredData = entidadesPeruanas.filter(entidad => {
            return (
                (filters.year ? entidad.year === filters.year : true) &&
                (filters.category ? entidad.category === filters.category : true) &&
                (filters.selectionProcedure ? entidad.procedimientoSeleccion === filters.selectionProcedure : true)
            );
        });

        const graphData = {
            nodes: filteredData.map(entidad => ({
              name: entidad.name,
              contrataciones: entidad.contrataciones,
            })),
        };

        svg.selectAll('*').remove(); // Clear previous elements

        const simulation = d3.forceSimulation(graphData.nodes)
            .force('charge', d3.forceManyBody().strength(300))
            .force('center', d3.forceCenter(width / 2, height / 2))
            .force('collide', d3.forceCollide().radius(d => d.contrataciones * 5).strength(0.7))
            .on('tick', ticked);

        const drag = d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended);

        const nodeGroup = svg.append('g')
            .selectAll('g')
            .data(graphData.nodes)
            .enter()
            .append('g')
            .call(drag);

        // Añadir círculos
        nodeGroup.append('circle')
            .attr('r', d => d.contrataciones * 4)
            .attr('fill', 'blue');

        // Añadir texto dentro de los círculos
        nodeGroup.append('text')
            .attr('dy', '.35em')
            .attr('text-anchor', 'middle')
            .attr('fill', 'white')
            .style('font-size', '12px')
            .text(d => d.name);

            function ticked() {
                // Aplica límites en los bordes para que los nodos "reboten"
                graphData.nodes.forEach(d => {
                    const radius = d.contrataciones * 3;
    
                    // Rebote en el borde izquierdo y derecho
                    if (d.x - radius < 0) {
                        d.x = radius;
                        d.vx = -d.vx; // Cambia la dirección horizontal
                    } else if (d.x + radius > width) {
                        d.x = width - radius;
                        d.vx = -d.vx; // Cambia la dirección horizontal
                    }
    
                    // Rebote en el borde superior e inferior
                    if (d.y - radius < 0) {
                        d.y = radius;
                        d.vy = -d.vy; // Cambia la dirección vertical
                    } else if (d.y + radius > height) {
                        d.y = height - radius;
                        d.vy = -d.vy; // Cambia la dirección vertical
                    }
                });
    
                // Actualiza la posición de los nodos
                nodeGroup.attr('transform', d => `translate(${d.x},${d.y})`);
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

        return () => {
            simulation.stop();
        };
    }, [typeEntity, id, filters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    return (
        <Container maxWidth='lg' sx={{mt:12}}>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            {/* Sección de filtros */}
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e3f2fd', width: '200px' }}>
                <Typography variant="h6" gutterBottom>Filtros</Typography>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Año</InputLabel>
                    <Select
                        name="year"
                        value={filters.year}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {uniqueYears.map(year => (
                            <MenuItem key={year} value={year}>{year}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Categoría</InputLabel>
                    <Select
                        name="category"
                        value={filters.category}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {uniqueCategories.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Procedimiento Selección</InputLabel>
                    <Select
                        name="selectionProcedure"
                        value={filters.selectionProcedure}
                        onChange={handleFilterChange}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {uniqueSelectionProcedures.map(procedure => (
                            <MenuItem key={procedure} value={procedure}>{procedure}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Paper>

            {/* Gráfico de burbujas */}
            <Paper elevation={3} sx={{ padding: 2, backgroundColor: '#e3f2fd', flexGrow: 1 }}>
                <svg ref={svgRef}></svg>
            </Paper>
        </Box>
        <Footer />
        </Container>
        
        
    );
};

export default Graph;