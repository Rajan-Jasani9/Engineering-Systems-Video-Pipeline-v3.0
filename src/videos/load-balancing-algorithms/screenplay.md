# Load Balancing Algorithms - Animation Screenplay

Source audio path: `Transcripts&Audios/loadbalancing v2 (mp3cut.net).mp3`  
Source SRT path: `Transcripts&Audios/loadbalancing v2 (mp3cut.net).srt`  
Timed narration duration: **00:07:30.550**  
Episode identity line: **Engineering Systems - Availability Patterns #8: Load Balancing Algorithms**

The screenplay reserves the lower 120-140 px for the project's caption layer. All scene directions refer to the main visual stage only. Motion budget: one primary motion, one quiet support motion, and one short text reveal per scene.

---

## Scene 1: Continuity Hook (1/2)

**Time range:** `00:00:00.010 - 00:00:06.870`

**Transcript covered:**

> Welcome back to Engineering Systems. In our last episode, FoodDash solved a major scaling problem by placing a load balancer in

**Narrative purpose:** Load balancing is running but the work is unequal.

**Connection to previous scene:** Cold open from the final architecture of the prior load-balancing episode.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Inherited FoodDash load balancer + 3 servers.

**Animation timeline:**

- `0.0s-2.4s`: Inherited FoodDash load balancer + 3 servers becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.9s-6.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONTINUITY HOOK`; `Load balancing is running but the work is unequal.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 2: Continuity Hook (2/2)

**Time range:** `00:00:07.150 - 00:00:13.170`

**Transcript covered:**

> front of multiple servers. Requests arrived, the load balancer distributed them, and everything seemed to be running perfectly.

**Narrative purpose:** Load balancing is running but the work is unequal.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Inherited FoodDash load balancer + 3 servers.

**Animation timeline:**

- `0.0s-2.4s`: Inherited FoodDash load balancer + 3 servers becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.0s-6.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONTINUITY HOOK`; `Load balancing is running but the work is unequal.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 3: The Dashboard Looks Strange (1/2)

**Time range:** `00:00:14.570 - 00:00:20.930`

**Transcript covered:**

> so they thought. A few weeks later, the FoodDash engineering team is reviewing their monitoring dashboards when something

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry.

**Animation timeline:**

- `0.0s-2.4s`: A 80% / B 60% / C 15% CPU asymmetry becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.4s-6.4s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 4: The Dashboard Looks Strange (2/2)

**Time range:** `00:00:21.210 - 00:00:27.870`

**Transcript covered:**

> strange catches their attention. Server A is running at nearly 80 % CPU utilization, and server B isn't far

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry.

**Animation timeline:**

- `0.0s-2.4s`: A 80% / B 60% / C 15% CPU asymmetry becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.7s-6.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 5: The Dashboard Looks Strange (cont.) (1/2)

**Time range:** `00:00:28.070 - 00:00:34.850`

**Transcript covered:**

> behind, but server C seems to be living a completely different life. While the other servers are working hard, server C is

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry - CPU bars fill asymmetrically.

**Animation timeline:**

- `0.0s-2.4s`: CPU bars fill asymmetrically becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.8s-6.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE (CONT.)`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 6: The Dashboard Looks Strange (cont.) (2/2)

**Time range:** `00:00:35.050 - 00:00:41.870`

**Transcript covered:**

> sitting at around 15 % utilization and wondering whether it accidentally showed up on its day off. The engineers are confused.

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry - CPU bars fill asymmetrically.

**Animation timeline:**

- `0.0s-2.4s`: CPU bars fill asymmetrically becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.8s-6.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE (CONT.)`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 7: The Dashboard Looks Strange (cont.) (1/2)

**Time range:** `00:00:42.850 - 00:00:48.490`

**Transcript covered:**

> They have three servers, a load balancer, and traffic is clearly being distributed. So why are

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry - A and B peak before C.

**Animation timeline:**

- `0.0s-2.4s`: A and B peak before C becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.6s-5.6s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE (CONT.)`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 8: The Dashboard Looks Strange (cont.) (2/2)

**Time range:** `00:00:48.490 - 00:00:54.470`

**Transcript covered:**

> are some servers overloaded while another is barely breaking a sweat? That's when they discover an important lesson.

**Narrative purpose:** Identical request counts can produce visibly unequal utilization.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A 80% / B 60% / C 15% CPU asymmetry - A and B peak before C.

**Animation timeline:**

- `0.0s-2.4s`: A and B peak before C becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.0s-6.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE DASHBOARD LOOKS STRANGE (CONT.)`; `Identical request counts can produce visibly unequal utilization.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 9: Same Question, Different Scale (1/2)

**Time range:** `00:00:55.290 - 00:01:02.070`

**Transcript covered:**

> a load balancer is only half the story. The other half is deciding how that load balancer actually chooses where to send traffic.

**Narrative purpose:** Routing policy is the missing half of load balancing.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: The other half: routing policy.

**Animation timeline:**

- `0.0s-2.4s`: The other half: routing policy becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.8s-6.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `SAME QUESTION, DIFFERENT SCALE`; `Routing policy is the missing half of load balancing.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 10: Same Question, Different Scale (2/2)

