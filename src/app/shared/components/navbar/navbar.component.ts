import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class NavbarComponent {
  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = window.innerWidth < 768 ? 60 : 80;
    const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
    const startY = window.scrollY;
    const distance = Math.abs(targetY - startY);

    const baseDuration = 50;
    const duration = baseDuration + distance * 2;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);
      const ease = t * (2 - t);

      window.scrollTo(0, startY + (targetY - startY) * ease);

      if (t < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);

    // cerrar menú en móvil al pulsar link
    if (window.innerWidth < 768) this.menuOpen = false;
  }
}