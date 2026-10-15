export type HeaderDirection = 'request' | 'response' | 'both';

export interface HeaderInfo {
  name: string;
  direction: HeaderDirection;
  description: string;
  example: string;
  /** Códigos de status em que este cabeçalho costuma aparecer. */
  codes: number[];
}

export const HEADERS: HeaderInfo[] = [
  {
    name: 'Content-Type',
    direction: 'both',
    description: 'Diz em que formato está o corpo da mensagem.',
    example: 'Content-Type: application/json; charset=utf-8',
    codes: [200, 201, 415],
  },
  {
    name: 'Accept',
    direction: 'request',
    description: 'Informa quais formatos o cliente aceita receber.',
    example: 'Accept: application/json',
    codes: [406],
  },
  {
    name: 'Authorization',
    direction: 'request',
    description: 'Leva as credenciais do cliente, como um token JWT.',
    example: 'Authorization: Bearer eyJhbGciOi...',
    codes: [401, 403],
  },
  {
    name: 'WWW-Authenticate',
    direction: 'response',
    description: 'Explica ao cliente como ele deve se autenticar.',
    example: 'WWW-Authenticate: Bearer realm="api"',
    codes: [401],
  },
  {
    name: 'Location',
    direction: 'response',
    description: 'Aponta para onde ir: o recurso recém-criado ou o novo endereço.',
    example: 'Location: /api/usuarios/42',
    codes: [201, 301, 302, 303, 307, 308],
  },
  {
    name: 'Retry-After',
    direction: 'response',
    description: 'Quantos segundos esperar (ou até que data) antes de tentar de novo.',
    example: 'Retry-After: 120',
    codes: [429, 503],
  },
  {
    name: 'Cache-Control',
    direction: 'both',
    description: 'Define se e por quanto tempo a resposta pode ser guardada em cache.',
    example: 'Cache-Control: public, max-age=3600',
    codes: [200, 304],
  },
  {
    name: 'ETag / If-None-Match',
    direction: 'both',
    description:
      'O servidor rotula a versão do recurso; o cliente devolve o rótulo para saber se mudou.',
    example: 'ETag: "abc123"\nIf-None-Match: "abc123"',
    codes: [304, 412],
  },
  {
    name: 'Allow',
    direction: 'response',
    description: 'Lista os métodos HTTP aceitos por aquele endereço.',
    example: 'Allow: GET, POST',
    codes: [405],
  },
  {
    name: 'Range / Content-Range',
    direction: 'both',
    description: 'Pede e entrega só um pedaço do arquivo, como em vídeos e downloads.',
    example: 'Range: bytes=0-1023\nContent-Range: bytes 0-1023/5000',
    codes: [206, 416],
  },
];
