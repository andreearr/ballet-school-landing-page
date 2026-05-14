# Israel Rueda Ballet - Especificación del Sitio Web

## 1. Concepto y Visión

Una experiencia digital elegante y refinada que captura la esencia del ballet clásico en el corazón de Gràcia, Barcelona. El sitio transmite una sensación de calma, sofisticación y profesionalismo, invitando a visitantes de todas las edades a descubrir su pasión por la danza en un ambiente cercano e inclusivo.

## 2. Lenguaje de Diseño

### Dirección Estética
Inspirado en las cualidades etéreas del ballet: movimiento fluido, líneas elegantes, y una paleta de colores que evoca elegancia clásica sin ser ostentoso. Referencias visuales: teatros de ópera históricos, estudios de danza con luz natural, delicadeza femenina.

### Paleta de Colores
- **Primary**: #2C2C2C (Negro ballet - texto principal)
- **Secondary**: #8B7355 (Marrón tierra - acentos cálidos)
- **Accent**: #D4AF37 (Dorado suave - detalles premium)
- **Background Light**: #FAF8F5 (Crema cálido - fondos claros)
- **Background Dark**: #1A1A1A (Negro profundo - secciones destacadas)
- **Text Light**: #F5F3F0 (Blanco cálido)
- **Text Muted**: #6B6B6B (Gris medio)

### Tipografía
- **Títulos**: Playfair Display (serif elegante) - weights 400, 500, 600
- **Cuerpo**: Cormorant Garamond (serif refinada) - weights 400, 500
- **UI Elements**: Montserrat (sans-serif moderna) - weights 300, 400, 500

### Sistema Espacial
- Base unit: 8px
- Espaciado sections: 80px (mobile: 48px)
- Padding containers: 24px (mobile: 16px)
- Gap elementos: 32px (mobile: 24px)

### Filosofía de Movimiento
- Transiciones suaves de 300-500ms con ease-out
- Parallax sutil en imágenes hero
- Fade-in con slide-up al hacer scroll (opacity 0→1, translateY 30px→0)
- Hover effects elegantes con scale 1.02-1.05
- Scroll animations triggered at 20% viewport

## 3. Layout y Estructura

### Estructura de Páginas
1. **Header fijo**: Logo + navegación principal + CTA WhatsApp
2. **Contenido principal**: Secciones con ritmo alternado (fondo claro/oscuro)
3. **Footer completo**: Info contacto, horarios, redes sociales

### Diseño de Página Individual
- Hero section a pantalla completa con imagen de fondo
- Contenido organizado en secciones con títulos elegante
- Call-to-action prominentes
- Footer consistente en todas las páginas

### Estrategia Responsive
- Desktop: 1200px max-width, 3 columnas en grids
- Tablet: 768px breakpoint, 2 columnas
- Mobile: 100%, 1 columna, menú hamburguesa

## 4. Características e Interacciones

### Navegación
- Header fijo con blur backdrop en scroll
- Menú hamburguesa animado en mobile
- Active state en página actual
- Smooth scroll a secciones

### WhatsApp Button
- Botón flotante esquina inferior derecha (mobile)
- Animación pulse sutil
- Enlace directo: wa.me/34633473565

### Formulario Clase de Prueba
- Campos: Nombre, Email, Teléfono, Nivel/interés, Mensaje opcional
- Validación en tiempo real
- Feedback visual de envío exitoso
- Diseño elegante con labels flotantes

### Google Maps
- Iframe embedido con estilo personalizado
- Dirección: Carrer del Torrent d'En Vidalet, 14, Gràcia, Barcelona

## 5. Inventario de Componentes

### Header
- Estados: default, scrolled (con blur), mobile menu open
- Logo a la izquierda, nav al centro/derecha
- Altura: 80px desktop, 64px mobile

### Hero Section
- Imagen de fondo full-viewport
- Overlay gradient oscuro
- Título + subtítulo + CTA

### Card de Clase
- Imagen + título + descripción + precio
- Hover: elevación sutil + scale
- Estados: default, hover

### Testimonial Card
- Quote icon decorativo
- Texto testimonial
- Nombre y rol del autor
- Fondo con accent sutil

### Botón CTA
- Primary: fondo dorado, texto oscuro
- Secondary: borde dorado, fondo transparente
- Estados: default, hover, active, disabled
- Animación: background slide en hover

### Footer
- 3-4 columnas: About, Horarios, Contacto, Social
- Fondo oscuro
- Links con hover effect dorado

## 6. Enfoque Técnico

### Stack
- HTML5 semántico
- CSS3 con variables CSS custom
- Vanilla JavaScript ES6+
- No frameworks externos

### Arquitectura
- Single-page structure con navegación smooth
- CSS modular en archivos separados
- JavaScript modular con IIFE pattern

### Performance
- Imágenes optimizadas (WebP cuando posible)
- Lazy loading para imágenes below fold
- CSS crítico inline en head
- Font preloading

### Archivos
```
public/
├── index.html (Inicio)
├── clases.html
├── alquiler.html
├── contacto.html
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── imgs/
    └── [imágenes del usuario]
```

## 7. Páginas del Sitio

### Inicio (index.html)
- Hero con imagen principal
- Sección "Bienvenidos a Israel Rueda Ballet"
- Por qué elegirnos (4 cards)
- Nuestras clases (preview)
- Testimonios (slider)
- CTA final

### Clases (clases.html)
- Hero
- Tipos de clases con descripciones detalladas
- Horarios completos en tabla
- Precios
- Testimonios de estudiantes
- CTA clase de prueba

### Alquiler (alquiler.html)
- Hero
- Descripción de espacios
- Lista de usos ideales
- Tarifas detalladas
- CTA contacto

### Contacto (contacto.html)
- Hero
- Info de contacto
- Mapa de Google Maps
- Formulario clase de prueba
- Links redes sociales
