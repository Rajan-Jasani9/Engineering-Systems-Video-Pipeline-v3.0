# Load Balancing Algorithms - Video Visual Context

## 1. Episode Summary

This episode continues directly from the Load Balancing episode. FoodDash has users flowing through api.fooddash.com into a working load balancer and a stable Server A / Server B / Server C pool, so the architecture appears solved. Then the monitoring dashboard shows a strange imbalance: Server A is near 80% CPU, Server B is close behind, and Server C sits around 15%. The episode explains that installing a load balancer is only half the story; the other half is the routing algorithm. Round Robin, Weighted Round Robin, Least Connections, Least Response Time, Random Selection, and Hash-Based Routing are taught as different answers to the same question: which server should handle this request?

## 2. Narrative Structure

1. **Continuity hook (00:00-00:15):** Re-enter the previous load-balancing architecture and reveal that the working system still has a policy problem.
2. **Dashboard anomaly (00:16-00:54):** Monitoring shows A hot, B close behind, and C underused even though traffic is distributed.
3. **Policy question (00:54-01:30):** The load balancer must choose a backend for every request, and different choices optimize different goals.
4. **Round Robin (01:30-02:13):** A fixed A/B/C cycle gives equal share but assumes identical servers.
5. **Weighted Round Robin (02:14-02:56):** Server A receives a 2x capacity weight, so the sequence favors A.
6. **Least Connections (02:57-03:58):** The active connection count handles uneven request lifetimes better than equal turns.
7. **Least Response Time (03:59-05:01):** Latency exposes backend performance and user-visible speed.
8. **Random and Hash-Based (05:01-06:20):** Random spreads traffic with almost no overhead; hash routing keeps a user sticky to one backend.
9. **Trade-offs and bridge (06:21-07:30):** A matrix summarizes optimization goals and hands off to Layer 4 vs Layer 7.

## 3. Global Visual Story

The persistent visual is inherited from the prior episode: FoodDash users on the left, api.fooddash.com as the public boundary, one load balancer in the center-left, and Server A, Server B, and Server C in a fixed vertical pool on the right. The episode does not add new infrastructure. Instead, it opens the load balancer and changes the policy badge, per-server counters, request paths, and helper cards. Every algorithm is demonstrated on the same A/B/C pool so the viewer learns the decision signal instead of relearning the diagram.

## 4. Visual Continuity Map

| Object | Stable identity and placement | State rules |
| --- | --- | --- |
| FoodDash users / phone | Left edge, vertically centered | Requests originate here and cross api.fooddash.com first. |
| api.fooddash.com | Public endpoint just before the load balancer | Always targets the load balancer. |
| Load balancer | Center-left between users and server pool | Healthy throughout; policy badge changes. |
| Policy badge | Inside load balancer card | One active algorithm label at a time. |
| Server A | Top server | Hot early; upgraded to 2x capacity for weighted routing. |
| Server B | Middle server | 40 ms fastest backend in Least Response Time. |
| Server C | Bottom server | 15% early, 20 active connections, 300 ms slow backend. |
| Request packet | Small numbered square | Moves only on active route. |
| Metric counters | Beside servers | Units match the active algorithm. |
| Algorithm matrix | Recap board | Fills one row or cell at a time. |
| Request envelope | Bridge scene | Reveals URL, route, headers, cookies for the next episode. |
| Caption reserve | Bottom 120-140 px | Main visuals remain above it. |

## 5. Visual Motifs

- Policy badge flip inside the load balancer.
- One request decision per algorithm beat.
- Stable A/B/C pool with changing metric signals.
- Counterexample numbers that match the narration.
- Matrix stamp recap, one cell at a time.
- Request-envelope reveal for the Layer 4 vs Layer 7 bridge.

## 6. Continuity Flags

- Canonical architecture stays users -> api.fooddash.com -> Load Balancer -> Server A/B/C for all non-closing scenes.
- Server A stays top, Server B middle, Server C bottom.
- Server A is the upgraded 2x-capacity server in Weighted Round Robin.
- Server C is the 15% CPU server, the 20-connection Least Connections pick, and the 300 ms slow backend.
- Server B is the 40 ms Least Response Time pick and may be the sticky hash landing.
- api.fooddash.com always points to the load balancer, never directly to a backend.
- The policy badge inside the load balancer is the recurring algorithm-name focus.
- Capacity, load, connection count, latency, random count, and hash key are visually distinct.
- Round Robin cycles A -> B -> C; Weighted Round Robin cycles A, A, B, C.
- No load-balancer failure, redundant load-balancer pair, or health-probe failover appears in this episode.
- Bottom 120-140 px remains clear for captions except the established closing.
- On-screen product name is normalized to FoodDash.
