import { ProductCategory, Project, CompanyValue, Testimonial } from "./types";

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: "glass",
    name: "Glass Products",
    description: "Architectural glass engineering with uncompromising transparency, safety, and acoustic luxury.",
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=82&w=800",
    subcategories: [
      { id: "glass-railings", name: "Aluminum Glass Railings", description: "Minimal visual profile railings offering seamless vistas, custom-engineered for strength." },
      { id: "system-windows", name: "Aluminum System Windows", description: "Premium soundproof and thermal-insulated sliding & casement windows with sleek profiles." },
      { id: "sleek-partitions", name: "Aluminum Sleek Partitions", description: "Ultra-slim internal divider systems providing structural soundness with absolute acoustic control." },
      { id: "switchable-film", name: "Switchable Glass Film", description: "Smart electrochromic film transitioning from absolute frosted opacity to perfect optical clarity on demand." },
      { id: "laminated-glass", name: "Fabric Laminated Glass", description: "Exquisite custom fabrics sealed within double layers of tempered architectural glass." }
    ]
  },
  {
    id: "aluminum",
    name: "Aluminum Products",
    description: "Sleek, high-durability exterior systems designed to protect and beautify executive facades.",
    coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=82&w=800",
    subcategories: [
      { id: "facade", name: "Aluminum Façade", description: "Stunning ventilated curtain walls and structural louvers engineered for dynamic ambient lighting." },
      { id: "shutters", name: "Aluminum Rolling Shutters", description: "Heavy-duty electric motorized security shutters blending seamlessly with architectural facades." },
      { id: "security-mesh", name: "Aluminum Security Mesh", description: "Vandal-proof, highly breathable structural stainless/aluminum micro-mesh window treatments." },
      { id: "zip-screens", name: "Aluminum Zip Screens", description: "Motorized outdoor windproof privacy screens offering solar shielding and anti-insect blockades." },
      { id: "pergola", name: "Aluminum Motorised Pergola", description: "Smart bioclimatic roofing systems with adjustable louvers for all-season climate adjustment." },
      { id: "invisible-grills", name: "Invisible Grills", description: "Ultra-thin high-tensile marine-grade stainless core grills for balconies with zero view hindrance." }
    ]
  },
  {
    id: "pvd",
    name: "PVD Products",
    description: "Physical Vapor Deposition gold, rose-gold, and champagne metallic luxury elements for elite trim work.",
    coverImage: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=82&w=800",
    subcategories: [
      { id: "pvd-partitions", name: "PVD Partitions", description: "Precision CNC cut laser-pattern partition screens with durable vacuum titanium-ion gold plating." },
      { id: "pvd-furniture", name: "PVD Furniture", description: "Bespoke executive coffee table bases, consoles, dining frames, and retail racks in rich mirror golds." }
    ]
  },
  {
    id: "brass",
    name: "Brass Products",
    description: "Artisanal cast and extruded solid brass products, antiqued, hand-polished and inlay-detailed.",
    coverImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=82&w=800",
    subcategories: [
      { id: "brass-idols", name: "Brass Idols", description: "Masterfully hand-sculpted temple and home-shrine deities reflecting classical Indian artistic heritage." },
      { id: "brass-fixtures", name: "Brass Fixtures & Motifs", description: "Custom cabinet pulls, architectural pivot door handles, and gorgeous wall studs cast in pure brass." },
      { id: "brass-inlay", name: "Brass Inlay Products", description: "Intricate solid brass geometric inserts polished flush into premium hardwood or marble floor slabs." }
    ]
  },
  {
    id: "resin",
    name: "Resin Epoxy Products",
    description: "Luminous, crystal-clear deep epoxy pours cast with exotic live-edge timber slabs.",
    coverImage: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&q=82&w=800",
    subcategories: [
      { id: "resin-furniture", name: "Resin Epoxy Furniture", description: "Elite river tables, conference slabs, and nesting tables using liquid resins and highly grain-dense woods." },
      { id: "resin-fixtures", name: "Resin Epoxy Fixtures", description: "Stunning backlit counter splashbacks, light-transmitting solid panels, and custom-embellished drawer fronts." }
    ]
  }
];

