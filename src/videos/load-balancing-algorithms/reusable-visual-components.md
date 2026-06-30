# Load Balancing Algorithms - Reusable Visual Components

This inventory is capped to core primitives. Everything else should stay scene-local until reuse is proven.

## Core reusable primitives

### 1. `LoadBalancerPolicyNode`

- **Purpose:** Canonical load-balancer node with public input, three backend outputs, and one policy badge.
- **Configurable properties:**
  - `policyLabel`
  - `activeOutputId`
  - `showEnvelopeInput`
  - `position`
- **Scenes it will appear in:** 1-52.
- **Existing similarity:** Closest to LoadBalancerNode in load-balancing/visuals.tsx, composed from ArchitectureNode.

### 2. `AlgorithmServerPool`

- **Purpose:** Stable A/B/C pool with capacity blocks and metric counters.
- **Configurable properties:**
  - `servers`
  - `capacities`
  - `metricKind`
  - `metricValues`
  - `activeServerId`
- **Scenes it will appear in:** 1-52.
- **Existing similarity:** Closest to ServerPool and ServiceNode.

### 3. `RoutingPacket`

- **Purpose:** Numbered request token that pauses at a decision and travels to one backend.
- **Configurable properties:**
  - `requestId`
  - `path`
  - `progress`
  - `destination`
  - `state`
- **Scenes it will appear in:** 1, 9-44.
- **Existing similarity:** Closest to HtmlPacket and TrafficPacket.

### 4. `PolicyBadge`

- **Purpose:** Small internal label that flips between algorithm names.
- **Configurable properties:**
  - `label`
  - `previousLabel`
  - `active`
- **Scenes it will appear in:** 8-52.
- **Existing similarity:** Scene-local CardFrame composition.

### 5. `MetricCounterStack`

- **Purpose:** Per-server numeric display for CPU, connections, latency, random count, or hash bucket.
- **Configurable properties:**
  - `unit`
  - `values`
  - `highlightServerId`
  - `label`
- **Scenes it will appear in:** 3-47.
- **Existing similarity:** Closest to ServerLoadMeter.

### 6. `WeightedSelector`

- **Purpose:** A, A, B, C selector/history strip.
- **Configurable properties:**
  - `weights`
  - `history`
  - `activeIndex`
- **Scenes it will appear in:** 18-22.
- **Existing similarity:** Extends RoundRobinSelector.

### 7. `RandomDistributionBoard`

- **Purpose:** Random token scatter plus histogram/equalization board.
- **Configurable properties:**
  - `samples`
  - `destinations`
  - `histogramValues`
- **Scenes it will appear in:** 36-39.
- **Existing similarity:** Closest to MetricChart.

### 8. `StickySessionFlow`

- **Purpose:** FoodDash session steps plus key-to-backend mapping.
- **Configurable properties:**
  - `userId`
  - `sessionSteps`
  - `keyType`
  - `selectedServerId`
- **Scenes it will appear in:** 40-44.
- **Existing similarity:** Closest to PhoneMockup plus FlowDiagram.

### 9. `AlgorithmComparisonMatrix`

- **Purpose:** Six-row matrix mapping algorithm to optimization signal.
- **Configurable properties:**
  - `rows`
  - `activeRow`
  - `completedRows`
- **Scenes it will appear in:** 45-48.
- **Existing similarity:** Use ComparisonMatrix from visual-library.

### 10. `RequestEnvelopeBridge`

- **Purpose:** Envelope revealing URL, route, headers, cookies.
- **Configurable properties:**
  - `fields`
  - `activeField`
  - `opened`
- **Scenes it will appear in:** 49-52.
- **Existing similarity:** Closest to BrowserMockup and FlowDiagram.

## Keep scene-local until reuse is proven

- Dashboard cursor and anomaly bracket.
- Unequal request lifetime bars.
- Optional second user chip for hash routing.
- Trade-off note compression.
- Closing bridge transform.

## Implementation order

1. Canonical load-balancer and server-pool geometry.
2. Policy badge and metric counters.
3. Round Robin and Weighted selectors.
4. Least Connections and Least Response Time routing.
5. Random and Hash-Based boards.
6. Comparison matrix and request envelope.
7. Existing closing scene.
