import { Component } from '@angular/core';
import { Header } from './sections/header/header';
import { Hero } from './sections/hero/hero';
import { Fundamentals } from './sections/fundamentals/fundamentals';
import { Classes } from './sections/classes/classes';
import { Explorer } from './sections/explorer/explorer';
import { Simulator } from './sections/simulator/simulator';
import { Quiz } from './sections/quiz/quiz';
import { Footer } from './sections/footer/footer';

@Component({
  selector: 'app-root',
  imports: [Header, Hero, Fundamentals, Classes, Explorer, Simulator, Quiz, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
