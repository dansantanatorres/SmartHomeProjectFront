import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-plan-card',
  standalone: true,
  imports: [CommonModule],
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
        <p class="note">(*) Please note that smart devices are not included in the service price and are sold separately.</p>
        <button>{{ data.buttonText }}</button>
      </div>

    </div>
  `,
  styleUrls: ['./plan-card.component.scss']
})
export class PlanCardComponent {

  // 🔥 ESTA LÍNEA ES LA CLAVE (seguro falta o está mal)
  @Input() data!: {
    title: string;
    icon: string;
    price: string;
    features: string[];
    ideal: string;
    buttonText: string;
  };

}