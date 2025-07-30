// Cargar sección
async function loadSection(placeholderId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const html = await response.text();
        document.getElementById(placeholderId).innerHTML = html;
    } catch (error) {
        console.error(`Error loading section ${filePath}:`, error);
        document.getElementById(placeholderId).innerHTML = `<p style="color: red;">Error al cargar la sección: ${filePath}</p>`;
    }
}

document.addEventListener('DOMContentLoaded', async () => { 
    // Cargar todas las secciones.
    await loadSection('header-placeholder', 'sections/header.html');
    await loadSection('hero-placeholder', 'sections/hero.html');
    await loadSection('formRegister-placeholder', 'sections/formRegister.html');
    await loadSection('popular-placeholder', 'sections/popular.html');
    await loadSection('about-placeholder', 'sections/about.html'); 
    await loadSection('benefits-placeholder', 'sections/benefits.html'); 
    await loadSection('studyCareers-placeholder', 'sections/studyCareers.html');
    await loadSection('team-placeholder', 'sections/team.html'); 
    await loadSection('reviews-placeholder', 'sections/reviews.html'); 
    await loadSection('footer-placeholder', 'sections/footer.html');

    // Inicializar Owl Carousel para 'team-carousel' DESPUÉS de que la sección 'team' se haya cargado.
    if ($('.team-carousel').length) {
        $('.team-carousel').owlCarousel({
            loop: true,
            margin: 30,
            nav: true,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                768: {
                    items: 2,
                    nav: true
                },
                992: {
                    items: 4,
                    nav: true
                }
            }
        });
    } else {
        console.warn('No se encontró el carrusel con la clase .team-carousel. Asegúrate de que team.html se cargue correctamente.');
    }

    // Inicializar Owl Carousel para 'reviews-carousel' E configurar a lógica de vídeo
    // ISSO DEVE ACONTECER DEPOIS que 'reviews.html' for carregado!
    if ($(".reviews-carousel").length) {
        $(".reviews-carousel").owlCarousel({
            loop: true,
            margin: 30,
            nav: false,
            dots: true,
            autoplay: false,
            responsive:{
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });

        // Lida com o clique no botão de play
        $('.play-icon').on('click', function() {
            var videoSrc = $(this).data('video-src');
            var videoWrapper = $(this).closest('.video-wrapper');
            var videoPlayer = videoWrapper.find('.video-player');
            var videoThumbnail = videoWrapper.find('.video-thumbnail');
            var playButtonOverlay = videoWrapper.find('.play-button-overlay');

            // Remove a imagem de thumbnail e o botão de play
            videoThumbnail.hide();
            playButtonOverlay.hide();

            // Carrega e reproduz o vídeo
            // Verifica se é um link de incorporação do YouTube (ex: youtube.com/embed/ ou youtu.be/)
            if (videoSrc.includes('youtube.com/embed/') || videoSrc.includes('youtu.be/')) {
                videoPlayer.attr('src', videoSrc + '?autoplay=1');
                videoPlayer.show(); // Certifica-se de que o iframe está visível
            } else {
                // Para vídeos locais, cria um elemento <video>
                // É importante remover o iframe antes de adicionar o video tag
                videoPlayer.remove(); // Remove o iframe existente
                var newVideoTag = $('<video class="video-player" controls autoplay><source src="' + videoSrc + '" type="video/mp4"></video>');
                videoWrapper.append(newVideoTag); // Adiciona o novo elemento <video>
            }
        });

        // Opcional: Pausar vídeos quando o slide muda
        $('.reviews-carousel').on('changed.owl.carousel', function(event) {
            $(this).find('.video-wrapper').each(function() {
                var videoPlayer = $(this).find('.video-player');
                var videoThumbnail = $(this).find('.video-thumbnail');
                var playButtonOverlay = $(this).find('.play-button-overlay');

                if (videoPlayer.is('iframe')) {
                    // Para iframes (YouTube), redefine o src para parar o vídeo
                    var currentSrc = videoPlayer.attr('src');
                    if (currentSrc && currentSrc.includes('autoplay=1')) {
                        videoPlayer.attr('src', currentSrc.replace('?autoplay=1', '')); // Remove autoplay
                    }
                    videoPlayer.hide(); // Esconde o iframe
                } else if (videoPlayer.is('video')) {
                    // Para elementos <video> (locais), pause e remova
                    videoPlayer[0].pause();
                    videoPlayer[0].currentTime = 0;
                    videoPlayer.remove(); // Remove o elemento <video>
                    // Adicione novamente o iframe placeholder para a próxima vez que um vídeo do YouTube for clicado
                    $(this).append('<iframe class="video-player" frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="display:none;"></iframe>');
                }
                // Restaurar a thumbnail e o botão de play
                videoThumbnail.show();
                playButtonOverlay.show();
            });
        });
    } else {
        console.warn('No se encontró el carrusel con la clase .reviews-carousel. Asegúrate de que reviews.html se cargue correctamente.');
    }
});