export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: "Uncompromising Quality",
    description: "We partner with reputed brands and use superior materials to deliver finishes that stand the test of time.",
    accentTitle: "Quality"
  },
  {
    title: "Craftsmanship Excellence",
    description: "Our skilled professionals combine experience, precision and attention to detail to achieve flawless execution.",
    accentTitle: "Precision"
  },
  {
    title: "Client-Centric Approach",
    description: "We believe luxury lies in experience. From consultation to completion, we offer personalized service and complete transparency.",
    accentTitle: "Experience"
  },
  {
    title: "Integrity & Trust",
    description: "We build enduring relationships through ethical practices, accountability and consistent delivery.",
    accentTitle: "Trust"
  },
  {
    title: "Timeless Design",
    description: "We focus on elegant, functional, and enduring designs that elevate living and working spaces.",
    accentTitle: "Elegance"
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "vittal-kumar",
    name: "Vittal Kumar",
    role: "Premium Homeowner",
    company: "Google Maps Review",
    content: "Absolutely fantastic work carried out by The Railing Point and Vishva Interiors. They installed custom glass handrails with brass heavy connectors in our residential duplex. Beautiful high-end mirror finish, on-time completion, and very professional execution!",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "mandavilli-karthikeya",
    name: "Mandavilli Karthikeya",
    role: "Villa Client",
    company: "Google Maps Review",
    content: "We got custom glass partitions and heavy-duty premium sliding window systems installed from Vishva Interiors. The material quality, response speed, and showroom presentation at Visakhapatnam were outstanding. Best upscale interior engineers in Andhra Pradesh!",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "1",
    name: "Vijay Ramaraju",
    role: "Chief Architect",
    company: "Amaravati Urban Designers",
    content: "Vishva Interiors transformed our luxury ocean villa project in Visakhapatnam. Their PVD titanium partitions and custom-engineered glass railings are of absolute world-class standard. The precision and attention to detail are unprecedented.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "2",
    name: "Anjali Chowdary",
    role: "Managing Director",
    company: "Chowdary Estates",
    content: "Our experience with Vishva Interiors began in 2018. From simple aluminum system windows to complex bioclimatic motorized pergolas, they have consistently proven why they are the leading luxury brand in Andhra Pradesh.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "3",
    name: "Satish Kumar Peddinti",
    role: "Property Owner",
    company: "Rajahmundry Smart Living Resorts",
    content: "The Railing Point & Antiques is hands down the best place in East Godavari for high quality glass staircases and structural works. We completed our duplex glass handrails with brass heavy connectors. Beautiful mirror-finish and on-time completion!",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "4",
    name: "Naidu Apparao",
    role: "Residence Representative",
    company: "MVP Colony Premium Villa, Visakhapatnam",
    content: "Visited their Vizag experience yard and was fascinated by their custom epoxy resin river tables and high-grade metal partition setups. The PVD coating is flawless and extremely luxurious. Vishva Interiors has top-tier installers who did an exceptionally clean job.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "5",
    name: "Sanjay Reddy",
    role: "Principal Designer",
    company: "Reddy Space Consultants, Rajahmundry",
    content: "The epoxy resin conference table and integrated brass inlay floors they produced for our corporate office left our clients speechless. Highly responsive, premium materials, and flawless post-sales warranty support.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "6",
    name: "Vara Lakshmi",
    role: "Interior Stylist",
    company: "Bespoke Spaces Kakinada",
    content: "Got a dynamic motorized pergola and architectural safety laminated glass facade done for our retail client. Exceptional custom engineering, leak-proof wind durability testing, and premium design assistance from Rajahmundry & Vizag hubs.",
    avatar: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "7",
    name: "Venkata Prasad",
    role: "Building Consultant",
    company: "Srinivasa Premium Builders, Guntur",
    content: "I strongly recommend Vishva Interiors for slim-line aluminum system profile windows and sliding glass assemblies. Truly superb extrusion quality, noise proof glazing, and exceptionally smooth rollers that glide effortless with finger touch.",
    avatar: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "8",
    name: "K. Srinivasa Rao",
    role: "Senior Project Engineer",
    company: "AP Infrastructure Works, Guntur",
    content: "Have been a regular buyer from 'The Railing Point & Antiques' since their initial decade. Their expansion into custom cast heavy brass and metal cladding under Vishva Interiors is a huge plus for builders in Andhra Pradesh demanding international structural glass standards.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    rating: 5
  },
  {
    id: "9",
    name: "Geetha Chowdary",
    role: "Villa Client",
    company: "Madhurawada Sea View Residency",
    content: "Absolutely amazing experience with their complete frameless glass balcony railings & profile sliding panels. Vishva Interiors has a dedicated site support team that provides instant assistance and respects structural standards perfectly. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    rating: 5
  }
];

