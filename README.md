# Dabasystem Challenge

Reto técnico de maquetación frontend. Implementación de dos módulos a partir de un diseño en Figma.

## Módulos

### Módulo Hero
Slider de imágenes a pantalla completa con efecto fade, navegación por flechas y autoplay. Incluye título, subtítulo y CTA. Totalmente responsive (mobile y desktop).

### Módulo SEO
Módulo con dos capas: una capa introductoria con máscara de capa y una segunda capa con vídeo de fondo, slider de highlights en mobile y listado estático en desktop. Incluye descripción y CTA.

### Animación de transición
Interacción de scroll entre los dos módulos mediante rueda, touch y teclado, con animación de desplazamiento y efecto de border-radius progresivo.

## Tecnologías

- HTML5 semántico
- LESS (compilado a CSS)
- JavaScript vanilla (ES6+)
- SwiperJS 12
- Fuentes: Inter y ABeeZee (Google Fonts)

## Estructura del proyecto

```
├── assets/
│   ├── images/
│   └── videos/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── less/
│   ├── style.less
│   ├── variables.less
│   ├── functions.less
│   ├── reset.less
│   ├── mdllayout.less
│   ├── mdlhero.less
│   └── mdlseo.less
└── index.html
```

## Instalación y uso

### Requisitos
- Node.js
- npm

### Instalación de dependencias

```bash
npm install
```

### Compilar LESS

```bash
npm run build
```

### Modo watch durante el desarrollo

```bash
npm run watch
```

## Criterios aplicados

- Unidades en `rem` (base `62.5%` → `10px = 1rem`)
- Formato `~"calc()"` en operaciones CSS para compatibilidad con el compilador LESS
- Sliders inicializados solo si el número de ítems supera los visibles en el viewport
- Elementos seleccionados exclusivamente desde su `<section>` para no interferir con otros módulos
- Autoplay activo en el slider hero
- Pixel perfect respecto al diseño de Figma en mobile y desktop
- Accesibilidad: atributos `aria-label`, `aria-hidden`, navegación por teclado y soporte para lectores de pantalla