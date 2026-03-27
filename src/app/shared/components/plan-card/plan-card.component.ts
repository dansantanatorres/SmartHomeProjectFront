import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';  // ← agregar

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],  // ← agregar TranslateModule
  styleUrls: ['./plan-card.component.scss'],
  templateUrl: './plan-card.component.html'
})
export class PlanCardComponent {
  @Input() data!: {
    title: string;
    icon: string;
    price: string;
    features: string[];
    ideal: string;
    buttonText: string;
  };
}