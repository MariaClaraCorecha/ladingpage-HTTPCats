import { HttpStatus } from '../../core/domain/index';

// 5xx — Erro do servidor
export const SERVER_ERROR_STATUSES: HttpStatus[] = [
  {
    code: 500,
    name: 'Internal Server Error',
    description: 'Erro genérico: algo inesperado aconteceu no servidor.',
    whenToUse: 'Exceção não tratada no código do backend.',
  },
  {
    code: 501,
    name: 'Not Implemented',
    description: 'O servidor não suporta a funcionalidade necessária.',
    whenToUse: 'Método HTTP que o servidor não reconhece ou recurso ainda não implementado.',
  },
  {
    code: 502,
    name: 'Bad Gateway',
    description: 'Um servidor intermediário recebeu uma resposta inválida do servidor de origem.',
    whenToUse: 'Proxy reverso (Nginx, load balancer) não consegue falar com a aplicação.',
  },
  {
    code: 503,
    name: 'Service Unavailable',
    description: 'O servidor está temporariamente indisponível.',
    whenToUse: 'Manutenção programada ou sobrecarga. Pode vir com "Retry-After".',
  },
  {
    code: 504,
    name: 'Gateway Timeout',
    description: 'O servidor intermediário não recebeu resposta a tempo.',
    whenToUse: 'A aplicação demorou demais e o proxy desistiu de esperar.',
  },
  {
    code: 506,
    name: 'Variant Also Negotiates',
    description: 'Erro de configuração na negociação de conteúdo do servidor.',
    whenToUse: 'Raro; indica uma referência circular na negociação transparente.',
  },
  {
    code: 507,
    name: 'Insufficient Storage',
    description: 'O servidor não tem espaço para concluir a operação.',
    whenToUse: 'Em WebDAV, disco cheio ao salvar um arquivo.',
  },
  {
    code: 508,
    name: 'Loop Detected',
    description: 'O servidor detectou um loop infinito ao processar a requisição.',
    whenToUse: 'Em WebDAV, com referências circulares entre recursos.',
  },
  {
    code: 510,
    name: 'Not Extended',
    description: 'São necessárias extensões adicionais para atender a requisição.',
    whenToUse: 'Raro; definido na RFC 2774 (hoje considerada histórica).',
  },
  {
    code: 511,
    name: 'Network Authentication Required',
    description: 'É preciso se autenticar para obter acesso à rede.',
    whenToUse: 'Portais cativos de Wi-Fi em hotéis e aeroportos.',
  },
  {
    code: 521,
    name: 'Web Server Is Down',
    description: 'O servidor de origem recusou a conexão.',
    whenToUse: 'Extensão da Cloudflare.',
    unofficial: true,
  },
  {
    code: 522,
    name: 'Connection Timed Out',
    description: 'A conexão com o servidor de origem expirou.',
    whenToUse: 'Extensão da Cloudflare.',
    unofficial: true,
  },
  {
    code: 599,
    name: 'Network Connect Timeout Error',
    description: 'Tempo esgotado ao conectar na rede atrás de um proxy.',
    whenToUse: 'Extensão usada por alguns proxies.',
    unofficial: true,
  },
];
