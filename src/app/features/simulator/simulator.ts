import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Scenario, statusClassOf } from '../../core/domain/index';
import { formatRequest, formatResponse } from '../../core/use-cases/index';
import { SCENARIOS, catImageUrl, findStatus } from '../../data/index';

type Phase = 'idle' | 'sending' | 'done';

@Component({
  selector: 'app-simulator',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSelectModule,
  ],
  templateUrl: './simulator.html',
  styleUrl: './simulator.scss',
})
export class Simulator {
  protected readonly scenarios = SCENARIOS;
  protected readonly selected = signal<Scenario>(SCENARIOS[0]);
  protected readonly phase = signal<Phase>('idle');

  private timer?: ReturnType<typeof setTimeout>;

  protected readonly statusName = computed(() => findStatus(this.selected().status)?.name ?? '');
  protected readonly statusClass = computed(() => statusClassOf(this.selected().status));
  protected readonly image = computed(() => catImageUrl(this.selected().status));

  protected readonly requestText = computed(() => formatRequest(this.selected()));
  protected readonly responseText = computed(() =>
    formatResponse(this.selected(), this.statusName()),
  );

  constructor() {
    inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
  }

  protected select(scenario: Scenario): void {
    clearTimeout(this.timer);
    this.selected.set(scenario);
    this.phase.set('idle');
  }

  protected send(): void {
    clearTimeout(this.timer);
    this.phase.set('sending');
    // Uma pequena espera só para dar a sensação de que a requisição "viajou" até o servidor.
    this.timer = setTimeout(() => this.phase.set('done'), 700);
  }
}
