import { Component, ViewEncapsulation  } from '@angular/core';
import { LanguageService } from './core/services/language.service';
//import { ContactComponent } from './features/contact/contact.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
  //,imports: [ContactComponent]
})
export class AppComponent {
 
  constructor(private langService: LanguageService) {
    this.langService.init(); // Carga idioma guardado o por defecto
  }
  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}