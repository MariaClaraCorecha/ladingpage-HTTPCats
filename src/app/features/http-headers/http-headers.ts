import { Component, computed, signal } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { HeaderDirection } from '@core/domain';
import { HTTP_HEADERS } from '@data/index';
import { StatusChip } from '@shared/status-chip/status-chip';

type DirectionFilter = 'all' | 'request' | 'response';

@Component({
  selector: 'app-header-guide',
  imports: [MatButtonToggleModule, MatIconModule, StatusChip],
  templateUrl: './http-headers.html',
  styleUrl: './http-headers.scss',
})
export class HeaderGuide {
  protected readonly filter = signal<DirectionFilter>('all');

  protected readonly headers = computed(() => {
    const f = this.filter();
    return HTTP_HEADERS.filter((h) => f === 'all' || h.direction === f || h.direction === 'both');
  });

  protected readonly directionInfo: Record<HeaderDirection, { icon: string; label: string }> = {
    request: { icon: 'north_east', label: 'Requisição' },
    response: { icon: 'south_west', label: 'Resposta' },
    both: { icon: 'sync_alt', label: 'Ambos' },
  };
}
