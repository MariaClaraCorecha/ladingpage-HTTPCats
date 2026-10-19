import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { DEBUG_TIPS, PRACTICES } from '../../data/index';

@Component({
  selector: 'app-practices',
  imports: [MatIconModule, MatTabsModule],
  templateUrl: './practices.html',
  styleUrl: './practices.scss',
})
export class Practices {
  protected readonly practices = PRACTICES;
  protected readonly debugTips = DEBUG_TIPS;
}
