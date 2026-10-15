import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { SCENARIOS, Scenario } from '../../data/scenarios';
import { catImageUrl, findStatus, statusClassOf } from '../../data/status-codes';

type Phase = 'idle' | 'sending' | 'done';

function formatHeaders(headers: Record<string, string>): string[] {
  return Object.entries(headers).map(([key, value]) => `${key}: ${value}`);
}

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

  protected readonly requestText = computed(() => {
    const s = this.selected();
    const lines = [`${s.method} ${s.path} HTTP/1.1`, ...formatHeaders(s.requestHeaders)];
    if (s.requestBody) lines.push('', s.requestBody);
    return lines.join('\n');
  });

  protected readonly responseText = computed(() => {
    const s = this.selected();
    const lines = [
      `HTTP/1.1 ${s.status} ${this.statusName()}`,
      ...formatHeaders(s.responseHeaders),
    ];
    if (s.responseBody) lines.push('', s.responseBody);
    return lines.join('\n');
  });

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
