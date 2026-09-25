/**
 * Centralized Storage Service for Wali & Son's Engineering Works
 * 
 * ARCHITECTURE NOTICE:
 * This layer abstracts all persistence operations.
 * IMPORTANT LOCALSTORAGE LIMITATION:
 * 1. LocalStorage is strictly client-side and browser-specific.
 * 2. Data stored here does not automatically sync across different devices or browsers.
 * 3. Clearing browser cache/cookies will delete the stored data unless backed up.
 * 4. Storing binary assets (large images/PDFs) is limited by browser quotas (~5MB).
 * 5. This service architecture allows swapping this storage layer with Firebase Firestore,
 *    Supabase, or a custom REST/GraphQL API without modifying the UI components.
 */

import {
  AppData,
  AuthSession,
  GalleryItem,
  Inquiry,
  Project,
  Review,
  Service,
  ShopSettings,
  ThemeMode,
} from '../types';

// Asset references generated specifically for this application
export const HERO_IMAGE = '/src/assets/images/hero_welding_fabrication_1790345623126.jpg';
export const ABOUT_WORKSHOP_IMAGE = '/src/assets/images/about_engineering_workshop_1790345639927.jpg';
export const GATES_GRILLS_IMAGE = '/src/assets/images/service_steel_gates_grills_1790345655016.jpg';
export const MACHINERY_REPAIR_IMAGE = '/src/assets/images/service_machinery_repair_1790345668685.jpg';
export const ROLLING_SHUTTER_IMAGE = '/src/assets/images/project_rolling_shutters_1790345684674.jpg';

export const STORAGE_KEYS = {
  SETTINGS: 'wali_shop_settings',
  SERVICES: 'wali_services',
  PROJECTS: 'wali_projects',
  GALLERY: 'wali_gallery',
  REVIEWS: 'wali_reviews',
  INQUIRIES: 'wali_inquiries',
  AUTH_SESSION: 'wali_auth_session',
  THEME: 'wali_theme',
  APP_VERSION: 'wali_app_version',
} as const;

export const CURRENT_VERSION = '1.0.0';

// Default Initial Shop Settings
export const DEFAULT_SETTINGS: ShopSettings = {
  businessName: "Wali & Son's Engineering Works",
  tagline: "Precision Engineering, Heavy Steel Fabrication & Machinery Repair",
  description: "Established engineering workshop specializing in certified structural welding, heavy steel fabrication, architectural gates & grills, industrial shutters, and precision machinery maintenance.",
  phone: "+92 300 1234567",
  whatsapp: "+92 300 1234567",
  email: "info@walisons-engineering.com",
  address: "Plot 42, Industrial Area, Sector 7-A, Main Industrial Corridor",
  openingHours: "Mon - Sat: 8:00 AM - 7:00 PM | Sunday: Closed (Emergency On-Call)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115860.8496465494!2d67.0186981!3d24.8607343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb33e06651d4bbf%3A0x9cf92f44555a0c23!2sKarachi%20Industrial%20Area!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s",
  stats: {
    yearsExperience: 28,
    projectsCompleted: 1450,
    happyClients: 820,
    servicesCount: 8,
  },
  social: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com",
    tiktok: "https://tiktok.com",
  },
  hero: {
    title: "Wali & Son's Engineering Works",
    subtitle: "Professional Engineering, Fabrication & Welding Solutions",
    description: "Delivering industrial-grade structural steel solutions, heavy machinery rehabilitation, automated security gates, and precision custom fabrication with uncompromised metallurgical standards.",
    heroImage: HERO_IMAGE,
  },
  updatedAt: new Date().toISOString(),
};

