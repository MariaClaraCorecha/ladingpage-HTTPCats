import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { quizResult } from '../../../core/use-cases/index';
import { catImageUrl, findStatus } from '../../../data/index';

@Component({
  selector: 'app-quiz-result',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './quiz-result.html',
  styleUrl: './quiz-result.scss',
})
export class QuizResult {
  readonly score = input.required<number>();
  readonly total = input.required<number>();

  readonly restart = output<void>();

  protected readonly result = computed(() => quizResult(this.score(), this.total()));
  protected readonly statusName = computed(() => findStatus(this.result().code)?.name ?? '');
  protected readonly image = computed(() => catImageUrl(this.result().code));
}
