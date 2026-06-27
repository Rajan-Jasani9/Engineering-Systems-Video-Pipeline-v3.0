# Load Balancing — Video Visual Context

## 1. Episode Summary

This episode continues the FoodDash availability story by showing that redundant compute is not useful until incoming traffic can be directed to it. FoodDash first suffers a success-driven overload, briefly tries vertical scaling, then pivots to three application servers. That creates a routing problem, which introduces the load balancer as the intelligent front door. The episode demonstrates even distribution with a 300-request example, explains horizontal scaling and round robin, combines load balancing with health checks for automatic failure avoidance, then exposes the load balancer itself as a new single point of failure and resolves it with redundant load balancers.

The teaching goal is causal: viewers should see why load balancing becomes necessary, how it converts a server fleet into usable horizontal capacity, how routing policy affects availability, and why the routing layer must itself be highly available.

Planning source: `load balancer v1 (mp3cut.net).srt`, 00:00.000–07:24.790. The TurboScribe watermark text is transcription metadata and is not treated as narration.

## 2. Narrative Structure

1. **Continuity hook — reliability meets success (00:00–00:24):** Previous availability patterns have made FoodDash resilient; growth introduces a different failure mode.
2. **Success disaster (00:25–01:06):** Demand rises, a single app server saturates, latency grows, and requests fail.
3. **Vertical scaling and its wall (01:06–01:43):** A larger server buys temporary relief but cannot scale forever.
4. **Horizontal pivot and routing dilemma (01:43–02:46):** Three servers create capacity but no decision-maker for incoming traffic.
5. **Load balancer as intelligent front door (02:46–03:29):** The routing component appears and distributes a 300-request spike evenly.
6. **Horizontal scaling principle (03:29–03:48):** More machines are useful only when traffic can reliably reach them.
7. **Round-robin intuition (03:49–04:26):** A simple A→B→C cycle demonstrates routing policy.
8. **Health-aware routing and live failure (04:27–05:31):** Health checks identify server B's crash; the balancer removes B and reroutes traffic to A and C without user impact.
9. **The load balancer SPOF (05:32–06:34):** Concentrating traffic through one front door creates a new vulnerability; a synchronized backup resolves it.
10. **Architecture evolution recap (06:35–07:03):** The system transforms from one overloaded server to a redundant, health-aware routing tier.
11. **Advanced-policy bridge and outro (07:04–07:24):** Unequal capacity, unequal work, and unequal latency motivate the next episode.

## 3. Global Visual Story

The video is built around one persistent FoodDash architecture rather than a sequence of unrelated boards.

- Begin with the resilient FoodDash architecture inherited from earlier episodes, but keep the application tier singular: users → one application server → primary database with a replicated standby. Health checks and failover operate around the data tier. Do not show multiple application servers or application traffic rerouting in the recap.
- Keep that same single application server on screen as the episode moves from the recap into growth pressure; no topology reset or reduction is needed.
- Keep the same single server on screen while its CPU, memory, queue, and latency worsen. Vertical scaling enlarges this exact node; the node is not replaced.
- At the physical-limit beat, the enlarged node stops growing against a drawn ceiling. It then becomes the middle node, Server B, while new Server A and Server C nodes appear above and below it.
- Preserve those identities for the rest of the episode. Server B must remain the middle server because it fails later.
- The unresolved customer request pauses at the left-side entry point. The load balancer is inserted between users and the server pool, becoming the stable central object for the rest of the film.
- Request packets, route lines, counters, and per-server load meters demonstrate the routing behavior. Before the load balancer, capacity remains idle and the incoming queue stays unsplit. For the 300-request counterexample, `api.fooddash.com` visibly still targets legacy Server B; after the endpoint is moved to the load balancer, the 300-request surge transforms into three synchronized 100-request counters.
- Round robin reuses the same architecture. A selector ring and request-number badge cycle A→B→C without rebuilding the board.
- Health checks add a second, quieter signal layer from the load balancer to the servers. When B fails, its route is withdrawn and future packets move only to A and C.
- The camera then reframes the load balancer as the center of risk. Failing it freezes all incoming traffic while the healthy server pool remains visibly ready.
- The single load balancer separates into Primary LB and Backup LB while keeping the same front-door position. The backup promotion restores the same traffic routes.
- The recap uses a continuous architecture morph through five states: single server → three servers → load balancer → health-aware routing → redundant balancers.
- The final advanced-policy questions annotate the stable server pool with unequal CPU capacity, queue depth, and latency, visually setting up the next explainer.

