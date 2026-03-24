document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('#solutions .carousel-track');
  const nextBtn = document.querySelector('#solutions .carousel-btn.next');
  const prevBtn = document.querySelector('#solutions .carousel-btn.prev');

  if (!track || !nextBtn || !prevBtn) {
    console.error('Carousel elements not found');
    return;
  }

  const scrollAmount = track.querySelector('.sol-card').offsetWidth + 20;

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  });

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
  });
});