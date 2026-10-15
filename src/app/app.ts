import { Component } from '@angular/core';
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
})
export class App {}
