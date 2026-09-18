import { ProjectItem } from '@/shared/types/projects'

export const projects: ProjectItem[] = [
  {
    id: 'ai-studio',
    title: 'AI Agent Automation Engine',
    badge: 'AI & BACKEND',
    category: 'AI & Backend',
    badgeColor: '#cc785c',
    description:
      'A highly scalable backend engine built with Express and Docker, allowing teams to execute multi-prompt AI workflows with streaming responses and complex state management.',
    longDescription: `### Architectural Overview

Engineered a distributed agent execution framework supporting real-time token streaming, tool invocation graphs, and isolated sandbox runtimes.

#### Key Engineering Highlights:
- **Streaming Pipeline**: Implemented Server-Sent Events (SSE) for sub-50ms TTFT (Time to First Token).
- **Worker Coordination**: Utilizes Redis Pub/Sub and BullMQ for orchestrating concurrent multi-step LLM tool calls.
- **Resilience**: Configured auto-retry policies with exponential backoff and fallback model degradation.

\`\`\`typescript
// Workflow execution runner snippet
export async function executeAgentGraph(workflowId: string, context: AgentContext) {
  const runner = new AgentRunner({ sandbox: true, telemetry: true })
  return await runner.evaluate(workflowId, context)
}
\`\`\`
`,
    techStack: ['Node.js', 'Express', 'Docker', 'OpenAI API', 'Redis', 'TypeScript'],
    demoUrl: 'https://example.com/ai-studio-demo',
    githubUrl: 'https://github.com/hasibashari/ai-studio-engine',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
  },
  {
    id: 'analytics',
    title: 'Distributed Telemetry Service',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#788c5d',
    description:
      'An enterprise telemetry processing pipeline handling real-time server metrics, deployed on AWS with auto-scaling containerization.',
    longDescription: `### Pipeline Architecture

Constructed a low-latency telemetry ingestion pipeline capable of aggregating thousands of hardware and application events per second.

#### Key Engineering Highlights:
- **High Ingestion Throughput**: Processes over 15,000 metrics/sec with non-blocking async message queues.
- **Time-Series Storage**: Partitioned PostgreSQL with TimescaleDB hypertables for rapid sub-second analytical queries.
- **Real-time Push**: WebSockets delivery to live administrative monitoring dashboards.
`,
    techStack: ['NestJS', 'PostgreSQL', 'AWS ECS', 'WebSocket', 'Docker', 'TimescaleDB'],
    demoUrl: 'https://example.com/telemetry-demo',
    githubUrl: 'https://github.com/hasibashari/distributed-telemetry',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
  },
  {
    id: 'ecommerce-api',
    title: 'Headless E-Commerce API',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#6a9b9b',
    description:
      'A robust headless e-commerce backend utilizing Spring Boot and PostgreSQL, featuring secure authentication, payment webhooks, and scalable inventory management.',
    longDescription: `### Microservices Ecosystem

High-throughput backend powering checkout, cart state, and order lifecycle management across multiple storefront interfaces.

#### Key Engineering Highlights:
- **Idempotent Payments**: Double-entry bookkeeping system with verified Stripe webhook signatures and replay attack prevention.
- **Distributed Caching**: Redis-backed multi-layer caching with automated cache-invalidation triggers.
`,
    techStack: ['Spring Boot', 'Java', 'PostgreSQL', 'Stripe API', 'GCP', 'Redis'],
    demoUrl: 'https://example.com/ecommerce-api-demo',
    githubUrl: 'https://github.com/hasibashari/headless-ecommerce-api',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
  },
  {
    id: 'collaborative-canvas',
    title: 'Real-time Collaborative Canvas',
    badge: 'FULLSTACK',
    category: 'Fullstack',
    badgeColor: '#8b7a9f',
    description:
      'An interactive collaborative whiteboard engine featuring conflict-free replicated data types (CRDTs), live cursor tracking, and multi-user room synchronization.',
    longDescription: `### Real-Time Vector Engine

Built a rich browser-based vector canvas powered by HTML5 Canvas API and Yjs CRDT over WebSocket channels.

#### Key Engineering Highlights:
- **Conflict-Free Replication**: Zero-conflict concurrent editing via Yjs data structures.
- **Smooth Cursor Interpolation**: Spring-physics smoothing for remote user pointers.
- **Vector Export**: Supports high-fidelity SVG, PNG, and JSON vector exports.
`,
    techStack: ['Next.js', 'TypeScript', 'Yjs', 'WebSockets', 'TailwindCSS', 'Node.js'],
    demoUrl: 'https://example.com/canvas-demo',
    githubUrl: 'https://github.com/hasibashari/collaborative-canvas',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
  },
  {
    id: 'k8s-operator',
    title: 'Kubernetes Backup Operator',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#d97706',
    description:
      'A Go-based custom Kubernetes controller automating scheduled stateful snapshot backups to S3-compatible object storage with Prometheus alert triggers.',
    longDescription: `### Kubernetes Native Controller

Developed Custom Resource Definitions (CRDs) and reconciliation controllers in Go to monitor PVC volumes and automate zero-downtime snapshots.

#### Key Engineering Highlights:
- **Automated Retention**: Manages grandfather-father-son backup rotation lifecycle automatically.
- **Prometheus Metrics**: Custom metrics exporter for snapshot duration, volume size, and failure alerts.
`,
    techStack: ['Go', 'Kubernetes', 'Operator SDK', 'AWS S3', 'Prometheus', 'Docker'],
    demoUrl: 'https://example.com/k8s-operator-demo',
    githubUrl: 'https://github.com/hasibashari/k8s-backup-operator',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
  },
  {
    id: 'auth-gateway',
    title: 'Multi-Tenant OAuth Gateway',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#64748b',
    description:
      'A unified authentication and authorization microservice handling JWT minting, RBAC permission resolution, and social SSO federation for distributed platforms.',
    longDescription: `### Zero-Trust Auth Architecture

Architected a resilient auth perimeter with token revocation lists in Redis, biometric WebAuthn support, and fine-grained OpenID Connect provider mappings.

#### Key Engineering Highlights:
- **Asymmetric Key Rotation**: Automated RSA key pair rotation with JWKS endpoint distribution.
- **Rate-Limiting**: Token bucket rate-limiter in Redis mitigating brute-force credential stuffing.
`,
    techStack: ['FastAPI', 'Python', 'Redis', 'PostgreSQL', 'OAuth2', 'JWT'],
    demoUrl: 'https://example.com/auth-gateway-demo',
    githubUrl: 'https://github.com/hasibashari/multi-tenant-auth-gateway',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
  },
]
