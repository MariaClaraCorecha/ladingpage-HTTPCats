export type StatusClass = 1 | 2 | 3 | 4 | 5;

export interface HttpStatus {
  code: number;
  name: string;
  /** Explicação curta, em linguagem simples. */
  description: string;
  /** Quando o servidor deve (ou costuma) responder com este código. */
  whenToUse: string;
  /** Códigos que não fazem parte da RFC oficial (extensões de servidores/serviços). */
  unofficial?: boolean;
}

export interface StatusClassInfo {
  id: StatusClass;
  range: string;
  title: string;
  summary: string;
  analogy: string;
  icon: string;
}

export const STATUS_CLASSES: StatusClassInfo[] = [
  {
    id: 1,
    range: '1xx',
    title: 'Informativos',
    summary: 'O servidor recebeu a requisição e o processo continua.',
    analogy: '"Recebi seu pedido, aguarde um momento..."',
    icon: 'info',
  },
  {
    id: 2,
    range: '2xx',
    title: 'Sucesso',
    summary: 'A requisição foi recebida, entendida e aceita.',
    analogy: '"Aqui está o que você pediu!"',
    icon: 'check_circle',
  },
  {
    id: 3,
    range: '3xx',
    title: 'Redirecionamento',
    summary: 'É preciso uma ação adicional do cliente, geralmente ir para outro endereço.',
    analogy: '"Isso não está aqui, procure ali."',
    icon: 'alt_route',
  },
  {
    id: 4,
    range: '4xx',
    title: 'Erro do cliente',
    summary: 'A requisição tem algum problema: sintaxe, permissão ou recurso inexistente.',
    analogy: '"O problema está no seu pedido."',
    icon: 'person_alert',
  },
  {
    id: 5,
    range: '5xx',
    title: 'Erro do servidor',
    summary: 'O pedido parecia válido, mas o servidor falhou ao processá-lo.',
    analogy: '"O problema é aqui comigo, desculpe."',
    icon: 'dns',
  },
];

