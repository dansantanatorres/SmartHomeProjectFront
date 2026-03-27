// app-module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app';

// ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';

// Standalone components
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { HomeComponent } from './features/home/home.component';
import { LanguageSwitcherComponent } from './shared/components/language-switcher/language-switcher.component';
import { FooterComponent } from './shared/components/footer/footer.component';

// ✅ Loader SIN argumentos (OBLIGATORIO en v17)
export function HttpLoaderFactory() {
  return new TranslateHttpLoader();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,

    // Standalone components
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LanguageSwitcherComponent,

    // ngx-translate config
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [] // ✅ MUY IMPORTANTE: vacío
      },
      fallbackLang: 'en'
    })
  ],
  providers: [
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}