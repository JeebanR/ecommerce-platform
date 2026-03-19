// ─── CATEGORIES ─────────────────────────────────────────────
export const CATEGORIES = [
  { id: 1,  name: "Fruits & Vegetables", slug: "fruits-vegetables", icon: "🥦", color: "#e8f5e9", textColor: "#2e7d32", count: 48 },
  { id: 2,  name: "Dairy & Eggs",        slug: "dairy-eggs",        icon: "🥛", color: "#fff8e1", textColor: "#f57f17", count: 32 },
  { id: 3,  name: "Snacks & Beverages",  slug: "snacks-beverages",  icon: "🍪", color: "#fce4ec", textColor: "#c62828", count: 65 },
  { id: 4,  name: "Bakery",              slug: "bakery",            icon: "🍞", color: "#fff3e0", textColor: "#e65100", count: 28 },
  { id: 5,  name: "Cleaning",            slug: "cleaning",          icon: "🧹", color: "#e3f2fd", textColor: "#1565c0", count: 41 },
  { id: 6,  name: "Personal Care",       slug: "personal-care",     icon: "🧴", color: "#f3e5f5", textColor: "#6a1b9a", count: 53 },
  { id: 7,  name: "Staples & Grocery",   slug: "staples-grocery",   icon: "🌾", color: "#e8eaf6", textColor: "#283593", count: 70 },
  { id: 8,  name: "Frozen Foods",        slug: "frozen-foods",      icon: "🧊", color: "#e0f7fa", textColor: "#006064", count: 22 },
  { id: 9,  name: "Breakfast & Cereal",  slug: "breakfast-cereal",  icon: "🥣", color: "#fdf6ec", textColor: "#a16207", count: 19 },
  { id: 10, name: "Baby Care",           slug: "baby-care",         icon: "🍼", color: "#fdf2f8", textColor: "#9d174d", count: 35 },
];

