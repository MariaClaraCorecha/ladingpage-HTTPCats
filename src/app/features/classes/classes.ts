import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { StatusClass } from '@core/domain';
import { ExplorerStateService } from '@core/services';
import { countByClass } from '@core/use-cases';
import { HTTP_STATUSES, STATUS_CLASSES } from '@data/index';

@Component({
  selector: 'app-classes',
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class Classes {
  private readonly explorer = inject(ExplorerStateService);

  protected readonly classes = STATUS_CLASSES.map((c) => ({
    ...c,
    count: countByClass(HTTP_STATUSES, c.id),
  }));

  protected explore(id: StatusClass): void {
    this.explorer.focusClass(id);
  }
}
