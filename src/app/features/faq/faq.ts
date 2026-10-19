import { Component } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { FAQ } from '@data/index';

@Component({
  selector: 'app-faq',
  imports: [MatExpansionModule, MatIconModule],
  templateUrl: './faq.html',
  styleUrl: './faq.scss',
})
export class Faq {
  protected readonly items = FAQ;
}
