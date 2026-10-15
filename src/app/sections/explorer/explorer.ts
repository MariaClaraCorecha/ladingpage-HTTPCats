import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  HTTP_STATUSES,
  HttpStatus,
  STATUS_CLASSES,
  catImageUrl,
  statusClassOf,
} from '../../data/status-codes';
import { ExplorerState } from '../../explorer-state';
import { openStatusDialog } from '../../shared/status-dialog';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '');
}

@Component({
  selector: 'app-explorer',
  imports: [
    MatButtonModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
  templateUrl: './explorer.html',
  styleUrl: './explorer.scss',
})
export class Explorer {
  protected readonly state = inject(ExplorerState);
  private readonly dialog = inject(MatDialog);

  protected readonly classes = STATUS_CLASSES;
  protected readonly classOf = statusClassOf;
  protected readonly imageOf = catImageUrl;

  protected readonly query = signal('');
  protected readonly showUnofficial = signal(true);

  protected readonly results = computed(() => {
    const q = normalize(this.query().trim());
    const cls = this.state.selectedClass();
    return HTTP_STATUSES.filter(
      (s) =>
        (cls === null || statusClassOf(s.code) === cls) &&
        (this.showUnofficial() || !s.unofficial) &&
        (!q || normalize(`${s.code} ${s.name} ${s.description}`).includes(q)),
    );
  });

  protected readonly hasFilters = computed(
    () => !!this.query() || this.state.selectedClass() !== null || !this.showUnofficial(),
  );

  protected clearFilters(): void {
    this.query.set('');
    this.state.selectedClass.set(null);
    this.showUnofficial.set(true);
  }

  protected open(status: HttpStatus): void {
    openStatusDialog(this.dialog, status);
  }
}
