import mongoose from 'mongoose';
import dotenv from 'dotenv';
import BusinessInfo from './models/BusinessInfo.js';
import Service from './models/Service.js';
import FAQ from './models/FAQ.js';
import Project from './models/Project.js';
import Review from './models/Review.js';
import Lead from './models/Lead.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/standard-general-construction');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const seedBusiness = async () => {
  await BusinessInfo.deleteMany({});
  await BusinessInfo.create({
    name: 'Standard General Construction Inc.',
    category: 'Construction Company',
    phone: '+1 917-310-2100',
    email: 'info@standardgeneralconstruction.com',
    address: '1186 Lakewood Pl',
    city: 'Bronx',
    state: 'NY',
    zipCode: '10461',
    country: 'United States',
    googleRating: 4.9,
    googleReviewCount: 67,
    serviceArea: 'Bronx and surrounding New York City areas',
    hours: {
      monday: '7:00 AM–10:00 PM',
      tuesday: '7:00 AM–10:00 PM',
      wednesday: '7:00 AM–10:00 PM',
      thursday: '7:00 AM–10:00 PM',
      friday: '7:00 AM–10:00 PM',
      saturday: '7:00 AM–10:00 PM',
      sunday: '8:00 AM–9:00 PM',
    },
  });

  console.log('Business info seeded');
};

const seedServices = async () => {
  await Service.deleteMany({});
  const services = [
    {
      title: 'Roofing',
      slug: 'roofing',
      shortDescription: 'Professional roofing services including asphalt shingles, flat roofs, repairs, and complete replacements.',
      description: 'Our roofing team handles everything from minor leak repairs to full roof replacements. We work with architectural asphalt shingles, EPDM flat roofing systems, metal roofing, and tile. Every roofing project includes proper flashing, ventilation assessment, and gutter alignment to protect your property for years.',
      category: 'Roofing',
      verified: true,
      published: true,
      featured: true,
      order: 1,
    },
    {
      title: 'Masonry',
      slug: 'masonry',
      shortDescription: 'Expert masonry work including brick pointing, stone installation, concrete repair, and facade restoration.',
      description: 'From historic brick repointing to new stone veneer installations, our masons deliver precise craftsmanship. We handle chimney repairs, retaining walls, patio pavers, and concrete foundation work. Every masonry project uses matched mortar and quality materials to maintain structural integrity and visual appeal.',
      category: 'Masonry',
      verified: true,
      published: true,
      featured: true,
      order: 2,
    },
    {
      title: 'Waterproofing',
      slug: 'waterproofing',
      shortDescription: 'Interior and exterior waterproofing solutions including basement sealing, French drains, and foundation crack injection.',
      description: 'Water intrusion can cause serious structural damage over time. We install interior and exterior drainage systems, apply waterproof membranes, seal foundation cracks, and install sump pumps. Our waterproofing solutions are designed for New York weather patterns and basement conditions.',
      category: 'Waterproofing',
      verified: true,
      published: true,
      featured: true,
      order: 3,
    },
    {
      title: 'Home Improvements',
      slug: 'home-improvements',
      shortDescription: 'Complete home renovation services including kitchen and bathroom remodels, flooring, and interior updates.',
      description: 'We transform living spaces with full gut renovations, kitchen cabinet installations, bathroom upgrades, hardwood flooring, and custom trim work. Our home improvement team manages permits, inspections, and timelines so your renovation stays on track and within budget.',
      category: 'Home Improvements',
      verified: true,
      published: true,
      featured: true,
      order: 4,
    },
    {
      title: 'General Construction',
      slug: 'general-construction',
      shortDescription: 'Full-service general contracting for new builds, home additions, structural work, and commercial projects.',
      description: 'As your general contractor, we manage every phase of construction from foundation to finish. Our services include new home builds, second-story additions, basement finishing, commercial build-outs, and structural repairs. We coordinate subcontractors, order materials, and maintain clear communication throughout the project.',
      category: 'General Construction',
      verified: true,
      published: true,
      featured: true,
      order: 5,
    },
  ];

  await Service.insertMany(services);
  console.log('Services seeded');
};

