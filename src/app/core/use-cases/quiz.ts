import { Scenario, statusClassOf } from '../domain/index';

export interface QuizQuestion {
  scenario: Scenario;
  options: number[];
}

export interface QuizResult {
  code: number;
  message: string;
}

const QUESTION_COUNT = 8;

const DISTRACTOR_POOL = [
  200, 201, 202, 204, 301, 302, 304, 307, 400, 401, 403, 404, 405, 409, 410, 418, 422, 429, 500,
  502, 503, 504,
];

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

// Prioriza alternativas da mesma classe da resposta para o quiz não ficar óbvio.
function buildOptions(answer: number): number[] {
  const others = shuffle(DISTRACTOR_POOL.filter((c) => c !== answer));
  const sameClass = others.filter((c) => statusClassOf(c) === statusClassOf(answer)).slice(0, 2);
  const rest = others.filter((c) => !sameClass.includes(c)).slice(0, 3 - sameClass.length);
  return shuffle([answer, ...sameClass, ...rest]);
}

export function buildQuizQuestions(scenarios: readonly Scenario[]): QuizQuestion[] {
  return shuffle(scenarios)
    .slice(0, QUESTION_COUNT)
    .map((scenario) => ({ scenario, options: buildOptions(scenario.status) }));
}

export function quizResult(score: number, total: number): QuizResult {
  const ratio = score / total;
  if (ratio === 1) return { code: 200, message: 'Perfeito! Você fala HTTP fluentemente.' };
  if (ratio >= 0.5) {
    return { code: 206, message: 'Bom trabalho! Um conteúdo parcial... dá para chegar no 200.' };
  }
  return { code: 400, message: 'Requisição mal formada! Revise as classes e tente de novo.' };
}
