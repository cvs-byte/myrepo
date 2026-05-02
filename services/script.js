// =========================================
// PROFESSIONAL DESIGN LAUNCHER
// Enterprise Portfolio Management
// =========================================

// Projects Database
const projects = [
  {
    name: "CVS Cars",
    type: "Folder",
    path: "cars/index.html",
    category: "automotive",
    description: "Premium luxury automotive dealership with multiple pages, inventory browsing, and financing options.",
    icon: "fa-car"
  },
  {
    name: "CVS Cars Advanced",
    type: "Folder",
    path: "cars1/index.html",
    category: "automotive",
    description: "Enhanced version with advanced filtering, detailed specifications, and immersive vehicle showcase.",
    icon: "fa-car"
  },
  {
    name: "Cars Service Platform",
    type: "HTML",
    path: "carsservice1/index.html",
    category: "automotive",
    description: "Comprehensive vehicle services and maintenance scheduling platform with booking capabilities.",
    icon: "fa-tools"
  },
  {
    name: "CVS Cars Service",
    type: "HTML",
    path: "carservice/index.html",
    category: "automotive",
    description: "Vehicle maintenance and repair services with service packages, diagnostics, and scheduling.",
    icon: "fa-wrench"
  },
  {
    name: "CVS Hotel & Spa",
    type: "Folder",
    path: "hotel/index.html",
    category: "hospitality",
    description: "Luxury 5-star hotel experience with room booking, amenities showcase, and guest services.",
    icon: "fa-hotel"
  },
  {
    name: "CVS Hotel Boutique",
    type: "HTML",
    path: "hotel1/index.html",
    category: "hospitality",
    description: "Alternative hotel design concept with boutique accommodations and premium wellness features.",
    icon: "fa-hotel"
  },
  {
    name: "cvs clothes",
    type: "HTML",
    path: "cvsclothes/index.html",
    category: "ecommerce",
    description: "UrbanWear apparel storefront featuring trendy clothing, collections, and styling guides.",
    icon: "fa-shopping-bag"
  },
  {
    name: "cvsclothes advanced",
    type: "HTML",
    path: "cvsclothes1/index.html",
    category: "ecommerce",
    description: "UrbanWear minimalist storefront with seasonal collections and easy checkout.",
    icon: "fa-shopping-bag"
  },
  {
    name: "TechHub Computers",
    type: "HTML",
    path: "computer/index.html",
    category: "technology",
    description: "Advanced computer and tech products marketplace with specifications, reviews, and recommendations.",
    icon: "fa-laptop"
  },
  {
    name: "Digital Tech Solutions",
    type: "HTML",
    path: "computer1/index.html",
    category: "technology",
    description: "Professional technology solutions platform showcasing latest devices, software, and tech services.",
    icon: "fa-laptop"
  }
];

// DOM Elements
const projectGrid = document.getElementById("projectGrid");
const searchInput = document.getElementById("projectSearch");
const resultCount = document.getElementById("resultCount");
const cardTemplate = document.getElementById("projectCardTemplate");
const emptyState = document.getElementById("emptyState");
const filterToggle = document.getElementById("filterToggle");
const filterPanel = document.getElementById("filterPanel");
const themeToggle = document.getElementById("themeToggle");
const categoryBtns = document.querySelectorAll(".category-btn");

let currentCategory = "all";
let currentSearch = "";

// =========================================
// INITIALIZATION
// =========================================

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initFilterPanel();
  initCategoryFilters();
  renderProjects(projects);
  updateCategoryCounts();
});

// =========================================
// THEME TOGGLE
// =========================================

function initTheme() {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.documentElement.style.colorScheme = "dark";
  }
}

themeToggle.addEventListener("click", () => {
  const isDark = document.documentElement.style.colorScheme === "dark";
  document.documentElement.style.colorScheme = isDark ? "light" : "dark";
  localStorage.setItem("theme", isDark ? "light" : "dark");
});

// =========================================
// FILTER PANEL
// =========================================

