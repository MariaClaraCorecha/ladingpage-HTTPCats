import { Injectable, inject, signal } from '@angular/core';
import { AnchorScroll } from './anchor-scroll';
import { StatusClass } from './data/status-codes';


@Injectable({ providedIn: 'root' })
export class ExplorerState {
  private readonly anchors = inject(AnchorScroll);
  readonly selectedClass = signal<StatusClass | null>(null);

  focusClass(id: StatusClass): void {
    this.selectedClass.set(id);
    this.anchors.scrollTo('explorador');
  }
}