// Default Services Seed
export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'srv-1',
    title: 'Certified Welding Works',
    slug: 'welding-works',
    shortDescription: 'MIG, TIG, Arc, and certified high-tensile structural steel welding for heavy industrial and structural applications.',
    description: 'Our welding department employs certified craftsmen proficient in SMAW (Shielded Metal Arc), GMAW (MIG/MAG), and GTAW (TIG) processes. We adhere to rigorous AWS and ISO weld inspection guidelines for pressure vessels, pipework, structural beams, and heavy chassis frames.',
    icon: 'Flame',
    image: HERO_IMAGE,
    category: 'Welding',
    featured: true,
    active: true,
    capabilities: ['TIG & MIG Welding', 'Structural Beam Joining', 'High-Tensile Steel', 'On-Site Mobile Welding'],
    createdAt: '2024-01-15T09:00:00.000Z',
    updatedAt: '2024-01-15T09:00:00.000Z',
  },
  {
    id: 'srv-2',
    title: 'Heavy Steel Fabrication',
    slug: 'steel-fabrication',
    shortDescription: 'Custom trusses, steel mezzanine floors, industrial sheds, and heavy architectural load-bearing assemblies.',
    description: 'From pre-engineered steel buildings and industrial warehouses to heavy load-bearing platforms and factory catwalks, our workshop handles full-cycle cutting, CNC shearing, punching, plate rolling, and assembly.',
    icon: 'Hammer',
    image: ABOUT_WORKSHOP_IMAGE,
    category: 'Fabrication',
    featured: true,
    active: true,
    capabilities: ['Industrial Sheds & Warehouses', 'I-Beam Trusses & Columns', 'Mezzanine Flooring', 'Heavy Plate Rolling'],
    createdAt: '2024-01-16T10:00:00.000Z',
    updatedAt: '2024-01-16T10:00:00.000Z',
  },
  {
    id: 'srv-3',
    title: 'Gate & Grill Making',
    slug: 'gate-grill-making',
    shortDescription: 'Bespoke modern architectural security gates, automated sliding gates, boundary grills, and ornamental metalwork.',
    description: 'We design and craft fortified boundary security gates, cantilever sliding gates, decorative laser-cut mild steel panels, and tamper-resistant security window grills with powder-coated anti-rust protection.',
    icon: 'Shield',
    image: GATES_GRILLS_IMAGE,
    category: 'Gates & Grills',
    featured: true,
    active: true,
    capabilities: ['Automated Sliding Gates', 'Laser-Cut Sheet Gates', 'Heavy Boundary Grills', 'Staircase Railings'],
    createdAt: '2024-01-18T11:00:00.000Z',
    updatedAt: '2024-01-18T11:00:00.000Z',
  },
  {
    id: 'srv-4',
    title: 'Industrial Shutter Works',
    slug: 'shutter-works',
    shortDescription: 'Motorized rolling shutters, galvanized commercial shopfront shutters, and high-speed industrial warehouse doors.',
    description: 'Precision-formed interlocking galvanized steel slats, durable coil springs, gear reducers, and remote-controlled motors engineered for maximum uptime, weather seal, and site security.',
    icon: 'PanelTop',
    image: ROLLING_SHUTTER_IMAGE,
    category: 'Shutters',
    featured: true,
    active: true,
    capabilities: ['Motorized Rolling Shutters', 'Manual Chain Shutters', 'Perforated Slats', 'Emergency Repairs'],
    createdAt: '2024-01-20T08:30:00.000Z',
    updatedAt: '2024-01-20T08:30:00.000Z',
  },
  {
    id: 'srv-5',
    title: 'Machinery Repair & Overhaul',
    slug: 'machinery-repair',
    shortDescription: 'Mechanical overhaul, precision lathe turning, gear fabrication, shaft realignment, and hydraulic cylinder repair.',
    description: 'Comprehensive diagnostic, dismantling, and re-machining services for industrial crushers, hydraulic presses, conveyors, commercial generators, and heavy manufacturing plant machinery.',
    icon: 'Wrench',
    image: MACHINERY_REPAIR_IMAGE,
    category: 'Machinery',
    featured: true,
    active: true,
    capabilities: ['Lathe Turning & Milling', 'Hydraulic Cylinder Rebuilding', 'Shaft Straightening', 'Bearing Replacement'],
    createdAt: '2024-01-22T13:00:00.000Z',
    updatedAt: '2024-01-22T13:00:00.000Z',
  },
  {
    id: 'srv-6',
    title: 'Custom Fabrication Solutions',
    slug: 'custom-fabrication',
    shortDescription: 'Bespoke metal enclosures, storage tanks, hopper chutes, industrial workbenches, and custom steel fixtures.',
    description: 'We bring technical client schematics to life. From custom stainless steel chutes and storage silos to heavy-duty workshop workbenches and machine safety enclosures, built to exact CAD tolerances.',
    icon: 'Boxes',
    image: ABOUT_WORKSHOP_IMAGE,
    category: 'Fabrication',
    featured: false,
    active: true,
    capabilities: ['Material Hoppers & Chutes', 'Chemical Storage Tanks', 'Machine Enclosures', 'Custom CAD Fabrication'],
    createdAt: '2024-01-24T14:15:00.000Z',
    updatedAt: '2024-01-24T14:15:00.000Z',
  },
  {
    id: 'srv-7',
    title: 'Installation & On-Site Maintenance',
    slug: 'installation-maintenance',
    shortDescription: 'Field erection, crane hoisting, on-site structural alignment, anchoring, and preventive maintenance contracts.',
    description: 'Our mobile field teams are equipped with diesel generators, mobile welding rigs, and safety rigging gear to execute on-site erection, heavy equipment anchoring, and quarterly maintenance.',
    icon: 'Cog',
    image: HERO_IMAGE,
    category: 'Maintenance',
    featured: false,
    active: true,
    capabilities: ['On-Site Field Erection', 'Rigging & Hoisting', 'Structural Bolting & Anchoring', 'Preventive Contracts'],
    createdAt: '2024-01-26T15:00:00.000Z',
    updatedAt: '2024-01-26T15:00:00.000Z',
  },
  {
    id: 'srv-8',
    title: 'General Engineering Works',
    slug: 'general-engineering-works',
    shortDescription: 'Plate cutting, thread rolling, drilling, pipe bending, surface grinding, and general mechanical tooling.',
    description: 'Full-spectrum mechanical shop support for contractors and manufacturing plants requiring ad-hoc metal turning, flange machining, structural punching, and urgent mechanical tooling modifications.',
    icon: 'Cpu',
    image: MACHINERY_REPAIR_IMAGE,
    category: 'Machinery',
    featured: false,
    active: true,
    capabilities: ['Precision Thread Rolling', 'Heavy Pipe Bending', 'Flange Boring', 'Plasma & Oxy-Fuel Cutting'],
    createdAt: '2024-01-28T16:00:00.000Z',
    updatedAt: '2024-01-28T16:00:00.000Z',
  },
];