**Time range:** `00:01:03.550 - 00:01:10.750`

**Transcript covered:**

> about it. Every second, thousands of FoodDash requests arrive and every one of those requests reaches the load balancer first. And for every incoming

**Narrative purpose:** Routing policy is the missing half of load balancing.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: The other half: routing policy.

**Animation timeline:**

- `0.0s-2.4s`: The other half: routing policy becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.2s-7.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `SAME QUESTION, DIFFERENT SCALE`; `Routing policy is the missing half of load balancing.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 11: Many Algorithms, Different Goals

**Time range:** `00:01:11.950 - 00:01:19.930`

**Transcript covered:**

> the load balancer has to answer a surprisingly important question. Which server should handle this request? As it

**Narrative purpose:** Load-balancing policy is a family of algorithms.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Six named algorithms fan out behind the balancer.

**Animation timeline:**

- `0.0s-2.4s`: Six named algorithms fan out behind the balancer becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.0s-8.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `MANY ALGORITHMS, DIFFERENT GOALS`; `Load-balancing policy is a family of algorithms.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 12: Many Algorithms, Different Goals (cont.)

**Time range:** `00:01:20.050 - 00:01:30.350`

**Transcript covered:**

> turns out, there isn't a single correct answer. There are several ways to make that decision, and each one optimizes for a different goal. Let's start with the simplest and most common approach. Round Robin.

**Narrative purpose:** Load-balancing policy is a family of algorithms.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Six named algorithms fan out behind the balancer - Caption strip types in.

**Animation timeline:**

- `0.0s-2.4s`: Caption strip types in becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `8.3s-10.3s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `MANY ALGORITHMS, DIFFERENT GOALS (CONT.)`; `Load-balancing policy is a family of algorithms.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 13: Round Robin Begins

**Time range:** `00:01:31.770 - 00:01:38.410`

**Transcript covered:**

> So in our FoodDash example, the first request goes to A, the second goes to B, the third goes to C, and then the cycle starts all over

**Narrative purpose:** Round Robin assigns successive requests in fixed cyclic order.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A -> B -> C cycle with policy badge flip.

**Animation timeline:**

- `0.0s-2.4s`: A -> B -> C cycle with policy badge flip becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.6s-6.6s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ROUND ROBIN BEGINS`; `Round Robin assigns successive requests in fixed cyclic order.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 14: Round Robin Begins (cont.)

**Time range:** `00:01:38.650 - 00:01:46.290`

**Transcript covered:**

> again. A, B, C, A, B, C, A, B, C. It's simple, predictable,

**Narrative purpose:** Round Robin assigns successive requests in fixed cyclic order.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A -> B -> C cycle with policy badge flip - Packet routes to B.

**Animation timeline:**

- `0.0s-2.4s`: Packet routes to B becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.6s-7.6s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ROUND ROBIN BEGINS (CONT.)`; `Round Robin assigns successive requests in fixed cyclic order.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 15: Round Robin Repeats

**Time range:** `00:01:46.950 - 00:01:52.810`

**Transcript covered:**

> easy to understand. Every server gets an equal share of incoming traffic without any complicated calculations,

**Narrative purpose:** Equal request counts give equal work for similar backends.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A B C A B C history strip + attribute stamps.

**Animation timeline:**

- `0.0s-2.4s`: A B C A B C history strip + attribute stamps becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.9s-5.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ROUND ROBIN REPEATS`; `Equal request counts give equal work for similar backends.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 16: Round Robin Repeats (cont.)

**Time range:** `00:01:54.050 - 00:01:58.810`

**Transcript covered:**

> monitoring systems, or decision making. For many systems, that's actually good enough.

**Narrative purpose:** Equal request counts give equal work for similar backends.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A B C A B C history strip + attribute stamps - Attribute stamps appear.

**Animation timeline:**

