export type LayoutFamily =
  | 'boards-cards'
  | 'timelines'
  | 'architecture'
  | 'mobile-app-views'
  | 'browser-ui-layouts'
  | 'graphs-metrics'
  | 'process-flowcharts'
  | 'real-world-analogies'
  | 'teaching-slides';

export type VisualPrimitive =
  | 'VisualCardGrid'
  | 'ComparisonMatrix'
  | 'TimelineStrip'
  | 'FlowDiagram'
  | 'ArchitectureMap'
  | 'PhoneMockup'
  | 'BrowserMockup'
  | 'MetricChart';

export type LayoutCatalogEntry = {
  kind: string;
  label: string;
  family: LayoutFamily;
  bestFor: string;
  primitive: VisualPrimitive;
  exampleUse: string;
};

const entry = <const K extends string>(
  kind: K,
  label: string,
  family: LayoutFamily,
  bestFor: string,
  primitive: VisualPrimitive,
  exampleUse: string,
): LayoutCatalogEntry & {kind: K} => ({
  kind,
  label,
  family,
  bestFor,
  primitive,
  exampleUse,
});

export const layoutCatalog = [
  entry('hero-card', 'Hero Card', 'boards-cards', 'One central definition or concept.', 'VisualCardGrid', 'Define availability as successful response to user requests.'),
  entry('split-card', 'Split Card', 'boards-cards', 'Two-part contrast or before/after.', 'VisualCardGrid', 'Compare consistency and availability side by side.'),
  entry('triple-card', 'Triple Card', 'boards-cards', 'Three pillars, steps, or properties.', 'VisualCardGrid', 'Show detect, reroute, and recover as three resilience steps.'),
  entry('comparison-board', 'Comparison Board', 'boards-cards', 'Small option comparison.', 'ComparisonMatrix', 'Compare strong, eventual, and causal guarantees.'),
  entry('feature-matrix', 'Feature Matrix', 'boards-cards', 'Feature-by-feature capability comparison.', 'ComparisonMatrix', 'Map product features to required consistency guarantees.'),
  entry('pros-cons', 'Pros Cons', 'boards-cards', 'Benefits and tradeoffs.', 'ComparisonMatrix', 'Show pros and cons of active-active replication.'),
  entry('checklist-board', 'Checklist Board', 'boards-cards', 'Review criteria.', 'VisualCardGrid', 'List rollout readiness checks.'),
  entry('decision-board', 'Decision Board', 'boards-cards', 'Choose between architecture options.', 'ComparisonMatrix', 'Choose queue vs synchronous call for a workflow.'),
  entry('summary-board', 'Summary Board', 'boards-cards', 'End-of-section recap.', 'VisualCardGrid', 'Summarize the three availability lessons.'),

  entry('timeline', 'Simple Timeline', 'timelines', 'Linear concept sequence.', 'TimelineStrip', 'Show request, process, response.'),
  entry('milestone-timeline', 'Milestone Timeline', 'timelines', 'Architecture or product milestones.', 'TimelineStrip', 'Show migration phases from single region to multi-region.'),
  entry('incident-timeline', 'Incident Timeline', 'timelines', 'Outage progression.', 'TimelineStrip', 'Show alert, impact, mitigation, resolution.'),
  entry('deployment-timeline', 'Deployment Timeline', 'timelines', 'Rollout and rollback flow.', 'TimelineStrip', 'Show canary, expand, monitor, rollback.'),
  entry('retry-timeline', 'Retry Timeline', 'timelines', 'Attempts, delays, and backoff.', 'TimelineStrip', 'Show retry attempts with increasing delay.'),
  entry('request-journey', 'Request Journey', 'timelines', 'User request path through systems.', 'FlowDiagram', 'Trace a checkout request from app to payment service.'),
  entry('event-sequence', 'Event Sequence', 'timelines', 'Ordered events or messages.', 'TimelineStrip', 'Show order-created, payment-authorized, order-confirmed.'),
  entry('saga-timeline', 'Saga Timeline', 'timelines', 'Distributed transaction steps.', 'TimelineStrip', 'Show reserve inventory, charge card, confirm order.'),
  entry('recovery-timeline', 'Recovery Timeline', 'timelines', 'Detect, reroute, and recover.', 'TimelineStrip', 'Show failover from primary to replica.'),

  entry('system-diagram', 'System Diagram', 'architecture', 'General architecture overview.', 'ArchitectureMap', 'Show API, queue, worker, cache, and database.'),
  entry('service-mesh', 'Service Mesh', 'architecture', 'Many services communicating.', 'ArchitectureMap', 'Show service-to-service calls with routing layer.'),
  entry('api-gateway', 'API Gateway', 'architecture', 'Edge routing and backend fanout.', 'ArchitectureMap', 'Show gateway dispatching to auth, catalog, and order services.'),
  entry('fanout-layout', 'Fanout Layout', 'architecture', 'One request to many workers or services.', 'ArchitectureMap', 'Show notification fanout to many subscribers.'),
  entry('queue-flow', 'Queue Flow', 'architecture', 'Async processing and backpressure.', 'ArchitectureMap', 'Show producer, queue, worker, database.'),
  entry('event-bus', 'Event Bus', 'architecture', 'Pub/sub and event-driven systems.', 'ArchitectureMap', 'Show event bus distributing order events.'),
  entry('cache-layer', 'Cache Layer', 'architecture', 'Cache, database, and application layering.', 'ArchitectureMap', 'Show app reading cache before database.'),
  entry('database-cluster', 'Database Cluster', 'architecture', 'Replicas, primaries, and failover.', 'ArchitectureMap', 'Show primary database with read replicas.'),
  entry('microservice-map', 'Microservice Map', 'architecture', 'Product area split into services.', 'ArchitectureMap', 'Show commerce services around the storefront.'),

  entry('single-phone', 'Single Phone', 'mobile-app-views', 'One app state.', 'PhoneMockup', 'Show an unavailable checkout screen.'),
  entry('two-phones', 'Two Phones', 'mobile-app-views', 'Two users or two states.', 'PhoneMockup', 'Show one user seeing stale data and another seeing fresh data.'),
  entry('before-after-phone', 'Before/After Phone', 'mobile-app-views', 'State change or eventual update.', 'PhoneMockup', 'Show profile address before and after save.'),
  entry('feed-screen', 'Feed Screen', 'mobile-app-views', 'Feeds, ranking, and stale reads.', 'PhoneMockup', 'Show delayed like count propagation.'),
  entry('chat-screen', 'Chat Screen', 'mobile-app-views', 'Ordering, causality, delivery states.', 'PhoneMockup', 'Show replies preserving causal order.'),
  entry('checkout-screen', 'Checkout Screen', 'mobile-app-views', 'Payments, inventory, critical flows.', 'PhoneMockup', 'Show checkout blocked by inventory conflict.'),
  entry('settings-screen', 'Settings Screen', 'mobile-app-views', 'Profile updates and read-your-writes.', 'PhoneMockup', 'Show saved address visible to the writer.'),
  entry('notification-screen', 'Notification Screen', 'mobile-app-views', 'Push, async delivery, retries.', 'PhoneMockup', 'Show delayed notification delivery.'),
  entry('dashboard-screen', 'Dashboard Screen', 'mobile-app-views', 'User-facing analytics or account state.', 'PhoneMockup', 'Show account dashboard during partial outage.'),

  entry('browser-window', 'Browser Window', 'browser-ui-layouts', 'Generic web app or page.', 'BrowserMockup', 'Show a service unavailable page.'),
  entry('dashboard-ui', 'Dashboard UI', 'browser-ui-layouts', 'Overview panels and status.', 'BrowserMockup', 'Show service status tiles.'),
  entry('admin-panel', 'Admin Panel', 'browser-ui-layouts', 'Controls, queues, moderation.', 'BrowserMockup', 'Show admin retry controls.'),
  entry('monitoring-screen', 'Monitoring Screen', 'browser-ui-layouts', 'Live service health.', 'BrowserMockup', 'Show regions, errors, and latency.'),
  entry('analytics-screen', 'Analytics Screen', 'browser-ui-layouts', 'Charts and business metrics.', 'BrowserMockup', 'Show active users with eventual metrics.'),
  entry('search-results', 'Search Results', 'browser-ui-layouts', 'Retrieval, ranking, cache behavior.', 'BrowserMockup', 'Show cached search results during backend delay.'),
  entry('ticket-queue', 'Ticket Queue', 'browser-ui-layouts', 'Support or ops queues.', 'BrowserMockup', 'Show incident tickets accumulating.'),
  entry('incident-dashboard', 'Incident Dashboard', 'browser-ui-layouts', 'SRE incident status.', 'BrowserMockup', 'Show severity, owner, timeline, and impacted services.'),
  entry('metrics-page', 'Metrics Page', 'browser-ui-layouts', 'Metric-heavy explanation.', 'BrowserMockup', 'Show latency, throughput, and error charts together.'),

  entry('line-chart', 'Line Chart', 'graphs-metrics', 'Generic metric over time.', 'MetricChart', 'Show request count over time.'),
  entry('area-chart', 'Area Chart', 'graphs-metrics', 'Accumulated load or capacity.', 'MetricChart', 'Show queue backlog area.'),
  entry('bar-chart', 'Bar Chart', 'graphs-metrics', 'Category comparison.', 'MetricChart', 'Compare downtime by component.'),
  entry('latency-curve', 'Latency Curve', 'graphs-metrics', 'Tail latency and saturation.', 'MetricChart', 'Show latency rising as load approaches capacity.'),
  entry('throughput-curve', 'Throughput Curve', 'graphs-metrics', 'Capacity and bottlenecks.', 'MetricChart', 'Show throughput flattening after saturation.'),
  entry('error-rate', 'Error Rate', 'graphs-metrics', 'Failure spikes.', 'MetricChart', 'Show error rate spike during outage.'),
  entry('availability-curve', 'Availability Curve', 'graphs-metrics', 'Uptime and incidents.', 'MetricChart', 'Show availability dipping during incident.'),
  entry('queue-growth', 'Queue Growth', 'graphs-metrics', 'Backpressure and lag.', 'MetricChart', 'Show backlog growing when workers fail.'),
  entry('cost-graph', 'Cost Graph', 'graphs-metrics', 'Cost vs reliability or scale.', 'MetricChart', 'Show extra nines increasing cost.'),

  entry('linear-flow', 'Linear Flow', 'process-flowcharts', 'Straight-line steps.', 'FlowDiagram', 'Show validate, reserve, charge, confirm.'),
  entry('decision-tree', 'Decision Tree', 'process-flowcharts', 'Branching choices.', 'FlowDiagram', 'Show retry or fail based on timeout.'),
  entry('branching-flow', 'Branching Flow', 'process-flowcharts', 'Multiple outcomes.', 'FlowDiagram', 'Show request path choosing cache hit or database read.'),
  entry('retry-loop', 'Retry Loop', 'process-flowcharts', 'Retry, wait, retry again.', 'FlowDiagram', 'Show exponential backoff loop.'),
  entry('state-machine', 'State Machine', 'process-flowcharts', 'States and transitions.', 'FlowDiagram', 'Show pending, processing, failed, recovered.'),
  entry('workflow-board', 'Workflow Board', 'process-flowcharts', 'Process orchestration.', 'FlowDiagram', 'Show worker workflow with checkpoints.'),
  entry('approval-chain', 'Approval Chain', 'process-flowcharts', 'Human or service approvals.', 'FlowDiagram', 'Show deploy approval gates.'),
  entry('escalation-path', 'Escalation Path', 'process-flowcharts', 'Alerting and incident escalation.', 'FlowDiagram', 'Show page engineer, incident lead, comms.'),
  entry('recovery-flow', 'Recovery Flow', 'process-flowcharts', 'Detect, isolate, recover.', 'FlowDiagram', 'Show recovery path after component failure.'),

  entry('airport-board', 'Airport Board', 'real-world-analogies', 'Scheduling, delays, routing.', 'VisualCardGrid', 'Explain routing and delay propagation with flights.'),
  entry('restaurant-layout', 'Restaurant Layout', 'real-world-analogies', 'Queues, capacity, order flow.', 'ArchitectureMap', 'Explain queueing using restaurant orders.'),
  entry('bank-queue', 'Bank Queue', 'real-world-analogies', 'Waiting, throughput, service time.', 'FlowDiagram', 'Explain queue growth with bank tellers.'),
  entry('warehouse', 'Warehouse', 'real-world-analogies', 'Inventory, fulfillment, partitioning.', 'ArchitectureMap', 'Explain inventory consistency with warehouse stock.'),
  entry('library-system', 'Library System', 'real-world-analogies', 'Indexing, lookup, consistency.', 'ArchitectureMap', 'Explain cache invalidation with a library index.'),
  entry('traffic-network', 'Traffic Network', 'real-world-analogies', 'Routing, congestion, failover.', 'ArchitectureMap', 'Explain load balancing through road routing.'),
  entry('hospital-flow', 'Hospital Flow', 'real-world-analogies', 'Triage, priority, recovery paths.', 'FlowDiagram', 'Explain prioritization using hospital triage.'),
  entry('factory-line', 'Factory Line', 'real-world-analogies', 'Pipelines and bottlenecks.', 'FlowDiagram', 'Explain throughput bottlenecks on a production line.'),
  entry('delivery-route', 'Delivery Route', 'real-world-analogies', 'Routing, retries, last-mile states.', 'FlowDiagram', 'Explain retry and reroute with delivery paths.'),

  entry('myth-vs-reality', 'Myth vs Reality', 'teaching-slides', 'Correcting a common false model.', 'VisualCardGrid', 'Show one global consistency model as the myth.'),
  entry('quiz-card', 'Quiz Card', 'teaching-slides', 'Pause-and-think question.', 'VisualCardGrid', 'Ask which component is the single point of failure.'),
  entry('rule-of-thumb', 'Rule of Thumb', 'teaching-slides', 'Practical heuristic.', 'VisualCardGrid', 'State the cheapest guarantee that protects the product.'),
  entry('common-mistake', 'Common Mistake', 'teaching-slides', 'Warning against a bad design.', 'VisualCardGrid', 'Warn against retry storms.'),
  entry('interview-question', 'Interview Question', 'teaching-slides', 'System design interview framing.', 'VisualCardGrid', 'Frame a design question for high availability.'),
  entry('design-review', 'Design Review', 'teaching-slides', 'Evaluate a proposed architecture.', 'ComparisonMatrix', 'Review a single-region architecture for failure risk.'),
  entry('tradeoff-matrix', 'Tradeoff Matrix', 'teaching-slides', 'Multi-dimensional tradeoffs.', 'ComparisonMatrix', 'Compare redundancy, replication, and failover.'),
  entry('key-takeaways', 'Key Takeaways', 'teaching-slides', 'End-of-topic recap.', 'VisualCardGrid', 'Summarize the lesson in three takeaways.'),
  entry('next-episode', 'Next Episode', 'teaching-slides', 'Bridge to the next lesson.', 'VisualCardGrid', 'Preview single points of failure.'),
] as const;

export type LayoutKind = (typeof layoutCatalog)[number]['kind'];

export const getLayoutCatalogEntry = (kind: string): LayoutCatalogEntry | undefined => {
  return layoutCatalog.find((item) => item.kind === kind);
};
