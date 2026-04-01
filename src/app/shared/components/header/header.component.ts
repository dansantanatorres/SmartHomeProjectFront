import { Component, AfterViewInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
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
  @Output() videoStarted = new EventEmitter<void>();
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

  ngAfterViewInit(): void {
    const video = this.heroVideo.nativeElement;
    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
      video.src = 'assets/videos/smarthome-loop-vertical.mp4';
      video.loop = true;
    } else {
      video.src = 'assets/videos/smarthome-completo.mp4';
      video.onended = () => {
        video.src = 'assets/videos/smarthome-loop.mp4';
        video.loop = true;
        video.play().catch(() => {});
      };
    }

    video.load();
    video.play().then(() => {
      this.playOverlay.nativeElement.style.display = 'none';
      this.videoStarted.emit(); // ← notifica al app que el video arrancó
    }).catch(() => {
      this.playOverlay.nativeElement.style.display = 'flex';
    });
  }

  startVideo(): void {
    const video = this.heroVideo.nativeElement;
    video.play();
    // Fade out del overlay
    const overlay = this.playOverlay.nativeElement;
    overlay.style.transition = 'opacity 0.8s ease';
    overlay.style.opacity = '0';
    setTimeout(() => overlay.style.display = 'none', 800);
    this.videoStarted.emit();
  }
  scrollTo(sectionId: string) {
  const el = document.getElementById(sectionId);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

}