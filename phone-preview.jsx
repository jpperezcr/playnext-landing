// Interactive phone preview embedded in the landing
// Lets visitors actually try the fan flow: pick era → request song → see ticket

const { useState, useMemo } = React;

const PREVIEW_SONGS = (window.SONGS || []).filter((s) => s.enabled !== false);
const PREVIEW_ERAS = ['Todas', '80s', '90s', '2000s', '2010+'];

function PhonePreview({ compact = false }) {
  const [era, setEra] = useState('Todas');
  const [picked, setPicked] = useState(null); // song being requested
  const [stage, setStage] = useState('idle'); // idle | sending | ticket
  const [queueNum, setQueueNum] = useState(4);

  const list = useMemo(() => {
    if (era === 'Todas') return PREVIEW_SONGS.slice(0, 10);
    return PREVIEW_SONGS.filter((s) => s.tags.includes(era)).slice(0, 10);
  }, [era]);

  const handlePick = (song) => {
    setPicked(song);
    setStage('sending');
    setTimeout(() => {
      setQueueNum(Math.floor(Math.random() * 8) + 3);
      setStage('ticket');
    }, 1200);
  };

  const reset = () => {
    setStage('idle');
    setPicked(null);
  };

  return (
    <div className="phone" role="region" aria-label="Demo interactivo de PlayNext">
      <div className="phone-notch"></div>

      <div className="p-header">
        <div className="p-logo">
          <div className="p-logo-mark">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M7 5v14l12-7z" fill="oklch(0.14 0.04 155)" />
            </svg>
          </div>
          <div>Play<span className="next">Next</span></div>
        </div>
        <div className="p-live">
          <span className="pulse-dot"></span>
          EN VIVO
        </div>
      </div>

      <div className="p-venue">
        <div className="p-venue-label">· VENUE ·</div>
        <div className="p-venue-title">Boda Andrea</div>
        <div className="p-venue-meta">
          <span>BAND NAME</span>
          <span className="dot"></span>
          <span>SET 2 · 22:14</span>
        </div>
      </div>

      <div className="p-eras">
        {PREVIEW_ERAS.map((e) =>
        <button
          key={e}
          className={`p-era ${era === e ? 'active' : ''}`}
          onClick={() => setEra(e)}>
          
            {e}
          </button>
        )}
      </div>

      <div className="p-list">
        {list.map((s) =>
        <div key={s.id} className="p-row">
            <div className="p-album">
              <AlbumArt song={s} />
            </div>
            <div className="p-info">
              <div className="p-name">{s.name}</div>
              <div className="p-artist">{s.artist}</div>
              <div className="p-meta">
                {s.duration}
                {s.tip && <> · <span className="tip">TIP {s.tip}</span></>}
              </div>
            </div>
            <button className="p-pedir" onClick={() => handlePick(s)}>
              PEDIR
            </button>
          </div>
        )}
      </div>

      {stage === 'sending' &&
      <div className="p-modal">
          <div className="p-sending">
            <div className="p-sending-ring"></div>
            <div className="p-sending-title">Enviando...</div>
            <div className="p-sending-song">{picked?.name?.toUpperCase()}</div>
          </div>
        </div>
      }

      {stage === 'ticket' && picked &&
      <div className="p-modal">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, width: '100%' }}>
            <div className="p-ticket">
              <div className="p-ticket-top">
                <div className="p-ticket-brand">
                  <span className="chip"></span>
                  PLAYNEXT · TICKET
                </div>
                <div className="p-queue-label">TU LUGAR EN LA COLA</div>
                <div className="p-queue-num">
                  <span className="hash">#</span>{queueNum}
                </div>
                <div className="p-queue-sub">~{queueNum * 4} min</div>
                <div className="p-ticket-notch-l"></div>
                <div className="p-ticket-notch-r"></div>
              </div>
              <div className="p-ticket-body">
                <div className="p-ticket-album"><AlbumArt song={picked} /></div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div className="p-ticket-song">{picked.name}</div>
                  <div className="p-ticket-artist">{picked.artist}</div>
                </div>
              </div>
            </div>
            <div className="p-ticket-actions" style={{ padding: 0, width: '100%', maxWidth: 280 }}>
              <button className="btn btn-ghost" onClick={reset}>Pedir otra</button>
              <button className="btn btn-primary" onClick={reset}>Dejar tip</button>
            </div>
          </div>
        </div>
      }
    </div>);

}

window.PhonePreview = PhonePreview;