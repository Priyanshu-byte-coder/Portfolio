import './ProjectMotif.css';
import type { MotifKind } from '../projects-data';

/**
 * Signature visual band for each project page. Pure CSS/SVG — no media
 * required. Colors flow from the page-level --p-accent variable.
 */

function Terminal({ lines }: { lines: string[] }) {
  return (
    <div className="motif-terminal">
      <div className="motif-term-chrome">
        <span /><span /><span />
        <em>~ / session</em>
      </div>
      <div className="motif-term-body">
        {lines.map((l, i) => (
          <div
            key={i}
            className={`motif-term-line ${l.startsWith('$') ? 'cmd' : ''} ${l.startsWith('✗') ? 'bad' : ''} ${l.startsWith('→') ? 'good' : ''}`}
            style={{ animationDelay: `${0.3 + i * 0.35}s` }}
          >
            {l || ' '}
          </div>
        ))}
        <div className="motif-term-cursor" style={{ animationDelay: `${0.3 + lines.length * 0.35}s` }} />
      </div>
    </div>
  );
}

function Scanline() {
  return (
    <div className="motif-scan">
      <div className="motif-scan-grid" />
      {[{ x: 22, y: 34 }, { x: 58, y: 62 }, { x: 79, y: 28 }].map((d, i) => (
        <span key={i} className="motif-scan-defect" style={{ left: `${d.x}%`, top: `${d.y}%`, animationDelay: `${i * 1.3}s` }} />
      ))}
      <div className="motif-scan-bar" />
      <div className="motif-scan-readout">SCANNING · PANEL 07 · DUST 1 — SCRATCH 1 — RUNDOWN 1</div>
    </div>
  );
}

function Gauge() {
  return (
    <div className="motif-gauge">
      <svg viewBox="0 0 200 120" aria-hidden="true">
        <path d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="currentColor" strokeOpacity="0.15" strokeWidth="10" strokeLinecap="round" />
        <path className="motif-gauge-fill" d="M 20 110 A 80 80 0 0 1 180 110" fill="none" stroke="currentColor" strokeWidth="10" strokeLinecap="round" />
        <line className="motif-gauge-needle" x1="100" y1="110" x2="100" y2="42" stroke="currentColor" strokeWidth="2" />
        <circle cx="100" cy="110" r="5" fill="currentColor" />
      </svg>
      <div className="motif-gauge-labels"><span>NO RISK</span><span>DEGRADATION</span><span>SHUTDOWN</span></div>
    </div>
  );
}

function Waveform() {
  const bars = Array.from({ length: 48 });
  return (
    <div className="motif-wave">
      {bars.map((_, i) => (
        <span key={i} style={{ animationDelay: `${(i % 12) * 0.09}s`, height: `${18 + ((i * 37) % 52)}%` }} />
      ))}
      <div className="motif-wave-label">LISTENING · VAD ACTIVE · ~300MS</div>
    </div>
  );
}

function Shield() {
  return (
    <div className="motif-shield">
      <span className="motif-shield-ring r1" />
      <span className="motif-shield-ring r2" />
      <span className="motif-shield-ring r3" />
      <span className="motif-shield-core" />
      <div className="motif-shield-label">ON-DEVICE · NOTHING LEAVES</div>
    </div>
  );
}

function Heatmap() {
  // deterministic pseudo-random intensity per cell
  const cells = Array.from({ length: 7 * 26 }, (_, i) => ((i * 2654435761) >>> 28) % 5);
  return (
    <div className="motif-heat">
      <div className="motif-heat-grid">
        {cells.map((v, i) => (
          <span key={i} data-v={v} style={{ animationDelay: `${(i % 26) * 0.05}s` }} />
        ))}
      </div>
      <div className="motif-heat-label">CONTRIBUTIONS · STREAKS · GOALS</div>
    </div>
  );
}

function Chips() {
  const files = [
    { name: 'invoice_march.pdf', verdict: 'KEEP' },
    { name: 'setup_installer.exe', verdict: 'TEMP' },
    { name: 'screenshot(4).png', verdict: 'TEMP' },
    { name: 'thesis_final_v2.docx', verdict: 'KEEP' },
    { name: 'export.csv', verdict: '?' },
  ];
  return (
    <div className="motif-chips">
      {files.map((f, i) => (
        <div key={f.name} className="motif-chip-row" style={{ animationDelay: `${0.3 + i * 0.5}s` }}>
          <span className="motif-chip-file">{f.name}</span>
          <span className={`motif-chip-verdict v-${f.verdict === 'KEEP' ? 'keep' : f.verdict === 'TEMP' ? 'temp' : 'ambi'}`} style={{ animationDelay: `${0.6 + i * 0.5}s` }}>
            {f.verdict}
          </span>
        </div>
      ))}
    </div>
  );
}

function Spectral() {
  return (
    <div className="motif-spectral">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="motif-spectral-line"
          d="M 0 40 C 40 36, 80 44, 120 40 C 150 37, 170 42, 190 60 C 205 78, 215 96, 225 96 C 235 96, 245 70, 260 52 C 290 40, 330 44, 400 38"
          fill="none" stroke="currentColor" strokeWidth="2"
        />
        <line x1="225" y1="20" x2="225" y2="110" stroke="currentColor" strokeOpacity="0.35" strokeDasharray="3 4" />
        <text x="232" y="30" fill="currentColor" fontSize="11" fontFamily="Space Mono, monospace">H₂O 3μm</text>
      </svg>
      <div className="motif-spectral-label">REFLECTANCE SPECTRUM · PERMANENTLY SHADOWED REGION</div>
    </div>
  );
}

function Orbit() {
  return (
    <div className="motif-orbit">
      <span className="motif-orbit-ring o1"><i /></span>
      <span className="motif-orbit-ring o2"><i /></span>
      <span className="motif-orbit-core" />
      <div className="motif-orbit-label">THREE.JS · GSAP · 60FPS ON MOBILE</div>
    </div>
  );
}

function Ticker() {
  return (
    <div className="motif-ticker">
      <svg viewBox="0 0 400 140" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="46" x2="400" y2="46" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 5" />
        <line x1="0" y1="94" x2="400" y2="94" stroke="currentColor" strokeOpacity="0.18" strokeDasharray="2 5" />
        <path
          className="motif-ticker-line"
          d="M 0 70 L 30 62 L 55 80 L 80 66 L 110 88 L 140 58 L 170 74 L 200 50 L 230 78 L 260 64 L 290 90 L 320 60 L 350 72 L 380 54 L 400 66"
          fill="none" stroke="currentColor" strokeWidth="2"
        />
      </svg>
      <div className="motif-ticker-labels"><span>ASK</span><span>BID</span></div>
      <div className="motif-ticker-label">MEAN REVERSION · −0.44 AUTOCORR · OBI-ADJUSTED FV</div>
    </div>
  );
}

export function ProjectMotif({ kind, terminal }: { kind: MotifKind; terminal?: string[] }) {
  switch (kind) {
    case 'terminal': return <Terminal lines={terminal ?? ['$ run']} />;
    case 'scanline': return <Scanline />;
    case 'gauge': return <Gauge />;
    case 'waveform': return <Waveform />;
    case 'shield': return <Shield />;
    case 'heatmap': return <Heatmap />;
    case 'chips': return <Chips />;
    case 'spectral': return <Spectral />;
    case 'orbit': return <Orbit />;
    case 'ticker': return <Ticker />;
  }
}
