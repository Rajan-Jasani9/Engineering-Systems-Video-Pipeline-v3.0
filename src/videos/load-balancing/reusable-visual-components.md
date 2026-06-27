# Load Balancing — Reusable Visual Components

This implementation inventory is intentionally limited to ten core primitives. Everything else in the screenplay should begin as scene-local composition or small helper logic and be promoted only after a second real reuse case appears.

## Core reusable primitives

### 1. `LoadBalancerNode`

- **Purpose:** Canonical FoodDash front-door node with one public input, backend output ports, a routing-policy slot, a health-state slot, and active/failed/standby presentation.
- **Configurable properties:** `label`, `role` (`single`, `primary`, `backup`, `active`), `status`, `policyLabel`, `healthModuleEnabled`, `eligibleServerIds`, `activeOutputId`, `position`, `dimensions`.
- **Scenes:** 21–55, especially close-ups in 27–35 and redundant-tier scenes 45–50.
- **Existing similarity:** Compose from `ArchitectureNode` in `the-famous-nines/visuals.tsx`; do not introduce a new card style.

### 2. `ServerPool`

- **Purpose:** Stable A/B/C group with canonical top/middle/bottom positions and explicit slots for capacity, active load, queue, health, and optional final-teaser metrics.
- **Configurable properties:** `servers`, `poolLabel`, `statuses`, `capacities`, `loads`, `queues`, `activeServerIds`, `failedServerId`, `showHealthPorts`, `showMetrics`.
- **Scenes:** 14–55.
- **Existing similarity:** Extract the repeated `ServiceNode` geometry used by `FoodDashArchitecture` and `LoadBalancingBridgeVisual`.
- **Metric rule:** Capacity is a fixed outlined `1×` block; load is an animated filled meter; queue is stacked request tokens. These are never interchangeable.

### 3. `ArchitectureConnector`

- **Purpose:** Shared route primitive for candidate, active, inactive, broken, legacy-endpoint, and withdrawing connections.
- **Configurable properties:** `points`, `state`, `drawProgress`, `withdrawProgress`, `strokeWidth`, `opacity`, `showArrow`, `dashPattern`.
- **Scenes:** Throughout, especially 17–26, 29–39, and 41–47.
- **Existing similarity:** Extend `HtmlWire` from a single `active` boolean to semantic states.

### 4. `TrafficPacket`

- **Purpose:** Numbered request token that waits, moves along a connector, receives a destination, succeeds, times out, or becomes blocked.
- **Configurable properties:** `requestId`, `path`, `progress`, `state`, `destination`, `size`, `opacity`.
- **Scenes:** 3–8, 14–26, 29–42, 47–50.
- **Existing similarity:** Reuse `HtmlPacket` path interpolation while adding identity and request state.

### 5. `HealthProbe`

- **Purpose:** Monitoring request/return signal that is unmistakably different from user traffic and supports a visible no-reply timeout.
- **Configurable properties:** `serverId`, `path`, `phase` (`outbound`, `waiting`, `returning`, `timeout`), `result`, `progress`, `periodFrames`.
- **Scenes:** 1–2 for database recovery and 32–39/50 for backend health-aware routing.
- **Existing similarity:** Reuse connector/path math, but render a hollow, slower signal rather than a numbered traffic square.
- **Detection rule:** Crash → scheduled probe → no reply → completed timeout → unhealthy → removed from rotation. Never collapse these into instant knowledge.

### 6. `ServerLoadMeter`

- **Purpose:** Persistent active-work indicator that agrees with actual assignments, overload, redistribution, and the final unequal-work teaser.
- **Configurable properties:** `value`, `max`, `label`, `saturated`, `failed`, `compact`, `orientation`.
- **Scenes:** 6–8, 16, 22–26, 29–36, 49–53.
- **Existing similarity:** Reuse the project's monochrome bar language.
- **Metric rule:** This meter represents processing load only. It never shows capacity or waiting queue depth.

### 7. `QueueMeter`

