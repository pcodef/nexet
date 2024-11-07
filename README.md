# Nexet

## Descripción General

**Nexet** es una herramienta de monitoreo diseñada para identificar y analizar relaciones entre entidades del sector público y sus proveedores en Perú. Su objetivo es detectar posibles redes de tráfico de influencias y conflictos de interés en los procesos de contratación pública, promoviendo la transparencia y ayudando a combatir la corrupción.

### Funcionalidades

- **Análisis de Relaciones en Contrataciones**: Nexet examina el historial de contrataciones entre entidades compradoras y oferentes, buscando patrones de contratación recurrente entre los mismos actores que puedan indicar influencias indebidas.
  
- **Construcción de Base de Datos en Neo4j**: A través de la API del Portal de Contrataciones Abiertas de la Compra Pública, Nexet recolecta y almacena datos en una base de datos orientada a grafos (Neo4j). Esta base de datos permite realizar búsquedas específicas sobre el historial de contrataciones de cada entidad y sus relaciones.

- **Algoritmos de Detección de Influencias y Anomalías**: En el backend, Nexet implementa algoritmos de análisis de redes utilizando Python y NetworkX. Estos algoritmos identifican patrones de tráfico de influencias y conexiones anómalas basadas en el peso de las conexiones, donde el peso representa relaciones recurrentes entre entidades y oferentes.

- **Visualización Interactiva de Redes**: Los usuarios pueden acceder a una interfaz web para visualizar las redes de influencia detectadas. Usando D3.js, Nexet representa gráficamente los nodos (entidades y autoridades) que muestran posibles puntos críticos en la red, permitiendo una fácil exploración y comprensión de los datos.

### Tecnologías Utilizadas

- **Base de Datos**:
  - **Neo4j**: Base de datos orientada a grafos para gestionar relaciones complejas entre entidades y proveedores.

- **Backend (Procesamiento y Lógica de Negocio)**:
  - **Python con Django**: Framework de desarrollo para el backend.
  - **Neo4j Python Driver**: Para interactuar con la base de datos de grafos.
  - **NetworkX**: Librería de análisis de grafos para detectar patrones de tráfico de influencias.

- **Frontend**:
  - **React.js**: Framework para construir una interfaz de usuario interactiva.
  - **D3.js**: Librería de visualización de datos, utilizada para crear gráficos de redes de influencias.

### Escalabilidad de la Propuesta

Nexet está diseñado con una arquitectura escalable que permite adaptarse a grandes volúmenes de datos y a la integración de nuevas funcionalidades. Entre las características de escalabilidad se incluyen:

- **Crecimiento en Volumen de Datos**: Neo4j y NetworkX están optimizados para manejar grandes cantidades de datos de relaciones sin perder rendimiento.
- **Backend Modular**: La arquitectura en microservicios permite añadir nuevas funcionalidades o expandir el análisis sin afectar el rendimiento del sistema.
- **Implementación en la Nube**: Nexet puede alojarse en servicios de nube como AWS o Google Cloud, permitiendo escalar los recursos según la demanda.

### Objetivo

La herramienta Nexet se alinea con los principios de transparencia y ética en la administración pública, contribuyendo a la detección de prácticas corruptas y ayudando a tomar decisiones informadas sobre los contratos del Estado peruano. Esta herramienta puede expandirse para monitorear otros sectores y mejorar la transparencia en diversas áreas del gobierno.

---

Nexet se compromete a hacer más transparente el sector público y a proporcionar una plataforma confiable para el análisis de influencias en la administración de recursos del Estado.

