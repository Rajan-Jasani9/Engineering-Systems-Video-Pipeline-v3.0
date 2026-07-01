# Multi-AZ Architecture - Video Visual Context

Planning source: user-provided script for the next Engineering Systems episode, "Multi AZ Architecture".

This file captures visual decisions locked during planning discussion. Timing and exact beat boundaries will be added after the audio and word-level transcript are available.

## Global Implementation Direction

- Build the main architecture diagrams with React-driven HTML/CSS/JS primitives first.
- Prefer positioned HTML nodes, inline styles, CSS transforms, opacity, scale, and measured connector elements over raw SVG-heavy scene construction.
- Use SVG only where it is the simplest fit for a connector, mask, or tiny technical detail; the diagram structure should still feel like mounted UI objects changing state.
- Introduce architecture diagrams with a smooth build sequence: nodes fade or softly pop in, connector lines build outward, then request packets start flowing after the structure is readable.
- Preserve the existing Engineering Systems visual language: matte black board, monochrome cards, uppercase Inter, 8px or smaller radii, orthogonal paths, and caption-safe lower space.

## Locked Section 1 - Opening Hook: Same Servers, Same Failure Boundary

Narration covered:

> FoodDash has three application servers. It has a load balancer distributing traffic between them. And if any individual server fails, the other two can continue handling requests. So FoodDash is highly available now. Right? Not necessarily. Because all three servers might be sitting inside the same building. And if that entire location goes offline, the load balancer may suddenly have nowhere left to send traffic. So how do large systems survive the failure of an entire data-center location? That is where Multi-AZ architecture comes in.

### Visual Composition

- Begin from an empty matte board, not from a fully formed static diagram.
- Fade in `Users / api.fooddash.com` on the left.
- Soft-pop the load balancer into the center-left.
- Soft-pop `Server A`, `Server B`, and `Server C` into a fixed vertical stack on the right.
- Build orthogonal connector lines outward: users to load balancer, then load balancer to each server.
- Start request packet motion only after the architecture is fully introduced.
- Keep the diagram strict monochrome with no warning color accents.

### Animation Plan

1. The architecture assembles smoothly: nodes fade/soft-pop, then connector lines build out.
2. Request packets flow one active path at a time from the load balancer to Server A, Server B, and Server C.
3. When the narration mentions an individual server failure, Server A dims/strikes and its route retracts.
4. Traffic continues to Server B and Server C, proving server-level redundancy.
5. On the "Right?" beat, freeze the diagram briefly so the architecture looks solved.
6. On the "same building" reveal, subtly draw a dotted square around Server A, Server B, and Server C.
7. Label the dotted boundary `Availability Zone A` or `AZ-1`, with `Mumbai Region` reserved as a larger parent label when region context is introduced.
8. When the whole location goes offline, the dotted AZ boundary becomes the failure boundary: the box dims, all three servers become unreachable together, and all backend routes retract.
9. The load balancer remains visible and capable, but has no healthy backend path left.
10. End the section on the teaching idea: three servers protect against one server crash, but not against a shared Availability Zone failure.

### Continuity Rules

- Reuse the previous FoodDash topology language: users, `api.fooddash.com`, load balancer, and Server A/B/C.
- Server A/B/C identities stay fixed throughout this video.
- The dotted AZ box is introduced subtly; it should feel like revealing a hidden physical boundary, not adding a new service.
- Avoid the label `AZ Region - 1` because region and Availability Zone are different cloud concepts.
- Preferred labels are `Availability Zone A`, `AZ-1`, and later `Mumbai Region` as the parent container.
- Failure is shown behaviorally through route withdrawal and unreachable servers, not only through warning text.

## Locked Section 2 - Welcome And Lesson Setup

Narration covered:

> Welcome back to Engineering Systems, where we explore how real-world software systems become scalable, reliable, and resilient. Today, we are going to understand what an Availability Zone is, why placing multiple servers behind a load balancer may still not be enough, and how Multi-AZ architecture helps a system survive location-level failures. Before we redesign FoodDash, let us first understand an important cloud concept.

### Visual Composition