function initFilterPanel() {
  filterToggle.addEventListener("click", () => {
    const isHidden = filterPanel.hidden;
    filterPanel.hidden = !isHidden;
    filterToggle.setAttribute("aria-expanded", isHidden);
  });
}

// =========================================
// CATEGORY FILTERS
// =========================================

function initCategoryFilters() {
  categoryBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      categoryBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      filterAndRender();
    });
  });
}

function updateCategoryCounts() {
  const categories = ["all", "automotive", "hospitality", "ecommerce", "technology"];
  
  categories.forEach(cat => {
    const count = cat === "all" 
      ? projects.length 
      : projects.filter(p => p.category === cat).length;
    const countEl = document.getElementById(`count-${cat}`);
    if (countEl) countEl.textContent = count;
  });
}

// =========================================
// SEARCH & FILTER
// =========================================

searchInput.addEventListener("input", (e) => {
  currentSearch = e.target.value.toLowerCase();
  filterAndRender();
});

function filterAndRender() {
  let filtered = projects;

  // Category filter
  if (currentCategory !== "all") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  // Search filter
  if (currentSearch) {
    filtered = filtered.filter(project => {
      const searchable = `${project.name} ${project.type} ${project.category} ${project.description}`.toLowerCase();
      return searchable.includes(currentSearch);
    });
  }

  renderProjects(filtered);
  updateResultCount(filtered.length);
}

function updateResultCount(count) {
  const plural = count !== 1 ? "s" : "";
  resultCount.textContent = `${count} project${plural}`;
}

// =========================================
// RENDER PROJECTS
// =========================================

function createProjectCard(project, index) {
  const node = cardTemplate.content.cloneNode(true);
  const card = node.querySelector(".card");
  
  card.style.animationDelay = `${index * 50}ms`;
  card.setAttribute("data-project-type", project.type.toLowerCase());
  card.setAttribute("data-category", project.category);

  // Type badge with icon
  const typeIcon = node.querySelector(".card-type-icon");
  typeIcon.className = `card-type-icon fas ${project.icon}`;
  node.querySelector(".type-label").textContent = project.type;

  // Title
  node.querySelector(".card-title").textContent = project.name;

  // Path
  node.querySelector(".card-path").textContent = project.path;

  // Description
  node.querySelector(".card-desc").textContent = project.description;

  // Category tag
  const categoryTag = node.querySelector(".category-tag");
  categoryTag.textContent = capitalizeCategory(project.category);

  // Action buttons
  const links = node.querySelectorAll(".btn");
  links.forEach((link, idx) => {
    link.href = project.path;
    if (idx === 0) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });

  return node;
}

function renderProjects(list) {
  projectGrid.innerHTML = "";

  if (!list.length) {
    emptyState.hidden = false;
    resultCount.textContent = "0 projects";
    return;
  }

  emptyState.hidden = true;

  const fragment = document.createDocumentFragment();
  list.forEach((project, index) => {
    fragment.appendChild(createProjectCard(project, index));
  });

  projectGrid.appendChild(fragment);
  updateResultCount(list.length);
}

// =========================================
// UTILITIES
// =========================================

function capitalizeCategory(str) {
  return str
    .split("-")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// =========================================
// KEYBOARD SHORTCUTS
// =========================================

document.addEventListener("keydown", (e) => {
  // CMD/CTRL + K to focus search
  if ((e.metaKey || e.ctrlKey) && e.key === "k") {
    e.preventDefault();
    searchInput.focus();
  }
  
  // ESC to clear search
  if (e.key === "Escape" && document.activeElement === searchInput) {
    searchInput.value = "";
    currentSearch = "";
    filterAndRender();
  }
});

// =========================================
// ACCESSIBILITY ENHANCEMENTS
// =========================================

// Add keyboard navigation for cards
document.addEventListener("keydown", (e) => {
  if (e.key === "Tab") {
    const cards = projectGrid.querySelectorAll(".card");
    cards.forEach(card => {
      card.addEventListener("keypress", (ev) => {
        if (ev.key === "Enter" || ev.key === " ") {
          const link = card.querySelector(".btn-primary");
          if (link) link.click();
        }
      });
    });
  }
});
