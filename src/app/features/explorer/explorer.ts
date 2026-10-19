import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpStatus, statusClassOf } from '@core/domain';
import { ExplorerStateService } from '@core/services';
import { filterStatuses } from '@core/use-cases';
import { HTTP_STATUSES, STATUS_CLASSES, catImageUrl } from '@data/index';
import { openStatusDialog } from '@shared/status-dialog/status-dialog';

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
  protected readonly state = inject(ExplorerStateService);
  private readonly dialog = inject(MatDialog);

  protected readonly classes = STATUS_CLASSES;
  protected readonly classOf = statusClassOf;
  protected readonly imageOf = catImageUrl;

  protected readonly query = signal('');
  protected readonly showUnofficial = signal(true);

  protected readonly results = computed(() =>
    filterStatuses(HTTP_STATUSES, {
      query: this.query(),
      statusClass: this.state.selectedClass(),
      includeUnofficial: this.showUnofficial(),
    }),
  );

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
