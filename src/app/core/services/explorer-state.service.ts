import { Injectable, inject, signal } from '@angular/core';
import { StatusClass } from '@core/domain';
import { AnchorScrollService } from './anchor-scroll.service';

@Injectable({ providedIn: 'root' })
export class ExplorerStateService {
  private readonly anchors = inject(AnchorScrollService);
  readonly selectedClass = signal<StatusClass | null>(null);

  focusClass(id: StatusClass): void {
    this.selectedClass.set(id);
    this.anchors.scrollTo('explorador');
  }
}
