// Wedding Date
const weddingDate = new Date('April 11, 2026 17:30:00').getTime();

// Countdown Timer
function updateCountdown() {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        document.getElementById("countdown").innerHTML = "The wedding has happened!";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const countdownElement = document.getElementById("countdown");

    if (countdownElement) {
        countdownElement.innerHTML = `
            <div class="countdown-item">
                <span class="countdown-number">${days}</span>
                <span class="countdown-label">Dias</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${hours}</span>
                <span class="countdown-label">Horas</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${minutes}</span>
                <span class="countdown-label">Min</span>
            </div>
            <div class="countdown-item">
                <span class="countdown-number">${seconds}</span>
                <span class="countdown-label">Seg</span>
            </div>
        `;
    }
}

setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
});

// Fade In on Scroll (Intersection Observer)
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-scroll').forEach((element) => {
    observer.observe(element);
});

// Simple Parallax Effect (preserved if class exists elsewhere)
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;

    const aboutImage = document.querySelector('.parallax-bg');
    if (aboutImage) {
        const speed = 0.2;
        const rect = aboutImage.parentElement.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            aboutImage.style.transform = `translateY(${(scrolled - aboutImage.parentElement.offsetTop) * speed}px)`;
        }
    }
});

// Carousel Logic
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');
    let currentSlideIndex = 0;

    function updateSlides(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex + 1) % slides.length;
            updateSlides(currentSlideIndex);
        });
    }

    if (prevButton) {
        prevButton.addEventListener('click', () => {
            currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
            updateSlides(currentSlideIndex);
        });
    }

    // Auto-advance
    setInterval(() => {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        updateSlides(currentSlideIndex);
    }, 5000);
}