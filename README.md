# PlayNext Landing — Deployment Handoff

Este paquete contiene el landing page de PlayNext, listo para deployar. El código es funcional y **producción-ready en UI**; solo falta conectar el formulario de waitlist a un backend real y publicarlo.

> **Nota para Claude Code:** los archivos `.jsx` y `.html` de este paquete **NO son referencias de diseño** — son el código final del landing. Mantenlos tal cual están a menos que el usuario pida cambios visuales. El trabajo aquí es de **integración y deployment**, no de re-implementación.

---

## 📁 Archivos incluidos

| Archivo | Qué es |
|---|---|
| `PlayNext Landing.html` | HTML principal — entry point |
| `landing.css` | Estilos completos (sistema midnight + neon) |
| `landing.jsx` | Componente raíz: Nav, Hero, Features, Pricing, FAQ, Footer, Tweaks |
| `phone-preview.jsx` | Demo interactivo del teléfono dentro del hero |
| `waitlist-modal.jsx` | Modal de waitlist (formulario) — **necesita backend** |
| `app-shared.jsx` | Icons SVG + componente `AlbumArt` |
| `app-data.js` | Catálogo de canciones de ejemplo + analytics dummy |
| `tweaks-panel.jsx` | Panel de tweaks para variar acento/hero/densidad (dev-only) |

---

## ⚙️ Stack actual

- **React 18.3.1** desde CDN (unpkg)
- **Babel 7.29** standalone — transpila JSX en el navegador
- **Sin bundler, sin npm, sin build step** — funciona abriendo el HTML
- **Fuentes**: Space Grotesk + JetBrains Mono (Google Fonts)
- **No tiene backend.** El formulario guarda en `localStorage`.

---

## 🚦 Estado de funcionalidad

### ✅ Funciona
- Layout responsive completo (desktop + mobile)
- Demo interactivo del teléfono (pedir canción → ticket animado)
- Modal de waitlist con validación de email
- FAQ acordeón, scroll anclas
- Sistema de Tweaks (dev-only, panel flotante)

### ⚠️ Falta conectar
- **Formulario de waitlist**: actualmente guarda en `localStorage`. Hay que conectarlo a un servicio real.
- **Performance**: Babel en navegador es ~500KB extra + transpila en cliente. Conviene precompilar.
- **SEO**: faltan favicon, OG tags, meta robots.
- **Analytics**: ninguno instalado.

---

## 🎯 Tareas para llevarlo live

Estas son las tareas, en orden de prioridad. Cada una es independiente.

### 1. Conectar formulario de waitlist a un backend real ⭐ CRÍTICO

El formulario está en `waitlist-modal.jsx`. Mira el bloque `submit`:

```js
const submit = (e) => {
  e.preventDefault();
  // ... validación ...

  // 👇 ACÁ se hace el POST. Hoy solo guarda en localStorage.
  try {
    const key = 'playnext_waitlist';
    const existing = JSON.parse(localStorage.getItem(key) || '[]');
    existing.push({ ...form, ts: new Date().toISOString() });
    localStorage.setItem(key, JSON.stringify(existing));
  } catch (e) { /* ignore */ }

  setSubmitted(true);
};
```

**Reemplazar con un fetch a uno de estos servicios:**

#### Opción A: Formspree (más rápido — 5 min)
1. Crear cuenta en https://formspree.io
2. Crear un nuevo form, copiar el endpoint (ej. `https://formspree.io/f/xyzabcde`)
3. Reemplazar el bloque por:

```js
const submit = async (e) => {
  e.preventDefault();
  const errs = {};
  if (!form.name.trim()) errs.name = 'Requerido';
  if (!form.email.trim()) errs.email = 'Requerido';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
  setErrors(errs);
  if (Object.keys(errs).length) return;

  try {
    const res = await fetch('https://formspree.io/f/TU_ENDPOINT', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(form),
    });
    if (!res.ok) throw new Error('submit failed');
    setSubmitted(true);
  } catch (err) {
    setErrors({ form: 'No se pudo enviar. Intentá de nuevo.' });
  }
};
```

**Free tier**: 50 submissions/mes. Te llega un email por cada signup.

#### Opción B: Tally (más bonito, mejor dashboard)
- https://tally.so → crear form → embeber o usar API
- Free unlimited submissions, exporta a Notion/Sheets/Airtable.

#### Opción C: Supabase (más pro, escalable)
- Crear proyecto en https://supabase.com
- Tabla `waitlist` con columnas matching las del form
- Cliente JS:

```js
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// dentro de submit():
const { error } = await supabase.from('waitlist').insert([form])
if (error) { /* handle */ }
```

Free tier: 50k filas + auth + más. Recomendable si vas a crecer.

---