- **Purpose:** Bounded stack of waiting request tokens with optional numeric overflow.
- **Configurable properties:** `depth`, `visibleTokenLimit`, `processingRate`, `failed`, `orientation`, `label`.
- **Scenes:** 5–8, 11–12, 14–16, 23, 34, 42, 52.
- **Existing similarity:** Compose from request tokens; no separate decorative queue theme is needed.
- **Metric rule:** Before routing exists, the queue remains one unsplit stack at the public boundary.

### 8. `RoundRobinSelector`

- **Purpose:** A/B/C selector ring that advances deterministically by request index and exposes the repeated cycle only after round robin is named.
- **Configurable properties:** `serverIds`, `requestIndex`, `activeServerId`, `showHistory`, `historyLength`, `compact`.
- **Scenes:** 29–31, 36, 51–53.
- **Existing similarity:** New policy module composed inside `LoadBalancerNode`.
- **Reveal rule:** The generic load-balancer demo in Scene 22 uses B→A→C and must not invoke this component's cyclic behavior.

### 9. `FoodDashMobileRequest`

- **Purpose:** Canonical phone/order interaction and user-facing loading, success, timeout, or unavailable outcome.
- **Configurable properties:** `screen`, `requestId`, `loadingMs`, `status`, `showTap`, `compact`.
- **Scenes:** 4, 8, 18–19, 36–39, 42, 47.
- **Existing similarity:** Reuse established FoodDash phone/app visuals from earlier availability episodes.

### 10. `RedundantLoadBalancerPair`

- **Purpose:** Primary/standby routing tier with synchronization, shared ingress, prepared backend routes, and promotion state.
- **Configurable properties:** `primaryStatus`, `standbyStatus`, `activeId`, `syncProgress`, `promotionProgress`, `sharedIngress`, `eligibleServerIds`.
- **Scenes:** 45–51 and as a faint outline in 54–55.
- **Existing similarity:** Reuse active/passive behavior patterns from `RRActivePassiveDetailedVisual`; compose them from two `LoadBalancerNode` instances.
- **Topology rule:** The narration describes synchronized standby takeover, not active-active load sharing.

## Keep scene-local until reuse is proven

Do not pre-build separate reusable components for the following:

- `RequestBatchCounter`: local logic for Scenes 23–24.
- `ResourceMeter` and `LatencyCounter`: small local telemetry helpers for Scenes 7, 10–12, 52–53.
- Eligible-backend chips and health/failure badges: local sub-elements inside `LoadBalancerNode` and `ServerPool`.
- Architecture evolution rail: local recap composition for Scenes 48–50.
- Server metric overlay: local final-teaser composition for Scenes 51–53.
- Camera wrapper: ordinary stage transforms, not a reusable product component.
- Engineer doodle: reuse an existing character asset if available; do not create a new system for two appearances.
- Policy-card silhouettes: local, unnamed shapes in Scenes 27–28 and 54. Do not create a public algorithm-card API before the next episode scope is known.

## Implementation order

1. `ArchitectureConnector` and `TrafficPacket`.
2. `ServerLoadMeter` and `QueueMeter` with capacity/load/queue distinction verified in a still.
3. `ServerPool` using stable A/B/C coordinates.
4. `LoadBalancerNode` and its generic non-cyclic forwarding state.
5. `RoundRobinSelector` as an internal policy module.
6. `HealthProbe` and the delayed detection state machine.
7. `RedundantLoadBalancerPair`.
8. `FoodDashMobileRequest` integration and user-outcome QA.

## Shared visual constraints

- Strict monochrome: black, white, and translucent gray.
- Inline SVG/React attributes for architecture visuals; do not add unrelated scene CSS.
- Frame-driven animation only; no CSS animations or transitions.
- Active traffic and health probes must remain visually distinct.
- Cards use no more than 8 px radius and preserve the lower caption-safe area.
- Server A/B/C coordinates and left-to-right route direction remain stable.
- Apply the scene motion budget: one primary animation, one quiet support, one short text reveal.
