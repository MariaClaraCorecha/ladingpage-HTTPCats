export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Scenario {
  id: string;
  label: string;
  method: HttpMethod;
  path: string;
  requestHeaders: Record<string, string>;
  requestBody?: string;
  status: number;
  responseHeaders: Record<string, string>;
  responseBody?: string;
  explanation: string;
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'list-products',
    label: 'Listar produtos de uma loja',
    method: 'GET',
    path: '/api/produtos',
    requestHeaders: { Host: 'loja.exemplo.com', Accept: 'application/json' },
    status: 200,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '[\n  { "id": 1, "nome": "Arranhador" },\n  { "id": 2, "nome": "Ração" }\n]',
    explanation:
      'Um GET simples que encontrou o que foi pedido. O corpo da resposta traz os dados em JSON.',
  },
  {
    id: 'create-user',
    label: 'Cadastrar um novo usuário',
    method: 'POST',
    path: '/api/usuarios',
    requestHeaders: { Host: 'api.exemplo.com', 'Content-Type': 'application/json' },
    requestBody: '{ "nome": "Mia", "email": "mia@gatos.com" }',
    status: 201,
    responseHeaders: { 'Content-Type': 'application/json', Location: '/api/usuarios/42' },
    responseBody: '{ "id": 42, "nome": "Mia", "email": "mia@gatos.com" }',
    explanation:
      'O POST criou um recurso novo. O cabeçalho Location diz onde ele pode ser encontrado.',
  },
  {
    id: 'duplicate-email',
    label: 'Cadastrar com um e-mail já usado',
    method: 'POST',
    path: '/api/usuarios',
    requestHeaders: { Host: 'api.exemplo.com', 'Content-Type': 'application/json' },
    requestBody: '{ "nome": "Mia", "email": "mia@gatos.com" }',
    status: 409,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '{ "erro": "E-mail já cadastrado" }',
    explanation:
      'A requisição está bem formada, mas conflita com o estado atual do servidor: o e-mail já existe.',
  },
  {
    id: 'invalid-json',
    label: 'Enviar um JSON quebrado',
    method: 'POST',
    path: '/api/usuarios',
    requestHeaders: { Host: 'api.exemplo.com', 'Content-Type': 'application/json' },
    requestBody: '{ "nome": "Mia", ',
    status: 400,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '{ "erro": "JSON inválido na linha 1" }',
    explanation: 'O servidor nem conseguiu interpretar o corpo. A culpa é de quem enviou: erro 4xx.',
  },
  {
    id: 'no-token',
    label: 'Acessar o perfil sem estar logado',
    method: 'GET',
    path: '/api/perfil',
    requestHeaders: { Host: 'api.exemplo.com' },
    status: 401,
    responseHeaders: { 'WWW-Authenticate': 'Bearer' },
    explanation:
      'Faltou o cabeçalho Authorization. O servidor não sabe quem você é, então pede autenticação.',
  },
  {
    id: 'not-admin',
    label: 'Usuário comum acessando o painel admin',
    method: 'GET',
    path: '/api/admin/relatorios',
    requestHeaders: { Host: 'api.exemplo.com', Authorization: 'Bearer eyJhbGciOi...' },
    status: 403,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '{ "erro": "Permissão insuficiente" }',
    explanation:
      'Agora o servidor sabe quem você é (há um token válido), mas você não tem permissão. 401 ≠ 403!',
  },
  {
    id: 'missing-product',
    label: 'Buscar um produto que não existe',
    method: 'GET',
    path: '/api/produtos/9999',
    requestHeaders: { Host: 'loja.exemplo.com', Accept: 'application/json' },
    status: 404,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '{ "erro": "Produto não encontrado" }',
    explanation: 'O endereço é válido, mas não existe nenhum recurso com o id 9999.',
  },
  {
    id: 'delete-product',
    label: 'Excluir um produto',
    method: 'DELETE',
    path: '/api/produtos/2',
    requestHeaders: { Host: 'loja.exemplo.com', Authorization: 'Bearer eyJhbGciOi...' },
    status: 204,
    responseHeaders: {},
    explanation: 'A exclusão funcionou e não há nada a devolver, por isso o corpo vem vazio.',
  },
  {
    id: 'old-url',
    label: 'Acessar um endereço antigo do site',
    method: 'GET',
    path: '/blog-antigo/post-1',
    requestHeaders: { Host: 'www.exemplo.com' },
    status: 301,
    responseHeaders: { Location: 'https://blog.exemplo.com/post-1' },
    explanation:
      'O conteúdo mudou de lugar para sempre. O navegador segue o Location automaticamente.',
  },
  {
    id: 'cached',
    label: 'Recarregar uma imagem que já está em cache',
    method: 'GET',
    path: '/img/logo.png',
    requestHeaders: { Host: 'www.exemplo.com', 'If-None-Match': '"abc123"' },
    status: 304,
    responseHeaders: { ETag: '"abc123"' },
    explanation:
      'O ETag enviado bate com a versão atual. O servidor não reenvia a imagem: use a do cache.',
  },
  {
    id: 'rate-limit',
    label: 'Fazer 1000 requisições em 1 segundo',
    method: 'GET',
    path: '/api/busca?q=gatos',
    requestHeaders: { Host: 'api.exemplo.com' },
    status: 429,
    responseHeaders: { 'Retry-After': '60' },
    explanation:
      'A API limita a quantidade de chamadas. O Retry-After informa quantos segundos esperar.',
  },
  {
    id: 'server-bug',
    label: 'Disparar um bug no backend',
    method: 'GET',
    path: '/api/relatorio',
    requestHeaders: { Host: 'api.exemplo.com' },
    status: 500,
    responseHeaders: { 'Content-Type': 'application/json' },
    responseBody: '{ "erro": "Erro interno" }',
    explanation: 'O pedido estava certo, mas o código do servidor lançou uma exceção não tratada.',
  },
  {
    id: 'maintenance',
    label: 'Acessar o site durante a manutenção',
    method: 'GET',
    path: '/',
    requestHeaders: { Host: 'www.exemplo.com' },
    status: 503,
    responseHeaders: { 'Retry-After': '3600' },
    explanation: 'O servidor está fora do ar temporariamente. Tente de novo mais tarde.',
  },
  {
    id: 'teapot',
    label: 'Pedir café para um bule de chá',
    method: 'POST',
    path: '/cafe',
    requestHeaders: { Host: 'bule.exemplo.com' },
    status: 418,
    responseHeaders: {},
    explanation: 'Um easter egg clássico da internet (RFC 2324). Bules não fazem café!',
  },
];