// Architectural images with high visual contrast and premium details
// This database contains curated high quality imagery categorized by our major subcategories,
// allowing us to generate 100+ unique imagery entries.
export const GAL_IMAGES: Record<string, string[]> = {
  "glass-railings": [
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f"
  ],
  "system-windows": [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    "https://images.unsplash.com/photo-1449034446853-66c86144b0ad",
    "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00"
  ],
  "sleek-partitions": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c",
    "https://images.unsplash.com/photo-1497215728101-856f4ea42174",
    "https://images.unsplash.com/photo-1524758631624-e2822e304c36",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
  ],
  "switchable-film": [
    "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f"
  ],
  "laminated-glass": [
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    "https://images.unsplash.com/photo-1517581177682-a085bb7ffb15",
    "https://images.unsplash.com/photo-1527030280862-64139fbe04ca"
  ],
  "facade": [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    "https://images.unsplash.com/photo-1490730141103-6cac27aaab94",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f",
    "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
  ],
  "shutters": [
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
    "https://images.unsplash.com/photo-1540518614846-7eded433c457"
  ],
  "security-mesh": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    "https://images.unsplash.com/photo-1558882224-cca166733360"
  ],
  "zip-screens": [
    "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b",
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88"
  ],
  "pergola": [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3",
    "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c"
  ],
  "invisible-grills": [
    "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf",
    "https://images.unsplash.com/photo-1513694203232-719a280e022f"
  ],
  "pvd-partitions": [
    "https://images.unsplash.com/photo-1617806118233-18e1db207f62",
    "https://images.unsplash.com/photo-1600607687644-c7171b42498f",
    "https://images.unsplash.com/photo-1505691938895-1758d7feb511"
  ],
  "pvd-furniture": [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c",
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38"
  ],
  "brass-idols": [
    "https://images.unsplash.com/photo-1606293926075-69a00dbfde81",
    "https://images.unsplash.com/photo-1544413647-abf284f1a28a"
  ],
  "brass-fixtures": [
    "https://images.unsplash.com/photo-1618219944342-824e40a13285",
    "https://images.unsplash.com/photo-1615529182904-14819c35db37"
  ],
  "brass-inlay": [
    "https://images.unsplash.com/photo-1513519245088-0e12902e5a38",
    "https://images.unsplash.com/photo-1502005229762-fc1b2b812ca5"
  ],
  "resin-furniture": [
    "https://images.unsplash.com/photo-1533090161767-e6ffed986c88",
    "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e",
    "https://images.unsplash.com/photo-1595428774223-ef52624120d2"
  ],
  "resin-fixtures": [
    "https://images.unsplash.com/photo-1507652313519-d4e9174996dd",
    "https://images.unsplash.com/photo-1544207621-e00994fd73ff"
  ]
};

const ANDHRA_PRADESH_LOCATIONS = [
  "Visakhapatnam Beach Road",
  "Amaravati Corporate Enclave",
  "Rajahmundry Godavari Esplanade",
  "Vijayawada Gateway Tower",
  "Kakinada Smart City Heights",
  "Guntur Premium Duplex",
  "Nellore Sanctuary Residence",
  "Tirupati Devsthan Executive Lounge",
  "Kurnool Heritage Suites",
  "Visakhapatnam Rushikonda Estates"
];

const DIFFICULTY_LEVELS = ["Architectural (Elite)", "Complex Structural", "Bespoke Craftsmanship", "Precision Engineering", "Artisanal Custom"];

