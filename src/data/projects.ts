export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  image?: string
  technologies: string[]
  category: 'Infrastructure' | 'Frontend' | 'Backend' | 'DevOps' | 'AI/ML' | 'Entrepreneurship' | 'Hackathon'
  status: 'Completed' | 'In Progress' | 'Archived'
  timeline: string
  outcomes: string[]
  metrics?: {
    label: string
    value: string
    improvement?: string
  }[]
  links?: {
    type: 'github' | 'demo' | 'case-study' | 'article'
    url: string
    label: string
  }[]
  highlights: string[]
  challenges: string[]
  learnings: string[]
}

export const projects: Project[] = [
  {
    id: 'hackathon-receita-federal',
    title: 'EcoVape - Sustainable IoT Solution',
    description: 'Developed an innovative environmental impact solution at Receita Federal Hackathon, transforming discarded VAPE components into functional IoT devices for sustainability monitoring.',
    longDescription: 'Participated in the Receita Federal Hackathon where our team tackled electronic waste and environmental sustainability challenges. We engineered an innovative solution that disassembles confiscated/discarded VAPE devices and repurposes their valuable components (batteries, sensors, microcontrollers) to create IoT environmental monitoring devices. Built with ESP32 microcontrollers, Node.js backend services, and Docker containerization, our solution demonstrates how regulatory enforcement can intersect with circular economy principles to create positive environmental impact.',
    category: 'Hackathon',
    status: 'Completed',
    timeline: '2024',
    technologies: ['ESP32', 'Node.js', 'Docker', 'IoT', 'NestJS', 'Prisma', 'TypeScript', 'Containerization', 'Microservices', 'Environmental Tech'],
    outcomes: [
      'Successfully demonstrated VAPE component recovery and repurposing process',
      'Built working IoT prototype using recycled electronic components',
      'Created scalable microservices architecture with Docker containerization',
      'Developed real-time data collection system for environmental monitoring',
      'Proposed circular economy model for electronic waste from regulatory enforcement'
    ],
    metrics: [
      { label: 'Component Reuse', value: '90%+', improvement: 'of VAPE electronics recycled' },
      { label: 'System Uptime', value: '99.5%', improvement: 'Docker containerization' },
      { label: 'Environmental Impact', value: 'Significant', improvement: 'waste reduction achieved' },
      { label: 'Cost per Device', value: '< $5', improvement: 'using recycled components' }
    ],
    highlights: [
      'ESP32-based IoT devices built from recycled VAPE components',
      'Dockerized microservices architecture for scalability and portability',
      'NestJS backend with Prisma ORM for efficient data management',
      'Real-time environmental monitoring and data collection system',
      'Circular economy approach to regulatory enforcement waste',
      'Full-stack solution from hardware disassembly to cloud infrastructure'
    ],
    challenges: [
      'Safely disassembling lithium batteries from VAPE devices',
      'Identifying and testing reusable components from different VAPE models',
      'Designing robust firmware for ESP32 with recycled power supplies',
      'Implementing reliable data transmission from constrained IoT devices',
      'Containerizing entire solution for reproducible deployment',
      'Balancing environmental impact metrics with technical feasibility'
    ],
    learnings: [
      'Deep understanding of ESP32 capabilities and limitations in IoT applications',
      'Practical experience with circular economy and e-waste management',
      'Docker containerization best practices for microservices architecture',
      'Importance of modular design when working with recycled components',
      'Value of full-stack thinking from hardware to cloud infrastructure',
      'Critical role of sustainability in modern technology solutions',
      'Cross-functional collaboration between hardware and software teams'
    ],
    links: [
      { type: 'github', url: 'https://github.com/victrhugo/hackathon-receita-federal', label: 'View Source Code' }
    ]
  }
]

export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id)
}

export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category)
}

export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.status === 'Completed').slice(0, 4)
}