// Default Projects Seed
export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'proj-1',
    title: 'Industrial Warehouse Steel Structure (12,000 sq ft)',
    slug: 'warehouse-steel-structure',
    category: 'Fabrication',
    description: 'Engineered and erected a 12,000 sq ft pre-engineered steel truss warehouse frame with heavy I-beams, purlins, bracing, and roof crane tracks.',
    location: 'North Industrial Zone, Plot 88',
    date: 'February 2024',
    image: ABOUT_WORKSHOP_IMAGE,
    beforeImage: ABOUT_WORKSHOP_IMAGE,
    afterImage: ABOUT_WORKSHOP_IMAGE,
    featured: true,
    client: 'Apex Logistics Hub',
    scope: ['Truss Fabrication', 'Base Plate Anchoring', 'Overhead Crane Rails', 'On-Site Erection'],
    createdAt: '2024-02-10T10:00:00.000Z',
  },
  {
    id: 'proj-2',
    title: 'Commercial Motorized Heavy Shutters (8 Bays)',
    slug: 'commercial-motorized-shutters',
    category: 'Shutters',
    description: 'Manufactured and installed 8 heavy-duty galvanized interlocking motorized rolling shutters with remote control and safety sensors for a freight terminal.',
    location: 'Central Freight Depot',
    date: 'January 2024',
    image: ROLLING_SHUTTER_IMAGE,
    beforeImage: ROLLING_SHUTTER_IMAGE,
    afterImage: ROLLING_SHUTTER_IMAGE,
    featured: true,
    client: 'National Transport Consortium',
    scope: ['Galvanized Slat Rolling', 'Central Motor Drive', 'High-Wind Brackets', 'Automatic Lock System'],
    createdAt: '2024-01-25T11:00:00.000Z',
  },
  {
    id: 'proj-3',
    title: 'Architectural Laser-Cut Main Entrance Security Gate',
    slug: 'architectural-security-gate',
    category: 'Gates & Grills',
    description: 'Designed and fabricated a 24-foot cantilever sliding gate featuring 4mm CNC laser-cut geometric steel infill and dual-coat electrostatic matte finish.',
    location: 'Hillside Corporate Headquarters',
    date: 'March 2024',
    image: GATES_GRILLS_IMAGE,
    beforeImage: GATES_GRILLS_IMAGE,
    afterImage: GATES_GRILLS_IMAGE,
    featured: true,
    client: 'Apex Corporate Plaza',
    scope: ['CNC Plate Cutting', 'Cantilever Track System', 'Heavy Hinge Assembly', 'Powder Coating'],
    createdAt: '2024-03-05T12:00:00.000Z',
  },
  {
    id: 'proj-4',
    title: 'Heavy Hydraulic Press Cylinder Overhaul & Lathe Machining',
    slug: 'hydraulic-press-cylinder-overhaul',
    category: 'Machinery',
    description: 'Complete teardown and rehabilitation of a 250-ton hydraulic extrusion press. Turn-machined a replacement 180mm chrome-moly steel ram and replaced gland seals.',
    location: 'Al-Madina Plastics Facility',
    date: 'April 2024',
    image: MACHINERY_REPAIR_IMAGE,
    beforeImage: MACHINERY_REPAIR_IMAGE,
    afterImage: MACHINERY_REPAIR_IMAGE,
    featured: true,
    client: 'Precision Polymers Ltd',
    scope: ['Cylinder Honing', 'Shaft Lathe Turning', 'Pressure Leak Testing', 'Seal Replacement'],
    createdAt: '2024-04-12T14:30:00.000Z',
  },
  {
    id: 'proj-5',
    title: 'Overhead Gantry Crane Structural Modification',
    slug: 'overhead-crane-modification',
    category: 'Welding',
    description: 'Reinforced 10-ton crane runway runway girders with bottom-chord stiffeners and high-tensile multi-pass fillet welds with 100% dye-penetrant inspection.',
    location: 'Metals & Mining Processing Facility',
    date: 'May 2024',
    image: HERO_IMAGE,
    beforeImage: HERO_IMAGE,
    afterImage: HERO_IMAGE,
    featured: false,
    client: 'Gulf Steel Mills',
    scope: ['Dye Penetrant Testing', 'Girder Stiffening', 'Multi-Pass Arc Welding', 'Load Deflection Test'],
    createdAt: '2024-05-18T09:00:00.000Z',
  },
];

