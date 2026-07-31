export const projects = [
  {
    id: 'ecommerce',
    title: 'E-Commerce Platform & Checkout Suite',
    badge: 'FULL-STACK APP',
    badgeColor: '#cc785c',
    description:
      'A high-conversion e-commerce platform built with Next.js 15, Stripe payment integration, server-side search filtering, and responsive MUI/Tailwind UI.',
    techStack: ['Next.js 15', 'TypeScript', 'Stripe API', 'Tailwind CSS', 'PostgreSQL'],
    demoUrl: 'https://example.com/ecommerce-demo',
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
    codeSnippet: `// Next.js App Router Checkout Session Endpoint
import { Stripe } from "stripe";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { cartItems, userId } = await req.parseJson();
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: cartItems.map(item => ({ price: item.priceId, quantity: item.qty })),
    mode: "payment",
    success_url: \`\${process.env.SITE_URL}/order/success\`,
  });
  return NextResponse.json({ id: session.id });
}`,
  },
  {
    id: 'analytics',
    title: 'Realtime Analytics & Performance Dashboard',
    badge: 'DASHBOARD & DATA',
    badgeColor: '#e8a55a',
    description:
      'An enterprise metrics dashboard monitoring real-time server telemetry, user engagement graphs, and web vitals metrics with responsive charts.',
    techStack: ['React 19', 'Material UI', 'Recharts', 'Express.js', 'WebSocket'],
    demoUrl: 'https://example.com/analytics-demo',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    codeSnippet: `// Realtime Telemetry Hook with Auto-Reconnect
export function useTelemetryStream(endpoint: string) {
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  useEffect(() => {
    const ws = new WebSocket(endpoint);
    ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data);
      setMetrics(prev => [...prev.slice(-50), data]);
    };
    return () => ws.close();
  }, [endpoint]);
  return metrics;
}`,
  },
  {
    id: 'ai-studio',
    title: 'AI Task Automation & Prompt Studio',
    badge: 'AI & PRODUCTIVITY',
    badgeColor: '#5db8a6',
    description:
      'An agentic workflow platform allowing teams to compose, test, and execute multi-prompt AI workflows with streaming responses.',
    techStack: ['TypeScript', 'Claude SDK', 'Next.js', 'Zustand', 'Tailwind CSS'],
    demoUrl: 'https://example.com/ai-studio-demo',
    imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80',
    codeSnippet: `// Agentic Tool Execution Pipeline
const response = await anthropic.messages.create({
  model: "claude-3-5-sonnet",
  max_tokens: 1024,
  system: "You are an autonomous code refactoring engine.",
  tools: [fileReadTool, codeEditTool],
  messages: [{ role: "user", content: "Optimize React component rendering" }]
});`,
  },
]
