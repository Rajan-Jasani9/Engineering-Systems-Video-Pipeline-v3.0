# Engineering Systems Visual Layout Catalog

This catalog is future-facing. It names reusable visual layouts that can be used by future `lessonPlan.ts` beats without changing existing videos. Treat `kind` values here as vocabulary first; add them to the active `VisualKind` union only when a video actually uses them.

## How To Use

- Pick the `kind` that matches the teaching job.
- Prefer one idea per beat; split crowded explanations into companion beats.
- Keep all layouts monochrome, high-contrast, and caption-safe.
- Use reusable primitives from `src/components/visual-library/` when a generic layout fits.
- Use topic-specific custom visuals only when the catalog shape is not expressive enough.

## Row 1 - Boards & Cards

Used for definitions, conclusions, principles, and compact teaching moments.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Hero Card | `hero-card` | One central definition or concept | `VisualCardGrid` |
| Split Card | `split-card` | Two-part contrast or before/after | `VisualCardGrid` |
| Triple Card | `triple-card` | Three pillars, steps, or properties | `VisualCardGrid` |
| Comparison Board | `comparison-board` | Comparing options across a few dimensions | `ComparisonMatrix` |
| Feature Matrix | `feature-matrix` | Feature-by-feature capability comparison | `ComparisonMatrix` |
| Pros Cons | `pros-cons` | Benefits and tradeoffs without a heavy table | `ComparisonMatrix` |
| Checklist Board | `checklist-board` | Review criteria or implementation checks | `VisualCardGrid` |
| Decision Board | `decision-board` | Choose between architecture options | `ComparisonMatrix` |
| Summary Board | `summary-board` | End-of-section recap | `VisualCardGrid` |

## Row 2 - Timelines

Perfect for availability, distributed systems, outages, retries, and recovery stories.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Simple Timeline | `timeline` | Linear concept sequence | `TimelineStrip` |
| Milestone Timeline | `milestone-timeline` | Product or architecture milestones | `TimelineStrip` |
| Incident Timeline | `incident-timeline` | Outage progression | `TimelineStrip` |
| Deployment Timeline | `deployment-timeline` | Rollout and rollback flow | `TimelineStrip` |
| Retry Timeline | `retry-timeline` | Attempts, delays, backoff | `TimelineStrip` |
| Request Journey | `request-journey` | User request path through systems | `FlowDiagram` |
| Event Sequence | `event-sequence` | Ordered events or messages | `TimelineStrip` |
| Saga Timeline | `saga-timeline` | Distributed transaction steps | `TimelineStrip` |
| Recovery Timeline | `recovery-timeline` | Detect, reroute, recover | `TimelineStrip` |

## Row 3 - Architecture

Bread-and-butter layouts for system design explainers.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| System Diagram | `system-diagram` | General architecture overview | `ArchitectureMap` |
| Service Mesh | `service-mesh` | Many services communicating | `ArchitectureMap` |
| API Gateway | `api-gateway` | Edge routing and backend fanout | `ArchitectureMap` |
| Fanout Layout | `fanout-layout` | One request to many workers/services | `ArchitectureMap` |
| Queue Flow | `queue-flow` | Async processing and backpressure | `ArchitectureMap` |
| Event Bus | `event-bus` | Pub/sub and event-driven systems | `ArchitectureMap` |
| Cache Layer | `cache-layer` | Cache, database, and application layering | `ArchitectureMap` |
| Database Cluster | `database-cluster` | Replicas, primaries, failover | `ArchitectureMap` |
| Microservice Map | `microservice-map` | Product area split into services | `ArchitectureMap` |

## Row 4 - Mobile App Views

Use these when the viewer needs to see product impact, not just backend structure.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Single Phone | `single-phone` | One app state | `PhoneMockup` |
| Two Phones | `two-phones` | Two users or two states | `PhoneMockup` |
| Before/After Phone | `before-after-phone` | State change or eventual update | `PhoneMockup` |
| Feed Screen | `feed-screen` | Social feeds, ranking, stale reads | `PhoneMockup` |
| Chat Screen | `chat-screen` | Ordering, causality, delivery states | `PhoneMockup` |
| Checkout Screen | `checkout-screen` | Payments, inventory, critical flows | `PhoneMockup` |
| Settings Screen | `settings-screen` | Profile updates and read-your-writes | `PhoneMockup` |
| Notification Screen | `notification-screen` | Push, async delivery, retries | `PhoneMockup` |
| Dashboard Screen | `dashboard-screen` | User-facing analytics or account state | `PhoneMockup` |

## Row 5 - Browser/UI Layouts

