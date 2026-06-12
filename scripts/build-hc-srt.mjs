import fs from 'node:fs';
import path from 'node:path';

const segments = [
  [0, 5, "Welcome back to Engineering Systems. Today, we're continuing our Availability Patterns"],
  [5, 10, 'Explainer, jumping right back into our real-world example of FoodDash to explore'],
  [10, 15, 'how systems automatically bounce back from failure. Now, last time, we upgraded FoodDash'],
  [15, 20, 'by adding redundancy and replication, right? We proved how absolutely crucial having backup'],
  [20, 26, 'infrastructure is. But, as we are about to see, having a backup is really only half the battle,'],
  [26, 29, "because redundancy alone just isn't quite enough."],
  [29, 34, 'Think about it like this. We have a perfectly replicated backup database ready to go.'],
  [34, 39, 'But how does the system actually know to use it? Sure, redundancy gives us that safety net.'],
  [39, 43, 'But without an automated way to detect a failure and actually redirect the traffic,'],
  [43, 49, 'our hungry FoodDash users are just stuck. They are waiting for a human engineer to notice the alert,'],
  [49, 55, 'grab their laptop, log in, and manually fix things. And let us be real, in modern distributed systems,'],
  [55, 60, 'humans are simply way too slow. So, that brings us to our first section,'],
  [60, 64, 'Health Checks and Detecting Failures. Let us dive into how we actually spot these issues'],
  [64, 70, 'the second they happen. At its core, a health check is a small, continuous test used to verify'],
  [70, 76, 'if a system component can still actually serve traffic. But here is what is really interesting.'],
  [76, 80, 'A good health check goes way beyond just pinging a server to see if it is awake.'],
  [80, 86, 'Why? Well, imagine an API returning a 200 OK status. It is happily telling you its web server'],
  [86, 91, 'is running. But behind the scenes, it is completely failing to talk to a critical database or a cache'],
  [91, 97, 'like Redis. So yeah, it is technically alive, but it is practically useless to the person trying'],
  [97, 102, 'to order a pizza. To solve this problem, engineers structure health checks in layers.'],
  [102, 106, 'It is kind of like a pyramid. At the very bottom, we check process health. Basically,'],
  [106, 110, 'is the process running and is the port open? Move up a level, and we have application health.'],
  [110, 114, 'Can the app load its configs and reach its downstream dependencies? And then,'],
  [114, 119, 'right at the top, the ultimate test, business health. Can FoodDash actually place an order?'],
  [119, 124, 'Can it calculate the delivery fee? The huge takeaway here is that true availability means'],
  [124, 132, 'the system can successfully serve the user. It is not just about keeping a machine powered on in some data center somewhere.'],
  [132, 137, 'OK, so what actually happens when one of those health checks repeatedly fails? Well, that brings us to our next section,'],
  [137, 142, 'failover and automatic traffic redirection. Let us see how this builds into an actual recovery plan.'],
  [142, 147, 'Remember our active passive FoodDash database setup? Automatic failover there follows three really distinct steps.'],
  [147, 152, 'Step one, the system detects multiple failed health checks and realizes that the primary database is dead'],
  [152, 156, 'and it is no longer safe to use. Step two, it promotes the secondary replicated backup to be the new primary.'],
  [156, 161, 'And step three, it actively redirects all that application traffic over to the new primary.'],
  [161, 166, 'By automating this whole shebang, we take what could be a massive, hours-long nightmare of an outage'],
  [166, 171, 'and shrink it down to just a tiny brief slowdown or maybe a few dropped requests for the user.'],
  [171, 175, 'But hey, we all know distributed systems are messy, right? Failover is never quite that simple in practice.'],
  [175, 181, "Let us look at the big engineering challenge here, false positives. Here is the failing over immediately"],
  [181, 187, 'after just one single missed health check is a recipe for disaster. It represents a fundamental trade-off'],
  [187, 193, 'we face in availability engineering. Look at the low threshold approach. It gives you incredibly fast detection,'],
  [193, 197, 'which sounds great for recovery time, but it brings a dangerously high risk of false alarms'],
  [197, 201, 'and system instability. I mean, literally just a tiny network blip or a garbage collection pause'],
  [201, 206, 'could trigger a massive, completely unnecessary database failover. Now on the flip side,'],
  [206, 211, 'a high threshold gives you rock solid stability and way fewer false alarms. But the catch,'],
  [211, 216, 'your users are going to experience a noticeably longer outage before the system finally says,'],
  [216, 221, "okay, yeah, it is really dead, let's failover. So how do we handle this? Well, production systems"],
  [221, 226, 'typically use strict numerical thresholds. A super common magic number is three. You wait for exactly'],
  [226, 230, 'three consecutive failed health checks in a row before officially declaring a component dead.'],
  [230, 236, 'This is the sweet spot. It ensures we are not aggressively triggering a massive recovery'],
  [236, 241, 'just because of a momentary hiccup in the network, but we are still acting fast enough to save the user experience.'],
  [241, 246, 'Now let us talk about the actual infrastructure doing all this heavy lifting with the checking and routing.'],
  [246, 255, 'Section four, load balancers and recovery. In most modern distributed systems, load balancers are the real MVPs,'],
  [255, 261, 'actively using these health checks. And their workflow, it is honestly pretty elegant.'],
  [261, 266, 'First, they continuously ping the backend servers. Second, the moment a server looks sick,'],
  [266, 271, 'they dynamically yank it right out of the rotation. And third, they automatically put it back in once it is fully recovered.'],
  [271, 276, 'So imagine we have 10 FoodDash API servers. If one suddenly stops responding, the load balancer just instantly'],
  [276, 280, 'removes it. It makes sure any new hungry users only get routed to the nine healthy servers,'],
  [280, 285, 'at least until that broken one gets its act together. And honestly, this perfectly illustrates'],
  [285, 290, 'the crazy scalability of this concept, because this exact same detect and reroute principle applies everywhere.'],
  [290, 294, "It does not matter if you are doing a really small scale failover, just swapping between two local backend servers,"],
  [294, 299, 'or a massive large scale failover, where you are shifting global traffic away from an entire unhealthy geographic region.'],
  [299, 303, 'We are talking about routing millions of users from a completely down data center in Mumbai,'],
  [303, 308, 'straight over to a healthy one in Singapore. At the end of the day, the core logic is exactly the same.'],
  [308, 313, 'But of course, building all this automated failover requires some really careful design around capacity and routing.'],
  [313, 318, 'And that leads us to our next section, chaos engineering and testing failover.'],
  [318, 323, 'There is an absolute golden rule in systems design, and it goes like this.'],
  [323, 328, 'The absolute worst time to discover your failover process is broken, is right in the middle of an actual outage.'],
  [328, 333, 'That is exactly why mature engineering teams practice chaos engineering.'],
  [333, 338, 'They run intense failover drills where they intentionally shut down servers, kill backend processes,'],
  [338, 343, 'or just sever network paths. It sounds crazy, right? But it is absolutely the only way to prove'],
  [343, 348, 'your recovery mechanisms actually work in the real world, long before real paying customers ever feel the impact.'],
  [348, 353, 'All right, let us do a really quick recap of everything we have covered in this explainer.'],
  [353, 358, 'First, health checks detect failures by making sure our systems can actually do useful work.'],
  [358, 363, 'Second, failover kicks in to automatically redirect the traffic. Third, we use strict thresholds'],
  [363, 368, 'to balance our recovery speed against the risk of false positives. Fourth, load balancers are the unsung heroes'],
  [368, 373, 'automating that recovery routing. And finally, failover absolutely 100 percent must be tested.'],
  [373, 378, 'So if you take away just one thing today, let it be this. True availability is not just having backup servers'],
  [378, 383, 'sitting in a closet somewhere. It is what happens when detection, routing, replication, and recovery all work'],
  [383, 388, 'completely seamlessly together. But you know, all of this leaves us with one really provocative question.'],
  [388, 393, "Let us say our system does recover automatically and super fast. How do we actually measure how much downtime is acceptable?"],
  [393, 398, 'I mean, how do big tech companies define their targets and calculate the real world cost of being down?'],
  [398, 403, 'Well, you will have to join us in our next explainer to find out, because we are going to dive deep into'],
  [403, 408, 'availability targets, uptime percentages, and the famous nines. Make sure you hit subscribe'],
  [408, 426, "so you do not miss it, and I will see you there."],
];

const formatTime = (seconds) => {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.round((seconds % 1) * 1000);
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms).padStart(3, '0')}`;
};

const srt = segments
  .map(([start, end, text], index) => {
    return `${index + 1}\n${formatTime(start)} --> ${formatTime(end)}\n${text}\n`;
  })
  .join('\n');

const outPath = path.resolve('Transcripts&Audios/Health Checks and Failover.srt');
fs.writeFileSync(outPath, srt);
console.log(`Wrote ${segments.length} cues to ${outPath}`);
