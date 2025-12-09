// UPI PAYMENT CONFIGURATION
// ⚠️ IMPORTANT: Replace with your actual UPI ID
// Format: yourname@bankname or yourmobile@upi
const UPI_CONFIG = {
    upiId: 'fashionhub@paytm',  // Replace with your UPI ID
    merchantName: 'Fashion Hub',
    merchantCode: 'FASHION001'
};

const ICONS = {
    search: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>`,
    store: `<svg class="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>`,
    cart: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>`,
    menu: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" /></svg>`,
    chevronDown: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" /></svg>`,
    close: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
    emptyCart: `<svg class="w-24 h-24 mb-4 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>`,
    filter: `<svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>`,
    check: `<svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    back: `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" /></svg>`,
    feature: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" /></svg>`,
    heart: `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>`,
    zoomOut: `<svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>`,
    lock: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>`,
    user: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>`,
    logoMoon: `<svg class="w-full h-full text-[#FF6B35]" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path></svg>`
};

const BRANCHES = ["Mumbai HQ", "Andheri", "Mira Road", "Thane", "Navi Mumbai", "Pune", "Delhi"];


// FASHION NAVIGATION ITEMS - Updated for clothing categories
const NAV_ITEMS = [
    {
        label: "Men",
        category: "Men",
        image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=600&h=400",
        subItems: [
            {
                label: "Topwear",
                items: ["T-Shirts", "Casual Shirts", "Formal Shirts", "Hoodies", "Sweatshirts", "Jackets"]
            },
            {
                label: "Bottomwear",
                items: ["Jeans", "Casual Trousers", "Formal Trousers", "Shorts", "Track Pants"]
            },
            {
                label: "Accessories",
                items: ["Watches", "Belts", "Wallets", "Sunglasses", "Caps", "Socks"]
            }
        ]
    },
    {
        label: "Women",
        category: "Women",
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=600&h=400",
        subItems: [
            {
                label: "Western Wear",
                items: ["Dresses", "Tops", "T-Shirts", "Jeans", "Trousers", "Skirts"]
            },
            {
                label: "Ethnic Wear",
                items: ["Kurtas", "Kurtis", "Sarees", "Lehengas", "Salwar Suits"]
            },
            {
                label: "Accessories",
                items: ["Handbags", "Jewelry", "Watches", "Sunglasses", "Scarves"]
            }
        ]
    },
    {
        label: "Kids",
        category: "Kids",
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=600&h=400",
        subItems: [
            {
                label: "Boys",
                items: ["T-Shirts", "Shirts", "Jeans", "Shorts", "Ethnic Wear"]
            },
            {
                label: "Girls",
                items: ["Dresses", "Tops", "Jeans", "Skirts", "Ethnic Wear"]
            },
            {
                label: "Infants",
                items: ["Bodysuits", "Rompers", "Sets", "Sleepwear"]
            }
        ]
    },
    {
        label: "Footwear",
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=600&h=400",
        subItems: [
            {
                label: "Men's Footwear",
                items: ["Casual Shoes", "Formal Shoes", "Sports Shoes", "Sandals", "Sneakers"]
            },
            {
                label: "Women's Footwear",
                items: ["Heels", "Flats", "Sandals", "Sports Shoes", "Sneakers"]
            },
            {
                label: "Kids Footwear",
                items: ["School Shoes", "Sports Shoes", "Sandals", "Casual Shoes"]
            }
        ]
    },
    {
        label: "Accessories",
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=600&h=400",
        subItems: [
            {
                label: "Fashion",
                items: ["Watches", "Sunglasses", "Jewelry", "Belts", "Bags"]
            },
            {
                label: "Winter",
                items: ["Scarves", "Gloves", "Caps", "Mufflers"]
            },
            {
                label: "Tech",
                items: ["Phone Cases", "Earphones", "Smart Watches"]
            }
        ]
    }
];


// Helper images for gallery population - Fashion themed
const IMAGES = {
    men: [
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=800&h=600"
    ],
    women: [
        "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800&h=600"
    ],
    kids: [
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=800&h=600"
    ],
    footwear: [
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800&h=600"
    ],
    accessories: [
        "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800&h=600",
        "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&q=80&w=800&h=600"
    ]
};


