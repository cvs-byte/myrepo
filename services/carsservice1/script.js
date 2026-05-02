const carGrid = document.getElementById("carGrid");
const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const emptyState = document.getElementById("emptyState");
const resetFiltersBtn = document.getElementById("resetFiltersBtn");
const carChoice = document.getElementById("carChoice");
const reviewGrid = document.getElementById("reviewGrid");
const form = document.getElementById("testDriveForm");
const formStatus = document.getElementById("formStatus");

const heroImage = document.getElementById("heroImage");
const heroName = document.getElementById("heroName");
const heroPrice = document.getElementById("heroPrice");
const heroDetailsLink = document.getElementById("heroDetailsLink");
const exploreCarsBtn = document.getElementById("exploreCarsBtn");

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

function starString(count) {
  return "★".repeat(count) + "☆".repeat(5 - count);
}

function setHeroCar() {
  const featured = CARS.reduce((best, current) => {
    if (!best) {
      return current;
    }

    return current.rating > best.rating ? current : best;
  }, null);

  heroImage.src = featured.image;
  heroImage.alt = `${featured.name} featured image`;
  heroName.textContent = featured.name;
  heroPrice.textContent = `${formatPrice(featured.price)} | ${featured.power}`;
  heroDetailsLink.href = `details.html?id=${featured.id}`;
}

function populateTypeFilter() {
  const types = [...new Set(CARS.map((car) => car.type))].sort();

  types.forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}

function populateCarChoice() {
  CARS.forEach((car) => {
    const option = document.createElement("option");
    option.value = car.name;
    option.textContent = `${car.name} (${formatPrice(car.price)})`;
    carChoice.appendChild(option);
  });
}

function createCarCard(car) {
  const card = document.createElement("article");
  card.className = "car-card";

  card.innerHTML = `
    <div class="car-image-wrap">
      <img src="${car.image}" alt="${car.name}" loading="lazy" />
      <span class="chip">${car.type}</span>
    </div>
    <div class="car-content">
      <h3>${car.name}</h3>
      <p class="price">${formatPrice(car.price)}</p>
      <ul class="specs">
        <li>${car.year}</li>
        <li>${car.mileage}</li>
        <li>${car.transmission}</li>
      </ul>
      <div class="card-actions">
        <a class="btn btn-outline" href="details.html?id=${car.id}">Details</a>
        <button class="btn btn-primary quick-book" data-car="${car.name}">Test Drive</button>
      </div>
    </div>
  `;

  card.addEventListener("mousemove", (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const rotateY = ((x / bounds.width) - 0.5) * 8;
    const rotateX = (0.5 - (y / bounds.height)) * 8;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "translateY(0)";
  });

  return card;
}

function getFilteredCars() {
  const selectedType = typeFilter.value;
  const selectedPrice = priceFilter.value;

  return CARS.filter((car) => {
    const typeMatch = selectedType === "all" || car.type === selectedType;
    const priceMatch = selectedPrice === "all" || car.price <= Number(selectedPrice);

    return typeMatch && priceMatch;
  });
}

function renderCars() {
  const cars = getFilteredCars();
  carGrid.innerHTML = "";

  if (cars.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;
  cars.forEach((car) => {
    carGrid.appendChild(createCarCard(car));
  });
}

function renderReviews() {
  reviewGrid.innerHTML = "";

  REVIEWS.forEach((review) => {
    const card = document.createElement("article");
    card.className = "review-card reveal";
    card.innerHTML = `
      <p class="review-stars" aria-label="${review.rating} out of 5 stars">${starString(review.rating)}</p>
      <p class="review-text">"${review.text}"</p>
      <p class="review-name">- ${review.name}</p>
    `;
    reviewGrid.appendChild(card);
  });
}

function setupQuickBook() {
  carGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".quick-book");

    if (!button) {
      return;
    }

    carChoice.value = button.dataset.car;
    document.getElementById("book").scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function setupForm() {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      formStatus.textContent = "Please fill all required fields correctly.";
      formStatus.classList.add("error");
      return;
    }

    const selectedDate = new Date(document.getElementById("date").value);
    const today = new Date();

    selectedDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      formStatus.textContent = "Please select a future date for your test drive.";
      formStatus.classList.add("error");
      return;
    }

    formStatus.classList.remove("error");
    formStatus.textContent = "Inquiry sent. A cvs cars advisor from cvs cars services will contact you soon.";
    form.reset();
  });
}

function setupAnimations() {
  const reveals = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  reveals.forEach((item) => observer.observe(item));
}

function setupNavigation() {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
    });
  });
}

exploreCarsBtn.addEventListener("click", () => {
  document.getElementById("cars").scrollIntoView({ behavior: "smooth", block: "start" });
});

typeFilter.addEventListener("change", renderCars);
priceFilter.addEventListener("change", renderCars);
resetFiltersBtn.addEventListener("click", () => {
  typeFilter.value = "all";
  priceFilter.value = "all";
  renderCars();
});

setHeroCar();
populateTypeFilter();
populateCarChoice();
renderCars();
renderReviews();
setupQuickBook();
setupForm();
setupAnimations();
setupNavigation();