export const HTTP_STATUSES: HttpStatus[] = [
  // 1xx
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
    description: 'O servidor recebeu a requisição e ainda está processando; nenhuma resposta ainda.',
    whenToUse: 'Em operações WebDAV demoradas, para evitar que o cliente desista por timeout.',
  },
  {
    code: 103,
    name: 'Early Hints',
    description: 'Envia cabeçalhos antecipados para o navegador pré-carregar recursos.',
    whenToUse: 'Para sugerir "Link: rel=preload" de CSS/JS enquanto a resposta final é gerada.',
  },
  // 2xx
  {
    code: 200,
    name: 'OK',
    description: 'Deu tudo certo. A resposta contém o recurso solicitado.',
    whenToUse: 'Resposta padrão de um GET bem-sucedido, ou de um POST/PUT que retorna dados.',
  },
  {
    code: 201,
    name: 'Created',
    description: 'A requisição foi atendida e um novo recurso foi criado.',
    whenToUse:
      'Após um POST que cria algo (ex.: novo usuário). Costuma vir com o cabeçalho "Location".',
  },
  {
    code: 202,
    name: 'Accepted',
    description: 'A requisição foi aceita, mas o processamento ainda não terminou.',
    whenToUse: 'Para tarefas assíncronas, como gerar um relatório que ficará pronto depois.',
  },
  {
    code: 203,
    name: 'Non-Authoritative Information',
    description: 'Sucesso, mas o conteúdo foi modificado por um proxy intermediário.',
    whenToUse: 'Quando um proxy transforma a resposta original do servidor de origem.',
  },
  {
    code: 204,
    name: 'No Content',
    description: 'Sucesso, mas não há conteúdo para retornar no corpo.',
    whenToUse: 'Após um DELETE bem-sucedido ou um PUT que não precisa devolver dados.',
  },
  {
    code: 206,
    name: 'Partial Content',
    description: 'O servidor está enviando apenas uma parte do recurso.',
    whenToUse: 'Quando o cliente usa o cabeçalho "Range", como em streaming de vídeo ou downloads.',
  },
  {
    code: 207,
    name: 'Multi-Status',
    description: 'A resposta contém vários status para várias operações independentes.',
    whenToUse: 'Em WebDAV, quando uma requisição afeta diversos recursos de uma vez.',
  },
  // 3xx
  {
    code: 300,
    name: 'Multiple Choices',
    description: 'Existem várias representações possíveis para o recurso.',
    whenToUse: 'Raro na prática; quando o cliente precisa escolher entre formatos ou idiomas.',
  },
  {
    code: 301,
    name: 'Moved Permanently',
    description: 'O recurso mudou de endereço para sempre.',
    whenToUse:
      'Ao migrar de domínio ou trocar URLs. Buscadores atualizam o link para o novo endereço.',
  },
  {
    code: 302,
    name: 'Found',
    description: 'O recurso está temporariamente em outro endereço.',
    whenToUse: 'Redirecionamentos temporários, como mandar o usuário para a tela de login.',
  },
  {
    code: 303,
    name: 'See Other',
    description: 'A resposta deve ser buscada em outra URL usando GET.',
    whenToUse: 'Após enviar um formulário via POST, para evitar reenvio ao atualizar a página.',
  },
  {
    code: 304,
    name: 'Not Modified',
    description: 'O recurso não mudou desde a última vez; use a cópia em cache.',
    whenToUse: 'Em respostas a "If-None-Match" ou "If-Modified-Since". Economiza banda.',
  },
  {
    code: 307,
    name: 'Temporary Redirect',
    description: 'Redirecionamento temporário que preserva o método HTTP original.',
    whenToUse: 'Como o 302, mas garantindo que um POST continue sendo POST no novo endereço.',
  },
  {
    code: 308,
    name: 'Permanent Redirect',
    description: 'Redirecionamento permanente que preserva o método HTTP original.',
    whenToUse: 'Como o 301, mas sem permitir que o cliente troque POST por GET.',
  },
  // 4xx
  {
    code: 400,
    name: 'Bad Request',
    description: 'O servidor não entendeu a requisição por erro de sintaxe ou dados inválidos.',
    whenToUse: 'JSON malformado, parâmetros obrigatórios ausentes ou com tipo errado.',
  },
  {
    code: 401,
    name: 'Unauthorized',
    description: 'É necessário se autenticar para acessar o recurso.',
    whenToUse: 'Token ausente, expirado ou inválido. Na prática significa "não autenticado".',
  },
  {
    code: 402,
    name: 'Payment Required',
    description: 'Reservado para uso futuro relacionado a pagamentos.',
    whenToUse: 'Algumas APIs usam quando a cota paga acabou ou a assinatura está vencida.',
  },
  {
    code: 403,
    name: 'Forbidden',
    description: 'O servidor sabe quem você é, mas você não tem permissão.',
    whenToUse: 'Usuário autenticado tentando acessar a área de administrador, por exemplo.',
  },
  {
    code: 404,
    name: 'Not Found',
    description: 'O recurso solicitado não foi encontrado.',
    whenToUse: 'URL inexistente ou registro que não existe no banco (ex.: /usuarios/9999).',
  },
  {
    code: 405,
    name: 'Method Not Allowed',
    description: 'O método HTTP usado não é suportado para este recurso.',
    whenToUse: 'Um DELETE em um endpoint que só aceita GET. Deve informar o cabeçalho "Allow".',
  },
  {
    code: 406,
    name: 'Not Acceptable',
    description: 'O servidor não consegue gerar uma resposta no formato pedido pelo cliente.',
    whenToUse: 'Cliente pede "Accept: application/xml" e a API só fala JSON.',
  },
  {
    code: 408,
    name: 'Request Timeout',
    description: 'O cliente demorou demais para enviar a requisição completa.',
    whenToUse: 'Conexões ociosas por muito tempo; o servidor decide encerrá-las.',
  },
  {
    code: 409,
    name: 'Conflict',
    description: 'A requisição conflita com o estado atual do recurso.',
    whenToUse: 'Cadastro com e-mail já existente ou edição concorrente de um mesmo registro.',
  },
  {
    code: 410,
    name: 'Gone',
    description: 'O recurso existia, mas foi removido permanentemente.',
    whenToUse: 'Conteúdo descontinuado de propósito; diferente do 404, aqui a remoção é definitiva.',
  },
  {
    code: 411,
    name: 'Length Required',
    description: 'O servidor exige o cabeçalho "Content-Length".',
    whenToUse: 'Quando o cliente envia um corpo sem informar seu tamanho.',
  },
  {
    code: 412,
    name: 'Precondition Failed',
    description: 'Uma pré-condição enviada nos cabeçalhos não foi satisfeita.',
    whenToUse: 'Ao usar "If-Match" com um ETag desatualizado (controle de concorrência otimista).',
  },
  {
    code: 413,
    name: 'Payload Too Large',
    description: 'O corpo da requisição é maior do que o servidor aceita.',
    whenToUse: 'Upload de arquivo acima do limite configurado.',
  },
  {
    code: 414,
    name: 'URI Too Long',
    description: 'A URL é longa demais para o servidor processar.',
    whenToUse: 'Muitos parâmetros na query string; geralmente é melhor usar POST com corpo.',
  },
  {
    code: 415,
    name: 'Unsupported Media Type',
    description: 'O formato do corpo enviado não é suportado.',
    whenToUse: 'Enviar "Content-Type: text/plain" para uma API que só aceita JSON.',
  },
  {
    code: 416,
    name: 'Range Not Satisfiable',
    description: 'O intervalo pedido no cabeçalho "Range" não existe no recurso.',
    whenToUse: 'Pedir os bytes 5000-6000 de um arquivo que tem apenas 1000 bytes.',
  },
  {
    code: 417,
    name: 'Expectation Failed',
    description: 'O servidor não consegue atender ao cabeçalho "Expect".',
    whenToUse: 'Quando o "Expect: 100-continue" não pode ser honrado.',
  },
  {
    code: 418,
    name: "I'm a teapot",
    description: 'Sou um bule de chá e me recuso a passar café. ☕',
    whenToUse:
      'Piada de 1º de abril (RFC 2324) que virou lenda. Alguns serviços usam como easter egg.',
  },
  {
    code: 421,
    name: 'Misdirected Request',
    description: 'A requisição chegou a um servidor que não pode respondê-la.',
    whenToUse: 'Conexões HTTP/2 reaproveitadas para um domínio que o servidor não atende.',
  },
  {
    code: 422,
    name: 'Unprocessable Entity',
    description: 'A sintaxe está correta, mas os dados não passam nas regras de validação.',
    whenToUse: 'JSON válido, mas com e-mail em formato errado ou idade negativa.',
  },
  {
    code: 423,
    name: 'Locked',
    description: 'O recurso está bloqueado.',
    whenToUse: 'Em WebDAV, quando outro usuário está editando o arquivo.',
  },
  {
    code: 424,
    name: 'Failed Dependency',
    description: 'A operação falhou porque dependia de outra que também falhou.',
    whenToUse: 'Em WebDAV, em operações encadeadas.',
  },
  {
    code: 425,
    name: 'Too Early',
    description: 'O servidor não quer processar uma requisição que pode ser repetida (replay).',
    whenToUse: 'Requisições enviadas cedo demais em conexões TLS 1.3 com "early data".',
  },
  {
    code: 426,
    name: 'Upgrade Required',
    description: 'O cliente precisa trocar para outro protocolo.',
    whenToUse: 'Servidor exige uma versão mais nova do protocolo, informada em "Upgrade".',
  },
  {
    code: 428,
    name: 'Precondition Required',
    description: 'O servidor exige que a requisição seja condicional.',
    whenToUse: 'Obrigar o envio de "If-Match" para evitar sobrescrever alterações alheias.',
  },
  {
    code: 429,
    name: 'Too Many Requests',
    description: 'O cliente enviou requisições demais em pouco tempo.',
    whenToUse: 'Rate limiting. Costuma vir com o cabeçalho "Retry-After".',
  },
  {
    code: 431,
    name: 'Request Header Fields Too Large',
    description: 'Os cabeçalhos da requisição são grandes demais.',
    whenToUse: 'Cookies acumulados que ultrapassam o limite do servidor.',
  },
  {
    code: 444,
    name: 'No Response',
    description: 'O servidor fechou a conexão sem enviar resposta alguma.',
    whenToUse: 'Extensão do Nginx para descartar requisições maliciosas.',
    unofficial: true,
  },
  {
    code: 450,
    name: 'Blocked by Windows Parental Controls',
    description: 'Acesso bloqueado pelo controle parental do Windows.',
    whenToUse: 'Extensão da Microsoft.',
    unofficial: true,
  },
  {
    code: 451,
    name: 'Unavailable For Legal Reasons',
    description: 'O recurso não pode ser exibido por motivos legais.',
    whenToUse: 'Censura ou ordem judicial. O número é uma homenagem ao livro "Fahrenheit 451".',
  },
  {
    code: 497,
    name: 'HTTP Request Sent to HTTPS Port',
    description: 'Uma requisição HTTP simples foi enviada para a porta HTTPS.',
    whenToUse: 'Extensão do Nginx.',
    unofficial: true,
  },
  {
    code: 499,
    name: 'Client Closed Request',
    description: 'O cliente fechou a conexão antes de o servidor responder.',
    whenToUse: 'Extensão do Nginx, comum em logs quando o usuário cancela o carregamento.',
    unofficial: true,
  },
  // 5xx
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

export function statusClassOf(code: number): StatusClass {
  return Math.floor(code / 100) as StatusClass;
}

export function catImageUrl(code: number): string {
  return `https://http.cat/${code}.jpg`;
}

export function findStatus(code: number): HttpStatus | undefined {
  return HTTP_STATUSES.find((s) => s.code === code);
}
