import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';  // ← agregar

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule, TranslateModule],  // ← agregar TranslateModule
  template: `
    <div class="plan-card">
      <div class="card-header">
        <div class="icon">
          <img [src]="'/assets/images/icons/' + data.icon" />
        </div>
        <h2>{{ data.title }}</h2>
      </div>
      <div class="price">{{ data.price }}</div>
      <hr>
      <p *ngFor="let f of data.features">• {{ f }}</p>
      <p class="ideal">{{ data.ideal }}</p>
      <div class="card-footer">
        <p class="note">{{ 'HOME.PLAN_CARDS.NOTE' | translate }}</p>  <!-- ← cambiado -->
        <button>{{ data.buttonText }}</button>
      </div>
    </div>
  `,
  styleUrls: ['./plan-card.component.scss']
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