## 4. Visual Continuity Map

| Object | Stable identity and placement | State rules |
| --- | --- | --- |
| FoodDash customer/mobile app | Left edge, vertically centered; same phone and order button throughout | Order packets always originate here; user-facing success/failure is shown on the phone, not only in infrastructure labels |
| Internet/front-door boundary | Vertical dashed boundary immediately right of the phone | Incoming packets cross this boundary before any infrastructure decision |
| Load balancer | Center-left between users and servers; `GitBranch`/routing icon; white-outlined black card, inverted only when active | Label remains `LOAD BALANCER`; later splits into `PRIMARY LB` and `BACKUP LB` without changing routing-tier location |
| Opening application server | Center-right, between users and the database tier | Remains the only application server through vertical scaling; becomes middle Server B only when horizontal scaling is introduced |
| Primary database | Far right, upper data-tier slot | Receives application state traffic; earlier availability recap shows it protected by a replicated standby |
| Standby database | Far right, lower data-tier slot | Synchronized and ready; may be promoted during the recap, but never implies application-server redundancy |
| Server A | Top of server pool | Healthy throughout; later annotated as higher-capacity in the advanced-policy bridge |
| Server B | Middle of server pool | Healthy until 04:51; crashes from a bug; health indicator goes dark; route is withdrawn; stays visible so failure avoidance is legible |
| Server C | Bottom of server pool | Healthy throughout; later shown with deep queue/complex query |
| Single server precursor | Occupies the future middle server-pool slot | Enlarges during vertical scaling, then becomes Server B while A and C are added above and below |
| Request packet | Small white outlined square with request number; steady linear path motion | No decorative packets on inactive paths; failed packets stop and invert/cross, successful packets continue to the selected server |
| Health probe | Small hollow circle moving from load balancer to a server and returning | Slower and visually lighter than request packets; B's missed return creates the failure decision |
| Active route | Solid white SVG connector | Inactive alternatives are thin translucent dashed lines; withdrawn routes erase toward the load balancer |
| Healthy state | White status dot plus `HEALTHY` label | Never use green; active/inverted state supplies emphasis |
| Failed state | Dark node, broken outline, diagonal strike, `FAILED` label | Never rely on color; behavior changes must accompany the label |
| Capacity block | Fixed outlined `1× CAPACITY` block attached to each server | Represents what the server can handle; never animates like utilization. Three servers sum to `TOTAL AVAILABLE CAPACITY: 3×` |
| Load meter | Animated filled meter attached to each server | Represents work currently being processed; remains at zero before a router assigns traffic and changes with distribution/failure |
| Queue meter | Stacked request tokens beside the active destination | Represents work waiting; never substitutes for capacity or active load |
| Architecture coordinates | Users left; routing tier center-left; Server A/B/C right in a vertical pool | Do not swap server positions or arrow direction; requests always flow left-to-right |
| Caption reserve | Bottom 120–140 px | Main visuals and labels never enter this area; existing karaoke captions remain a separate layer during implementation |

All visuals follow the current series guide: matte black doodle-board, white/off-white cards, translucent gray support lines, uppercase Inter typography, lucide icons, maximum 8 px radii, and no gradients or color accents.

## 5. Visual Motifs

- **Pressure build:** request density, queue height, CPU/memory gauges, and latency counter rise together.
- **Architecture morph:** a node enlarges, duplicates, gains a router, gains health intelligence, then gains routing redundancy.
- **Decision pause:** a numbered request stops at the front door while possible paths appear.
- **Active-path focus:** only the route currently carrying traffic is solid and animated.
- **Counter split:** one `300` counter divides into `100 / 100 / 100` and locks to the three server meters.
- **Endpoint retargeting:** `api.fooddash.com` points first to legacy Server B, then to the load balancer, explaining why traffic distribution changes.
- **Selector cycle:** a compact ring on the load balancer advances A→B→C with each request.
- **Health whisper:** low-opacity probe/return pulses, distinct from request traffic.
- **Route withdrawal:** a failed server's path retracts instead of merely turning into a warning label.
- **Healthy-but-unreachable paradox:** server status remains healthy while the failed load balancer blocks all traffic.
- **Evolution rail:** used only in the recap, not on every scene; five compact architecture states accumulate left-to-right.
- **Strategic stillness:** request packet pauses before routing is introduced and traffic freezes when the load balancer fails.

