export interface Testimonial {
  id: string
  name: string
  title: string
  company: string
  content: string
  relationship: 'Colleague' | 'Manager' | 'Direct Report' | 'Client' | 'Collaborator'
  linkedinUrl?: string
  avatar?: string
  featured: boolean
}

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    name: 'Ana Silva',
    title: 'Engineering Manager',
    company: 'Johnson & Johnson',
    content: 'Victor has been instrumental in driving our AI automation initiatives. His ability to translate complex technical concepts into actionable strategies has accelerated our development velocity by 40%. His leadership in establishing Communities of Practice across LATAM has created a culture of knowledge sharing that benefits our entire organization.',
    relationship: 'Manager',
    linkedinUrl: 'https://linkedin.com/in/example1',
    featured: true
  },
  {
    id: 'testimonial-2',
    name: 'Carlos Rodriguez',
    title: 'Senior DevOps Engineer',
    company: 'Ambev Tech',
    content: 'Working with Victor on the cloud transformation was a game-changer. His expertise in Terraform and infrastructure automation helped us standardize our deployment processes across 15+ countries. He has this rare ability to see the big picture while maintaining attention to detail that ensures enterprise-grade reliability.',
    relationship: 'Colleague',
    linkedinUrl: 'https://linkedin.com/in/example2',
    featured: true
  },
  {
    id: 'testimonial-3',
    name: 'Marina Costa',
    title: 'Platform Engineer',
    company: 'Quero Educação',
    content: 'Victor\'s work on our observability platform transformed how we monitor and maintain our systems. His implementation of Grafana and Prometheus not only improved our incident response time by 70% but also gave us insights we never had before. He\'s a mentor who genuinely cares about team growth.',
    relationship: 'Colleague',
    linkedinUrl: 'https://linkedin.com/in/example3',
    featured: true
  },
  {
    id: 'testimonial-4',
    name: 'Roberto Fernandez',
    title: 'Tech Lead',
    company: 'Johnson & Johnson',
    content: 'Victor\'s approach to building AI-powered development tools has revolutionized our workflow. The automation platform he architected using Langflow and LLMs has reduced our code review cycles and improved code quality metrics significantly. His technical vision combined with practical execution is exceptional.',
    relationship: 'Colleague',
    featured: true
  },
  {
    id: 'testimonial-5',
    name: 'Patricia Oliveira',
    title: 'Software Engineer',
    company: 'Johnson & Johnson',
    content: 'As someone who joined the team recently, I can attest to Victor\'s exceptional mentoring abilities. His Communities of Practice sessions have accelerated my learning curve tremendously. He has this unique talent for explaining complex cloud architectures in a way that makes them accessible and actionable.',
    relationship: 'Direct Report',
    featured: false
  },
  {
    id: 'testimonial-6',
    name: 'Diego Santos',
    title: 'SRE Manager',
    company: 'Ambev Tech',
    content: 'Victor was pivotal in our infrastructure modernization journey. His deep understanding of both traditional and cloud-native architectures allowed us to migrate legacy systems without disrupting business operations. The CI/CD pipelines and infrastructure templates he created are still being used company-wide.',
    relationship: 'Manager',
    featured: false
  }
]

export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.featured)
}

export const getTestimonialsByRelationship = (relationship: Testimonial['relationship']): Testimonial[] => {
  return testimonials.filter(testimonial => testimonial.relationship === relationship)
}

export const getAllTestimonials = (): Testimonial[] => {
  return testimonials
}