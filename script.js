function toggleMenu() {
    const menu = document.querySelector(".menu-links");
    const icon = document.querySelector(".hamburger-icon");
    menu.classList.toggle("open");
    icon.classList.toggle("open");
}

/* PROJECT CAROUSEL */

let currentIndex = 0;

function getVisibleCount() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
}

function moveCarousel(direction) {
    const cards = document.querySelectorAll('.carousel-track .details-container');
    const visibleCount = getVisibleCount();
    const maxIndex = cards.length - visibleCount;
    
    currentIndex = Math.max(0, Math.min(currentIndex + direction, maxIndex));
    updateCarousel();
}

function updateCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-track .details-container');
    const visibleCount = getVisibleCount();
    
    if (!track || cards.length === 0) return;
    
    // Calculate the width of one card plus its share of the gap
    const containerWidth = track.parentElement.offsetWidth;
    const gap = visibleCount === 1 ? 0 : 32; // 2rem = 32px
    const totalGaps = visibleCount - 1;
    const cardWidth = (containerWidth - (totalGaps * gap)) / visibleCount;
    const slideDistance = cardWidth + gap;
    
    track.style.transform = `translateX(-${currentIndex * slideDistance}px)`;
    
    updateDots();
    updateArrows();
}

function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function updateArrows() {
    const cards = document.querySelectorAll('.carousel-track .details-container');
    const visibleCount = getVisibleCount();
    const maxIndex = cards.length - visibleCount;
    
    const leftArrow = document.querySelector('.carousel-arrow-left');
    const rightArrow = document.querySelector('.carousel-arrow-right');
    
    if (leftArrow) leftArrow.disabled = currentIndex === 0;
    if (rightArrow) rightArrow.disabled = currentIndex >= maxIndex;
}

function initCarousel() {
    const dotsContainer = document.querySelector('.carousel-dots');
    const cards = document.querySelectorAll('.carousel-track .details-container');
    
    if (!dotsContainer || cards.length === 0) return;
    
    const visibleCount = getVisibleCount();
    const dotCount = Math.max(1, cards.length - visibleCount + 1);
    
    // Ensure currentIndex is valid for new visible count
    const maxIndex = cards.length - visibleCount;
    if (currentIndex > maxIndex) {
        currentIndex = Math.max(0, maxIndex);
    }
    
    dotsContainer.innerHTML = '';
    for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('span');
        dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
        dot.onclick = () => { 
            currentIndex = i; 
            updateCarousel(); 
        };
        dotsContainer.appendChild(dot);
    }
    
    updateCarousel();
}

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initCarousel();
    }, 100);
});

// Initialize carousel on page load
document.addEventListener('DOMContentLoaded', initCarousel);