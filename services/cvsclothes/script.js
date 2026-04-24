// Product Data
const products = [
    {
        id: 1,
        name: "Essential Heavyweight Tee",
        category: "men",
        price: 45.00,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Minimalist Hoodie",
        category: "men",
        price: 85.00,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Structured Blazer",
        category: "women",
        price: 140.00,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1548624149-f9b1859aa7d0?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "High-Waist Trousers",
        category: "women",
        price: 95.00,
        rating: 4.5,
        image: "https://images.unsplash.com/photo-1509631179647-06773ad70bcf?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Cotton Knit Sweater",
        category: "kids",
        price: 55.00,
        rating: 4.6,
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Classic Denim Jacket",
        category: "kids",
        price: 75.00,
        rating: 4.9,
        image: "https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Everyday Tote Bag",
        category: "women",
        price: 60.00,
        rating: 4.8,
        image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=800&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Relaxed Fit Chinos",
        category: "men",
        price: 80.00,
        rating: 4.7,
        image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?q=80&w=800&auto=format&fit=crop"
    }
];

// State
let cartCount = 0;
let currentFilter = 'all';

// DOM Elements
const productGrid = document.getElementById('product-grid');
const newArrivalsGrid = document.getElementById('new-arrivals-grid');
const filterBtns = document.querySelectorAll('.filter-btn');
const cartCountElement = document.getElementById('cart-count');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const toastContainer = document.getElementById('toast-container');
const categoryCards = document.querySelectorAll('.category-card');

// Render Stars helper
const renderStars = (rating) => {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="ri-star-fill"></i>';
    }
    if (hasHalfStar) {
        starsHtml += '<i class="ri-star-half-fill"></i>';
    }
    // Fill remaining with empty stars
    const remaining = 5 - Math.ceil(rating);
    for (let i = 0; i < remaining; i++) {
        starsHtml += '<i class="ri-star-line"></i>';
    }
    return starsHtml;
};

// Render Products
const renderProducts = (container, items) => {
    container.innerHTML = '';
    
    items.forEach(product => {
        const productHtml = `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${product.image}" loading="lazy" alt="${product.name}">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">Add to Cart</button>
                </div>
                <div class="product-info">
                    <p class="product-category">${product.category}</p>
                    <h3 class="product-name">${product.name}</h3>
                    <div class="product-price-rating">
                        <span class="product-price">$${product.price.toFixed(2)}</span>
                        <div class="product-rating">
                            ${renderStars(product.rating)}
                        </div>
                    </div>
                </div>
            </div>
        `;
        container.insertAdjacentHTML('beforeend', productHtml);
    });
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderProducts(productGrid, products);
    
    // Render New Arrivals (last 4 items)
    const newArrivals = [...products].reverse().slice(0, 4);
    renderProducts(newArrivalsGrid, newArrivals);
});

// Filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        // Update active class
        filterBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        // Filter logic
        currentFilter = e.target.getAttribute('data-filter');
        
        let filteredProducts = products;
        if (currentFilter !== 'all') {
            filteredProducts = products.filter(p => p.category === currentFilter);
        }
        
        renderProducts(productGrid, filteredProducts);
    });
});

// Category link redirects (simple scroll + filter for this demo)
categoryCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();
        const category = card.getAttribute('data-category');
        
        // Scroll to featured
        document.getElementById('featured').scrollIntoView({ behavior: 'smooth' });
        
        // Find and click the correct filter button
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${category}"]`);
        if (targetBtn) {
            targetBtn.click();
        }
    });
});

// Mobile Menu Toggle
mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Add to Cart
window.addToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    // Update count
    cartCount++;
    cartCountElement.textContent = cartCount;
    
    // Animate badge
    cartCountElement.style.transform = 'scale(1.5)';
    setTimeout(() => {
        cartCountElement.style.transform = 'scale(1)';
    }, 200);
    
    // Show toast
    showToast(`${product.name} added to cart`);
};

// Toast Notification
const showToast = (message) => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    toastContainer.appendChild(toast);
    
    // Trigger Animation
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
};

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input').value;
    if (email) {
        showToast('Successfully subscribed!');
        e.target.reset();
    }
});
