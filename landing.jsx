// PlayNext — Landing Page main app
// Audience: musicians. CTAs open the waitlist modal (beta privada).

const { useState, useEffect } = React;

const openWaitlist = (e) => {
  if (e) e.preventDefault();
  window.dispatchEvent(new CustomEvent('open-waitlist'));
};

/* ===================== Atoms ===================== */
function Logo({ size = 32 }) {
  return (
    <div className="nav-logo">
      <div className="mark" style={{ width: size, height: size }}>
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M7 5v14l12-7z" fill="oklch(0.14 0.04 155)" />
        </svg>
      </div>
      <div>Play<span className="next">Next</span></div>
    </div>);

}

const CheckSm = () =>
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12.5 10 18 20 6" />
  </svg>;


const Arrow = () =>
<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>;


/* ===================== Nav ===================== */
function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <Logo />
        <nav className="nav-links">
          <a href="#como-funciona">Cómo funciona</a>
          <a href="#preview">Demo</a>
          <a href="#features">Features</a>
          <a href="#pricing">Precios</a>
          <a href="#faq">FAQ</a>
        </nav>
        <div className="nav-cta">
          <a className="btn btn-primary" href="#waitlist" onClick={openWaitlist}>Sumarme a la beta <Arrow /></a>
        </div>
      </div>
    </header>);

}

/* ===================== Hero ===================== */
function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-inner">
        <div>
          <div className="live-pill">
            <span className="pulse-dot"></span>
            COMPLACENCIAS EN VIVO · BETA
          </div>
          <h1>
            La próxima canción<br />
            la elige <span className="accent">el público</span>.
          </h1>
          <p className="hero-sub">Haz que todos se sientan parte.</p>
          <div className="hero-cta">
            <a className="btn btn-primary btn-xl" href="#waitlist" onClick={openWaitlist}>
              Sumarme a la beta <Arrow />
            </a>
          </div>
          <div className="hero-microcopy">
            <span className="ok">●</span>
            <span>Comienza gratis</span>
          </div>
        </div>

        <div className="phone-stage">
          <PhonePreview />
          <div className="float-chip right">
            <div className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 11h-6M22 14h-6" />
              </svg>
            </div>
            <div>
              <div className="mono">EN COLA</div>
              <div className="val">142 fans</div>
            </div>
          </div>
          <div className="float-chip left emerald">
            <div className="icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18V5l12-2v13" />
                <circle cx="6" cy="18" r="3" />
                <circle cx="18" cy="16" r="3" />
              </svg>
            </div>
            <div>
              <div className="mono">NUEVO PEDIDO</div>
              <div className="val">Wonderwall</div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ===================== How it works ===================== */