- Continue from the frozen failed Single-AZ FoodDash architecture instead of cutting to an unrelated title card.
- Fade the failed architecture down into a faint background ghost so the hook remains visible but no longer competes with the welcome.
- Soft-pop a centered title card over the ghosted diagram:
  - `Engineering Systems`
  - `Multi-AZ Architecture`
  - `Surviving location-level failures`
- Reveal three agenda cards left to right:
  - `What is an Availability Zone?`
  - `Why three servers may still fail together`
  - `How Multi-AZ keeps FoodDash running`
- On "Before we redesign FoodDash", shrink the FoodDash failure diagram into a small left-side reference and open a clean cloud-concept board on the right.

### Animation Plan

1. The failed Single-AZ architecture dims and slightly scales back, becoming a contextual ghost.
2. The title card fades and softly pops into place with no hero-image treatment.
3. The three agenda cards appear in sequence, connected by thin HTML/CSS line elements.
4. The agenda cards hold briefly while the spoken setup names the lesson goals.
5. The title and agenda gently fade down; the FoodDash diagram compresses into a small reference panel.
6. A new empty cloud-concept board builds on the right, ready for the region and Availability Zone explanation.

### Continuity Rules

- This section should feel like a pause on the unresolved FoodDash failure, not a generic channel intro.
- Keep the failed AZ boundary faintly visible during the welcome to reinforce the question the episode is answering.
- Do not introduce new infrastructure yet; this beat only frames the lesson and prepares the region/AZ concept board.
- Use the same soft-pop and line-build motion language established in Section 1.

## Locked Section 3 - Cloud Regions And Availability Zones

Narration covered:

> Cloud providers divide their infrastructure into geographical areas known as regions. For example, a cloud provider might operate regions in Mumbai, Singapore, and Northern Virginia. Each region is then divided into multiple isolated infrastructure locations called Availability Zones. An Availability Zone, usually shortened to AZ, has independent infrastructure such as power, networking, and cooling. Depending on the cloud provider, one Availability Zone may consist of one or more physically separate data centers. The important idea is isolation.

### Visual Composition

- Keep a small ghosted FoodDash Single-AZ failure reference on the left so the concept lesson remains tied to the previous problem.
- Build the main board as `Cloud Provider Infrastructure`.
- Fade/soft-pop three large region cards:
  - `Mumbai Region`
  - `Singapore Region`
  - `Northern Virginia Region`
- Focus into `Mumbai Region`; the Mumbai card expands into a larger parent container.
- Inside the Mumbai parent container, draw three separated dotted AZ boxes:
  - `Availability Zone A`
  - `Availability Zone B`
  - `Availability Zone C`
- Each AZ can show compact infrastructure badges: `POWER`, `NETWORK`, and `COOLING`.
- For the data-center nuance, show one AZ containing one mini data-center block, then morph it into two mini blocks inside the same AZ boundary.

### Animation Plan

1. The cloud provider board fades in beside the small FoodDash failure reference.
2. Region cards soft-pop one by one as Mumbai, Singapore, and Northern Virginia are named.
3. The camera/focus smoothly shifts into `Mumbai Region`.
4. `Mumbai Region` expands into a parent container rather than being replaced by a new diagram.
5. AZ A/B/C dotted boxes draw inside the region with clear spacing between them.
6. `POWER`, `NETWORK`, and `COOLING` badges appear inside each AZ as independent infrastructure signals.
7. The data-center blocks animate inside one AZ to clarify that an AZ may contain one or more physically separate data centers.
8. On "The important idea is isolation", subtle divider/bulkhead lines appear between AZs and the word `ISOLATION` becomes the active top note.

### Continuity Rules

- Region is always the larger geographic container.
- Availability Zone is always an isolated infrastructure location inside a region.
- Data center is shown as a physical facility inside an AZ; do not imply that one AZ always equals one data center.
- Avoid a complex geographic SVG map. Use clear HTML/CSS cards and containers so the hierarchy is readable.
- Keep all styling monochrome and consistent with the existing Engineering Systems board language.

## Locked Section 4 - Isolation Principle Back To FoodDash

Narration covered:

