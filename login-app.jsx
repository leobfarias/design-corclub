const { useState, useEffect, useMemo } = React;

/* ---------- Icons (inline svg, simple geometry only) ---------- */
const I = {
  mail: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 7 8.5-7"/>
    </svg>
  ),
  lock: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/>
    </svg>
  ),
  eye: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  eyeOff: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 3l18 18"/><path d="M10.6 6.2A9.6 9.6 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9"/><path d="M6.1 7.8A17 17 0 0 0 2 12s3.6 6 10 6a9.5 9.5 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/>
    </svg>
  ),
  arrow: (p) => (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
    </svg>
  ),
  check: (p) => (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="m5 12 5 5 9-11"/>
    </svg>
  ),
  spark: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}>
      <path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8z"/>
    </svg>
  ),
  shield: (p) => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 3 4 6v6c0 4.6 3.4 8 8 9 4.6-1 8-4.4 8-9V6l-8-3z"/>
    </svg>
  ),
};

/* ---------- Brand mark ---------- */
function BrandMark({ size = 56, mono = true }) {
  // Stylized "two figures + bridge" mark from CorClub Vantagens
  const c = mono ? '#ffffff' : 'var(--brand)';
  return (
    <svg viewBox="0 0 64 44" width={size} height={size * 44/64} fill="none" aria-hidden>
      <circle cx="16" cy="10" r="7" fill={c}/>
      <circle cx="48" cy="10" r="7" fill={c} opacity={mono ? 1 : .55}/>
      <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z" fill={c}/>
      <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z" fill={c} opacity={mono ? 1 : .55}/>
      <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z" fill={c} opacity={mono ? .85 : .35}/>
    </svg>
  );
}

function BrandLockup({ light = true, size = 1 }) {
  const c = light ? '#fff' : 'var(--brand)';
  const c2 = light ? 'rgba(255,255,255,.85)' : 'var(--ink-2)';
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:14 * size}}>
      <BrandMark size={48 * size} mono={light}/>
      <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
        <span style={{fontWeight:700,fontSize:26 * size,letterSpacing:'-.02em',color:c}}>
          Cor<span style={{fontWeight:800}}>Club</span>
        </span>
        <span style={{fontWeight:500,fontSize:13 * size,color:c2,marginTop:4,letterSpacing:'.08em',textTransform:'uppercase'}}>Vantagens</span>
      </div>
    </div>
  );
}