## 6. Scene Rhythm Plan

- **00:00–00:24:** compact 5–9 second continuity beats; architecture callbacks appear as highlights rather than a full recap lecture.
- **00:25–01:06:** fast, escalating demand motion. Internal meter changes prevent the saturation board from becoming static.
- **01:06–01:43:** slower comparison between temporary vertical relief and the physical ceiling; use a deliberate hold at the wall.
- **01:43–02:46:** progressive topology transformation followed by a short pause on the unresolved request. The checkout-lane analogy lasts only one beat and maps directly back to A/B/C.
- **02:46–03:48:** continuous architecture explanation. The load balancer arrives once and stays mounted; numeric request distribution carries the rhythm.
- **03:49–04:26:** crisp, metronomic request cycling aligned to A, B, C narration.
- **04:27–05:31:** slower health-check setup, then a tightly synchronized failure sequence: crash → missed probe → route withdrawal → reroute → successful user response.
- **05:32–06:34:** reduce motion and increase contrast for the SPOF reveal. Freeze healthy capacity, then restore movement through backup promotion.
- **06:35–07:03:** fast morph recap with one architecture state per narration sentence.
- **07:04–07:24:** three short server-specific policy questions, a compact `EQUAL IS NOT ALWAYS FAIR` takeaway, then the established black-theme closing.

No scene should remain behaviorally unchanged for more than 8 seconds; no planned scene exceeds 12 seconds without a meaningful internal state transition.

### Motion budget

Every scene gets one primary animation, one quiet supporting animation, and one short text reveal. Timeline bullets describe phases of those motions, not separate competing entrances. When queue, CPU, memory, and latency change together, the queue or request path is the primary animation; the other metrics update quietly without dramatic reveals. Camera movement is used only when it replaces a cut or establishes a new focus, never as an additional decorative beat.

## 7. Future-Awareness Notes

- Introduce and label Server B in the middle at 01:57 so its 04:51 failure is spatially familiar.
- Do not show multiple application servers before 01:43; earlier redundancy, health checks, and failover belong to the database/recovery path.
- Before the load balancer appears, capacity is `3×` but routed load remains `0`; the request queue must stay unsplit.
- Keep capacity, active load, and queue as three visually distinct metrics throughout.
- Keep A/B/C load meters visible from the 300-request example onward; they become the evidence for even distribution, failure redistribution, and unequal-work questions.
- Do not imply round robin is the only routing algorithm when the load balancer first appears. Show a small unlabeled selector slot that is named only when round robin begins.
- The first generic distribution example uses a non-cyclic order (`#001 → B`, `#002 → A`, `#003 → C`) so the later A→B→C round-robin reveal remains new.
- The no-balancer 300-request example must show the legacy public endpoint targeting Server B; traffic never bypasses a router without an explained destination.
- Health-check connectors should be visually distinct from traffic connectors before the failure scene; otherwise viewers may confuse monitoring with user requests.
- Preserve a visible detection delay: Server B crashes, a scheduled probe receives no reply, the timeout completes, B becomes unhealthy, and only then is B removed from rotation.
- The single load balancer must look singular and essential well before the SPOF reveal, but avoid warning styling until 05:39 so the reveal is earned.
- The backup load balancer should be foreshadowed only as empty routing-tier space; do not reveal it before redundancy is narrated.
- Use the same architecture geometry in the recap and final advanced-policy teaser so the episode ends on the system it built.
- The final unequal-capacity/queue/latency annotations should not appear during round robin; revealing them early would undercut the later question.
- Use `FoodDash` consistently on screen even where the source transcription says `Foodash` or `FooDash`.

## Reference Quality Audit and Higher-Bar Requirements

The Famous Nines and Series vs Parallel videos provide the baseline: clear monochrome diagrams, stable component identities, progressive numerical explanations, short beats, and reusable architecture primitives. The load-balancing screenplay keeps those strengths and raises the bar by requiring:

- one continuous FoodDash topology across most of the episode;
- visible cause-and-effect instead of repeated static teaching cards;
- animation synchronized to exact narrated events and numbers;
- fewer repeated header/note/step-rail compositions;
- traffic density, queue depth, latency, and failure behavior that agree with each other;
- user outcome shown alongside infrastructure outcome;
- a strict monochrome palette matching the current visual guide;
- purposeful camera reframing and topology morphs instead of scene resets;
- a clean caption-safe lower zone and minimal on-screen text.