// FASHION PRODUCTS - Each product has sizes with individual prices and stock
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Classic Cotton T-Shirt",
        category: "Men",
        subCategory: "T-Shirts",
        price: 499,
        displayPrice: "₹499",
        originalPrice: "₹799",
        basePrice: 499,
        image: IMAGES.men[0],
        images: IMAGES.men,
        description: "Premium quality cotton t-shirt with comfortable fit. Perfect for casual wear.",
        badge: "Bestseller",
        sku: "MTS001",
        features: ["100% Cotton", "Breathable Fabric", "Machine Washable", "Comfortable Fit"],
        colors: ["Black", "White", "Navy", "Gray"],
        sizes: {
            S: { price: 499, stock: 25 },
            M: { price: 499, stock: 30 },
            L: { price: 549, stock: 20 },
            XL: { price: 549, stock: 15 },
            XXL: { price: 599, stock: 10 }
        }
    },
    {
        id: 2,
        name: "Slim Fit Denim Jeans",
        category: "Men",
        subCategory: "Jeans",
        price: 1299,
        displayPrice: "₹1,299",
        originalPrice: "₹1,999",
        basePrice: 1299,
        image: IMAGES.men[1],
        images: IMAGES.men,
        description: "Stylish slim fit jeans with stretch fabric for comfort and style.",
        badge: "New",
        sku: "MJ001",
        features: ["Stretch Denim", "Slim Fit", "5 Pockets", "Durable"],
        colors: ["Blue", "Black", "Gray"],
        sizes: {
            "28": { price: 1299, stock: 12 },
            "30": { price: 1299, stock: 18 },
            "32": { price: 1299, stock: 22 },
            "34": { price: 1399, stock: 20 },
            "36": { price: 1399, stock: 15 },
            "38": { price: 1499, stock: 10 }
        }
    },
    {
        id: 3,
        name: "Casual Hoodie",
        category: "Men",
        subCategory: "Hoodies",
        price: 899,
        displayPrice: "₹899",
        originalPrice: "₹1,499",
        basePrice: 899,
        image: IMAGES.men[2],
        images: IMAGES.men,
        description: "Comfortable hoodie with soft fleece lining. Perfect for winter.",
        badge: "Sale",
        sku: "MH001",
        features: ["Fleece Lining", "Kangaroo Pocket", "Adjustable Hood", "Warm"],
        colors: ["Black", "Gray", "Navy", "Red"],
        sizes: {
            S: { price: 899, stock: 10 },
            M: { price: 899, stock: 15 },
            L: { price: 999, stock: 12 },
            XL: { price: 999, stock: 8 },
            XXL: { price: 1099, stock: 5 }
        }
    },
    {
        id: 4,
        name: "Floral Print Dress",
        category: "Women",
        subCategory: "Dresses",
        price: 1499,
        displayPrice: "₹1,499",
        originalPrice: "₹2,499",
        basePrice: 1499,
        image: IMAGES.women[0],
        images: IMAGES.women,
        description: "Beautiful floral print dress with comfortable fit. Perfect for summer.",
        badge: "Popular",
        sku: "WD001",
        features: ["Floral Print", "Breathable Fabric", "Comfortable Fit", "Summer Wear"],
        colors: ["Pink", "White", "Beige"],
        sizes: {
            S: { price: 1499, stock: 20 },
            M: { price: 1499, stock: 25 },
            L: { price: 1599, stock: 15 },
            XL: { price: 1599, stock: 10 },
            XXL: { price: 1699, stock: 5 }
        }
    },
    {
        id: 5,
        name: "Designer Kurti",
        category: "Women",
        subCategory: "Kurtis",
        price: 799,
        displayPrice: "₹799",
        originalPrice: "₹1,299",
        basePrice: 799,
        image: IMAGES.women[1],
        images: IMAGES.women,
        description: "Elegant designer kurti with intricate embroidery work.",
        badge: null,
        sku: "WK001",
        features: ["Embroidery Work", "Cotton Fabric", "Comfortable", "Ethnic Wear"],
        colors: ["White", "Pink", "Beige", "Blue"],
        sizes: {
            S: { price: 799, stock: 18 },
            M: { price: 799, stock: 22 },
            L: { price: 899, stock: 16 },
            XL: { price: 899, stock: 12 },
            XXL: { price: 999, stock: 8 }
        }
    },
    {
        id: 6,
        name: "Women's Skinny Jeans",
        category: "Women",
        subCategory: "Jeans",
        price: 1199,
        displayPrice: "₹1,199",
        originalPrice: "₹1,899",
        basePrice: 1199,
        image: IMAGES.women[2],
        images: IMAGES.women,
        description: "Trendy skinny jeans with perfect fit and stretch comfort.",
        badge: null,
        sku: "WJ001",
        features: ["Skinny Fit", "Stretch Fabric", "High Waist", "Stylish"],
        colors: ["Blue", "Black", "Gray"],
        sizes: {
            "28": { price: 1199, stock: 10 },
            "30": { price: 1199, stock: 16 },
            "32": { price: 1199, stock: 20 },
            "34": { price: 1299, stock: 18 },
            "36": { price: 1299, stock: 12 },
            "38": { price: 1399, stock: 8 }
        }
    },
    {
        id: 7,
        name: "Kids Graphic T-Shirt",
        category: "Kids",
        subCategory: "T-Shirts",
        price: 399,
        displayPrice: "₹399",
        originalPrice: "₹699",
        basePrice: 399,
        image: IMAGES.kids[0],
        images: IMAGES.kids,
        description: "Fun graphic t-shirt for kids with vibrant colors.",
        badge: "Trending",
        sku: "KT001",
        features: ["Soft Cotton", "Vibrant Print", "Comfortable", "Durable"],
        colors: ["Red", "Blue", "Green", "White"],
        sizes: {
            S: { price: 399, stock: 30 },
            M: { price: 399, stock: 35 },
            L: { price: 449, stock: 25 },
            XL: { price: 449, stock: 20 },
            XXL: { price: 499, stock: 15 }
        }
    },
    {
        id: 8,
        name: "Kids Denim Shorts",
        category: "Kids",
        subCategory: "Shorts",
        price: 599,
        displayPrice: "₹599",
        originalPrice: "₹999",
        basePrice: 599,
        image: IMAGES.kids[1],
        images: IMAGES.kids,
        description: "Comfortable denim shorts for active kids.",
        badge: null,
        sku: "KS001",
        features: ["Denim Fabric", "Adjustable Waist", "Pockets", "Durable"],
        colors: ["Blue", "Black"],
        sizes: {
            S: { price: 599, stock: 20 },
            M: { price: 599, stock: 25 },
            L: { price: 649, stock: 18 },
            XL: { price: 649, stock: 12 },
            XXL: { price: 699, stock: 8 }
        }
    },
    {
        id: 9,
        name: "Running Shoes",
        category: "Footwear",
        subCategory: "Sports Shoes",
        price: 1999,
        displayPrice: "₹1,999",
        originalPrice: "₹3,499",
        basePrice: 1999,
        image: IMAGES.footwear[0],
        images: IMAGES.footwear,
        description: "Lightweight running shoes with excellent cushioning.",
        badge: "Comfort",
        sku: "FS001",
        features: ["Lightweight", "Cushioned Sole", "Breathable", "Anti-Slip"],
        colors: ["Black", "White", "Blue", "Red"],
        sizes: {
            S: { price: 1999, stock: 12 },
            M: { price: 1999, stock: 15 },
            L: { price: 2099, stock: 10 },
            XL: { price: 2099, stock: 8 },
            XXL: { price: 2199, stock: 5 }
        }
    },
    {
        id: 10,
        name: "Casual Sneakers",
        category: "Footwear",
        subCategory: "Sneakers",
        price: 1599,
        displayPrice: "₹1,599",
        originalPrice: "₹2,799",
        basePrice: 1599,
        image: IMAGES.footwear[1],
        images: IMAGES.footwear,
        description: "Stylish casual sneakers for everyday wear.",
        badge: null,
        sku: "FS002",
        features: ["Casual Style", "Comfortable", "Durable Sole", "Trendy"],
        colors: ["White", "Black", "Navy"],
        sizes: {
            S: { price: 1599, stock: 10 },
            M: { price: 1599, stock: 14 },
            L: { price: 1699, stock: 12 },
            XL: { price: 1699, stock: 8 },
            XXL: { price: 1799, stock: 4 }
        }
    },
    {
        id: 11,
        name: "Leather Watch",
        category: "Accessories",
        subCategory: "Watches",
        price: 2499,
        displayPrice: "₹2,499",
        originalPrice: "₹4,999",
        basePrice: 2499,
        image: IMAGES.accessories[0],
        images: IMAGES.accessories,
        description: "Premium leather strap watch with elegant design.",
        badge: "Premium",
        sku: "AW001",
        features: ["Leather Strap", "Water Resistant", "Elegant Design", "1 Year Warranty"],
        colors: ["Brown", "Black"],
        sizes: {
            S: { price: 2499, stock: 8 },
            M: { price: 2499, stock: 10 },
            L: { price: 2499, stock: 6 },
            XL: { price: 2499, stock: 4 },
            XXL: { price: 2499, stock: 2 }
        }
    },
    {
        id: 12,
        name: "Designer Handbag",
        category: "Accessories",
        subCategory: "Handbags",
        price: 1899,
        displayPrice: "₹1,899",
        originalPrice: "₹3,499",
        basePrice: 1899,
        image: IMAGES.accessories[1],
        images: IMAGES.accessories,
        description: "Stylish designer handbag with multiple compartments.",
        badge: null,
        sku: "AH001",
        features: ["Multiple Compartments", "Durable Material", "Stylish", "Spacious"],
        colors: ["Black", "Brown", "Beige"],
        sizes: {
            S: { price: 1899, stock: 6 },
            M: { price: 1899, stock: 8 },
            L: { price: 1999, stock: 5 },
            XL: { price: 1999, stock: 3 },
            XXL: { price: 2099, stock: 2 }
        }
    }
];

