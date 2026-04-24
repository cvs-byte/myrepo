document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Navbar ---
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.add('scrolled');
            // Alternatively, keep it always dark if preferred, but usually remove class:
            navbar.classList.remove('scrolled');
        }
    });

    // Initialize navbar state on load
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    }

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // --- Testimonial Slider ---
    const slides = document.querySelectorAll('.testimonial-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }
        
        slides[currentSlide].classList.add('active');
    }

    if(prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });

        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // Auto slide every 5 seconds
    setInterval(() => {
        if (slides.length > 0) {
            showSlide(currentSlide + 1);
        }
    }, 5000);

    // --- Date Input Validation ---
    const checkinInput = document.getElementById('checkin');
    const checkoutInput = document.getElementById('checkout');

    if (checkinInput && checkoutInput) {
        // Set minimum date for check-in to today
        const today = new Date().toISOString().split('T')[0];
        checkinInput.setAttribute('min', today);

        checkinInput.addEventListener('change', () => {
            // Check-out must be at least 1 day after check-in
            const checkinDate = new Date(checkinInput.value);
            const minCheckoutDate = new Date(checkinDate);
            minCheckoutDate.setDate(minCheckoutDate.getDate() + 1);
            
            const minCheckoutString = minCheckoutDate.toISOString().split('T')[0];
            checkoutInput.setAttribute('min', minCheckoutString);
            
            // If current checkout is before new min checkout, reset it
            if (checkoutInput.value && checkoutInput.value < minCheckoutString) {
                checkoutInput.value = minCheckoutString;
            }
        });
    }

    // --- Form Submission Prevention (Demo only) ---
    const bookingForm = document.getElementById('bookingForm');
    if(bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = bookingForm.querySelector('button[type="submit"]');
            const originalText = btn.innerText;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Checking...';
            
            setTimeout(() => {
                btn.innerText = 'Rooms Available!';
                btn.style.background = '#28a745';
                
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }
});
