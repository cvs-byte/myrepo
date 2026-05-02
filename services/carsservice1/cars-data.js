const CARS = [
  {
    id: "c1",
    name: "Apex Veloce S",
    type: "Sedan",
    price: 54900,
    year: 2025,
    mileage: "8,500 mi",
    transmission: "Automatic",
    power: "420 hp",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    description: "A luxury sports sedan engineered for comfort at city speed and control on long highway drives.",
    rating: 4.8
  },
  {
    id: "c2",
    name: "Ridge Rover X7",
    type: "SUV",
    price: 68900,
    year: 2024,
    mileage: "12,200 mi",
    transmission: "Automatic",
    power: "390 hp",
    image: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
    description: "A bold SUV with adaptive suspension, panoramic roof, and an intelligent driver-assist package.",
    rating: 4.7
  },
  {
    id: "c3",
    name: "Voltara E-Prime",
    type: "Electric",
    price: 47900,
    year: 2026,
    mileage: "2,100 mi",
    transmission: "Single-speed",
    power: "360 hp",
    image: "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
    description: "A fully electric fastback with a long-range battery, rapid charging, and a minimalist cockpit.",
    rating: 4.9
  },
  {
    id: "c4",
    name: "Corsa GT Line",
    type: "Coupe",
    price: 73900,
    year: 2025,
    mileage: "5,700 mi",
    transmission: "Dual-clutch",
    power: "510 hp",
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1400&q=80",
    description: "A track-inspired coupe with aerodynamic bodywork, launch control, and premium sport seating.",
    rating: 4.8
  },
  {
    id: "c5",
    name: "Urban Trek Hybrid",
    type: "Hybrid",
    price: 41900,
    year: 2024,
    mileage: "15,900 mi",
    transmission: "CVT",
    power: "250 hp",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=1400&q=80",
    description: "A city-focused hybrid crossover built for smooth daily commuting and excellent fuel efficiency.",
    rating: 4.6
  },
  {
    id: "c6",
    name: "Titan Haul ZX",
    type: "Truck",
    price: 58900,
    year: 2025,
    mileage: "9,100 mi",
    transmission: "Automatic",
    power: "430 hp",
    image: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=1400&q=80",
    interior: "https://images.unsplash.com/photo-1486496572940-2bb2341fdbdf?auto=format&fit=crop&w=1400&q=80",
    description: "A heavy-duty pickup balancing towing strength, cabin comfort, and connected technology.",
    rating: 4.7
  }
];

const REVIEWS = [
  {
    name: "Marcus J.",
    text: "The showroom layout and car details made comparison easy. I booked a drive in under two minutes.",
    rating: 5
  },
  {
    name: "Ananya P.",
    text: "Premium inventory and transparent specs. The team from cvs cars services followed up quickly.",
    rating: 5
  },
  {
    name: "Luis R.",
    text: "Great browsing experience on mobile. The filters saved me time while choosing an electric model.",
    rating: 4
  }
];