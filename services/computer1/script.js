const leadForm = document.getElementById("leadForm");
const formStatus = document.getElementById("formStatus");
const yearEl = document.getElementById("year");

if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

if (leadForm && formStatus) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = leadForm.name.value.trim();
    const phone = leadForm.phone.value.trim();
    const service = leadForm.service.value;
    const message = leadForm.message.value.trim();

    if (!name || !phone || !service) {
      formStatus.textContent = "Please fill in your name, phone number, and service type.";
      formStatus.style.color = "#b00020";
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hi cvs tech, my name is ${name}. I need ${service}. Phone: ${phone}. ${message ? `Issue details: ${message}` : ""}`
    );

    formStatus.textContent = "Thanks! Redirecting you to WhatsApp to complete your request...";
    formStatus.style.color = "#0f4ea8";

    window.open(`https://wa.me/15551234567?text=${whatsappMessage}`, "_blank", "noopener");
    leadForm.reset();
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window && revealItems.length > 0) {
  const observer = new IntersectionObserver(
    (entries, currentObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("in-view");
        currentObserver.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
    }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("in-view"));
}
