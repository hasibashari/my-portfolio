export interface ProjectItem {
  id: string
  title: string
  badge: string
  category: 'AI & Backend' | 'Cloud & Data' | 'Microservices' | 'Fullstack'
  badgeColor: string
  description: string
  longDescription?: string
  techStack: string[]
  demoUrl: string
  githubUrl?: string
  imageUrl: string
  codeSnippet: string
  featured?: boolean
}

export const PROJECT_CATEGORIES = [
  'All',
  'AI & Backend',
  'Cloud & Data',
  'Microservices',
  'Fullstack',
] as const

export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number]

export const projects: ProjectItem[] = [
  {
    id: 'ai-studio',
    title: 'AI Agent Automation Engine',
    badge: 'AI & BACKEND',
    category: 'AI & Backend',
    badgeColor: '#cc785c',
    description:
      'A highly scalable backend engine built with Express and Docker, allowing teams to execute multi-prompt AI workflows with streaming responses and complex state management.',
    longDescription:
      'Engineered a distributed agent execution framework supporting real-time token streaming, tool invocation graphs, and isolated sandbox runtimes. Features Redis Pub/Sub for worker synchronization and telemetry tracking.',
    techStack: ['Node.js', 'Express', 'Docker', 'OpenAI API', 'Redis', 'TypeScript'],
    demoUrl: 'https://example.com/ai-studio-demo',
    githubUrl: 'https://github.com/hasibashari/ai-studio-engine',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
    codeSnippet: `// Agentic Tool Execution Pipeline
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet",
  max_tokens: 1024,
  system: "You are an autonomous code refactoring engine.",
  tools: [fileReadTool, codeEditTool],
  messages: [{ role: "user", content: "Optimize backend data flow" }]
});`,
  },
  {
    id: 'analytics',
    title: 'Distributed Telemetry Service',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#e8a55a',
    description:
      'An enterprise telemetry processing pipeline handling real-time server metrics, deployed on AWS with auto-scaling containerization.',
    longDescription:
      'Constructed a low-latency telemetry ingestion pipeline capable of aggregating thousands of hardware events per second. Utilizes WebSockets for live visualization and TimescaleDB/PostgreSQL for time-series persistence.',
    techStack: ['NestJS', 'PostgreSQL', 'AWS ECS', 'WebSocket', 'Docker', 'TimescaleDB'],
    demoUrl: 'https://example.com/telemetry-demo',
    githubUrl: 'https://github.com/hasibashari/distributed-telemetry',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
    codeSnippet: `// WebSocket Telemetry Gateway
@WebSocketGateway({ cors: true })
export class TelemetryGateway implements OnGatewayConnection {
  @SubscribeMessage('metrics')
  async handleMetrics(@MessageBody() data: MetricDto) {
    await this.metricsService.store(data);
    this.server.emit('broadcast', data);
  }
}`,
  },
  {
    id: 'ecommerce-api',
    title: 'Headless E-Commerce API',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#5db8a6',
    description:
      'A robust headless e-commerce backend utilizing Spring Boot and PostgreSQL, featuring secure authentication, payment webhooks, and scalable inventory management.',
    longDescription:
      'High-throughput microservices architecture powering checkout, cart state, and order lifecycle management. Integrated idempotent Stripe webhook handlers and Redis caching for product catalog queries.',
    techStack: ['Spring Boot', 'Java', 'PostgreSQL', 'Stripe API', 'GCP', 'Redis'],
    demoUrl: 'https://example.com/ecommerce-api-demo',
    githubUrl: 'https://github.com/hasibashari/headless-ecommerce-api',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: true,
    codeSnippet: `// Spring Boot Checkout Controller
@RestController
@RequestMapping("/api/checkout")
public class CheckoutController {
    @PostMapping("/session")
    public ResponseEntity<SessionDto> createSession(@RequestBody CartDto cart) {
        Session session = stripeService.createCheckoutSession(cart);
        return ResponseEntity.ok(new SessionDto(session.getId()));
    }
}`,
  },
  {
    id: 'collaborative-canvas',
    title: 'Real-time Collaborative Canvas',
    badge: 'FULLSTACK',
    category: 'Fullstack',
    badgeColor: '#cc785c',
    description:
      'An interactive collaborative whiteboard engine featuring conflict-free replicated data types (CRDTs), live cursor tracking, and multi-user room synchronization.',
    longDescription:
      'Built a rich browser-based vector canvas powered by WebGL/Canvas API and Yjs CRDT over WebSocket channels. Supports infinite undo/redo, presence awareness, and vector shape exports.',
    techStack: ['Next.js', 'TypeScript', 'Yjs', 'WebSockets', 'TailwindCSS', 'Node.js'],
    demoUrl: 'https://example.com/canvas-demo',
    githubUrl: 'https://github.com/hasibashari/collaborative-canvas',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
    codeSnippet: `// CRDT Presence Provider Synchronization
const ydoc = new Y.Doc();
const provider = new WebsocketProvider('wss://sync.canvas.io', roomId, ydoc);
const yElements = ydoc.getArray('elements');

provider.awareness.setLocalStateField('user', {
  name: 'Hasib',
  color: '#cc785c',
  cursor: { x: 120, y: 340 }
});`,
  },
  {
    id: 'k8s-operator',
    title: 'Kubernetes Backup Operator',
    badge: 'CLOUD & DATA',
    category: 'Cloud & Data',
    badgeColor: '#e8a55a',
    description:
      'A Go-based custom Kubernetes controller automating scheduled stateful snapshot backups to S3-compatible object storage with Prometheus alert triggers.',
    longDescription:
      'Developed Custom Resource Definitions (CRDs) and reconciliation controllers to monitor PVC volumes, trigger snapshot jobs without application downtime, and export cluster metrics.',
    techStack: ['Go', 'Kubernetes', 'Operator SDK', 'AWS S3', 'Prometheus', 'Docker'],
    demoUrl: 'https://example.com/k8s-operator-demo',
    githubUrl: 'https://github.com/hasibashari/k8s-backup-operator',
    imageUrl: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
    codeSnippet: `// Reconcile Loop for Stateful Backup Custom Resource
func (r *BackupReconciler) Reconcile(ctx context.Context, req ctrl.Request) (ctrl.Result, error) {
    backup := &storagev1alpha1.BackupSchedule{}
    if err := r.Get(ctx, req.NamespacedName, backup); err != nil {
        return ctrl.Result{}, client.IgnoreNotFound(err)
    }
    return r.executeSnapshotPipeline(ctx, backup)
}`,
  },
  {
    id: 'auth-gateway',
    title: 'Multi-Tenant OAuth Gateway',
    badge: 'MICROSERVICES',
    category: 'Microservices',
    badgeColor: '#5db8a6',
    description:
      'A unified authentication and authorization microservice handling JWT minting, RBAC permission resolution, and social SSO federation for distributed platforms.',
    longDescription:
      'Architected a resilient zero-trust auth perimeter with token revocation lists in Redis, biometric WebAuthn support, and fine-grained OpenID Connect provider mappings.',
    techStack: ['FastAPI', 'Python', 'Redis', 'PostgreSQL', 'OAuth2', 'JWT'],
    demoUrl: 'https://example.com/auth-gateway-demo',
    githubUrl: 'https://github.com/hasibashari/multi-tenant-auth-gateway',
    imageUrl: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&h=800&q=80',
    featured: false,
    codeSnippet: `// JWT Token Verification & RBAC Claim Guard
@app.middleware("http")
async def rbac_security_guard(request: Request, call_next):
    token = extract_bearer_token(request.headers)
    claims = await token_service.verify_and_decode(token)
    request.state.tenant_id = claims["tenant_id"]
    request.state.permissions = claims["roles"]
    return await call_next(request)`,
  },
]