const seedProjects = async () => {
  await Project.deleteMany({});
  const projects = [
    {
      title: 'Pelham Bay Family Roof Replacement',
      slug: 'pelham-bay-family-roof-replacement',
      category: 'Roofing',
      description: 'Complete tear-off and replacement of an old 3-tab roof with architectural asphalt shingles on a 2,400 sq ft Colonial home. Installed new ice and water shield, upgraded ventilation with ridge vents, and replaced damaged fascia boards. Project took 4 days with full cleanup.',
      location: 'Pelham Bay, Bronx, NY',
      isVerified: true,
      published: true,
      featured: true,
      order: 1,
    },
    {
      title: 'Fordham Brick Facade Restoration',
      slug: 'fordham-brick-facade-restoration',
      category: 'Masonry',
      description: 'Tuckpointing and brick replacement on a 4-story pre-war building facade. Work included mortar analysis to match original sand-based mortar, lintel repairs, and parging of vulnerable corners. Completed with minimal disruption to building residents.',
      location: 'Fordham, Bronx, NY',
      isVerified: true,
      published: true,
      featured: true,
      order: 2,
    },
    {
      title: 'Kingsbridge Basement Waterproofing',
      slug: 'kingsbridge-basement-waterproofing',
      category: 'Waterproofing',
      description: 'Full interior basement waterproofing system for a finished basement that flooded during Hurricane Ida. Installed a triple-layer drainage mat, perimeter French drain, battery-backup sump pump, and interior sealant coating. Waterproofing warranty included.',
      location: 'Kingsbridge, Bronx, NY',
      isVerified: true,
      published: true,
      featured: true,
      order: 3,
    },
    {
      title: 'Riverdale Kitchen and Bath Renovation',
      slug: 'riverdale-kitchen-and-bath-renovation',
      category: 'Home Improvements',
      description: 'Full gut renovation of a 1960s kitchen and master bathroom in a Riverdale ranch home. Kitchen received custom shaker cabinets, quartz countertops, subway tile backsplash, and Bosch appliances. Bathroom got a walk-in tile shower, double vanity, and heated flooring.',
      location: 'Riverdale, Bronx, NY',
      isVerified: true,
      published: true,
      featured: true,
      order: 4,
    },
    {
      title: 'Morris Park Second-Story Addition',
      slug: 'morris-park-second-story-addition',
      category: 'General Construction',
      description: '700 sq ft second-story addition over a 1,200 sq ft ranch home in Morris Park. Added 3 bedrooms and 2 full bathrooms with matching brick and siding. Structural beam installation, roof extension, and full HVAC integration. Project took 5 months from design to certificate of occupancy.',
      location: 'Morris Park, Bronx, NY',
      isVerified: true,
      published: true,
      featured: true,
      order: 5,
    },
    {
      title: 'Throgs Neck Deck and Patio',
      slug: 'throgs-neck-deck-and-patio',
      category: 'General Construction',
      description: 'Custom pressure-treated deck with composite railings and a stamped concrete patio in Throgs Neck. Deck measures 20x16 with built-in seating and LED lighting. Patio includes a drainage slope and expansion joints for year-round use.',
      location: 'Throgs Neck, Bronx, NY',
      isVerified: true,
      published: true,
      featured: false,
      order: 6,
    },
  ];

  await Project.insertMany(projects);
  console.log('Projects seeded');
};