- `0.0s-2.4s`: Attribute stamps appear becomes the primary motion.
- `2.4s-4.8s`: Supporting counters or route lines update quietly.
- `2.8s-4.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ROUND ROBIN REPEATS (CONT.)`; `Equal request counts give equal work for similar backends.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 17: The Hidden Assumption

**Time range:** `00:02:00.210 - 00:02:07.370`

**Transcript covered:**

> a hidden assumption. Round Robin quietly assumes every server is exactly the same. Same hardware, same CPU, same memory,

**Narrative purpose:** Round Robin assumes identical backends.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin assumes every server is the same.

**Animation timeline:**

- `0.0s-2.4s`: Round Robin assumes every server is the same becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.2s-7.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE HIDDEN ASSUMPTION`; `Round Robin assumes identical backends.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 18: The Hidden Assumption (cont.)

**Time range:** `00:02:07.949 - 00:02:13.670`

**Transcript covered:**

> and the same performance characteristics. Unfortunately, production environments have a habit of ignoring our assumptions.

**Narrative purpose:** Round Robin assumes identical backends.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin assumes every server is the same - Question glyph appears.

**Animation timeline:**

- `0.0s-2.4s`: Question glyph appears becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.7s-5.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `THE HIDDEN ASSUMPTION (CONT.)`; `Round Robin assumes identical backends.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 19: Server A Gets Upgraded

**Time range:** `00:02:15.330 - 00:02:23.110`

**Transcript covered:**

> FoodDash upgrades server A and gives it twice the computing power of the other two servers. Should all three servers

**Narrative purpose:** Real fleets are not homogeneous.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Capacity outline swaps from 1x to 2x.

**Animation timeline:**

- `0.0s-2.4s`: Capacity outline swaps from 1x to 2x becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.8s-7.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `SERVER A GETS UPGRADED`; `Real fleets are not homogeneous.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Weighted Round Robin routes in proportion to capacity.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 20: Server A Gets Upgraded (cont.)

**Time range:** `00:02:23.610 - 00:02:31.690`

**Transcript covered:**

> receive exactly the same amount of traffic? Probably not. This leads us to weighted Round Robin.

**Narrative purpose:** Real fleets are not homogeneous.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Capacity outline swaps from 1x to 2x - Question glyph settles.

**Animation timeline:**

- `0.0s-2.4s`: Question glyph settles becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.1s-8.1s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `SERVER A GETS UPGRADED (CONT.)`; `Real fleets are not homogeneous.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Weighted Round Robin routes in proportion to capacity.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 21: Weighted Round Robin In Action

**Time range:** `00:02:32.710 - 00:02:40.430`

**Transcript covered:**

> treating every server equally, we assign weights. If server A is twice as powerful, it might receive twice as many requests as server

**Narrative purpose:** Weighted Round Robin assigns requests proportional to capacity.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A, A, B, C cycle with weights A=2 B=1 C=1.

**Animation timeline:**

- `0.0s-2.4s`: A, A, B, C cycle with weights A=2 B=1 C=1 becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.7s-7.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `WEIGHTED ROUND ROBIN IN ACTION`; `Weighted Round Robin assigns requests proportional to capacity.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 22: Weighted Round Robin In Action (cont.)

**Time range:** `00:02:40.690 - 00:02:48.210`

**Transcript covered:**

> B and server C. Now the traffic pattern looks more like A, A, B, C, then A,

**Narrative purpose:** Weighted Round Robin assigns requests proportional to capacity.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A, A, B, C cycle with weights A=2 B=1 C=1 - A, A, B, C repeats.

**Animation timeline:**

- `0.0s-2.4s`: A, A, B, C repeats becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.5s-7.5s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `WEIGHTED ROUND ROBIN IN ACTION (CONT.)`; `Weighted Round Robin assigns requests proportional to capacity.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 23: Weighted Round Robin In Action (cont.)

**Time range:** `00:02:49.110 - 00:02:55.990`

**Transcript covered:**

> A, B, C. Again, the stronger server carries more of the workload while the smaller servers handle

**Narrative purpose:** Weighted Round Robin assigns requests proportional to capacity.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A, A, B, C cycle with weights A=2 B=1 C=1 - Cycle repeats.

**Animation timeline:**

