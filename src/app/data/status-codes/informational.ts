import { HttpStatus } from '@core/domain';

// 1xx — Informativos
export const INFORMATIONAL_STATUSES: HttpStatus[] = [
  {
    code: 100,
    name: 'Continue',
    description: 'O servidor recebeu os cabeçalhos e o cliente pode enviar o corpo da requisição.',
    whenToUse:
      'Quando o cliente envia "Expect: 100-continue" antes de mandar um corpo grande, como um upload.',
  },
  {
    code: 101,
    name: 'Switching Protocols',
    description: 'O servidor aceitou trocar de protocolo, conforme pedido pelo cliente.',
    whenToUse: 'Na abertura de uma conexão WebSocket (cabeçalho "Upgrade: websocket").',
  },
  {
    code: 102,
    name: 'Processing',
    description:
      'O servidor recebeu a requisição e ainda está processando; nenhuma resposta ainda.',
    whenToUse: 'Em operações WebDAV demoradas, para evitar que o cliente desista por timeout.',
  },
  {
    code: 103,
    name: 'Early Hints',
    description: 'Envia cabeçalhos antecipados para o navegador pré-carregar recursos.',
    whenToUse: 'Para sugerir "Link: rel=preload" de CSS/JS enquanto a resposta final é gerada.',
  },
];
