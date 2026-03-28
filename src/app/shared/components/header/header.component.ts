import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class HeaderComponent implements AfterViewInit{

    /*ngAfterViewInit()
    {
      const video = document.getElementById('hero-video') as HTMLVideoElement;

      if (video) {
        const introSrc = 'assets/videos/smarthome-completo.mp4';
        const loopSrc = 'assets/videos/smarthome-loop.mp4';

        // 1. Cargar intro
        video.src = introSrc;
        video.play();

        // 2. Cuando termina el intro → cambiar al loop
        video.onended = () => {
          video.src = loopSrc;
          video.loop = true;
          video.currentTime = 0;
          video.play();

          // 3. Asegurar loop infinito (extra seguridad)
          video.onended = () => {
            video.currentTime = 0;
            video.play();
          };
        };
      }
    }*/

  /*scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }*/

    @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;

    const introSrc = 'assets/videos/smarthome-completo.mp4';
    const loopSrc  = 'assets/videos/smarthome-loop.mp4';

    // Cargar video de intro
    video.src = introSrc;
    video.play().catch(err => console.error('Error al reproducir video:', err));

    // Cuando termina intro → cambiar a loop
    video.onended = () => {
      video.src = loopSrc;
      video.loop = true;
      video.currentTime = 0;
      video.play().catch(err => console.error('Error al reproducir loop:', err));
    };
  }
  /*scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = window.innerWidth < 768 ? 60 : 80;
    const targetY = element.getBoundingClientRect().top + window.scrollY - offset;
    const startY = window.scrollY;
    const distance = Math.abs(targetY - startY);

    // duración proporcional a la distancia
    const baseDuration = 1000; // duración mínima 1s
    const duration = baseDuration + distance * 2; // por ejemplo 2ms por px

    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const t = Math.min(1, elapsed / duration);

      // easing suave (opcional)
      const ease = t * (2 - t); // puedes cambiar a lineal: ease = t;

      window.scrollTo(0, startY + (targetY - startY) * ease);

      if (t < 1) requestAnimationFrame(animateScroll);
    };

    requestAnimationFrame(animateScroll);
  }*/
}