- `0.0s-2.4s`: Cycle repeats becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.9s-6.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `WEIGHTED ROUND ROBIN IN ACTION (CONT.)`; `Weighted Round Robin assigns requests proportional to capacity.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Round Robin assigns requests in a fixed cyclic order.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 24: Not All Requests Are Equal (1/2)

**Time range:** `00:02:57.870 - 00:03:02.610`

**Transcript covered:**

> The result is a distribution strategy that better reflects the actual capacity of the infrastructure.

**Narrative purpose:** Equal counts can mean unequal work.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Same request count, different lifetime bars.

**Animation timeline:**

- `0.0s-2.4s`: Same request count, different lifetime bars becomes the primary motion.
- `2.4s-4.7s`: Supporting counters or route lines update quietly.
- `2.7s-4.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `NOT ALL REQUESTS ARE EQUAL`; `Equal counts can mean unequal work.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Layer-aware routing can inspect request metadata before choosing.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 25: Not All Requests Are Equal (2/2)

**Time range:** `00:03:03.030 - 00:03:08.750`

**Transcript covered:**

> Sounds great, right? Well, FoodDash soon discovers another problem. Not all requests are created equal.

**Narrative purpose:** Equal counts can mean unequal work.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Same request count, different lifetime bars.

**Animation timeline:**

- `0.0s-2.4s`: Same request count, different lifetime bars becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.7s-5.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `NOT ALL REQUESTS ARE EQUAL`; `Equal counts can mean unequal work.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Layer-aware routing can inspect request metadata before choosing.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 26: Connections Per Server

**Time range:** `00:03:09.830 - 00:03:15.450`

**Transcript covered:**

> Some requests finish almost instantly, while others take significantly longer. Two servers may receive the same number of

**Narrative purpose:** Different lifetimes lead to different connection counts.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A: 200, B: 30, C: 20 active connections.

**Animation timeline:**

- `0.0s-2.4s`: A: 200, B: 30, C: 20 active connections becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.6s-5.6s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONNECTIONS PER SERVER`; `Different lifetimes lead to different connection counts.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 27: Connections Per Server (cont.)

**Time range:** `00:03:15.590 - 00:03:22.490`

**Transcript covered:**

> requests, but end up doing very different amounts of work. Imagine server A currently has 200 active users connected,

**Narrative purpose:** Different lifetimes lead to different connection counts.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A: 200, B: 30, C: 20 active connections - B: 30 fills in.

**Animation timeline:**

- `0.0s-2.4s`: B: 30 fills in becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.9s-6.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONNECTIONS PER SERVER (CONT.)`; `Different lifetimes lead to different connection counts.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 28: Connections Per Server (cont.)

**Time range:** `00:03:22.950 - 00:03:29.410`

**Transcript covered:**

> server B has 30, server C has 20. If another request arrives, should we still blindly follow Round Robin?

**Narrative purpose:** Different lifetimes lead to different connection counts.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A: 200, B: 30, C: 20 active connections - C: 20 fills in.

**Animation timeline:**

- `0.0s-2.4s`: C: 20 fills in becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.5s-6.5s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONNECTIONS PER SERVER (CONT.)`; `Different lifetimes lead to different connection counts.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 29: Least Connections Sends The Request To C

**Time range:** `00:03:30.290 - 00:03:38.470`

**Transcript covered:**

> Probably not. Server A is already busy enough. This is where Least Connections comes in. Instead of looking at how many requests arrived previously,

**Narrative purpose:** Least Connections routes to the backend with the fewest active connections.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin -> Least Connections badge flip.

**Animation timeline:**

- `0.0s-2.4s`: Round Robin -> Least Connections badge flip becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.2s-8.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST CONNECTIONS SENDS THE REQUEST TO C`; `Least Connections routes to the backend with the fewest active connections.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 30: Least Connections Sends The Request To C (cont.)

**Time range:** `00:03:38.870 - 00:03:45.530`

**Transcript covered:**

> the load balancer looks at how many active connections each server is handling right now. The next request gets sent to the least busy server.

**Narrative purpose:** Least Connections routes to the backend with the fewest active connections.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin -> Least Connections badge flip - Packet routes to C.

**Animation timeline:**

- `0.0s-2.4s`: Packet routes to C becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.7s-6.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST CONNECTIONS SENDS THE REQUEST TO C (CONT.)`; `Least Connections routes to the backend with the fewest active connections.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 31: Least Connections Sends The Request To C (cont.) (1/2)

**Time range:** `00:03:46.530 - 00:03:52.670`

**Transcript covered:**

> If server C has 20 active connections and server A has 200 active connections, the decision

**Narrative purpose:** Least Connections routes to the backend with the fewest active connections.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin -> Least Connections badge flip - Cardin reveals.

**Animation timeline:**

- `0.0s-2.4s`: Cardin reveals becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.1s-6.1s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST CONNECTIONS SENDS THE REQUEST TO C (CONT.)`; `Least Connections routes to the backend with the fewest active connections.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 32: Least Connections Sends The Request To C (cont.) (2/2)

**Time range:** `00:03:53.010 - 00:03:58.770`

**Transcript covered:**

> becomes pretty obvious. Least Connections is simple, practical, and often works much better when

**Narrative purpose:** Least Connections routes to the backend with the fewest active connections.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Round Robin -> Least Connections badge flip - Cardin reveals.