const MATERIALS_POOL: Record<string, string[]> = {
  glass: ["12mm Saint Gobain Glass", "Dorma Glass Fittings", "Laminated PVB Film", "6063-T6 Aluminum Channel", "Titanium Screws"],
  aluminum: ["Schüco Thermally Broken Profile", "Jindal Architectural Grade Extrusions", "Stainless Steel Security Mesh", "Motorized Somfy Drive", "EPDM Gaskets"],
  pvd: ["Vacuum Titanium Coated Gold Plated Brass", "304 Grade Stainless Steel CNC Base", "Mirror Gold Finish Strip", "PVD Matte Champagne Framing"],
  brass: ["Pure Virgin Brass Rod", "Artisanal Acidic Antique Polishing", "Lacquered Micro Protection", "Solid Cast Heavy Brass Hardware"],
  resin: ["Ultra-Clear Casting Resin", "Solid Burled Walnut", "Exotic Live-Edge Teak Base", "Heat Resistant Liquid Epoxies", "Micro-Pearl Metallic Powders"]
};

// Generates 150 project portfolio items to represent the "hundreds of them" requirement smoothly.
export function generateProjects(): Project[] {
  const projects: Project[] = [];
  let projId = 1;

  // Let's create high quality curated seed lists based on the subcategories
  PRODUCT_CATEGORIES.forEach((cat) => {
    cat.subcategories.forEach((subcat) => {
      const parentCatId = cat.id;
      const subcatId = subcat.id;

      // Create 6-8 projects per subcategory to reach around 150 total highly distinctive projects
      const projectCount = 7;
      for (let index = 1; index <= projectCount; index++) {
        const idStr = `proj-${projId}`;
        const loc = ANDHRA_PRADESH_LOCATIONS[(projId + index) % ANDHRA_PRADESH_LOCATIONS.length];
        const difficulty = DIFFICULTY_LEVELS[(projId + 2 * index) % DIFFICULTY_LEVELS.length];
        const year = 2020 + (projId % 7);
        const materials = MATERIALS_POOL[parentCatId] || MATERIALS_POOL["glass"];

        // Curate proper image with unsplash queries + unique seed fallback to guarantee variety
        const imagesList = GAL_IMAGES[subcatId] || GAL_IMAGES["glass-railings"];
        const baseImg = imagesList[index % imagesList.length];
        // Append unique index query parameter so that browsers do not cache them onto the same image, giving a stunning varied view
        const displayImage = `${baseImg}?auto=format&fit=crop&q=80&w=700&sig=${projId}`;

        // Create elegant design name
        const designNames = [
          "Ethereal Horizon", "Refined Radiance", "Sleek Opulence", 
          "Imperial Zenith", "AeroVent Design", "ThermaShield Casement", 
          "Celestial Lattice", "Solitude Screen", "Vanguard Guard rails", 
          "Bespoke River Run", "Luminescence Cascade", "Titanium Grid Divider", 
          "Kalyani Heritage Shrine", "Elite Inlaid Geometrica", "Atherton Canopy System"
        ];
        const designName = designNames[(projId + index) % designNames.length];
        const title = `${loc} - ${designName} ${subcat.name}`;

        projects.push({
          id: idStr,
          title,
          category: parentCatId,
          subcategory: subcatId,
          location: loc,
          year,
          image: displayImage,
          description: `A stunning customized execution of ${subcat.name} incorporating state-of-the-art materials. Engineered to sustain absolute architectural integrity while delivering extreme aesthetic grace. Designed for ${loc} with bespoke design parameters.`,
          difficulty,
          materials: materials.slice(0, 3 + (projId % 3)),
          dimensions: `${2.5 + (projId % 5)}m x ${1.5 + (projId % 4)}m Custom Profile`,
          highlights: [
            `${difficulty} approval standard`,
            `Engineered in our Visakhapatnam production facility`,
            `Includes ${5 + (projId % 6)} year structural warranty`
          ],
          featured: projId % 11 === 0 // Make some projects featured
        });
        projId++;
      }
    });
  });

  return projects;
}

export const SIGNATURE_PORTFOLIO_PROJECTS = generateProjects();
