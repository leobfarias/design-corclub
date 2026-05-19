/* CorClub — Mock data (PT-BR, contexto: assessoria de planos de saúde)
   Exposes onto window for cross-script use. */

const OPERADORAS = [
  { id: 'hap',  nome: 'Hapvida NotreDame',   tipo: 'Saúde',  segmento: 'PME · PF', cor: '#E2392C' },
  { id: 'sul',  nome: 'SulAmérica Saúde',    tipo: 'Saúde',  segmento: 'PME · Empresarial', cor: '#FFB81C' },
  { id: 'ami',  nome: 'Amil',                tipo: 'Saúde',  segmento: 'PME · PF', cor: '#0033A0' },
  { id: 'bra',  nome: 'Bradesco Saúde',      tipo: 'Saúde',  segmento: 'Empresarial', cor: '#CC092F' },
  { id: 'una',  nome: 'Unimed Nacional',     tipo: 'Saúde',  segmento: 'PME · PF · Adesão', cor: '#00995D' },
  { id: 'pro',  nome: 'Prevent Senior',      tipo: 'Saúde',  segmento: 'PF · 49+', cor: '#005AAA' },
  { id: 'odp',  nome: 'OdontoPrev',          tipo: 'Odonto', segmento: 'PME · PF', cor: '#1E3A8A' },
  { id: 'cas',  nome: 'CASSI',               tipo: 'Saúde',  segmento: 'Adesão · Setor bancário', cor: '#003478' },
];

