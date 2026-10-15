import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_STATUSES, STATUS_CLASSES, StatusClass, statusClassOf } from '../../data/status-codes';
import { ExplorerState } from '../../explorer-state';

@Component({
  selector: 'app-classes',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class Classes {
  private readonly explorer = inject(ExplorerState);

  protected readonly classes = STATUS_CLASSES.map((c) => ({
    ...c,
    count: HTTP_STATUSES.filter((s) => statusClassOf(s.code) === c.id).length,
  }));

  protected explore(id: StatusClass): void {
    this.explorer.focusClass(id);
  }
}