function HowItWorks() {
  return (
    <section className="how" id="como-funciona">
      <div className="wrap">
        <div className="how-header">
          <div>
            <span className="eyebrow">Cómo funciona</span>
            <h2 className="section-title">Listo para cualquier show.<br />Sin complicaciones.</h2>
          </div>
          <p className="section-sub">Configura tu setlist, comparte el QR y empieza a recibir pedidos en minutos.

          </p>
        </div>

        <div className="steps">
          <div className="step">
            <div className="step-num"><span className="n">1</span> SETLIST</div>
            <h3>Subes lo que tocas</h3>
            <p>Acceso a tu repertorio, agrupa por época, vibe, genero, idioma, como prefieras.</p>
            <div className="step-visual">
              <div style={{ display: 'flex', gap: 6 }}>
                {['80s', '90s', '2000s'].map((t) =>
                <span key={t} className="p-era active" style={{ fontSize: 11 }}>{t}</span>
                )}
              </div>
            </div>
          </div>

          <div className="step">
            <div className="step-num"><span className="n">2</span> QR</div>
            <h3>A un QR de distancia.</h3>
            <p>Los fans lo escanean desde su mesa. Sin descargar nada. Funciona en cualquier dispositivo.</p>
            <div className="step-visual">
              <div className="qr"><div className="qr-corner"></div></div>
            </div>
          </div>

          <div className="step">
            <div className="step-num"><span className="n">3</span> COLA</div>
            <h3>Tú tocas, PlayNext ordena</h3>
            <p>La lista se prioriza en el orden que se pidieron. El público puede votar las favoritas de la lista para darles prioridad.</p>
            <div className="step-visual">
              <div className="queue-vis">
                <div className="queue-vis-row first">
                  <span className="num">#1</span>
                  <span className="name">Hotel California</span>
                  <span className="tip"></span>
                </div>
                <div className="queue-vis-row">
                  <span className="num">#2</span>
                  <span className="name">Sweet Child O' Mine</span>
                  <span className="tip"></span>
                </div>
                <div className="queue-vis-row">
                  <span className="num">#3</span>
                  <span className="name">Wonderwall</span>
                  <span className="tip"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ===================== Two sides ===================== */
function TwoSides() {
  return (
    <section className="two-sides" id="preview">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <span className="eyebrow">Dos lados del escenario</span>
          <h2 className="section-title">Una sola app.<br />Una mejor noche para todos.</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Diseñado para conectar al público con el show.

          </p>
        </div>

        <div className="sides">
          <div className="side fan">
            <div className="side-header">
              <span className="side-tag">· PARA EL FAN ·</span>
            </div>
            <h3>Pide tu canción sin gritar.</h3>
            <p>Escaneas, encuentras tu tema preferido.</p>
            <ul>
              <li><CheckSm /> Setlist completo del músico, filtrable por era o vibe</li>
              <li><CheckSm /> Setlists específicos para eventos privado</li>
              <li><CheckSm /> Sabrán quién es el artista y su contacto</li>
              <li><CheckSm /> No más servilletas, lapiceros o gritos a distancia</li>
            </ul>
          </div>

          <div className="side musico">
            <div className="side-header">
              <span className="side-tag">· PARA EL MÚSICO ·</span>
            </div>
            <h3>La cola se ordena sola.</h3>
            <p>Tú eliges Play o Reject. Pausa entre sets sin estrés. Mira cuáles son las peticiones favoritas.</p>
            <ul>
              <li><CheckSm /> Solo complacencias que sí tienes.</li>
              <li><CheckSm /> Clientes a un click de tus redes y contacto</li>
              <li><CheckSm /> Song Battle Mode: el publico vota las favoritas en cola</li>
              <li><CheckSm /> Analytics: Cantidad de requests, canciones más pedidas, clicks en redes y más.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>);

}

/* ===================== Features ===================== */
const FEATURES = [
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="9" /></svg>,
  title: 'Complacencias en tiempo real',
  body: 'Cada pedido aparece al instante en tu pantalla. Sin refrescar nada.'
},
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="9" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="13" y2="16"/></svg>,
  title: 'Setlists privados para eventos',
  body: 'El cliente define qué se puede pedir. Los invitados interactúan dentro de ese repertorio. Bodas, corporativos, fiestas privadas.',
  emerald: true
},
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></svg>,
  title: 'Song Battle Mode',
  body: 'El publico da like a las canciones en cola y se ordenará por las más votadas.'
},
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>,
  title: 'Notas del fan',
  body: '"Para el cumple de mi novia 🖤". Recibes el mensaje junto al pedido.'
},
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h4l3-9 6 18 3-9h4" /></svg>,
  title: 'Analytics post-show',
  body: 'Top canciones, scans únicos, propinas, retención. Listo para Instagram.'
},
{
  icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  title: 'Sin descargas',
  body: 'El fan escanea y listo. PWA, funciona en cualquier celular con cámara.'
}];


