# Pendiente · Tienda estática

Catálogo de relojes y centenarios hecho con HTML, CSS y JavaScript. No requiere npm, dependencias ni compilación. Los nombres, precios y descripciones son ejemplos para sustituir antes de usar el catálogo comercialmente.

## Abrir la tienda

Abre `dist/index.html` en tu navegador. También puedes iniciar un servidor local desde la carpeta del proyecto:

```bash
python3 -m http.server 8000 --directory dist
```

Visita `http://localhost:8000`. Para detenerlo, pulsa `Ctrl+C` en la terminal.

## Editar el contenido

Todo el contenido editable está en `dist/data.js`:

- `window.STORE`: configuración general, incluido el nombre provisional **Pendiente** y el teléfono.
- `window.PRODUCTS`: catálogo; cambia nombres, precios, descripciones, imágenes y características de cada pieza.

Los precios se escriben como números, sin `$`, comas ni texto; por ejemplo, `12500`. La tienda los muestra en pesos mexicanos (MXN). Mantén un identificador distinto para cada producto y conserva los nombres de las propiedades existentes.

Cuando hayas añadido tus precios y descripciones reales, cambia `pricesAreExamples: true` a `pricesAreExamples: false` para ocultar los avisos de datos de ejemplo. Marca una sola pieza con `featured: true` para mostrarla en la portada.

El teléfono se configura una sola vez en `STORE.phone`. Escribe únicamente dígitos, con código de país, sin `+`, espacios ni guiones; por ejemplo, un número mexicano con prefijo `52`. Inicialmente está vacío: los enlaces de pedido quedan deshabilitados y la página muestra un aviso hasta que lo completes.

## Cambiar fotografías

Copia los archivos a `dist/assets/` y cambia la ruta de la imagen en el producto correspondiente; por ejemplo, `assets/reloj-verde.png`. Usa nombres de archivo sencillos y respeta mayúsculas y minúsculas. Los marcadores de imagen se identifican como provisionales hasta incorporar los archivos originales.

En cada producto cuya imagen ya sea una fotografía real, cambia `illustration: true` a `illustration: false`. Así desaparece el rótulo «Vista ilustrativa». Las nueve imágenes mostradas en el chat no estuvieron disponibles como archivos descargables durante la construcción; los SVG incluidos son ilustraciones provisionales, no copias de esas fotos.

```js
{
  id: 'santos-01', // único: consérvalo estable
  name: 'Nombre de tu reloj',
  price: 18500,
  category: 'relojes', // o 'centenarios'
  model: 'Santos',
  color: 'Verde',
  strap: 'Piel', // 'Brazalete' u otro valor
  image: 'assets/reloj-verde.png',
  illustration: false,
  featured: true,
  description: 'Tu descripción real.',
}
```

Para añadir otra pieza, duplica un objeto dentro de `window.PRODUCTS` y asigna un `id` distinto. Las opciones de filtro se crean a partir del catálogo. Para cambiar colores del diseño, edita las variables al inicio de `dist/styles.css`; las del modo oscuro están en `[data-theme=dark]`.

## Publicación gratuita

- **GitHub Pages:** sube el contenido de `dist/` a la raíz de un repositorio y activa Pages desde la rama donde lo hayas guardado.
- **Cloudflare Pages:** utiliza la carga directa y sube el contenido de `dist/`. No necesitas ejecutar una compilación.

Mantén `index.html`, los archivos CSS y JavaScript y la carpeta `assets/` con sus rutas relativas. Los planes gratuitos están sujetos a los límites de cada proveedor.

## Alcance de esta versión

Los filtros y el cambio de tema funcionan en el navegador. La elección de modo claro u oscuro se guarda localmente mediante `localStorage` cuando el navegador lo permite.

Esta versión no procesa pagos, envíos ni pedidos, y no mantiene inventario real. El contacto para consultar una pieza abre WhatsApp cuando hayas configurado el teléfono. El catálogo presenta personalizaciones **aftermarket**: es una tienda independiente y no una tienda oficial de Cartier. Sustituye los datos de ejemplo y confirma las características reales de las piezas antes de publicar la oferta definitiva.
