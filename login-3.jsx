const { useState, useEffect, useRef } = React;

/* Icons (alinhados com Login 1: stroke 1.8, geometria simples) */
const Icon = {
  mail: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>,
  eye: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3l18 18"/><path d="M10.6 6.2A9.6 9.6 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9"/><path d="M6.1 7.8A17 17 0 0 0 2 12s3.6 6 10 6a9.5 9.5 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-11"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8z"/></svg>,
};

/* Brand lockup (idêntico ao de Login 1, variante light/mono) */
function BrandLockup({ size = 1 }) {
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:14 * size}}>
      <svg viewBox="0 0 64 44" width={48 * size} height={48 * 44/64 * size} aria-hidden>
        <circle cx="16" cy="10" r="7" fill="#fff"/>
        <circle cx="48" cy="10" r="7" fill="#fff"/>
        <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z" fill="#fff"/>
        <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z" fill="#fff"/>
        <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z" fill="#fff" opacity=".85"/>
      </svg>
      <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
        <span style={{fontWeight:700,fontSize:26 * size,letterSpacing:'-.02em',color:'#fff'}}>
          Cor<span style={{fontWeight:800}}>Club</span>
        </span>
        <span style={{fontWeight:500,fontSize:13 * size,color:'rgba(255,255,255,.85)',marginTop:4,letterSpacing:'.08em',textTransform:'uppercase'}}>Vantagens</span>
      </div>
    </div>
  );
}

