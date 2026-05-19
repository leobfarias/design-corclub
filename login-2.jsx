const { useState, useEffect, useRef } = React;

/* ---------- Icons (alinhados com Login 1: stroke 1.8, geometria simples) ---------- */
const I = {
  mail: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m3.5 6.5 8.5 7 8.5-7"/></svg>,
  lock: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><rect x="4.5" y="10.5" width="15" height="10.5" rx="2.5"/><path d="M8 10.5V7.5a4 4 0 0 1 8 0v3"/></svg>,
  eye: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/></svg>,
  eyeOff: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 3l18 18"/><path d="M10.6 6.2A9.6 9.6 0 0 1 12 6c6.4 0 10 6 10 6a17 17 0 0 1-3.2 3.9"/><path d="M6.1 7.8A17 17 0 0 0 2 12s3.6 6 10 6a9.5 9.5 0 0 0 4.3-1"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>,
  arrow: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>,
  check: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="m5 12 5 5 9-11"/></svg>,
  star: (p) => <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...p}><path d="M12 2 14.5 8.4 21 9.3l-4.8 4.5L17.5 21 12 17.6 6.5 21l1.3-7.2L3 9.3l6.5-.9L12 2z"/></svg>,
  trend: (p) => <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...p}><path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/></svg>,
  spark: (p) => <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" {...p}><path d="M12 2.5 13.6 8 19 9.5 13.6 11 12 16.5 10.4 11 5 9.5 10.4 8z"/></svg>,
};

/* ---------- Brand lockup (idêntico ao de Login 1) ---------- */
function BrandLockup({ light = false, size = 1 }) {
  const c = light ? '#fff' : 'var(--brand)';
  const c2 = light ? 'rgba(255,255,255,.85)' : 'var(--ink-2)';
  return (
    <div style={{display:'inline-flex',alignItems:'center',gap:14 * size}}>
      <svg viewBox="0 0 64 44" width={48 * size} height={48 * 44/64 * size} aria-hidden>
        <circle cx="16" cy="10" r="7" fill={c}/>
        <circle cx="48" cy="10" r="7" fill={c} opacity={light ? 1 : .55}/>
        <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z" fill={c}/>
        <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z" fill={c} opacity={light ? 1 : .55}/>
        <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z" fill={c} opacity={light ? .85 : .35}/>
      </svg>
      <div style={{display:'flex',flexDirection:'column',lineHeight:1}}>
        <span style={{fontWeight:700,fontSize:26 * size,letterSpacing:'-.02em',color:c}}>
          Cor<span style={{fontWeight:800}}>Club</span>
        </span>
        <span style={{fontWeight:500,fontSize:13 * size,color:c2,marginTop:4,letterSpacing:'.08em',textTransform:'uppercase'}}>Vantagens</span>
      </div>
    </div>
  );
}

