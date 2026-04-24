const carsData = [
    {
        id: 1,
        title: "CVS Apex",
        type: "suv",
        price: "$89,500",
        image: "assets/luxury_suv_1777048162879.png",
        specs: {
            "060": "4.1s",
            speed: "155 mph",
            power: "520 hp"
        }
    },
    {
        id: 2,
        title: "Specter EV",
        type: "sedan",
        price: "$105,000",
        image: "assets/electric_sedan_1777048179158.png",
        specs: {
            "060": "3.1s",
            speed: "165 mph",
            power: "680 hp"
        }
    },
    {
        id: 3,
        title: "Velocity R",
        type: "coupe",
        price: "$145,000",
        image: "assets/performance_coupe_1777048194512.png",
        specs: {
            "060": "2.8s",
            speed: "205 mph",
            power: "780 hp"
        }
    }
];

// Elements
const carGrid = document.getElementById('carGrid');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('carModal');
const closeBtn = document.querySelector('.close-btn');
const bookingForm = document.getElementById('bookingForm');
const formSuccess = document.getElementById('formSuccess');

// Render Cars
function renderCars(filter = 'all') {
    carGrid.innerHTML = '';
    
    const filteredCars = filter === 'all' 
        ? carsData 
        : carsData.filter(car => car.type === filter);

    filteredCars.forEach(car => {
        const card = document.createElement('div');
        card.className = 'car-card';
        card.innerHTML = `
            <img src="${car.image}" alt="${car.title}">
            <div class="car-content">
                <h3>${car.title}</h3>
                <div class="car-price">${car.price}</div>
                <div class="car-specs-mini">
                    <span>${car.specs.power}</span> • 
                    <span>${car.specs["060"]} 0-60</span>
                </div>
                <button class="btn btn-outline w-100" onclick="openModal(${car.id})">View Details</button>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter
        renderCars(e.target.dataset.filter);
    });
});

// Modal Actions
window.openModal = function(id) {
    const car = carsData.find(c => c.id === id);
    if (!car) return;

    document.getElementById('modalImg').src = car.image;
    document.getElementById('modalTitle').textContent = car.title;
    document.getElementById('modalPrice').textContent = car.price;
    document.getElementById('modal060').textContent = car.specs["060"];
    document.getElementById('modalSpeed').textContent = car.specs.speed;
    document.getElementById('modalPower').textContent = car.specs.power;

    // Reset Form
    bookingForm.reset();
    bookingForm.style.display = 'block';
    formSuccess.classList.add('hidden');

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
};

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore scrolling
}

closeBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Form Submission
bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simulate API Call
    bookingForm.style.display = 'none';
    formSuccess.classList.remove('hidden');
});

// Initial Render
renderCars();