function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [caps, setCaps] = useState(false);
  const cardRef = useRef(null);

  // Subtle 3D tilt on pointer
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    function move(e) {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      el.style.transform = `perspective(1400px) rotateX(${(-y * 2.5).toFixed(2)}deg) rotateY(${(x * 2.5).toFixed(2)}deg) translateZ(0)`;
    }
    function leave() { el.style.transform = ''; }
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseleave', leave);
    return () => { window.removeEventListener('mousemove', move); window.removeEventListener('mouseleave', leave); };
  }, []);

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'E-mail inválido';
    if (pass.length < 4) errs.pass = 'Mínimo 4 caracteres';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); setTimeout(()=>setSuccess(false), 2400); }, 1200);
  }

  return (
    <div style={{minHeight:'100vh',display:'flex',flexDirection:'column'}}>
      {/* Top bar */}
      <header style={{
        padding:'24px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',
        color:'#fff',
      }}>
        <BrandLockup size={.85}/>
        <div style={{display:'flex',gap:8,alignItems:'center'}}>
          <Pill>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ok)',boxShadow:'0 0 8px var(--ok)'}}/>
            Sistemas operacionais
          </Pill>
          <Pill subtle>PT-BR</Pill>
        </div>
      </header>

      {/* Center stage */}
      <main style={{flex:1,display:'grid',placeItems:'center',padding:'24px 24px 64px'}}>
        <div
          ref={cardRef}
          style={{
            width:'min(440px, 100%)',
            position:'relative',
            background:'linear-gradient(155deg, rgba(255,255,255,.14) 0%, rgba(255,255,255,.05) 100%)',
            border:'1px solid rgba(255,255,255,.22)',
            borderRadius:24,
            padding:'36px 32px 28px',
            backdropFilter:'blur(28px) saturate(140%)',
            WebkitBackdropFilter:'blur(28px) saturate(140%)',
            boxShadow:'0 30px 80px -30px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.18)',
            transition:'transform .15s ease',
            color:'#fff',
          }}
        >
          {/* corner glow */}
          <span aria-hidden style={{
            position:'absolute',inset:0,borderRadius:24,pointerEvents:'none',
            background:'radial-gradient(60% 40% at 80% 0%, rgba(180,205,255,.22), transparent 60%), radial-gradient(50% 40% at 0% 100%, rgba(120,170,255,.20), transparent 60%)',
            mixBlendMode:'screen',
          }}/>

          <div style={{position:'relative'}}>
            {/* Eyebrow (etiqueta técnica em Manrope) */}
            <div className="tech" style={{
              fontSize:12,color:'rgba(255,255,255,.78)',
              display:'inline-flex',alignItems:'center',gap:10,marginBottom:18,
            }}>
              <Icon.spark/> Acesso seguro
            </div>
            <h1 style={{margin:0,fontSize:32,fontWeight:800,letterSpacing:'-.025em',lineHeight:1.05,color:'#fff'}}>
              Entre na sua<br/>
              <span style={{
                backgroundImage:'linear-gradient(90deg, #C9D9FF, #FFFFFF)',
                WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent',
              }}>conta de corretor</span>
            </h1>
            <p style={{margin:'10px 0 28px',fontSize:15,color:'rgba(255,255,255,.78)',lineHeight:1.55}}>
              Use seu e-mail e a senha cadastrada no painel.
            </p>

            <form onSubmit={submit} noValidate style={{display:'flex',flexDirection:'column',gap:14}}>
              <GlassInput
                id="email" label="E-mail" type="email" autoComplete="email"
                icon={<Icon.mail/>} value={email}
                onChange={(v)=>{setEmail(v); if(errors.email) setErrors({...errors,email:undefined})}}
                error={errors.email}
              />
              <GlassInput
                id="pass" label="Senha" type={show?'text':'password'} autoComplete="current-password"
                icon={<Icon.lock/>} value={pass}
                onChange={(v)=>{setPass(v); if(errors.pass) setErrors({...errors,pass:undefined})}}
                onKeyDown={(e)=>setCaps(e.getModifierState && e.getModifierState('CapsLock'))}
                error={errors.pass}
                trailing={
                  <button type="button" onClick={()=>setShow(s=>!s)} style={{
                    background:'transparent',border:'none',color:'rgba(255,255,255,.7)',cursor:'pointer',
                    width:32,height:32,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:8,
                  }}>{show ? <Icon.eyeOff/> : <Icon.eye/>}</button>
                }
              />

              {caps && (
                <div className="tech" style={{
                  fontSize:11.5,color:'#FFD179',
                  display:'flex',alignItems:'center',gap:8,
                }}>
                  ⚠ Caps Lock ativado
                </div>
              )}

              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:2}}>
                <label style={{display:'inline-flex',alignItems:'center',gap:10,cursor:'pointer',userSelect:'none'}}>
                  <span style={{
                    width:18,height:18,borderRadius:6,
                    border:'1.5px solid ' + (remember ? '#fff' : 'rgba(255,255,255,.35)'),
                    background: remember ? '#fff' : 'transparent',
                    color:'var(--brand-deep)',display:'inline-flex',alignItems:'center',justifyContent:'center',
                    transition:'all .15s ease',
                  }}>{remember && <Icon.check/>}</span>
                  <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} style={{display:'none'}}/>
                  <span style={{fontSize:13.5,color:'rgba(255,255,255,.85)',fontWeight:500}}>Manter conectado</span>
                </label>
                <a href="#" style={{fontSize:13.5,color:'#fff',textDecoration:'none',fontWeight:600}}>Esqueci a senha</a>
              </div>

              <button type="submit" disabled={submitting} style={{
                marginTop:6,
                height:54,borderRadius:12,border:'1px solid rgba(255,255,255,.25)',
                background: success
                  ? 'linear-gradient(135deg, color-mix(in oklab, var(--ok) 70%, #fff), var(--ok))'
                  : '#FFFFFF',
                color: success ? '#fff' : 'var(--brand-deep)',
                fontSize:15.5,fontWeight:700,letterSpacing:'.01em',
                cursor: submitting ? 'wait' : 'pointer',
                display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
                boxShadow:'0 12px 30px -10px rgba(0,0,0,.4), inset 0 1px 0 rgba(255,255,255,.4)',
                transition:'transform .08s ease',
              }}
              onMouseDown={(e)=>e.currentTarget.style.transform='translateY(1px)'}
              onMouseUp={(e)=>e.currentTarget.style.transform=''}
              onMouseLeave={(e)=>e.currentTarget.style.transform=''}
              >
                {submitting ? (<><Spinner dark/> Autenticando…</>)
                  : success ? (<><Icon.check/> Acesso liberado</>)
                  : (<>Entrar no portal <Icon.arrow/></>)}
              </button>
            </form>

            {/* Divider + alt */}
            <div style={{display:'flex',alignItems:'center',gap:12,margin:'22px 0 14px'}}>
              <span style={{flex:1,height:1,background:'rgba(255,255,255,.18)'}}/>
              <span className="tech" style={{fontSize:11,color:'rgba(255,255,255,.55)'}}>ou</span>
              <span style={{flex:1,height:1,background:'rgba(255,255,255,.18)'}}/>
            </div>

            <button type="button" style={{
              width:'100%',height:48,borderRadius:12,
              background:'transparent',
              border:'1px solid rgba(255,255,255,.25)',
              color:'#fff',fontSize:14,fontWeight:600,
              display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,cursor:'pointer',
            }}>
              <KeyIcon/> Entrar com chave de acesso
            </button>

            <div style={{textAlign:'center',marginTop:18,fontSize:13.5,color:'rgba(255,255,255,.78)'}}>
              Primeira vez no CorClub?{' '}
              <a href="#" style={{color:'#fff',fontWeight:700,textDecoration:'none'}}>Solicitar credenciais</a>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom strip */}
      <footer className="tech" style={{
        padding:'14px 32px',display:'flex',justifyContent:'space-between',alignItems:'center',
        fontSize:11,color:'rgba(255,255,255,.55)',
        borderTop:'1px solid rgba(255,255,255,.08)',
      }}>
        <span>© {new Date().getFullYear()} CorClub Vantagens</span>
        <span>Conexão criptografada · TLS 1.3</span>
        <span>v 2026.05</span>
      </footer>
    </div>
  );
}

