// solution-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution-card',
  template: `
    <div class="solution-card">
      <div class="icon">
        <img *ngFor="let icon of data.icons" [src]="'/assets/images/icons/' + icon" />
      </div>
      <div class="h2"><h2>{{ data.title }}</h2></div>
      <hr>
      <p>{{ data.text }}</p>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./solution-card.component.scss']
})
export class SolutionCardComponent {
  @Input() data!: { title: string; text: string; icons: string[] };
}