**Animation timeline:**

- `0.0s-2.4s`: Cardin reveals becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.8s-5.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST CONNECTIONS SENDS THE REQUEST TO C (CONT.)`; `Least Connections routes to the backend with the fewest active connections.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 33: Connection Count Is Not Health

**Time range:** `00:04:00.090 - 00:04:08.270`

**Transcript covered:**

> very different lifetimes. But even this approach has a solid blind spot. Connection count doesn't always tell the

**Narrative purpose:** Same connection count does not imply same health.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Counters flatten to ~100; same health is not the same latency.

**Animation timeline:**

- `0.0s-2.4s`: Counters flatten to ~100; same health is not the same latency becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.2s-8.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `CONNECTION COUNT IS NOT HEALTH`; `Same connection count does not imply same health.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Connections chooses the backend with the fewest active connections.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 34: Latency Per Server

**Time range:** `00:04:10.130 - 00:04:13.810`

**Transcript covered:**

> Imagine three servers with roughly the same number of active connections.

**Narrative purpose:** Latency can reveal server health even when connections look fine.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A: 50 ms, B: 40 ms, C: 300 ms.

**Animation timeline:**

- `0.0s-2.4s`: A: 50 ms, B: 40 ms, C: 300 ms becomes the primary motion.
- `2.4s-3.7s`: Supporting counters or route lines update quietly.
- `1.7s-3.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LATENCY PER SERVER`; `Latency can reveal server health even when connections look fine.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 35: Latency Per Server (cont.)

**Time range:** `00:04:14.350 - 00:04:22.390`

**Transcript covered:**

> Server A responds in 50 milliseconds, server B responds in 40 milliseconds, server C responds in 300 milliseconds.

**Narrative purpose:** Latency can reveal server health even when connections look fine.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: A: 50 ms, B: 40 ms, C: 300 ms - Caption strip draws.

**Animation timeline:**

- `0.0s-2.4s`: Caption strip draws becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.0s-8.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LATENCY PER SERVER (CONT.)`; `Latency can reveal server health even when connections look fine.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 36: Least Response Time Sends The Request To B

**Time range:** `00:04:24.190 - 00:04:32.150`

**Transcript covered:**

> So clearly something is wrong with server C. Maybe it's overloaded, maybe it's struggling with hardware issues, maybe one of its dependencies is responding slowly.

**Narrative purpose:** Least Response Time routes to the fastest backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Least RT -> B at 40 ms.

**Animation timeline:**

- `0.0s-2.4s`: Least RT -> B at 40 ms becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.0s-8.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST RESPONSE TIME SENDS THE REQUEST TO B`; `Least Response Time routes to the fastest backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 37: Least Response Time Sends The Request To B (cont.)

**Time range:** `00:04:33.050 - 00:04:41.230`

**Transcript covered:**

> Whatever the cause, users are feeling the impact. This is where Least Response Time comes into play. Instead of focusing on request

**Narrative purpose:** Least Response Time routes to the fastest backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Least RT -> B at 40 ms - Packet routes to B.

**Animation timeline:**

- `0.0s-2.4s`: Packet routes to B becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.2s-8.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST RESPONSE TIME SENDS THE REQUEST TO B (CONT.)`; `Least Response Time routes to the fastest backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 38: Least Response Time Sends The Request To B (cont.) (1/2)

**Time range:** `00:04:41.730 - 00:04:47.390`

**Transcript covered:**

> counts or connection counts, the load balancer looks at actual performance and favors the servers

**Narrative purpose:** Least Response Time routes to the fastest backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Least RT -> B at 40 ms - Cardin reveals.

**Animation timeline:**

- `0.0s-2.4s`: Cardin reveals becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.7s-5.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST RESPONSE TIME SENDS THE REQUEST TO B (CONT.)`; `Least Response Time routes to the fastest backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 39: Least Response Time Sends The Request To B (cont.) (2/2)

**Time range:** `00:04:47.850 - 00:04:53.610`

**Transcript covered:**

> responding the fastest. In many modern systems, response time is one of the strongest indicators

**Narrative purpose:** Least Response Time routes to the fastest backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Least RT -> B at 40 ms - Cardin reveals.

**Animation timeline:**