// Default Gallery Items Seed
export const DEFAULT_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Precision Structural Welding in Workshop',
    category: 'Welding',
    image: HERO_IMAGE,
    description: 'Multi-pass MIG welding on heavy flange connectors for a chemical plant framework.',
    createdAt: '2024-01-10T10:00:00.000Z',
  },
  {
    id: 'gal-2',
    title: 'Main Fabrication Bay & Heavy Assembly Floor',
    category: 'Workshop',
    image: ABOUT_WORKSHOP_IMAGE,
    description: 'High-bay workshop layout equipped for simultaneous assembly of industrial steel trusses and platforms.',
    createdAt: '2024-01-15T11:00:00.000Z',
  },
  {
    id: 'gal-3',
    title: 'Powder-Coated Architectural Main Gate',
    category: 'Gates',
    image: GATES_GRILLS_IMAGE,
    description: 'Custom fabricated architectural gate with precision alignment and heavy-duty pivot bearings.',
    createdAt: '2024-02-01T12:00:00.000Z',
  },
  {
    id: 'gal-4',
    title: 'Heavy Lathe Turning of Machinery Shaft',
    category: 'Machinery',
    image: MACHINERY_REPAIR_IMAGE,
    description: 'Lathe turning a high-tensile alloy shaft for a rotary crushing plant with 0.02mm tolerance.',
    createdAt: '2024-02-12T13:00:00.000Z',
  },
  {
    id: 'gal-5',
    title: 'Galvanized Rolling Shutter Assembly',
    category: 'Shutters',
    image: ROLLING_SHUTTER_IMAGE,
    description: 'Bench-testing spring balance tension on high-gauge galvanized steel shutter curtain.',
    createdAt: '2024-03-01T14:00:00.000Z',
  },
  {
    id: 'gal-6',
    title: 'Structural Steel Column Fabrication',
    category: 'Fabrication',
    image: ABOUT_WORKSHOP_IMAGE,
    description: 'Base plates welded to universal columns ready for anti-corrosion primer application.',
    createdAt: '2024-03-20T15:00:00.000Z',
  },
];

