import { Injectable, signal } from '@angular/core';
import { StatusClass } from './data/status-codes';


@Injectable({ providedIn: 'root' })
export class ExplorerState {
  readonly selectedClass = signal<StatusClass | null>(null);

  focusClass(id: StatusClass): void {
    this.selectedClass.set(id);
    document.getElementById('explorador')?.scrollIntoView({ behavior: 'smooth' });
  }
}
