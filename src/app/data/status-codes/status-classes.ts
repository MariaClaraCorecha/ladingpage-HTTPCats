import { StatusClassInfo } from '@core/domain';

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
