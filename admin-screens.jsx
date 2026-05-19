/* CorClub — Telas do Painel ADMIN */

const adminStatusToneProposta = {
  'Rascunho':    'neutral',
  'Em análise':  'info',
  'Pendência':   'warn',
  'Aprovada':    'brand',
  'Implantada':  'ok',
  'Recusada':    'danger',
};
const adminTierTone = { Diamond: 'brand', Gold: 'warn', Silver: 'neutral' };

function findCorretor(id) { return CORRETORES.find(c => c.id === id); }

/* =================================================================== *
 *  DASHBOARD EXECUTIVO
 * =================================================================== */
function AdminDashboard({ onNav }) {
  const k = KPI_ADMIN;
  const propostasRecentes = PROPOSTAS.slice(0, 8);
  const topCorretores = [...CORRETORES].sort((a,b)=> b.vendas30d - a.vendas30d).slice(0, 5);

  // Distribuição por operadora (vidas na carteira)
  const mix = useMemo(() => {
    const counts = {};
    CLIENTES.forEach(c => {
      const op = PLANOS.find(p => p.id === c.plano)?.op;
      if (op) counts[op] = (counts[op] || 0) + c.vidas;
    });
    return Object.entries(counts).map(([op, v]) => ({
      op, value: v, color: OPERADORAS.find(o => o.id === op).cor, nome: OPERADORAS.find(o => o.id === op).nome,
    })).sort((a,b) => b.value - a.value);
  }, []);

  return (
    <>
      <PageHeader
        eyebrow="Visão executiva"
        title="Dashboard"
        sub="GMV, propostas, corretores e operação — Maio/2026."
        right={
          <>
            <Button variant="secondary" size="sm" icon={<Ico.calendar/>}>Últimos 30 dias</Button>
            <Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button>
            <Button variant="primary" icon={<Ico.flag/>}>Nova campanha</Button>
          </>
        }
      />

      <div className="grid-stats" style={{marginBottom:18}}>
        <StatCard
          label="GMV no mês"
          value={fmtBRL(k.gmvMes)}
          delta={`+${k.gmvDeltaPct}%`}
          deltaDir="up"
          sub="vs. abril"
          spark={<Sparkline data={SERIE_GMV} width={92} height={28}/>}
        />
        <StatCard
          label="Propostas / mês"
          value={fmtN(k.propostasMes)}
          delta={`+${k.propostasDeltaPct}%`}
          deltaDir="up"
          sub="vs. abril"
          spark={<Sparkline data={SERIE_PROP} width={92} height={28} color="var(--info)" fill="color-mix(in oklab, var(--info) 18%, transparent)"/>}
        />
        <StatCard
          label="Vidas ativas"
          value={fmtN(k.vidasAtivas)}
          delta={`+${k.vidasDeltaPct}%`}
          deltaDir="up"
          sub="na carteira"
        />
        <StatCard
          label="Corretores ativos"
          value={fmtN(k.corretoresAtivos)}
          delta={`+${k.corretoresDeltaPct}%`}
          deltaDir="up"
          sub="último trimestre"
        />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, marginBottom:16}}>
        {/* Bar chart GMV */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">GMV mensal</h3>
              <p className="card-sub">Em milhões · últimos 12 meses</p>
            </div>
            <Tabs value="gmv" onChange={()=>{}} tabs={[{value:'gmv',label:'GMV'},{value:'prop',label:'Propostas'},{value:'conv',label:'Conversão'}]}/>
          </div>
          <div className="card-pad">
            <BarChart data={SERIE_GMV} labels={SERIE_MES} height={220}/>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4, 1fr)',gap:14,marginTop:14,paddingTop:14,borderTop:'1px solid var(--line-soft)'}}>
              <MiniLabelValue k="Ticket médio" v={fmtBRL(k.ticketMedio)}/>
              <MiniLabelValue k="Conversão média" v={`${k.conversaoMedia}%`}/>
              <MiniLabelValue k="Churn" v={`${k.churn}%`} tone="danger"/>
              <MiniLabelValue k="NPS corretores" v="64" tone="ok"/>
            </div>
          </div>
        </div>

        {/* Mix operadoras */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Mix por operadora</h3>
              <p className="card-sub">Vidas ativas na carteira</p>
            </div>
            <Button variant="ghost" size="sm" iconRight={<Ico.arrowR/>} onClick={() => onNav('operadoras')}>Ver tudo</Button>
          </div>
          <div className="card-pad" style={{display:'flex', alignItems:'center', gap:18}}>
            <Donut segments={mix} size={150} thickness={18}/>
            <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:9, flex:1}}>
              {mix.slice(0,6).map(s => (
                <li key={s.op} style={{display:'flex',alignItems:'center',gap:10,fontSize:12.5}}>
                  <span style={{width:9,height:9,borderRadius:2,background:s.color}}/>
                  <span style={{flex:1,color:'var(--ink-2)',fontWeight:600}}>{s.nome}</span>
                  <span className="num" style={{color:'var(--ink)',fontWeight:700}}>{s.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        {/* Propostas recentes */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Propostas recentes</h3>
              <p className="card-sub">Fila operacional · {PROPOSTAS.filter(p=>['Em análise','Pendência'].includes(p.status)).length} em análise</p>
            </div>
            <Button variant="ghost" size="sm" iconRight={<Ico.arrowR/>} onClick={() => onNav('propostas')}>Ver fila</Button>
          </div>
          <div style={{padding:'4px 6px 12px'}}>
            <table className="table">
              <thead><tr><th>Proposta</th><th>Cliente</th><th>Corretor</th><th>Valor</th><th>Status</th></tr></thead>
              <tbody>
                {propostasRecentes.map(p => (
                  <tr key={p.id}>
                    <td className="cell-strong tech" style={{fontSize:11.5,letterSpacing:'.08em'}}>{p.id}</td>
                    <td>{p.cliente}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><Avatar name={findCorretor(p.corretor)?.nome || '—'} size="sm"/>{findCorretor(p.corretor)?.nome.split(' ')[0] || '—'}</span></td>
                    <td className="num">{fmtBRL(p.valor)}</td>
                    <td><Badge tone={adminStatusToneProposta[p.status]} dot>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top corretores */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Top corretores</h3>
              <p className="card-sub">Por vendas no mês</p>
            </div>
            <Button variant="ghost" size="sm" iconRight={<Ico.arrowR/>} onClick={() => onNav('corretores')}>Ver tudo</Button>
          </div>
          <div style={{padding:'4px 6px 14px'}}>
            <ul style={{listStyle:'none',margin:0,padding:0}}>
              {topCorretores.map((c,i) => (
                <li key={c.id} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:'1px solid var(--line-soft)'}}>
                  <span className="num" style={{width:24,fontSize:13,fontWeight:800,color:'var(--muted)'}}>#{i+1}</span>
                  <Avatar name={c.nome} size="sm"/>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink)',whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{c.nome}</div>
                    <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{c.cidade}</div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="num" style={{fontSize:13,fontWeight:800,color:'var(--ink)'}}>{fmtBRL(c.vendas30d)}</div>
                    <Badge tone={adminTierTone[c.tier]}>{c.tier}</Badge>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

function MiniLabelValue({ k, v, tone }) {
  const color = tone === 'ok' ? 'var(--ok)' : tone === 'danger' ? 'var(--danger)' : 'var(--ink)';
  return (
    <div>
      <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}>{k}</div>
      <div style={{fontSize:17,fontWeight:800,color,marginTop:4,letterSpacing:'-.02em'}}>{v}</div>
    </div>
  );
}

/* =================================================================== *
 *  CORRETORES
 * =================================================================== */
function AdminCorretores() {
  const [tier, setTier] = useState('');
  const [status, setStatus] = useState('');
  const [busca, setBusca] = useState('');
  const filtered = CORRETORES.filter(c =>
    (!tier || c.tier === tier) &&
    (!status || c.status === status) &&
    (!busca || c.nome.toLowerCase().includes(busca.toLowerCase()) || c.cidade.toLowerCase().includes(busca.toLowerCase()))
  );

  return (
    <>
      <PageHeader
        eyebrow="Gestão"
        title="Corretores parceiros"
        sub={`${CORRETORES.length} corretores na rede · ${CORRETORES.filter(c=>c.status==='Ativo').length} ativos · ${CORRETORES.filter(c=>c.tier==='Diamond').length} Diamond`}
        right={<><Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button><Button variant="primary" icon={<Ico.plus/>}>Convidar corretor</Button></>}
      />

      <div className="grid-stats" style={{marginBottom:16}}>
        <StatCard label="Total" value={CORRETORES.length} sub="rede ativa"/>
        <StatCard label="GMV agregado" value={fmtBRL(CORRETORES.reduce((s,c)=>s+c.vendas30d,0))} sub="mês corrente"/>
        <StatCard label="Conversão média" value={`${Math.round(CORRETORES.reduce((s,c)=>s+c.conversao,0)/CORRETORES.length)}%`}/>
        <StatCard label="Pendentes onboard" value={CORRETORES.filter(c=>c.status==='Pendente').length} sub="aprovação"/>
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',paddingBottom:18}}>
          <Input icon={<Ico.search width={16} height={16}/>} value={busca} onChange={setBusca} placeholder="Buscar nome ou cidade…" style={{minWidth:300}}/>
          <div style={{width:160}}>
            <Select value={tier} onChange={setTier} options={[{value:'',label:'Todos os tiers'},'Diamond','Gold','Silver']}/>
          </div>
          <div style={{width:160}}>
            <Select value={status} onChange={setStatus} options={[{value:'',label:'Todos os status'},'Ativo','Pendente','Inativo']}/>
          </div>
          <span style={{marginLeft:'auto',fontSize:12.5,color:'var(--muted)',fontWeight:600}}>{filtered.length} de {CORRETORES.length}</span>
        </div>
      </div>

      <div className="card">
        <div className="scroll-x">
          <table className="table">
            <thead><tr>
              <th>Corretor</th><th>Cidade</th><th>Tier</th><th>Clientes</th><th>Conversão</th><th>Vendas/mês</th><th>Entrou</th><th>Status</th><th style={{width:50}}></th>
            </tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.id}>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <Avatar name={c.nome} size="sm"/>
                      <div>
                        <div className="cell-strong">{c.nome}</div>
                        <div className="tech" style={{fontSize:10.5,color:'var(--muted)',marginTop:2}}>{c.id.toUpperCase()}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{color:'var(--ink-2)',fontWeight:600}}>{c.cidade}</td>
                  <td><Badge tone={adminTierTone[c.tier]} dot>{c.tier}</Badge></td>
                  <td className="num">{c.clientes}</td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:10,width:140}}>
                      <div className="progress" style={{flex:1}}><span style={{width:`${c.conversao*2}%`}}/></div>
                      <span className="num" style={{fontSize:12.5,fontWeight:700,color:'var(--ink)'}}>{c.conversao}%</span>
                    </div>
                  </td>
                  <td className="num cell-strong">{fmtBRL(c.vendas30d)}</td>
                  <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(c.entrou)}</td>
                  <td><Badge tone={c.status==='Ativo'?'ok':c.status==='Pendente'?'warn':'neutral'} dot>{c.status}</Badge></td>
                  <td><Button variant="ghost" size="sm" icon={<Ico.dots/>}/></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  PROPOSTAS (fila de aprovação)
 * =================================================================== */
function AdminPropostas() {
  const [status, setStatus] = useState('Todas');
  const filtered = status === 'Todas' ? PROPOSTAS : PROPOSTAS.filter(p => p.status === status);

  return (
    <>
      <PageHeader
        eyebrow="Operação"
        title="Fila de propostas"
        sub={`${PROPOSTAS.length} propostas no funil · ${PROPOSTAS.filter(p=>['Em análise','Pendência'].includes(p.status)).length} aguardando ação`}
        right={<><Button variant="secondary" size="sm" icon={<Ico.filter/>}>Filtros</Button><Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button></>}
      />

      <div className="grid-stats" style={{marginBottom:16}}>
        {STATUS_PROPOSTA.slice(0,4).map(s => (
          <StatCard key={s} label={s} value={PROPOSTAS.filter(p=>p.status===s).length}/>
        ))}
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{paddingBottom:16}}>
          <Tabs
            value={status}
            onChange={setStatus}
            tabs={[{value:'Todas', label:'Todas', count: PROPOSTAS.length}, ...STATUS_PROPOSTA.map(s => ({value:s, label:s, count: PROPOSTAS.filter(p=>p.status===s).length}))]}
          />
        </div>
      </div>

      <div className="card">
        <div className="scroll-x">
          <table className="table">
            <thead><tr>
              <th>Proposta</th><th>Cliente</th><th>Corretor</th><th>Operadora · Plano</th><th>Vidas</th><th>Valor</th><th>Atualizada</th><th>Status</th><th style={{width:120}}>Ações</th>
            </tr></thead>
            <tbody>
              {filtered.map(p => {
                const pl = PLANOS.find(x => x.id === p.plano);
                const op = OPERADORAS.find(x => x.id === p.op);
                const cor = findCorretor(p.corretor);
                const canApprove = ['Em análise','Pendência'].includes(p.status);
                return (
                  <tr key={p.id}>
                    <td className="cell-strong tech" style={{fontSize:11.5,letterSpacing:'.08em'}}>{p.id}</td>
                    <td className="cell-strong">{p.cliente}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><Avatar name={cor?.nome||'—'} size="sm"/>{cor?.nome.split(' ').slice(0,2).join(' ')||'—'}</span></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{width:8,height:8,borderRadius:2,background:op.cor}}/>
                        <div>
                          <div style={{fontSize:13,fontWeight:600}}>{op.nome}</div>
                          <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{pl?.nome}</div>
                        </div>
                      </div>
                    </td>
                    <td className="num">{p.vidas}</td>
                    <td className="num">{fmtBRL(p.valor)}</td>
                    <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(p.atualizada)}</td>
                    <td><Badge tone={adminStatusToneProposta[p.status]} dot>{p.status}</Badge></td>
                    <td>
                      <div style={{display:'flex',gap:6}}>
                        {canApprove ? (
                          <>
                            <Button variant="secondary" size="sm" icon={<Ico.check/>}/>
                            <Button variant="ghost" size="sm" icon={<Ico.x/>}/>
                            <Button variant="ghost" size="sm" icon={<Ico.dots/>}/>
                          </>
                        ) : (
                          <Button variant="ghost" size="sm" icon={<Ico.dots/>}/>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  CLIENTES / BENEFICIÁRIOS
 * =================================================================== */
function AdminClientes() {
  const [tipo, setTipo] = useState('');
  const [busca, setBusca] = useState('');
  const filtered = CLIENTES.filter(k =>
    (!tipo || k.tipo === tipo) &&
    (!busca || k.nome.toLowerCase().includes(busca.toLowerCase()))
  );
  const totalVidas = CLIENTES.reduce((s,k)=>s+k.vidas, 0);
  const totalMensal = CLIENTES.reduce((s,k)=>s+k.mensal, 0);

  return (
    <>
      <PageHeader
        eyebrow="Beneficiários"
        title="Base de clientes"
        sub={`${CLIENTES.length} contratos ativos · ${totalVidas} vidas · receita recorrente ${fmtBRL(totalMensal)}`}
        right={<><Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button></>}
      />

      <div className="grid-stats" style={{marginBottom:16}}>
        <StatCard label="Contratos" value={CLIENTES.filter(c=>c.status==='Ativo').length} sub="ativos"/>
        <StatCard label="Vidas" value={fmtN(totalVidas)} delta="+212" deltaDir="up"/>
        <StatCard label="Receita recorrente" value={fmtBRL(totalMensal)} delta="+5,8%" deltaDir="up"/>
        <StatCard label="Ticket médio" value={fmtBRL(Math.round(totalMensal/CLIENTES.filter(c=>c.status==='Ativo').length))}/>
      </div>

      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{paddingBottom:18,display:'flex',gap:12,alignItems:'center',flexWrap:'wrap'}}>
          <Input icon={<Ico.search width={16} height={16}/>} value={busca} onChange={setBusca} placeholder="Buscar cliente, contato, CNPJ…" style={{minWidth:320}}/>
          <div style={{width:170}}>
            <Select value={tipo} onChange={setTipo} options={[{value:'',label:'Todos os tipos'},{value:'PF',label:'Pessoa Física'},{value:'PJ',label:'Pessoa Jurídica'}]}/>
          </div>
          <span style={{marginLeft:'auto',fontSize:12.5,color:'var(--muted)',fontWeight:600}}>{filtered.length} de {CLIENTES.length}</span>
        </div>
      </div>

      <div className="card">
        <div className="scroll-x">
          <table className="table">
            <thead><tr>
              <th>Cliente</th><th>Tipo</th><th>Documento</th><th>Corretor</th><th>Operadora · Plano</th><th>Vidas</th><th>Mensal</th><th>Status</th>
            </tr></thead>
            <tbody>
              {filtered.map(k => {
                const pl = PLANOS.find(p => p.id === k.plano);
                const op = pl ? OPERADORAS.find(o => o.id === pl.op) : null;
                const cor = findCorretor(k.corretor);
                return (
                  <tr key={k.id}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <Avatar name={k.nome} size="sm"/>
                        <div>
                          <div className="cell-strong">{k.nome}</div>
                          <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{k.contato}</div>
                        </div>
                      </div>
                    </td>
                    <td><Badge tone="neutral">{k.tipo}</Badge></td>
                    <td className="tech" style={{fontSize:11.5}}>{k.doc}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:8,fontSize:13}}><Avatar name={cor?.nome||'—'} size="sm"/>{cor?.nome.split(' ').slice(0,2).join(' ')||'—'}</span></td>
                    <td>
                      {op ? (
                        <div style={{display:'flex',alignItems:'center',gap:8}}>
                          <span style={{width:8,height:8,borderRadius:2,background:op.cor}}/>
                          <div>
                            <div style={{fontSize:13,fontWeight:600}}>{op.nome}</div>
                            <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{pl.nome}</div>
                          </div>
                        </div>
                      ) : '—'}
                    </td>
                    <td className="num">{k.vidas}</td>
                    <td className="num cell-strong">{k.mensal ? fmtBRL(k.mensal) : '—'}</td>
                    <td><Badge tone={k.status==='Ativo'?'ok':k.status==='Renovação'?'warn':k.status==='Pendente'?'info':k.status==='Cancelado'?'danger':'neutral'} dot>{k.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  OPERADORAS & PLANOS
 * =================================================================== */
function AdminOperadoras() {
  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Operadoras e planos"
        sub={`${OPERADORAS.length} operadoras parceiras · ${PLANOS.length} planos cadastrados`}
        right={<><Button variant="secondary" size="sm" icon={<Ico.upload/>}>Importar tabela</Button><Button variant="primary" icon={<Ico.plus/>}>Novo plano</Button></>}
      />

      <div className="grid-3" style={{marginBottom:18}}>
        {OPERADORAS.map(o => {
          const planos = PLANOS.filter(p => p.op === o.id);
          const vidas = CLIENTES.filter(c => PLANOS.find(p=>p.id===c.plano)?.op === o.id).reduce((s,c)=>s+c.vidas,0);
          return (
            <div key={o.id} className="card">
              <div style={{padding:'18px 20px',display:'flex',alignItems:'center',gap:12,borderBottom:'1px solid var(--line-soft)'}}>
                <span style={{width:44,height:44,borderRadius:10,background:o.cor,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',flex:'0 0 auto'}}>
                  <Ico.shield width={22} height={22}/>
                </span>
                <div style={{flex:1,minWidth:0}}>
                  <div style={{fontSize:14.5,fontWeight:800,color:'var(--ink)',letterSpacing:'-.01em'}}>{o.nome}</div>
                  <div style={{fontSize:12.5,color:'var(--ink-3)',fontWeight:600,marginTop:2}}>{o.segmento}</div>
                </div>
                <Badge tone="ok" dot>Parceira</Badge>
              </div>
              <div className="card-pad" style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
                <MiniLabelValue k="Planos" v={planos.length}/>
                <MiniLabelValue k="Vidas" v={fmtN(vidas)}/>
                <MiniLabelValue k="Comissão méd." v={planos.length ? `${(planos.reduce((s,p)=>s+p.comissao,0)/planos.length).toFixed(1)}%` : '—'}/>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3 className="card-title">Todos os planos</h3>
            <p className="card-sub">{PLANOS.length} planos cadastrados em {OPERADORAS.length} operadoras</p>
          </div>
        </div>
        <div className="scroll-x">
          <table className="table">
            <thead><tr><th>Plano</th><th>Operadora</th><th>Tipo</th><th>Abrangência</th><th>Acomodação</th><th>Público</th><th>Comissão</th><th>A partir de</th></tr></thead>
            <tbody>
              {PLANOS.map(p => {
                const op = OPERADORAS.find(o => o.id === p.op);
                return (
                  <tr key={p.id}>
                    <td className="cell-strong">{p.nome}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><span style={{width:8,height:8,borderRadius:2,background:op.cor}}/>{op.nome}</span></td>
                    <td><Badge tone={p.tipo==='Saúde'?'info':'brand'}>{p.tipo}</Badge></td>
                    <td>{p.abrang}</td>
                    <td>{p.acomod}</td>
                    <td style={{color:'var(--ink-2)',fontWeight:600}}>{p.publico}</td>
                    <td className="num cell-strong">{p.comissao}%</td>
                    <td className="num cell-strong">{fmtBRL(p.precoBase)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  COMISSÕES / REPASSES (admin)
 * =================================================================== */
function AdminComissoes() {
  const totalPagar = COMISSOES.filter(c=>c.status==='Programado').reduce((s,c)=>s+c.valor,0);
  const pago = COMISSOES.filter(c=>c.status==='Pago').reduce((s,c)=>s+c.valor,0);
  const validacao = COMISSOES.filter(c=>c.status==='Em validação').reduce((s,c)=>s+c.valor,0);

  return (
    <>
      <PageHeader
        eyebrow="Financeiro"
        title="Comissões e repasses"
        sub="Gestão de pagamentos aos corretores parceiros."
        right={<><Button variant="secondary" size="sm" icon={<Ico.calendar/>}>Maio/26</Button><Button variant="primary" icon={<Ico.cash/>}>Processar lote</Button></>}
      />

      <div className="grid-stats" style={{marginBottom:16}}>
        <StatCard label="A pagar (D+7)" value={fmtBRL(totalPagar)} sub={`${COMISSOES.filter(c=>c.status==='Programado').length} lançamentos`}/>
        <StatCard label="Pago no mês" value={fmtBRL(pago)} delta="+22,1%" deltaDir="up"/>
        <StatCard label="Em validação" value={fmtBRL(validacao)} sub="aguardando confirmação operadora"/>
        <StatCard label="Comissão média" value="4,6%" delta="+0,3pp" deltaDir="up"/>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3 className="card-title">Lançamentos</h3>
            <p className="card-sub">{COMISSOES.length} comissões nos últimos 30 dias</p>
          </div>
          <div style={{display:'flex',gap:10}}>
            <Button variant="secondary" size="sm" icon={<Ico.filter/>}>Filtros</Button>
            <Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button>
          </div>
        </div>
        <div className="scroll-x">
          <table className="table">
            <thead><tr><th>Lançamento</th><th>Corretor</th><th>Proposta · Cliente</th><th>Parcela</th><th>Pagamento</th><th>Valor</th><th>Status</th><th style={{width:50}}></th></tr></thead>
            <tbody>
              {COMISSOES.map(c => {
                const prop = PROPOSTAS.find(p=>p.id===c.propostaId);
                const cor = prop ? findCorretor(prop.corretor) : null;
                return (
                  <tr key={c.id}>
                    <td className="cell-strong tech" style={{fontSize:11.5,letterSpacing:'.08em'}}>{c.id}</td>
                    <td><span style={{display:'inline-flex',alignItems:'center',gap:8}}><Avatar name={cor?.nome||'—'} size="sm"/>{cor?.nome.split(' ').slice(0,2).join(' ')||'—'}</span></td>
                    <td><div className="cell-strong">{c.cliente}</div><div className="tech" style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{c.propostaId}</div></td>
                    <td><Badge tone="neutral">{c.parcela}</Badge></td>
                    <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(c.pagaEm)}</td>
                    <td className="num cell-strong">{fmtBRL2(c.valor)}</td>
                    <td><Badge tone={c.status==='Pago'?'ok':c.status==='Programado'?'info':'warn'} dot>{c.status}</Badge></td>
                    <td><Button variant="ghost" size="sm" icon={<Ico.dots/>}/></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  RELATÓRIOS
 * =================================================================== */
function AdminRelatorios() {
  const [chart, setChart] = useState('gmv');
  const data = chart === 'gmv' ? SERIE_GMV : chart === 'prop' ? SERIE_PROP : SERIE_CONV;
  const color = chart === 'gmv' ? 'var(--brand)' : chart === 'prop' ? 'var(--info)' : 'var(--ok)';

  return (
    <>
      <PageHeader
        eyebrow="Analytics"
        title="Relatórios"
        sub="Acompanhe a saúde do negócio e exporte para sua reunião de board."
        right={<><Button variant="secondary" size="sm" icon={<Ico.calendar/>}>12 meses</Button><Button variant="primary" icon={<Ico.download/>}>Exportar PDF</Button></>}
      />

      <div className="card" style={{marginBottom:16}}>
        <div className="card-head">
          <div>
            <h3 className="card-title">Crescimento</h3>
            <p className="card-sub">Maio/2025 → Maio/2026</p>
          </div>
          <Tabs value={chart} onChange={setChart} tabs={[
            {value:'gmv',  label:'GMV (R$ M)'},
            {value:'prop', label:'Propostas'},
            {value:'conv', label:'Conversão (%)'},
          ]}/>
        </div>
        <div className="card-pad">
          <BarChart data={data} labels={SERIE_MES} height={260} color={color}/>
        </div>
      </div>

      <div className="grid-2" style={{marginBottom:16}}>
        <div className="card">
          <div className="card-head"><div><h3 className="card-title">Top 5 estados em GMV</h3><p className="card-sub">Mês corrente</p></div></div>
          <div style={{padding:'4px 6px 14px'}}>
            <ul style={{listStyle:'none',margin:0,padding:0}}>
              {[
                {uf:'São Paulo', gmv:1820400, pct:42},
                {uf:'Minas Gerais', gmv:892100, pct:21},
                {uf:'Rio de Janeiro', gmv:642600, pct:15},
                {uf:'Paraná', gmv:412300, pct:10},
                {uf:'Bahia', gmv:281800, pct:7},
              ].map((r,i)=>(
                <li key={r.uf} style={{display:'flex',alignItems:'center',gap:12,padding:'12px 18px',borderBottom:'1px solid var(--line-soft)'}}>
                  <span className="num" style={{width:24,fontSize:13,fontWeight:800,color:'var(--muted)'}}>#{i+1}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5,fontWeight:700,color:'var(--ink)'}}>{r.uf}</div>
                    <div className="progress" style={{marginTop:6}}><span style={{width:`${r.pct*2.3}%`}}/></div>
                  </div>
                  <div style={{textAlign:'right'}}>
                    <div className="num" style={{fontSize:13,fontWeight:800,color:'var(--ink)'}}>{fmtBRL(r.gmv)}</div>
                    <div style={{fontSize:11,color:'var(--muted)',fontWeight:600,marginTop:2}}>{r.pct}%</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><div><h3 className="card-title">Funil de propostas</h3><p className="card-sub">Conversão de ponta a ponta</p></div></div>
          <div className="card-pad">
            {[
              {l:'Cotações criadas', v:412, pct:100, c:'var(--brand)'},
              {l:'Enviadas à operadora', v:312, pct:76, c:'var(--info)'},
              {l:'Aprovadas', v:198, pct:48, c:'var(--ok)'},
              {l:'Implantadas', v:174, pct:42, c:'var(--ok)'},
            ].map(f => (
              <div key={f.l} style={{marginBottom:14}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:6,fontSize:13,color:'var(--ink-2)',fontWeight:600}}>
                  <span>{f.l}</span>
                  <span><span className="num" style={{color:'var(--ink)',fontWeight:800}}>{f.v}</span> <span style={{color:'var(--muted)',marginLeft:4}}>· {f.pct}%</span></span>
                </div>
                <div style={{height:10, borderRadius:6, background:'var(--bg-2)', overflow:'hidden'}}>
                  <span style={{display:'block', height:'100%', width:`${f.pct}%`, background:f.c, borderRadius:6}}/>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-head"><div><h3 className="card-title">Saúde da operação</h3><p className="card-sub">Indicadores chave</p></div></div>
        <div className="card-pad" style={{display:'grid',gridTemplateColumns:'repeat(5, 1fr)',gap:24}}>
          <MiniLabelValue k="NPS corretor" v="64" tone="ok"/>
          <MiniLabelValue k="Tempo médio análise" v="2,3d"/>
          <MiniLabelValue k="SLA cumprido" v="92%" tone="ok"/>
          <MiniLabelValue k="Churn anualizado" v="1,8%" tone="ok"/>
          <MiniLabelValue k="Cancelamentos mês" v="14" tone="danger"/>
        </div>
      </div>
    </>
  );
}

Object.assign(window, {
  AdminDashboard, AdminCorretores, AdminPropostas, AdminClientes, AdminOperadoras, AdminComissoes, AdminRelatorios,
});
