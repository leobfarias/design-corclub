/* CorClub — Core (icons + design system primitives)
   Exposes everything onto window for cross-script access. */

const { useState, useEffect, useMemo, useRef, useCallback, Fragment } = React;

/* ---------- Icons (stroke 1.8, geometria simples — alinhado com Login 1) ---------- */
const sv = (children, {w = 18, h = 18, fill = 'none'} = {}) =>
  React.createElement('svg', {viewBox: '0 0 24 24', width: w, height: h, fill, stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round'}, children);

const Ico = {
  /* nav */
  home:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 9-7 9 7"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>,
  users:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="9" r="3.5"/><path d="M2 20c.6-3.6 3.4-6 7-6s6.4 2.4 7 6"/><circle cx="17" cy="7.5" r="2.5"/><path d="M22 17c-.4-2.4-2-4-4.5-4"/></svg>,
  user:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8.5" r="3.8"/><path d="M4 20c.7-3.8 3.8-6.5 8-6.5s7.3 2.7 8 6.5"/></svg>,
  doc:    (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/><path d="M9 13h6M9 17h4"/></svg>,
  plus:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>,
  cash:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="6" width="18" height="12" rx="2.5"/><circle cx="12" cy="12" r="2.5"/><path d="M6 9v6M18 9v6"/></svg>,
  shield: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3 4 6v6c0 4.6 3.4 8 8 9 4.6-1 8-4.4 8-9V6l-8-3z"/></svg>,
  pkg:    (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="m3 7 9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/></svg>,
  chart:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V8M10 20V4M16 20v-9M22 20H2"/></svg>,
  gear:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.6 1.6 0 0 0 .3 1.7l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-1.7-.3 1.6 1.6 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.6 1.6 0 0 0-1-1.5 1.6 1.6 0 0 0-1.7.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0 .3-1.7 1.6 1.6 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.6 1.6 0 0 0 1.5-1 1.6 1.6 0 0 0-.3-1.7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 1.7.3h.1a1.6 1.6 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.6 1.6 0 0 0 1 1.5 1.6 1.6 0 0 0 1.7-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0-.3 1.7v.1a1.6 1.6 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.6 1.6 0 0 0-1.5 1z"/></svg>,
  bell:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 1 1 12 0c0 7 3 8 3 8H3s3-1 3-8"/><path d="M10 21a2 2 0 0 0 4 0"/></svg>,
  search: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>,
  chevR:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 6 6 6-6 6"/></svg>,
  chevL:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 6-6 6 6 6"/></svg>,
  chevD:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>,
  arrowR: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  arrowUp:(p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 14 6-6 6 6"/></svg>,
  arrowDn:(p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 10 6 6 6-6"/></svg>,
  check:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11"/></svg>,
  x:      (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6l12 12M18 6L6 18"/></svg>,
  filter: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5h16M7 12h10M10 19h4"/></svg>,
  dots:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="currentColor"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>,
  spark:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="currentColor"><path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8z"/></svg>,
  star:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||14} height={p?.height||14} fill="currentColor"><path d="M12 2 14.5 8.4 21 9.3l-4.8 4.5L17.5 21 12 17.6 6.5 21l1.3-7.2L3 9.3l6.5-.9L12 2z"/></svg>,
  download:(p)=> <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 4v12"/><path d="m7 11 5 5 5-5"/><path d="M5 20h14"/></svg>,
  upload: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V8"/><path d="m7 13 5-5 5 5"/><path d="M5 4h14"/></svg>,
  calendar:(p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 9h18M8 3v4M16 3v4"/></svg>,
  mail:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>,
  phone:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/></svg>,
  trend:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>,
  building:(p)=> <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M10 21v-3h4v3"/></svg>,
  heart:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/></svg>,
  audit:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9 3h6l2 2v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5z"/><path d="m10 12 1.5 1.5L15 10"/></svg>,
  logout: (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3"/><path d="M10 17 5 12l5-5"/><path d="M5 12h11"/></svg>,
  book:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3z"/><path d="M4 17h14"/></svg>,
  award:  (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||18} height={p?.height||18} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="m9 14-2 7 5-3 5 3-2-7"/></svg>,
  flag:   (p) => <svg {...p} viewBox="0 0 24 24" width={p?.width||16} height={p?.height||16} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 21V4h12l-2 4 2 4H5"/></svg>,
};

/* ---------- Brand mark ---------- */
function BrandMark({ size = 36, mono = false }) {
  const c = mono ? '#fff' : 'var(--brand)';
  const op = mono ? 1 : .55;
  return (
    <svg viewBox="0 0 64 44" width={size} height={size * 44/64} aria-hidden>
      <circle cx="16" cy="10" r="7" fill={c}/>
      <circle cx="48" cy="10" r="7" fill={c} opacity={op}/>
      <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z" fill={c}/>
      <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z" fill={c} opacity={op}/>
      <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z" fill={c} opacity={mono ? .85 : .35}/>
    </svg>
  );
}

function BrandLockup({ light = false, size = 1, tagline = 'Vantagens' }) {
  const c = light ? '#fff' : 'var(--brand)';
  const c2 = light ? 'rgba(255,255,255,.78)' : 'var(--ink-2)';
  return (
    <div style={{display:'inline-flex', alignItems:'center', gap:12 * size}}>
      <BrandMark size={36 * size} mono={light}/>
      <div style={{display:'flex', flexDirection:'column', lineHeight:1}}>
        <span style={{fontWeight:700, fontSize:19 * size, letterSpacing:'-.02em', color:c}}>
          Cor<span style={{fontWeight:800}}>Club</span>
        </span>
        <span style={{fontWeight:500, fontSize:10.5 * size, color:c2, marginTop:3, letterSpacing:'.14em', textTransform:'uppercase'}}>{tagline}</span>
      </div>
    </div>
  );
}

/* ---------- Button ---------- */
function Button({ variant = 'primary', size, icon, iconRight, children, onClick, type = 'button', disabled, className = '', style }) {
  const cls = ['btn', `btn-${variant}`, size === 'sm' && 'btn-sm', size === 'lg' && 'btn-lg', !children && icon && 'btn-icon', className].filter(Boolean).join(' ');
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={cls} style={style}>
      {icon}{children}{iconRight}
    </button>
  );
}

/* ---------- Badge ---------- */
function Badge({ tone = 'neutral', dot = false, children }) {
  return <span className={`badge badge-${tone}`}>{dot && <span className="dot"/>}{children}</span>;
}

/* ---------- Avatar (initials) ---------- */
function Avatar({ name = '', size = 'md', color }) {
  const initials = name.split(' ').filter(Boolean).slice(0, 2).map(s => s[0].toUpperCase()).join('') || '?';
  const sizeCls = size === 'sm' ? 'avatar-sm' : size === 'lg' ? 'avatar-lg' : '';
  const hue = useMemo(() => {
    let h = 0; for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) & 0xff;
    return (h * 137) % 360;
  }, [name]);
  const bg = color || `linear-gradient(135deg, hsl(${hue} 55% 62%), hsl(${(hue + 30) % 360} 60% 42%))`;
  return <span className={`avatar ${sizeCls}`} style={{background:bg}}>{initials}</span>;
}

/* ---------- Field / Input ---------- */
function Field({ label, hint, error, children }) {
  return (
    <label style={{display:'block'}}>
      <div className="field-label">
        <span>{label}</span>
        {hint && <span className="hint">{hint}</span>}
      </div>
      {children}
      {error && <div style={{marginTop:6, fontSize:12.5, color:'var(--danger)', fontWeight:600}}>{error}</div>}
    </label>
  );
}

function Input({ value, onChange, placeholder, type = 'text', icon, ...rest }) {
  if (icon) return (
    <div className="input-wrap">
      <span className="lead">{icon}</span>
      <input className="input" type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} {...rest}/>
    </div>
  );
  return <input className="input" type={type} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder} {...rest}/>;
}

function Select({ value, onChange, options, placeholder }) {
  return (
    <select className="select" value={value} onChange={e => onChange?.(e.target.value)}>
      {placeholder && <option value="">{placeholder}</option>}
      {options.map(o => typeof o === 'string'
        ? <option key={o} value={o}>{o}</option>
        : <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

function Textarea({ value, onChange, placeholder, rows = 3 }) {
  return <textarea className="textarea" rows={rows} value={value} onChange={e => onChange?.(e.target.value)} placeholder={placeholder}/>;
}

/* ---------- Tabs ---------- */
function Tabs({ tabs, value, onChange }) {
  return (
    <div className="tabs" role="tablist">
      {tabs.map(t => {
        const key = t.value ?? t;
        const label = t.label ?? t;
        const count = t.count;
        const active = key === value;
        return (
          <button key={key} role="tab" className={`tab${active ? ' active' : ''}`} onClick={() => onChange?.(key)}>
            {label}{count !== undefined && <span className="count">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Page header ---------- */
function PageHeader({ eyebrow, title, sub, right }) {
  return (
    <div className="page-head">
      <div>
        {eyebrow && <div className="page-eyebrow">{eyebrow}</div>}
        <h1 className="page-title">{title}</h1>
        {sub && <p className="page-sub">{sub}</p>}
      </div>
      {right && <div style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap'}}>{right}</div>}
    </div>
  );
}

/* ---------- Stat card ---------- */
function StatCard({ label, value, delta, deltaDir = 'up', spark, sub }) {
  return (
    <div className="stat">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      <div style={{display:'flex', alignItems:'center', gap:8}}>
        {delta && (
          <span className={`stat-delta ${deltaDir}`}>
            {deltaDir === 'up' ? <Ico.arrowUp/> : <Ico.arrowDn/>} {delta}
          </span>
        )}
        {sub && <span style={{fontSize:12.5, color:'var(--muted)'}}>{sub}</span>}
      </div>
      {spark && <div className="stat-spark">{spark}</div>}
    </div>
  );
}

/* ---------- Sparkline (tiny inline svg) ---------- */
function Sparkline({ data, width = 100, height = 30, color = 'var(--brand)', fill = 'color-mix(in oklab, var(--brand) 18%, transparent)' }) {
  const max = Math.max(...data), min = Math.min(...data);
  const span = max - min || 1;
  const step = data.length > 1 ? width / (data.length - 1) : 0;
  const pts = data.map((v, i) => [i * step, height - 2 - ((v - min) / span) * (height - 4)]);
  const d = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const dFill = d + ` L ${width} ${height} L 0 ${height} Z`;
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <path d={dFill} fill={fill} stroke="none"/>
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

/* ---------- Bar chart (vertical, simple) ---------- */
function BarChart({ data, width = 540, height = 200, labels = [], color = 'var(--brand)' }) {
  const max = Math.max(...data) || 1;
  const pad = 28, gap = 6;
  const innerW = width - pad - 14;
  const innerH = height - pad - 22;
  const bw = (innerW - gap * (data.length - 1)) / data.length;
  return (
    <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="none">
      {/* gridlines */}
      {[0, .25, .5, .75, 1].map((t, i) => (
        <g key={i}>
          <line x1={pad} x2={width - 14} y1={pad/2 + innerH * t} y2={pad/2 + innerH * t} stroke="var(--line)" strokeDasharray="2 4"/>
          <text x={6} y={pad/2 + innerH * t + 3} fontSize="10" fill="var(--muted)" fontWeight="600">{Math.round(max * (1 - t))}</text>
        </g>
      ))}
      {data.map((v, i) => {
        const h = (v / max) * innerH;
        const x = pad + i * (bw + gap);
        const y = pad/2 + innerH - h;
        return (
          <g key={i}>
            <rect x={x} y={y} width={bw} height={h} rx="3" fill={color} opacity={i === data.length - 1 ? 1 : .65}/>
            {labels[i] && <text x={x + bw/2} y={height - 6} textAnchor="middle" fontSize="10.5" fill="var(--muted)" fontWeight="600">{labels[i]}</text>}
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- Donut chart ---------- */
function Donut({ segments, size = 160, thickness = 18 }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = (size - thickness) / 2;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--bg-2)" strokeWidth={thickness}/>
      {segments.map((s, i) => {
        const len = (s.value / total) * c;
        const el = (
          <circle key={i}
            cx={size/2} cy={size/2} r={r}
            fill="none" stroke={s.color} strokeWidth={thickness}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${size/2} ${size/2})`}
            strokeLinecap="butt"
          />
        );
        offset += len;
        return el;
      })}
    </svg>
  );
}

/* ---------- Topbar (shared) ---------- */
function Topbar({ search = true, role = 'Corretor', userName = 'Sua conta', breadcrumb }) {
  const [q, setQ] = useState('');
  return (
    <div className="topbar">
      <div style={{display:'flex', alignItems:'center', gap:14, flex:1, minWidth:0}}>
        {breadcrumb && (
          <div style={{display:'flex', alignItems:'center', gap:6, color:'var(--muted)', fontSize:13, fontWeight:600}}>
            {breadcrumb.map((b, i) => (
              <span key={i} style={{display:'inline-flex',alignItems:'center',gap:6,color: i === breadcrumb.length - 1 ? 'var(--ink)' : 'var(--muted)'}}>
                {i > 0 && <Ico.chevR width={12} height={12}/>}
                {b}
              </span>
            ))}
          </div>
        )}
        {search && (
          <label className="topbar-search" style={{marginLeft: breadcrumb ? 'auto' : 0}}>
            <Ico.search width={16} height={16}/>
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Buscar por cliente, proposta, CPF..."/>
            <span className="kbd">⌘K</span>
          </label>
        )}
      </div>
      <div style={{display:'flex', alignItems:'center', gap:8, marginLeft:14}}>
        <Button variant="ghost" icon={<Ico.bell/>} size="sm">
          <span style={{position:'relative'}}>
            <span style={{position:'absolute', top:-9, right:-9, width:7, height:7, borderRadius:'50%', background:'var(--danger)', boxShadow:'0 0 0 2px #fff'}}/>
          </span>
        </Button>
        <Button variant="ghost" icon={<Ico.calendar/>} size="sm"/>
        <div style={{width:1, height:24, background:'var(--line)', margin:'0 4px'}}/>
        <div style={{display:'flex', alignItems:'center', gap:10, padding:'4px 10px 4px 4px', borderRadius:999, border:'1px solid var(--line)', cursor:'pointer'}}>
          <Avatar name={userName} size="sm"/>
          <div style={{lineHeight:1.1}}>
            <div style={{fontSize:12.5, fontWeight:700, color:'var(--ink)'}}>{userName}</div>
            <div style={{fontSize:10.5, color:'var(--muted)', fontWeight:600, letterSpacing:'.04em', textTransform:'uppercase'}}>{role}</div>
          </div>
          <Ico.chevD width={14} height={14}/>
        </div>
      </div>
    </div>
  );
}

/* ---------- Sidebar (uses .sb-light / .sb-dark + items config) ---------- */
function Sidebar({ variant = 'light', groups, active, onSelect, footer }) {
  return (
    <aside className={variant === 'dark' ? 'sb-dark' : 'sb-light'}>
      <div className="sb-brand">
        <BrandLockup light={variant === 'dark'} size={1}/>
      </div>
      <nav className="sb-nav">
        {groups.map((g, gi) => (
          <div key={gi}>
            {g.label && <div className="nav-group-label">{g.label}</div>}
            {g.items.map(it => (
              <div
                key={it.key}
                className={`nav-item${active === it.key ? ' active' : ''}`}
                onClick={() => onSelect?.(it.key)}
              >
                <span className="nav-icon">{it.icon}</span>
                <span>{it.label}</span>
                {it.badge !== undefined && <span className="nav-badge">{it.badge}</span>}
              </div>
            ))}
          </div>
        ))}
      </nav>
      {footer && <div className="sb-footer">{footer}</div>}
    </aside>
  );
}

/* ---------- Helpers ---------- */
function fmtBRL(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }); }
function fmtBRL2(n) { return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); }
function fmtN(n) { return n.toLocaleString('pt-BR'); }
function fmtDate(d) { return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }); }
function fmtDateFull(d) { return new Date(d).toLocaleDateString('pt-BR'); }
function daysAgo(n) { const d = new Date(); d.setDate(d.getDate() - n); return d.toISOString().slice(0,10); }

/* ---------- Expose to window ---------- */
Object.assign(window, {
  Ico, BrandMark, BrandLockup,
  Button, Badge, Avatar, Field, Input, Select, Textarea, Tabs,
  PageHeader, StatCard, Sparkline, BarChart, Donut,
  Topbar, Sidebar,
  fmtBRL, fmtBRL2, fmtN, fmtDate, fmtDateFull, daysAgo,
});