const seedFaqs = async () => {
  await FAQ.deleteMany({});
  const faqs = [
    {
      question: 'What types of construction work do you handle in the Bronx?',
      answer: 'We handle roofing, masonry, waterproofing, home improvements, and general construction. This includes roof replacements, brick repointing, basement waterproofing, kitchen and bathroom renovations, and home additions. If you have a project in mind, contact us to discuss your specific needs.',
      published: true,
      order: 1,
    },
    {
      question: 'Are you licensed and insured for construction work in New York?',
      answer: 'Yes. Standard General Construction Inc. carries general liability insurance and workers compensation coverage. We are registered to perform construction and home improvement work in New York City and the surrounding boroughs.',
      published: true,
      order: 2,
    },
    {
      question: 'Do you provide free estimates?',
      answer: 'Yes. We offer free on-site estimates for roofing, masonry, waterproofing, and general construction projects. During the estimate visit, we will assess the work, discuss material options, and provide a detailed written quote.',
      published: true,
      order: 3,
    },
    {
      question: 'How long does a typical roof replacement take?',
      answer: 'Most residential roof replacements in the Bronx take 2 to 4 days depending on the size of the home, the roofing material chosen, and weather conditions. We provide a project timeline during the estimate so you know exactly what to expect.',
      published: true,
      order: 4,
    },
    {
      question: 'What areas of the Bronx do you serve?',
      answer: 'We are based at 1186 Lakewood Pl in the Bronx and serve all neighborhoods including Riverdale, Fordham, Pelham Bay, Morris Park, Kingsbridge, Throgs Neck, and surrounding areas. We also work in Brooklyn, Queens, Manhattan, and Staten Island for larger projects.',
      published: true,
      order: 5,
    },
    {
      question: 'How do I request an estimate or schedule a consultation?',
      answer: 'You can request an estimate by calling us at +1 917-310-2100, visiting our office at 1186 Lakewood Pl, Bronx, NY 10461, or filling out the contact form on our website. We will respond within one business day to schedule a convenient time.',
      published: true,
      order: 6,
    },
    {
      question: 'Do you handle permits for construction projects?',
      answer: 'Yes. For projects that require New York City Department of Buildings permits, such as home additions, structural changes, and certain roofing work, we prepare and file the permit applications. We keep you informed throughout the approval process.',
      published: true,
      order: 7,
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, check, and all major credit cards. For larger projects, we typically work with a payment schedule tied to project milestones. Details are outlined in the contract before work begins so there are no surprises.',
      published: true,
      order: 8,
    },
    {
      question: 'How soon can you start a project after the estimate is accepted?',
      answer: 'Start dates depend on the scope of work and our current schedule. Small repairs and roofing jobs can often start within 1 to 2 weeks. Larger projects like additions and renovations may take 3 to 6 weeks to schedule. We will provide a realistic start date when we present your estimate.',
      published: true,
      order: 9,
    },
  ];

  await FAQ.insertMany(faqs);
  console.log('FAQs seeded');
};

const seedReviews = async () => {
  await Review.deleteMany({});
  const reviews = [
    {
      authorName: 'Michael Torres',
      rating: 5,
      reviewText: 'Standard General Construction replaced our entire roof after a bad storm. The crew arrived on time, cleaned up every evening, and the finished roof looks great. They also fixed some gutter issues at no extra charge. Highly recommend for anyone in the Bronx looking for reliable roofers.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: true,
    },
    {
      authorName: "Sarah O'Connor",
      rating: 5,
      reviewText: 'We needed brick repointing on our 1920s townhouse in Fordham. The masons matched the original mortar perfectly and repaired cracked lintels. The difference is night and day. Professional team and fair pricing.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: true,
    },
    {
      authorName: 'James Patterson',
      rating: 5,
      reviewText: 'Our basement flooded during the last big rain. Standard General installed a French drain, sump pump, and sealed the foundation walls. No water since. The crew was knowledgeable and the price was reasonable for the amount of work involved.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: true,
    },
    {
      authorName: 'Linda Chen',
      rating: 5,
      reviewText: 'Full kitchen renovation from Standard General. New cabinets, quartz countertops, tile backsplash, and Bosch appliances. The project manager kept us updated every step of the way. Finished on time and the quality is outstanding.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: false,
    },
    {
      authorName: 'Robert Williams',
      rating: 5,
      reviewText: 'Built a second-story addition over our ranch home. The addition added three bedrooms and two bathrooms. The team handled the structural beam installation, extended the roof, and matched the existing brick perfectly. We love our new space.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: false,
    },
    {
      authorName: 'Angela Rodriguez',
      rating: 4,
      reviewText: 'Good experience with their masonry team. They rebuilt our front steps and stoop in Morris Park. The work was solid and they cleaned up well. Only giving 4 stars because the project took a couple of extra days due to weather, but the result is great.',
      source: 'Google Review',
      sourceUrl: '',
      verified: true,
      published: true,
      featured: false,
    },
  ];

  await Review.insertMany(reviews);
  console.log('Reviews seeded');
};

