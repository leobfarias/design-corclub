/* CorClub — Shell do Painel ADMIN */

function AdminApp() {
  const [route, setRoute] = useState(() => localStorage.getItem('cc.admin.route') || 'dashboard');
  useEffect(() => { localStorage.setItem('cc.admin.route', route); }, [route]);

  const propostasPendentes = PROPOSTAS.filter(p => ['Em análise','Pendência'].includes(p.status)).length;
  const corretoresPendentes = CORRETORES.filter(c => c.status === 'Pendente').length;

  const groups = [
    {
      label: 'Visão geral',
      items: [
        { key: 'dashboard', label: 'Dashboard', icon: <Ico.home/> },
        { key: 'relatorios', label: 'Relatórios', icon: <Ico.chart/> },
      ],
    },
    {
      label: 'Rede',
      items: [
        { key: 'corretores', label: 'Corretores', icon: <Ico.award/>, badge: corretoresPendentes || undefined },
        { key: 'clientes',   label: 'Clientes',   icon: <Ico.users/> },
      ],
    },
    {
      label: 'Operação',
      items: [
        { key: 'propostas',  label: 'Propostas',  icon: <Ico.doc/>, badge: propostasPendentes },
        { key: 'operadoras', label: 'Operadoras & Planos', icon: <Ico.building/> },
      ],
    },
    {
      label: 'Financeiro',
      items: [
        { key: 'comissoes', label: 'Comissões & repasses', icon: <Ico.cash/> },
      ],
    },
  ];

  const breadcrumbMap = {
    'dashboard':  ['Admin', 'Dashboard'],
    'corretores': ['Admin', 'Rede', 'Corretores'],
    'clientes':   ['Admin', 'Rede', 'Clientes'],
    'propostas':  ['Admin', 'Operação', 'Propostas'],
    'operadoras': ['Admin', 'Operação', 'Operadoras & Planos'],
    'comissoes':  ['Admin', 'Financeiro', 'Comissões'],
    'relatorios': ['Admin', 'Relatórios'],
  };

  const adminUser = 'Daniel Marçal';
  const Footer = (
    <div>
      <div style={{display:'flex',alignItems:'center',gap:10,padding:'8px 4px',cursor:'pointer'}}>
        <Avatar name={adminUser} size="sm"/>
        <div style={{lineHeight:1.15, flex:1, minWidth:0}}>
          <div style={{fontSize:12.5, fontWeight:700, color:'#fff', whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{adminUser}</div>
          <div className="tech" style={{fontSize:10, color:'rgba(255,255,255,.55)'}}>Admin · Operações</div>
        </div>
        <span style={{color:'rgba(255,255,255,.55)'}}><Ico.chevD width={12} height={12}/></span>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8,paddingTop:10,borderTop:'1px solid rgba(255,255,255,.06)',fontSize:11.5,color:'rgba(255,255,255,.5)',fontWeight:600}}>
        <span>Status: online</span>
        <span>v 2026.05</span>
      </div>
    </div>
  );

  return (
    <div className="app" data-screen-label="Painel Admin">
      <Sidebar variant="dark" groups={groups} active={route} onSelect={setRoute} footer={Footer}/>
      <main className="main">
        <Topbar role="Administrador" userName={adminUser} breadcrumb={breadcrumbMap[route]}/>
        <div className="content" data-screen-label={`Admin / ${route}`}>
          {route === 'dashboard'  && <AdminDashboard  onNav={setRoute}/>}
          {route === 'corretores' && <AdminCorretores/>}
          {route === 'clientes'   && <AdminClientes/>}
          {route === 'propostas'  && <AdminPropostas/>}
          {route === 'operadoras' && <AdminOperadoras/>}
          {route === 'comissoes'  && <AdminComissoes/>}
          {route === 'relatorios' && <AdminRelatorios/>}
        </div>
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<AdminApp/>);