Useful for SRE, operations, internal tools, dashboards, and incident content.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Browser Window | `browser-window` | Generic web app or page | `BrowserMockup` |
| Dashboard UI | `dashboard-ui` | Overview panels and status | `BrowserMockup` |
| Admin Panel | `admin-panel` | Controls, queues, moderation | `BrowserMockup` |
| Monitoring Screen | `monitoring-screen` | Live service health | `BrowserMockup` |
| Analytics Screen | `analytics-screen` | Charts and business metrics | `BrowserMockup` |
| Search Results | `search-results` | Retrieval, ranking, cache behavior | `BrowserMockup` |
| Ticket Queue | `ticket-queue` | Support or ops queues | `BrowserMockup` |
| Incident Dashboard | `incident-dashboard` | SRE incident status | `BrowserMockup` |
| Metrics Page | `metrics-page` | Metric-heavy explanation | `BrowserMockup` |

## Row 6 - Graphs & Metrics

Use SVG-driven charts for reliability, latency, cost, queueing, and capacity lessons.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Line Chart | `line-chart` | Generic metric over time | `MetricChart` |
| Area Chart | `area-chart` | Accumulated load or capacity | `MetricChart` |
| Bar Chart | `bar-chart` | Category comparison | `MetricChart` |
| Latency Curve | `latency-curve` | Tail latency and saturation | `MetricChart` |
| Throughput Curve | `throughput-curve` | Capacity and bottlenecks | `MetricChart` |
| Error Rate | `error-rate` | Failure spikes | `MetricChart` |
| Availability Curve | `availability-curve` | Uptime and incidents | `MetricChart` |
| Queue Growth | `queue-growth` | Backpressure and lag | `MetricChart` |
| Cost Graph | `cost-graph` | Cost vs reliability or scale | `MetricChart` |

## Row 7 - Process & Flowcharts

Excellent for reliability lessons, operational workflow, and stateful behavior.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Linear Flow | `linear-flow` | Straight-line steps | `FlowDiagram` |
| Decision Tree | `decision-tree` | Branching choices | `FlowDiagram` |
| Branching Flow | `branching-flow` | Multiple outcomes | `FlowDiagram` |
| Retry Loop | `retry-loop` | Retry, wait, retry again | `FlowDiagram` |
| State Machine | `state-machine` | States and transitions | `FlowDiagram` |
| Workflow Board | `workflow-board` | Process orchestration | `FlowDiagram` |
| Approval Chain | `approval-chain` | Human or service approvals | `FlowDiagram` |
| Escalation Path | `escalation-path` | Alerting and incident escalation | `FlowDiagram` |
| Recovery Flow | `recovery-flow` | Detect, isolate, recover | `FlowDiagram` |

## Row 8 - Real World Analogies

Use sparingly to make abstract concepts memorable. Keep the analogy visibly connected to the engineering idea.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Airport Board | `airport-board` | Scheduling, delays, routing | `VisualCardGrid` |
| Restaurant Layout | `restaurant-layout` | Queues, capacity, order flow | `ArchitectureMap` |
| Bank Queue | `bank-queue` | Waiting, throughput, service time | `FlowDiagram` |
| Warehouse | `warehouse` | Inventory, fulfillment, partitioning | `ArchitectureMap` |
| Library System | `library-system` | Indexing, lookup, consistency | `ArchitectureMap` |
| Traffic Network | `traffic-network` | Routing, congestion, failover | `ArchitectureMap` |
| Hospital Flow | `hospital-flow` | triage, priority, recovery paths | `FlowDiagram` |
| Factory Line | `factory-line` | Pipelines and bottlenecks | `FlowDiagram` |
| Delivery Route | `delivery-route` | Routing, retries, last-mile states | `FlowDiagram` |

## Row 9 - Teaching Slides

Use these to sharpen a lesson, correct misunderstandings, or bridge to the next episode.

| Layout | `kind` | Best for | Primitive |
| --- | --- | --- | --- |
| Myth vs Reality | `myth-vs-reality` | Correcting a common false model | `VisualCardGrid` |
| Quiz Card | `quiz-card` | Pause-and-think question | `VisualCardGrid` |
| Rule of Thumb | `rule-of-thumb` | Practical heuristic | `VisualCardGrid` |
| Common Mistake | `common-mistake` | Warning against a bad design | `VisualCardGrid` |
| Interview Question | `interview-question` | System design interview framing | `VisualCardGrid` |
| Design Review | `design-review` | Evaluate a proposed architecture | `ComparisonMatrix` |
| Tradeoff Matrix | `tradeoff-matrix` | Multi-dimensional tradeoffs | `ComparisonMatrix` |
| Key Takeaways | `key-takeaways` | End-of-topic recap | `VisualCardGrid` |
| Next Episode | `next-episode` | Bridge to the next lesson | `VisualCardGrid` |

## Implementation Notes

- Catalog kinds are not automatically active video kinds.
- The implementation layer should prefer reusable primitives before custom one-off layouts.
- A future beat can say `kind: "queue-flow"` only after that `kind` is added to `VisualKind` and mapped to a visual renderer.
- For dense layouts, leave extra space above the takeaway strip and captions.
