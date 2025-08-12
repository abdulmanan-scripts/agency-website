import { First, Second, Third, Fourth, Fifth } from '@/icons/ApproachIcons';

export const NAV_ITEMS = [
  {
    title: 'Main',
    href: 'main',
  },
  {
    title: 'About',
    href: 'about',
  },
  {
    title: 'Services',
    href: 'services',
  },
  {
    title: 'Approach',
    href: 'approach',
  },
  {
    title: 'Contact',
    href: 'contact',
  },
];

export const CARDS = [
  {
    title: 'Digital Strategy',
    description:
      'Transform your business with comprehensive digital strategies. We analyze market trends, competitor landscapes, and user behavior to create data-driven roadmaps that accelerate growth and maximize ROI.',
    services: [
      ['Brand Strategy', 'Market Research'],
      ['Digital Transformation', 'Analytics Setup'],
    ],
    number: '01.',
    classes: '',
  },
  {
    title: 'Creative Development',
    description:
      'Bring your vision to life with cutting-edge web and mobile applications. Our team crafts scalable, performant solutions using the latest technologies while maintaining exceptional user experiences.',
    services: [
      ['Web Applications', 'Mobile Apps'],
      ['E-commerce', 'Custom Solutions'],
    ],
    number: '02.',
    classes: 'border-t border-gray-1/50',
  },
  {
    title: 'Brand & Design',
    description:
      'Create memorable brand experiences that resonate with your audience. From logo design to complete brand systems, we develop cohesive visual identities that drive engagement and build trust.',
    services: [['Brand Identity', 'UI/UX Design'], ['Marketing Materials', 'Brand Guidelines']],
    number: '03.',
    classes: 'border-t border-gray-1/50',
  },
];

export const APPROACH_CARDS = [
  {
    icon: First,
    title: 'Discovery & Strategy',
    description:
      'We begin with deep research into your business goals, target audience, and market landscape. This foundation ensures every decision is strategic and aligned with your vision.',
  },
  {
    icon: Second,
    title: 'Collaborative Design',
    description:
      'Working closely with your team, we create wireframes, prototypes, and designs that bring your ideas to life. Regular feedback loops ensure the final product exceeds expectations.',
  },
  {
    icon: Third,
    title: 'Agile Development',
    description: 'Our development process is iterative and transparent. We build in sprints, allowing for continuous testing, refinement, and adaptation throughout the project lifecycle.',
  },
  {
    icon: Fourth,
    title: 'Quality Assurance',
    description:
      'Rigorous testing across all devices and platforms ensures your product performs flawlessly. We conduct user testing sessions to validate functionality and user experience.',
  },
  {
    icon: Fifth,
    title: 'Launch & Growth',
    description:
      'Beyond launch, we provide ongoing support, analytics monitoring, and optimization strategies to ensure your digital presence continues to evolve and grow with your business.',
  },
];

export const RADIO_FIELDS = [
  {
    title: 'What type of services do you need?',
    classes: 'mr-[2.25vw]',
    radioArray: [
      { name: 'Digital Strategy', value: 'digital-strategy' },
      { name: 'Web Development', value: 'web-dev' },
      { name: 'Mobile Development', value: 'mobile-dev' },
      { name: 'Brand & Design', value: 'brand-design' },
      { name: 'All Services', value: 'all-services' },
    ],
    formKey: '_service',
  },
  {
    title: 'What is your project budget?',
    classes: '',
    radioArray: [
      { name: '$5,000 - $15,000', value: '5-15' },
      { name: '$15,000 - $30,000', value: '15-30' },
      { name: '$30,000 - $50,000', value: '30-50' },
      { name: '$50,000+', value: '50+' },
    ],
    formKey: '_budget',
  },
  {
    title: 'Project timeline expectations?',
    classes: 'mr-[2.25vw]',
    radioArray: [
      { name: '1-2 months', value: '1-2' },
      { name: '3-4 months', value: '3-4' },
      { name: '5-6 months', value: '5-6' },
      { name: '6+ months', value: '6+' },
    ],
    formKey: '_timeline',
  },
  {
    title: 'How did you hear about BuddyBoard?',
    classes: '',
    radioArray: [
      { name: 'Google Search', value: 'google' },
      { name: 'Social Media', value: 'social' },
      { name: 'Referral', value: 'referral' },
      { name: 'Other', value: 'other' },
    ],
    formKey: '_source',
  },
];

export const INPUT_FIELDS = [
  { label: 'Full Name', name: 'fullName', classes: 'inline-block !w-[calc(50%-2vw)] mr-[4vw]', required: true },
  { label: 'Phone Number', name: 'phone', classes: 'inline-block !w-[calc(50%-2vw)]', type: 'tel', required: true },
  { label: 'Email Address', name: 'email', classes: '', type: 'email', required: true },
  { label: 'Company Name', name: 'company', classes: '', required: true },
  { label: 'Company Website', name: 'website', classes: '', type: 'url' },
];

export const BOOK_FORM_DEFAULT_STATE = {
  _service: null,
  _budget: null,
  _timeline: null,
  _source: null,

  fullName: '',
  phone: '',
  email: '',
  company: '',
  website: '',
  message: '',
};