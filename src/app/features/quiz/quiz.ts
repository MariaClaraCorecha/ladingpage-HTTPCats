import { Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { buildQuizQuestions } from '@core/use-cases';
import { SCENARIOS } from '@data/index';
import { QuizQuestion } from './quiz-question/quiz-question';
import { QuizResult } from './quiz-result/quiz-result';

@Component({
  selector: 'app-quiz',
  imports: [MatIconModule, MatProgressBarModule, QuizQuestion, QuizResult],
  templateUrl: './quiz.html',
  styleUrl: './quiz.scss',
})
export class Quiz {
  protected readonly questions = signal(buildQuizQuestions(SCENARIOS));
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
    this.questions.set(buildQuizQuestions(SCENARIOS));
    this.index.set(0);
    this.picked.set(null);
    this.score.set(0);
    this.finished.set(false);
  }
}
