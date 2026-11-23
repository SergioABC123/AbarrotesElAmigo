/* Comportamiento del catálogo. Datos y contacto: edita data.js. */
(() => {
  'use strict';
  const store = window.STORE;
  const products = window.PRODUCTS;
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const fields = { search: $('#search'), color: $('#color'), strap: $('#strap'), model: $('#model'), sort: $('#sort') };
  const state = { category: 'relojes' };
  const grid = $('#product-grid');
  const normalize = (text) => String(text).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const money = (price) => new Intl.NumberFormat(store.locale, { style: 'currency', currency: store.currency, maximumFractionDigits: 0 }).format(price);
  // No se introduce HTML procedente de nombres o descripciones editables.
  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
  }
  function priceNode(price) {
    const fragment = document.createDocumentFragment();
    fragment.append(document.createTextNode(money(price)), node('small', '', store.currency));
    return fragment;
  }
  function imageFallback(image) {
    image.addEventListener('error', () => {
      image.src = 'assets/image-placeholder.svg';
      image.alt = 'Imagen no disponible de esta pieza';
    }, { once: true });
  }
  function phone() { return String(store.phone || '').replace(/\D/g, ''); }
  function whatsappLink(product) {
    const message = product ? `Hola, me interesa ${product.name} (referencia ${product.id}). ¿Me puedes dar más información?` : `Hola, me gustaría conocer más sobre la colección de ${store.name}.`;
    return `https://wa.me/${phone()}?text=${encodeURIComponent(message)}`;
  }
  function contactAction(product) {
    if (!phone()) {
      const button = node('button', 'button button-primary', 'Contacto próximamente');
      button.type = 'button';
      button.disabled = true;
      return button;
    }
    const link = node('a', 'button button-primary', product ? 'Consultar esta pieza' : 'Escribir por WhatsApp');
    link.href = whatsappLink(product);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.append(node('span', '', '↗'));
    return link;
  }
  function showDialog(dialog) {
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add('dialog-open');
  }
  function detail(product) {
    const image = $('#detail-image');
    image.src = product.image;
    image.alt = `${product.illustration ? 'Ilustración provisional' : 'Fotografía'} de ${product.name}`;
    $('#detail-title').textContent = product.name;
    $('#detail-category').textContent = `${product.category === 'relojes' ? 'Relojes' : 'Piezas de oro'} / ${product.model}`;
    $('#detail-price').replaceChildren(priceNode(product.price));
    $('#detail-description').textContent = product.description;
    $('#detail-example').hidden = !store.pricesAreExamples;
    $('#detail-image-caption').hidden = !product.illustration;
    const specs = product.category === 'relojes' ? [['Modelo', product.model], ['Color', product.color], ['Correa', product.strap], ['Personalización', 'Aftermarket']] : [['Pieza', 'Centenario mexicano'], ['Valor nominal', '50 pesos'], ['Oro puro', '37.5 gramos']];
    $('#detail-specs').replaceChildren(...specs.map(([label, value]) => {
      const row = node('div');
      row.append(node('dt', '', label), node('dd', '', value));
      return row;
    }));
    $('#detail-contact').replaceChildren(contactAction(product));
    $('#detail-footnote').textContent = product.category === 'relojes' ? 'Personalización aftermarket. Consulta las características de esta pieza antes de comprar.' : 'Consulta el año, la condición y la disponibilidad de esta pieza antes de comprar.';
    showDialog($('#product-dialog'));
  }
  function card(product) {
    const article = node('article', 'product-card');
    const button = node('button', 'product-button');
    button.type = 'button';
    button.setAttribute('aria-label', `Ver ${product.name}, ${money(product.price)} ${store.currency}`);
    const picture = node('div', 'product-picture');
    picture.append(node('span', 'product-category', product.model));
    const img = node('img');
    img.src = product.image;
    img.alt = `${product.illustration ? 'Ilustración provisional' : 'Fotografía'} de ${product.name}`;
    img.width = 500;
    img.height = 650;
    img.loading = 'lazy';
    img.decoding = 'async';
    imageFallback(img);
    picture.append(img);
    if (product.illustration) picture.append(node('span', 'image-caption', 'VISTA ILUSTRATIVA'));
    const arrow = node('span', 'product-open-icon', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    picture.append(arrow);
    const info = node('div', 'product-info');
    const meta = product.category === 'relojes' ? `${product.strap === 'Piel' ? 'CORREA DE PIEL' : 'BRAZALETE'} / ${product.color}` : 'MÉXICO / ORO';
    info.append(node('p', 'product-meta', meta), node('h3', 'product-title', product.name));
    const price = node('p', 'product-price');
    price.append(priceNode(product.price));
    info.append(price);
    button.append(picture, info);
    button.addEventListener('click', () => detail(product));
    article.append(button);
    return article;
  }
  function fillSelect(field, values, selected) {
    // Conserva la primera opción («Todos…»).
    [...field.options].slice(1).forEach(option => option.remove());
    [...new Set(values.filter(Boolean))].sort((a, b) => a.localeCompare(b, store.locale)).forEach(value => field.add(new Option(value, value)));
    if ([...field.options].some(option => option.value === selected)) field.value = selected;
    else field.value = '';
  }
  function updateFilterOptions() {
    const group = products.filter(p => state.category === 'todos' || p.category === state.category);
    fillSelect(fields.color, group.map(p => p.color), fields.color.value);
    fillSelect(fields.strap, group.map(p => p.strap), fields.strap.value);
    fillSelect(fields.model, group.map(p => p.model), fields.model.value);
    fields.strap.disabled = state.category === 'centenarios';
  }
  function render() {
    const query = normalize(fields.search.value);
    const filtered = products.filter(p =>
      (state.category === 'todos' || p.category === state.category) &&
      (!query || normalize(`${p.name} ${p.model} ${p.color} ${p.strap} ${p.category} ${p.description}`).includes(query)) &&
      (!fields.color.value || p.color === fields.color.value) &&
      (!fields.strap.value || p.strap === fields.strap.value) &&
      (!fields.model.value || p.model === fields.model.value)
    );
    if (fields.sort.value === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    if (fields.sort.value === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    grid.replaceChildren(...filtered.map(card));
    $('#empty-state').hidden = filtered.length > 0;
    grid.hidden = filtered.length === 0;
    $('#result-count').textContent = `${filtered.length} ${filtered.length === 1 ? 'pieza encontrada' : 'piezas encontradas'}`;
    $('#reset-filters').hidden = !Object.values(fields).some(field => field.id === 'sort' ? field.value !== 'featured' : !!field.value);
  }
  function reset() {
    Object.values(fields).forEach(field => { field.value = field.id === 'sort' ? 'featured' : ''; });
    render();
  }
  function category(value) {
    state.category = value;
    $$('.tab').forEach(tab => {
      const active = tab.dataset.category === value;
      tab.classList.toggle('active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    // Al cambiar de categoría, la búsqueda y los filtros vuelven al inicio.
    reset();
    updateFilterOptions();
    render();
  }
  $('#filters').addEventListener('submit', event => event.preventDefault());
  Object.values(fields).forEach(field => field.addEventListener(field.id === 'search' ? 'input' : 'change', render));
  $$('.tab').forEach(tab => tab.addEventListener('click', () => category(tab.dataset.category)));
  $('#reset-filters').addEventListener('click', reset);
  $('#empty-reset').addEventListener('click', () => { category('todos'); fields.search.focus(); });
  $('#view-coins').addEventListener('click', () => { category('centenarios'); $('#coleccion').scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); });

  const themeToggle = $('#theme-toggle');
  function applyTheme(theme, save = false) {
    document.documentElement.dataset.theme = theme;
    const dark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(dark));
    themeToggle.setAttribute('aria-label', dark ? 'Activar modo claro' : 'Activar modo oscuro');
    $('meta[name="theme-color"]').content = dark ? '#0b0b0c' : '#f8f7f3';
    if (save) { try { localStorage.setItem('pendiente-theme', theme); } catch (_) { /* También funciona sin almacenamiento. */ } }
  }
  applyTheme(document.documentElement.dataset.theme);
  themeToggle.addEventListener('click', () => applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark', true));

  $$('dialog').forEach(dialog => {
    dialog.addEventListener('close', () => { if (!$('dialog[open]')) document.body.classList.remove('dialog-open'); });
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    });
  });
  $$('[data-close]').forEach(button => button.addEventListener('click', () => document.getElementById(button.dataset.close).close()));
  $$('.contact-trigger').forEach(button => button.addEventListener('click', () => {
    const content = $('#contact-content');
    content.replaceChildren();
    if (phone()) {
      content.append(node('p', '', 'Cuéntanos qué pieza te interesa. Te ayudamos a conocer sus detalles y disponibilidad.'));
      const tel = node('a', 'contact-phone', `+${phone()}`);
      tel.href = `tel:+${phone()}`;
      content.append(tel, contactAction());
    } else {
      content.append(node('p', '', 'Nuestros canales de atención estarán disponibles próximamente. Mientras tanto, explora la colección y encuentra tu próxima pieza.'));
      const close = node('button', 'button button-primary', 'Seguir explorando');
      close.type = 'button';
      close.addEventListener('click', () => { $('#contact-dialog').close(); $('#coleccion').scrollIntoView(); });
      content.append(close);
    }
    showDialog($('#contact-dialog'));
  }));

  $$('[data-store-name]').forEach(element => element.replaceChildren(document.createTextNode(store.name), node('span', 'brand-dot', '.')));
  $$('[data-store-name-plain]').forEach(element => { element.textContent = store.name; });
  $$('[data-store-tagline]').forEach(element => { element.textContent = store.tagline; });
  document.title = `${store.name} · ${store.tagline}`;
  $$('.brand').forEach(element => { if (element.hasAttribute('aria-label')) element.setAttribute('aria-label', `${store.name}, inicio`); });
  $('#year').textContent = new Date().getFullYear();
  $('#example-note').hidden = !store.pricesAreExamples;
  $('#watch-count').textContent = String(products.filter(p => p.category === 'relojes').length).padStart(2, '0');
  $('#coin-count').textContent = String(products.filter(p => p.category === 'centenarios').length).padStart(2, '0');
  const featured = products.find(p => p.featured) || products.find(p => p.category === 'relojes') || products[0];
  if (featured) {
    $('#hero-image').src = featured.image;
    $('#hero-image').alt = `${featured.illustration ? 'Ilustración provisional' : 'Fotografía'} de ${featured.name}`;
    $('.hero-arch .image-caption').hidden = !featured.illustration;
    $('#hero-product-name').textContent = featured.name;
    $('#hero-product').addEventListener('click', () => detail(featured));
    $('.hero-index').textContent = `01 / ${String(products.filter(p => p.category === 'relojes').length).padStart(2, '0')}`;
  } else { $('#hero-product').hidden = true; }
  const coin = products.find(p => p.category === 'centenarios');
  if (coin) {
    const image = $('.gold-visual img');
    image.src = coin.image;
    image.alt = `${coin.illustration ? 'Ilustración provisional' : 'Fotografía'} de ${coin.name}`;
    $('.gold-visual .image-caption').hidden = !coin.illustration;
    imageFallback(image);
  }
  imageFallback($('#hero-image'));
  imageFallback($('#detail-image'));
  updateFilterOptions();
  render();
})();
