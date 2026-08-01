import { Server, Cloud, Database } from 'lucide-react'

export const skills = [
  {
    name: 'Backend & AI Integrations',
    badge: 'EXPERT',
    badgeColor: '#cc785c',
    description: 'Building robust microservices and integrating LLM APIs into modern scalable applications.',
    skills: ['Node.js & Express.js', 'NestJS Architecture', 'Spring Boot (Familiar)', 'OpenAI & Claude APIs', 'REST & GraphQL APIs', 'Redis Caching'],
    icon: Server,
  },
  {
    name: 'Cloud Infrastructure & DevOps',
    badge: 'ADVANCED',
    badgeColor: '#e8a55a',
    description: 'Designing fault-tolerant cloud environments and automated deployment pipelines.',
    skills: ['AWS (EC2, S3, RDS)', 'Google Cloud Platform (GCP)', 'Docker Containerization', 'CI/CD Pipelines', 'Nginx & Load Balancing'],
    icon: Cloud,
  },
  {
    name: 'Database & System Architecture',
    badge: 'PROFICIENT',
    badgeColor: '#5db8a6',
    description: 'Designing scalable database schemas and optimizing query performance for data-intensive systems.',
    skills: ['PostgreSQL & Relational DBs', 'Prisma ORM & TypeORM', 'Microservices Architecture', 'Secure API Design', 'Performance Tuning'],
    icon: Database,
  },
]
