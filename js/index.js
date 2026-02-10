function navigateToLogin() {
    // This will redirect to your login.html page
    window.location.href ="../frontend/pages/auth/login.html";
}

// Add scroll animations
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.feature-card');
    cards.forEach(card => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});