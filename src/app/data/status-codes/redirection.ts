import { HttpStatus } from '@core/domain';

// 3xx — Redirecionamento
export const REDIRECTION_STATUSES: HttpStatus[] = [
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
];
