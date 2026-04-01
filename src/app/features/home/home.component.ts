import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { SolutionCardComponent } from '../../shared/components/solution-card/solution-card.component';
import { PlanCardComponent } from '../../shared/components/plan-card/plan-card.component';
import { ContactComponent } from '../../features/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, SolutionCardComponent, PlanCardComponent, FormsModule, ContactComponent, TranslateModule],
  styleUrls: ['./home.component.scss'],
  templateUrl: './home.component.html'
})
export class HomeComponent {

  form = {
    name: '',
    email: '',
    devices: [] as string[],
    message: ''
  };

  _lang = ''; 
  
  onSubmit() {
    //console.log('FORM COMPLETO:', this.form);
  }

  get solutions() {
    return [
      { title: this.translate.instant('HOME.SOLUTION_CARDS.S1.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S1.TEXT'), icons: ['conexion50y.png'], image: 'assets/images/solutions/integration.png' },
      { title: this.translate.instant('HOME.SOLUTION_CARDS.S2.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S2.TEXT'), icons: ['lights50y.png'], image: 'assets/images/solutions/lighting.png' },
      { title: this.translate.instant('HOME.SOLUTION_CARDS.S3.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S3.TEXT'), icons: ['climate50y.png'], image: 'assets/images/solutions/climate.png' },
      //{ title: this.translate.instant('HOME.SOLUTION_CARDS.S3.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S3.TEXT'), icons: ['climate50y.png','eco50y.png'] },
      { title: this.translate.instant('HOME.SOLUTION_CARDS.S4.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S4.TEXT'), icons: ['cloud50y.png'], image: 'assets/images/solutions/security.png' },
      { title: this.translate.instant('HOME.SOLUTION_CARDS.S5.TITLE'), text: this.translate.instant('HOME.SOLUTION_CARDS.S5.TEXT'), icons: ['autoplay50y.png'], image: 'assets/images/solutions/custom.png' }
    ];
  }


  get plans() {
    return [
      {
        title: this.translate.instant('HOME.PLAN_CARDS.P1.TITLE'),
        icon: 'mic30y.png',
        price: this.translate.instant('HOME.PLAN_CARDS.P1.PRICE'),
        features: [
          this.translate.instant('HOME.PLAN_CARDS.P1.F1'),
          this.translate.instant('HOME.PLAN_CARDS.P1.F2'),
          this.translate.instant('HOME.PLAN_CARDS.P1.F3')
        ],
        ideal: this.translate.instant('HOME.PLAN_CARDS.P1.IDEAL'),
        buttonText: this.translate.instant('HOME.PLAN_CARDS.BUTTON_CONSULT')
      },
      {
        title: this.translate.instant('HOME.PLAN_CARDS.P2.TITLE'),
        icon: 'devices30y.png',
        price: this.translate.instant('HOME.PLAN_CARDS.P2.PRICE'),
        features: [
          this.translate.instant('HOME.PLAN_CARDS.P2.F1'),
          this.translate.instant('HOME.PLAN_CARDS.P2.F2'),
          this.translate.instant('HOME.PLAN_CARDS.P2.F3')
        ],
        ideal: this.translate.instant('HOME.PLAN_CARDS.P2.IDEAL'),
        buttonText: this.translate.instant('HOME.PLAN_CARDS.BUTTON_CONSULT')
      },
      {
        title: this.translate.instant('HOME.PLAN_CARDS.P3.TITLE'),
        icon: 'smartHome30y.png',
        price: this.translate.instant('HOME.PLAN_CARDS.P3.PRICE'),
        features: [
          this.translate.instant('HOME.PLAN_CARDS.P3.F1'),
          this.translate.instant('HOME.PLAN_CARDS.P3.F2'),
          this.translate.instant('HOME.PLAN_CARDS.P3.F3')
        ],
        ideal: this.translate.instant('HOME.PLAN_CARDS.P3.IDEAL'),
        buttonText: this.translate.instant('HOME.PLAN_CARDS.BUTTON_CUSTOM')
      },
      {
        title: this.translate.instant('HOME.PLAN_CARDS.P4.TITLE'),
        icon: 'custom30y.png',
        price: this.translate.instant('HOME.PLAN_CARDS.P4.PRICE'),
        features: [
          this.translate.instant('HOME.PLAN_CARDS.P4.F1'),
          this.translate.instant('HOME.PLAN_CARDS.P4.F2')
        ],
        ideal: this.translate.instant('HOME.PLAN_CARDS.P4.IDEAL'),
        buttonText: this.translate.instant('HOME.PLAN_CARDS.BUTTON_BUILD')
      }
    ];
  }

  constructor(private translate: TranslateService) {
    // Re-render cards cuando cambia el idioma
    this.translate.onLangChange.subscribe(() => {});
  }
}