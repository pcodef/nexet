import React from "react";
import { Box, Typography, Avatar, Grid } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Datos ficticios de testimonios adicionales
const testimonials = [
  {
    name: "Ministerio de Finanzas",
    comment: "Nexet nos ha permitido identificar posibles conflictos de interés de manera eficiente. Su interfaz es intuitiva y el análisis es preciso.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzBXH0rPQijhsusEqCyY81P3nvTf1eNu54jw&s"
  },
  {
    name: "Contraloría General",
    comment: "Esta herramienta ha sido invaluable en la supervisión de contrataciones públicas, ayudándonos a mejorar la transparencia en cada transacción.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mE22TZ1YkM6X71BeeqHoC7YkC2jmPUs8QA&s"
  },
  {
    name: "Comisión Nacional de Transparencia",
    comment: "Con Nexet, hemos acelerado significativamente los procesos de auditoría en entidades clave. Es una solución confiable.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QaIhyc1DGyxdMmDiAj2biYIEcjiPq5sRYg&s"
  },
  {
    name: "Oficina de Ética Gubernamental",
    comment: "La detección de redes de influencia ha sido clave para nuestras investigaciones. Nexet ha cambiado la manera en que trabajamos.",
    imageUrl: "https://i0.wp.com/aldia.microjuris.com/wp-content/uploads/2021/02/screen-shot-2021-02-28-at-11.21.44-am.png?fit=1015%2C476&quality=80&ssl=1"
  },
  {
    name: "Agencia de Compras Públicas",
    comment: "Nexet facilita la supervisión y nos ofrece una visualización clara de posibles riesgos en contrataciones. Altamente recomendable.",
    imageUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/031/706/campaign_standard_FACHADA_PERU_COMPRAS_portada.jpg"
  },
  {
    name: "Instituto Nacional de Auditoría",
    comment: "Una herramienta excelente para detectar redes de influencia en tiempo real. Nexet es esencial para la transparencia.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mE22TZ1YkM6X71BeeqHoC7YkC2jmPUs8QA&s"
  },
  {
    name: "Comisión de Supervisión",
    comment: "Gracias a Nexet, hemos optimizado los procesos de revisión y auditoría en todas las entidades del gobierno.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2mE22TZ1YkM6X71BeeqHoC7YkC2jmPUs8QA&s"
  },
  {
    name: "Agencia de Transparencia Corporativa",
    comment: "El análisis detallado de Nexet ha revolucionado la forma en que analizamos las contrataciones. Es fundamental para nuestros informes.",
    imageUrl: "https://cdn.www.gob.pe/uploads/campaign/photo/000/031/706/campaign_standard_FACHADA_PERU_COMPRAS_portada.jpg"
  },
  {
    name: "Observatorio de Ética Pública",
    comment: "Con Nexet, hemos podido identificar patrones de comportamiento inusuales. Una herramienta valiosa en nuestras auditorías.",
    imageUrl: "https://i0.wp.com/aldia.microjuris.com/wp-content/uploads/2021/02/screen-shot-2021-02-28-at-11.21.44-am.png?fit=1015%2C476&quality=80&ssl=1"
  },
  {
    name: "Oficina de Contratos Estatales",
    comment: "Nexet nos proporciona una claridad sin precedentes en las relaciones contractuales. Una mejora absoluta para nuestro equipo.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QaIhyc1DGyxdMmDiAj2biYIEcjiPq5sRYg&s"
  },
  {
    name: "Centro de Monitoreo de Compras",
    comment: "Es increíble cómo Nexet visualiza las redes de influencia. Nos ayuda a tomar decisiones informadas.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6QaIhyc1DGyxdMmDiAj2biYIEcjiPq5sRYg&s"
  },
  {
    name: "Fiscalía Nacional de Cuentas",
    comment: "Nexet ha transformado nuestros procesos de fiscalización, facilitando la identificación de riesgos en contrataciones.",
    imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzBXH0rPQijhsusEqCyY81P3nvTf1eNu54jw&s"
  }
];

// Configuración del carrusel
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000
};

const Testimonials = () => {
  // Divide los testimonios en "páginas" de dos filas (cada página contiene 6 elementos)
  const testimonialSlides = [];
  for (let i = 0; i < testimonials.length; i += 6) {
    testimonialSlides.push(testimonials.slice(i, i + 6));
  }

  return (
    <Box sx={{ padding: '2rem', textAlign: 'center', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h4" gutterBottom>
        Testimonios
      </Typography>
      <Slider {...settings}>
        {testimonialSlides.map((slide, index) => (
          <Box key={index}>
            <Grid container spacing={4} justifyContent="center">
              {/* Primera fila de testimonios */}
              {slide.slice(0, 3).map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                    <Avatar src={testimonial.imageUrl} alt={testimonial.name} sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="subtitle1">
                      {testimonial.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
            <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
              {/* Segunda fila de testimonios */}
              {slide.slice(3, 6).map((testimonial, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '1rem' }}>
                    <Avatar src={testimonial.imageUrl} alt={testimonial.name} sx={{ width: 80, height: 80, mb: 2 }} />
                    <Typography variant="body1" color="textSecondary" sx={{ fontStyle: 'italic', mb: 1 }}>
                      "{testimonial.comment}"
                    </Typography>
                    <Typography variant="subtitle1">
                      {testimonial.name}
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default Testimonials;
