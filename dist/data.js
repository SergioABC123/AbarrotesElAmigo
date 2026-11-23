/* ============================================================
   EDITA TU TIENDA AQUÍ. No necesitas modificar app.js.
   Los precios, nombres y descripciones son ejemplos.
   Las ilustraciones SVG se pueden sustituir por tus fotos PNG.
   ============================================================ */
window.STORE = {
  name: 'Pendiente',
  tagline: 'Relojes & piezas de oro',
  // Un solo número para toda la tienda. Código de país + número,
  // únicamente dígitos. Ejemplo de formato para México: 52XXXXXXXXXX.
  // Vacío = muestra «Contacto próximamente», sin enviar mensajes.
  phone: '123 456 7890',
  currency: 'MXN',
  locale: 'es-MX',
  pricesAreExamples: true,
};

window.PRODUCTS = [
  {
    id: 'santos-01', name: 'Santos 01 · Verde', price: 18500,
    category: 'relojes', model: 'Santos', color: 'Verde', strap: 'Piel',
    image: 'assets/santos-cuero-verde.png', illustration: true,
    description: 'Reloj modificado',
  },
  {
    id: 'santos-02', name: 'Santos 02 · Azul', price: 17500,
    category: 'relojes', model: 'Santos', color: 'Azul', strap: 'Piel',
    image: 'assets/santos-cuero-azul.png', illustration: true,
    description: 'Descripción de ejemplo. Una pieza de líneas definidas y tonos azules. Edita aquí sus características y condiciones antes de ofrecerla a la venta.',
  },
  {
    id: 'santos-03', name: 'Santos 03 · Naranja', price: 16500,
    category: 'relojes', model: 'Santos', color: 'Naranja', strap: 'Piel',
    image: 'assets/santos-cuero-naranja.png', illustration: true,
    description: 'Descripción de ejemplo. Un acento naranja que da protagonismo al reloj. Reemplaza esta descripción con la información de tu producto.',
  },
  {
    id: 'santos-04', name: 'Santos 04 · Azul / Plata', price: 24500,
    category: 'relojes', model: 'Santos', color: 'Azul', strap: 'Brazalete',
    image: 'assets/santos-acero-cara-azul.png', illustration: true,
    description: 'Descripción de ejemplo. Carátula azul y brazalete de acabado plateado. Confirma y añade materiales, medidas y demás especificaciones de esta pieza.',
  },
  {
    id: 'santos-05', name: 'Santos 05 · Negro', price: 19500,
    category: 'relojes', model: 'Santos', color: 'Negro', strap: 'Piel',
    image: 'assets/santos-cuero-negro.png', illustration: true,
    description: 'Descripción de ejemplo. Una combinación en negro para un estilo sobrio. Escribe aquí la descripción completa de este reloj.',
  },
  {
    id: 'santos-06', name: 'Santos 06 · Verde / Plata', price: 26500,
    category: 'relojes', model: 'Santos', color: 'Verde', strap: 'Brazalete',
    image: 'assets/santos-acero-cara-verde.png', illustration: true,
    description: 'Descripción de ejemplo. Tonos verdes con un brazalete de acabado plateado. Edita este texto con las especificaciones reales del producto.',
  },
  {
    id: 'santos-07', name: 'Santos 07 · Rosa', price: 16500,
    category: 'relojes', model: 'Santos', color: 'Rosa', strap: 'Piel',
    image: 'assets/santos-cuero-rosa.png', illustration: true,
    description: 'Descripción de ejemplo. Una propuesta en rosa con detalles de acabado plateado. Sustituye este texto por la información que verá tu cliente.',
  },
  {
    id: 'santos-08', name: 'Santos 08 · Negro / Plata', price: 23500,
    category: 'relojes', model: 'Santos', color: 'Negro', strap: 'Brazalete',
    image: 'assets/santos-acero-cara-negra.png', illustration: true,
    description: 'Descripción de ejemplo. Carátula negra con brazalete de acabado plateado. Añade aquí los detalles de tu reloj y de su personalización.',
  },
  {
    id: 'santos-09', name: 'Santos 09 · Total negro', price: 28500,
    category: 'relojes', model: 'Santos', color: 'Negro', strap: 'Brazalete',
    image: 'assets/santos-acero-negro.png', illustration: true, featured: true,
    description: 'Descripción de ejemplo. Un diseño monocromático con presencia propia. Cambia esta descripción por la información real de la pieza.',
  },
  {
    id: 'centenario-01', name: 'Centenario · 50 pesos', price: 85000,
    category: 'centenarios', model: 'Centenario', color: 'Dorado', strap: '',
    image: 'assets/centenario.svg', illustration: true,
    description: 'Moneda mexicana de 50 pesos, conocida como Centenario, con 37.5 gramos de oro puro. Descripción de ejemplo: añade el año, la condición y los detalles de la pieza que ofreces.',
  },
];
