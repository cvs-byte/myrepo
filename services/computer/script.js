// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Toggle hamburger icon between bars and times
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = hamburger.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // Only prevent default if it's not just "#" (e.g., "#services")
        if (this.getAttribute('href') !== '#') {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Form Submission Handling
const serviceForm = document.getElementById('serviceForm');
const formMessage = document.getElementById('formMessage');

if (serviceForm) {
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const service = document.getElementById('service').value;
        const message = document.getElementById('message').value;
        
        // Basic validation
        if (!name || !email || !service || !message) {
            return;
        }

        // Simulate form submission
        const submitBtn = serviceForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        setTimeout(() => {
            // Reset form and button
            serviceForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            
            // Show success message
            formMessage.textContent = `Thank you, ${name}! Your request for ${service} has been received. We will contact you shortly.`;
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
    });
}
