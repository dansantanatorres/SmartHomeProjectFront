// src/app/services/language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly LANG_KEY = 'selectedLang';
  supported = ['en', 'es', 'fr'];

  constructor(private translate: TranslateService) {}

  init() {
    const saved = localStorage.getItem(this.LANG_KEY) || 'en';
    this.translate.addLangs(this.supported);
    this.translate.setDefaultLang('en');
    this.translate.use(saved);
  }

  change(lang: string) {
    if (this.supported.includes(lang)) {
      this.translate.use(lang);
      localStorage.setItem(this.LANG_KEY, lang);
    }
  }

  current(): string {
    return this.translate.currentLang;
  }
}