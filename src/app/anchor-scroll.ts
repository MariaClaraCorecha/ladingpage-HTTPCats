import { Injectable, signal } from '@angular/core';

// Distância do topo usada para decidir qual seção está ativa (header fixo + folga).
const ACTIVE_OFFSET = 120;
// Por quanto tempo seguimos corrigindo a rolagem enquanto seções @defer carregam.
const SETTLE_MS = 2000;

@Injectable({ providedIn: 'root' })
export class AnchorScroll {
  readonly active = signal<string | null>(null);

  private ids: string[] = [];
  private stopSettling?: () => void;
  private frame = 0;

  constructor() {
    window.addEventListener('scroll', () => this.scheduleSpy(), { passive: true });
    window.addEventListener('resize', () => this.scheduleSpy(), { passive: true });
  }

  /** Define quais seções o scroll-spy acompanha (na ordem da página). */
  track(ids: string[]): void {
    this.ids = ids;
    this.scheduleSpy();
  }

  /**
   * Rola até a seção e continua reposicionando enquanto o layout muda
   * (seções carregadas via @defer alteram a altura da página no caminho).
   */
  scrollTo(id: string, smooth = true): void {
    const target = () => document.getElementById(id);
    if (!target()) return;

    this.stopSettling?.();
    const behavior: ScrollBehavior =
      smooth && !matchMedia('(prefers-reduced-motion: reduce)').matches ? 'smooth' : 'auto';
    target()!.scrollIntoView({ behavior, block: 'start' });

    if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`);

    const observer = new ResizeObserver(() => target()?.scrollIntoView({ behavior, block: 'start' }));
    observer.observe(document.body);
    const cancel = () => this.stopSettling?.();
    const timer = setTimeout(cancel, SETTLE_MS);
    // Se o usuário rolar por conta própria, paramos de corrigir.
    const userEvents = ['wheel', 'touchstart', 'keydown'] as const;
    userEvents.forEach((e) => window.addEventListener(e, cancel, { passive: true, once: true }));

    this.stopSettling = () => {
      observer.disconnect();
      clearTimeout(timer);
      userEvents.forEach((e) => window.removeEventListener(e, cancel));
      this.stopSettling = undefined;
    };
  }

  private scheduleSpy(): void {
    cancelAnimationFrame(this.frame);
    this.frame = requestAnimationFrame(() => this.active.set(this.currentSection()));
  }

  private currentSection(): string | null {
    const atBottom = innerHeight + scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) return this.ids.at(-1) ?? null;

    let current: string | null = null;
    for (const id of this.ids) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
    }
    return current;
  }
}