// Default Reviews Seed - clearly flagged as sample/demo data to comply with instructions
export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 'rev-1',
    customerName: 'Tariq Mehmood',
    rating: 5,
    review: 'Wali & Son’s fabricated all 6 heavy steel trusses for our warehouse extension. The alignment was millimeter-perfect during on-site hoisting. Exceptional metallurgical standard.',
    date: '2024-02-28',
    approved: true,
    isSampleData: true,
    projectType: 'Warehouse Steel Fabrication',
  },
  {
    id: 'rev-2',
    customerName: 'Engr. Kamran Siddiqui',
    rating: 5,
    review: 'We had an urgent breakdown on our hydraulic press shaft. Their machine shop turn-machined a replacement shaft over the weekend, saving us days of production downtime.',
    date: '2024-03-15',
    approved: true,
    isSampleData: true,
    projectType: 'Machinery Repair',
  },
  {
    id: 'rev-3',
    customerName: 'Haji Abdul Rasheed',
    rating: 5,
    review: 'The motorized rolling shutters installed on our commercial godown operate smoothly and effortlessly. Heavy gauge steel, neat welding, and punctual delivery.',
    date: '2024-04-02',
    approved: true,
    isSampleData: true,
    projectType: 'Industrial Shutters',
  },
  {
    id: 'rev-4',
    customerName: 'Sarmad Bilal',
    rating: 4,
    review: 'Superb craftsmanship on our bungalow perimeter security grills and main sliding gate. Clean welds with no slag or rough edges. Very satisfied.',
    date: '2024-05-11',
    approved: true,
    isSampleData: true,
    projectType: 'Gates & Grills',
  },
];

