import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { COMPARISONS } from '../../data/comparisons';
import { catImageUrl, statusClassOf } from '../../data/status-codes';
import { StatusChip } from '../../shared/status-chip';

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
