// solution-card.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-solution-card',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./solution-card.component.scss'],
  templateUrl: './solution-card.component.html'
})
export class SolutionCardComponent {
  @Input() data!: { title: string; text: string; icons: string[]; image: string };
}