// Default Inquiries Seed
export const DEFAULT_INQUIRIES: Inquiry[] = [
  {
    id: 'inq-101',
    name: 'Malik Zafar',
    phone: '+92 321 8877665',
    whatsapp: '+92 321 8877665',
    email: 'zafar.textiles@example.com',
    service: 'Industrial Shutter Works',
    description: 'Require 4 sets of heavy motorized shutters for a loading dock in Site Area. Width 14 ft, Height 12 ft. Kindly send technical quote with motor specs.',
    quantity: '4 Units',
    preferredDate: '2024-10-15',
    budget: 'Tier 2 (PKR 350,000 - 500,000)',
    notes: 'Power backup linkage required.',
    status: 'New',
    createdAt: '2024-09-20T08:15:00.000Z',
  },
  {
    id: 'inq-102',
    name: 'Rashid Khan',
    phone: '+92 333 4455667',
    whatsapp: '+92 333 4455667',
    email: 'rk.fabricators@example.com',
    service: 'Heavy Steel Fabrication',
    description: 'Looking for fabrication of an intermediate steel mezzanine floor with checkered plate decking, approximately 40x25 feet.',
    quantity: '1,000 sq ft',
    preferredDate: '2024-11-01',
    budget: 'Custom Industrial',
    notes: 'Drawing PDF available on WhatsApp.',
    status: 'Contacted',
    createdAt: '2024-09-18T10:45:00.000Z',
  },
  {
    id: 'inq-103',
    name: 'Suleman Baig',
    phone: '+92 345 9988771',
    whatsapp: '+92 345 9988771',
    email: 'suleman.b@example.com',
    service: 'Gate & Grill Making',
    description: 'Need quotation for 20-ft modern horizontal slat sliding gate with small wicket gate and 80 linear feet of boundary grill.',
    quantity: '1 Gate + 80 ft Grill',
    preferredDate: '2024-10-05',
    budget: 'Standard',
    status: 'In Progress',
    createdAt: '2024-09-15T14:20:00.000Z',
  },
];

