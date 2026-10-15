import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

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
    { href: '#simulador', label: 'Simulador' },
    { href: '#quiz', label: 'Quiz' },
  ];

  protected readonly dark = signal(
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false,
  );

  constructor() {
    this.applyTheme();
  }

  protected toggleTheme(): void {
    this.dark.update((d) => !d);
    this.applyTheme();
  }

  private applyTheme(): void {
    document.body.style.colorScheme = this.dark() ? 'dark' : 'light';
  }
}
