/* CorClub — Shell do Painel do Corretor */

function CorretorApp() {
  // route persistence
  const [route, setRoute] = useState(() => localStorage.getItem('cc.corretor.route') || 'dashboard');
  useEffect(() => { localStorage.setItem('cc.corretor.route', route); }, [route]);

  const corretor = getCorretor();
  const propostasAtivas = PROPOSTAS.filter(p => p.corretor === CORRETOR_LOGADO && ['Em análise','Pendência','Rascunho','Aprovada'].includes(p.status)).length;

  const groups = [
    {
      label: 'Operação',
      items: [
        { key: 'dashboard',      label: 'Dashboard',        icon: <Ico.home/> },
        { key: 'carteira',       label: 'Minha carteira',   icon: <Ico.users/>, badge: CLIENTES.filter(k=>k.corretor===CORRETOR_LOGADO).length },
        { key: 'propostas',      label: 'Propostas',        icon: <Ico.doc/>, badge: propostasAtivas },
        { key: 'nova-proposta',  label: 'Nova proposta',    icon: <Ico.plus/> },
      ],
    },
    {
      label: 'Financeiro',
      items: [
        { key: 'comissoes', label: 'Comissões', icon: <Ico.cash/> },
      ],
    },
    {
      label: 'Conhecimento',
      items: [
        { key: 'planos', label: 'Catálogo de planos', icon: <Ico.pkg/> },
      ],
    },
    {
      label: 'Conta',
      items: [
        { key: 'perfil', label: 'Perfil', icon: <Ico.user/> },
      ],
    },
  ];

  const breadcrumbMap = {
    'dashboard':     ['Painel', 'Dashboard'],
    'carteira':      ['Painel', 'Minha carteira'],
    'propostas':     ['Painel', 'Propostas'],
    'nova-proposta': ['Painel', 'Propostas', 'Nova proposta'],
    'comissoes':     ['Painel', 'Comissões'],
    'planos':        ['Painel', 'Catálogo de planos'],
    'perfil':        ['Painel', 'Perfil'],
  };

  const Footer = (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 4px',cursor:'pointer'}}>
        <Avatar name={corretor.nome} size="sm"/>
        <div style={{lineHeight:1.15, flex:1, minWidth:0}}>
          <div style={{fontSize:12.5, fontWeight:700, color:'var(--ink)', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{corretor.nome}</div>
          <div className="tech" style={{fontSize:10, color:'var(--brand)'}}>Tier {corretor.tier}</div>
        </div>
        <Ico.chevD width={12} height={12}/>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8,paddingTop:10,borderTop:'1px solid var(--line-soft)',fontSize:11.5,color:'var(--muted)',fontWeight:600}}>
        <span>Suporte</span>
        <span>v 2026.05</span>
      </div>
    </div>
  );

  return (
    <div className="app" data-screen-label="Painel do Corretor">
      <Sidebar variant="light" groups={groups} active={route} onSelect={setRoute} footer={Footer}/>
      <main className="main">
        <Topbar role="Corretor" userName={corretor.nome} breadcrumb={breadcrumbMap[route]}/>
        <div className="content" data-screen-label={`Corretor / ${route}`}>
          {route === 'dashboard'      && <ScreenDashboard onNav={setRoute}/>}
          {route === 'carteira'       && <ScreenCarteira onNav={setRoute}/>}
          {route === 'nova-proposta'  && <ScreenNovaProposta onNav={setRoute}/>}
          {route === 'propostas'      && <ScreenPropostas onNav={setRoute}/>}
          {route === 'comissoes'      && <ScreenComissoes/>}
          {route === 'planos'         && <ScreenPlanos/>}
          {route === 'perfil'         && <ScreenPerfil/>}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<CorretorApp/>);