function Pill({ children, subtle }) {
  return (
    <div className="tech" style={{
      display:'inline-flex',alignItems:'center',gap:8,
      padding:'6px 12px',borderRadius:999,
      background: subtle ? 'transparent' : 'rgba(255,255,255,.10)',
      border:'1px solid rgba(255,255,255,.22)',
      fontSize:11,color:'rgba(255,255,255,.85)',
    }}>{children}</div>
  );
}

function GlassInput({ id, label, type, value, onChange, error, autoComplete, icon, trailing, onKeyDown }) {
  const [focus, setFocus] = useState(false);
  const filled = value && value.length > 0;
  const active = focus || filled;
  return (
    <div>
      <label htmlFor={id} style={{
        display:'flex',justifyContent:'space-between',alignItems:'baseline',
        fontSize:13,fontWeight:600,color: error ? 'var(--danger)' : 'rgba(255,255,255,.85)',marginBottom:8,
      }}>
        <span>{label}</span>
        {error && <span style={{fontWeight:600,fontSize:12.5}}>{error}</span>}
      </label>
      <div style={{
        position:'relative',display:'flex',alignItems:'center',
        height:52,borderRadius:12,
        background:'rgba(255,255,255,.06)',
        border:'1.5px solid ' + (error ? 'var(--danger)' : focus ? 'rgba(255,255,255,.55)' : 'rgba(255,255,255,.18)'),
        boxShadow: focus ? '0 0 0 4px rgba(255,255,255,.10)' : 'none',
        transition:'border-color .15s ease, box-shadow .15s ease',
      }}>
        {icon && <span style={{paddingLeft:16,paddingRight:10,color: active ? '#fff' : 'rgba(255,255,255,.6)',display:'flex'}}>{icon}</span>}
        <input
          id={id} type={type} value={value} autoComplete={autoComplete}
          onChange={(e)=>onChange(e.target.value)}
          onKeyDown={onKeyDown}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{
            flex:1,minWidth:0,height:'100%',background:'transparent',border:'none',outline:'none',
            color:'#fff',fontSize:15,fontWeight:500,padding: icon ? '0 12px 0 0' : '0 16px',
          }}
        />
        {trailing && <span style={{paddingRight:8}}>{trailing}</span>}
      </div>
    </div>
  );
}

function KeyIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="12" r="4"/><path d="M12 12h9m-3 0v4m-3-4v3"/>
    </svg>
  );
}

function Spinner({ dark }) {
  return <span style={{
    width:18,height:18,borderRadius:'50%',
    border:'2.5px solid ' + (dark ? 'rgba(14,47,135,.25)' : 'rgba(255,255,255,.35)'),
    borderTopColor: dark ? 'var(--brand-deep)' : '#fff',
    animation:'spin .8s linear infinite',display:'inline-block',
  }}/>;
}

const s = document.createElement('style');
s.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head.appendChild(s);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
