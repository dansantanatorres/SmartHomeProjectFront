import { Component, ViewEncapsulation } from '@angular/core';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrls: ['./app.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class AppComponent {
  showStrip = false;

  constructor(private langService: LanguageService) {
    this.langService.init();
  }

  onVideoStarted() {
    this.showStrip = true;
  }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

}