import { Server, Cloud, Database } from 'lucide-react';

export const experiences = [
  {
    role: 'DevOps Trainee (OJT)',
    company: 'Elitry',
    period: 'Dec 2024 – Jan 2025',
    location: 'Remote',
    description:
      'Focused on automating cloud operations, containerizing service workloads with Docker on Amazon EC2, and implementing robust AWS backup and continuity procedures.',
    highlights: [
      'Applied foundational Infrastructure as Code (IaC) practices for infrastructure provisioning and configuration management.',
      'Configured AWS Backup and restore workflows to support data protection and operational continuity.',
      'Containerized and deployed Ghost CMS and Uptime Kuma on Amazon EC2 using Docker.',
    ],
  },
  {
    role: 'Cloud Solution Architect Trainee (OJT)',
    company: 'Elitry',
    period: 'Nov 2024 – Dec 2024',
    location: 'Remote',
    description:
      'Engaged in architectural solution design, disaster recovery planning, and Proof-of-Concept (PoC) implementations for institutional and public-sector cloud workloads on AWS.',
    highlights: [
      'Designed AWS Disaster Recovery Center (DRC) topologies and architectures for academic and public-sector use cases.',
      'Developed AWS solution designs for government and institutional projects, including Pusdatin Kemenkes SMILE and BPD Bali.',
      'Implemented PoC deployments for WordPress workloads using AWS Elastic Beanstalk and Amazon S3.',
    ],
  },
];

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
];

// skills

export const skills = [
  {
    name: 'Cloud Infrastructure & AWS',
    badge: 'CORE FOCUS',
    badgeColor: '#cc785c',
    description:
      'Architecting resilient cloud environments, AWS disaster recovery solutions, and automated cloud backup strategies.',
    skills: [
      'AWS (EC2, S3, Elastic Beanstalk)',
      'Disaster Recovery (DRC)',
      'AWS Backup & Restore',
      'Linux Server Admin',
      'VPC & Cloud Networking',
      'Cloud Security Basics',
    ],
    icon: Cloud,
  },
  {
    name: 'Backend Engineering & APIs',
    badge: 'PROFICIENT',
    badgeColor: '#e8a55a',
    description:
      'Building modular RESTful backend services, authentication mechanisms, and reliable server-side business logic.',
    skills: [
      'Node.js & Express.js',
      'NestJS Framework',
      'TypeScript',
      'RESTful API Design',
      'PostgreSQL & Relational DBs',
      'Prisma ORM',
    ],
    icon: Server,
  },
  {
    name: 'Containerization & DevOps',
    badge: 'HANDS-ON',
    badgeColor: '#5db8a6',
    description:
      'Containerizing services, implementing Infrastructure as Code (IaC), and setting up automated CI/CD pipelines.',
    skills: [
      'Docker Containerization',
      'Infrastructure as Code (IaC)',
      'CI/CD Automation',
      'Nginx & Reverse Proxy',
      'System Monitoring (Uptime Kuma)',
      'Git & Version Control',
    ],
    icon: Database,
  },
];