- `0.0s-2.4s`: Cardin reveals becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `3.8s-5.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LEAST RESPONSE TIME SENDS THE REQUEST TO B (CONT.)`; `Least Response Time routes to the fastest backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 40: Users Feel The Latency

**Time range:** `00:04:54.370 - 00:05:00.910`

**Transcript covered:**

> health. After all, users don't care how many connections a server has. They care how quickly they get their food menu loaded.

**Narrative purpose:** Latency is a user-visible metric.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Phone shows loading; menu items stagger in.

**Animation timeline:**

- `0.0s-2.4s`: Phone shows loading; menu items stagger in becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `4.5s-6.5s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `USERS FEEL THE LATENCY`; `Latency is a user-visible metric.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Least Response Time favors the fastest observed backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 41: Random Selection Sounds Ridiculous

**Time range:** `00:05:02.710 - 00:05:12.390`

**Transcript covered:**

> look at something that sounds almost ridiculous. Random selection. Imagine the load balancer simply picks a server at random. No tracking, no calculations,

**Narrative purpose:** Random selection approaches equal distribution with almost no overhead.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 9 packets emerge from a bag, load equalizes.

**Animation timeline:**

- `0.0s-2.4s`: 9 packets emerge from a bag, load equalizes becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `7.7s-9.7s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `RANDOM SELECTION SOUNDS RIDICULOUS`; `Random selection approaches equal distribution with almost no overhead.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Random selection spreads requests with almost no policy overhead.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 42: Random Selection Sounds Ridiculous (cont.)

**Time range:** `00:05:12.650 - 00:05:20.910`

**Transcript covered:**

> and no monitoring. Just pure randomness. At first, this sounds like something an engineer would suggest five minutes before being politely removed from the meeting.

**Narrative purpose:** Random selection approaches equal distribution with almost no overhead.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 9 packets emerge from a bag, load equalizes - First 3 tokens route.

**Animation timeline:**

- `0.0s-2.4s`: First 3 tokens route becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.3s-8.3s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `RANDOM SELECTION SOUNDS RIDICULOUS (CONT.)`; `Random selection approaches equal distribution with almost no overhead.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Random selection spreads requests with almost no policy overhead.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 43: Random Selection Sounds Ridiculous (cont.)

**Time range:** `00:05:21.930 - 00:05:30.270`

**Transcript covered:**

> But surprisingly, random load balancing performs much better than most people expect. With enough traffic, randomness naturally spreads

**Narrative purpose:** Random selection approaches equal distribution with almost no overhead.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 9 packets emerge from a bag, load equalizes - Next 3 tokens route.

**Animation timeline:**

- `0.0s-2.4s`: Next 3 tokens route becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.3s-8.3s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `RANDOM SELECTION SOUNDS RIDICULOUS (CONT.)`; `Random selection approaches equal distribution with almost no overhead.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Random selection spreads requests with almost no policy overhead.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 44: Random Selection Sounds Ridiculous (cont.)

**Time range:** `00:05:30.730 - 00:05:39.910`

**Transcript covered:**

> requests across servers, and unlike more sophisticated algorithms, it introduces almost no overhead. Sometimes the solution wins.

**Narrative purpose:** Random selection approaches equal distribution with almost no overhead.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 9 packets emerge from a bag, load equalizes - Final 3 tokens equalize.

**Animation timeline:**

- `0.0s-2.4s`: Final 3 tokens equalize becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `7.2s-9.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `RANDOM SELECTION SOUNDS RIDICULOUS (CONT.)`; `Random selection approaches equal distribution with almost no overhead.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Random selection spreads requests with almost no policy overhead.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 45: Hash-Based Routing Same User Same Server

**Time range:** `00:05:41.570 - 00:05:50.110`

**Transcript covered:**

> Finally, let's look at one of the most interesting approaches. Hash-based routing. Imagine a food-customer logs in, browses restaurants,

**Narrative purpose:** Hash-Based routing maps a stable key to a backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: USER #4271 lands on B three times; USER #8810 on A.

**Animation timeline:**

- `0.0s-2.4s`: USER #4271 lands on B three times; USER #8810 on A becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.5s-8.5s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `HASH-BASED ROUTING SAME USER SAME SERVER`; `Hash-Based routing maps a stable key to a backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Hash-Based Routing maps a stable key to a consistent backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 46: Hash-Based Routing Same User Same Server (cont.)

**Time range:** `00:05:50.950 - 00:05:59.530`

**Transcript covered:**

> adds items to a cart, checks order history, and places an order. Wouldn't it be useful if all of those requests consistently reached the same server? Hash-based routing

**Narrative purpose:** Hash-Based routing maps a stable key to a backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: USER #4271 lands on B three times; USER #8810 on A - User #4271 sticky landing.

**Animation timeline:**

- `0.0s-2.4s`: User #4271 sticky landing becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.6s-8.6s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `HASH-BASED ROUTING SAME USER SAME SERVER (CONT.)`; `Hash-Based routing maps a stable key to a backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Hash-Based Routing maps a stable key to a consistent backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 47: Hash-Based Routing Same User Same Server (cont.)