const seedLeads = async () => {
  await Lead.deleteMany({});
  const leads = [
    {
      name: 'Carlos Mendez',
      phone: '+1 917-555-0101',
      email: 'carlos.mendez@gmail.com',
      projectType: 'Roofing',
      propertyLocation: 'Allerton, Bronx, NY 10467',
      description: 'Need a full roof replacement. Current roof is asphalt shingles from 2008. Looking for architectural shingles in gray. Approximately 1,800 sq ft. Need quote and timeline.',
      preferredContactMethod: 'phone',
      status: 'new',
    },
    {
      name: 'Patricia Johnson',
      phone: '+1 718-555-0202',
      email: 'patricia.j@yahoo.com',
      projectType: 'Masonry',
      propertyLocation: 'Mott Haven, Bronx, NY 10451',
      description: 'Front facade of our 4-unit building needs tuckpointing and some brick replacement. Looking for a contractor experienced with older multi-family buildings in the Bronx.',
      preferredContactMethod: 'email',
      status: 'contacted',
    },
    {
      name: 'David Kim',
      phone: '+1 917-555-0303',
      email: 'david.kim@outlook.com',
      projectType: 'Waterproofing',
      propertyLocation: 'Riverdale, Bronx, NY 10463',
      description: 'Basement water seepage after heavy rain. Need an assessment for interior drainage and possible exterior waterproofing. Finished basement with drywall so looking for minimal disruption.',
      preferredContactMethod: 'either',
      status: 'new',
    },
    {
      name: 'Michelle Brown',
      phone: '+1 212-555-0404',
      email: 'mbrown@example.com',
      projectType: 'Home Improvements',
      propertyLocation: 'Country Club, Bronx, NY 10465',
      description: 'Kitchen renovation. Current layout is inefficient. Want new cabinets, island, quartz countertops, and professional-grade range. Also interested in opening up the wall to the dining room if load-bearing can be managed.',
      preferredContactMethod: 'email',
      status: 'in-progress',
    },
    {
      name: 'Andrew Robinson',
      phone: '+1 917-555-0505',
      email: 'andrew.r@gmail.com',
      projectType: 'General Construction',
      propertyLocation: 'Belmont, Bronx, NY 10458',
      description: 'Planning to add a second floor to a single-family home. 1,200 sq ft main floor. Want 3 bedrooms and 2 bathrooms upstairs. Need consultation on structural feasibility, estimated cost, and timeline.',
      preferredContactMethod: 'phone',
      status: 'new',
    },
    {
      name: 'Jennifer Walsh',
      phone: '+1 718-555-0606',
      email: 'j.walsh@verizon.net',
      projectType: 'Roofing',
      propertyLocation: 'Wakefield, Bronx, NY 10466',
      description: 'Flat roof on our garage is leaking. Need repair or replacement. Currently has modified bitumen. Interested in EPDM or TPO options. Need a quick turnaround as we are storing furniture in the garage.',
      preferredContactMethod: 'phone',
      status: 'new',
    },
    {
      name: "Thomas O'Brien",
      phone: '+1 917-555-0707',
      email: 'tobrien@aol.com',
      projectType: 'General Construction',
      propertyLocation: 'Pelham Bay, Bronx, NY 10461',
      description: 'Looking to finish the basement. Roughly 900 sq ft. Want 2 bedrooms, a bathroom, and a small family room. Need framing, electrical, plumbing, and insulation estimates.',
      preferredContactMethod: 'either',
      status: 'contacted',
    },
    {
      name: 'Sandra Martinez',
      phone: '+1 718-555-0808',
      email: 'smartinez@icloud.com',
      projectType: 'Home Improvements',
      propertyLocation: 'Highbridge, Bronx, NY 10452',
      description: 'Bathroom remodel. Replacing old tub with a walk-in shower, new vanity, tile floor, and new fixtures. Need ADA-friendly grab bars installed as well.',
      preferredContactMethod: 'email',
      status: 'in-progress',
    },
  ];

  await Lead.insertMany(leads);
  console.log('Leads seeded');
};

const seedDatabase = async () => {
  await connectDB();

  await seedBusiness();
  await seedServices();
  await seedProjects();
  await seedFaqs();
  await seedReviews();
  await seedLeads();

  console.log('Database seeding completed');
  mongoose.connection.close();
};

seedDatabase();