/* ---------- Input ---------- */
function Field({ id, label, type = 'text', icon, value, onChange, autoComplete, trailing, hint, error }) {
  const [focus, setFocus] = useState(false);
  const filled = value && value.length > 0;
  return (
    <label htmlFor={id} style={{display:'block'}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline',marginBottom:8}}>
        <span style={{fontSize:13,fontWeight:600,color:'var(--ink-2)'}}>{label}</span>
        {hint && <span style={{fontSize:12,color:'var(--muted)'}}>{hint}</span>}
      </div>
      <div style={{
        position:'relative',
        display:'flex',alignItems:'center',
        height:52,
        borderRadius:12,
        background:'#fff',
        border:'1.5px solid ' + (error ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--line)'),
        boxShadow: focus ? '0 0 0 4px color-mix(in oklab, var(--brand) 18%, transparent)' : 'none',
        transition:'border-color .15s ease, box-shadow .15s ease',
      }}>
        {icon && (
          <span style={{paddingLeft:16,paddingRight:10,color: focus || filled ? 'var(--brand)' : 'var(--muted)',display:'flex'}}>{icon}</span>
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          autoComplete={autoComplete}
          style={{
            flex:1,minWidth:0,height:'100%',border:'none',outline:'none',background:'transparent',
            fontSize:15,color:'var(--ink)',padding: icon ? '0 12px 0 0' : '0 16px',fontWeight:500,
          }}
        />
        {trailing && <span style={{paddingRight:8}}>{trailing}</span>}
      </div>
      {error && <div style={{marginTop:6,fontSize:12.5,color:'var(--danger)',fontWeight:600}}>{error}</div>}
    </label>
  );
}

/* ---------- Form (shared by all layouts) ---------- */
function LoginForm({ compact = false }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function validate() {
    const e = {};
    if (!email) e.email = 'Informe seu e-mail';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = 'E-mail inválido';
    if (!pass) e.pass = 'Informe sua senha';
    else if (pass.length < 4) e.pass = 'Mínimo de 4 caracteres';
    return e;
  }
  function onSubmit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2400);
    }, 1200);
  }

  return (
    <form onSubmit={onSubmit} noValidate style={{display:'flex',flexDirection:'column',gap: compact ? 14 : 18}}>
      <Field
        id="email" label="E-mail" type="email" autoComplete="email"
        icon={<I.mail/>} value={email} onChange={(v)=>{setEmail(v); if(errors.email) setErrors({...errors,email:undefined})}}
        error={errors.email}
      />
      <Field
        id="pass" label="Senha" type={show ? 'text' : 'password'} autoComplete="current-password"
        icon={<I.lock/>} value={pass} onChange={(v)=>{setPass(v); if(errors.pass) setErrors({...errors,pass:undefined})}}
        error={errors.pass}
        trailing={
          <button type="button" onClick={()=>setShow(s=>!s)} aria-label={show ? 'Ocultar senha' : 'Mostrar senha'} style={{
            width:36,height:36,borderRadius:8,border:'none',background:'transparent',color:'var(--muted)',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center',
          }}>{show ? <I.eyeOff/> : <I.eye/>}</button>
        }
      />

      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:2}}>
        <label style={{display:'inline-flex',alignItems:'center',gap:10,cursor:'pointer',userSelect:'none'}}>
          <span style={{
            width:18,height:18,borderRadius:6,
            border:'1.5px solid ' + (remember ? 'var(--brand)' : 'var(--line)'),
            background: remember ? 'var(--brand)' : '#fff',
            color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',
            transition:'all .15s ease',
          }}>{remember && <I.check/>}</span>
          <input type="checkbox" checked={remember} onChange={(e)=>setRemember(e.target.checked)} style={{display:'none'}}/>
          <span style={{fontSize:13.5,color:'var(--ink-2)',fontWeight:500}}>Lembrar de mim</span>
        </label>
        <a href="#" style={{fontSize:13.5,color:'var(--brand)',fontWeight:600,textDecoration:'none'}}>Esqueci minha senha</a>
      </div>

      <button type="submit" disabled={submitting} style={{
        marginTop:6,
        height:54,
        borderRadius:12,
        border:'none',
        background: success ? 'var(--ok)' : 'var(--brand)',
        color:'#fff',
        fontWeight:700,
        fontSize:15.5,
        letterSpacing:'.01em',
        cursor: submitting ? 'wait' : 'pointer',
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
        boxShadow:'0 10px 24px -10px color-mix(in oklab, var(--brand) 65%, transparent)',
        transition:'background .2s ease, transform .08s ease',
      }}
      onMouseDown={(e)=>e.currentTarget.style.transform='translateY(1px)'}
      onMouseUp={(e)=>e.currentTarget.style.transform=''}
      onMouseLeave={(e)=>e.currentTarget.style.transform=''}
      >
        {submitting ? (<><Spinner/> Entrando...</>)
          : success ? (<><I.check/> Bem-vindo de volta</>)
          : (<>Entrar no painel <I.arrow/></>)}
      </button>

      <div style={{
        marginTop:8,
        textAlign:'center',
        fontSize:13.5,color:'var(--ink-2)',
      }}>
        Ainda não tem cadastro?
        {' '}
        <a href="#" style={{color:'var(--brand)',fontWeight:700,textDecoration:'none'}}>Criar conta de corretor</a>
      </div>
    </form>
  );
}