/* ---------- App ---------- */
function App() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  function submit(e) {
    e.preventDefault();
    const errs = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'E-mail inválido';
    if (pass.length < 4) errs.pass = 'Mínimo 4 caracteres';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); setTimeout(()=>setSuccess(false), 2200); }, 1100);
  }

  return (
    <div style={{
      minHeight:'100vh',
      display:'grid',
      gridTemplateColumns:'minmax(0, 1fr) minmax(0, 1.1fr)',
    }}>
      {/* LEFT — formulário (bg neutro alinhado com Login 1) */}
      <section style={{
        padding:'48px 56px',
        display:'flex',flexDirection:'column',justifyContent:'space-between',
        background:'var(--bg)',
      }}>
        <BrandLockup/>

        <div style={{maxWidth:420,width:'100%',margin:'40px 0'}}>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:8,
            padding:'5px 11px',borderRadius:999,
            background:'var(--brand-soft)',color:'var(--brand)',
            fontSize:12,fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase',
            marginBottom:18,
          }}><I.spark/> Painel do corretor</div>

          <h1 style={{
            margin:0,fontSize:42,fontWeight:800,letterSpacing:'-.025em',lineHeight:1.05,
            color:'var(--ink)',
          }}>
            Acesse sua<br/>carteira de<br/>
            <span style={{color:'var(--brand)'}}>vantagens.</span>
          </h1>
          <p style={{margin:'14px 0 28px',color:'var(--ink-2)',fontSize:15.5,lineHeight:1.55,maxWidth:380}}>
            Faça login para acompanhar comissões, propostas em andamento e clientes em tempo real.
          </p>

          <form onSubmit={submit} noValidate style={{display:'flex',flexDirection:'column',gap:16}}>
            <Field
              id="email" label="E-mail" type="email" autoComplete="email"
              icon={<I.mail/>} value={email}
              onChange={(v)=>{setEmail(v); if(errors.email) setErrors({...errors,email:undefined})}}
              error={errors.email}
            />
            <Field
              id="pass" label="Senha" type={show?'text':'password'} autoComplete="current-password"
              icon={<I.lock/>} value={pass}
              onChange={(v)=>{setPass(v); if(errors.pass) setErrors({...errors,pass:undefined})}}
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
              marginTop:8,
              height:54,borderRadius:12,border:'none',
              background: success ? 'var(--ok)' : 'var(--brand)',
              color:'#fff',fontWeight:700,fontSize:15.5,
              cursor: submitting ? 'wait' : 'pointer',
              display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
              boxShadow:'0 12px 28px -10px color-mix(in oklab, var(--brand) 65%, transparent)',
              transition:'background .2s ease, transform .08s ease',
            }}
            onMouseDown={(e)=>e.currentTarget.style.transform='translateY(1px)'}
            onMouseUp={(e)=>e.currentTarget.style.transform=''}
            onMouseLeave={(e)=>e.currentTarget.style.transform=''}
            >
              {submitting ? (<><Spinner/> Entrando…</>)
                : success ? (<><I.check/> Bem-vindo de volta</>)
                : (<>Entrar no painel <I.arrow/></>)}
            </button>

            <div style={{marginTop:6,textAlign:'center',fontSize:13.5,color:'var(--ink-2)'}}>
              Ainda não é corretor CorClub?{' '}
              <a href="#" style={{color:'var(--brand)',fontWeight:700,textDecoration:'none'}}>Criar cadastro</a>
            </div>
          </form>
        </div>

        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',color:'var(--muted)',fontSize:12.5}}>
          <span>© {new Date().getFullYear()} CorClub Vantagens</span>
          <span className="tech" style={{fontSize:11.5}}>v 2026.05</span>
        </div>
      </section>

      {/* RIGHT — blue marketing panel with cards */}
      <aside style={{
        position:'relative',
        background:'linear-gradient(160deg, var(--brand) 0%, var(--brand-deep) 100%)',
        overflow:'hidden',
        padding:'48px 56px',
        color:'#fff',
        minHeight:680,
        display:'flex',flexDirection:'column',
      }}>
        <BlueBackdrop/>

        <div style={{position:'relative',zIndex:1,display:'flex',justifyContent:'flex-end'}}>
          <div className="tech" style={{
            display:'inline-flex',alignItems:'center',gap:8,
            padding:'6px 12px',borderRadius:999,
            background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.18)',
            color:'#fff',fontSize:11.5,letterSpacing:'.16em',
          }}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ok)',boxShadow:'0 0 8px var(--ok)'}}/>
            Plataforma ativa
          </div>
        </div>

        {/* Hero text */}
        <div style={{position:'relative',zIndex:1,marginTop:40}}>
          <h2 style={{
            margin:0,fontSize:46,fontWeight:800,letterSpacing:'-.025em',lineHeight:1.05,maxWidth:480,
          }}>
            A plataforma feita para corretores que vendem mais.
          </h2>
          <p style={{
            margin:'16px 0 0',fontSize:16,lineHeight:1.55,color:'rgba(255,255,255,.78)',maxWidth:440,
          }}>
            Tudo o que você precisa para fechar mais propostas em um único painel.
          </p>
        </div>

        {/* Stat cards */}
        <div style={{
          position:'relative',zIndex:1,
          display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:36,
        }}>
          <StatCard icon={<I.trend/>} value="+38%" label="Aumento médio nas comissões" sub="Corretores ativos no último trimestre"/>
          <StatCard icon={<I.star/>} value="4.9" label="Avaliação dos corretores" sub="Mais de 2.300 reviews na plataforma"/>
        </div>

        {/* Testimonial card */}
        <div style={{
          position:'relative',zIndex:1,marginTop:18,
          background:'rgba(255,255,255,.08)',
          border:'1px solid rgba(255,255,255,.16)',
          borderRadius:16,padding:'20px 22px',
          backdropFilter:'blur(10px)',
          WebkitBackdropFilter:'blur(10px)',
        }}>
          <div style={{display:'flex',gap:4,marginBottom:10,color:'#FFD179'}}>
            {[0,1,2,3,4].map(i => <I.star key={i}/>)}
          </div>
          <p style={{margin:0,fontSize:16,lineHeight:1.5,color:'#fff',fontWeight:500}}>
            “Liquidação de comissão em 48h mudou meu fluxo de caixa. Hoje gerencio toda a carteira pelo painel.”
          </p>
          <div style={{display:'flex',alignItems:'center',gap:12,marginTop:16}}>
            <div style={{
              width:38,height:38,borderRadius:'50%',
              background:'linear-gradient(135deg, #6FA0FF, #B8C9FF)',
              display:'flex',alignItems:'center',justifyContent:'center',
              fontWeight:800,color:'var(--brand-deep)',fontSize:14,
            }}>RS</div>
            <div>
              <div style={{fontWeight:700,fontSize:14}}>Renata Souza</div>
              <div style={{fontSize:12.5,color:'rgba(255,255,255,.7)'}}>Corretora · Belo Horizonte</div>
            </div>
          </div>
        </div>

        {/* Bottom row: features */}
        <div style={{
          position:'relative',zIndex:1,marginTop:'auto',paddingTop:24,
          display:'grid',gridTemplateColumns:'repeat(3, 1fr)',gap:14,
        }}>
          {[
            {t:'Comissões em D+2', s:'Sem retenção'},
            {t:'Propostas digitais', s:'Sem papel'},
            {t:'CRM integrado', s:'Sem retrabalho'},
          ].map((f,i)=>(
            <div key={i} style={{
              borderTop:'1px solid rgba(255,255,255,.18)',paddingTop:14,
            }}>
              <div style={{fontWeight:700,fontSize:14,color:'#fff'}}>{f.t}</div>
              <div style={{fontSize:12.5,color:'rgba(255,255,255,.68)',marginTop:2}}>{f.s}</div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

/* ---------- Subcomponents ---------- */
function Field({ id, label, type, icon, value, onChange, autoComplete, trailing, error }) {
  const [focus, setFocus] = useState(false);
  const filled = value && value.length > 0;
  return (
    <label htmlFor={id} style={{display:'block'}}>
      <div style={{fontSize:13,fontWeight:600,color:'var(--ink-2)',marginBottom:8}}>{label}</div>
      <div style={{
        position:'relative',display:'flex',alignItems:'center',
        height:52,borderRadius:12,background:'#fff',
        border:'1.5px solid ' + (error ? 'var(--danger)' : focus ? 'var(--brand)' : 'var(--line)'),
        boxShadow: focus ? '0 0 0 4px color-mix(in oklab, var(--brand) 18%, transparent)' : 'none',
        transition:'border-color .15s ease, box-shadow .15s ease',
      }}>
        {icon && <span style={{paddingLeft:16,paddingRight:10,color: focus || filled ? 'var(--brand)' : 'var(--muted)',display:'flex'}}>{icon}</span>}
        <input
          id={id} type={type} value={value} autoComplete={autoComplete}
          onChange={(e)=>onChange(e.target.value)}
          onFocus={()=>setFocus(true)} onBlur={()=>setFocus(false)}
          style={{flex:1,minWidth:0,height:'100%',border:'none',outline:'none',background:'transparent',fontSize:15,color:'var(--ink)',padding: icon ? '0 12px 0 0' : '0 16px',fontWeight:500}}
        />
        {trailing && <span style={{paddingRight:8}}>{trailing}</span>}
      </div>
      {error && <div style={{marginTop:6,fontSize:12.5,color:'var(--danger)',fontWeight:600}}>{error}</div>}
    </label>
  );
}

function StatCard({ icon, value, label, sub }) {
  return (
    <div style={{
      background:'rgba(255,255,255,.08)',
      border:'1px solid rgba(255,255,255,.16)',
      borderRadius:14,padding:'16px 18px',
      backdropFilter:'blur(8px)',
      WebkitBackdropFilter:'blur(8px)',
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{
          width:34,height:34,borderRadius:9,
          background:'rgba(255,255,255,.14)',
          display:'flex',alignItems:'center',justifyContent:'center',
          color:'#fff',
        }}>{icon}</div>
      </div>
      <div style={{marginTop:10,fontSize:28,fontWeight:800,letterSpacing:'-.02em',color:'#fff'}}>{value}</div>
      <div style={{fontSize:13,color:'rgba(255,255,255,.85)',fontWeight:600,marginTop:2}}>{label}</div>
      <div style={{fontSize:11.5,color:'rgba(255,255,255,.6)',marginTop:4}}>{sub}</div>
    </div>
  );
}

function BlueBackdrop() {
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

function Spinner() {
  return <span style={{
    width:18,height:18,borderRadius:'50%',
    border:'2.5px solid rgba(255,255,255,.35)',borderTopColor:'#fff',
    animation:'spin .8s linear infinite',display:'inline-block',
  }}/>;
}

const s = document.createElement('style');
s.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
document.head.appendChild(s);

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
