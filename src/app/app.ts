import { Component, afterNextRender, inject } from '@angular/core';
import { AnchorScroll } from './anchor-scroll';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Fundamentals } from './sections/fundamentals/fundamentals';
import { Classes } from './sections/classes/classes';
import { Explorer } from './sections/explorer/explorer';
import { Comparisons } from './sections/comparisons/comparisons';
import { HeaderGuide } from './sections/headers/headers';
import { Simulator } from './sections/simulator/simulator';
import { Practices } from './sections/practices/practices';
import { Quiz } from './sections/quiz/quiz';
import { Faq } from './sections/faq/faq';
import { Footer } from './sections/footer/footer';

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
  private readonly anchors = inject(AnchorScroll);

  constructor() {
    // Ao abrir a página já com #secao, as seções @defer ainda não existem:
    // o AnchorScroll reposiciona enquanto elas carregam.
    afterNextRender(() => this.scrollToHash(false));
  }

  protected onDocumentClick(event: MouseEvent): void {
    if (event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) return;
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
