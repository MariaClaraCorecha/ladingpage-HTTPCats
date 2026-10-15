import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { SCENARIOS, Scenario } from '../../data/scenarios';
import { catImageUrl, findStatus, statusClassOf } from '../../data/status-codes';

const QUESTION_COUNT = 8;


const DISTRACTOR_POOL = [
  200, 201, 202, 204, 301, 302, 304, 307, 400, 401, 403, 404, 405, 409, 410, 418, 422, 429, 500,
  502, 503, 504,
];

interface Question {
  scenario: Scenario;
  options: number[];
}

function shuffle<T>(items: readonly T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


function buildOptions(answer: number): number[] {
  const others = shuffle(DISTRACTOR_POOL.filter((c) => c !== answer));
  const sameClass = others.filter((c) => statusClassOf(c) === statusClassOf(answer)).slice(0, 2);
  const rest = others.filter((c) => !sameClass.includes(c)).slice(0, 3 - sameClass.length);
  return shuffle([answer, ...sameClass, ...rest]);
}

function buildQuestions(): Question[] {
  return shuffle(SCENARIOS)
    .slice(0, QUESTION_COUNT)
    .map((scenario) => ({ scenario, options: buildOptions(scenario.status) }));
}

@Component({
  selector: 'app-quiz',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  protected readonly questions = signal(buildQuestions());
  protected readonly index = signal(0);
  protected readonly picked = signal<number | null>(null);
  protected readonly score = signal(0);
  protected readonly finished = signal(false);

  protected readonly current = computed(() => this.questions()[this.index()]);
  protected readonly total = computed(() => this.questions().length);
  protected readonly progress = computed(
    () => ((this.index() + (this.picked() === null ? 0 : 1)) / this.total()) * 100,
  );
  protected readonly isLast = computed(() => this.index() === this.total() - 1);


  protected readonly resultCode = computed(() => {
    const ratio = this.score() / this.total();
    if (ratio === 1) return 200;
    if (ratio >= 0.5) return 206;
    return 400;
  });

  protected readonly resultMessage = computed(() => {
    switch (this.resultCode()) {
      case 200:
        return 'Perfeito! Você fala HTTP fluentemente.';
      case 206:
        return 'Bom trabalho! Um conteúdo parcial... dá para chegar no 200.';
      default:
        return 'Requisição mal formada! Revise as classes e tente de novo.';
    }
  });

  protected readonly nameOf = (code: number) => findStatus(code)?.name ?? '';
  protected readonly imageOf = catImageUrl;

  protected pick(code: number): void {
    if (this.picked() !== null) return;
    this.picked.set(code);
    if (code === this.current().scenario.status) this.score.update((s) => s + 1);
  }

  protected next(): void {
    if (this.isLast()) {
      this.finished.set(true);
      return;
    }
    this.index.update((i) => i + 1);
    this.picked.set(null);
  }

  protected restart(): void {
    this.questions.set(buildQuestions());
    this.index.set(0);
    this.picked.set(null);
    this.score.set(0);
    this.finished.set(false);
  }
}
