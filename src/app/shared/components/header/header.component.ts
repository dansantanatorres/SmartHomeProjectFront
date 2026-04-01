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

  @ViewChild('heroVideo') heroVideo!: ElementRef<HTMLVideoElement>;
  @ViewChild('playOverlay') playOverlay!: ElementRef;

  /*ngAfterViewInit(): void {
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
  }*/

  ngAfterViewInit(): void 
  {
    const video = this.heroVideo.nativeElement;
    const isMobile = window.innerWidth <= 768;

    video.src = isMobile
      ? 'assets/videos/smarthome-loop-vertical.mp4'
      : 'assets/videos/smarthome-completo.mp4';

    if (!isMobile) {
      video.onended = () => {
        video.src = 'assets/videos/smarthome-loop.mp4';
        video.loop = true;
        video.play().catch(() => {});
      };
    } else {
      video.loop = true;
    }

    video.load();
    video.play().then(() => {
      // Autoplay funcionó — oculta el botón
      this.playOverlay.nativeElement.style.display = 'none';
    }).catch(() => {
      // Autoplay bloqueado — muestra el botón
      this.playOverlay.nativeElement.style.display = 'flex';
    });
  }

  startVideo(): void {
    const video = this.heroVideo.nativeElement;
    video.play();
    this.playOverlay.nativeElement.style.display = 'none';
  }

  scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

}