// ─── PRODUCTS ────────────────────────────────────────────────
export const PRODUCTS = [
  {
    id: 1,  name: "Fresh Alphonso Mangoes",      category: 1, price: 299,  mrp: 349,  unit: "1 kg",    rating: 4.7, reviews: 134, badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&q=80",
    description: "Sweet and juicy Alphonso mangoes sourced directly from Ratnagiri farms. Rich in vitamins A & C, antioxidants, and dietary fibre. Each mango is hand-picked at the peak of ripeness.",
    highlights: ["Farm Fresh", "Rich in Vitamins", "No Preservatives", "Hand-picked"],
  },
  {
    id: 2,  name: "Amul Gold Full Cream Milk",   category: 2, price: 68,   mrp: 68,   unit: "1 litre", rating: 4.8, reviews: 289, badge: "FRESH",
    img: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=500&q=80",
    description: "Amul Gold is rich, creamy full-fat milk. Perfect for tea, coffee, sweets and everyday cooking. Standardised to 6% fat and 9% SNF for maximum nutrition.",
    highlights: ["6% Fat", "Pasteurized", "Homogenised", "Tetra Pack"],
  },
  {
    id: 3,  name: "Lay's American Style Cream & Onion", category: 3, price: 20, mrp: 20, unit: "26 g", rating: 4.5, reviews: 412, badge: "HOT",
    img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=500&q=80",
    description: "Crispy wafer-thin potato chips with the classic American style cream & onion flavour. The perfect snack for any time of the day.",
    highlights: ["Crispy Texture", "No Artificial Colours", "Resealable Pack"],
  },
  {
    id: 4,  name: "Harvest Gold Whole Wheat Bread", category: 4, price: 40, mrp: 45, unit: "400 g", rating: 4.3, reviews: 98, badge: null,
    img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80",
    description: "Soft and nutritious whole wheat bread baked fresh every morning. Made with 100% whole wheat flour, rich in dietary fibre.",
    highlights: ["100% Whole Wheat", "Baked Fresh Daily", "High Fibre", "No Maida"],
  },
  {
    id: 5,  name: "Harpic Power Plus Toilet Cleaner", category: 5, price: 89, mrp: 100, unit: "500 ml", rating: 4.6, reviews: 176, badge: "OFFER",
    img: "https://images.unsplash.com/photo-1585421514738-01798e348b17?w=500&q=80",
    description: "Harpic Power Plus cleans, disinfects and deodorises your toilet in one easy step. Kills 99.9% of germs and removes tough stains.",
    highlights: ["Kills 99.9% Germs", "Removes Stains", "Fresh Fragrance", "Easy Squeeze Bottle"],
  },
  {
    id: 6,  name: "Dove Moisturising Beauty Bar",  category: 6, price: 55,  mrp: 60,   unit: "75 g",   rating: 4.7, reviews: 203, badge: null,
    img: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80",
    description: "Dove Beauty Bar with ¼ moisturising cream that cleans and cares for your skin. Leaves skin noticeably softer and smoother after every wash.",
    highlights: ["¼ Moisturising Cream", "Dermatologist Tested", "For All Skin Types", "Gentle Formula"],
  },
  {
    id: 7,  name: "Tata Salt Lite Low Sodium",      category: 7, price: 28,  mrp: 30,   unit: "1 kg",   rating: 4.9, reviews: 540, badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?w=500&q=80",
    description: "Tata Salt Lite has 15% less sodium than regular salt, making it the ideal choice for health-conscious households. Same great taste, less sodium.",
    highlights: ["15% Less Sodium", "Iodised", "Free-flowing", "Health Choice"],
  },
  {
    id: 8,  name: "McCain Smiles Potato Snacks",   category: 8, price: 150, mrp: 175,  unit: "420 g",  rating: 4.4, reviews: 87,  badge: "OFFER",
    img: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&q=80",
    description: "McCain Smiles are fun smiley-faced potato snacks. Made from real potatoes, they're ready in minutes and loved by kids and adults alike.",
    highlights: ["Real Potatoes", "Ready in 10 mins", "Kids Favourite", "No Preservatives"],
  },
  {
    id: 9,  name: "Farm Fresh Cherry Tomatoes",    category: 1, price: 49,  mrp: 60,   unit: "500 g",  rating: 4.6, reviews: 211, badge: "FRESH",
    img: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=500&q=80",
    description: "Plump, ripe cherry tomatoes bursting with flavour. Rich in lycopene and antioxidants. Perfect for salads, pasta, and cooking.",
    highlights: ["Farm Fresh", "High Lycopene", "Perfect for Salads", "Organically Grown"],
  },
  {
    id: 10, name: "Epigamia Greek Yogurt Strawberry", category: 2, price: 85, mrp: 95, unit: "200 g", rating: 4.5, reviews: 162, badge: null,
    img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=500&q=80",
    description: "Rich, thick and creamy Greek-style yogurt with real strawberry pieces. High in protein and probiotics for a healthy gut.",
    highlights: ["High Protein", "Live Cultures", "Real Fruit", "No Artificial Sweeteners"],
  },
  {
    id: 11, name: "Tropicana 100% Orange Juice",   category: 3, price: 120, mrp: 130,  unit: "1 litre",rating: 4.6, reviews: 295, badge: "HOT",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=500&q=80",
    description: "100% pure squeezed orange juice with no added sugar or preservatives. Packed with Vitamin C for your daily immunity boost.",
    highlights: ["No Added Sugar", "100% Pure Juice", "Vitamin C Rich", "No Preservatives"],
  },
  {
    id: 12, name: "India Gate Classic Basmati Rice", category: 7, price: 320, mrp: 360, unit: "5 kg", rating: 4.8, reviews: 632, badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=500&q=80",
    description: "Premium aged long-grain basmati rice with a natural aromatic fragrance. Every grain cooks to perfection — long, fluffy and separate.",
    highlights: ["Aged Grain", "Extra Long", "Non-sticky", "Aromatic"],
  },
  {
    id: 13, name: "Saffola Gold Blended Oil",       category: 7, price: 210, mrp: 240,  unit: "1 litre",rating: 4.5, reviews: 388, badge: null,
    img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=500&q=80",
    description: "Saffola Gold is a blended edible oil with Oryzanol — a natural ingredient that helps maintain healthy cholesterol levels.",
    highlights: ["Low Absorb Technology", "Rich in MUFA", "Heart Friendly", "No Cholesterol"],
  },
  {
    id: 14, name: "Organic Spinach Bunch",          category: 1, price: 35,  mrp: 40,   unit: "250 g",  rating: 4.4, reviews: 94,  badge: "FRESH",
    img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=500&q=80",
    description: "Fresh organic spinach, handpicked from certified farms. Rich in iron, calcium, and vitamins K and A.",
    highlights: ["Certified Organic", "Iron Rich", "Pesticide Free", "Farm to Table"],
  },
  {
    id: 15, name: "Britannia NutriChoice Digestive", category: 3, price: 65, mrp: 70, unit: "400 g", rating: 4.6, reviews: 277, badge: null,
    img: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
    description: "Britannia NutriChoice Digestive biscuits made with 50% whole wheat. High in fibre and perfect for a healthy, guilt-free snack.",
    highlights: ["50% Whole Wheat", "High Fibre", "Digestive Health", "Low Sugar"],
  },
  {
    id: 16, name: "Nescafé Classic Instant Coffee",  category: 3, price: 220, mrp: 250, unit: "100 g", rating: 4.7, reviews: 504, badge: "BESTSELLER",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=500&q=80",
    description: "Nescafé Classic is made from a unique blend of robusta and arabica coffee beans, roasted and blended to give you a rich, smooth taste.",
    highlights: ["Robust Flavour", "Quick Dissolve", "Freshness Sealed", "100% Pure Coffee"],
  },
];