function Features() {
  return (
    <section className="features" id="features">
      <div className="wrap">
        <div style={{ maxWidth: 720 }}>
          <span className="eyebrow">Features</span>
          <h2 className="section-title">Hecho para eventos reales.</h2>
          <p className="section-sub">
            Cada función nació de un problema real en escenario. No hay nada de relleno.
          </p>
        </div>
        <div className="feat-grid">
          {FEATURES.map((f, i) =>
          <div key={i} className={`feat ${f.emerald ? 'emerald' : ''}`}>
              <div className="feat-icon">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.body}</p>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ===================== Analytics teaser ===================== */
function AnalyticsTeaser() {
  const A = window.ANALYTICS || { uniqueScans: 142, totalRequests: 87, played: 24, avgTip: 4.20 };
  const top = (A.topRequested || []).slice(0, 4);
  const songsById = Object.fromEntries((window.SONGS || []).map((s) => [s.id, s]));
  const maxCount = Math.max(...top.map((t) => t.count), 1);

  return (
    <section className="analytics">
      <div className="wrap analytics-inner">
        <div>
          <span className="eyebrow">Analytics</span>
          <h2 className="section-title">Conoce mejor<br />a tu público.</h2>
          <p className="section-sub">Cada noche genera datos: qué canciones piden más, cuántos escanearon, cuánto dejaron en tips. Útil para armar tu próximo setlist o mostrar estadística a tus clientes.

          </p>
          <div className="hero-cta">
            <a className="btn btn-soft btn-lg" href="#waitlist" onClick={openWaitlist}>
              Sumarme a la beta <Arrow />
            </a>
          </div>
        </div>

        <div className="kpis">
          <div className="kpi-card">
            <div className="kpi-label">Scans únicos</div>
            <div className="kpi-n neon">{A.uniqueScans}</div>
            <div className="kpi-sub">+38% vs. el show anterior</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">TIP PROMEDIO (PROXIMAMENTE)</div>
            <div className="kpi-n emerald">${A.avgTip?.toFixed?.(2) || '4.20'}</div>
            <div className="kpi-sub">por canción pedida</div>
          </div>
          <div className="kpi-card big">
            <div className="kpi-label">Top requested · esta noche</div>
            <div className="kpi-bars">
              {top.map((t, i) => {
                const song = songsById[t.songId];
                if (!song) return null;
                return (
                  <div key={t.songId}>
                    <div className="kpi-bar-row">
                      <div className="kpi-bar-name">{song.name} <span style={{ color: 'var(--text-dim)', fontWeight: 500 }}>· {song.artist}</span></div>
                      <div className="kpi-bar-count">{t.count}</div>
                    </div>
                    <div className="kpi-bar-track">
                      <div className="kpi-bar-fill" style={{ width: `${t.count / maxCount * 100}%` }}></div>
                    </div>
                  </div>);

              })}
            </div>
          </div>
        </div>
      </div>
    </section>);

}

/* ===================== Pricing ===================== */
function Pricing() {
  return (
    <section className="pricing" id="pricing">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <span className="eyebrow">Precios</span>
          <h2 className="section-title">Lleva tus shows al siguiente nivel.</h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>Desde complacencias simples hasta analytics, branding y tips integrados.

          </p>
        </div>

        <div className="plans">
          <div className="plan">
            <div className="plan-name">Free</div>
            <div className="plan-price">
              <span className="num">$0</span>
              <span className="per">/ siempre</span>
            </div>
            <p className="plan-desc">Ideal para empezar a probar con tus próximos shows.</p>
            <ul>
              <li><CheckSm /> 1 show activo por mes</li>
              <li><CheckSm /> Setlist con hasta 30 canciones</li>
              <li><CheckSm /> Cola en tiempo real</li>
              <li><CheckSm /> QR personalizado básico</li>
              <li><CheckSm /> Propinas integradas (15% fee) (priximamente)</li>
              <li className="muted"><CheckSm /> Propinas integradas (próximamente)</li>
            </ul>
            <a className="btn btn-ghost btn-lg" href="#waitlist" onClick={openWaitlist}>Sumarme a la beta</a>
          </div>

          <div className="plan pro">
            <div className="plan-badge">PRÓXIMAMENTE</div>
            <div className="plan-name">Pro</div>
            <div className="plan-price">
              <span className="cur">$</span>
              <span className="num">12</span>
              <span className="per">/ mes</span>
            </div>
            <p className="plan-desc">Para músicos que tocan en serio y quieren los datos.</p>
            <ul>
              <li><CheckSm /> Shows ilimitados</li>
              <li><CheckSm /> Catálogo sin límite</li>
              <li><CheckSm /> Tips 0% fee - Todo es tuyo</li>
              <li><CheckSm /> Branding completo (logo, colores, contacto)</li>
              <li><CheckSm /> Analytics histórico completo</li>
              <li><CheckSm /> Battle Songs Mode: Habilitado</li>
              <li><CheckSm /> Soporte prioritario</li>
            </ul>
            <a className="btn btn-primary btn-lg" href="#waitlist" onClick={openWaitlist}>Avísame cuando esté disponible</a>
          </div>
        </div>
      </div>
    </section>);

}

/* ===================== FAQ ===================== */
const FAQS = [
{
  q: '¿El fan necesita descargar una app?',
  a: 'No. PlayNext es una web app. El fan escanea el QR con la cámara, se abre en el navegador y listo. Funciona en cualquier celular con conexión. También puede ingresar por medio de link.'
},
{
  q: '¿Cómo recibo el dinero de los tips?',
  a: 'Las propinas vienen en camino. Cuando estén disponibles, conectarás tu cuenta de pago (Stripe, Mercado Pago, según país) y el monto llegará directo a tu cuenta. Free tendrá un fee del 15%; Pro será 0%.'
},
{
  q: '¿Puedo agregar cualquier canción?',
  a: 'Sí. Tú armas tu propio setlist con las canciones que tocas — sin restricción de género ni límite de catálogo. Tú decides qué entra y qué no, y puedes desactivar canciones cuando quieras.'
},
{
  q: '¿Qué pasa si me piden una canción que no quiero tocar?',
  a: 'Las desactivas del setlist con un toggle. Y siempre puedes rechazar pedidos individuales con un tap, el fan ve que su pedido fue declinado sin drama.'
},
{
  q: '¿Necesito hardware especial?',
  a: 'Solo un teléfono o tablet con tu panel de músico abierto. El bar solo necesita imprimir el QR — un papel A5 sobre la mesa basta.'
}];


function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <div className="wrap">
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto' }}>
          <span className="eyebrow">FAQ</span>
          <h2 className="section-title">Preguntas frecuentes.</h2>
        </div>
        <div className="faq-list">
          {FAQS.map((f, i) =>
          <div key={i} className={`faq-item ${open === i ? 'open' : ''}`}>
              <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
                <span>{f.q}</span>
                <span className="faq-toggle">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </span>
              </button>
              <div className="faq-a"><p>{f.a}</p></div>
            </div>
          )}
        </div>
      </div>
    </section>);

}

/* ===================== Final CTA ===================== */
function FinalCTA() {
  return (
    <section className="final">
      <div className="wrap final-inner">
        <span className="eyebrow">Tu próxima tocada</span>
        <h2>Empieza con<br />un <span className="accent">QR</span>.</h2>
        <p>
          Crea tu setlist, comparte el QR con el venue, y deja que el público haga el resto. Gratis para siempre en tu primer show del mes.
        </p>
        <div className="hero-cta">
          <a className="btn btn-primary btn-xl" href="#waitlist" onClick={openWaitlist}>
            Sumarme a la beta <Arrow />
          </a>
        </div>
        <div className="hero-microcopy" style={{ justifyContent: 'center' }}>
          <span className="ok">●</span>
          <span>No pedimos tarjeta</span>
          <span className="dot"></span>
          <span>Listo en 5 minutos</span>
          <span className="dot"></span>
          <span>Sin contratos</span>
        </div>
      </div>
    </section>);

}

/* ===================== Footer ===================== */
function FooterLanding() {
  const socials = [
  { k: 'Instagram', I: Icon.Instagram },
  // Próximamente — descomentar cuando estén activos
  // { k: 'X', I: Icon.X_twitter },
  // { k: 'TikTok', I: Icon.TikTok },
  // { k: 'Spotify', I: Icon.Spotify },
  // { k: 'YouTube', I: Icon.YouTube },
  ];

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-brand-row">
          <div className="footer-brand">
            <Logo />
            <p>Complacencias en vivo, sin el caos. Hecho por músicos, para músicos.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-legal">PLAYNEXT · v2.4 · © 2026 · Hecho con 🎸</div>
          <div className="socials">
            {socials.map((s) =>
            <a key={s.k} className="social" href="#" aria-label={s.k} onClick={(e) => e.preventDefault()}>
                <s.I />
              </a>
            )}
          </div>
        </div>
      </div>
    </footer>);

}

