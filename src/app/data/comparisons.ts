export interface ComparisonSide {
  code: number;
  label: string;
  text: string;
}


export interface Comparison {
  id: string;
  question: string;
  left: ComparisonSide;
  right: ComparisonSide;
  rule: string;
}

export const COMPARISONS: Comparison[] = [
  {
    id: 'auth',
    question: 'Não autenticado ou sem permissão?',
    left: {
      code: 401,
      label: '"Quem é você?"',
      text: 'O servidor não sabe quem está pedindo: falta o token, ou ele expirou ou é inválido.',
    },
    right: {
      code: 403,
      label: '"Sei quem você é, mas não pode."',
      text: 'O usuário está identificado, mas não tem permissão para aquele recurso.',
    },
    rule: 'Sem login → 401. Logado, mas sem permissão → 403. Fazer login de novo não resolve um 403.',
  },
  {
    id: 'missing',
    question: 'Não existe ou foi removido?',
    left: {
      code: 404,
      label: '"Não encontrei."',
      text: 'Nada neste endereço. Pode nunca ter existido, ou o servidor prefere não dizer.',
    },
    right: {
      code: 410,
      label: '"Existiu, mas acabou."',
      text: 'O recurso foi removido de propósito e não vai voltar.',
    },
    rule: 'Na dúvida, 404. Use 410 quando a remoção for definitiva: buscadores tiram a página do índice mais rápido.',
  },
  {
    id: 'redirect',
    question: 'Mudança para sempre ou só por agora?',
    left: {
      code: 301,
      label: '"Mudei de endereço."',
      text: 'Redirecionamento permanente. Navegadores e buscadores passam a usar a nova URL.',
    },
    right: {
      code: 302,
      label: '"Por enquanto, estou ali."',
      text: 'Redirecionamento temporário. A URL original continua sendo a oficial.',
    },
    rule: 'Migrou o site → 301. Desvio temporário (ex.: login) → 302. Precisa manter o POST? Use 308 ou 307.',
  },
  {
    id: 'validation',
    question: 'Pedido quebrado ou dados inválidos?',
    left: {
      code: 400,
      label: '"Não entendi o pedido."',
      text: 'A requisição está malformada: JSON quebrado, parâmetro com tipo errado.',
    },
    right: {
      code: 422,
      label: '"Entendi, mas não faz sentido."',
      text: 'O formato está certo, mas os dados violam alguma regra (e-mail inválido, idade negativa).',
    },
    rule: 'Não deu para ler → 400. Deu para ler, mas não passou na validação → 422.',
  },
  {
    id: 'server',
    question: 'Bug ou indisponibilidade temporária?',
    left: {
      code: 500,
      label: '"Algo quebrou aqui."',
      text: 'Erro inesperado no código do servidor, como uma exceção não tratada.',
    },
    right: {
      code: 503,
      label: '"Volte mais tarde."',
      text: 'O servidor está em manutenção ou sobrecarregado, mas deve voltar.',
    },
    rule: 'Tentar de novo não resolve um bug (500). Um 503 com "Retry-After" diz quando vale a pena tentar.',
  },
  {
    id: 'gateway',
    question: 'Resposta ruim ou nenhuma resposta?',
    left: {
      code: 502,
      label: '"Recebi uma resposta inválida."',
      text: 'O proxy falou com a aplicação, mas ela respondeu algo sem sentido ou derrubou a conexão.',
    },
    right: {
      code: 504,
      label: '"Cansei de esperar."',
      text: 'O proxy esperou a aplicação responder e o tempo limite acabou.',
    },
    rule: 'Ambos vêm de um intermediário (Nginx, load balancer). 502 = aplicação caída/quebrada; 504 = aplicação lenta.',
  },
];
