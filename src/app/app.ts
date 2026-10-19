import { Component, afterNextRender, inject } from '@angular/core';
import { AnchorScrollService } from '@core/services';
import { Header } from './features/header/header';
import { Hero } from './features/hero/hero';
import { Fundamentals } from './features/fundamentals/fundamentals';
import { Classes } from './features/classes/classes';
import { Explorer } from './features/explorer/explorer';
import { Comparisons } from './features/comparisons/comparisons';
import { HeaderGuide } from './features/http-headers/http-headers';
import { Simulator } from './features/simulator/simulator';
import { Practices } from './features/practices/practices';
import { Quiz } from './features/quiz/quiz';
import { Faq } from './features/faq/faq';
import { Footer } from './features/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    Hero,
    Fundamentals,
    Classes,
    Explorer,
    Comparisons,
    HeaderGuide,
    Simulator,
    Practices,
    Quiz,
    Faq,
    Footer,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(window:popstate)': 'scrollToHash(false)',
  },
})
export class App {
  private readonly anchors = inject(AnchorScrollService);

  constructor() {
    // Ao abrir a página já com #secao, as seções @defer ainda não existem:
    // o AnchorScroll reposiciona enquanto elas carregam.
    afterNextRender(() => this.scrollToHash(false));
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey
    )
      return;
    const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')!.slice(1);
    if (!id || !document.getElementById(id)) return;
    event.preventDefault();
    this.anchors.scrollTo(id);
  }

  protected scrollToHash(smooth: boolean): void {
    const id = decodeURIComponent(location.hash.slice(1));
    if (id) this.anchors.scrollTo(id, smooth);
  }
}
