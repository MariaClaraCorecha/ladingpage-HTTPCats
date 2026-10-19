import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { QuizQuestion as Question } from '@core/use-cases';
import { catImageUrl, findStatus } from '@data/index';

@Component({
  selector: 'app-quiz-question',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './quiz-question.html',
  styleUrl: './quiz-question.scss',
})
export class QuizQuestion {
  readonly question = input.required<Question>();
  readonly picked = input<number | null>(null);
  readonly isLast = input(false);

  readonly pick = output<number>();
  readonly next = output<void>();

  protected readonly nameOf = (code: number) => findStatus(code)?.name ?? '';
  protected readonly imageOf = catImageUrl;
}
