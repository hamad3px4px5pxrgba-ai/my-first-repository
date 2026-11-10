/**
 * VELO APEX — PRODUCT CATALOG DATA
 * =============================================================================
 * Manage all products, editions, colorways, specs, and Amazon Buy Now links here.
 *
 * TO ADD A NEW PRODUCT:
 * Simply copy one of the product objects below, paste it into the VELO_PRODUCTS array,
 * and customize the id, edition, colors, price, specs, and amazonUrl.
 * =============================================================================
 */

const VELO_PRODUCTS = [
  {
    id: "apex-01-ember",
    slug: "ember",
    name: "VELO Apex 01",
    edition: "Ember Edition",
    tagline: "Run beyond the ground.",
    heroSubtitle:
      "A carbon-plated trainer with a cloud-soft landing and a response that feels like the road is pushing back.",
    shoeIntro: "Engineered like a machine. Felt like air.",
    shoeDescription:
      "Apex 01 balances 238 grams of featherweight structure with a 38 mm stack of responsive foam, so every stride returns more than you give.",
    price: "$229",
    priceNumeric: 229,
    currency: "USD",
    badge: "Signature Edition",
    ghostText: "APEX",
    colors: {
      primary: "#ff5a2c", // Vibrant Ember Orange
      secondary: "#ffb36b", // Warm Gold Glow
      accent: "#ea9d55", // Complementary accent
      glow: "rgba(255, 90, 44, 0.45)",
    },
    // Primary shoe image (transparent PNG). If file is missing locally, fallback is used automatically.
    image: "IMGS/pngtree-red-and-black-sports-shoes-png-image_16082181.png",
    // Valid Amazon Buy Now URL
    amazonUrl:
      "https://www.amazon.com/s?k=carbon+plated+running+shoes+road+racing&tag=veloapex-20",
    specs: {
      weight: 238,
      weightUnit: "g",
      energyReturn: 82,
      energyUnit: "%",
      stackHeight: 38,
      stackUnit: "mm",
      drop: 6,
      dropUnit: "mm",
    },
    features: [
      {
        num: "01",
        title: "AeroKnit 2.0 upper",
        desc: "Seamless, breathable, zoned for high-speed dynamic stretch.",
      },
      {
        num: "02",
        title: "FlexPlate carbon",
        desc: "Curved full-length spoon plate that springs you forward.",
      },
      {
        num: "03",
        title: "CloudCell foam",
        desc: "Ultralight supercritical PEBA: soft on landing, explosive on toe-off.",
      },
      {
        num: "04",
        title: "GripWeave outsole",
        desc: "Wet-asphalt traction compound with zero excess gram penalty.",
      },
    ],
    details: {
      lead: "The toe box is a 3D-woven mesh just 0.8 mm thick, mapped to the way your foot flexes at speed.",
      metrics:
        "Toe spring 14° · Heel bevel 9° · Midfoot rocker engineered for a seamless roll.",
    },
  },
  {
    id: "apex-01-glacier",
    slug: "glacier",
    name: "VELO Apex 01",
    edition: "Glacier Edition",
    tagline: "Sub-zero focus. Pure velocity.",
    heroSubtitle:
      "Tuned for icy tarmac and crisp morning tempos with hydrophobic AeroKnit and cryogenic CloudCell foam.",
    shoeIntro: "Cold-tested resilience. Zero compromise.",
    shoeDescription:
      "Glacier 01 features high-density micro-grooves and thermal-stabilized foam that maintains peak energy rebound even in freezing temperatures.",
    price: "$239",
    priceNumeric: 239,
    currency: "USD",
    badge: "All-Weather Pro",
    ghostText: "GLACIER",
    colors: {
      primary: "#2a8cff", // Glacier Cyan Blue
      secondary: "#7ef0ff", // Arctic Frost Glow
      accent: "#4fc3f7", // Frost accent
      glow: "rgba(42, 140, 255, 0.45)",
    },
    image: "IMGS/glacier-shoe.png",
    // Valid Amazon Buy Now URL
    amazonUrl:
      "https://www.amazon.com/s?k=mens+marathon+running+shoes+blue+carbon&tag=veloapex-20",
    specs: {
      weight: 242,
      weightUnit: "g",
      energyReturn: 84,
      energyUnit: "%",
      stackHeight: 39,
      stackUnit: "mm",
      drop: 6,
      dropUnit: "mm",
    },
    features: [
      {
        num: "01",
        title: "Hydro-Shield AeroKnit",
        desc: "Water-repellent nanocoating repels mist, slush, and puddle spray.",
      },
      {
        num: "02",
        title: "CryoPlate carbon",
        desc: "Thermally tempered matrix with uniform flex across all temperatures.",
      },
      {
        num: "03",
        title: "ArcticCloud foam",
        desc: "High-density microcellular cushioning with 84% measured energy rebound.",
      },
      {
        num: "04",
        title: "FrostGrip outsole",
        desc: "Siped perimeter siping for high wet-deck and icy asphalt grip.",
      },
    ],
    details: {
      lead: "Tested on wet alpine asphalt at 2°C to ensure zero loss of foam rebound or plate responsiveness.",
      metrics:
        "Toe spring 14.5° · Heel bevel 9.5° · Hydrophobic coating tested to 100km.",
    },
  },
  {
    id: "apex-01-volt",
    slug: "volt",
    name: "VELO Apex 01",
    edition: "Volt Edition",
    tagline: "Ignite the dark. Own the road.",
    heroSubtitle:
      "Photoluminescent carbon racer engineered for twilight tempo runs, midnight intervals, and maximum cadence.",
    shoeIntro: "High-lumen speed. Unstoppable tempo.",
    shoeDescription:
      "Ultra-high visibility meets the lightest build in the Apex line. 232 grams of pure kinetic energy return that commands attention in every stride.",
    price: "$249",
    priceNumeric: 249,
    currency: "USD",
    badge: "Night Velocity",
    ghostText: "VOLT",
    colors: {
      primary: "#9be620", // Electric Volt Lime
      secondary: "#f0ff7e", // Cyber Neon Yellow
      accent: "#b6ff2c", // Neon accent
      glow: "rgba(155, 230, 32, 0.45)",
    },
    image: "IMGS/volt-shoe.png",
    // Valid Amazon Buy Now URL
    amazonUrl:
      "https://www.amazon.com/s?k=neon+lime+marathon+racing+shoes+carbon+plate&tag=veloapex-20",
    specs: {
      weight: 232,
      weightUnit: "g",
      energyReturn: 86,
      energyUnit: "%",
      stackHeight: 37,
      stackUnit: "mm",
      drop: 5,
      dropUnit: "mm",
    },
    features: [
      {
        num: "01",
        title: "LumenWeave 2.0",
        desc: "Photoluminescent fibers glow for up to 3 hours after UV exposure.",
      },
      {
        num: "02",
        title: "SpeedFork carbon",
        desc: "Split-toe spoon plate tuned for ultra-fast forefoot turnover.",
      },
      {
        num: "03",
        title: "HyperCell foam",
        desc: "Nitrogen-infused ultra-rebound foam with class-leading 86% return.",
      },
      {
        num: "04",
        title: "SpeedTrac rubber",
        desc: "Minimalist zoned traction pads shave 6 grams off the total shoe weight.",
      },
    ],
    details: {
      lead: "360-degree reflectivity keeps you visible up to 200 metres in low-light and city headlight conditions.",
      metrics:
        "Toe spring 15° · Heel bevel 8.5° · High-cadence rocker tuned for sub-3:00/km pacing.",
    },
  },
  {
    id: "apex-01-stealth",
    slug: "stealth",
    name: "VELO Apex 01",
    edition: "Stealth Onyx",
    tagline: "Pure blackout. Pure velocity.",
    heroSubtitle:
      "Raw carbon weave, smoked translucent midsole, and pitch-black high-traction compound for discreet elite runners.",
    shoeIntro: "Subtle aesthetic. Lethal efficiency.",
    shoeDescription:
      "No distractions, no compromises. Stealth Onyx is stripped to the essential structural carbon skeleton for racers who let their splits do the talking.",
    price: "$259",
    priceNumeric: 259,
    currency: "USD",
    badge: "Limited Drop",
    ghostText: "STEALTH",
    colors: {
      primary: "#f4f5f8", // Platinum Silver
      secondary: "#94a3b8", // Titanium Grey
      accent: "#cbd5e1", // Chrome accent
      glow: "rgba(244, 245, 248, 0.35)",
    },
    image: "IMGS/stealth-shoe.png",
    // Valid Amazon Buy Now URL
    amazonUrl:
      "https://www.amazon.com/s?k=blackout+carbon+running+shoes+racing&tag=veloapex-20",
    specs: {
      weight: 230,
      weightUnit: "g",
      energyReturn: 85,
      energyUnit: "%",
      stackHeight: 38,
      stackUnit: "mm",
      drop: 6,
      dropUnit: "mm",
    },
    features: [
      {
        num: "01",
        title: "Matte Carbon Mesh",
        desc: "Anti-glare blackout mesh with reinforced ballistic monofilaments.",
      },
      {
        num: "02",
        title: "UniPlate 3K carbon",
        desc: "Visible exposed 3K carbon weave plate with progressive rigidity.",
      },
      {
        num: "03",
        title: "OnyxCell core",
        desc: "Pitch-black nitrogen foam with consistent dual-density cushioning.",
      },
      {
        num: "04",
        title: "Vulkan outsole",
        desc: "Carbon-infused volcanic rubber matrix for extreme abrasion durability.",
      },
    ],
    details: {
      lead: "Engineered with zero dyed pigments on the plate—pure structural autoclave carbon fiber.",
      metrics:
        "Toe spring 14.2° · Heel bevel 9.0° · Monofilament tensile strength rated at 480 N.",
    },
  },
];

