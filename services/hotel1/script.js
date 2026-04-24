const navbar = document.querySelector('.navbar');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
const navAnchors = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 18);
});

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navAnchors.forEach((anchor) => {
  anchor.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

const slides = Array.from(document.querySelectorAll('.slide'));
const slidesWrap = document.getElementById('slides');
const dotsWrap = document.getElementById('dots');
const prevBtn = document.getElementById('prevSlide');
const nextBtn = document.getElementById('nextSlide');

let currentSlide = 0;
let sliderTimer;

function renderDots() {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to image ' + (i + 1));
    dot.addEventListener('click', () => setSlide(i));
    dotsWrap.appendChild(dot);
  });
}

function setSlide(index) {
  slides[currentSlide].classList.remove('active');
  dotsWrap.children[currentSlide].classList.remove('active');

  currentSlide = (index + slides.length) % slides.length;

  slides[currentSlide].classList.add('active');
  dotsWrap.children[currentSlide].classList.add('active');
}

function startSlider() {
  sliderTimer = setInterval(() => {
    setSlide(currentSlide + 1);
  }, 4500);
}

function resetSlider() {
  clearInterval(sliderTimer);
  startSlider();
}

prevBtn.addEventListener('click', () => {
  setSlide(currentSlide - 1);
  resetSlider();
});

nextBtn.addEventListener('click', () => {
  setSlide(currentSlide + 1);
  resetSlider();
});

slidesWrap.addEventListener('mouseenter', () => clearInterval(sliderTimer));
slidesWrap.addEventListener('mouseleave', startSlider);

renderDots();
startSlider();

const bookingForm = document.getElementById('bookingForm');
const checkIn = document.getElementById('checkIn');
const checkOut = document.getElementById('checkOut');
const formMessage = document.getElementById('formMessage');

const today = new Date().toISOString().split('T')[0];
checkIn.min = today;
checkOut.min = today;

checkIn.addEventListener('change', () => {
  checkOut.min = checkIn.value || today;

  if (checkOut.value && checkOut.value <= checkIn.value) {
    checkOut.value = '';
  }
});

bookingForm.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!checkIn.value || !checkOut.value || checkOut.value <= checkIn.value) {
    formMessage.textContent = 'Please select valid check-in and check-out dates.';
    return;
  }

  formMessage.textContent = 'Thank you. Your luxury booking request has been received.';
  bookingForm.reset();
  checkIn.min = today;
  checkOut.min = today;
});
