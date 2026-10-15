import { Component, computed, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { findStatus, statusClassOf } from '../data/status-codes';
import { openStatusDialog } from './status-dialog';


@Component({
  selector: 'app-status-chip',
  imports: [MatTooltipModule],
  templateUrl: './status-chip.html',
  styleUrl: './status-chip.scss',
})
export class StatusChip {
  readonly code = input.required<number>();

  private readonly dialog = inject(MatDialog);

  protected readonly status = computed(() => findStatus(this.code()));
  protected readonly cls = computed(() => statusClassOf(this.code()));

  protected open(): void {
    const status = this.status();
    if (status) openStatusDialog(this.dialog, status);
  }
}
