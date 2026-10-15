import { Component, signal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';

const THEME_KEY = 'http-cats-theme';

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

  protected readonly dark = signal(this.initialTheme());

  constructor() {
    this.applyTheme();
  }

  protected toggleTheme(): void {
    this.dark.update((d) => !d);
    this.applyTheme();
    try {
      localStorage.setItem(THEME_KEY, this.dark() ? 'dark' : 'light');
    } catch {
      // Armazenamento indisponível (ex.: modo privado); o tema vale só para esta visita.
    }
  }

  private initialTheme(): boolean {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private applyTheme(): void {
    // Aplicado no <html> para que os tokens light-dark() do Material valham na página inteira.
    document.documentElement.style.colorScheme = this.dark() ? 'dark' : 'light';
  }
}
