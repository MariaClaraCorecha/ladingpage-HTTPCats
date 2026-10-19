import { Injectable, signal } from '@angular/core';

const THEME_KEY = 'http-cats-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly dark = signal(this.initialTheme());

  constructor() {
    this.apply();
  }

  toggle(): void {
    this.dark.update((d) => !d);
    this.apply();
    try {
      localStorage.setItem(THEME_KEY, this.dark() ? 'dark' : 'light');
    } catch {}
  }

  private initialTheme(): boolean {
    try {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved === 'dark';
    } catch {}
    return window.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false;
  }

  private apply(): void {
    document.documentElement.style.colorScheme = this.dark() ? 'dark' : 'light';
  }
}
