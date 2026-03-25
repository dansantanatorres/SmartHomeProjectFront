import { Component, ViewEncapsulation  } from '@angular/core';
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
 

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}