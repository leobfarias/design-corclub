/* CorClub — Telas do Painel do Corretor */

const CORRETOR_LOGADO = 'c01'; // Renata Souza
function getCorretor() { return CORRETORES.find(c => c.id === CORRETOR_LOGADO); }
function getOp(id) { return OPERADORAS.find(o => o.id === id); }
function getPlano(id) { return PLANOS.find(p => p.id === id); }

const statusToneProposta = {
  'Rascunho':    'neutral',
  'Em análise':  'info',
  'Pendência':   'warn',
  'Aprovada':    'brand',
  'Implantada':  'ok',
  'Recusada':    'danger',
};
const statusToneCliente = {
  'Ativo':       'ok',
  'Renovação':   'warn',
  'Pendente':    'info',
  'Cancelado':   'danger',
  'Inativo':     'neutral',
};
const statusToneComissao = {
  'Pago':           'ok',
  'Programado':     'info',
  'Em validação':   'warn',
  'Atrasado':       'danger',
};
const tierTone = { Diamond: 'brand', Gold: 'warn', Silver: 'neutral' };

/* =================================================================== *
 *  DASHBOARD
 * =================================================================== */
function ScreenDashboard({ onNav }) {
  const corretor = getCorretor();
  const meta = 200000;
  const realizado = corretor.vendas30d;
  const pct = Math.round((realizado / meta) * 100);

  const minhasPropostas = PROPOSTAS.filter(p => p.corretor === CORRETOR_LOGADO);
  const emAndamento = minhasPropostas.filter(p => ['Em análise','Pendência','Rascunho','Aprovada'].includes(p.status));
  const implantadas = minhasPropostas.filter(p => p.status === 'Implantada');
  const meusClientes = CLIENTES.filter(k => k.corretor === CORRETOR_LOGADO && k.status !== 'Cancelado');

  return (
    <>
      <PageHeader
        eyebrow="Painel do corretor"
        title={`Olá, ${corretor.nome.split(' ')[0]} 👋`}
        sub="Aqui está um resumo da sua carteira, propostas em andamento e comissões."
        right={
          <>
            <Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar mês</Button>
            <Button variant="primary" icon={<Ico.plus/>} onClick={() => onNav('nova-proposta')}>Nova proposta</Button>
          </>
        }
      />

      {/* KPIs */}
      <div className="grid-stats" style={{marginBottom:18}}>
        <StatCard
          label="Vendas no mês"
          value={fmtBRL(corretor.vendas30d)}
          delta="+18,4%"
          deltaDir="up"
          sub="vs. mês anterior"
          spark={<Sparkline data={VENDAS_30D_CORRETOR} width={88} height={28}/>}
        />
        <StatCard
          label="Propostas ativas"
          value={emAndamento.length}
          delta={`${minhasPropostas.length} total`}
          deltaDir="up"
          sub="no mês"
        />
        <StatCard
          label="Vidas na carteira"
          value={meusClientes.reduce((s,k)=>s+k.vidas,0)}
          delta="+12"
          deltaDir="up"
          sub="vs. mês anterior"
        />
        <StatCard
          label="Conversão"
          value={`${corretor.conversao}%`}
          delta="+2,1pp"
          deltaDir="up"
          sub="média trimestre"
        />
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16, marginBottom:16}}>
        {/* Meta mensal */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Meta mensal</h3>
              <p className="card-sub">Maio · {fmtBRL(realizado)} de {fmtBRL(meta)}</p>
            </div>
            <Badge tone="brand" dot>{pct}% atingida</Badge>
          </div>
          <div className="card-pad">
            <div className="progress" style={{marginBottom:14}}>
              <span style={{width: `${Math.min(pct,100)}%`}}/>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14}}>
              <MiniStat label="Faltam" value={fmtBRL(Math.max(meta - realizado, 0))} tone="brand"/>
              <MiniStat label="Dias restantes" value="13" tone="neutral"/>
              <MiniStat label="Tier atual" value={corretor.tier} tone="warn"/>
            </div>
            <div className="divider"/>
            <div style={{display:'flex',alignItems:'flex-start',gap:12,padding:'10px 12px',background:'var(--brand-soft-2)',borderRadius:10}}>
              <span style={{color:'var(--brand)'}}><Ico.spark width={18} height={18}/></span>
              <div>
                <div style={{fontSize:13.5, fontWeight:700, color:'var(--ink)'}}>Aceleração de 0,5pp na sua comissão</div>
                <div style={{fontSize:12.5, color:'var(--ink-3)', marginTop:2}}>Bata 100% da meta até 31/05 e mantenha o tier Diamond por mais 3 meses.</div>
              </div>
            </div>
          </div>
        </div>

        {/* Mix por operadora */}
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Mix por operadora</h3>
              <p className="card-sub">Distribuição da carteira ativa</p>
            </div>
          </div>
          <div className="card-pad" style={{display:'flex', alignItems:'center', gap:18}}>
            {(() => {
              const counts = {};
              meusClientes.forEach(k => { const op = getPlano(k.plano)?.op; if (op) counts[op] = (counts[op]||0) + k.vidas });
              const seg = Object.entries(counts).map(([op, v]) => ({ value:v, color: getOp(op).cor, op }));
              return (
                <>
                  <Donut segments={seg} size={140} thickness={16}/>
                  <ul style={{listStyle:'none', padding:0, margin:0, display:'flex', flexDirection:'column', gap:8, flex:1}}>
                    {seg.sort((a,b)=>b.value-a.value).slice(0,5).map(s => (
                      <li key={s.op} style={{display:'flex',alignItems:'center',gap:10,fontSize:13}}>
                        <span style={{width:9,height:9,borderRadius:2,background:s.color}}/>
                        <span style={{flex:1,color:'var(--ink-2)',fontWeight:600}}>{getOp(s.op).nome}</span>
                        <span className="num" style={{color:'var(--ink)'}}>{s.value}</span>
                      </li>
                    ))}
                  </ul>
                </>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Propostas em andamento + Notificações */}
      <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:16}}>
        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Propostas em andamento</h3>
              <p className="card-sub">{emAndamento.length} ativas · atualizado agora</p>
            </div>
            <Button variant="ghost" size="sm" iconRight={<Ico.arrowR/>} onClick={() => onNav('propostas')}>Ver todas</Button>
          </div>
          <div style={{padding:'4px 6px 12px'}}>
            <table className="table">
              <thead><tr>
                <th>Proposta</th><th>Cliente</th><th>Operadora</th><th>Vidas</th><th>Valor/mês</th><th>Status</th>
              </tr></thead>
              <tbody>
                {emAndamento.slice(0,7).map(p => (
                  <tr key={p.id}>
                    <td className="cell-strong tech" style={{fontSize:11.5, letterSpacing:'.08em'}}>{p.id}</td>
                    <td>{p.cliente}</td>
                    <td>
                      <span style={{display:'inline-flex',alignItems:'center',gap:8}}>
                        <span style={{width:8,height:8,borderRadius:2,background:getOp(p.op).cor}}/>
                        {getOp(p.op).nome}
                      </span>
                    </td>
                    <td className="num">{p.vidas}</td>
                    <td className="num">{fmtBRL(p.valor)}</td>
                    <td><Badge tone={statusToneProposta[p.status]} dot>{p.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <div>
              <h3 className="card-title">Avisos</h3>
              <p className="card-sub">Últimas 24h</p>
            </div>
            <Button variant="ghost" size="sm">Marcar lidas</Button>
          </div>
          <div style={{padding:'6px 4px 12px'}}>
            <ul style={{listStyle:'none', padding:0, margin:0}}>
              {NOTIFICACOES.map(n => (
                <li key={n.id} style={{display:'flex',gap:12,padding:'12px 18px',borderBottom:'1px solid var(--line-soft)'}}>
                  <span style={{
                    width:32,height:32,borderRadius:8,flex:'0 0 auto',
                    background:n.tipo==='comissao'?'var(--ok-soft)':n.tipo==='proposta'?'var(--brand-soft)':n.tipo==='pendencia'?'var(--warn-soft)':'var(--info-soft)',
                    color:n.tipo==='comissao'?'var(--ok)':n.tipo==='proposta'?'var(--brand)':n.tipo==='pendencia'?'var(--warn)':'var(--info)',
                    display:'flex',alignItems:'center',justifyContent:'center',
                  }}>{n.tipo==='comissao'?<Ico.cash/>:n.tipo==='proposta'?<Ico.doc/>:n.tipo==='pendencia'?<Ico.shield/>:<Ico.spark/>}</span>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:13.5, color:'var(--ink)', fontWeight:500, lineHeight:1.4}}>{n.texto}</div>
                    <div style={{fontSize:11.5, color:'var(--muted)', marginTop:3, fontWeight:600}}>há {n.tempo}</div>
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

function MiniStat({ label, value, tone = 'neutral' }) {
  return (
    <div>
      <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,letterSpacing:'.04em',textTransform:'uppercase'}}>{label}</div>
      <div style={{fontSize:18,fontWeight:800,color:'var(--ink)',marginTop:4,letterSpacing:'-.02em'}}>{value}</div>
    </div>
  );
}

/* =================================================================== *
 *  CARTEIRA DE CLIENTES
 * =================================================================== */
function ScreenCarteira({ onNav }) {
  const [tab, setTab] = useState('todos');
  const [tipo, setTipo] = useState('');
  const [busca, setBusca] = useState('');

  const meusClientes = CLIENTES.filter(k => k.corretor === CORRETOR_LOGADO);
  const filtered = useMemo(() => meusClientes.filter(k => {
    if (tab !== 'todos' && k.status.toLowerCase() !== tab) return false;
    if (tipo && k.tipo !== tipo) return false;
    if (busca && !k.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  }), [tab, tipo, busca, meusClientes]);

  const counts = {
    todos: meusClientes.length,
    ativo: meusClientes.filter(k => k.status === 'Ativo').length,
    renovação: meusClientes.filter(k => k.status === 'Renovação').length,
    pendente: meusClientes.filter(k => k.status === 'Pendente').length,
    cancelado: meusClientes.filter(k => k.status === 'Cancelado').length,
  };

  const totalMensal = filtered.reduce((s,k)=> s + k.mensal, 0);
  const totalVidas = filtered.reduce((s,k)=> s + k.vidas, 0);

  return (
    <>
      <PageHeader
        eyebrow="Minha carteira"
        title="Clientes ativos"
        sub={`${meusClientes.length} clientes na sua carteira · ${meusClientes.reduce((s,k)=>s+k.vidas,0)} vidas`}
        right={
          <>
            <Button variant="secondary" size="sm" icon={<Ico.upload/>}>Importar planilha</Button>
            <Button variant="primary" icon={<Ico.plus/>} onClick={() => onNav('nova-proposta')}>Novo cliente</Button>
          </>
        }
      />

      {/* Filtros + KPIs inline */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{paddingBottom:14, display:'flex', alignItems:'center', gap:14, flexWrap:'wrap'}}>
          <Tabs
            tabs={[
              {value:'todos',     label:'Todos',     count: counts.todos},
              {value:'ativo',     label:'Ativos',    count: counts.ativo},
              {value:'renovação', label:'Renovação', count: counts.renovação},
              {value:'pendente',  label:'Pendentes', count: counts.pendente},
              {value:'cancelado', label:'Cancelados',count: counts.cancelado},
            ]}
            value={tab}
            onChange={setTab}
          />
          <div style={{marginLeft:'auto', display:'flex', gap:10, alignItems:'center'}}>
            <Input icon={<Ico.search width={16} height={16}/>} value={busca} onChange={setBusca} placeholder="Buscar cliente…" style={{minWidth:280}}/>
            <div style={{width:170}}>
              <Select value={tipo} onChange={setTipo} placeholder="Tipo (PF/PJ)" options={[{value:'',label:'Todos'}, {value:'PF',label:'Pessoa Física'},{value:'PJ',label:'Pessoa Jurídica'}]}/>
            </div>
          </div>
        </div>
        <div style={{padding:'0 22px 14px',display:'flex',gap:18,color:'var(--muted)',fontSize:12.5,fontWeight:600}}>
          <span>Mostrando <strong style={{color:'var(--ink)'}}>{filtered.length}</strong> de {meusClientes.length}</span>
          <span>·</span>
          <span><strong style={{color:'var(--ink)'}}>{totalVidas}</strong> vidas</span>
          <span>·</span>
          <span>Receita mensal: <strong style={{color:'var(--ink)'}}>{fmtBRL(totalMensal)}</strong></span>
        </div>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="scroll-x">
          <table className="table">
            <thead><tr>
              <th>Cliente</th>
              <th>Tipo</th>
              <th>Operadora · Plano</th>
              <th>Vidas</th>
              <th>Mensalidade</th>
              <th>Início</th>
              <th>Status</th>
              <th style={{width:50}}></th>
            </tr></thead>
            <tbody>
              {filtered.map(k => {
                const pl = getPlano(k.plano);
                return (
                  <tr key={k.id}>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:10}}>
                        <Avatar name={k.nome} size="sm"/>
                        <div>
                          <div className="cell-strong">{k.nome}</div>
                          <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{k.contato} · {k.doc}</div>
                        </div>
                      </div>
                    </td>
                    <td><Badge tone="neutral">{k.tipo}</Badge></td>
                    <td>
                      <div style={{display:'flex',alignItems:'center',gap:8}}>
                        <span style={{width:8,height:8,borderRadius:2,background:pl?getOp(pl.op).cor:'#ccc'}}/>
                        <div>
                          <div style={{fontSize:13,fontWeight:600,color:'var(--ink)'}}>{pl ? getOp(pl.op).nome : '—'}</div>
                          <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{pl ? pl.nome : ''}</div>
                        </div>
                      </div>
                    </td>
                    <td className="num">{k.vidas}</td>
                    <td className="num">{k.mensal ? fmtBRL(k.mensal) : '—'}</td>
                    <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(k.inicio)}</td>
                    <td><Badge tone={statusToneCliente[k.status]} dot>{k.status}</Badge></td>
                    <td><Button variant="ghost" size="sm" icon={<Ico.dots/>}/></td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="8"><div className="empty"><Ico.users width={36} height={36}/><h4>Nenhum cliente nesse filtro</h4><p>Ajuste os filtros para ver mais resultados.</p></div></td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* =================================================================== *
 *  NOVA PROPOSTA (form em 4 etapas)
 * =================================================================== */
function ScreenNovaProposta({ onNav }) {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    tipo:'PJ', cnpj:'', razao:'', contato:'', email:'', telefone:'',
    vidas:5, faixa:'30-45', cidade:'Belo Horizonte/MG',
    operadora:'hap', plano:'p1', acomodacao:'Enfermaria',
    coparti:false, observ:'',
  });

  const steps = ['Cliente', 'Cotação', 'Plano selecionado', 'Revisão'];
  function up(k, v) { setForm({...form, [k]: v}); }

  const planosFiltrados = PLANOS.filter(p => p.op === form.operadora);
  const planoSel = getPlano(form.plano);
  const opSel = getOp(form.operadora);
  const valorEstim = planoSel ? planoSel.precoBase * form.vidas : 0;
  const comissaoEstim = planoSel ? (valorEstim * planoSel.comissao / 100) * 12 * 0.6 : 0;

  return (
    <>
      <PageHeader
        eyebrow="Nova proposta"
        title="Cotação rápida"
        sub="Em 3 cliques: preencha o cliente, escolha o plano e envie. Análise da operadora em até 48h."
        right={<Button variant="ghost" onClick={() => onNav('propostas')}>Cancelar</Button>}
      />

      {/* Stepper */}
      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{display:'flex', gap:8, alignItems:'center'}}>
          {steps.map((s, i) => (
            <div key={s} style={{display:'flex',alignItems:'center',gap:8,flex: i < steps.length - 1 ? 1 : '0 0 auto'}}>
              <div style={{display:'flex',alignItems:'center',gap:10,opacity: i <= step ? 1 : .45}}>
                <span style={{
                  width:28,height:28,borderRadius:'50%',
                  background: i < step ? 'var(--ok)' : i === step ? 'var(--brand)' : 'var(--bg-2)',
                  color: i <= step ? '#fff' : 'var(--muted)',
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontSize:13,fontWeight:800,
                }}>{i < step ? <Ico.check/> : i+1}</span>
                <span style={{fontSize:13.5, fontWeight:700, color: i === step ? 'var(--ink)' : 'var(--ink-2)'}}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{flex:1, height:2, background: i < step ? 'var(--ok)' : 'var(--line)', borderRadius:2, margin:'0 4px'}}/>}
            </div>
          ))}
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1.5fr 1fr', gap:16, alignItems:'flex-start'}}>
        <div className="card">
          <div className="card-head"><h3 className="card-title">{steps[step]}</h3></div>
          <div className="card-pad">
            {step === 0 && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                <Field label="Tipo">
                  <Select value={form.tipo} onChange={v=>up('tipo',v)} options={[{value:'PJ',label:'Pessoa Jurídica (PME)'},{value:'PF',label:'Pessoa Física'}]}/>
                </Field>
                <Field label={form.tipo === 'PJ' ? 'CNPJ' : 'CPF'}>
                  <Input value={form.cnpj} onChange={v=>up('cnpj',v)} placeholder={form.tipo === 'PJ' ? '00.000.000/0000-00' : '000.000.000-00'}/>
                </Field>
                <div style={{gridColumn:'1 / -1'}}>
                  <Field label={form.tipo === 'PJ' ? 'Razão social' : 'Nome completo'}>
                    <Input value={form.razao} onChange={v=>up('razao',v)} placeholder="Atacadão Ferreira Ltda"/>
                  </Field>
                </div>
                <Field label="Contato responsável"><Input value={form.contato} onChange={v=>up('contato',v)} placeholder="Roberto Ferreira"/></Field>
                <Field label="Cidade · UF"><Input value={form.cidade} onChange={v=>up('cidade',v)}/></Field>
                <Field label="E-mail" hint="profissional"><Input value={form.email} onChange={v=>up('email',v)} placeholder="contato@empresa.com.br" icon={<Ico.mail/>}/></Field>
                <Field label="Telefone"><Input value={form.telefone} onChange={v=>up('telefone',v)} placeholder="(31) 99999-9999" icon={<Ico.phone/>}/></Field>
              </div>
            )}
            {step === 1 && (
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:14}}>
                <Field label="Quantidade de vidas">
                  <Input type="number" value={form.vidas} onChange={v=>up('vidas',+v||1)}/>
                </Field>
                <Field label="Faixa etária predominante">
                  <Select value={form.faixa} onChange={v=>up('faixa',v)} options={['18-29','30-45','46-59','60+']}/>
                </Field>
                <Field label="Operadora preferida">
                  <Select value={form.operadora} onChange={v=>up('operadora',v)} options={OPERADORAS.map(o=>({value:o.id,label:o.nome}))}/>
                </Field>
                <Field label="Acomodação">
                  <Select value={form.acomodacao} onChange={v=>up('acomodacao',v)} options={['Enfermaria','Apartamento']}/>
                </Field>
                <div style={{gridColumn:'1 / -1'}}>
                  <Field label="Observações"><Textarea value={form.observ} onChange={v=>up('observ',v)} placeholder="Necessidades específicas, prazos, dúvidas..."/></Field>
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <div style={{marginBottom:14,fontSize:13.5,color:'var(--ink-2)',fontWeight:500}}>Planos disponíveis da <strong style={{color:'var(--ink)'}}>{opSel?.nome}</strong> para {form.vidas} vidas:</div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  {planosFiltrados.map(p => {
                    const sel = form.plano === p.id;
                    return (
                      <label key={p.id} style={{
                        display:'grid', gridTemplateColumns:'auto 1fr auto', gap:14, alignItems:'center',
                        padding:'14px 16px', borderRadius:12, cursor:'pointer',
                        background: sel ? 'var(--brand-soft-2)' : '#fff',
                        border:'1.5px solid ' + (sel ? 'var(--brand)' : 'var(--line)'),
                      }}>
                        <input type="radio" name="plano" checked={sel} onChange={()=>up('plano',p.id)} style={{accentColor:'var(--brand)'}}/>
                        <div>
                          <div style={{fontSize:14,fontWeight:700,color:'var(--ink)'}}>{p.nome}</div>
                          <div style={{fontSize:12.5,color:'var(--ink-3)',marginTop:3,display:'flex',gap:10,flexWrap:'wrap'}}>
                            <span>{p.abrang}</span><span>·</span>
                            <span>{p.acomod}</span><span>·</span>
                            <span>{p.coparti ? 'Coparticipação' : 'Sem coparticipação'}</span><span>·</span>
                            <span style={{color:'var(--brand)',fontWeight:700}}>Comissão {p.comissao}%</span>
                          </div>
                        </div>
                        <div style={{textAlign:'right'}}>
                          <div style={{fontSize:18,fontWeight:800,color:'var(--ink)',letterSpacing:'-.02em'}}>{fmtBRL(p.precoBase)}</div>
                          <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600}}>por vida / mês</div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>
            )}
            {step === 3 && (
              <div style={{display:'flex',flexDirection:'column',gap:14}}>
                <RowRevisao label="Cliente" value={`${form.razao || '—'} · ${form.tipo}`}/>
                <RowRevisao label="Contato" value={`${form.contato || '—'} · ${form.email || '—'} · ${form.telefone || '—'}`}/>
                <RowRevisao label="Cobertura" value={`${form.vidas} vidas · ${form.faixa} · ${form.cidade}`}/>
                <RowRevisao label="Plano" value={`${opSel?.nome} · ${planoSel?.nome} · ${form.acomodacao}`}/>
                {form.observ && <RowRevisao label="Observações" value={form.observ}/>}
              </div>
            )}
          </div>

          <div style={{padding:'14px 22px', borderTop:'1px solid var(--line-soft)', display:'flex', justifyContent:'space-between'}}>
            <Button variant="ghost" disabled={step===0} onClick={()=>setStep(step-1)} icon={<Ico.chevL/>}>Voltar</Button>
            {step < steps.length - 1
              ? <Button variant="primary" iconRight={<Ico.arrowR/>} onClick={()=>setStep(step+1)}>Continuar</Button>
              : <Button variant="primary" iconRight={<Ico.check/>} onClick={()=>onNav('propostas')}>Enviar proposta</Button>
            }
          </div>
        </div>

        {/* Resumo lateral (sticky-ish) */}
        <div className="card" style={{position:'sticky', top: 'calc(var(--topbar-h) + 16px)'}}>
          <div className="card-head"><h3 className="card-title">Resumo da cotação</h3></div>
          <div className="card-pad" style={{display:'flex',flexDirection:'column',gap:14}}>
            <div style={{display:'flex',alignItems:'center',gap:10,padding:'10px 12px',borderRadius:10,background:'var(--bg-2)'}}>
              <span style={{width:36,height:36,borderRadius:8,background:opSel?.cor,opacity:.9,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
                <Ico.shield width={18} height={18}/>
              </span>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:'var(--ink)'}}>{opSel?.nome}</div>
                <div style={{fontSize:12,color:'var(--muted)',fontWeight:600,marginTop:2}}>{planoSel?.nome}</div>
              </div>
            </div>

            <div style={{display:'flex',flexDirection:'column',gap:10}}>
              <ResumoRow k="Vidas" v={form.vidas}/>
              <ResumoRow k="Acomodação" v={form.acomodacao}/>
              <ResumoRow k="Coparticipação" v={planoSel?.coparti ? 'Sim' : 'Não'}/>
              <ResumoRow k="Faixa etária" v={form.faixa}/>
            </div>

            <div className="divider"/>

            <div>
              <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase'}}>Mensalidade estimada</div>
              <div style={{fontSize:30,fontWeight:800,color:'var(--ink)',letterSpacing:'-.02em',marginTop:6}}>{fmtBRL(valorEstim)}</div>
              <div style={{fontSize:12,color:'var(--ink-3)',marginTop:4}}>≈ {fmtBRL(planoSel?.precoBase||0)}/vida</div>
            </div>

            <div style={{padding:'12px 14px',background:'var(--ok-soft)',borderRadius:10}}>
              <div style={{fontSize:11.5,color:'var(--ok)',fontWeight:700,letterSpacing:'.08em',textTransform:'uppercase'}}>Sua comissão estimada (12 meses)</div>
              <div style={{fontSize:22,fontWeight:800,color:'var(--ink)',marginTop:4,letterSpacing:'-.02em'}}>{fmtBRL(comissaoEstim)}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function RowRevisao({ label, value }) {
  return (
    <div style={{display:'grid',gridTemplateColumns:'180px 1fr',gap:14,padding:'12px 0',borderBottom:'1px solid var(--line-soft)'}}>
      <div style={{fontSize:12.5,color:'var(--muted)',fontWeight:700,letterSpacing:'.04em',textTransform:'uppercase'}}>{label}</div>
      <div style={{fontSize:14,color:'var(--ink)',fontWeight:600}}>{value}</div>
    </div>
  );
}
function ResumoRow({ k, v }) {
  return (
    <div style={{display:'flex',justifyContent:'space-between',fontSize:13}}>
      <span style={{color:'var(--ink-3)',fontWeight:600}}>{k}</span>
      <span style={{color:'var(--ink)',fontWeight:700}}>{v}</span>
    </div>
  );
}

/* =================================================================== *
 *  PROPOSTAS (kanban / tabela)
 * =================================================================== */
function ScreenPropostas({ onNav }) {
  const [view, setView] = useState('tabela');
  const [status, setStatus] = useState('Todas');
  const minhas = PROPOSTAS.filter(p => p.corretor === CORRETOR_LOGADO);
  const filtered = status === 'Todas' ? minhas : minhas.filter(p => p.status === status);

  return (
    <>
      <PageHeader
        eyebrow="Propostas"
        title="Pipeline de propostas"
        sub={`${minhas.length} propostas no funil · ${minhas.filter(p=>p.status==='Implantada').length} implantadas no mês`}
        right={
          <>
            <Tabs value={view} onChange={setView} tabs={[{value:'tabela',label:'Tabela'},{value:'kanban',label:'Kanban'}]}/>
            <Button variant="primary" icon={<Ico.plus/>} onClick={() => onNav('nova-proposta')}>Nova proposta</Button>
          </>
        }
      />

      {view === 'tabela' && (
        <>
          <div className="card" style={{marginBottom:16}}>
            <div className="card-pad" style={{paddingBottom:14, display:'flex', alignItems:'center', gap:10, flexWrap:'wrap'}}>
              <Tabs
                value={status}
                onChange={setStatus}
                tabs={[
                  {value:'Todas', label:'Todas', count: minhas.length},
                  ...STATUS_PROPOSTA.map(s => ({value:s, label:s, count: minhas.filter(p=>p.status===s).length}))
                ]}
              />
              <div style={{marginLeft:'auto', display:'flex', gap:10}}>
                <Button variant="secondary" size="sm" icon={<Ico.filter/>}>Filtros</Button>
                <Button variant="secondary" size="sm" icon={<Ico.download/>}>Exportar</Button>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="scroll-x">
              <table className="table">
                <thead><tr>
                  <th>Proposta</th><th>Cliente</th><th>Operadora · Plano</th><th>Vidas</th><th>Valor</th><th>Criada</th><th>Status</th><th style={{width:50}}></th>
                </tr></thead>
                <tbody>
                  {filtered.map(p => {
                    const pl = getPlano(p.plano);
                    return (
                      <tr key={p.id}>
                        <td className="cell-strong tech" style={{fontSize:11.5,letterSpacing:'.08em'}}>{p.id}</td>
                        <td className="cell-strong">{p.cliente}</td>
                        <td>
                          <div style={{display:'flex',alignItems:'center',gap:8}}>
                            <span style={{width:8,height:8,borderRadius:2,background:getOp(p.op).cor}}/>
                            <div>
                              <div style={{fontSize:13,fontWeight:600}}>{getOp(p.op).nome}</div>
                              <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:600,marginTop:2}}>{pl?.nome}</div>
                            </div>
                          </div>
                        </td>
                        <td className="num">{p.vidas}</td>
                        <td className="num">{fmtBRL(p.valor)}</td>
                        <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(p.criada)}</td>
                        <td><Badge tone={statusToneProposta[p.status]} dot>{p.status}</Badge></td>
                        <td><Button variant="ghost" size="sm" icon={<Ico.dots/>}/></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {view === 'kanban' && (
        <div style={{display:'grid', gridTemplateColumns:'repeat(6, minmax(220px, 1fr))', gap:12, overflowX:'auto', paddingBottom:12}}>
          {STATUS_PROPOSTA.map(s => {
            const items = minhas.filter(p => p.status === s);
            return (
              <div key={s} className="card" style={{display:'flex', flexDirection:'column', minHeight:300}}>
                <div style={{padding:'12px 14px', borderBottom:'1px solid var(--line-soft)', display:'flex', alignItems:'center', justifyContent:'space-between'}}>
                  <div style={{display:'flex',alignItems:'center',gap:8}}>
                    <Badge tone={statusToneProposta[s]} dot>{s}</Badge>
                  </div>
                  <span className="chip">{items.length}</span>
                </div>
                <div style={{padding:10, display:'flex', flexDirection:'column', gap:8, flex:1}}>
                  {items.map(p => {
                    const pl = getPlano(p.plano);
                    return (
                      <div key={p.id} style={{border:'1px solid var(--line)', borderRadius:10, padding:'10px 12px', background:'#fff'}}>
                        <div className="tech" style={{fontSize:10.5,color:'var(--muted)'}}>{p.id}</div>
                        <div style={{fontSize:13.5, fontWeight:700, color:'var(--ink)', marginTop:4, lineHeight:1.3}}>{p.cliente}</div>
                        <div style={{display:'flex',alignItems:'center',gap:6,marginTop:8,fontSize:12,color:'var(--ink-3)',fontWeight:600}}>
                          <span style={{width:7,height:7,borderRadius:2,background:getOp(p.op).cor}}/>
                          {getOp(p.op).nome}
                        </div>
                        <div style={{display:'flex',justifyContent:'space-between',marginTop:10,paddingTop:10,borderTop:'1px solid var(--line-soft)',fontSize:12.5}}>
                          <span style={{color:'var(--muted)',fontWeight:600}}>{p.vidas} vidas</span>
                          <span className="num" style={{color:'var(--ink)',fontWeight:700}}>{fmtBRL(p.valor)}</span>
                        </div>
                      </div>
                    );
                  })}
                  {items.length === 0 && <div style={{padding:'24px 8px',textAlign:'center',color:'var(--muted)',fontSize:12.5,fontWeight:600}}>Nenhuma proposta</div>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* =================================================================== *
 *  COMISSÕES
 * =================================================================== */
function ScreenComissoes() {
  const total = COMISSOES.reduce((s,c)=>s + c.valor, 0);
  const pago = COMISSOES.filter(c=>c.status==='Pago').reduce((s,c)=>s+c.valor, 0);
  const programado = COMISSOES.filter(c=>c.status==='Programado').reduce((s,c)=>s+c.valor, 0);

  return (
    <>
      <PageHeader
        eyebrow="Financeiro"
        title="Comissões e extratos"
        sub="Acompanhe pagamentos, recorrência e projeções dos próximos meses."
        right={<><Button variant="secondary" size="sm" icon={<Ico.calendar/>}>Período: Maio/26</Button><Button variant="primary" icon={<Ico.download/>}>Baixar extrato</Button></>}
      />

      <div className="grid-stats" style={{marginBottom:16}}>
        <StatCard label="Recebido no mês"     value={fmtBRL(pago)}        delta="+18,4%" deltaDir="up" sub="vs. abril"/>
        <StatCard label="A receber (próx 30d)" value={fmtBRL(programado)} delta="+8 propostas" deltaDir="up"/>
        <StatCard label="Recorrência ativa"    value={fmtBRL(34800)}      sub="por mês · 92 propostas"/>
        <StatCard label="Comissão média"       value="4,6%"               delta="+0,3pp" deltaDir="up" sub="planos vendidos"/>
      </div>

      <div className="card">
        <div className="card-head">
          <div>
            <h3 className="card-title">Extrato detalhado</h3>
            <p className="card-sub">{COMISSOES.length} lançamentos · total {fmtBRL(total)}</p>
          </div>
          <div style={{display:'flex',gap:10}}>
            <div style={{width:170}}><Select value="" onChange={()=>{}} options={[{value:'',label:'Todos os status'},{value:'Pago',label:'Pago'},{value:'Programado',label:'Programado'},{value:'Em validação',label:'Em validação'}]}/></div>
          </div>
        </div>
        <div className="scroll-x">
          <table className="table">
            <thead><tr><th>Lançamento</th><th>Proposta · Cliente</th><th>Parcela</th><th>Pagamento</th><th>Valor</th><th>Status</th></tr></thead>
            <tbody>
              {COMISSOES.map(c => (
                <tr key={c.id}>
                  <td className="cell-strong tech" style={{fontSize:11.5,letterSpacing:'.08em'}}>{c.id}</td>
                  <td>
                    <div className="cell-strong">{c.cliente}</div>
                    <div className="tech" style={{fontSize:11,color:'var(--muted)',marginTop:2}}>{c.propostaId}</div>
                  </td>
                  <td><Badge tone="neutral">{c.parcela}</Badge></td>
                  <td style={{color:'var(--ink-2)',fontWeight:600}}>{fmtDateFull(c.pagaEm)}</td>
                  <td className="num cell-strong">{fmtBRL2(c.valor)}</td>
                  <td><Badge tone={statusToneComissao[c.status]} dot>{c.status}</Badge></td>
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
 *  CATÁLOGO DE PLANOS
 * =================================================================== */
function ScreenPlanos() {
  const [tipo, setTipo] = useState('');
  const [op, setOp] = useState('');
  const filtered = PLANOS.filter(p => (!tipo || p.tipo === tipo) && (!op || p.op === op));

  return (
    <>
      <PageHeader
        eyebrow="Catálogo"
        title="Planos e operadoras"
        sub="Encontre o plano ideal para cada cliente. Filtre por operadora, segmento e perfil."
      />

      <div className="card" style={{marginBottom:16}}>
        <div className="card-pad" style={{display:'flex',gap:14,alignItems:'center',flexWrap:'wrap'}}>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {OPERADORAS.map(o => (
              <button key={o.id} onClick={()=>setOp(op===o.id?'':o.id)} style={{
                display:'inline-flex',alignItems:'center',gap:8,
                padding:'7px 14px',borderRadius:999,border:'1.5px solid ' + (op===o.id ? 'var(--brand)' : 'var(--line)'),
                background: op===o.id ? 'var(--brand-soft)' : '#fff',
                color: op===o.id ? 'var(--brand)' : 'var(--ink-2)',
                fontSize:13, fontWeight:700, cursor:'pointer',
              }}>
                <span style={{width:8,height:8,borderRadius:2,background:o.cor}}/>
                {o.nome}
              </button>
            ))}
          </div>
          <div style={{marginLeft:'auto',width:180}}>
            <Select value={tipo} onChange={setTipo} options={[{value:'',label:'Todos os tipos'},{value:'Saúde',label:'Saúde'},{value:'Odonto',label:'Odonto'}]}/>
          </div>
        </div>
      </div>

      <div className="grid-3">
        {filtered.map(p => {
          const o = getOp(p.op);
          return (
            <div key={p.id} className="card" style={{display:'flex',flexDirection:'column'}}>
              <div style={{padding:'18px 20px',borderBottom:'1px solid var(--line-soft)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div style={{display:'flex',alignItems:'center',gap:10}}>
                  <span style={{width:36,height:36,borderRadius:8,background:o.cor,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff'}}>
                    {p.tipo === 'Saúde' ? <Ico.shield width={18} height={18}/> : <Ico.heart width={18} height={18}/>}
                  </span>
                  <div>
                    <div style={{fontSize:12.5,color:'var(--ink-3)',fontWeight:600}}>{o.nome}</div>
                    <div style={{fontSize:15,fontWeight:800,color:'var(--ink)',marginTop:2,letterSpacing:'-.01em'}}>{p.nome}</div>
                  </div>
                </div>
                <Badge tone="brand">{p.comissao}%</Badge>
              </div>
              <div className="card-pad" style={{flex:1,display:'flex',flexDirection:'column',gap:10}}>
                <ResumoRow k="Tipo" v={p.tipo}/>
                <ResumoRow k="Abrangência" v={p.abrang}/>
                <ResumoRow k="Acomodação" v={p.acomod}/>
                <ResumoRow k="Coparticipação" v={p.coparti ? 'Sim' : 'Não'}/>
                <ResumoRow k="Público" v={p.publico}/>
              </div>
              <div style={{padding:'14px 20px',borderTop:'1px solid var(--line-soft)',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                <div>
                  <div style={{fontSize:11.5,color:'var(--muted)',fontWeight:700,letterSpacing:'.06em',textTransform:'uppercase'}}>a partir de</div>
                  <div style={{fontSize:20,fontWeight:800,color:'var(--ink)',letterSpacing:'-.02em',marginTop:2}}>{fmtBRL(p.precoBase)}<span style={{fontSize:12,color:'var(--muted)',fontWeight:600}}>/vida</span></div>
                </div>
                <Button variant="primary" size="sm" iconRight={<Ico.arrowR/>}>Cotar</Button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

/* =================================================================== *
 *  PERFIL / CONFIGURAÇÕES
 * =================================================================== */
function ScreenPerfil() {
  const c = getCorretor();
  return (
    <>
      <PageHeader eyebrow="Conta" title="Perfil e configurações" sub="Gerencie suas informações, comissões e preferências de notificação."/>

      <div style={{display:'grid', gridTemplateColumns:'320px 1fr', gap:16}}>
        <div className="card card-pad" style={{textAlign:'center'}}>
          <Avatar name={c.nome} size="lg"/>
          <div style={{fontSize:18,fontWeight:800,color:'var(--ink)',marginTop:14,letterSpacing:'-.01em'}}>{c.nome}</div>
          <div style={{fontSize:13,color:'var(--ink-3)',marginTop:4}}>Corretor parceiro · {c.cidade}</div>
          <div style={{marginTop:14, display:'flex',justifyContent:'center', gap:8}}>
            <Badge tone={tierTone[c.tier]} dot>Tier {c.tier}</Badge>
            <Badge tone="ok" dot>Ativo</Badge>
          </div>
          <div className="divider"/>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,textAlign:'left'}}>
            <MiniStat label="Clientes" value={c.clientes}/>
            <MiniStat label="Conversão" value={`${c.conversao}%`}/>
            <MiniStat label="Vendas/mês" value={fmtBRL(c.vendas30d)}/>
            <MiniStat label="Desde" value={new Date(c.entrou).getFullYear()}/>
          </div>
        </div>

        <div className="card">
          <div className="card-head"><h3 className="card-title">Dados de contato</h3></div>
          <div className="card-pad" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
            <Field label="Nome completo"><Input value={c.nome} onChange={()=>{}}/></Field>
            <Field label="E-mail profissional"><Input value="renata.souza@corclub.com.br" onChange={()=>{}} icon={<Ico.mail/>}/></Field>
            <Field label="Telefone"><Input value="(31) 98765-4321" onChange={()=>{}} icon={<Ico.phone/>}/></Field>
            <Field label="CPF"><Input value="123.456.789-00" onChange={()=>{}}/></Field>
            <Field label="Cidade"><Input value={c.cidade} onChange={()=>{}}/></Field>
            <Field label="SUSEP"><Input value="20240015" onChange={()=>{}}/></Field>
            <div style={{gridColumn:'1 / -1'}}>
              <Field label="Dados bancários (PIX)"><Input value="renata.souza@corclub.com.br" onChange={()=>{}}/></Field>
            </div>
          </div>
          <div style={{padding:'14px 22px', borderTop:'1px solid var(--line-soft)', display:'flex', justifyContent:'flex-end', gap:10}}>
            <Button variant="ghost">Descartar</Button>
            <Button variant="primary" icon={<Ico.check/>}>Salvar alterações</Button>
          </div>
        </div>
      </div>
    </>
  );
}

Object.assign(window, {
  CORRETOR_LOGADO, getCorretor, getOp, getPlano,
  ScreenDashboard, ScreenCarteira, ScreenNovaProposta, ScreenPropostas, ScreenComissoes, ScreenPlanos, ScreenPerfil,
});