**Time range:** `00:05:59.530 - 00:06:08.450`

**Transcript covered:**

> routing makes that possible. The load balancer takes something unique, such as a user ID, session ID, or IP address, and uses it to determine which

**Narrative purpose:** Hash-Based routing maps a stable key to a backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: USER #4271 lands on B three times; USER #8810 on A - User #8810 lands on A.

**Animation timeline:**

- `0.0s-2.4s`: User #8810 lands on A becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.9s-8.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `HASH-BASED ROUTING SAME USER SAME SERVER (CONT.)`; `Hash-Based routing maps a stable key to a backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Hash-Based Routing maps a stable key to a consistent backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 48: Hash-Based Routing Same User Same Server (cont.)

**Time range:** `00:06:08.750 - 00:06:19.510`

**Transcript covered:**

> server should handle the request. The same user consistently lands on the same server. This can improve caching efficiency, reduce repeated work, and create a more predictable system overall.

**Narrative purpose:** Hash-Based routing maps a stable key to a backend.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: USER #4271 lands on B three times; USER #8810 on A - Cardin reveals.

**Animation timeline:**

- `0.0s-2.4s`: Cardin reveals becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `8.8s-10.8s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `HASH-BASED ROUTING SAME USER SAME SERVER (CONT.)`; `Hash-Based routing maps a stable key to a backend.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Hash-Based Routing maps a stable key to a consistent backend.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 49: Each Algorithm Optimizes For Something Different

**Time range:** `00:06:21.030 - 00:06:28.170`

**Transcript covered:**

> So, which algorithm is best? That's actually the wrong question. Every algorithm optimizes for something different.

**Narrative purpose:** Each algorithm optimizes for a specific signal.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 6-row matrix lights up cell-by-cell.

**Animation timeline:**

- `0.0s-2.4s`: 6-row matrix lights up cell-by-cell becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.1s-7.1s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `EACH ALGORITHM OPTIMIZES FOR SOMETHING DIFFERENT`; `Each algorithm optimizes for a specific signal.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 50: Each Algorithm Optimizes For Something Different (cont.)

**Time range:** `00:06:28.970 - 00:06:36.170`

**Transcript covered:**

> Round-Robin optimizes for simplicity. Weighted Round-Robin optimizes for unequal hardware. Least Connections optimizes for workload distribution.

**Narrative purpose:** Each algorithm optimizes for a specific signal.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 6-row matrix lights up cell-by-cell - Cells light up to round robin.

**Animation timeline:**

- `0.0s-2.4s`: Cells light up to round robin becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.2s-7.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `EACH ALGORITHM OPTIMIZES FOR SOMETHING DIFFERENT (CONT.)`; `Each algorithm optimizes for a specific signal.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 51: Each Algorithm Optimizes For Something Different (cont.)

**Time range:** `00:06:37.030 - 00:06:44.090`

**Transcript covered:**

> Least Response Time optimizes for performance. Random optimizes for low overhead. Hash-based routing optimizes for consistency.

**Narrative purpose:** Each algorithm optimizes for a specific signal.

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: 6-row matrix lights up cell-by-cell - Cells light up to consistency.

**Animation timeline:**

- `0.0s-2.4s`: Cells light up to consistency becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.1s-7.1s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `EACH ALGORITHM OPTIMIZES FOR SOMETHING DIFFERENT (CONT.)`; `Each algorithm optimizes for a specific signal.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Routing policy decides which backend receives the request.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 52: Looking Inside The Request

**Time range:** `00:06:45.370 - 00:06:53.390`

**Transcript covered:**

> The best choice depends entirely on the system you're building, and that's one of the most important lessons in engineering. There are very few universal solutions. There are only trade-offs.

**Narrative purpose:** The next question: should the balancer read the request itself?

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Request envelope opens to URL, headers, cookies.

**Animation timeline:**

- `0.0s-2.4s`: Request envelope opens to URL, headers, cookies becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `6.0s-8.0s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LOOKING INSIDE THE REQUEST`; `The next question: should the balancer read the request itself?`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Layer-aware routing can inspect request metadata before choosing.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 53: Looking Inside The Request (cont.)

**Time range:** `00:06:54.510 - 00:07:04.370`

**Transcript covered:**

> But now the food-engineers have a new question. So far, the load balancer has been making decisions based on servers, traffic levels, and performance metrics. What if the load

**Narrative purpose:** The next question: should the balancer read the request itself?

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Request envelope opens to URL, headers, cookies - Headers reveal.

**Animation timeline:**

- `0.0s-2.4s`: Headers reveal becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `7.9s-9.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LOOKING INSIDE THE REQUEST (CONT.)`; `The next question: should the balancer read the request itself?`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Layer-aware routing can inspect request metadata before choosing.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 54: Looking Inside The Request (cont.)

**Time range:** `00:07:04.570 - 00:07:14.470`

**Transcript covered:**

> balancer could look beyond traffic metrics and inspect the request itself? By analyzing URLs, routes, headers, and cookies, it could make far more intelligent routing decisions.

**Narrative purpose:** The next question: should the balancer read the request itself?

**Connection to previous scene:** Continues the same FoodDash load-balancer diagram and changes only the active policy evidence.

**Initial composition:** Matte black doodle board. Users and api.fooddash.com remain on the left, the load balancer stays center-left, and Server A/B/C stay fixed on the right. The active visual evidence for this beat is: Request envelope opens to URL, headers, cookies - Cookies reveal.

**Animation timeline:**

- `0.0s-2.4s`: Cookies reveal becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `7.9s-9.9s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `LOOKING INSIDE THE REQUEST (CONT.)`; `The next question: should the balancer read the request itself?`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Layer-aware routing can inspect request metadata before choosing.

