// cadastro-form.jsx
// Formulário de criação de conta de corretor. Validação, máscaras BR,
// medidor de senha e estado de sucesso. Consome primitivas de cadastro-core.jsx.

function SignupForm({ accent = '#1747B8', compact = false }) {
  const { CC_Icon: Icon, CC_Field: Field, CC_CheckBox: CheckBox, CC_mask: mask,
          CC_validate: validate, CC_PasswordMeter: PasswordMeter,
          CC_passwordScore: passwordScore, CC_Spinner: Spinner } = window;

  const [form, setForm] = React.useState({
    nome: '', email: '', telefone: '', cpf: '', corretora: '', senha: '', confirma: '',
  });
  const [show, setShow] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [news, setNews] = React.useState(true);
  const [errors, setErrors] = React.useState({});
  const [submitting, setSubmitting] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const set = (key, raw) => {
    let v = raw;
    if (key === 'cpf') v = mask.cpf(raw);
    if (key === 'telefone') v = mask.phone(raw);
    setForm((f) => ({ ...f, [key]: v }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  function check() {
    const e = {};
    if (form.nome.trim().length < 3) e.nome = 'Informe seu nome completo';
    if (!validate.email(form.email)) e.email = 'E-mail inválido';
    if (!validate.phone(form.telefone)) e.telefone = 'Telefone inválido';
    if (!validate.cpf(form.cpf)) e.cpf = 'CPF inválido';
    if (passwordScore(form.senha) < 2) e.senha = 'Senha muito fraca';
    if (form.confirma !== form.senha || !form.confirma) e.confirma = 'As senhas não coincidem';
    if (!terms) e.terms = true;
    return e;
  }

  function submit(ev) {
    ev.preventDefault();
    const e = check();
    setErrors(e);
    if (Object.keys(e).length) {
      // foca o primeiro campo com erro
      const first = Object.keys(e).find((k) => k !== 'terms');
      if (first) { const el = document.getElementById(first); if (el) el.focus(); }
      return;
    }
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setDone(true); }, 1400);
  }

  const eyeBtn = (
    <button type="button" onClick={() => setShow((s) => !s)} aria-label="Mostrar senha" style={{
      background:'transparent',border:'none',color:'var(--muted)',cursor:'pointer',
      width:34,height:34,display:'inline-flex',alignItems:'center',justifyContent:'center',borderRadius:8,
    }}>{show ? <Icon.eyeOff/> : <Icon.eye/>}</button>
  );

  if (done) {
    return (
      <div style={{textAlign:'center',padding:'24px 8px',animation:'cc-pop .4s ease'}}>
        <div style={{
          width:76,height:76,borderRadius:'50%',margin:'0 auto 22px',
          display:'grid',placeItems:'center',color:'#fff',
          background:'linear-gradient(135deg, color-mix(in oklab, var(--ok) 75%, #fff), var(--ok))',
          boxShadow:'0 18px 40px -14px rgba(43,163,123,.55)',
        }}>
          <svg viewBox="0 0 24 24" width="40" height="40" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 5 5 9-11"/></svg>
        </div>
        <h2 style={{margin:'0 0 10px',fontSize:26,fontWeight:800,letterSpacing:'-.02em',color:'var(--ink)'}}>Conta criada!</h2>
        <p style={{margin:'0 auto 26px',maxWidth:340,fontSize:15,color:'var(--ink-3)',lineHeight:1.55}}>
          Enviamos um link de confirmação para <b style={{color:'var(--ink)'}}>{form.email}</b>.
          Confirme seu e-mail para ativar o acesso ao portal.
        </p>
        <a href="login-3.html" style={{
          display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
          height:52,padding:'0 28px',borderRadius:12,textDecoration:'none',
          background: accent, color:'#fff',fontSize:15.5,fontWeight:700,
          boxShadow:'0 12px 30px -10px rgba(23,71,184,.5)',
        }}>Ir para o login <Icon.arrow/></a>
      </div>
    );
  }

  const gap = compact ? 12 : 16;

  return (
    <form onSubmit={submit} noValidate style={{display:'flex',flexDirection:'column',gap}}>
      <Field id="nome" label="Nome completo" autoComplete="name" accent={accent}
             icon={<Icon.user/>} placeholder="Maria Silva"
             value={form.nome} onChange={(v) => set('nome', v)} error={errors.nome}/>

      <Field id="email" label="E-mail profissional" type="email" autoComplete="email" accent={accent}
             icon={<Icon.mail/>} placeholder="voce@corretora.com.br"
             value={form.email} onChange={(v) => set('email', v)} error={errors.email}/>

      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap}}>
        <Field id="telefone" label="WhatsApp" type="tel" autoComplete="tel" accent={accent}
               icon={<Icon.phone/>} placeholder="(11) 99999-9999" inputMode="numeric"
               value={form.telefone} onChange={(v) => set('telefone', v)} error={errors.telefone}/>
        <Field id="cpf" label="CPF" accent={accent}
               icon={<Icon.id/>} placeholder="000.000.000-00" inputMode="numeric"
               value={form.cpf} onChange={(v) => set('cpf', v)} error={errors.cpf}/>
      </div>

      <Field id="corretora" label="Corretora / Equipe" hint="opcional" accent={accent}
             icon={<Icon.building/>} placeholder="Nome da sua corretora"
             value={form.corretora} onChange={(v) => set('corretora', v)}/>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        <Field id="senha" label="Senha" type={show ? 'text' : 'password'} autoComplete="new-password"
               accent={accent} icon={<Icon.lock/>} placeholder="Mínimo 8 caracteres" trailing={eyeBtn}
               value={form.senha} onChange={(v) => set('senha', v)} error={errors.senha}/>
        <PasswordMeter value={form.senha}/>
      </div>

      <Field id="confirma" label="Confirmar senha" type={show ? 'text' : 'password'} autoComplete="new-password"
             accent={accent} icon={<Icon.lock/>} placeholder="Repita a senha"
             value={form.confirma} onChange={(v) => set('confirma', v)} error={errors.confirma}/>

      <div style={{display:'flex',flexDirection:'column',gap:12,marginTop:4}}>
        <CheckBox checked={terms} onChange={setTerms} accent={errors.terms ? 'var(--danger)' : accent}>
          Li e aceito os <a href="#" style={{color:accent,fontWeight:600,textDecoration:'none'}}>Termos de Uso</a> e a <a href="#" style={{color:accent,fontWeight:600,textDecoration:'none'}}>Política de Privacidade</a>.
          {errors.terms && <span style={{display:'block',color:'var(--danger)',fontWeight:600,marginTop:4}}>É necessário aceitar para continuar.</span>}
        </CheckBox>
        <CheckBox checked={news} onChange={setNews} accent={accent}>
          Quero receber novidades e campanhas de vantagens por e-mail.
        </CheckBox>
      </div>

      <button type="submit" disabled={submitting} style={{
        marginTop:6,height:56,borderRadius:13,border:'none',
        background: accent, color:'#fff',fontSize:16,fontWeight:700,letterSpacing:'.01em',
        cursor: submitting ? 'wait' : 'pointer',
        display:'inline-flex',alignItems:'center',justifyContent:'center',gap:10,
        boxShadow:'0 16px 36px -12px rgba(23,71,184,.5), inset 0 1px 0 rgba(255,255,255,.25)',
        transition:'transform .08s ease, filter .15s ease',
      }}
      onMouseDown={(e) => e.currentTarget.style.transform = 'translateY(1px)'}
      onMouseUp={(e) => e.currentTarget.style.transform = ''}
      onMouseLeave={(e) => e.currentTarget.style.transform = ''}>
        {submitting ? (<><Spinner light/> Criando conta…</>) : (<>Criar minha conta <Icon.arrow/></>)}
      </button>

      <p style={{textAlign:'center',margin:'4px 0 0',fontSize:13.5,color:'var(--ink-3)'}}>
        Já tem cadastro? <a href="login-3.html" style={{color:accent,fontWeight:700,textDecoration:'none'}}>Entrar no portal</a>
      </p>
    </form>
  );
}

window.CC_SignupForm = SignupForm;

if (!document.getElementById('cc-pop-kf')) {
  const st = document.createElement('style');
  st.id = 'cc-pop-kf';
  st.textContent = '@keyframes cc-pop{from{opacity:0;transform:scale(.96)}to{opacity:1;transform:scale(1)}}';
  document.head.appendChild(st);
}
