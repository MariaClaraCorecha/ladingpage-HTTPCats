import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { HTTP_FLOW_STEPS, HTTP_METHODS, SAMPLE_REQUEST, SAMPLE_RESPONSE } from '../../data/index';

@Component({
  selector: 'app-fundamentals',
  imports: [MatIconModule],
  templateUrl: './fundamentals.html',
  styleUrl: './fundamentals.scss',
})
export class Fundamentals {
  protected readonly steps = HTTP_FLOW_STEPS;
  protected readonly methods = HTTP_METHODS;
  protected readonly request = SAMPLE_REQUEST;
  protected readonly response = SAMPLE_RESPONSE;
}
