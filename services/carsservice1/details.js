const params = new URLSearchParams(window.location.search);
const carId = params.get("id");
const detailsWrap = document.getElementById("detailsWrap");

function formatPrice(price) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}

function renderNotFound() {
  detailsWrap.innerHTML = `
    <article class="details-card">
      <div class="details-content">
        <p class="eyebrow">Car Not Found</p>
        <h1>This listing is no longer available.</h1>
        <p>Please return to the inventory and choose another vehicle.</p>
        <a class="btn btn-primary" href="index.html#cars">Back To Cars</a>
      </div>
    </article>
  `;
}

function renderDetails(car) {
  detailsWrap.innerHTML = `
    <article class="details-card">
      <div class="details-gallery">
        <img src="${car.image}" alt="${car.name} exterior view" loading="lazy" />
        <img src="${car.interior}" alt="${car.name} interior view" loading="lazy" />
      </div>
      <div class="details-content">
        <p class="eyebrow">${car.type} | ${car.year}</p>
        <h1>${car.name}</h1>
        <p class="details-price">${formatPrice(car.price)}</p>
        <p class="details-description">${car.description}</p>
        <ul class="details-specs">
          <li><span>Power</span><strong>${car.power}</strong></li>
          <li><span>Mileage</span><strong>${car.mileage}</strong></li>
          <li><span>Transmission</span><strong>${car.transmission}</strong></li>
          <li><span>Rating</span><strong>${car.rating} / 5</strong></li>
        </ul>
        <div class="details-actions">
          <a class="btn btn-primary" href="index.html#book">Book Test Drive</a>
          <a class="btn btn-outline" href="index.html#cars">Explore More Cars</a>
        </div>
      </div>
    </article>
  `;
}

const car = CARS.find((item) => item.id === carId);

if (!car) {
  renderNotFound();
} else {
  renderDetails(car);
}