> A failure inside one Availability Zone should be less likely to bring down another Availability Zone in the same region. Now, let us return to the FoodDash architecture from our previous episodes. FoodDash receives thousands of incoming requests. All of these requests first arrive at a load balancer. The load balancer then distributes those requests between three application servers. Server A. Server B. And Server C. We also explored how different load-balancing algorithms choose between these servers, and how Layer 4 and Layer 7 load balancers make routing decisions at different layers of the network.

### Visual Composition

- Begin on the `Mumbai Region` concept board from Section 3 with AZ A/B/C visible.
- Demonstrate isolation by failing only AZ A while AZ B and AZ C remain stable.
- Use a top note: `AZ FAILURES SHOULD BE ISOLATED`.
- Compress the concept board into a small reference badge: `Mumbai Region: AZ A / AZ B / AZ C`.
- Bring back the known FoodDash architecture:
  - users / `api.fooddash.com`
  - load balancer
  - Server A, Server B, Server C in the fixed vertical stack
- Add two small ghost badges near the load balancer as callbacks:
  - `Routing Policy`
  - `Layer 4 / Layer 7`

### Animation Plan

1. AZ A dims and its internal `POWER`, `NETWORK`, and `COOLING` badges flicker out.
2. AZ B and AZ C remain unchanged.
3. Isolation dividers between AZs brighten subtly to reinforce that failure boundaries should not spread.
4. The concept board compresses into a compact region/AZ reference badge.
5. The FoodDash architecture re-enters with the established smooth sequence: nodes fade/soft-pop, connector lines build outward, then traffic begins.
6. Thousands of incoming requests are represented by a dense but controlled packet stream; animate only the active paths, not every connector at once.
7. As Server A, Server B, and Server C are named, highlight each server card sequentially.
8. When load-balancing algorithms and Layer 4/Layer 7 are mentioned, show the small ghost badges near the load balancer, then let them fade back so they do not become a full recap.

### Continuity Rules

- Do not spend this section re-teaching load balancing. Treat it as a quick visual callback to the prior episodes.
- Preserve the exact FoodDash topology and A/B/C server identities from the load-balancing videos.
- The purpose of the return is to inspect physical placement next, so end on the stable FoodDash architecture ready for an AZ-boundary reveal.
- Keep request motion selective and readable; the visual should feel busy enough for "thousands" without becoming noisy.

## Locked Section 5 - Previous Episodes And Looks Resilient

Narration covered:

> If you have not watched those episodes yet, check out the other System Design videos available on the Engineering Systems channel. They will help you understand how FoodDash reached its current architecture. At first glance, this architecture looks resilient.

### Visual Composition

- Keep the FoodDash architecture from Section 4 on screen.
- Add a slim previous-episodes rail above or beside the architecture:
  - `Load Balancing`
  - `Algorithms`
  - `Layer 4 / Layer 7`
- Each rail item gets a quick soft-pop/check mark.
- The rail then compresses or fades into a subtle `Built so far` badge.
- Re-center the FoodDash architecture as the primary visual.
- Change the top note to `LOOKS RESILIENT`.
- Show small `HEALTHY` status dots on Server A, Server B, and Server C.

### Animation Plan

1. Previous-episode rail items appear quickly, one at a time.
2. Each item receives a small check mark to signal prior concepts already covered.
3. The rail compresses/fades to low opacity as a `Built so far` badge.
4. The FoodDash architecture brightens slightly and recenters.
5. Server A/B/C health dots appear.
6. Balanced packet flow continues through the load balancer.
7. End on a clean, confident hold so the upcoming hidden-problem reveal has contrast.

### Continuity Rules

- Keep this bridge brief and visual-light; do not interrupt the architecture flow with a full recap montage.
- The purpose is to build confidence that the current topology seems solved.
- Avoid introducing the AZ boundary in this section; save the physical-placement reveal for Section 6.

## Locked Section 6 - Server Redundancy But Single-AZ Placement

Narration covered:

> At first glance, this architecture looks resilient. If Server A crashes, the load balancer can send traffic to Server B and Server C. If Server B becomes overloaded, the load balancer can distribute more requests toward the other available servers. FoodDash no longer depends on one application server. But there is still a hidden problem. Let us say that Server A, Server B, and Server C are all deployed inside Availability Zone A of the Mumbai region. The load balancer distributes traffic across three different machines. But physically, all three machines still depend on the same Availability Zone. This is known as a Single-AZ architecture.