function Spinner() {
  return (
    <span style={{
      width:18,height:18,borderRadius:'50%',
      border:'2.5px solid rgba(255,255,255,.35)',borderTopColor:'#fff',
      animation:'spin .8s linear infinite',display:'inline-block',
    }}/>
  );
}

/* ---------- Benefit chips for the brand panel ---------- */
function BenefitList() {
  const items = [
    {ic: <I.spark/>, t:'Comissões em dia', s:'Acompanhe pagamentos em tempo real'},
    {ic: <I.shield/>, t:'Carteira segura', s:'Seus clientes protegidos pela LGPD'},
    {ic: <I.check/>, t:'Propostas em 3 cliques', s:'Sem retrabalho, sem papel'},
  ];
  return (
    <ul style={{listStyle:'none',padding:0,margin:0,display:'flex',flexDirection:'column',gap:14}}>
      {items.map((it,i)=>(
        <li key={i} style={{display:'flex',gap:14,alignItems:'flex-start'}}>
          <span style={{
            width:38,height:38,borderRadius:10,
            background:'rgba(255,255,255,.14)',
            color:'#fff',display:'flex',alignItems:'center',justifyContent:'center',flex:'0 0 auto',
            border:'1px solid rgba(255,255,255,.18)',
          }}>{it.ic}</span>
          <div style={{color:'#fff'}}>
            <div style={{fontWeight:700,fontSize:15}}>{it.t}</div>
            <div style={{fontSize:13.5,color:'rgba(255,255,255,.7)',marginTop:2}}>{it.s}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

/* ---------- Decorative blobs ---------- */
function BrandBackdrop() {
  return (
    <svg viewBox="0 0 600 800" preserveAspectRatio="none" style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.65,pointerEvents:'none'}} aria-hidden>
      <defs>
        <radialGradient id="g1" cx="20%" cy="15%" r="60%">
          <stop offset="0" stopColor="#3F77FF" stopOpacity=".55"/>
          <stop offset="1" stopColor="#3F77FF" stopOpacity="0"/>
        </radialGradient>
        <radialGradient id="g2" cx="90%" cy="95%" r="55%">
          <stop offset="0" stopColor="#0A1F5E" stopOpacity=".9"/>
          <stop offset="1" stopColor="#0A1F5E" stopOpacity="0"/>
        </radialGradient>
        <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#fff" opacity=".06"/>
        </pattern>
      </defs>
      <rect width="600" height="800" fill="url(#g1)"/>
      <rect width="600" height="800" fill="url(#g2)"/>
      <rect width="600" height="800" fill="url(#dots)"/>
    </svg>
  );
}

/* ---------- Layouts ---------- */

function LayoutSplit({ showBenefits, compact }) {
  return (
    <div style={{
      minHeight:'100vh',
      display:'grid',
      gridTemplateColumns:'minmax(0, 1.05fr) minmax(0, 1fr)',
      background:'var(--bg)',
    }}>
      {/* Brand panel */}
      <aside style={{
        position:'relative',
        background:'linear-gradient(160deg, var(--brand) 0%, var(--brand-deep) 100%)',
        overflow:'hidden',
        padding:'48px 56px',
        display:'flex',flexDirection:'column',justifyContent:'space-between',
        color:'#fff',
        minHeight: 640,
      }}>
        <BrandBackdrop/>
        <div style={{position:'relative',zIndex:1}}>
          <BrandLockup light size={1}/>
        </div>

        <div style={{position:'relative',zIndex:1,maxWidth:460}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            padding:'6px 12px',borderRadius:999,
            background:'rgba(255,255,255,.12)',
            border:'1px solid rgba(255,255,255,.18)',
            color:'#fff',fontSize:12.5,fontWeight:600,letterSpacing:'.02em',
            marginBottom:22,
          }}>
            <I.spark/> Painel exclusivo do corretor
          </div>
          <h1 style={{
            fontSize:44,fontWeight:800,lineHeight:1.05,letterSpacing:'-.025em',margin:0,
            color:'#fff',
          }}>
            Mais vantagens.<br/>Menos burocracia.
          </h1>
          <p style={{
            marginTop:18,fontSize:16,lineHeight:1.55,color:'rgba(255,255,255,.78)',maxWidth:420,
          }}>
            Acesse sua carteira, acompanhe comissões e envie propostas em poucos cliques.
          </p>

          {showBenefits && (
            <div style={{marginTop:34}}>
              <BenefitList/>
            </div>
          )}
        </div>

        <div style={{position:'relative',zIndex:1,display:'flex',justifyContent:'space-between',alignItems:'center',color:'rgba(255,255,255,.55)',fontSize:12.5}}>
          <span>© {new Date().getFullYear()} CorClub Vantagens</span>
          <span style={{display:'inline-flex',gap:18}}>
            <a href="#" style={{color:'inherit',textDecoration:'none'}}>Suporte</a>
            <a href="#" style={{color:'inherit',textDecoration:'none'}}>Privacidade</a>
          </span>
        </div>
      </aside>

      {/* Form panel */}
      <main style={{
        display:'flex',alignItems:'center',justifyContent:'center',padding:'48px 56px',
      }}>
        <div style={{width:'100%',maxWidth:420}}>
          <div style={{marginBottom:32}}>
            <div style={{
              fontSize:12.5,fontWeight:700,letterSpacing:'.14em',textTransform:'uppercase',color:'var(--brand)',
              marginBottom:10,
            }}>Painel do corretor</div>
            <h2 style={{fontSize:32,fontWeight:800,letterSpacing:'-.02em',margin:0,color:'var(--ink)'}}>
              Bem-vindo de volta
            </h2>
            <p style={{marginTop:8,marginBottom:0,color:'var(--ink-2)',fontSize:15}}>
              Entre com seu e-mail e senha para acessar sua carteira.
            </p>
          </div>
          <LoginForm compact={compact}/>
        </div>
      </main>
    </div>
  );
}

function LayoutCard({ compact }) {
  return (
    <div style={{
      minHeight:'100vh',
      display:'flex',alignItems:'center',justifyContent:'center',
      padding:'40px 24px',
      background:'radial-gradient(1200px 700px at 10% -10%, color-mix(in oklab, var(--brand) 22%, transparent), transparent), radial-gradient(900px 600px at 110% 110%, color-mix(in oklab, var(--brand) 18%, transparent), transparent), var(--bg)',
    }}>
      <div style={{
        width:'100%',maxWidth:480,
        background:'#fff',
        borderRadius:'var(--radius)',
        boxShadow:'var(--shadow-lg)',
        padding:'40px 40px 36px',
        border:'1px solid var(--line)',
      }}>
        <div style={{display:'flex',justifyContent:'center',marginBottom:22}}>
          <BrandLockup light={false} size={.95}/>
        </div>
        <div style={{textAlign:'center',marginBottom:26}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:6,
            padding:'5px 11px',borderRadius:999,
            background:'var(--brand-soft)',color:'var(--brand)',
            fontSize:12,fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',
          }}>Painel do corretor</div>
          <h2 style={{fontSize:26,fontWeight:800,letterSpacing:'-.02em',margin:'14px 0 6px',color:'var(--ink)'}}>
            Entrar na sua conta
          </h2>
          <p style={{margin:0,color:'var(--ink-2)',fontSize:14.5}}>
            Acesse comissões, propostas e clientes em um só lugar.
          </p>
        </div>
        <LoginForm compact={compact}/>
      </div>
    </div>
  );
}

function LayoutMinimal({ compact }) {
  return (
    <div style={{
      minHeight:'100vh',
      display:'grid',
      gridTemplateRows:'auto 1fr auto',
      background:'#fff',
    }}>
      <header style={{padding:'24px 32px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <BrandLockup light={false} size={.8}/>
        <a href="#" style={{
          fontSize:13.5,color:'var(--ink-2)',textDecoration:'none',fontWeight:600,
          display:'inline-flex',alignItems:'center',gap:6,
          padding:'8px 14px',borderRadius:999,border:'1px solid var(--line)',
        }}>Ajuda</a>
      </header>
      <main style={{display:'flex',alignItems:'center',justifyContent:'center',padding:'24px'}}>
        <div style={{width:'100%',maxWidth:380}}>
          <div style={{textAlign:'left',marginBottom:30}}>
            <h2 style={{fontSize:36,fontWeight:800,letterSpacing:'-.025em',margin:0,color:'var(--ink)'}}>
              Painel do corretor
            </h2>
            <p style={{marginTop:10,marginBottom:0,color:'var(--ink-2)',fontSize:15}}>
              Entre para acessar suas vantagens.
            </p>
          </div>
          <LoginForm compact={compact}/>
        </div>
      </main>
      <footer style={{padding:'18px 32px',color:'var(--muted)',fontSize:12.5,display:'flex',justifyContent:'space-between'}}>
        <span>© {new Date().getFullYear()} CorClub Vantagens</span>
        <span>v2.0</span>
      </footer>
    </div>
  );
}

/* ---------- App ---------- */
function App() {
  const [t, setTweak] = useTweaks(window.__TWEAKS__);

  // Live-apply accent color to CSS var
  useEffect(() => {
    document.documentElement.style.setProperty('--brand', t.accent);
    document.documentElement.style.setProperty('--brand-deep', shade(t.accent, -0.35));
    document.documentElement.style.setProperty('--brand-soft', tint(t.accent, 0.88));
  }, [t.accent]);

  let Layout = LayoutSplit;
  if (t.layout === 'card') Layout = LayoutCard;
  if (t.layout === 'minimal') Layout = LayoutMinimal;

  return (
    <React.Fragment>
      <Layout showBenefits={t.showBenefits} compact={t.compact}/>
      <TweaksPanel title="Tweaks">
        <TweakSection label="Layout">
          <TweakSelect
            label="Estilo"
            value={t.layout}
            onChange={(v)=>setTweak('layout', v)}
            options={[
              {value:'split', label:'Split (marca + form)'},
              {value:'card',  label:'Card centralizado'},
              {value:'minimal', label:'Minimal'},
            ]}
          />
          {t.layout === 'split' && (
            <TweakToggle label="Benefícios" value={t.showBenefits} onChange={(v)=>setTweak('showBenefits', v)}/>
          )}
          <TweakToggle label="Compacto" value={t.compact} onChange={(v)=>setTweak('compact', v)}/>
        </TweakSection>
        <TweakSection label="Marca">
          <TweakColor
            label="Cor"
            value={t.accent}
            onChange={(v)=>setTweak('accent', v)}
            options={['#1747B8','#0E2F87','#0A66C2','#1E40AF','#2563EB']}
          />
        </TweakSection>
      </TweaksPanel>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </React.Fragment>
  );
}

/* ---------- color helpers (no external libs) ---------- */
function hexToRgb(hex){
  const h = hex.replace('#','');
  const n = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
function rgbToHex({r,g,b}){
  const c = (x)=>Math.max(0,Math.min(255,Math.round(x))).toString(16).padStart(2,'0');
  return '#'+c(r)+c(g)+c(b);
}
function shade(hex, amt){ // amt -1..1 ; negative = darker
  const {r,g,b} = hexToRgb(hex);
  const f = amt < 0 ? 1+amt : 1;
  const add = amt > 0 ? (255 - 0) * amt : 0;
  return rgbToHex({ r: r*f + add, g: g*f + add, b: b*f + add });
}
function tint(hex, amt){ // mix with white, amt 0..1
  const {r,g,b} = hexToRgb(hex);
  return rgbToHex({ r: r + (255-r)*amt, g: g + (255-g)*amt, b: b + (255-b)*amt });
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
