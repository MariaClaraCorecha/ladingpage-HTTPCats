import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HttpStatus, STATUS_CLASSES, catImageUrl, statusClassOf } from '../data/status-codes';

@Component({
  selector: 'app-status-dialog',
  imports: [MatButtonModule, MatDialogModule, MatIconModule],
  templateUrl: './status-dialog.html',
  styleUrl: './status-dialog.scss',
})
export class StatusDialog {
  protected readonly status = inject<HttpStatus>(MAT_DIALOG_DATA);
  protected readonly cls = statusClassOf(this.status.code);
  protected readonly classInfo = STATUS_CLASSES.find((c) => c.id === this.cls)!;
  protected readonly image = catImageUrl(this.status.code);
  protected readonly mdnUrl = `https://developer.mozilla.org/pt-BR/docs/Web/HTTP/Reference/Status/${this.status.code}`;
}

/** Abre o diálogo de detalhes de um status com o mesmo tamanho em todas as seções. */
export function openStatusDialog(dialog: MatDialog, status: HttpStatus): void {
  dialog.open(StatusDialog, {
    data: status,
    width: 'calc(100vw - 32px)',
    maxWidth: '640px',
    autoFocus: 'dialog',
  });
}