const PLANOS = [
  { id: 'p1', op: 'hap', nome: 'NDI Smart 200',         tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Enfermaria', coparti: true,  precoBase: 289,  publico: 'PME 2-29 vidas', comissao: 4.2 },
  { id: 'p2', op: 'hap', nome: 'NDI Plus 400',          tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Apartamento', coparti: false, precoBase: 612,  publico: 'PME 2-99 vidas', comissao: 4.5 },
  { id: 'p3', op: 'sul', nome: 'Direto 200',            tipo: 'Saúde',   abrang: 'Estadual', acomod: 'Enfermaria', coparti: false, precoBase: 348,  publico: 'PME 2-29 vidas', comissao: 5.0 },
  { id: 'p4', op: 'sul', nome: 'Especial 100',          tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Apartamento', coparti: false, precoBase: 1480, publico: 'Executivo', comissao: 5.5 },
  { id: 'p5', op: 'ami', nome: 'One S60',               tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Apartamento', coparti: true,  precoBase: 540,  publico: 'PME 2-29 vidas', comissao: 4.0 },
  { id: 'p6', op: 'ami', nome: 'Fácil 90',              tipo: 'Saúde',   abrang: 'Regional', acomod: 'Enfermaria', coparti: true,  precoBase: 232,  publico: 'PME 2-19 vidas', comissao: 3.8 },
  { id: 'p7', op: 'bra', nome: 'Top Nacional Flex',     tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Apartamento', coparti: false, precoBase: 1180, publico: 'Empresarial 30+', comissao: 5.0 },
  { id: 'p8', op: 'una', nome: 'Alfa Nacional',         tipo: 'Saúde',   abrang: 'Nacional', acomod: 'Apartamento', coparti: false, precoBase: 720,  publico: 'PME · Adesão', comissao: 4.6 },
  { id: 'p9', op: 'una', nome: 'Delta Regional',        tipo: 'Saúde',   abrang: 'Regional', acomod: 'Enfermaria', coparti: true,  precoBase: 298,  publico: 'PF · Adesão', comissao: 4.2 },
  { id: 'p10', op: 'pro', nome: 'Prevent 60+',          tipo: 'Saúde',   abrang: 'Regional', acomod: 'Apartamento', coparti: false, precoBase: 1620, publico: '60+ anos', comissao: 6.0 },
  { id: 'p11', op: 'odp', nome: 'Dental Premium',       tipo: 'Odonto',  abrang: 'Nacional', acomod: '—',          coparti: false, precoBase: 78,   publico: 'PME · PF', comissao: 8.0 },
  { id: 'p12', op: 'odp', nome: 'Dental Essencial',     tipo: 'Odonto',  abrang: 'Nacional', acomod: '—',          coparti: false, precoBase: 32,   publico: 'PF', comissao: 7.5 },
];

const CORRETORES = [
  { id: 'c01', nome: 'Renata Souza',          cidade: 'Belo Horizonte/MG', tier: 'Diamond', clientes: 184, ativos: 23, vendas30d: 142800, conversao: 38, status: 'Ativo',     entrou: '2022-03-14' },
  { id: 'c02', nome: 'Carlos Henrique Lima',  cidade: 'São Paulo/SP',      tier: 'Diamond', clientes: 211, ativos: 31, vendas30d: 198600, conversao: 41, status: 'Ativo',     entrou: '2021-11-02' },
  { id: 'c03', nome: 'Marina Albuquerque',    cidade: 'Recife/PE',         tier: 'Gold',    clientes: 98,  ativos: 14, vendas30d: 88200,  conversao: 32, status: 'Ativo',     entrou: '2023-01-21' },
  { id: 'c04', nome: 'Diego Marques',         cidade: 'Curitiba/PR',       tier: 'Gold',    clientes: 76,  ativos: 11, vendas30d: 72400,  conversao: 29, status: 'Ativo',     entrou: '2023-05-10' },
  { id: 'c05', nome: 'Júlia Tavares',         cidade: 'Rio de Janeiro/RJ', tier: 'Diamond', clientes: 156, ativos: 22, vendas30d: 161400, conversao: 36, status: 'Ativo',     entrou: '2022-07-08' },
  { id: 'c06', nome: 'Pedro Antunes',         cidade: 'Goiânia/GO',        tier: 'Silver',  clientes: 41,  ativos: 5,  vendas30d: 28900,  conversao: 24, status: 'Ativo',     entrou: '2024-02-19' },
  { id: 'c07', nome: 'Aline Cardoso',         cidade: 'Florianópolis/SC',  tier: 'Gold',    clientes: 89,  ativos: 12, vendas30d: 84300,  conversao: 33, status: 'Ativo',     entrou: '2023-03-30' },
  { id: 'c08', nome: 'Rafael Nogueira',       cidade: 'Salvador/BA',       tier: 'Silver',  clientes: 52,  ativos: 7,  vendas30d: 38100,  conversao: 27, status: 'Ativo',     entrou: '2024-01-12' },
  { id: 'c09', nome: 'Beatriz Moraes',        cidade: 'Porto Alegre/RS',   tier: 'Diamond', clientes: 142, ativos: 19, vendas30d: 132700, conversao: 35, status: 'Ativo',     entrou: '2022-09-05' },
  { id: 'c10', nome: 'Lucas Fernandes',       cidade: 'Brasília/DF',       tier: 'Gold',    clientes: 81,  ativos: 9,  vendas30d: 64800,  conversao: 28, status: 'Pendente', entrou: '2025-08-14' },
  { id: 'c11', nome: 'Fernanda Vilela',       cidade: 'Fortaleza/CE',      tier: 'Gold',    clientes: 67,  ativos: 8,  vendas30d: 52400,  conversao: 30, status: 'Ativo',     entrou: '2023-10-22' },
  { id: 'c12', nome: 'Bruno Caldas',          cidade: 'Manaus/AM',         tier: 'Silver',  clientes: 34,  ativos: 4,  vendas30d: 21600,  conversao: 22, status: 'Ativo',     entrou: '2024-06-03' },
  { id: 'c13', nome: 'Isabela Reis',          cidade: 'São Paulo/SP',      tier: 'Diamond', clientes: 199, ativos: 28, vendas30d: 188100, conversao: 39, status: 'Ativo',     entrou: '2021-08-19' },
  { id: 'c14', nome: 'Thiago Bernardes',      cidade: 'Campinas/SP',       tier: 'Gold',    clientes: 73,  ativos: 10, vendas30d: 61200,  conversao: 31, status: 'Ativo',     entrou: '2023-07-15' },
  { id: 'c15', nome: 'Camila Prado',          cidade: 'Niterói/RJ',        tier: 'Silver',  clientes: 38,  ativos: 4,  vendas30d: 22800,  conversao: 23, status: 'Inativo',  entrou: '2024-04-08' },
  { id: 'c16', nome: 'Vinícius Sampaio',      cidade: 'Belém/PA',          tier: 'Silver',  clientes: 47,  ativos: 6,  vendas30d: 31700,  conversao: 25, status: 'Ativo',     entrou: '2024-03-11' },
  { id: 'c17', nome: 'Patrícia Andrade',      cidade: 'Vitória/ES',        tier: 'Gold',    clientes: 84,  ativos: 11, vendas30d: 71900,  conversao: 32, status: 'Ativo',     entrou: '2023-04-27' },
  { id: 'c18', nome: 'Felipe Cordeiro',       cidade: 'São Paulo/SP',      tier: 'Diamond', clientes: 168, ativos: 24, vendas30d: 152300, conversao: 37, status: 'Ativo',     entrou: '2022-05-30' },
];

/* Clientes (pessoas/empresas) — corretor logado = c01 (Renata) */
const CLIENTES = [
  { id: 'k01', tipo: 'PJ', nome: 'Atacadão Ferreira Ltda',     contato: 'Roberto Ferreira',   doc: '12.345.678/0001-90', vidas: 18, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p1',  inicio: '2024-03-15', mensal: 5202 },
  { id: 'k02', tipo: 'PF', nome: 'Marcos Vinícius Oliveira',   contato: 'Marcos V. Oliveira', doc: '123.456.789-01',     vidas: 4,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p9',  inicio: '2024-08-02', mensal: 1192 },
  { id: 'k03', tipo: 'PJ', nome: 'Construtora Rio Verde S.A.', contato: 'Ana Paula Mendes',   doc: '23.456.789/0001-12', vidas: 42, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p4',  inicio: '2023-11-28', mensal: 62160 },
  { id: 'k04', tipo: 'PJ', nome: 'Padaria Pão Quente ME',       contato: 'Mariana Costa',      doc: '34.567.890/0001-23', vidas: 6,  cidade: 'BH/MG',  corretor: 'c01', status: 'Renovação', plano: 'p2',  inicio: '2024-01-10', mensal: 3672 },
  { id: 'k05', tipo: 'PF', nome: 'Luiza Bernardo',              contato: 'Luiza Bernardo',     doc: '987.654.321-00',     vidas: 1,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p10', inicio: '2024-06-22', mensal: 1620 },
  { id: 'k06', tipo: 'PJ', nome: 'Tech Solutions BH',           contato: 'Carlos Eduardo',     doc: '45.678.901/0001-34', vidas: 12, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p7',  inicio: '2024-09-01', mensal: 14160 },
  { id: 'k07', tipo: 'PJ', nome: 'Restaurante Sabor Mineiro',   contato: 'José da Silva',      doc: '56.789.012/0001-45', vidas: 9,  cidade: 'BH/MG',  corretor: 'c01', status: 'Pendente',  plano: 'p1',  inicio: '2025-04-10', mensal: 2601 },
  { id: 'k08', tipo: 'PF', nome: 'Eduardo Antunes',             contato: 'Eduardo Antunes',    doc: '111.222.333-44',     vidas: 3,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p11', inicio: '2024-12-15', mensal: 234 },
  { id: 'k09', tipo: 'PJ', nome: 'Escola Pequeno Príncipe',     contato: 'Beatriz Almeida',    doc: '67.890.123/0001-56', vidas: 24, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p3',  inicio: '2024-02-08', mensal: 8352 },
  { id: 'k10', tipo: 'PF', nome: 'Geraldo Magela Pinto',        contato: 'Geraldo Pinto',      doc: '222.333.444-55',     vidas: 2,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p10', inicio: '2025-01-18', mensal: 3240 },
  { id: 'k11', tipo: 'PJ', nome: 'Auto Posto Trevão',           contato: 'Fábio Souza',        doc: '78.901.234/0001-67', vidas: 11, cidade: 'BH/MG',  corretor: 'c01', status: 'Cancelado', plano: 'p1',  inicio: '2023-05-20', mensal: 0    },
  { id: 'k12', tipo: 'PJ', nome: 'Imobiliária Habitar',          contato: 'Roberta Lima',       doc: '89.012.345/0001-78', vidas: 8,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p2',  inicio: '2024-07-04', mensal: 4896 },
  { id: 'k13', tipo: 'PF', nome: 'Carla Bittencourt',            contato: 'Carla Bittencourt',  doc: '333.444.555-66',     vidas: 1,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p12', inicio: '2025-03-09', mensal: 32   },
  { id: 'k14', tipo: 'PJ', nome: 'Farmácia Vida & Saúde',        contato: 'Marcelo Tavares',    doc: '90.123.456/0001-89', vidas: 7,  cidade: 'BH/MG',  corretor: 'c01', status: 'Renovação', plano: 'p5',  inicio: '2024-04-22', mensal: 3780 },
  { id: 'k15', tipo: 'PJ', nome: 'Cooperativa AgroMG',           contato: 'Joaquim Pereira',    doc: '01.234.567/0001-90', vidas: 35, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p8',  inicio: '2023-12-01', mensal: 25200 },
  { id: 'k16', tipo: 'PF', nome: 'Sandra Helena Goulart',        contato: 'Sandra Goulart',     doc: '444.555.666-77',     vidas: 2,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p9',  inicio: '2025-02-14', mensal: 596  },
  { id: 'k17', tipo: 'PJ', nome: 'Transportadora Veloz Sul',     contato: 'Edson Ramos',        doc: '11.222.333/0001-44', vidas: 16, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p1',  inicio: '2024-10-12', mensal: 4624 },
  { id: 'k18', tipo: 'PJ', nome: 'Studio Pilates Movimento',     contato: 'Daniela Reis',       doc: '22.333.444/0001-55', vidas: 5,  cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p11', inicio: '2024-11-30', mensal: 390  },
  { id: 'k19', tipo: 'PF', nome: 'Henrique Vasconcelos',         contato: 'Henrique V.',        doc: '555.666.777-88',     vidas: 1,  cidade: 'BH/MG',  corretor: 'c01', status: 'Pendente',  plano: 'p10', inicio: '2025-05-01', mensal: 1620 },
  { id: 'k20', tipo: 'PJ', nome: 'Hospital São Lucas',           contato: 'Dra. Renata Castro', doc: '33.444.555/0001-66', vidas: 64, cidade: 'BH/MG',  corretor: 'c01', status: 'Ativo',     plano: 'p4',  inicio: '2023-06-15', mensal: 94720 },
];

const STATUS_PROPOSTA = ['Rascunho', 'Em análise', 'Pendência', 'Aprovada', 'Implantada', 'Recusada'];

const PROPOSTAS = [
  { id: 'PR-2026-0184', cliente: 'Atacadão Ferreira Ltda',       corretor: 'c01', op: 'hap', plano: 'p1',  vidas: 18, valor: 5202,  status: 'Implantada', criada: '2026-05-02', atualizada: '2026-05-12' },
  { id: 'PR-2026-0203', cliente: 'Tech Solutions BH',            corretor: 'c01', op: 'bra', plano: 'p7',  vidas: 12, valor: 14160, status: 'Aprovada',   criada: '2026-05-08', atualizada: '2026-05-15' },
  { id: 'PR-2026-0211', cliente: 'Restaurante Sabor Mineiro',    corretor: 'c01', op: 'hap', plano: 'p1',  vidas: 9,  valor: 2601,  status: 'Pendência',  criada: '2026-05-10', atualizada: '2026-05-17' },
  { id: 'PR-2026-0217', cliente: 'Henrique Vasconcelos',         corretor: 'c01', op: 'pro', plano: 'p10', vidas: 1,  valor: 1620,  status: 'Em análise', criada: '2026-05-11', atualizada: '2026-05-16' },
  { id: 'PR-2026-0228', cliente: 'Loja MultiPeças (novo)',       corretor: 'c01', op: 'sul', plano: 'p3',  vidas: 14, valor: 4872,  status: 'Em análise', criada: '2026-05-13', atualizada: '2026-05-18' },
  { id: 'PR-2026-0231', cliente: 'Marina Estevão (PF)',          corretor: 'c01', op: 'una', plano: 'p9',  vidas: 2,  valor: 596,   status: 'Rascunho',   criada: '2026-05-14', atualizada: '2026-05-14' },
  { id: 'PR-2026-0234', cliente: 'Padaria Pão Quente ME',        corretor: 'c01', op: 'hap', plano: 'p2',  vidas: 6,  valor: 3672,  status: 'Aprovada',   criada: '2026-05-04', atualizada: '2026-05-16' },
  { id: 'PR-2026-0240', cliente: 'Indústria Plástica Norte',     corretor: 'c02', op: 'ami', plano: 'p5',  vidas: 27, valor: 14580, status: 'Em análise', criada: '2026-05-15', atualizada: '2026-05-18' },
  { id: 'PR-2026-0241', cliente: 'Clínica OdontoFamília',        corretor: 'c01', op: 'odp', plano: 'p11', vidas: 8,  valor: 624,   status: 'Implantada', criada: '2026-05-01', atualizada: '2026-05-09' },
  { id: 'PR-2026-0244', cliente: 'Camila Prado (PF)',            corretor: 'c01', op: 'una', plano: 'p9',  vidas: 1,  valor: 298,   status: 'Recusada',   criada: '2026-05-06', atualizada: '2026-05-13' },
  { id: 'PR-2026-0249', cliente: 'Hospital São Lucas (renov.)',  corretor: 'c01', op: 'sul', plano: 'p4',  vidas: 64, valor: 94720, status: 'Em análise', criada: '2026-05-12', atualizada: '2026-05-18' },
  { id: 'PR-2026-0252', cliente: 'Bar e Petiscaria Tropical',    corretor: 'c03', op: 'hap', plano: 'p1',  vidas: 5,  valor: 1445,  status: 'Pendência',  criada: '2026-05-14', atualizada: '2026-05-17' },
  { id: 'PR-2026-0253', cliente: 'Escritório Advocacia & Cia',   corretor: 'c05', op: 'bra', plano: 'p7',  vidas: 9,  valor: 10620, status: 'Aprovada',   criada: '2026-05-09', atualizada: '2026-05-15' },
  { id: 'PR-2026-0257', cliente: 'Mercearia Bom Preço',          corretor: 'c01', op: 'ami', plano: 'p6',  vidas: 7,  valor: 1624,  status: 'Em análise', criada: '2026-05-16', atualizada: '2026-05-18' },
  { id: 'PR-2026-0259', cliente: 'Studio Pilates Movimento',     corretor: 'c01', op: 'odp', plano: 'p11', vidas: 5,  valor: 390,   status: 'Implantada', criada: '2026-04-28', atualizada: '2026-05-08' },
  { id: 'PR-2026-0263', cliente: 'Pousada Águas Claras',         corretor: 'c01', op: 'sul', plano: 'p3',  vidas: 4,  valor: 1392,  status: 'Rascunho',   criada: '2026-05-17', atualizada: '2026-05-17' },
];

const COMISSOES = [
  { id: 'CM-0512', propostaId: 'PR-2026-0184', cliente: 'Atacadão Ferreira Ltda',  valor: 1248.48, parcela: '1/8', status: 'Pago',     pagaEm: '2026-05-15' },
  { id: 'CM-0511', propostaId: 'PR-2026-0203', cliente: 'Tech Solutions BH',       valor: 2832.00, parcela: '1/12', status: 'Programado', pagaEm: '2026-05-25' },
  { id: 'CM-0510', propostaId: 'PR-2026-0234', cliente: 'Padaria Pão Quente ME',   valor: 991.44,  parcela: '1/6',  status: 'Programado', pagaEm: '2026-05-22' },
  { id: 'CM-0509', propostaId: 'PR-2026-0241', cliente: 'Clínica OdontoFamília',   valor: 249.60,  parcela: '1/12', status: 'Pago',     pagaEm: '2026-05-12' },
  { id: 'CM-0508', propostaId: 'PR-2026-0259', cliente: 'Studio Pilates Movimento',valor: 156.00,  parcela: '1/12', status: 'Pago',     pagaEm: '2026-05-09' },
  { id: 'CM-0497', propostaId: 'PR-2026-0149', cliente: 'Construtora Rio Verde S.A.', valor: 6837.60, parcela: '4/12', status: 'Pago', pagaEm: '2026-05-02' },
  { id: 'CM-0492', propostaId: 'PR-2026-0136', cliente: 'Cooperativa AgroMG',      valor: 2520.00, parcela: '3/12', status: 'Pago',     pagaEm: '2026-04-28' },
  { id: 'CM-0488', propostaId: 'PR-2026-0124', cliente: 'Escola Pequeno Príncipe', valor: 1670.40, parcela: '4/12', status: 'Pago',     pagaEm: '2026-04-25' },
  { id: 'CM-0532', propostaId: 'PR-2026-0249', cliente: 'Hospital São Lucas',      valor: 18944.00, parcela: '1/12', status: 'Em validação', pagaEm: '2026-05-28' },
];

const NOTIFICACOES = [
  { id: 'n1', tipo: 'comissao', texto: 'Comissão de R$ 1.248,48 paga · Atacadão Ferreira', tempo: '2h' },
  { id: 'n2', tipo: 'proposta', texto: 'Proposta PR-2026-0203 aprovada pela Bradesco', tempo: '5h' },
  { id: 'n3', tipo: 'pendencia', texto: 'Pendência em PR-2026-0211: faltam documentos do sócio', tempo: '1d' },
  { id: 'n4', tipo: 'meta', texto: 'Você bateu 78% da meta mensal — faltam R$ 31.200', tempo: '1d' },
  { id: 'n5', tipo: 'plano', texto: 'Novo plano SulAmérica Especial 100 disponível', tempo: '2d' },
];

const KPI_ADMIN = {
  gmvMes: 4280400,
  gmvDeltaPct: 12.4,
  propostasMes: 247,
  propostasDeltaPct: 8.2,
  vidasAtivas: 18420,
  vidasDeltaPct: 4.1,
  corretoresAtivos: 142,
  corretoresDeltaPct: 3.6,
  conversaoMedia: 33,
  ticketMedio: 17329,
  churn: 1.8,
};

const SERIE_GMV  = [2.1, 2.4, 2.2, 2.6, 2.9, 3.1, 3.4, 3.2, 3.6, 3.8, 4.0, 4.28]; // M R$
const SERIE_PROP = [148, 162, 158, 175, 184, 198, 207, 212, 224, 231, 240, 247];
const SERIE_CONV = [27, 29, 28, 30, 31, 30, 32, 31, 33, 33, 34, 33];
const SERIE_MES  = ['Jun','Jul','Ago','Set','Out','Nov','Dez','Jan','Fev','Mar','Abr','Mai'];

const VENDAS_30D_CORRETOR = [4, 6, 3, 7, 5, 8, 6, 9, 7, 10, 8, 11, 9, 12, 8, 13, 11, 14, 10, 12, 9, 15, 13, 14, 11, 16, 14, 17, 13, 18];

Object.assign(window, {
  OPERADORAS, PLANOS, CORRETORES, CLIENTES, PROPOSTAS, COMISSOES, NOTIFICACOES,
  STATUS_PROPOSTA, KPI_ADMIN, SERIE_GMV, SERIE_PROP, SERIE_CONV, SERIE_MES, VENDAS_30D_CORRETOR,
});
