import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { statusClassOf } from '@core/domain';
import { COMPARISONS, catImageUrl } from '@data/index';
import { StatusChip } from '@shared/status-chip/status-chip';

@Component({
  selector: 'app-comparisons',
  imports: [MatIconModule, StatusChip],
  templateUrl: './comparisons.html',
  styleUrl: './comparisons.scss',
})
export class Comparisons {
  protected readonly comparisons = COMPARISONS;
  protected readonly classOf = statusClassOf;
  protected readonly imageOf = catImageUrl;
}