// Load products from LocalStorage or use default
let storedProducts = localStorage.getItem('sleepSoundProducts');
const PRODUCTS = storedProducts ? JSON.parse(storedProducts) : DEFAULT_PRODUCTS;


// HERO SLIDES - Updated for fashion
const SLIDES = [
    {
        image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1600&h=600",
        title: "Fashion That Defines You",
        subtitle: "Discover the latest trends in clothing and accessories",
        cta: "Shop Now",
        offer: "Up to 50% OFF",
        category: "Women"
    },
    {
        image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1600&h=600",
        title: "Men's Collection",
        subtitle: "Elevate your style with premium menswear",
        cta: "Explore Men",
        offer: "Free Delivery",
        category: "Men"
    },
    {
        image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=1600&h=600",
        title: "Kids Fashion",
        subtitle: "Comfortable and stylish clothing for your little ones",
        cta: "Shop Kids",
        offer: "Buy 2 Get 1 Free",
        category: "Kids"
    }
];

const CATEGORY_MODAL_DATA = {
    'Men': {
        title: 'Men\'s Fashion',
        items: [
            { name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Shirts', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Jackets', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Trousers', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400', category: 'Men' },
            { name: 'Footwear', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=400', category: 'Men' }
        ]
    },
    'Women': {
        title: 'Women\'s Fashion',
        items: [
            { name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Tops', image: 'https://images.unsplash.com/photo-1564859228273-274232fdb516?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Jeans', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Kurtas', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Accessories', image: 'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', category: 'Women' },
            { name: 'Footwear', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400', category: 'Women' }
        ]
    },
    'Kids': {
        title: 'Kids Fashion',
        items: [
            { name: 'Boys T-Shirts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400', category: 'Kids' },
            { name: 'Girls Dresses', image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?auto=format&fit=crop&q=80&w=400', category: 'Kids' },
            { name: 'Boys Jeans', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=400', category: 'Kids' },
            { name: 'Girls Tops', image: 'https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=400', category: 'Kids' },
            { name: 'Shorts', image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&q=80&w=400', category: 'Kids' },
            { name: 'Ethnic Wear', image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?auto=format&fit=crop&q=80&w=400', category: 'Kids' }
        ]
    },
    'Footwear': {
        title: 'Footwear Collection',
        items: [
            { name: 'Sports Shoes', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400', category: 'Footwear' },
            { name: 'Casual Shoes', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=400', category: 'Footwear' },
            { name: 'Formal Shoes', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=400', category: 'Footwear' },
            { name: 'Sneakers', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&q=80&w=400', category: 'Footwear' },
            { name: 'Sandals', image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?auto=format&fit=crop&q=80&w=400', category: 'Footwear' },
            { name: 'Heels', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=400', category: 'Footwear' }
        ]
    },
    'Accessories': {
        title: 'Fashion Accessories',
        items: [
            { name: 'Watches', image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=400', category: 'Accessories' },
            { name: 'Sunglasses', image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400', category: 'Accessories' },
            { name: 'Handbags', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=400', category: 'Accessories' },
            { name: 'Jewelry', image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=400', category: 'Accessories' },
            { name: 'Belts', image: 'https://images.unsplash.com/photo-1624222247344-550fb60583bb?auto=format&fit=crop&q=80&w=400', category: 'Accessories' },
            { name: 'Wallets', image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=400', category: 'Accessories' }
        ]
    }
};
