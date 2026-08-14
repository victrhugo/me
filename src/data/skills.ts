export interface SkillCategory {
  title: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages',
    skills: ['Java', 'TypeScript', 'JavaScript'],
  },
  {
    title: 'Backend & Architecture',
    skills: ['Spring Framework', 'Spring Boot', 'Quarkus', 'REST APIs', 'Microservices', 'JPA / Hibernate', 'NestJS'],
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Angular', 'Tailwind CSS'],
  },
  {
    title: 'Data & Messaging',
    skills: ['PostgreSQL', 'Redis', 'Apache Kafka', 'RabbitMQ'],
  },
  {
    title: 'DevOps & Cloud',
    skills: ['Docker', 'Terraform', 'AWS', 'Maven', 'Git', 'Prometheus', 'Grafana'],
  },
  {
    title: 'Security & Practices',
    skills: ['JWT', 'Keycloak', 'Agile Methodologies'],
  },
]