// ─── ADMIN STATS ─────────────────────────────────────────────
export const ADMIN_STATS = [
  { label: "Total Revenue",  value: "₹2,48,500", change: "+12.4%", trend: "up",   icon: "💰", color: "#fff3ee" },
  { label: "Orders Today",   value: "127",        change: "+8.1%",  trend: "up",   icon: "📦", color: "#e8f5e9" },
  { label: "Active Products",value: "348",        change: "+4",     trend: "up",   icon: "🛒", color: "#e3f2fd" },
  { label: "Total Customers",value: "7,842",      change: "+5.6%",  trend: "up",   icon: "👤", color: "#f3e5f5" },
];

// ─── RECENT ORDERS ───────────────────────────────────────────
export const RECENT_ORDERS = [
  { id: "#ORD-2841", customer: "Ravi Kumar",   date: "18 Mar 2025", items: 4, amount: "₹1,240", status: "Delivered",  avatar: "RK" },
  { id: "#ORD-2840", customer: "Priya Sharma", date: "18 Mar 2025", items: 2, amount: "₹580",   status: "Processing", avatar: "PS" },
  { id: "#ORD-2839", customer: "Anil Mehta",   date: "17 Mar 2025", items: 6, amount: "₹2,100", status: "Shipped",    avatar: "AM" },
  { id: "#ORD-2838", customer: "Sunita Rao",   date: "17 Mar 2025", items: 1, amount: "₹299",   status: "Delivered",  avatar: "SR" },
  { id: "#ORD-2837", customer: "Vikram Joshi",  date: "16 Mar 2025", items: 3, amount: "₹750",   status: "Cancelled",  avatar: "VJ" },
  { id: "#ORD-2836", customer: "Meera Nair",   date: "16 Mar 2025", items: 5, amount: "₹1,820", status: "Delivered",  avatar: "MN" },
  { id: "#ORD-2835", customer: "Deepak Singh", date: "15 Mar 2025", items: 2, amount: "₹430",   status: "Shipped",    avatar: "DS" },
];
