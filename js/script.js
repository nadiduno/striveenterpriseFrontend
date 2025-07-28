//Cargar sección
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
        //Mensaje de error en el placeholder
        document.getElementById(placeholderId).innerHTML = `<p style="color: red;">Error al cargar la sección: ${filePath}</p>`;
    }
}

// Cargar todas las secciones al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    loadSection('header-placeholder', 'section/header.html');
    loadSection('hero-placeholder', 'sections/hero.html');
    loadSection('popular-placeholder', 'sections/popular.html');
    loadSection('about-placeholder', 'sections/about-us.html');
    loadSection('benefits-placeholder', 'sections/benefits.html');
    loadSection('study-careers-placeholder', 'sections/study-careers.html');
    loadSection('team-placeholder', 'sections/team.html');
    loadSection('reviews-placeholder', 'sections/reviews.html');
    loadSection('footer-placeholder', 'sections/footer.html');
});

// Inicializar Bootstrap después de cargar las secciones
async function loadHeader() {
    await loadSection('header-placeholder', 'sections/header.html');
}
async function loadHero() {
    await loadSection('hero-placeholder', 'sections/hero.html');
}
async function loadPopular() {
    await loadSection('popular-placeholder', 'sections/popular.html');
}
async function loadAbout() {
    await loadSection('about-us-placeholder', 'sections/aboutUs.htmll');
}
async function loadBenefits() {
    await loadSection('benefits-placeholder', 'sections/benefits.html');
}
async function loadStudy() {
    await loadSection('study-careers-placeholder', 'sections/studyCareers.html');
}
async function loadTeam() {
    await loadSection('team-placeholder', 'sections/team.html');
}
async function loadReviews() {
    await loadSection('reviews-placeholder', 'sections/reviews.html');
}
async function loadFooter() {
    await loadSection('footer-placeholder', 'sections/footer.html');
}

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