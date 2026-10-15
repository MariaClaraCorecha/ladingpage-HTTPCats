import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { catImageUrl } from '../../data/status-codes';

@Component({
  selector: 'app-hero',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './hero.html',
  styleUrl: './hero.scss',
})
export class Hero {
  private readonly featured = [200, 404, 418, 500, 301, 403];
  private readonly index = signal(0);

  protected readonly code = computed(() => this.featured[this.index()]);
  protected readonly image = computed(() => catImageUrl(this.code()));

  protected next(): void {
    this.index.update((i) => (i + 1) % this.featured.length);
  }
}
