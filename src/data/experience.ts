export interface Experience {
  id: string
  title: string
  company: { name: string; link: string | null }
  location: string
  startDate: string
  endDate?: string
  current: boolean
  description: string[]
  achievements: string[]
  technologies: string[]
  type: 'Full-time' | 'Contract' | 'Freelance' | 'Internship'
}

export const experiences: Experience[] = [
  {
    id: 'gft-java-intern',
    title: 'Software Developer Intern - Java',
    company: { name: 'GFT Technologies', link: 'https://www.gft.com/' },
    location: 'Brazil',
    startDate: '2025-10',
    current: true,
    type: 'Internship',
    description: [
      'Contributing to enterprise-grade Java application development within a dynamic Agile environment, gaining hands-on experience with modern backend technologies and cloud-native architectures.',
      'Working with Spring Framework ecosystem to build robust, scalable microservices while implementing industry-standard security patterns using JWT and Keycloak for authentication and authorization.',
      'Developing RESTful APIs following MVC architecture principles, leveraging JPA for efficient data persistence with PostgreSQL databases.',
      'Collaborating on containerized deployments using Docker, ensuring consistent environments across development, testing, and production stages.',
      'Participating in observability and monitoring initiatives using Prometheus and Grafana to track application performance, system health, and business metrics.',
      'Gaining experience with distributed systems through event-driven architectures using Apache Kafka and RabbitMQ for asynchronous messaging and inter-service communication.',
      'Implementing caching strategies with Redis to optimize application performance and reduce database load.',
      'Managing project dependencies and build automation using Maven, following DevOps best practices for continuous integration and delivery.'
    ],
    achievements: [
      'Successfully delivered microservices features within sprint deadlines',
      'Implemented authentication and authorization flows using JWT and Keycloak',
      'Contributed to performance optimization resulting in reduced API response times',
      'Gained proficiency in modern Java ecosystem and cloud-native patterns',
      'Developed expertise in event-driven architectures and messaging systems'
    ],
    technologies: ['Java', 'Spring Framework', 'Angular', 'JWT', 'Keycloak', 'JPA', 'PostgreSQL', 'Docker', 'MVC', 'Prometheus', 'Grafana', 'Redis', 'Maven', 'Apache Kafka', 'RabbitMQ', 'REST APIs', 'Microservices']
  },
  {
    id: 'colegio-adventista-support',
    title: 'IT Support Analyst I',
    company: { name: 'Colégio Adventista', link: null },
    location: 'Brazil',
    startDate: '2025-04',
    endDate: '2025-09',
    current: false,
    type: 'Full-time',
    description: [
      'Provided comprehensive technical support to faculty, staff, and students, troubleshooting complex issues related to enterprise systems, productivity software, and network infrastructure.',
      'Managed daily IT operations including system maintenance, software updates, and hardware diagnostics, ensuring optimal performance of educational technology resources.',
      'Played a key role in onboarding new users, conducting training sessions on internal platforms and tools, helping them quickly adapt to the digital learning environment.',
      'Collaborated with IT team on implementing system upgrades and security patches, maintaining high availability and minimizing disruption to academic operations.',
      'Demonstrated strong communication skills and attention to detail while documenting technical issues, solutions, and best practices to build a comprehensive knowledge base.',
      'Took a proactive approach to identifying recurring technical problems and proposing process improvements to enhance user satisfaction and operational efficiency.'
    ],
    achievements: [
      'Resolved 95%+ of support tickets within SLA timeframes',
      'Successfully onboarded 100+ new users with zero critical incidents',
      'Improved system uptime through proactive maintenance and monitoring',
      'Created comprehensive documentation reducing resolution time by 30%',
      'Enhanced user satisfaction through clear communication and quick problem resolution'
    ],
    technologies: ['Windows', 'Network Administration', 'System Maintenance', 'Technical Support', 'User Training', 'Hardware Troubleshooting', 'Software Installation', 'IT Documentation']
  }
]

export const getCurrentExperience = (): Experience | undefined => {
  return experiences.find(exp => exp.current)
}

export const getExperienceByCompany = (company: string): Experience[] => {
  return experiences.filter(exp => exp.company.name.toLowerCase().includes(company.toLowerCase()))
}

export const getAllExperiences = (): Experience[] => {
  return experiences.sort((a, b) => {
    const aDate = a.current ? new Date() : new Date(a.endDate || a.startDate)
    const bDate = b.current ? new Date() : new Date(b.endDate || b.startDate)
    return bDate.getTime() - aDate.getTime()
  })
}

export const getExperienceYears = (): number => {
  const firstJob = experiences[experiences.length - 1]
  const startYear = new Date(firstJob.startDate).getFullYear()
  const currentYear = new Date().getFullYear()
  return currentYear - startYear
}