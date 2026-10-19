import { HttpStatus } from '@core/domain';

// 2xx — Sucesso
export const SUCCESS_STATUSES: HttpStatus[] = [
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
];