async function loadHeader() {await loadSection('header-placeholder', 'sections/header.html');}
async function loadHero() {await loadSection('hero-placeholder', 'sections/hero.html');}
async function loadFormRegister() {await loadSection('formRegister-placeholder', 'sections/formRegister.html');}
async function loadPopular() {await loadSection('popular-placeholder', 'sections/popular.html');}
async function loadAbout() {await loadSection('about-placeholder', 'sections/about.html');}
async function loadBenefits() {await loadSection('benefits-placeholder', 'sections/benefits.html');}
async function loadStudy() {await loadSection('studyCareers-placeholder', 'sections/studyCareers.html');}
async function loadTeam() {await loadSection('team-placeholder', 'sections/team.html');}
async function loadReviews() {await loadSection('reviews-placeholder', 'sections/reviews.html');}
async function loadFooter() {await loadSection('footer-placeholder', 'sections/footer.html');}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadHero();
    loadFormRegister()
    loadPopular();
    loadAbout();
    loadBenefits();
    loadStudy();
    loadTeam();
    loadReviews();
    loadFooter();
});


// Video
$(document).ready(function() {
    // Inicializa o modal de vídeo
    $('#videoModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget);
      const videoId = button.data('video');
      const videoType = button.data('type');
      
      // Resetar modal
      $('#localVideo').hide().find('source').attr('src', '');
      $('#youtubeVideo').hide().attr('src', '');
      
      if (videoType === 'youtube') {
        // Configura o vídeo do YouTube
        const youtubeIframe = $('#youtubeVideo');
        youtubeIframe.attr('src', `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&enablejsapi=1`);
        youtubeIframe.show();
      } else {
        // Configura vídeo local
        const localVideo = $('#localVideo');
        localVideo.find('source').attr('src', videoId);
        localVideo[0].load();
        localVideo.show();
        
        // Tenta reproduzir automaticamente (pode ser bloqueado pelo navegador)
        const playPromise = localVideo[0].play();
        
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Reprodução automática prevenida, mostrando controles");
            localVideo[0].controls = true;
          });
        }
      }
    });
    
    // Garante que os vídeos são pausados ao fechar o modal
    $('#videoModal').on('hidden.bs.modal', function () {
      stopVideo();
    });
  });
  
  // Função para parar todos os vídeos
  function stopVideo() {
    // Para vídeo local
    const localVideo = document.getElementById('localVideo');
    if (localVideo) {
      localVideo.pause();
      localVideo.currentTime = 0;
      localVideo.src = '';
    }
    
    // Para vídeo do YouTube (usando API do YouTube)
    const youtubeIframe = document.getElementById('youtubeVideo');
    if (youtubeIframe) {
      youtubeIframe.src = youtubeIframe.src.replace('autoplay=1', 'autoplay=0');
    }
  }


  $(document).ready(function() {
    // Quando o modal é aberto
    $('#videoModal').on('show.bs.modal', function (event) {
      const button = $(event.relatedTarget);
      const videoUrl = button.data('video');
      
      // Configura o iframe com a URL do vídeo
      $('#youtubeVideo').attr('src', videoUrl);
    });
    
    // Quando o modal é fechado
    $('#videoModal').on('hidden.bs.modal', function () {
      // Remove a src do iframe para parar o vídeo
      $('#youtubeVideo').attr('src', '');
    });
  });