### Visual Composition

- Keep the known FoodDash architecture centered.
- Use two phases inside one continuous diagram.
- Phase 1 top note: `SERVER-LEVEL REDUNDANCY`.
- Phase 2 top note: `SINGLE-AZ ARCHITECTURE`.
- Server A/B/C remain visually separate throughout; do not merge them into one object.
- Reveal physical placement by drawing:
  - parent container label: `Mumbai Region`
  - inner dotted boundary around Server A/B/C: `Availability Zone A`
- Add small machine labels under the server cards:
  - `Machine 1`
  - `Machine 2`
  - `Machine 3`
- Add a subtle shared-dependency strip inside the AZ boundary:
  - `same AZ power`
  - `same AZ networking`
  - `same AZ cooling`

### Animation Plan

1. Begin with healthy packet flow through the load balancer.
2. Server A crashes; A dims/strikes and its route retracts.
3. Traffic continues to Server B and Server C, proving server-level redundancy.
4. Server B becomes overloaded; B's load meter rises and new packets shift toward the other available servers.
5. Show concise note: `NO SINGLE APP SERVER REQUIRED`.
6. Let the diagram briefly look solved again.
7. On "hidden problem", slow/fade request motion and dim the background slightly.
8. Draw the dotted `Availability Zone A` boundary around all three servers.
9. Draw or reveal the larger `Mumbai Region` parent label around the AZ boundary.
10. On "three different machines", highlight the individual server cards and machine labels.
11. On "same Availability Zone", highlight the shared dotted boundary and shared-dependency strip.
12. End with `Single-AZ Architecture` locked on screen.

### Continuity Rules

- The core contrast is separate machines versus shared physical failure boundary.
- Keep server identities and vertical placement stable.
- Show resilience behavior first, then reveal why that resilience is incomplete.
- Use the same boundary language established earlier: region outside, AZ inside.

## Locked Section 7 - Zone-Level Failure With No Healthy Backends

Narration covered:

> FoodDash has server-level redundancy. But it does not yet have location-level redundancy. Now imagine that Availability Zone A experiences a major infrastructure failure. Perhaps there is a power disruption. Perhaps a networking problem disconnects the entire zone. Perhaps cooling infrastructure fails. Or perhaps an operational mistake affects resources throughout that location. Suddenly, Server A becomes unreachable. Server B becomes unreachable. And Server C becomes unreachable. The load balancer checks its backend servers. Server A is unhealthy. Server B is unhealthy. Server C is unhealthy. The load balancer is still capable of routing traffic. But there are no healthy servers available to receive it.

### Visual Composition

- Start from the locked `Single-AZ Architecture` diagram.
- Top note: `SERVER-LEVEL REDUNDANCY IS NOT LOCATION-LEVEL REDUNDANCY`.
- Add two comparison chips:
  - `Server-level redundancy: yes`
  - `Location-level redundancy: no`
- Focus the main diagram on `Availability Zone A`.
- Inside AZ A, show a shared dependency strip:
  - `POWER`
  - `NETWORK`
  - `COOLING`
  - `OPERATIONS`
- Use a monochrome incident label over the AZ boundary when the zone fails:
  - primary label: `ZONE OUTAGE`
  - smaller label: `Downtime for all servers in this AZ`
- The incident label should be white with black text, include diagonal black hatch stripes or incident-tape styling, and may use a small `AlertTriangle` lucide icon.
- Keep the load balancer visually alive and capable, with a final label such as `LOAD BALANCER OK`.
- End on `NO HEALTHY BACKENDS`.

### Animation Plan

1. `Server-level redundancy: yes` checks on.
2. `Location-level redundancy: no` remains empty or receives a soft monochrome X.
3. As possible failures are narrated, briefly highlight each shared dependency:
   - power disruption: `POWER` flickers out
   - networking problem: `NETWORK` line disconnects
   - cooling failure: `COOLING` fades
   - operational mistake: `OPERATIONS` stamps across the AZ boundary