### 2. Agregar favicon + Open Graph tags

En el `<head>` de `PlayNext Landing.html`, agregar:

```html
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">

<!-- Open Graph -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://playnext.app/">
<meta property="og:title" content="PlayNext — Complacencias en vivo para músicos">
<meta property="og:description" content="Tu próximo set lo elige el público. Cobra propinas, llena tu cola, mide tu show.">
<meta property="og:image" content="https://playnext.app/og-image.png">

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="PlayNext — Complacencias en vivo">
<meta name="twitter:description" content="Tu próximo set lo elige el público.">
<meta name="twitter:image" content="https://playnext.app/og-image.png">
```

**Necesitas crear**:
- `favicon.svg` (el play-button morado de PlayNext, ya está como SVG inline en `app-shared.jsx`)
- `og-image.png` 1200×630 — screenshot del hero o composición custom

---

### 3. Migrar fuera de Babel-in-browser (opcional, recomendado)

Esto mejora el primer load ~1-2s. Tres niveles de esfuerzo:

#### Nivel 1: Standalone HTML bundleado
Mantener el mismo código JSX pero precompilarlo. Usa el skill **"Save as standalone HTML"** del editor de diseño, o un script Node:

```bash
npx @babel/cli@7 --presets=@babel/preset-react -d compiled/ *.jsx
```

Y reemplazar los `<script type="text/babel" src="...jsx">` por los `.js` compilados.

#### Nivel 2: Migrar a Vite (recomendado a largo plazo)
```bash
npm create vite@latest playnext-landing -- --template react
```
Mover el código a `src/`, instalar React local, build a estático con `npm run build`. El output va en `dist/`.

#### Nivel 3: Migrar a Next.js
Solo si vas a agregar más páginas, blog, dashboard, etc. Overkill para un landing solo.

---

### 4. Deployar

Cualquiera de estos hostings funciona — todos tienen free tier:

| Hosting | Setup | Notas |
|---|---|---|
| **Netlify** | Drag & drop la carpeta, o conectar a GitHub | Más fácil. Forms gratis (alternativa a Formspree). |
| **Vercel** | `vercel deploy` o conectar GitHub | Mejor performance + DX si usas Next.js. |
| **Cloudflare Pages** | Conectar GitHub | Más barato a escala, CDN global. |
| **GitHub Pages** | Push a `gh-pages` branch | 100% gratis, pero más lento. |

Si dejas el código tal cual (Babel-in-browser), **funciona en todos** sin build step. Solo subir los archivos.

---

### 5. Apuntar dominio

Compra `playnext.app` o lo que sea. DNS:
- Netlify/Vercel/Cloudflare: agregar el dominio en su dashboard, sigue las instrucciones DNS.

---

### 6. Analytics (opcional)

Tres opciones, en orden de simplicidad:
- **Plausible** (https://plausible.io) — pagado, privacy-first, sin cookies. Setup: 1 script tag.
- **Cloudflare Web Analytics** — gratis si usas Cloudflare Pages.
- **Google Analytics 4** — gratis, más complejo, requiere cookie banner.

---

## 🎨 Design tokens (por si necesitas referencia)

### Colores
```css
--bg: oklch(0.15 0.02 250);          /* slate-deep */
--bg-deep: oklch(0.09 0.015 250);    /* almost black */
--surface: oklch(0.18 0.02 250);
--surface-2: oklch(0.22 0.022 250);
--border: oklch(0.28 0.02 250);
--text: oklch(0.97 0.005 250);
--text-muted: oklch(0.72 0.015 250);

/* Acentos */
--neon: oklch(0.68 0.22 300);        /* violeta */
--emerald: oklch(0.78 0.18 155);     /* verde de ticket */
```

### Tipografía
- **Space Grotesk** 400/500/600/700 — body + titulares
- **JetBrains Mono** 400/500/600/700 — etiquetas, eyebrows, números

### Spacing
- `--gutter`: clamp(20px, 4vw, 48px)
- Border radius: 10/14/22/32px (sm/md/lg/xl)

---

## 📋 Quick start (TL;DR)

Si solo quieres ponerlo live YA:

1. Crea cuenta en **Formspree**, copia el endpoint
2. Reemplaza el `submit` en `waitlist-modal.jsx` con el código de Opción A arriba
3. Drag & drop la carpeta entera en **Netlify** (https://app.netlify.com/drop)
4. Listo, tienes URL pública en 30 segundos

Lo demás (favicon, OG, performance) puedes hacerlo después.

---

## 📬 Contacto

Este handoff fue generado desde el proyecto de diseño en Claude. Las decisiones de copy y diseño están documentadas en el chat original — si Claude Code necesita más contexto, pide el link al proyecto fuente.
