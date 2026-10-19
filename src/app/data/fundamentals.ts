import { HttpFlowStep, HttpMethodInfo } from '@core/domain';

export const HTTP_FLOW_STEPS: HttpFlowStep[] = [
  {
    icon: 'computer',
    title: 'O cliente pede',
    text: 'O navegador (ou um app) decide que precisa de algo: uma página, uma imagem, dados de uma API.',
  },
  {
    icon: 'send',
    title: 'A requisição viaja',
    text: 'O pedido leva um método, um endereço (URL), cabeçalhos e, às vezes, um corpo com dados.',
  },
  {
    icon: 'dns',
    title: 'O servidor processa',
    text: 'Do outro lado, o servidor interpreta o pedido, consulta o banco, valida permissões...',
  },
  {
    icon: 'mark_email_read',
    title: 'A resposta volta',
    text: 'Sempre com um código de status de três dígitos que resume o que aconteceu.',
  },
];

export const HTTP_METHODS: HttpMethodInfo[] = [
  { name: 'GET', icon: 'download', text: 'Buscar dados' },
  { name: 'POST', icon: 'add_circle', text: 'Criar algo novo' },
  { name: 'PUT', icon: 'sync', text: 'Substituir por completo' },
  { name: 'PATCH', icon: 'edit', text: 'Alterar uma parte' },
  { name: 'DELETE', icon: 'delete', text: 'Remover' },
];

export const SAMPLE_REQUEST = [
  'GET /api/gatos/42 HTTP/1.1',
  'Host: api.exemplo.com',
  'Accept: application/json',
].join('\n');

export const SAMPLE_RESPONSE = [
  'HTTP/1.1 200 OK',
  'Content-Type: application/json',
  '',
  '{ "id": 42, "nome": "Mia" }',
].join('\n');