4. The entire `Availability Zone A` dotted boundary dims.
5. A monochrome incident label stamps onto the AZ: `ZONE OUTAGE`.
6. A thin dashed incident-tape line crosses the AZ boundary.
7. Server A becomes unreachable.
8. Server B becomes unreachable.
9. Server C becomes unreachable.
10. Pause user request packets so health checks are not confused with customer traffic.
11. The load balancer sends hollow health-probe dots to A, B, and C; no probe returns.
12. Each server receives an `UNHEALTHY` label in sequence.
13. All backend routes retract from the load balancer.
14. The load balancer remains bright and labeled `LOAD BALANCER OK`.
15. Final top note locks to `NO HEALTHY BACKENDS`.

### Continuity Rules

- Do not show the load balancer failing in this beat.
- The teaching image is a working router with zero healthy destinations.
- Use hollow dots for health probes and solid dots for user traffic, matching prior FoodDash health-check language.
- Keep warning treatment monochrome to preserve the series visual guide; do not introduce yellow or other color accents.

## Locked Section 8 - Lesson And Multi-AZ Redesign

Narration covered:

> Even though FoodDash had three servers and a load balancer, the entire system has gone offline. This reveals an important systems-design lesson. Redundancy only protects you when redundant components do not share the same failure boundary. Three servers inside one Availability Zone can protect FoodDash from one server crashing. But they cannot protect FoodDash from the entire Availability Zone becoming unavailable. So the FoodDash engineers redesign the system. They continue using the Mumbai region, but instead of placing all three servers inside one zone, they distribute them across three Availability Zones. Server A is deployed inside Availability Zone A. Server B is deployed inside Availability Zone B. And Server C is deployed inside Availability Zone C. The load balancer can now distribute incoming requests across servers located in different zones. This is a Multi-AZ architecture.

### Visual Composition

- Start from the failed Single-AZ diagram:
  - load balancer still alive
  - `ZONE OUTAGE` label on Availability Zone A
  - Server A/B/C all unhealthy
  - `NO HEALTHY BACKENDS`
- Soft-pop a white teaching rule card over the failed architecture:
  - `REDUNDANCY ONLY WORKS ACROSS FAILURE BOUNDARIES`
- Add a simple comparison:
  - `3 servers / 1 AZ = server redundancy`
  - `3 servers / 3 AZs = location redundancy`
- Preserve `Mumbai Region` as the parent container during the redesign.
- Split the single AZ boundary into three AZ boxes:
  - `Availability Zone A`
  - `Availability Zone B`
  - `Availability Zone C`
- Move the same server identities into their new zones:
  - Server A -> AZ A
  - Server B -> AZ B
  - Server C -> AZ C
- Keep the load balancer as the regional traffic entry point.
- End state top note: `MULTI-AZ ARCHITECTURE`.
- Bottom takeaway: `Same region. Different failure boundaries.`

### Animation Plan

1. Failed Single-AZ architecture freezes.
2. The rule card fades/soft-pops over the failed architecture.
3. The original `Availability Zone A` dotted boundary highlights as the shared failure boundary.
4. Server A/B/C briefly pulse inside the same boundary to show why redundancy did not help.
5. Show the comparison between `3 servers / 1 AZ` and `3 servers / 3 AZs`.
6. Begin the redesign without a hard cut.
7. Keep `Mumbai Region` mounted as the parent container.
8. Morph the single AZ box into three separated AZ boxes.
9. Move Server A, Server B, and Server C into AZ A, AZ B, and AZ C respectively.
10. Rebuild connector lines from the load balancer to each zone-contained server.
11. Resume request packets one active route at a time across the three zones.
12. Lock the final label `MULTI-AZ ARCHITECTURE`.

### Continuity Rules

- Server cards must feel like the same A/B/C servers being redistributed, not newly created servers.
- Use a smooth layout morph for the redesign; avoid a scene reset.
- The load balancer remains the familiar front-door object from prior videos.
- Emphasize that this is still the Mumbai region; the change is spreading across Availability Zones inside that region.

## Locked Section 9 - Multi-AZ Operation And Partial Failure

Narration covered:

> During normal operation, all three Availability Zones can serve traffic. A request might be sent to Server A in Zone A. The next request might be sent to Server B in Zone B. Another request might go to Server C in Zone C. But now imagine that Availability Zone A goes offline. Server A becomes unavailable. The load balancer detects that Server A is unhealthy and removes it from rotation. Traffic is then distributed between Server B in Zone B and Server C in Zone C. FoodDash may temporarily have less total capacity. The remaining servers may experience higher traffic. But the service can continue operating. Instead of a complete outage, FoodDash experiences a partial infrastructure failure that the architecture was designed to survive.

### Visual Composition

- Start from the final Multi-AZ architecture:
  - `Mumbai Region`
  - AZ A with Server A
  - AZ B with Server B
  - AZ C with Server C
  - load balancer distributing traffic across all three
- Initial top note: `NORMAL OPERATION: ALL ZONES SERVE TRAFFIC`.
- Show capacity counters:
  - `AZ A: 1x`
  - `AZ B: 1x`
  - `AZ C: 1x`
  - `Total: 3x`
- Reuse the monochrome `ZONE OUTAGE` incident label when AZ A fails.
- Degraded-state top note: `DEGRADED, NOT DOWN`.
- End with a small contrast:
  - `Single-AZ failure: complete outage`
  - `Multi-AZ failure: partial capacity loss`

### Animation Plan

1. Request #1 flows to Server A in AZ A.
2. Request #2 flows to Server B in AZ B.
3. Request #3 flows to Server C in AZ C.
4. Each AZ receives a small active pulse when it serves traffic.
5. Capacity counters show total available capacity as `3x`.
6. On "Availability Zone A goes offline", AZ A dims and receives the `ZONE OUTAGE` label.
7. Server A becomes unavailable.
8. The load balancer sends a hollow health probe to Server A and receives no return.
9. Server A route retracts.
10. Server A receives `UNHEALTHY`.
11. The load-balancer rotation indicator updates from `A / B / C` to `B / C`.
12. Traffic resumes only to Server B and Server C.
13. Server B and Server C load meters rise to show higher pressure.
14. Capacity changes from `Total: 3x` to `Available: 2x`.
15. The user side still receives successful responses.
16. End on the contrast between complete outage and partial capacity loss.

### Continuity Rules

- Reuse the same AZ outage language from Section 7 so the improved outcome is obvious.
- Do not make AZ B or AZ C visually unaffected only as labels; show traffic continuing through them.
- Keep health probes distinct from user traffic.
- The key teaching contrast is not "nothing breaks"; it is "less capacity, service still running."

## Locked Section 10 - Complete Request Path And Critical Dependencies

Narration covered:

> However, distributing application servers is only one part of the solution. Imagine that FoodDash places its three application servers across three Availability Zones but keeps its only database inside Zone A. If Zone A fails, Servers B and C may still be running. But they cannot access the database. FoodDash would still become unavailable. The same problem can happen with caches, message brokers, storage systems, or any other critical dependency. A truly resilient Multi-AZ architecture must consider the complete request path. Application servers must be distributed. Data must be replicated appropriately. Critical dependencies must support failover. And health checks must ensure that traffic is sent only toward resources that can actually serve requests. Multi-AZ is not simply about spreading machines across a diagram. It is about ensuring that the system can lose one Availability Zone without losing the complete service.

### Visual Composition

- Start from the working Multi-AZ app-server diagram.
- Add a database card inside `Availability Zone A` only.
- Draw required dependency lines:
  - Server A -> Database
  - Server B -> Database
  - Server C -> Database
- Initial top note: `APP SERVERS ARE ONLY ONE PART OF THE PATH`.
- After AZ A fails, top note changes to `HEALTHY COMPUTE, BROKEN REQUEST PATH`.
- Add a compact dependency row:
  - `Database`
  - `Cache`
  - `Message Broker`
  - `Storage`
- Each dependency card can receive a small `MUST SURVIVE AZ LOSS` stamp.
- Show the proper design principles as a four-card checklist:
  - `Distribute app servers`
  - `Replicate data`
  - `Fail over dependencies`
  - `Health-check real readiness`
