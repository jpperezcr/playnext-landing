// PlayNext — Waitlist modal
// Hook into global event: window.dispatchEvent(new CustomEvent('open-waitlist'))

const { useState, useEffect } = React;

function WaitlistModal() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    whatsapp: '',
    location: '',
    style: '',
    shows: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handler = () => {
      setOpen(true);
      setSubmitted(false);
    };
    window.addEventListener('open-waitlist', handler);
    return () => window.removeEventListener('open-waitlist', handler);
  }, []);

  // Lock body scroll while open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const h = (e) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open]);

  const update = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = 'Requerido';
    if (!form.email.trim()) errs.email = 'Requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Email inválido';
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      const res = await fetch('https://qjjxatabhokymribamfx.supabase.co/rest/v1/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': 'sb_publishable_5BnBtV4zO8SjSSDkExaRFQ_OjXmyjnC',
          'Authorization': 'Bearer sb_publishable_5BnBtV4zO8SjSSDkExaRFQ_OjXmyjnC',
          'Prefer': 'return=minimal',
        },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('submit failed');
      setSubmitted(true);
    } catch (err) {
      setErrors({ form: 'No se pudo enviar. Intentá de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const close = () => {
    setOpen(false);
    // reset for next open
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: '', email: '', whatsapp: '', location: '', style: '', shows: '', message: '' });
      setErrors({});
    }, 300);
  };

  if (!open) return null;

  return (
    <div className="wl-backdrop" onClick={close} role="dialog" aria-modal="true" aria-labelledby="wl-title">
      <div className="wl-modal" onClick={(e) => e.stopPropagation()}>
        <button className="wl-close" onClick={close} aria-label="Cerrar">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {!submitted ? (
          <>
            <div className="wl-eyebrow">
              <span className="pulse-dot" />
              BETA PRIVADA · CUPOS LIMITADOS
            </div>
            <h2 id="wl-title" className="wl-title">Sumate a la lista beta.</h2>
            <p className="wl-sub">
              Estamos invitando músicos uno por uno. Déjanos tus datos y te contactamos para crear tu cuenta y configurar tu primer show.
            </p>

            <form className="wl-form" onSubmit={submit}>
              <div className="wl-row">
                <div className="wl-field">
                  <label htmlFor="wl-name">Tu nombre o banda <span className="req">*</span></label>
                  <input
                    id="wl-name"
                    type="text"
                    value={form.name}
                    onChange={update('name')}
                    placeholder="The Echoes"
                    autoFocus
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <span className="wl-err">{errors.name}</span>}
                </div>
                <div className="wl-field">
                  <label htmlFor="wl-email">Email <span className="req">*</span></label>
                  <input
                    id="wl-email"
                    type="email"
                    value={form.email}
                    onChange={update('email')}
                    placeholder="tu@email.com"
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && <span className="wl-err">{errors.email}</span>}
                </div>
              </div>

              <div className="wl-row">
                <div className="wl-field">
                  <label htmlFor="wl-whatsapp">WhatsApp <span className="opt">opcional</span></label>
                  <input
                    id="wl-whatsapp"
                    type="tel"
                    value={form.whatsapp}
                    onChange={update('whatsapp')}
                    placeholder="+506 8888 0000"
                  />
                </div>
                <div className="wl-field">
                  <label htmlFor="wl-location">Ciudad / país <span className="opt">opcional</span></label>
                  <input
                    id="wl-location"
                    type="text"
                    value={form.location}
                    onChange={update('location')}
                    placeholder="San José, Costa Rica"
                  />
                </div>
              </div>

              <div className="wl-row">
                <div className="wl-field">
                  <label htmlFor="wl-style">¿Qué tocas? <span className="opt">opcional</span></label>
                  <select id="wl-style" value={form.style} onChange={update('style')}>
                    <option value="">Selecciona...</option>
                    <option value="Solista">Solista</option>
                    <option value="Duo">Duo</option>
                    <option value="Trio">Trio</option>
                    <option value="Banda">Banda</option>
                    <option value="Otros">Otros</option>
                  </select>
                </div>
                <div className="wl-field">
                  <label htmlFor="wl-shows">Shows por mes <span className="opt">opcional</span></label>
                  <select id="wl-shows" value={form.shows} onChange={update('shows')}>
                    <option value="">Selecciona...</option>
                    <option value="1-2">1 a 2</option>
                    <option value="3-5">3 a 5</option>
                    <option value="6-10">6 a 10</option>
                    <option value="10+">Más de 10</option>
                  </select>
                </div>
              </div>

              <div className="wl-field">
                <label htmlFor="wl-message">¿Cómo usarías PlayNext? <span className="opt">opcional</span></label>
                <textarea
                  id="wl-message"
                  rows="3"
                  value={form.message}
                  onChange={update('message')}
                  placeholder="¿En qué venues tocas? ¿Qué problema querés resolver?"
                />
              </div>

              {errors.form && <p className="wl-err" style={{ textAlign: 'center' }}>{errors.form}</p>}
              <button type="submit" className="btn btn-primary btn-lg wl-submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Sumarme a la beta'}
                {!loading && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>}
              </button>

              <p className="wl-legal">
                Solo te escribimos para invitarte a la beta. No spam, no compartimos tus datos.
              </p>
            </form>
          </>
        ) : (
          <div className="wl-success">
            <div className="wl-success-ring">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12.5 10 18 20 6" />
              </svg>
            </div>
            <h2 className="wl-title">¡Listo, {form.name.split(' ')[0]}!</h2>
            <p className="wl-sub">
              Te anotamos en la lista. Vamos a contactarte por email <strong>{form.email}</strong> en los próximos días para crear tu cuenta.
            </p>
            <button className="btn btn-primary btn-lg" onClick={close}>Genial, volver al sitio</button>
            <p className="wl-legal" style={{ marginTop: 18 }}>
              Mientras tanto, seguinos en Instagram para novedades.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

window.WaitlistModal = WaitlistModal;
window.openWaitlist = () => window.dispatchEvent(new CustomEvent('open-waitlist'));
