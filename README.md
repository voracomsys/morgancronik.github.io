# Voracom Sys - Sitio rediseñado con identidad de marca

Este paquete contiene el rediseño HTML estático de la página de Voracom Sys, usando la colorimetría y lineamientos del paquete de identidad de marca.

## Identidad aplicada

Colores principales:
- Vino institucional: `#730D15`
- Tinto profundo: `#76000A`
- Rojo de acción: `#BF1120`
- Granate: `#A6122D`
- Rojo brillante: `#D91438`
- Negro carbón: `#111820`
- Grafito: `#2B2F33`
- Gris claro: `#E8E8E8`
- Blanco: `#FFFFFF`

Tipografías sugeridas:
- Títulos: Montserrat / Poppins
- Texto: Lato / Source Sans 3 / Arial

## Archivos principales

- `index.html`: página completa.
- `css/styles.css`: diseño homologado con la marca.
- `js/app.js`: navegación, filtros, formulario, WhatsApp y modal.
- `assets/brand/`: logo, favicon y tokens de marca.
- `site.webmanifest`: configuración básica para navegador/móvil.

## Cómo probar

1. Descomprime el ZIP.
2. Abre `index.html` en Chrome, Edge o Firefox.
3. Revisa la vista en computadora y celular.
4. Para publicarlo en Cloudflare Pages, Netlify o similar, sube el contenido de esta carpeta, no la carpeta contenedora.

## Nota de formulario

El formulario no guarda datos en servidor. Genera:
- Un correo mediante `mailto`.
- Un mensaje preparado para WhatsApp.

Para producción se recomienda conectar un formulario real mediante Wix Forms, Formspree, Netlify Forms, Cloudflare Workers o un backend propio.


## Cambio aplicado de tipografía

Se sustituyó la combinación anterior por una tipografía más sobria y profesional basada en fuentes del sistema:

- Títulos: Aptos Display / Segoe UI / Arial
- Texto general: Aptos / Segoe UI / Arial

Ventajas:
- Apariencia más formal y corporativa.
- Mejor legibilidad en escritorio y celular.
- Carga más rápida al no depender de Google Fonts.
- Estilo más adecuado para despacho contable y asesoría fiscal.
