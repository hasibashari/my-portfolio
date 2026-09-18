import { Server, Cloud, Database } from 'lucide-react'

export const experiences = [
  {
    role: 'Senior Backend Engineer',
    company: 'TechCorp Inc.',
    period: '2022 - Present',
    location: 'Remote',
    description:
      'Leading backend architecture for enterprise AI applications using Express.js, NestJS, and AWS. Designed robust APIs handling high traffic and seamless AI model integrations.',
    highlights: [
      'Architected microservices infrastructure deployed on AWS ECS via Docker.',
      'Mentored junior engineers and led code reviews for backend API development.',
      'Spearheaded LLM integration using OpenAI API, reducing processing time by 40%.',
    ],
  },
  {
    role: 'Cloud & Backend Developer',
    company: 'Innovate Labs',
    period: '2020 - 2022',
    location: 'Hybrid',
    description:
      'Engineered scalable RESTful APIs with Node.js/Express and managed cloud deployments using Google Cloud Platform (GCP).',
    highlights: [
      'Built a distributed data processing engine serving 50k daily active users.',
      'Designed PostgreSQL database schema migrations and optimized query latency by 30%.',
      'Automated CI/CD deployment pipelines using GitHub Actions and Docker.',
    ],
  },
  {
    role: 'Software Engineer',
    company: 'Digital Creative Agency',
    period: '2018 - 2020',
    location: 'On-site',
    description:
      'Developed custom backend services, API integrations, and robust data management systems for client platforms.',
    highlights: [
      'Delivered 20+ secure backend integrations on tight deadlines with high reliability.',
      'Integrated Stripe payment gateways and third-party SaaS APIs via robust webhooks.',
    ],
  },
]

// logo

export const logo = [
  {
    name: 'Docker',
    logoUrl: 'https://cdn.simpleicons.org/docker/2496ED',
    tag: 'Docker • Containerization',
  },
  {
    name: 'Amazon AWS',
    logoUrl: 'https://shorturl.at/nlJVA',
    tag: 'AWS • Cloud Infrastructure',
  },
  {
    name: 'Google Cloud',
    logoUrl: 'https://cdn.simpleicons.org/googlecloud/4285F4',
    tag: 'GCP • Cloud Infrastructure',
  },
  {
    name: 'Express.js',
    logoUrl: 'https://cdn.simpleicons.org/express/000000',
    tag: 'Express.js • API Framework',
  },
  {
    name: 'NestJS',
    logoUrl: 'https://cdn.simpleicons.org/nestjs/E0234E',
    tag: 'NestJS • Enterprise API',
  },
  {
    name: 'Spring Boot',
    logoUrl: 'https://cdn.simpleicons.org/springboot/6DB33F',
    tag: 'Spring Boot • Java Framework',
  },
  {
    name: 'PostgreSQL',
    logoUrl: 'https://cdn.simpleicons.org/postgresql/4169E1',
    tag: 'PostgreSQL • Relational DB',
  },
  {
    name: 'TypeScript',
    logoUrl: 'https://cdn.simpleicons.org/typescript/3178C6',
    tag: 'TypeScript • Type Safety',
  },
]


// skills

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
