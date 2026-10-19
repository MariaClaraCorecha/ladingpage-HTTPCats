import { Component, inject } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AnchorScrollService, ThemeService } from '../../core/services/index';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  protected readonly links = [
    { href: '#fundamentos', label: 'Fundamentos' },
    { href: '#classes', label: 'Classes' },
    { href: '#explorador', label: 'Explorador' },
    { href: '#pegadinhas', label: 'Pegadinhas' },
    { href: '#cabecalhos', label: 'Cabeçalhos' },
    { href: '#simulador', label: 'Simulador' },
    { href: '#na-pratica', label: 'Na prática' },
    { href: '#quiz', label: 'Quiz' },
    { href: '#faq', label: 'FAQ' },
  ];

  protected readonly theme = inject(ThemeService);
  protected readonly active = inject(AnchorScrollService).active;

  constructor() {
    inject(AnchorScrollService).track(this.links.map((l) => l.href.slice(1)));
  }
}