- Final teaching boundary highlights the complete request path:
  - user -> load balancer -> server -> database/dependency
- Final top note: `MULTI-AZ MEANS THE SERVICE CAN LOSE ONE AZ`.
- Bottom takeaway: `Spread the service, not just the boxes.`

### Animation Plan

1. Distributed app servers remain visible across AZ A/B/C.
2. The database soft-pops inside AZ A only.
3. Dependency lines build from every server to the database.
4. On Zone A failure, AZ A receives the monochrome `ZONE OUTAGE` label.
5. Server B and Server C remain visibly healthy.
6. Their database dependency lines break or retract.
7. Requests reach Server B/C, then stop at the missing database path.
8. The user response changes to unavailable.
9. The dependency row appears and stamps each critical system as needing AZ-loss resilience.
10. The four-card checklist reveals one item at a time.
11. Highlight the full request path as a single service path, not just the app-server layer.
12. End on the complete-service definition of Multi-AZ resilience.

### Continuity Rules

- Do not introduce too many dependency internals; the core lesson is that B/C can be healthy while the service is still unavailable.
- Keep the visual contrast clear: alive compute, missing data path, failed user workflow.
- Health checks must imply real readiness, not just process uptime.
- This section should correct the "spread the boxes" misconception before the summary.

## Locked Section 11 - Summary, Multi-Region Bridge, And Closing

Narration covered:

> So let us summarize the difference. Multiple servers inside one Availability Zone protect against individual server failures. Multiple Availability Zones inside one region protect against the failure of an entire infrastructure location. But FoodDash is still operating only inside the Mumbai region. And that raises the next question. What happens if the entire Mumbai region becomes unavailable? Could FoodDash operate from another region such as Singapore? Or perhaps Northern Virginia? And how would users be routed between regions located thousands of kilometres apart? That is exactly what we will explore in the next episode when FoodDash enters the world of Multi-Region Architecture. If this video helped you understand Multi-AZ architecture, subscribe to Engineering Systems and explore the other System Design videos on the channel. We are building FoodDash step by step, turning a simple application into a scalable and resilient real-world system. I will see you in the next episode. Keep Learning.

### Visual Composition

- Start with a two-row comparison board using mini FoodDash diagrams, not text-only cards:
  - `Multiple servers / one AZ`
  - protects against `server failure`
  - does not protect against `AZ failure`
  - `Multiple AZs / one region`
  - protects against `location failure`
  - remaining risk `region failure`
- Summary top note: `FAILURE BOUNDARY DEFINES RESILIENCE`.
- For the next-episode bridge, zoom out from `Mumbai Region`.
- Reveal region cards:
  - `Mumbai Region`
  - `Singapore Region`
  - `Northern Virginia Region`
- Add long dashed global-routing paths from users to the region cards.
- Next-episode top note: `NEXT: MULTI-REGION ARCHITECTURE`.
- Add three question cards:
  - `What if Mumbai fails?`
  - `Can Singapore serve traffic?`
  - `How do users route globally?`
- Closing uses the established black-theme Engineering Systems outro, not a white slide.
- Closing right side can keep a faint three-region FoodDash map as background context.

### Animation Plan

1. Mini Single-AZ diagram appears.
2. One server fails and traffic survives inside the mini diagram.
3. The whole AZ fails and the mini diagram becomes unavailable.
4. Mini Multi-AZ diagram appears.
5. AZ A fails and traffic continues through AZ B/C.
6. Lock the summary note `FAILURE BOUNDARY DEFINES RESILIENCE`.
7. Zoom out from the Mumbai region to a wider regional board.
8. Singapore and Northern Virginia cards soft-pop into view.
9. Mumbai receives a subtle question mark/outage outline to introduce the next failure boundary.
10. Long dashed global-routing paths draw from users toward the available regions.
11. The three next-episode question cards appear one at a time.
12. Fade into the established black-theme closing with subscribe/keep-learning copy.

### Continuity Rules

- End with a zoom-out: server -> AZ -> region -> multiple regions.
- Multi-Region should feel like the natural next failure boundary after Multi-AZ, not a disconnected teaser.
- Keep closing monochrome and consistent with the existing series outro pattern.
