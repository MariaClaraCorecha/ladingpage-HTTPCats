export interface Practice {
  icon: string;
  title: string;
  text: string;
  /** O jeito recomendado. */
  good: string;
  /** O jeito que causa problemas. */
  bad: string;
}

export const PRACTICES: Practice[] = [
  {
    icon: 'visibility',
    title: 'Não esconda erros atrás de um 200',
    text: 'Ferramentas de monitoramento, caches e o próprio fetch confiam no código de status.',
    good: '404 Not Found\n{ "erro": "Produto não encontrado" }',
    bad: '200 OK\n{ "sucesso": false, "erro": "..." }',
  },
  {
    icon: 'add_circle',
    title: 'Criou algo? Responda 201',
    text: 'E informe onde o novo recurso está, no cabeçalho Location.',
    good: '201 Created\nLocation: /api/usuarios/42',
    bad: '200 OK',
  },
  {
    icon: 'block',
    title: 'Sem corpo? Use 204',
    text: 'Após um DELETE ou uma atualização que não precisa devolver dados.',
    good: '204 No Content',
    bad: '200 OK\n{ }',
  },
  {
    icon: 'rule',
    title: 'Explique o erro de validação',
    text: 'Diga qual campo falhou e por quê, para o front-end mostrar a mensagem certa.',
    good: '422 Unprocessable Entity\n{ "campo": "email", "erro": "formato inválido" }',
    bad: '400 Bad Request\n{ "erro": "erro" }',
  },
  {
    icon: 'timer',
    title: 'Ajude o cliente a esperar',
    text: 'Em limites de uso ou manutenção, informe quando ele pode tentar de novo.',
    good: '429 Too Many Requests\nRetry-After: 60',
    bad: '500 Internal Server Error',
  },
  {
    icon: 'shield_lock',
    title: 'Não vaze detalhes no 500',
    text: 'Stack traces ajudam atacantes. Mostre uma mensagem genérica e guarde os detalhes no log.',
    good: '500 Internal Server Error\n{ "erro": "Erro interno", "id": "a1b2c3" }',
    bad: '500 Internal Server Error\nNullPointerException at UserService.java:42 ...',
  },
];

export interface DebugTip {
  icon: string;
  title: string;
  text: string;
  code: string;
}

export const DEBUG_TIPS: DebugTip[] = [
  {
    icon: 'developer_mode',
    title: 'DevTools do navegador',
    text: 'Abra com F12, vá na aba Rede (Network) e veja a coluna Status de cada requisição. Dá para filtrar digitando no campo de busca:',
    code: 'status-code:404\n-status-code:200',
  },
  {
    icon: 'terminal',
    title: 'curl no terminal',
    text: 'Mostra a linha de status e os cabeçalhos da resposta, sem navegador no meio.',
    code: 'curl -i https://http.cat/404   # status + cabeçalhos + corpo\ncurl -I https://http.cat/404   # só os cabeçalhos\ncurl -L http://exemplo.com     # segue redirecionamentos',
  },
  {
    icon: 'javascript',
    title: 'fetch no JavaScript',
    text: 'Atenção: o fetch só rejeita a Promise em falhas de rede. Um 404 ou 500 chega normalmente, por isso confira res.ok.',
    code: "const res = await fetch('/api/produtos/9999');\nif (!res.ok) {\n  console.log(res.status); // 404\n}",
  },
  {
    icon: 'code',
    title: 'HttpClient do Angular',
    text: 'Respostas fora da faixa 2xx viram um HttpErrorResponse, com o código em error.status.',
    code: "this.http.get('/api/perfil').subscribe({\n  error: (err: HttpErrorResponse) => {\n    if (err.status === 401) this.router.navigate(['/login']);\n  },\n});",
  },
];