// Reusable LocalStorage helper utilities
export const storageService = {
  // Generic safe getter
  getItem<T>(key: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(key);
      if (!item) return defaultValue;
      return JSON.parse(item) as T;
    } catch (error) {
      console.warn(`[storageService] Error parsing key "${key}":`, error);
      return defaultValue;
    }
  },

  // Generic safe setter
  setItem<T>(key: string, value: T): boolean {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`[storageService] Quota exceeded or error saving "${key}":`, error);
      return false;
    }
  },

  // Generic remove
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`[storageService] Error removing key "${key}":`, error);
    }
  },

  // Shop Settings
  getSettings(): ShopSettings {
    const stored = this.getItem<ShopSettings | null>(STORAGE_KEYS.SETTINGS, null);
    if (!stored) {
      this.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
      return DEFAULT_SETTINGS;
    }
    // Merge shallowly to ensure new fields are populated if updated
    return { ...DEFAULT_SETTINGS, ...stored };
  },

  updateSettings(settings: Partial<ShopSettings>): ShopSettings {
    const current = this.getSettings();
    const updated: ShopSettings = {
      ...current,
      ...settings,
      updatedAt: new Date().toISOString(),
    };
    this.setItem(STORAGE_KEYS.SETTINGS, updated);
    return updated;
  },

  // Services
  getServices(): Service[] {
    const stored = this.getItem<Service[] | null>(STORAGE_KEYS.SERVICES, null);
    if (!stored || stored.length === 0) {
      this.setItem(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
      return DEFAULT_SERVICES;
    }
    return stored;
  },

  saveServices(services: Service[]): void {
    this.setItem(STORAGE_KEYS.SERVICES, services);
  },

  addService(serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Service {
    const services = this.getServices();
    const now = new Date().toISOString();
    const newService: Service = {
      ...serviceData,
      id: `srv-${Date.now()}`,
      createdAt: now,
      updatedAt: now,
    };
    services.unshift(newService);
    this.saveServices(services);
    return newService;
  },

  updateService(id: string, updates: Partial<Service>): Service | null {
    const services = this.getServices();
    const idx = services.findIndex(s => s.id === id);
    if (idx === -1) return null;
    services[idx] = {
      ...services[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    this.saveServices(services);
    return services[idx];
  },

  deleteService(id: string): boolean {
    const services = this.getServices();
    const filtered = services.filter(s => s.id !== id);
    if (filtered.length === services.length) return false;
    this.saveServices(filtered);
    return true;
  },

  // Projects
  getProjects(): Project[] {
    const stored = this.getItem<Project[] | null>(STORAGE_KEYS.PROJECTS, null);
    if (!stored || stored.length === 0) {
      this.setItem(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
      return DEFAULT_PROJECTS;
    }
    return stored;
  },

  saveProjects(projects: Project[]): void {
    this.setItem(STORAGE_KEYS.PROJECTS, projects);
  },

  addProject(projectData: Omit<Project, 'id' | 'createdAt'>): Project {
    const projects = this.getProjects();
    const newProject: Project = {
      ...projectData,
      id: `proj-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    projects.unshift(newProject);
    this.saveProjects(projects);
    return newProject;
  },

  updateProject(id: string, updates: Partial<Project>): Project | null {
    const projects = this.getProjects();
    const idx = projects.findIndex(p => p.id === id);
    if (idx === -1) return null;
    projects[idx] = { ...projects[idx], ...updates };
    this.saveProjects(projects);
    return projects[idx];
  },

  deleteProject(id: string): boolean {
    const projects = this.getProjects();
    const filtered = projects.filter(p => p.id !== id);
    if (filtered.length === projects.length) return false;
    this.saveProjects(filtered);
    return true;
  },

  // Gallery
  getGallery(): GalleryItem[] {
    const stored = this.getItem<GalleryItem[] | null>(STORAGE_KEYS.GALLERY, null);
    if (!stored || stored.length === 0) {
      this.setItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
      return DEFAULT_GALLERY;
    }
    return stored;
  },

  saveGallery(items: GalleryItem[]): void {
    this.setItem(STORAGE_KEYS.GALLERY, items);
  },

  addGalleryItem(itemData: Omit<GalleryItem, 'id' | 'createdAt'>): GalleryItem {
    const gallery = this.getGallery();
    const newItem: GalleryItem = {
      ...itemData,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    gallery.unshift(newItem);
    this.saveGallery(gallery);
    return newItem;
  },

  updateGalleryItem(id: string, updates: Partial<GalleryItem>): GalleryItem | null {
    const gallery = this.getGallery();
    const idx = gallery.findIndex(g => g.id === id);
    if (idx === -1) return null;
    gallery[idx] = { ...gallery[idx], ...updates };
    this.saveGallery(gallery);
    return gallery[idx];
  },

  deleteGalleryItem(id: string): boolean {
    const gallery = this.getGallery();
    const filtered = gallery.filter(g => g.id !== id);
    if (filtered.length === gallery.length) return false;
    this.saveGallery(filtered);
    return true;
  },

  // Reviews
  getReviews(): Review[] {
    const stored = this.getItem<Review[] | null>(STORAGE_KEYS.REVIEWS, null);
    if (!stored || stored.length === 0) {
      this.setItem(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
      return DEFAULT_REVIEWS;
    }
    return stored;
  },

  saveReviews(reviews: Review[]): void {
    this.setItem(STORAGE_KEYS.REVIEWS, reviews);
  },

  addReview(reviewData: Omit<Review, 'id'>): Review {
    const reviews = this.getReviews();
    const newReview: Review = {
      ...reviewData,
      id: `rev-${Date.now()}`,
    };
    reviews.unshift(newReview);
    this.saveReviews(reviews);
    return newReview;
  },

  updateReview(id: string, updates: Partial<Review>): Review | null {
    const reviews = this.getReviews();
    const idx = reviews.findIndex(r => r.id === id);
    if (idx === -1) return null;
    reviews[idx] = { ...reviews[idx], ...updates };
    this.saveReviews(reviews);
    return reviews[idx];
  },

  deleteReview(id: string): boolean {
    const reviews = this.getReviews();
    const filtered = reviews.filter(r => r.id !== id);
    if (filtered.length === reviews.length) return false;
    this.saveReviews(filtered);
    return true;
  },

  // Inquiries / Quotes
  getInquiries(): Inquiry[] {
    const stored = this.getItem<Inquiry[] | null>(STORAGE_KEYS.INQUIRIES, null);
    if (!stored || stored.length === 0) {
      this.setItem(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
      return DEFAULT_INQUIRIES;
    }
    return stored;
  },

  saveInquiries(inquiries: Inquiry[]): void {
    this.setItem(STORAGE_KEYS.INQUIRIES, inquiries);
  },

  addInquiry(inquiryData: Omit<Inquiry, 'id' | 'createdAt'>): Inquiry {
    const inquiries = this.getInquiries();
    const newInquiry: Inquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    inquiries.unshift(newInquiry);
    this.saveInquiries(inquiries);
    return newInquiry;
  },

  updateInquiryStatus(id: string, status: Inquiry['status']): Inquiry | null {
    const inquiries = this.getInquiries();
    const idx = inquiries.findIndex(i => i.id === id);
    if (idx === -1) return null;
    inquiries[idx].status = status;
    this.saveInquiries(inquiries);
    return inquiries[idx];
  },

  deleteInquiry(id: string): boolean {
    const inquiries = this.getInquiries();
    const filtered = inquiries.filter(i => i.id !== id);
    if (filtered.length === inquiries.length) return false;
    this.saveInquiries(filtered);
    return true;
  },

  // Theme
  getTheme(): ThemeMode {
    const stored = this.getItem<ThemeMode>(STORAGE_KEYS.THEME, 'dark');
    return stored === 'light' ? 'light' : 'dark';
  },

  setTheme(theme: ThemeMode): void {
    this.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  },

  // Auth Session (Demo Mode for LocalStorage)
  getAuthSession(): AuthSession {
    const stored = this.getItem<AuthSession | null>(STORAGE_KEYS.AUTH_SESSION, null);
    if (!stored) {
      return {
        isAuthenticated: false,
        user: null,
        token: null,
        loggedInAt: null,
      };
    }
    return stored;
  },

  setAuthSession(session: AuthSession): void {
    this.setItem(STORAGE_KEYS.AUTH_SESSION, session);
  },

  clearAuthSession(): void {
    this.removeItem(STORAGE_KEYS.AUTH_SESSION);
  },

  // Export / Backup
  exportData(): string {
    const payload: AppData = {
      version: CURRENT_VERSION,
      settings: this.getSettings(),
      services: this.getServices(),
      projects: this.getProjects(),
      gallery: this.getGallery(),
      reviews: this.getReviews(),
      inquiries: this.getInquiries(),
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(payload, null, 2);
  },

  // Import / Restore with schema verification
  importData(jsonString: string): { success: boolean; message: string } {
    try {
      const data = JSON.parse(jsonString) as Partial<AppData>;
      if (!data || typeof data !== 'object') {
        return { success: false, message: 'Invalid JSON: Payload must be an object.' };
      }

      if (data.settings) this.setItem(STORAGE_KEYS.SETTINGS, data.settings);
      if (Array.isArray(data.services)) this.setItem(STORAGE_KEYS.SERVICES, data.services);
      if (Array.isArray(data.projects)) this.setItem(STORAGE_KEYS.PROJECTS, data.projects);
      if (Array.isArray(data.gallery)) this.setItem(STORAGE_KEYS.GALLERY, data.gallery);
      if (Array.isArray(data.reviews)) this.setItem(STORAGE_KEYS.REVIEWS, data.reviews);
      if (Array.isArray(data.inquiries)) this.setItem(STORAGE_KEYS.INQUIRIES, data.inquiries);

      return { success: true, message: 'Application data restored successfully!' };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Unknown JSON parse error';
      return { success: false, message: `Failed to import JSON: ${msg}` };
    }
  },

  // Reset to default sample engineering dataset
  resetToDemoData(): void {
    this.setItem(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
    this.setItem(STORAGE_KEYS.SERVICES, DEFAULT_SERVICES);
    this.setItem(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    this.setItem(STORAGE_KEYS.GALLERY, DEFAULT_GALLERY);
    this.setItem(STORAGE_KEYS.REVIEWS, DEFAULT_REVIEWS);
    this.setItem(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  },

  // Clear application data
  clearAppData(): void {
    Object.values(STORAGE_KEYS).forEach(k => {
      if (k !== STORAGE_KEYS.AUTH_SESSION && k !== STORAGE_KEYS.THEME) {
        this.removeItem(k);
      }
    });
  },
};
