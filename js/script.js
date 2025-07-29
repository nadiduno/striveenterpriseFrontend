// script.js

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

// Cargar todas las secciones al cargar la página
document.addEventListener('DOMContentLoaded', async () => { 
    // Cargar todas las secciones. 
    await loadSection('header-placeholder', 'sections/header.html');
    await loadSection('hero-placeholder', 'sections/hero.html');
    await loadSection('popular-placeholder', 'sections/popular.html');
    await loadSection('about-placeholder', 'sections/about.html'); 
    await loadSection('benefits-placeholder', 'sections/benefits.html');
    await loadSection('study-careers-placeholder', 'sections/study-careers.html');
    await loadSection('team-placeholder', 'sections/team.html'); 
    await loadSection('reviews-placeholder', 'sections/reviews.html');
    await loadSection('footer-placeholder', 'sections/footer.html');

    // Inicializar Owl Carousel DESPUÉS de que la sección 'team' se haya cargado.
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
});


async function loadHeader() {await loadSection('header-placeholder', 'sections/header.html');}
async function loadHero() {await loadSection('hero-placeholder', 'sections/hero.html');}
async function loadPopular() {await loadSection('popular-placeholder', 'sections/popular.html');}
async function loadAbout() {await loadSection('about-placeholder', 'sections/about.html');}
async function loadBenefits() {await loadSection('benefits-placeholder', 'sections/benefits.html');}
async function loadStudy() {await loadSection('study-careers-placeholder', 'sections/studyCareers.html');}
async function loadTeam() {await loadSection('team-placeholder', 'sections/team.html');}
async function loadReviews() {await loadSection('reviews-placeholder', 'sections/reviews.html');}
async function loadFooter() {await loadSection('footer-placeholder', 'sections/footer.html');}

document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadHero();
    loadPopular();
    loadAbout();
    loadBenefits();
    loadStudy();
    loadTeam();
    loadReviews();
    loadFooter();
});
