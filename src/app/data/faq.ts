import { FaqItem } from '@core/domain';

export const FAQ: FaqItem[] = [
  {
    question: 'Um 404 é sempre algo ruim?',
    answer:
      'Não. Ele é a resposta correta quando o recurso não existe. Ruim é um 404 inesperado, como um link quebrado no seu próprio site.',
  },
  {
    question: 'Por que alguns sites respondem 404 em vez de 403?',
    answer:
      'Por segurança. Um 403 confirma que o recurso existe; um 404 não revela nada. O GitHub faz isso com repositórios privados, por exemplo.',
  },
  {
    question: 'Posso inventar meus próprios códigos?',
    answer:
      'Tecnicamente sim, e serviços como Nginx (499) e Cloudflare (521, 522) fazem isso. Mas clientes que não conhecem o código o tratam como o x00 da classe (um 499 vira 400). Prefira os códigos oficiais.',
  },
  {
    question: 'Por que às vezes vejo só "200", sem o "OK"?',
    answer:
      'A frase de motivo ("OK", "Not Found") existe só no HTTP/1.1. No HTTP/2 e no HTTP/3 a resposta carrega apenas o número.',
  },
  {
    question: 'O fetch do JavaScript dá erro quando recebe um 404?',
    answer:
      'Não. A Promise do fetch só é rejeitada em falhas de rede. Para qualquer resposta do servidor, inclusive 404 e 500, você precisa verificar res.ok ou res.status.',
  },
  {
    question: 'Um 3xx é um erro?',
    answer:
      'Não. Ele só diz que o cliente precisa de mais um passo, normalmente ir para outro endereço. O navegador segue a maioria dos redirecionamentos sozinho.',
  },
  {
    question: 'Para que servem os códigos 1xx se quase nunca os vejo?',
    answer:
      'São respostas provisórias, enviadas antes da resposta final. O 101 abre conexões WebSocket e o 103 permite ao navegador pré-carregar CSS e JS mais cedo.',
  },
  {
    question: 'O 418 existe de verdade?',
    answer:
      'Ele nasceu como piada de 1º de abril na RFC 2324 (1998). A especificação atual do HTTP (RFC 9110) reserva o número para que ninguém o reutilize, então o bule de chá segue vivo.',
  },
  {
    question: 'De onde vêm as imagens de gato?',
    answer:
      'Da API pública http.cat, que tem uma foto para cada código de status. Basta acessar https://http.cat/ seguido do número.',
  },
];
