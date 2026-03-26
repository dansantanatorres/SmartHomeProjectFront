import { Component } from '@angular/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html'
})
export class LanguageSwitcherComponent {
  get current() { return this.langService.current(); }
  constructor(private langService: LanguageService) {}
  changeLang(lang: string) { this.langService.change(lang); }
}