/* ===================== Tweaks ===================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "violet",
  "hero": "split",
  "density": "regular"
} /*EDITMODE-END*/;

function TweaksUI() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  useEffect(() => {
    const map = { violet: '', emerald: 'emerald', amber: 'amber', rose: 'rose' };
    const root = document.documentElement;
    if (map[t.accent]) root.setAttribute('data-accent', map[t.accent]);else
    root.removeAttribute('data-accent');

    if (t.hero && t.hero !== 'split') root.setAttribute('data-hero', t.hero);else
    root.removeAttribute('data-hero');

    if (t.density && t.density !== 'regular') root.setAttribute('data-density', t.density);else
    root.removeAttribute('data-density');
  }, [t.accent, t.hero, t.density]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Estilo" />
      <TweakSelect
        label="Acento"
        value={t.accent}
        onChange={(v) => setTweak('accent', v)}
        options={[
        { value: 'violet', label: 'Violeta (default)' },
        { value: 'emerald', label: 'Esmeralda' },
        { value: 'amber', label: 'Ámbar' },
        { value: 'rose', label: 'Rosa' }]
        } />
      

      <TweakSection label="Layout" />
      <TweakRadio
        label="Hero"
        value={t.hero}
        onChange={(v) => setTweak('hero', v)}
        options={[
        { value: 'split', label: 'Split' },
        { value: 'centered', label: 'Centrado' }]
        } />
      
      <TweakRadio
        label="Densidad"
        value={t.density}
        onChange={(v) => setTweak('density', v)}
        options={[
        { value: 'regular', label: 'Espaciado' },
        { value: 'cozy', label: 'Compacto' }]
        } />
      
    </TweaksPanel>);

}

/* ===================== App ===================== */
function App() {
  return (
    <>
      <Nav />
      <Hero />
      <HowItWorks />
      <TwoSides />
      <Features />
      <AnalyticsTeaser />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <FooterLanding />
      <TweaksUI />
      <WaitlistModal />
    </>);

}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);