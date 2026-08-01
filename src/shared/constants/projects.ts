export const projects = [
  {
    id: 'ai-studio',
    title: 'AI Agent Automation Engine',
    badge: 'AI & BACKEND',
    badgeColor: '#cc785c',
    description:
      'A highly scalable backend engine built with Express and Docker, allowing teams to execute multi-prompt AI workflows with streaming responses and complex state management.',
    techStack: ['Node.js', 'Express', 'Docker', 'OpenAI API', 'Redis'],
    demoUrl: 'https://example.com/ai-studio-demo',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
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
    badgeColor: '#e8a55a',
    description:
      'An enterprise telemetry processing pipeline handling real-time server metrics, deployed on AWS with auto-scaling containerization.',
    techStack: ['NestJS', 'PostgreSQL', 'AWS ECS', 'WebSocket', 'Docker'],
    demoUrl: 'https://example.com/telemetry-demo',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
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
    badgeColor: '#5db8a6',
    description:
      'A robust headless e-commerce backend utilizing Spring Boot and PostgreSQL, featuring secure authentication, payment webhooks, and scalable inventory management.',
    techStack: ['Spring Boot', 'Java', 'PostgreSQL', 'Stripe API', 'GCP'],
    demoUrl: 'https://example.com/ecommerce-api-demo',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
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
]