**Continuity notes:** Server A stays top, Server B middle, Server C bottom; api.fooddash.com still targets the load balancer; the bottom caption reserve remains clear.

**Transition to next scene:** Carry the same mounted architecture into the next beat, preserving policy and metric state where relevant.

**Remotion implementation notes:** Drive motion with frame-based interpolation, SVG path progress, and deterministic counters. Use inline SVG/React attributes; no CSS transitions and no new VisualKind beyond `lba-screen`.

---

## Scene 55: Engineering Systems Closing

**Time range:** `00:07:15.730 - 00:07:22.950`

**Transcript covered:**

> how smart should a load balancer really be? And how much should it understand before routing traffic? That is exactly what we are going to explore in

**Narrative purpose:** Keep building great systems.

**Connection to previous scene:** The request-inspection bridge has already begun handing the viewer into the established outro frame.

**Initial composition:** Matte black doodle-board closing frame. The architecture is reduced to a faint outline on the right; left-half text carries the closing copy and the subscribe/like controls stay above the caption reserve.

**Animation timeline:**

- `0.0s-2.4s`: Thanks for watching; bridge to Layer 4 vs Layer 7 becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.2s-7.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ENGINEERING SYSTEMS CLOSING`; `Keep building great systems.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Closing and continuity only; the next technical topic is Layer 4 vs Layer 7 routing.

**Continuity notes:** Use the established black-theme outro and suppress captions if the renderer convention requires it.

**Transition to next scene:** Hold the completed closing frame.

**Remotion implementation notes:** Reuse the existing `closing` visual kind; no new VisualKind, no extra architecture animation, and no CSS transitions.

---

## Scene 56: Engineering Systems Closing (cont.)

**Time range:** `00:07:23.370 - 00:07:30.550`

**Transcript covered:**

> the next episode when we dive into Layer 4 versus Layer 7 load balancing. We'll pick it up from there in the next episode.

**Narrative purpose:** Keep building great systems.

**Connection to previous scene:** The closing frame is already assembled; this beat holds the outro while the final next-episode sentence finishes.

**Initial composition:** Completed black-theme closing board: `THANKS FOR WATCHING`, Engineering Systems subscription copy, subscribe pill, like circle, and open breathing room on the right.

**Animation timeline:**

- `0.0s-2.4s`: Bridge card stays becomes the primary motion.
- `2.4s-5.4s`: Supporting counters or route lines update quietly.
- `5.2s-7.2s`: Short takeaway text reveals and holds above the caption reserve.

**On-screen text:** `ENGINEERING SYSTEMS CLOSING (CONT.)`; `Keep building great systems.`.

**Visual assets and components:** ArchitectureStage, LoadBalancerPolicyNode, AlgorithmServerPool, RoutingPacket, PolicyBadge, MetricCounterStack, lucide GitBranch/Server/Activity/Clock as appropriate.

**Technical concept represented:** Closing and continuity only; the next technical topic is Layer 4 vs Layer 7 routing.

**Continuity notes:** Use the established black-theme outro and suppress captions if the renderer convention requires it.

**Transition to next scene:** Hold the completed closing frame.

**Remotion implementation notes:** Reuse the existing `closing` visual kind; no new VisualKind, no extra architecture animation, and no CSS transitions.

---

## Closing

Use the existing `closing` visual kind and the black-theme outro pattern from `VISUAL_GUIDE.md`: content anchored to the left half, subscribe pill and like circle, right half open, monochrome only, and captions suppressed if the renderer convention requires it.

