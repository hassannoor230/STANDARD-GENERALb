import mongoose from 'mongoose';

const businessInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Standard General Construction Inc.',
  },
  category: {
    type: String,
    default: 'Construction Company',
  },
  phone: {
    type: String,
    default: '+1 917-310-2100',
  },
  email: {
    type: String,
    default: '[ADD VERIFIED EMAIL]',
  },
  address: {
    type: String,
    default: '1186 Lakewood Pl',
  },
  city: {
    type: String,
    default: 'Bronx',
  },
  state: {
    type: String,
    default: 'NY',
  },
  zipCode: {
    type: String,
    default: '10461',
  },
  country: {
    type: String,
    default: 'United States',
  },
  googleRating: {
    type: Number,
    default: 4.9,
  },
  googleReviewCount: {
    type: Number,
    default: 67,
  },
  googleBusinessUrl: {
    type: String,
    default: '',
  },
  googleMapsUrl: {
    type: String,
    default: '',
  },
  serviceArea: {
    type: String,
    default: 'Bronx and surrounding New York City areas',
  },
  hours: {
    type: Map,
    of: String,
    default: {
      monday: '7:00 AM–10:00 PM',
      tuesday: '7:00 AM–10:00 PM',
      wednesday: '7:00 AM–10:00 PM',
      thursday: '7:00 AM–10:00 PM',
      friday: '7:00 AM–10:00 PM',
      saturday: '7:00 AM–10:00 PM',
      sunday: '8:00 AM–9:00 PM',
    },
  },
  logo: {
    type: String,
    default: '',
  },
  favicon: {
    type: String,
    default: '',
  },
  socialLinks: {
    type: Map,
    of: String,
    default: {},
  },
  seo: {
    title: {
      type: String,
      default: 'Standard General Construction Inc. | General Contractor in Bronx, NY',
    },
    description: {
      type: String,
      default: 'Standard General Construction Inc. provides construction and home improvement services in the Bronx, NY. Contact us to discuss your project and request an estimate.',
    },
    keywords: {
      type: [String],
      default: [
        'general contractor Bronx NY',
        'construction company Bronx NY',
        'roofing contractor Bronx NY',
        'residential construction Bronx',
        'home improvement contractor Bronx',
        'masonry contractor Bronx',
        'waterproofing contractor Bronx',
      ],
    },
  },
}, {
  timestamps: true,
});

const BusinessInfo = mongoose.model('BusinessInfo', businessInfoSchema);
export default BusinessInfo;
