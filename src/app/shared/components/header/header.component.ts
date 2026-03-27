import { Component, AfterViewInit  } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [TranslateModule]
})
export class HeaderComponent implements AfterViewInit{

  /*ngAfterViewInit() {
    const video = document.getElementById('hero-video') as HTMLVideoElement;

    if (video) {
      video.src = 'assets/images/smarthome-completo.mp4';
      video.play();

      video.onended = () => {
        video.src = 'assets/images/smarthome-loop.mp4';
        video.loop = true;
        video.play();
      };
    }
  }*/

    ngAfterViewInit()
    {
      const video = document.getElementById('hero-video') as HTMLVideoElement;

      if (video) {
        const introSrc = 'assets/images/smarthome-completo.mp4';
        const loopSrc = 'assets/images/smarthome-loop.mp4';

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
    }

  scrollTo(sectionId: string) {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}