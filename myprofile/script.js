const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", () => document.body.classList.toggle("light-theme"));

const menuToggle = document.querySelector(".menu-toggle");
const navLinksContainer = document.querySelector(".nav-links");
const navLinks = document.querySelectorAll(".nav-link");
const icon = menuToggle.querySelector("i");

menuToggle.addEventListener("click", () => {
    navLinksContainer.classList.toggle("active");
    icon.classList.replace(
        navLinksContainer.classList.contains("active") ? "ph-list" : "ph-x",
        navLinksContainer.classList.contains("active") ? "ph-x" : "ph-list"
    );
});

navLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinksContainer.classList.remove("active");
        icon.classList.replace("ph-x", "ph-list");
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
    });
});

const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(sec => {
        if(scrollY >= sec.offsetTop - 200) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
        link.classList.remove("active");
        if(link.getAttribute("href") === "#" + current) link.classList.add("active");
    });
    
    const nav = document.querySelector(".navbar");
    if(scrollY > 50) {
        nav.style.padding = "0.8rem 2rem";
        nav.style.boxShadow = "var(--glass-shadow)";
    } else {
        nav.style.padding = "1rem 2rem";
        nav.style.boxShadow = "none";
    }
});

const revealElements = document.querySelectorAll(".card, .section-header");
revealElements.forEach(el => el.classList.add("fade-in"));
const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

revealElements.forEach(el => observer.observe(el));

// Modal Logic
const modal = document.getElementById("certModal");
const certFrame = document.getElementById("certFrame");
const certImage = document.getElementById("certImage");
const certFallback = document.getElementById("certFallback");
const certDownloadLink = document.getElementById("certDownloadLink");
const modalBadge = document.getElementById("modalBadge");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function openCertificate(pdfUrl, badgeUrl, title, desc) {
    certFrame.src = pdfUrl;
    certDownloadLink.href = pdfUrl;
    
    if (badgeUrl) {
        modalBadge.src = badgeUrl;
        modalBadge.style.display = 'block';
    } else {
        modalBadge.style.display = 'none';
    }
    
    modalTitle.textContent = title || "Achievement";
    modalDesc.textContent = desc || "Achievement Details";
    
    // Reset display
    certFrame.style.display = "none";
    certImage.style.display = "none";
    certFallback.style.display = "none";
    
    if (pdfUrl.startsWith('http')) {
        certFallback.style.display = "block";
        certFallback.querySelector('p').textContent = "This certificate is verified on an external platform. Click below to view.";
        certDownloadLink.textContent = "View Certificate in New Tab";
    } else if (pdfUrl.match(/\.(jpeg|jpg|gif|png)$/i)) {
        certImage.style.display = "block";
        certImage.src = pdfUrl;
        certDownloadLink.textContent = "Download Image";
    } else {
        certFrame.style.display = "block";
        certFallback.querySelector('p').textContent = "Certificate file not found or browser blocked PDF preview.";
        certDownloadLink.textContent = "Download";
    }
    
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent scrolling
}

function closeCertificate() {
    modal.classList.remove("show");
    setTimeout(() => {
        certFrame.src = ""; // Clear iframe after animation
        certImage.src = ""; // Clear image after animation
    }, 300);
    document.body.style.overflow = "auto";
}

// Close when clicking outside modal content
window.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeCertificate();
    }
});