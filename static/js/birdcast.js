(function () {
  const html = document.documentElement;
  html.classList.add('js-ready');

  document.querySelectorAll('[data-scroll-to]').forEach((button) => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.scrollTo);
      if (!target) return;

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  });

  const modal = document.getElementById('video-modal');
  const player = document.getElementById('video-modal-player');
  const openButtons = document.querySelectorAll('.js-video-open');
  const closeButtons = document.querySelectorAll('.js-video-close');

  if (!modal || !player || !openButtons.length) return;

  function openVideo(src) {
    if (!src) return;

    player.pause();
    player.removeAttribute('src');
    player.load();

    player.src = src;
    player.controls = true;
    player.muted = false;
    player.volume = 1;

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('video-modal-open');

    player.load();

    const playPromise = player.play();

    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Browser may block autoplay with sound.
        // User can press play manually because controls are visible.
      });
    }
  }

  function closeVideo() {
    player.pause();
    player.removeAttribute('src');
    player.load();

    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('video-modal-open');
  }

  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      openVideo(button.dataset.video);
    });
  });

  closeButtons.forEach((button) => {
    button.addEventListener('click', closeVideo);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeVideo();
    }
  });
})();
