// cadastro-core.jsx
// Primitivas compartilhadas da página de cadastro de corretor.
// Ícones, marca, campos de formulário, máscaras e medidor de senha.
// Tokens vêm do :root em Cadastro.html (tema claro, alinhado ao Login 1).

const { useState, useEffect, useRef, useMemo } = React;

/* ── Ícones (stroke 1.8, geometria simples — alinhado ao Login 1/3) ───────── */
const Icon = {
  user:   (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  mail:   (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>,
  phone:  (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M6.5 3h3l1.5 5-2 1.5a13 13 0 0 0 5.5 5.5l1.5-2 5 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z"/></svg>,
  id:     (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="11.5" r="2"/><path d="M5.5 17c.4-1.8 1.6-2.5 3-2.5s2.6.7 3 2.5M14 9.5h5M14 13h5M14 16h3"/></svg>,
  lock:   (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>,
  building:(p)=> <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2"/></svg>,
  eye:    (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3l18 18"/><path d="M10.6 6.2A9.6 9.6 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9"/><path d="M6.1 7.8A17 17 0 0 0 2 12s3.6 6 10 6a9.5 9.5 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>,
  check:  (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-11"/></svg>,
  arrow:  (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  spark:  (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8z"/></svg>,
  shield: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M12 3l7 3v5c0 5-3.4 8.4-7 10-3.6-1.6-7-5-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg>,
  bolt:   (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>,
  gift:   (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3.5" y="8.5" width="17" height="12" rx="1.5"/><path d="M3.5 12.5h17M12 8.5v12M12 8.5C12 5 9 4 7.5 5.5S8.5 8.5 12 8.5Zm0 0C12 5 15 4 16.5 5.5S15.5 8.5 12 8.5Z"/></svg>,
};

/* ── Marca CorClub (lockup configurável claro/mono) ───────────────────────── */
function BrandLockup({ size = 1, tone = 'light', sub = 'Vantagens' }) {
  const fill = tone === 'light' ? '#fff' : 'var(--brand)';
  const word = tone === 'light' ? '#fff' : 'var(--ink)';
  const subc = tone === 'light' ? 'rgba(255,255,255,.85)' : 'var(--ink-3)';
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:14 * size}}>
      <svg viewBox="0 0 64 44" width={48 * size} height={48 * 44 / 64 * size} aria-hidden>
        <circle cx="16" cy="10" r="7" fill={fill}/>
        <circle cx="48" cy="10" r="7" fill={fill}/>
        <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z" fill={fill}/>
        <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z" fill={fill}/>
        <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z" fill={fill} opacity=".85"/>
      </svg>
      <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
        <span style={{fontWeight:700,fontSize:26 * size,letterSpacing:'-.02em',color:word}}>
          Cor<span style={{fontWeight:800}}>Club</span>
        </span>
        <span style={{fontWeight:500,fontSize:13 * size,color:subc,marginTop:4,letterSpacing:'.08em',textTransform:'uppercase'}}>{sub}</span>
      </div>
    </div>
  );
}

/* ── Pílula técnica ───────────────────────────────────────────────────────── */
function Pill({ children, tone = 'dark' }) {
  const dark = tone === 'dark';
  return (
    <div className="tech" style={{
      display:'inline-flex',alignItems:'center',gap:8,padding:'6px 12px',borderRadius:999,
      background: dark ? 'rgba(255,255,255,.10)' : 'var(--brand-soft)',
      border:'1px solid ' + (dark ? 'rgba(255,255,255,.22)' : 'var(--line)'),
      fontSize:11,color: dark ? 'rgba(255,255,255,.85)' : 'var(--ink-2)',
    }}>{children}</div>
  );
}

function Spinner({ light }) {
  return <span style={{
    width:18,height:18,borderRadius:'50%',
    border:'2.5px solid ' + (light ? 'rgba(255,255,255,.35)' : 'rgba(23,71,184,.22)'),
    borderTopColor: light ? '#fff' : 'var(--brand)',
    animation:'spin .8s linear infinite',display:'inline-block',
  }}/>;
}

/* ── Campo de texto (tema claro, com ícone, erro e trailing) ──────────────── */
function Field({ id, label, type = 'text', value, onChange, error, hint, autoComplete,
                icon, trailing, placeholder, inputMode, maxLength, onKeyDown, accent }) {
  const [focus, setFocus] = useState(false);
  const ok = value && value.length > 0 && !error;
  const border = error ? 'var(--danger)' : focus ? (accent || 'var(--brand)') : 'var(--line)';
  return (
    <div style={{display:'flex',flexDirection:'column',gap:8}}>
      <label htmlFor={id} style={{
        display:'flex',justifyContent:'space-between',alignItems:'baseline',
        fontSize:13,fontWeight:600,color: error ? 'var(--danger)' : 'var(--ink-2)',
      }}>
        <span>{label}</span>
        {error
          ? <span style={{fontWeight:600,fontSize:12.5}}>{error}</span>
          : hint && <span style={{fontWeight:500,fontSize:12,color:'var(--muted)'}}>{hint}</span>}
      </label>
      <div style={{
        position:'relative',display:'flex',alignItems:'center',height:52,borderRadius:12,
        background:'var(--white)',
        border:'1.5px solid ' + border,
        boxShadow: focus ? `0 0 0 4px ${error ? 'rgba(211,58,75,.12)' : 'rgba(23,71,184,.10)'}` : 'none',
        transition:'border-color .15s ease, box-shadow .15s ease',
      }}>
        {icon && <span style={{paddingLeft:14,paddingRight:8,color: focus || ok ? (accent || 'var(--brand)') : 'var(--muted)',display:'flex'}}>{icon}</span>}
        <input
          id={id} type={type} value={value} placeholder={placeholder}
          autoComplete={autoComplete} inputMode={inputMode} maxLength={maxLength}
          onChange={(e) => onChange(e.target.value)} onKeyDown={onKeyDown}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          style={{
            flex:1,minWidth:0,height:'100%',background:'transparent',border:'none',outline:'none',
            color:'var(--ink)',fontSize:15,fontWeight:500,padding: icon ? '0 10px 0 0' : '0 14px',
          }}
        />
        {ok && !trailing && <span style={{paddingRight:14,color:'var(--ok)',display:'flex'}}><Icon.check/></span>}
        {trailing && <span style={{paddingRight:6}}>{trailing}</span>}
      </div>
    </div>
  );
}

/* ── Checkbox de marca ────────────────────────────────────────────────────── */
function CheckBox({ checked, onChange, children, accent }) {
  return (
    <label style={{display:'flex',alignItems:'flex-start',gap:12,cursor:'pointer',userSelect:'none'}}>
      <span style={{
        flex:'0 0 auto',marginTop:1,width:20,height:20,borderRadius:6,
        border:'1.5px solid ' + (checked ? (accent || 'var(--brand)') : 'var(--line)'),
        background: checked ? (accent || 'var(--brand)') : 'var(--white)',
        color:'#fff',display:'inline-flex',alignItems:'center',justifyContent:'center',
        transition:'all .15s ease',
      }}>{checked && <Icon.check/>}</span>
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} style={{display:'none'}}/>
      <span style={{fontSize:13.5,color:'var(--ink-3)',lineHeight:1.5}}>{children}</span>
    </label>
  );
}

/* ── Máscaras (BR) ────────────────────────────────────────────────────────── */
const mask = {
  cpf(v) {
    const d = v.replace(/\D/g, '').slice(0, 11);
    return d
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  },
  phone(v) {
    const d = v.replace(/\D/g, '').slice(0, 11);
    if (d.length <= 10) return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
    return d.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  },
};

const validate = {
  cpf(v) {
    const c = v.replace(/\D/g, '');
    if (c.length !== 11 || /^(\d)\1{10}$/.test(c)) return false;
    const calc = (len) => {
      let sum = 0;
      for (let i = 0; i < len; i++) sum += parseInt(c[i], 10) * (len + 1 - i);
      const r = (sum * 10) % 11;
      return r === 10 ? 0 : r;
    };
    return calc(9) === parseInt(c[9], 10) && calc(10) === parseInt(c[10], 10);
  },
  email(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); },
  phone(v) { return v.replace(/\D/g, '').length >= 10; },
};

/* ── Medidor de força de senha ────────────────────────────────────────────── */
function passwordScore(pw) {
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  return Math.min(s, 4); // 0..4
}

function PasswordMeter({ value }) {
  const score = passwordScore(value);
  const labels = ['Muito fraca', 'Fraca', 'Razoável', 'Forte', 'Excelente'];
  const colors = ['var(--danger)', 'var(--warn)', 'var(--warn)', 'var(--ok)', 'var(--ok)'];
  const active = value.length > 0;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:6,marginTop:2}}>
      <div style={{display:'flex',gap:6}}>
        {[0, 1, 2, 3].map((i) => (
          <span key={i} style={{
            flex:1,height:5,borderRadius:999,
            background: active && i < score ? colors[score] : 'var(--line)',
            transition:'background .25s ease',
          }}/>
        ))}
      </div>
      {active && (
        <span className="tech" style={{fontSize:10.5,color: colors[score], fontWeight:600}}>
          Senha {labels[score]}
        </span>
      )}
    </div>
  );
}

Object.assign(window, {
  CC_Icon: Icon, CC_BrandLockup: BrandLockup, CC_Pill: Pill, CC_Spinner: Spinner,
  CC_Field: Field, CC_CheckBox: CheckBox, CC_mask: mask, CC_validate: validate,
  CC_PasswordMeter: PasswordMeter, CC_passwordScore: passwordScore,
});

// Keyframe do spinner (uma vez)
if (!document.getElementById('cc-spin-kf')) {
  const st = document.createElement('style');
  st.id = 'cc-spin-kf';
  st.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(st);
}
