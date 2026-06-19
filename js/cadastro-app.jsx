// cadastro-app.jsx
// Compõe o layout da página de cadastro (split / centralizado), o painel
// lateral de benefícios e o formulário. Liga os controles de Tweaks.

function CadastroApp() {
  const { CC_BrandLockup: BrandLockup, CC_Pill: Pill, CC_Icon: Icon, CC_SignupForm: SignupForm } = window;
  const [t, setTweak] = useTweaks(window.__TWEAKS__);

  const accent = t.accent || '#1747B8';
  const split = t.layout === 'split';
  const showBenefits = t.showBenefits && split;
  const compact = !!t.compact;

  const benefits = [
    { icon: <Icon.gift/>,   title: 'Vantagens exclusivas', desc: 'Descontos e clube de benefícios para você e seus clientes.' },
    { icon: <Icon.bolt/>,   title: 'Cotação em segundos', desc: 'Compare operadoras e feche propostas sem fricção.' },
    { icon: <Icon.shield/>, title: 'Dados protegidos',     desc: 'Criptografia ponta a ponta e conformidade com a LGPD.' },
  ];

  /* Painel lateral de marca + benefícios (somente no layout split) */
  const SidePanel = (
    <aside className="cad-side" style={{
      position:'relative',overflow:'hidden',color:'#fff',
      display:'flex',flexDirection:'column',justifyContent:'space-between',
      padding:'40px 44px',
      background:
        `radial-gradient(60% 50% at 18% 18%, rgba(120,170,255,.45), transparent 60%),` +
        `radial-gradient(55% 55% at 88% 86%, rgba(8,30,98,.85), transparent 62%),` +
        `linear-gradient(160deg, ${accent} 0%, var(--brand-deep) 60%, #081E62 100%)`,
    }}>
      {/* grade decorativa */}
      <span aria-hidden style={{
        position:'absolute',inset:0,pointerEvents:'none',opacity:.5,
        backgroundImage:'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
        backgroundSize:'54px 54px',
        maskImage:'radial-gradient(80% 80% at 40% 30%, #000 30%, transparent 78%)',
        WebkitMaskImage:'radial-gradient(80% 80% at 40% 30%, #000 30%, transparent 78%)',
      }}/>
      {/* marca d'água */}
      <svg viewBox="0 0 64 44" aria-hidden style={{position:'absolute',right:-60,bottom:-30,width:420,opacity:.10}}>
        <g fill="none" stroke="#fff" strokeWidth=".4">
          <circle cx="16" cy="10" r="7"/><circle cx="48" cy="10" r="7"/>
          <path d="M2 40c0-12 8-20 14-20 5 0 9 5 9 12v8H2z"/>
          <path d="M39 40v-8c0-7 4-12 9-12 6 0 14 8 14 20H39z"/>
          <path d="M22 40v-8c0-5 4-9 10-9s10 4 10 9v8H22z"/>
        </g>
      </svg>

      <div style={{position:'relative',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <BrandLockup size={.82} tone="light"/>
        <Pill tone="dark">
          <span style={{width:6,height:6,borderRadius:'50%',background:'var(--ok)',boxShadow:'0 0 8px var(--ok)'}}/>
          Online
        </Pill>
      </div>

      <div style={{position:'relative',maxWidth:420}}>
        <div className="tech" style={{fontSize:12,color:'rgba(255,255,255,.78)',display:'inline-flex',alignItems:'center',gap:10,marginBottom:18}}>
          <Icon.spark/> Portal do corretor
        </div>
        <h2 style={{margin:0,fontSize:38,lineHeight:1.08,fontWeight:800,letterSpacing:'-.03em'}}>
          Crie sua conta e<br/>
          <span style={{backgroundImage:'linear-gradient(90deg,#C9D9FF,#fff)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>
            venda mais com vantagens
          </span>
        </h2>
        <p style={{margin:'14px 0 30px',fontSize:15.5,color:'rgba(255,255,255,.82)',lineHeight:1.6}}>
          Junte-se a milhares de corretores que usam o CorClub para cotar, gerir clientes e oferecer benefícios.
        </p>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {benefits.map((b, i) => (
            <div key={i} style={{display:'flex',alignItems:'flex-start',gap:14}}>
              <span style={{
                flex:'0 0 auto',width:42,height:42,borderRadius:11,display:'grid',placeItems:'center',
                background:'rgba(255,255,255,.12)',border:'1px solid rgba(255,255,255,.22)',color:'#fff',
              }}>{b.icon}</span>
              <div>
                <div style={{fontWeight:700,fontSize:15}}>{b.title}</div>
                <div style={{fontSize:13.5,color:'rgba(255,255,255,.74)',lineHeight:1.5,marginTop:2}}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="tech" style={{position:'relative',display:'flex',gap:18,fontSize:11,color:'rgba(255,255,255,.6)'}}>
        <span>© {new Date().getFullYear()} CorClub</span>
        <span>LGPD</span>
        <span>TLS 1.3</span>
      </div>
    </aside>
  );

  /* Coluna do formulário */
  const FormCol = (
    <main className="cad-scroll" style={{
      display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',
      padding: split ? '56px 40px' : '40px 24px 72px',overflowY:'auto',
    }}>
      <div style={{width:'min(460px, 100%)',marginTop: split ? 0 : 8}}>
        {!split && (
          <div style={{display:'flex',justifyContent:'center',marginBottom:28}}>
            <BrandLockup size={.9} tone="brand"/>
          </div>
        )}
        <div style={{marginBottom:compact ? 20 : 28}}>
          <div className="tech" style={{fontSize:12,color:accent,display:'inline-flex',alignItems:'center',gap:8,marginBottom:12}}>
            <Icon.spark/> Criar conta
          </div>
          <h1 style={{margin:0,fontSize:30,fontWeight:800,letterSpacing:'-.025em',color:'var(--ink)',lineHeight:1.1}}>
            Cadastro de corretor
          </h1>
          <p style={{margin:'10px 0 0',fontSize:15,color:'var(--ink-3)',lineHeight:1.55}}>
            Leva menos de 2 minutos. Já começamos com seus dados essenciais.
          </p>
        </div>
        <SignupForm accent={accent} compact={compact}/>
      </div>
    </main>
  );

  return (
    <>
      <div style={{
        minHeight:'100vh',
        display: split ? 'grid' : 'block',
        gridTemplateColumns: split ? (showBenefits ? '1.05fr 1fr' : '0 1fr') : undefined,
      }}>
        {showBenefits && SidePanel}
        {FormCol}
      </div>

      <TweaksPanel title="Cadastro">
        <TweakSection label="Layout"/>
        <TweakRadio label="Formato" value={t.layout} options={['split', 'centered']}
                    onChange={(v) => setTweak('layout', v)}/>
        <TweakToggle label="Painel de benefícios" value={t.showBenefits}
                     onChange={(v) => setTweak('showBenefits', v)}/>
        <TweakToggle label="Compacto" value={t.compact}
                     onChange={(v) => setTweak('compact', v)}/>
        <TweakSection label="Marca"/>
        <TweakColor label="Cor de destaque" value={t.accent}
                    options={['#1747B8', '#0E2F87', '#2BA37B', '#7A5AE0', '#C97A1B']}
                    onChange={(v) => setTweak('accent', v)}/>
      </TweaksPanel>
    </>
  );
}

/* Responsividade: colapsa o split em telas estreitas */
if (!document.getElementById('cc-resp')) {
  const st = document.createElement('style');
  st.id = 'cc-resp';
  st.textContent = `
    @media (max-width: 900px){
      .cad-side{display:none !important}
      div[style*="grid-template-columns"]{grid-template-columns:1fr !important;display:block !important}
    }`;
  document.head.appendChild(st);
}

ReactDOM.createRoot(document.getElementById('root')).render(<CadastroApp/>);