// Helper functions for easy cross-page communication & retrieval
function getProductById(idOrSlug) {
  if (!idOrSlug) return null;
  const target = String(idOrSlug).toLowerCase().trim();
  return (
    VELO_PRODUCTS.find(
      (p) => p.id.toLowerCase() === target || p.slug.toLowerCase() === target,
    ) || null
  );
}

function getSelectedProduct() {
  // 1. Check URL query parameters (e.g. ?product=apex-01-glacier or ?id=glacier)
  if (typeof window !== "undefined" && window.location) {
    const params = new URLSearchParams(window.location.search);
    const fromParam =
      params.get("product") || params.get("id") || params.get("shoe");
    if (fromParam) {
      const p = getProductById(fromParam);
      if (p) return p;
    }

    // 2. Check URL hash (e.g. #glacier or #product-glacier)
    const hash = window.location.hash
      .replace(/^#/, "")
      .replace(/^product-/, "");
    if (hash) {
      const p = getProductById(hash);
      if (p) return p;
    }

    // 3. Check localStorage saved selection from another page
    try {
      const storedId = localStorage.getItem("velo_selected_product");
      if (storedId) {
        const p = getProductById(storedId);
        if (p) return p;
      }
    } catch (e) {
      // Storage unavailable or blocked
    }
  }

  // Default to first product (Ember Edition)
  return VELO_PRODUCTS[0];
}

function setSelectedProduct(productId) {
  const p = getProductById(productId);
  if (!p) return;
  try {
    localStorage.setItem("velo_selected_product", p.id);
  } catch (e) {}

  // Update URL search query without reloading page
  if (
    typeof window !== "undefined" &&
    window.history &&
    window.history.replaceState
  ) {
    const url = new URL(window.location.href);
    url.searchParams.set("product", p.slug);
    window.history.replaceState({}, "", url.toString());
  }
}

// Export for module systems (Node/ESM) while keeping window global available for plain browsers
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    VELO_PRODUCTS,
    getProductById,
    getSelectedProduct,
    setSelectedProduct,
  };
}
