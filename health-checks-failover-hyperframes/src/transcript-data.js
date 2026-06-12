window.TRANSCRIPT_DATA = {
  "entries": [
    {
      "start": 0,
      "end": 5,
      "text": "Welcome back to Engineering Systems. Today, we're continuing our Availability Patterns"
    },
    {
      "start": 5,
      "end": 10,
      "text": "Explainer, jumping right back into our real-world example of FoodDash to explore"
    },
    {
      "start": 10,
      "end": 15,
      "text": "how systems automatically bounce back from failure. Now, last time, we upgraded FoodDash"
    },
    {
      "start": 15,
      "end": 20,
      "text": "by adding redundancy and replication, right? We proved how absolutely crucial having backup"
    },
    {
      "start": 20,
      "end": 26,
      "text": "infrastructure is. But, as we are about to see, having a backup is really only half the battle,"
    },
    {
      "start": 26,
      "end": 29,
      "text": "because redundancy alone just isn't quite enough."
    },
    {
      "start": 29,
      "end": 34,
      "text": "Think about it like this. We have a perfectly replicated backup database ready to go."
    },
    {
      "start": 34,
      "end": 39,
      "text": "But how does the system actually know to use it? Sure, redundancy gives us that safety net."
    },
    {
      "start": 39,
      "end": 43,
      "text": "But without an automated way to detect a failure and actually redirect the traffic,"
    },
    {
      "start": 43,
      "end": 49,
      "text": "our hungry FoodDash users are just stuck. They are waiting for a human engineer to notice the alert,"
    },
    {
      "start": 49,
      "end": 55,
      "text": "grab their laptop, log in, and manually fix things. And let us be real, in modern distributed systems,"
    },
    {
      "start": 55,
      "end": 60,
      "text": "humans are simply way too slow. So, that brings us to our first section,"
    },
    {
      "start": 60,
      "end": 64,
      "text": "Health Checks and Detecting Failures. Let us dive into how we actually spot these issues"
    },
    {
      "start": 64,
      "end": 70,
      "text": "the second they happen. At its core, a health check is a small, continuous test used to verify"
    },
    {
      "start": 70,
      "end": 76,
      "text": "if a system component can still actually serve traffic. But here is what is really interesting."
    },
    {
      "start": 76,
      "end": 80,
      "text": "A good health check goes way beyond just pinging a server to see if it is awake."
    },
    {
      "start": 80,
      "end": 86,
      "text": "Why? Well, imagine an API returning a 200 OK status. It is happily telling you its web server"
    },
    {
      "start": 86,
      "end": 91,
      "text": "is running. But behind the scenes, it is completely failing to talk to a critical database or a cache"
    },
    {
      "start": 91,
      "end": 97,
      "text": "like Redis. So yeah, it is technically alive, but it is practically useless to the person trying"
    },
    {
      "start": 97,
      "end": 102,
      "text": "to order a pizza. To solve this problem, engineers structure health checks in layers."
    },
    {
      "start": 102,
      "end": 106,
      "text": "It is kind of like a pyramid. At the very bottom, we check process health. Basically,"
    },
    {
      "start": 106,
      "end": 110,
      "text": "is the process running and is the port open? Move up a level, and we have application health."
    },
    {
      "start": 110,
      "end": 114,
      "text": "Can the app load its configs and reach its downstream dependencies? And then,"
    },
    {
      "start": 114,
      "end": 119,
      "text": "right at the top, the ultimate test, business health. Can FoodDash actually place an order?"
    },
    {
      "start": 119,
      "end": 124,
      "text": "Can it calculate the delivery fee? The huge takeaway here is that true availability means"
    },
    {
      "start": 124,
      "end": 132,
      "text": "the system can successfully serve the user. It is not just about keeping a machine powered on in some data center somewhere."
    },
    {
      "start": 132,
      "end": 137,
      "text": "OK, so what actually happens when one of those health checks repeatedly fails? Well, that brings us to our next section,"
    },
    {
      "start": 137,
      "end": 142,
      "text": "failover and automatic traffic redirection. Let us see how this builds into an actual recovery plan."
    },
    {
      "start": 142,
      "end": 147,
      "text": "Remember our active passive FoodDash database setup? Automatic failover there follows three really distinct steps."
    },
    {
      "start": 147,
      "end": 152,
      "text": "Step one, the system detects multiple failed health checks and realizes that the primary database is dead"
    },
    {
      "start": 152,
      "end": 156,
      "text": "and it is no longer safe to use. Step two, it promotes the secondary replicated backup to be the new primary."
    },
    {
      "start": 156,
      "end": 161,
      "text": "And step three, it actively redirects all that application traffic over to the new primary."
    },
    {
      "start": 161,
      "end": 166,
      "text": "By automating this whole shebang, we take what could be a massive, hours-long nightmare of an outage"
    },
    {
      "start": 166,
      "end": 171,
      "text": "and shrink it down to just a tiny brief slowdown or maybe a few dropped requests for the user."
    },
    {
      "start": 171,
      "end": 175,
      "text": "But hey, we all know distributed systems are messy, right? Failover is never quite that simple in practice."
    },
    {
      "start": 175,
      "end": 181,
      "text": "Let us look at the big engineering challenge here, false positives. Here is the failing over immediately"
    },
    {
      "start": 181,
      "end": 187,
      "text": "after just one single missed health check is a recipe for disaster. It represents a fundamental trade-off"
    },
    {
      "start": 187,
      "end": 193,
      "text": "we face in availability engineering. Look at the low threshold approach. It gives you incredibly fast detection,"
    },
    {
      "start": 193,
      "end": 197,
      "text": "which sounds great for recovery time, but it brings a dangerously high risk of false alarms"
    },
    {
      "start": 197,
      "end": 201,
      "text": "and system instability. I mean, literally just a tiny network blip or a garbage collection pause"
    },
    {
      "start": 201,
      "end": 206,
      "text": "could trigger a massive, completely unnecessary database failover. Now on the flip side,"
    },
    {
      "start": 206,
      "end": 211,
      "text": "a high threshold gives you rock solid stability and way fewer false alarms. But the catch,"
    },
    {
      "start": 211,
      "end": 216,
      "text": "your users are going to experience a noticeably longer outage before the system finally says,"
    },
    {
      "start": 216,
      "end": 221,
      "text": "okay, yeah, it is really dead, let's failover. So how do we handle this? Well, production systems"
    },
    {
      "start": 221,
      "end": 226,
      "text": "typically use strict numerical thresholds. A super common magic number is three. You wait for exactly"
    },
    {
      "start": 226,
      "end": 230,
      "text": "three consecutive failed health checks in a row before officially declaring a component dead."
    },
    {
      "start": 230,
      "end": 236,
      "text": "This is the sweet spot. It ensures we are not aggressively triggering a massive recovery"
    },
    {
      "start": 236,
      "end": 241,
      "text": "just because of a momentary hiccup in the network, but we are still acting fast enough to save the user experience."
    },
    {
      "start": 241,
      "end": 246,
      "text": "Now let us talk about the actual infrastructure doing all this heavy lifting with the checking and routing."
    },
    {
      "start": 246,
      "end": 255,
      "text": "Section four, load balancers and recovery. In most modern distributed systems, load balancers are the real MVPs,"
    },
    {
      "start": 255,
      "end": 261,
      "text": "actively using these health checks. And their workflow, it is honestly pretty elegant."
    },
    {
      "start": 261,
      "end": 266,
      "text": "First, they continuously ping the backend servers. Second, the moment a server looks sick,"
    },
    {
      "start": 266,
      "end": 271,
      "text": "they dynamically yank it right out of the rotation. And third, they automatically put it back in once it is fully recovered."
    },
    {
      "start": 271,
      "end": 276,
      "text": "So imagine we have 10 FoodDash API servers. If one suddenly stops responding, the load balancer just instantly"
    },
    {
      "start": 276,
      "end": 280,
      "text": "removes it. It makes sure any new hungry users only get routed to the nine healthy servers,"
    },
    {
      "start": 280,
      "end": 285,
      "text": "at least until that broken one gets its act together. And honestly, this perfectly illustrates"
    },
    {
      "start": 285,
      "end": 290,
      "text": "the crazy scalability of this concept, because this exact same detect and reroute principle applies everywhere."
    },
    {
      "start": 290,
      "end": 294,
      "text": "It does not matter if you are doing a really small scale failover, just swapping between two local backend servers,"
    },
    {
      "start": 294,
      "end": 299,
      "text": "or a massive large scale failover, where you are shifting global traffic away from an entire unhealthy geographic region."
    },
    {
      "start": 299,
      "end": 303,
      "text": "We are talking about routing millions of users from a completely down data center in Mumbai,"
    },
    {
      "start": 303,
      "end": 308,
      "text": "straight over to a healthy one in Singapore. At the end of the day, the core logic is exactly the same."
    },
    {
      "start": 308,
      "end": 313,
      "text": "But of course, building all this automated failover requires some really careful design around capacity and routing."
    },
    {
      "start": 313,
      "end": 318,
      "text": "And that leads us to our next section, chaos engineering and testing failover."
    },
    {
      "start": 318,
      "end": 323,
      "text": "There is an absolute golden rule in systems design, and it goes like this."
    },
    {
      "start": 323,
      "end": 328,
      "text": "The absolute worst time to discover your failover process is broken, is right in the middle of an actual outage."
    },
    {
      "start": 328,
      "end": 333,
      "text": "That is exactly why mature engineering teams practice chaos engineering."
    },
    {
      "start": 333,
      "end": 338,
      "text": "They run intense failover drills where they intentionally shut down servers, kill backend processes,"
    },
    {
      "start": 338,
      "end": 343,
      "text": "or just sever network paths. It sounds crazy, right? But it is absolutely the only way to prove"
    },
    {
      "start": 343,
      "end": 348,
      "text": "your recovery mechanisms actually work in the real world, long before real paying customers ever feel the impact."
    },
    {
      "start": 348,
      "end": 353,
      "text": "All right, let us do a really quick recap of everything we have covered in this explainer."
    },
    {
      "start": 353,
      "end": 358,
      "text": "First, health checks detect failures by making sure our systems can actually do useful work."
    },
    {
      "start": 358,
      "end": 363,
      "text": "Second, failover kicks in to automatically redirect the traffic. Third, we use strict thresholds"
    },
    {
      "start": 363,
      "end": 368,
      "text": "to balance our recovery speed against the risk of false positives. Fourth, load balancers are the unsung heroes"
    },
    {
      "start": 368,
      "end": 373,
      "text": "automating that recovery routing. And finally, failover absolutely 100 percent must be tested."
    },
    {
      "start": 373,
      "end": 378,
      "text": "So if you take away just one thing today, let it be this. True availability is not just having backup servers"
    },
    {
      "start": 378,
      "end": 383,
      "text": "sitting in a closet somewhere. It is what happens when detection, routing, replication, and recovery all work"
    },
    {
      "start": 383,
      "end": 388,
      "text": "completely seamlessly together. But you know, all of this leaves us with one really provocative question."
    },
    {
      "start": 388,
      "end": 393,
      "text": "Let us say our system does recover automatically and super fast. How do we actually measure how much downtime is acceptable?"
    },
    {
      "start": 393,
      "end": 398,
      "text": "I mean, how do big tech companies define their targets and calculate the real world cost of being down?"
    },
    {
      "start": 398,
      "end": 403,
      "text": "Well, you will have to join us in our next explainer to find out, because we are going to dive deep into"
    },
    {
      "start": 403,
      "end": 408,
      "text": "availability targets, uptime percentages, and the famous nines. Make sure you hit subscribe"
    },
    {
      "start": 408,
      "end": 426,
      "text": "so you do not miss it, and I will see you there."
    }
  ],
  "words": [
    {
      "word": "Welcome",
      "start": 0,
      "end": 0.458
    },
    {
      "word": "back",
      "start": 0.458,
      "end": 0.719
    },
    {
      "word": "to",
      "start": 0.719,
      "end": 0.964
    },
    {
      "word": "Engineering",
      "start": 0.964,
      "end": 1.683
    },
    {
      "word": "Systems.",
      "start": 1.683,
      "end": 2.141
    },
    {
      "word": "Today,",
      "start": 2.141,
      "end": 2.467
    },
    {
      "word": "we're",
      "start": 2.467,
      "end": 2.794
    },
    {
      "word": "continuing",
      "start": 2.794,
      "end": 3.448
    },
    {
      "word": "our",
      "start": 3.448,
      "end": 3.693
    },
    {
      "word": "Availability",
      "start": 3.693,
      "end": 4.477
    },
    {
      "word": "Patterns",
      "start": 4.477,
      "end": 5
    },
    {
      "word": "Explainer,",
      "start": 5,
      "end": 5.623
    },
    {
      "word": "jumping",
      "start": 5.623,
      "end": 6.107
    },
    {
      "word": "right",
      "start": 6.107,
      "end": 6.453
    },
    {
      "word": "back",
      "start": 6.453,
      "end": 6.73
    },
    {
      "word": "into",
      "start": 6.73,
      "end": 7.007
    },
    {
      "word": "our",
      "start": 7.007,
      "end": 7.266
    },
    {
      "word": "real-world",
      "start": 7.266,
      "end": 7.958
    },
    {
      "word": "example",
      "start": 7.958,
      "end": 8.443
    },
    {
      "word": "of",
      "start": 8.443,
      "end": 8.702
    },
    {
      "word": "FoodDash",
      "start": 8.702,
      "end": 9.256
    },
    {
      "word": "to",
      "start": 9.256,
      "end": 9.516
    },
    {
      "word": "explore",
      "start": 9.516,
      "end": 10
    },
    {
      "word": "how",
      "start": 10,
      "end": 10.246
    },
    {
      "word": "systems",
      "start": 10.246,
      "end": 10.705
    },
    {
      "word": "automatically",
      "start": 10.705,
      "end": 11.557
    },
    {
      "word": "bounce",
      "start": 11.557,
      "end": 11.951
    },
    {
      "word": "back",
      "start": 11.951,
      "end": 12.213
    },
    {
      "word": "from",
      "start": 12.213,
      "end": 12.475
    },
    {
      "word": "failure.",
      "start": 12.475,
      "end": 12.934
    },
    {
      "word": "Now,",
      "start": 12.934,
      "end": 13.18
    },
    {
      "word": "last",
      "start": 13.18,
      "end": 13.443
    },
    {
      "word": "time,",
      "start": 13.443,
      "end": 13.705
    },
    {
      "word": "we",
      "start": 13.705,
      "end": 13.951
    },
    {
      "word": "upgraded",
      "start": 13.951,
      "end": 14.475
    },
    {
      "word": "FoodDash",
      "start": 14.475,
      "end": 15
    },
    {
      "word": "by",
      "start": 15,
      "end": 15.229
    },
    {
      "word": "adding",
      "start": 15.229,
      "end": 15.595
    },
    {
      "word": "redundancy",
      "start": 15.595,
      "end": 16.204
    },
    {
      "word": "and",
      "start": 16.204,
      "end": 16.433
    },
    {
      "word": "replication,",
      "start": 16.433,
      "end": 17.104
    },
    {
      "word": "right?",
      "start": 17.104,
      "end": 17.409
    },
    {
      "word": "We",
      "start": 17.409,
      "end": 17.637
    },
    {
      "word": "proved",
      "start": 17.637,
      "end": 18.003
    },
    {
      "word": "how",
      "start": 18.003,
      "end": 18.232
    },
    {
      "word": "absolutely",
      "start": 18.232,
      "end": 18.841
    },
    {
      "word": "crucial",
      "start": 18.841,
      "end": 19.268
    },
    {
      "word": "having",
      "start": 19.268,
      "end": 19.634
    },
    {
      "word": "backup",
      "start": 19.634,
      "end": 20
    },
    {
      "word": "infrastructure",
      "start": 20,
      "end": 20.949
    },
    {
      "word": "is.",
      "start": 20.949,
      "end": 21.203
    },
    {
      "word": "But,",
      "start": 21.203,
      "end": 21.458
    },
    {
      "word": "as",
      "start": 21.458,
      "end": 21.712
    },
    {
      "word": "we",
      "start": 21.712,
      "end": 21.966
    },
    {
      "word": "are",
      "start": 21.966,
      "end": 22.22
    },
    {
      "word": "about",
      "start": 22.22,
      "end": 22.559
    },
    {
      "word": "to",
      "start": 22.559,
      "end": 22.814
    },
    {
      "word": "see,",
      "start": 22.814,
      "end": 23.068
    },
    {
      "word": "having",
      "start": 23.068,
      "end": 23.475
    },
    {
      "word": "a",
      "start": 23.475,
      "end": 23.729
    },
    {
      "word": "backup",
      "start": 23.729,
      "end": 24.136
    },
    {
      "word": "is",
      "start": 24.136,
      "end": 24.39
    },
    {
      "word": "really",
      "start": 24.39,
      "end": 24.797
    },
    {
      "word": "only",
      "start": 24.797,
      "end": 25.068
    },
    {
      "word": "half",
      "start": 25.068,
      "end": 25.339
    },
    {
      "word": "the",
      "start": 25.339,
      "end": 25.593
    },
    {
      "word": "battle,",
      "start": 25.593,
      "end": 26
    },
    {
      "word": "because",
      "start": 26,
      "end": 26.5
    },
    {
      "word": "redundancy",
      "start": 26.5,
      "end": 27.214
    },
    {
      "word": "alone",
      "start": 27.214,
      "end": 27.571
    },
    {
      "word": "just",
      "start": 27.571,
      "end": 27.857
    },
    {
      "word": "isn't",
      "start": 27.857,
      "end": 28.214
    },
    {
      "word": "quite",
      "start": 28.214,
      "end": 28.571
    },
    {
      "word": "enough.",
      "start": 28.571,
      "end": 29
    },
    {
      "word": "Think",
      "start": 29,
      "end": 29.317
    },
    {
      "word": "about",
      "start": 29.317,
      "end": 29.635
    },
    {
      "word": "it",
      "start": 29.635,
      "end": 29.873
    },
    {
      "word": "like",
      "start": 29.873,
      "end": 30.127
    },
    {
      "word": "this.",
      "start": 30.127,
      "end": 30.381
    },
    {
      "word": "We",
      "start": 30.381,
      "end": 30.619
    },
    {
      "word": "have",
      "start": 30.619,
      "end": 30.873
    },
    {
      "word": "a",
      "start": 30.873,
      "end": 31.111
    },
    {
      "word": "perfectly",
      "start": 31.111,
      "end": 31.683
    },
    {
      "word": "replicated",
      "start": 31.683,
      "end": 32.317
    },
    {
      "word": "backup",
      "start": 32.317,
      "end": 32.698
    },
    {
      "word": "database",
      "start": 32.698,
      "end": 33.206
    },
    {
      "word": "ready",
      "start": 33.206,
      "end": 33.524
    },
    {
      "word": "to",
      "start": 33.524,
      "end": 33.762
    },
    {
      "word": "go.",
      "start": 33.762,
      "end": 34
    },
    {
      "word": "But",
      "start": 34,
      "end": 34.231
    },
    {
      "word": "how",
      "start": 34.231,
      "end": 34.463
    },
    {
      "word": "does",
      "start": 34.463,
      "end": 34.71
    },
    {
      "word": "the",
      "start": 34.71,
      "end": 34.941
    },
    {
      "word": "system",
      "start": 34.941,
      "end": 35.312
    },
    {
      "word": "actually",
      "start": 35.312,
      "end": 35.806
    },
    {
      "word": "know",
      "start": 35.806,
      "end": 36.052
    },
    {
      "word": "to",
      "start": 36.052,
      "end": 36.284
    },
    {
      "word": "use",
      "start": 36.284,
      "end": 36.515
    },
    {
      "word": "it?",
      "start": 36.515,
      "end": 36.747
    },
    {
      "word": "Sure,",
      "start": 36.747,
      "end": 36.994
    },
    {
      "word": "redundancy",
      "start": 36.994,
      "end": 37.611
    },
    {
      "word": "gives",
      "start": 37.611,
      "end": 37.92
    },
    {
      "word": "us",
      "start": 37.92,
      "end": 38.151
    },
    {
      "word": "that",
      "start": 38.151,
      "end": 38.398
    },
    {
      "word": "safety",
      "start": 38.398,
      "end": 38.769
    },
    {
      "word": "net.",
      "start": 38.769,
      "end": 39
    },
    {
      "word": "But",
      "start": 39,
      "end": 39.192
    },
    {
      "word": "without",
      "start": 39.192,
      "end": 39.55
    },
    {
      "word": "an",
      "start": 39.55,
      "end": 39.741
    },
    {
      "word": "automated",
      "start": 39.741,
      "end": 40.201
    },
    {
      "word": "way",
      "start": 40.201,
      "end": 40.393
    },
    {
      "word": "to",
      "start": 40.393,
      "end": 40.585
    },
    {
      "word": "detect",
      "start": 40.585,
      "end": 40.891
    },
    {
      "word": "a",
      "start": 40.891,
      "end": 41.083
    },
    {
      "word": "failure",
      "start": 41.083,
      "end": 41.441
    },
    {
      "word": "and",
      "start": 41.441,
      "end": 41.633
    },
    {
      "word": "actually",
      "start": 41.633,
      "end": 42.042
    },
    {
      "word": "redirect",
      "start": 42.042,
      "end": 42.45
    },
    {
      "word": "the",
      "start": 42.45,
      "end": 42.642
    },
    {
      "word": "traffic,",
      "start": 42.642,
      "end": 43
    },
    {
      "word": "our",
      "start": 43,
      "end": 43.252
    },
    {
      "word": "hungry",
      "start": 43.252,
      "end": 43.655
    },
    {
      "word": "FoodDash",
      "start": 43.655,
      "end": 44.193
    },
    {
      "word": "users",
      "start": 44.193,
      "end": 44.529
    },
    {
      "word": "are",
      "start": 44.529,
      "end": 44.782
    },
    {
      "word": "just",
      "start": 44.782,
      "end": 45.05
    },
    {
      "word": "stuck.",
      "start": 45.05,
      "end": 45.387
    },
    {
      "word": "They",
      "start": 45.387,
      "end": 45.655
    },
    {
      "word": "are",
      "start": 45.655,
      "end": 45.908
    },
    {
      "word": "waiting",
      "start": 45.908,
      "end": 46.378
    },
    {
      "word": "for",
      "start": 46.378,
      "end": 46.63
    },
    {
      "word": "a",
      "start": 46.63,
      "end": 46.882
    },
    {
      "word": "human",
      "start": 46.882,
      "end": 47.218
    },
    {
      "word": "engineer",
      "start": 47.218,
      "end": 47.756
    },
    {
      "word": "to",
      "start": 47.756,
      "end": 48.008
    },
    {
      "word": "notice",
      "start": 48.008,
      "end": 48.412
    },
    {
      "word": "the",
      "start": 48.412,
      "end": 48.664
    },
    {
      "word": "alert,",
      "start": 48.664,
      "end": 49
    },
    {
      "word": "grab",
      "start": 49,
      "end": 49.264
    },
    {
      "word": "their",
      "start": 49.264,
      "end": 49.595
    },
    {
      "word": "laptop,",
      "start": 49.595,
      "end": 49.992
    },
    {
      "word": "log",
      "start": 49.992,
      "end": 50.24
    },
    {
      "word": "in,",
      "start": 50.24,
      "end": 50.488
    },
    {
      "word": "and",
      "start": 50.488,
      "end": 50.736
    },
    {
      "word": "manually",
      "start": 50.736,
      "end": 51.264
    },
    {
      "word": "fix",
      "start": 51.264,
      "end": 51.512
    },
    {
      "word": "things.",
      "start": 51.512,
      "end": 51.909
    },
    {
      "word": "And",
      "start": 51.909,
      "end": 52.157
    },
    {
      "word": "let",
      "start": 52.157,
      "end": 52.405
    },
    {
      "word": "us",
      "start": 52.405,
      "end": 52.653
    },
    {
      "word": "be",
      "start": 52.653,
      "end": 52.901
    },
    {
      "word": "real,",
      "start": 52.901,
      "end": 53.165
    },
    {
      "word": "in",
      "start": 53.165,
      "end": 53.413
    },
    {
      "word": "modern",
      "start": 53.413,
      "end": 53.81
    },
    {
      "word": "distributed",
      "start": 53.81,
      "end": 54.537
    },
    {
      "word": "systems,",
      "start": 54.537,
      "end": 55
    },
    {
      "word": "humans",
      "start": 55,
      "end": 55.467
    },
    {
      "word": "are",
      "start": 55.467,
      "end": 55.759
    },
    {
      "word": "simply",
      "start": 55.759,
      "end": 56.226
    },
    {
      "word": "way",
      "start": 56.226,
      "end": 56.518
    },
    {
      "word": "too",
      "start": 56.518,
      "end": 56.809
    },
    {
      "word": "slow.",
      "start": 56.809,
      "end": 57.121
    },
    {
      "word": "So,",
      "start": 57.121,
      "end": 57.412
    },
    {
      "word": "that",
      "start": 57.412,
      "end": 57.724
    },
    {
      "word": "brings",
      "start": 57.724,
      "end": 58.191
    },
    {
      "word": "us",
      "start": 58.191,
      "end": 58.482
    },
    {
      "word": "to",
      "start": 58.482,
      "end": 58.774
    },
    {
      "word": "our",
      "start": 58.774,
      "end": 59.066
    },
    {
      "word": "first",
      "start": 59.066,
      "end": 59.455
    },
    {
      "word": "section,",
      "start": 59.455,
      "end": 60
    },
    {
      "word": "Health",
      "start": 60,
      "end": 60.305
    },
    {
      "word": "Checks",
      "start": 60.305,
      "end": 60.61
    },
    {
      "word": "and",
      "start": 60.61,
      "end": 60.8
    },
    {
      "word": "Detecting",
      "start": 60.8,
      "end": 61.257
    },
    {
      "word": "Failures.",
      "start": 61.257,
      "end": 61.663
    },
    {
      "word": "Let",
      "start": 61.663,
      "end": 61.854
    },
    {
      "word": "us",
      "start": 61.854,
      "end": 62.044
    },
    {
      "word": "dive",
      "start": 62.044,
      "end": 62.248
    },
    {
      "word": "into",
      "start": 62.248,
      "end": 62.451
    },
    {
      "word": "how",
      "start": 62.451,
      "end": 62.641
    },
    {
      "word": "we",
      "start": 62.641,
      "end": 62.832
    },
    {
      "word": "actually",
      "start": 62.832,
      "end": 63.238
    },
    {
      "word": "spot",
      "start": 63.238,
      "end": 63.441
    },
    {
      "word": "these",
      "start": 63.441,
      "end": 63.695
    },
    {
      "word": "issues",
      "start": 63.695,
      "end": 64
    },
    {
      "word": "the",
      "start": 64,
      "end": 64.261
    },
    {
      "word": "second",
      "start": 64.261,
      "end": 64.678
    },
    {
      "word": "they",
      "start": 64.678,
      "end": 64.957
    },
    {
      "word": "happen.",
      "start": 64.957,
      "end": 65.374
    },
    {
      "word": "At",
      "start": 65.374,
      "end": 65.635
    },
    {
      "word": "its",
      "start": 65.635,
      "end": 65.896
    },
    {
      "word": "core,",
      "start": 65.896,
      "end": 66.174
    },
    {
      "word": "a",
      "start": 66.174,
      "end": 66.435
    },
    {
      "word": "health",
      "start": 66.435,
      "end": 66.852
    },
    {
      "word": "check",
      "start": 66.852,
      "end": 67.2
    },
    {
      "word": "is",
      "start": 67.2,
      "end": 67.461
    },
    {
      "word": "a",
      "start": 67.461,
      "end": 67.722
    },
    {
      "word": "small,",
      "start": 67.722,
      "end": 68.07
    },
    {
      "word": "continuous",
      "start": 68.07,
      "end": 68.765
    },
    {
      "word": "test",
      "start": 68.765,
      "end": 69.043
    },
    {
      "word": "used",
      "start": 69.043,
      "end": 69.322
    },
    {
      "word": "to",
      "start": 69.322,
      "end": 69.583
    },
    {
      "word": "verify",
      "start": 69.583,
      "end": 70
    },
    {
      "word": "if",
      "start": 70,
      "end": 70.257
    },
    {
      "word": "a",
      "start": 70.257,
      "end": 70.514
    },
    {
      "word": "system",
      "start": 70.514,
      "end": 70.926
    },
    {
      "word": "component",
      "start": 70.926,
      "end": 71.543
    },
    {
      "word": "can",
      "start": 71.543,
      "end": 71.8
    },
    {
      "word": "still",
      "start": 71.8,
      "end": 72.143
    },
    {
      "word": "actually",
      "start": 72.143,
      "end": 72.691
    },
    {
      "word": "serve",
      "start": 72.691,
      "end": 73.034
    },
    {
      "word": "traffic.",
      "start": 73.034,
      "end": 73.514
    },
    {
      "word": "But",
      "start": 73.514,
      "end": 73.771
    },
    {
      "word": "here",
      "start": 73.771,
      "end": 74.046
    },
    {
      "word": "is",
      "start": 74.046,
      "end": 74.303
    },
    {
      "word": "what",
      "start": 74.303,
      "end": 74.577
    },
    {
      "word": "is",
      "start": 74.577,
      "end": 74.834
    },
    {
      "word": "really",
      "start": 74.834,
      "end": 75.246
    },
    {
      "word": "interesting.",
      "start": 75.246,
      "end": 76
    },
    {
      "word": "A",
      "start": 76,
      "end": 76.195
    },
    {
      "word": "good",
      "start": 76.195,
      "end": 76.403
    },
    {
      "word": "health",
      "start": 76.403,
      "end": 76.714
    },
    {
      "word": "check",
      "start": 76.714,
      "end": 76.974
    },
    {
      "word": "goes",
      "start": 76.974,
      "end": 77.182
    },
    {
      "word": "way",
      "start": 77.182,
      "end": 77.377
    },
    {
      "word": "beyond",
      "start": 77.377,
      "end": 77.688
    },
    {
      "word": "just",
      "start": 77.688,
      "end": 77.896
    },
    {
      "word": "pinging",
      "start": 77.896,
      "end": 78.26
    },
    {
      "word": "a",
      "start": 78.26,
      "end": 78.455
    },
    {
      "word": "server",
      "start": 78.455,
      "end": 78.766
    },
    {
      "word": "to",
      "start": 78.766,
      "end": 78.961
    },
    {
      "word": "see",
      "start": 78.961,
      "end": 79.156
    },
    {
      "word": "if",
      "start": 79.156,
      "end": 79.351
    },
    {
      "word": "it",
      "start": 79.351,
      "end": 79.545
    },
    {
      "word": "is",
      "start": 79.545,
      "end": 79.74
    },
    {
      "word": "awake.",
      "start": 79.74,
      "end": 80
    },
    {
      "word": "Why?",
      "start": 80,
      "end": 80.258
    },
    {
      "word": "Well,",
      "start": 80.258,
      "end": 80.533
    },
    {
      "word": "imagine",
      "start": 80.533,
      "end": 81.014
    },
    {
      "word": "an",
      "start": 81.014,
      "end": 81.272
    },
    {
      "word": "API",
      "start": 81.272,
      "end": 81.53
    },
    {
      "word": "returning",
      "start": 81.53,
      "end": 82.149
    },
    {
      "word": "a",
      "start": 82.149,
      "end": 82.407
    },
    {
      "word": "200",
      "start": 82.407,
      "end": 82.665
    },
    {
      "word": "OK",
      "start": 82.665,
      "end": 82.923
    },
    {
      "word": "status.",
      "start": 82.923,
      "end": 83.335
    },
    {
      "word": "It",
      "start": 83.335,
      "end": 83.593
    },
    {
      "word": "is",
      "start": 83.593,
      "end": 83.851
    },
    {
      "word": "happily",
      "start": 83.851,
      "end": 84.332
    },
    {
      "word": "telling",
      "start": 84.332,
      "end": 84.814
    },
    {
      "word": "you",
      "start": 84.814,
      "end": 85.072
    },
    {
      "word": "its",
      "start": 85.072,
      "end": 85.33
    },
    {
      "word": "web",
      "start": 85.33,
      "end": 85.587
    },
    {
      "word": "server",
      "start": 85.587,
      "end": 86
    },
    {
      "word": "is",
      "start": 86,
      "end": 86.19
    },
    {
      "word": "running.",
      "start": 86.19,
      "end": 86.546
    },
    {
      "word": "But",
      "start": 86.546,
      "end": 86.736
    },
    {
      "word": "behind",
      "start": 86.736,
      "end": 87.041
    },
    {
      "word": "the",
      "start": 87.041,
      "end": 87.231
    },
    {
      "word": "scenes,",
      "start": 87.231,
      "end": 87.536
    },
    {
      "word": "it",
      "start": 87.536,
      "end": 87.726
    },
    {
      "word": "is",
      "start": 87.726,
      "end": 87.916
    },
    {
      "word": "completely",
      "start": 87.916,
      "end": 88.424
    },
    {
      "word": "failing",
      "start": 88.424,
      "end": 88.779
    },
    {
      "word": "to",
      "start": 88.779,
      "end": 88.97
    },
    {
      "word": "talk",
      "start": 88.97,
      "end": 89.173
    },
    {
      "word": "to",
      "start": 89.173,
      "end": 89.363
    },
    {
      "word": "a",
      "start": 89.363,
      "end": 89.553
    },
    {
      "word": "critical",
      "start": 89.553,
      "end": 89.959
    },
    {
      "word": "database",
      "start": 89.959,
      "end": 90.365
    },
    {
      "word": "or",
      "start": 90.365,
      "end": 90.556
    },
    {
      "word": "a",
      "start": 90.556,
      "end": 90.746
    },
    {
      "word": "cache",
      "start": 90.746,
      "end": 91
    },
    {
      "word": "like",
      "start": 91,
      "end": 91.27
    },
    {
      "word": "Redis.",
      "start": 91.27,
      "end": 91.607
    },
    {
      "word": "So",
      "start": 91.607,
      "end": 91.86
    },
    {
      "word": "yeah,",
      "start": 91.86,
      "end": 92.129
    },
    {
      "word": "it",
      "start": 92.129,
      "end": 92.382
    },
    {
      "word": "is",
      "start": 92.382,
      "end": 92.635
    },
    {
      "word": "technically",
      "start": 92.635,
      "end": 93.376
    },
    {
      "word": "alive,",
      "start": 93.376,
      "end": 93.713
    },
    {
      "word": "but",
      "start": 93.713,
      "end": 93.966
    },
    {
      "word": "it",
      "start": 93.966,
      "end": 94.219
    },
    {
      "word": "is",
      "start": 94.219,
      "end": 94.472
    },
    {
      "word": "practically",
      "start": 94.472,
      "end": 95.213
    },
    {
      "word": "useless",
      "start": 95.213,
      "end": 95.685
    },
    {
      "word": "to",
      "start": 95.685,
      "end": 95.938
    },
    {
      "word": "the",
      "start": 95.938,
      "end": 96.191
    },
    {
      "word": "person",
      "start": 96.191,
      "end": 96.596
    },
    {
      "word": "trying",
      "start": 96.596,
      "end": 97
    },
    {
      "word": "to",
      "start": 97,
      "end": 97.244
    },
    {
      "word": "order",
      "start": 97.244,
      "end": 97.568
    },
    {
      "word": "a",
      "start": 97.568,
      "end": 97.812
    },
    {
      "word": "pizza.",
      "start": 97.812,
      "end": 98.136
    },
    {
      "word": "To",
      "start": 98.136,
      "end": 98.38
    },
    {
      "word": "solve",
      "start": 98.38,
      "end": 98.705
    },
    {
      "word": "this",
      "start": 98.705,
      "end": 98.964
    },
    {
      "word": "problem,",
      "start": 98.964,
      "end": 99.419
    },
    {
      "word": "engineers",
      "start": 99.419,
      "end": 100.003
    },
    {
      "word": "structure",
      "start": 100.003,
      "end": 100.588
    },
    {
      "word": "health",
      "start": 100.588,
      "end": 100.977
    },
    {
      "word": "checks",
      "start": 100.977,
      "end": 101.367
    },
    {
      "word": "in",
      "start": 101.367,
      "end": 101.61
    },
    {
      "word": "layers.",
      "start": 101.61,
      "end": 102
    },
    {
      "word": "It",
      "start": 102,
      "end": 102.192
    },
    {
      "word": "is",
      "start": 102.192,
      "end": 102.383
    },
    {
      "word": "kind",
      "start": 102.383,
      "end": 102.588
    },
    {
      "word": "of",
      "start": 102.588,
      "end": 102.78
    },
    {
      "word": "like",
      "start": 102.78,
      "end": 102.984
    },
    {
      "word": "a",
      "start": 102.984,
      "end": 103.176
    },
    {
      "word": "pyramid.",
      "start": 103.176,
      "end": 103.534
    },
    {
      "word": "At",
      "start": 103.534,
      "end": 103.725
    },
    {
      "word": "the",
      "start": 103.725,
      "end": 103.917
    },
    {
      "word": "very",
      "start": 103.917,
      "end": 104.121
    },
    {
      "word": "bottom,",
      "start": 104.121,
      "end": 104.428
    },
    {
      "word": "we",
      "start": 104.428,
      "end": 104.62
    },
    {
      "word": "check",
      "start": 104.62,
      "end": 104.875
    },
    {
      "word": "process",
      "start": 104.875,
      "end": 105.233
    },
    {
      "word": "health.",
      "start": 105.233,
      "end": 105.54
    },
    {
      "word": "Basically,",
      "start": 105.54,
      "end": 106
    },
    {
      "word": "is",
      "start": 106,
      "end": 106.175
    },
    {
      "word": "the",
      "start": 106.175,
      "end": 106.35
    },
    {
      "word": "process",
      "start": 106.35,
      "end": 106.676
    },
    {
      "word": "running",
      "start": 106.676,
      "end": 107.003
    },
    {
      "word": "and",
      "start": 107.003,
      "end": 107.178
    },
    {
      "word": "is",
      "start": 107.178,
      "end": 107.353
    },
    {
      "word": "the",
      "start": 107.353,
      "end": 107.528
    },
    {
      "word": "port",
      "start": 107.528,
      "end": 107.714
    },
    {
      "word": "open?",
      "start": 107.714,
      "end": 107.901
    },
    {
      "word": "Move",
      "start": 107.901,
      "end": 108.087
    },
    {
      "word": "up",
      "start": 108.087,
      "end": 108.262
    },
    {
      "word": "a",
      "start": 108.262,
      "end": 108.437
    },
    {
      "word": "level,",
      "start": 108.437,
      "end": 108.671
    },
    {
      "word": "and",
      "start": 108.671,
      "end": 108.845
    },
    {
      "word": "we",
      "start": 108.845,
      "end": 109.02
    },
    {
      "word": "have",
      "start": 109.02,
      "end": 109.207
    },
    {
      "word": "application",
      "start": 109.207,
      "end": 109.72
    },
    {
      "word": "health.",
      "start": 109.72,
      "end": 110
    },
    {
      "word": "Can",
      "start": 110,
      "end": 110.22
    },
    {
      "word": "the",
      "start": 110.22,
      "end": 110.44
    },
    {
      "word": "app",
      "start": 110.44,
      "end": 110.659
    },
    {
      "word": "load",
      "start": 110.659,
      "end": 110.894
    },
    {
      "word": "its",
      "start": 110.894,
      "end": 111.114
    },
    {
      "word": "configs",
      "start": 111.114,
      "end": 111.524
    },
    {
      "word": "and",
      "start": 111.524,
      "end": 111.744
    },
    {
      "word": "reach",
      "start": 111.744,
      "end": 112.037
    },
    {
      "word": "its",
      "start": 112.037,
      "end": 112.256
    },
    {
      "word": "downstream",
      "start": 112.256,
      "end": 112.842
    },
    {
      "word": "dependencies?",
      "start": 112.842,
      "end": 113.546
    },
    {
      "word": "And",
      "start": 113.546,
      "end": 113.766
    },
    {
      "word": "then,",
      "start": 113.766,
      "end": 114
    },
    {
      "word": "right",
      "start": 114,
      "end": 114.314
    },
    {
      "word": "at",
      "start": 114.314,
      "end": 114.55
    },
    {
      "word": "the",
      "start": 114.55,
      "end": 114.786
    },
    {
      "word": "top,",
      "start": 114.786,
      "end": 115.022
    },
    {
      "word": "the",
      "start": 115.022,
      "end": 115.258
    },
    {
      "word": "ultimate",
      "start": 115.258,
      "end": 115.761
    },
    {
      "word": "test,",
      "start": 115.761,
      "end": 116.013
    },
    {
      "word": "business",
      "start": 116.013,
      "end": 116.516
    },
    {
      "word": "health.",
      "start": 116.516,
      "end": 116.893
    },
    {
      "word": "Can",
      "start": 116.893,
      "end": 117.129
    },
    {
      "word": "FoodDash",
      "start": 117.129,
      "end": 117.632
    },
    {
      "word": "actually",
      "start": 117.632,
      "end": 118.135
    },
    {
      "word": "place",
      "start": 118.135,
      "end": 118.45
    },
    {
      "word": "an",
      "start": 118.45,
      "end": 118.686
    },
    {
      "word": "order?",
      "start": 118.686,
      "end": 119
    },
    {
      "word": "Can",
      "start": 119,
      "end": 119.233
    },
    {
      "word": "it",
      "start": 119.233,
      "end": 119.466
    },
    {
      "word": "calculate",
      "start": 119.466,
      "end": 120.025
    },
    {
      "word": "the",
      "start": 120.025,
      "end": 120.258
    },
    {
      "word": "delivery",
      "start": 120.258,
      "end": 120.755
    },
    {
      "word": "fee?",
      "start": 120.755,
      "end": 120.988
    },
    {
      "word": "The",
      "start": 120.988,
      "end": 121.22
    },
    {
      "word": "huge",
      "start": 121.22,
      "end": 121.469
    },
    {
      "word": "takeaway",
      "start": 121.469,
      "end": 121.966
    },
    {
      "word": "here",
      "start": 121.966,
      "end": 122.214
    },
    {
      "word": "is",
      "start": 122.214,
      "end": 122.447
    },
    {
      "word": "that",
      "start": 122.447,
      "end": 122.696
    },
    {
      "word": "true",
      "start": 122.696,
      "end": 122.944
    },
    {
      "word": "availability",
      "start": 122.944,
      "end": 123.689
    },
    {
      "word": "means",
      "start": 123.689,
      "end": 124
    },
    {
      "word": "the",
      "start": 124,
      "end": 124.264
    },
    {
      "word": "system",
      "start": 124.264,
      "end": 124.686
    },
    {
      "word": "can",
      "start": 124.686,
      "end": 124.949
    },
    {
      "word": "successfully",
      "start": 124.949,
      "end": 125.793
    },
    {
      "word": "serve",
      "start": 125.793,
      "end": 126.145
    },
    {
      "word": "the",
      "start": 126.145,
      "end": 126.409
    },
    {
      "word": "user.",
      "start": 126.409,
      "end": 126.69
    },
    {
      "word": "It",
      "start": 126.69,
      "end": 126.954
    },
    {
      "word": "is",
      "start": 126.954,
      "end": 127.218
    },
    {
      "word": "not",
      "start": 127.218,
      "end": 127.481
    },
    {
      "word": "just",
      "start": 127.481,
      "end": 127.763
    },
    {
      "word": "about",
      "start": 127.763,
      "end": 128.114
    },
    {
      "word": "keeping",
      "start": 128.114,
      "end": 128.607
    },
    {
      "word": "a",
      "start": 128.607,
      "end": 128.87
    },
    {
      "word": "machine",
      "start": 128.87,
      "end": 129.363
    },
    {
      "word": "powered",
      "start": 129.363,
      "end": 129.855
    },
    {
      "word": "on",
      "start": 129.855,
      "end": 130.119
    },
    {
      "word": "in",
      "start": 130.119,
      "end": 130.382
    },
    {
      "word": "some",
      "start": 130.382,
      "end": 130.664
    },
    {
      "word": "data",
      "start": 130.664,
      "end": 130.945
    },
    {
      "word": "center",
      "start": 130.945,
      "end": 131.367
    },
    {
      "word": "somewhere.",
      "start": 131.367,
      "end": 132
    },
    {
      "word": "OK,",
      "start": 132,
      "end": 132.176
    },
    {
      "word": "so",
      "start": 132.176,
      "end": 132.353
    },
    {
      "word": "what",
      "start": 132.353,
      "end": 132.541
    },
    {
      "word": "actually",
      "start": 132.541,
      "end": 132.918
    },
    {
      "word": "happens",
      "start": 132.918,
      "end": 133.247
    },
    {
      "word": "when",
      "start": 133.247,
      "end": 133.435
    },
    {
      "word": "one",
      "start": 133.435,
      "end": 133.612
    },
    {
      "word": "of",
      "start": 133.612,
      "end": 133.788
    },
    {
      "word": "those",
      "start": 133.788,
      "end": 134.024
    },
    {
      "word": "health",
      "start": 134.024,
      "end": 134.306
    },
    {
      "word": "checks",
      "start": 134.306,
      "end": 134.588
    },
    {
      "word": "repeatedly",
      "start": 134.588,
      "end": 135.059
    },
    {
      "word": "fails?",
      "start": 135.059,
      "end": 135.294
    },
    {
      "word": "Well,",
      "start": 135.294,
      "end": 135.482
    },
    {
      "word": "that",
      "start": 135.482,
      "end": 135.671
    },
    {
      "word": "brings",
      "start": 135.671,
      "end": 135.953
    },
    {
      "word": "us",
      "start": 135.953,
      "end": 136.129
    },
    {
      "word": "to",
      "start": 136.129,
      "end": 136.306
    },
    {
      "word": "our",
      "start": 136.306,
      "end": 136.482
    },
    {
      "word": "next",
      "start": 136.482,
      "end": 136.671
    },
    {
      "word": "section,",
      "start": 136.671,
      "end": 137
    },
    {
      "word": "failover",
      "start": 137,
      "end": 137.447
    },
    {
      "word": "and",
      "start": 137.447,
      "end": 137.656
    },
    {
      "word": "automatic",
      "start": 137.656,
      "end": 138.159
    },
    {
      "word": "traffic",
      "start": 138.159,
      "end": 138.55
    },
    {
      "word": "redirection.",
      "start": 138.55,
      "end": 139.165
    },
    {
      "word": "Let",
      "start": 139.165,
      "end": 139.374
    },
    {
      "word": "us",
      "start": 139.374,
      "end": 139.584
    },
    {
      "word": "see",
      "start": 139.584,
      "end": 139.793
    },
    {
      "word": "how",
      "start": 139.793,
      "end": 140.003
    },
    {
      "word": "this",
      "start": 140.003,
      "end": 140.226
    },
    {
      "word": "builds",
      "start": 140.226,
      "end": 140.561
    },
    {
      "word": "into",
      "start": 140.561,
      "end": 140.785
    },
    {
      "word": "an",
      "start": 140.785,
      "end": 140.994
    },
    {
      "word": "actual",
      "start": 140.994,
      "end": 141.33
    },
    {
      "word": "recovery",
      "start": 141.33,
      "end": 141.777
    },
    {
      "word": "plan.",
      "start": 141.777,
      "end": 142
    },
    {
      "word": "Remember",
      "start": 142,
      "end": 142.405
    },
    {
      "word": "our",
      "start": 142.405,
      "end": 142.595
    },
    {
      "word": "active",
      "start": 142.595,
      "end": 142.899
    },
    {
      "word": "passive",
      "start": 142.899,
      "end": 143.253
    },
    {
      "word": "FoodDash",
      "start": 143.253,
      "end": 143.658
    },
    {
      "word": "database",
      "start": 143.658,
      "end": 144.063
    },
    {
      "word": "setup?",
      "start": 144.063,
      "end": 144.316
    },
    {
      "word": "Automatic",
      "start": 144.316,
      "end": 144.772
    },
    {
      "word": "failover",
      "start": 144.772,
      "end": 145.177
    },
    {
      "word": "there",
      "start": 145.177,
      "end": 145.43
    },
    {
      "word": "follows",
      "start": 145.43,
      "end": 145.785
    },
    {
      "word": "three",
      "start": 145.785,
      "end": 146.038
    },
    {
      "word": "really",
      "start": 146.038,
      "end": 146.342
    },
    {
      "word": "distinct",
      "start": 146.342,
      "end": 146.747
    },
    {
      "word": "steps.",
      "start": 146.747,
      "end": 147
    },
    {
      "word": "Step",
      "start": 147,
      "end": 147.216
    },
    {
      "word": "one,",
      "start": 147.216,
      "end": 147.418
    },
    {
      "word": "the",
      "start": 147.418,
      "end": 147.62
    },
    {
      "word": "system",
      "start": 147.62,
      "end": 147.943
    },
    {
      "word": "detects",
      "start": 147.943,
      "end": 148.321
    },
    {
      "word": "multiple",
      "start": 148.321,
      "end": 148.752
    },
    {
      "word": "failed",
      "start": 148.752,
      "end": 149.075
    },
    {
      "word": "health",
      "start": 149.075,
      "end": 149.399
    },
    {
      "word": "checks",
      "start": 149.399,
      "end": 149.722
    },
    {
      "word": "and",
      "start": 149.722,
      "end": 149.925
    },
    {
      "word": "realizes",
      "start": 149.925,
      "end": 150.356
    },
    {
      "word": "that",
      "start": 150.356,
      "end": 150.571
    },
    {
      "word": "the",
      "start": 150.571,
      "end": 150.774
    },
    {
      "word": "primary",
      "start": 150.774,
      "end": 151.151
    },
    {
      "word": "database",
      "start": 151.151,
      "end": 151.582
    },
    {
      "word": "is",
      "start": 151.582,
      "end": 151.784
    },
    {
      "word": "dead",
      "start": 151.784,
      "end": 152
    },
    {
      "word": "and",
      "start": 152,
      "end": 152.146
    },
    {
      "word": "it",
      "start": 152.146,
      "end": 152.292
    },
    {
      "word": "is",
      "start": 152.292,
      "end": 152.438
    },
    {
      "word": "no",
      "start": 152.438,
      "end": 152.584
    },
    {
      "word": "longer",
      "start": 152.584,
      "end": 152.818
    },
    {
      "word": "safe",
      "start": 152.818,
      "end": 152.973
    },
    {
      "word": "to",
      "start": 152.973,
      "end": 153.119
    },
    {
      "word": "use.",
      "start": 153.119,
      "end": 153.265
    },
    {
      "word": "Step",
      "start": 153.265,
      "end": 153.421
    },
    {
      "word": "two,",
      "start": 153.421,
      "end": 153.567
    },
    {
      "word": "it",
      "start": 153.567,
      "end": 153.713
    },
    {
      "word": "promotes",
      "start": 153.713,
      "end": 154.024
    },
    {
      "word": "the",
      "start": 154.024,
      "end": 154.17
    },
    {
      "word": "secondary",
      "start": 154.17,
      "end": 154.521
    },
    {
      "word": "replicated",
      "start": 154.521,
      "end": 154.91
    },
    {
      "word": "backup",
      "start": 154.91,
      "end": 155.144
    },
    {
      "word": "to",
      "start": 155.144,
      "end": 155.29
    },
    {
      "word": "be",
      "start": 155.29,
      "end": 155.436
    },
    {
      "word": "the",
      "start": 155.436,
      "end": 155.582
    },
    {
      "word": "new",
      "start": 155.582,
      "end": 155.727
    },
    {
      "word": "primary.",
      "start": 155.727,
      "end": 156
    },
    {
      "word": "And",
      "start": 156,
      "end": 156.23
    },
    {
      "word": "step",
      "start": 156.23,
      "end": 156.475
    },
    {
      "word": "three,",
      "start": 156.475,
      "end": 156.782
    },
    {
      "word": "it",
      "start": 156.782,
      "end": 157.012
    },
    {
      "word": "actively",
      "start": 157.012,
      "end": 157.503
    },
    {
      "word": "redirects",
      "start": 157.503,
      "end": 158.055
    },
    {
      "word": "all",
      "start": 158.055,
      "end": 158.285
    },
    {
      "word": "that",
      "start": 158.285,
      "end": 158.531
    },
    {
      "word": "application",
      "start": 158.531,
      "end": 159.206
    },
    {
      "word": "traffic",
      "start": 159.206,
      "end": 159.635
    },
    {
      "word": "over",
      "start": 159.635,
      "end": 159.88
    },
    {
      "word": "to",
      "start": 159.88,
      "end": 160.11
    },
    {
      "word": "the",
      "start": 160.11,
      "end": 160.34
    },
    {
      "word": "new",
      "start": 160.34,
      "end": 160.571
    },
    {
      "word": "primary.",
      "start": 160.571,
      "end": 161
    },
    {
      "word": "By",
      "start": 161,
      "end": 161.201
    },
    {
      "word": "automating",
      "start": 161.201,
      "end": 161.735
    },
    {
      "word": "this",
      "start": 161.735,
      "end": 161.949
    },
    {
      "word": "whole",
      "start": 161.949,
      "end": 162.217
    },
    {
      "word": "shebang,",
      "start": 162.217,
      "end": 162.591
    },
    {
      "word": "we",
      "start": 162.591,
      "end": 162.791
    },
    {
      "word": "take",
      "start": 162.791,
      "end": 163.005
    },
    {
      "word": "what",
      "start": 163.005,
      "end": 163.219
    },
    {
      "word": "could",
      "start": 163.219,
      "end": 163.487
    },
    {
      "word": "be",
      "start": 163.487,
      "end": 163.687
    },
    {
      "word": "a",
      "start": 163.687,
      "end": 163.888
    },
    {
      "word": "massive,",
      "start": 163.888,
      "end": 164.262
    },
    {
      "word": "hours-long",
      "start": 164.262,
      "end": 164.797
    },
    {
      "word": "nightmare",
      "start": 164.797,
      "end": 165.278
    },
    {
      "word": "of",
      "start": 165.278,
      "end": 165.479
    },
    {
      "word": "an",
      "start": 165.479,
      "end": 165.679
    },
    {
      "word": "outage",
      "start": 165.679,
      "end": 166
    },
    {
      "word": "and",
      "start": 166,
      "end": 166.211
    },
    {
      "word": "shrink",
      "start": 166.211,
      "end": 166.549
    },
    {
      "word": "it",
      "start": 166.549,
      "end": 166.761
    },
    {
      "word": "down",
      "start": 166.761,
      "end": 166.986
    },
    {
      "word": "to",
      "start": 166.986,
      "end": 167.197
    },
    {
      "word": "just",
      "start": 167.197,
      "end": 167.423
    },
    {
      "word": "a",
      "start": 167.423,
      "end": 167.634
    },
    {
      "word": "tiny",
      "start": 167.634,
      "end": 167.859
    },
    {
      "word": "brief",
      "start": 167.859,
      "end": 168.141
    },
    {
      "word": "slowdown",
      "start": 168.141,
      "end": 168.592
    },
    {
      "word": "or",
      "start": 168.592,
      "end": 168.803
    },
    {
      "word": "maybe",
      "start": 168.803,
      "end": 169.085
    },
    {
      "word": "a",
      "start": 169.085,
      "end": 169.296
    },
    {
      "word": "few",
      "start": 169.296,
      "end": 169.507
    },
    {
      "word": "dropped",
      "start": 169.507,
      "end": 169.901
    },
    {
      "word": "requests",
      "start": 169.901,
      "end": 170.352
    },
    {
      "word": "for",
      "start": 170.352,
      "end": 170.563
    },
    {
      "word": "the",
      "start": 170.563,
      "end": 170.775
    },
    {
      "word": "user.",
      "start": 170.775,
      "end": 171
    },
    {
      "word": "But",
      "start": 171,
      "end": 171.159
    },
    {
      "word": "hey,",
      "start": 171.159,
      "end": 171.318
    },
    {
      "word": "we",
      "start": 171.318,
      "end": 171.477
    },
    {
      "word": "all",
      "start": 171.477,
      "end": 171.637
    },
    {
      "word": "know",
      "start": 171.637,
      "end": 171.806
    },
    {
      "word": "distributed",
      "start": 171.806,
      "end": 172.273
    },
    {
      "word": "systems",
      "start": 172.273,
      "end": 172.57
    },
    {
      "word": "are",
      "start": 172.57,
      "end": 172.729
    },
    {
      "word": "messy,",
      "start": 172.729,
      "end": 172.942
    },
    {
      "word": "right?",
      "start": 172.942,
      "end": 173.154
    },
    {
      "word": "Failover",
      "start": 173.154,
      "end": 173.493
    },
    {
      "word": "is",
      "start": 173.493,
      "end": 173.653
    },
    {
      "word": "never",
      "start": 173.653,
      "end": 173.865
    },
    {
      "word": "quite",
      "start": 173.865,
      "end": 174.077
    },
    {
      "word": "that",
      "start": 174.077,
      "end": 174.247
    },
    {
      "word": "simple",
      "start": 174.247,
      "end": 174.501
    },
    {
      "word": "in",
      "start": 174.501,
      "end": 174.66
    },
    {
      "word": "practice.",
      "start": 174.66,
      "end": 175
    },
    {
      "word": "Let",
      "start": 175,
      "end": 175.239
    },
    {
      "word": "us",
      "start": 175.239,
      "end": 175.477
    },
    {
      "word": "look",
      "start": 175.477,
      "end": 175.732
    },
    {
      "word": "at",
      "start": 175.732,
      "end": 175.971
    },
    {
      "word": "the",
      "start": 175.971,
      "end": 176.21
    },
    {
      "word": "big",
      "start": 176.21,
      "end": 176.448
    },
    {
      "word": "engineering",
      "start": 176.448,
      "end": 177.149
    },
    {
      "word": "challenge",
      "start": 177.149,
      "end": 177.721
    },
    {
      "word": "here,",
      "start": 177.721,
      "end": 177.976
    },
    {
      "word": "false",
      "start": 177.976,
      "end": 178.294
    },
    {
      "word": "positives.",
      "start": 178.294,
      "end": 178.867
    },
    {
      "word": "Here",
      "start": 178.867,
      "end": 179.122
    },
    {
      "word": "is",
      "start": 179.122,
      "end": 179.361
    },
    {
      "word": "the",
      "start": 179.361,
      "end": 179.599
    },
    {
      "word": "failing",
      "start": 179.599,
      "end": 180.045
    },
    {
      "word": "over",
      "start": 180.045,
      "end": 180.3
    },
    {
      "word": "immediately",
      "start": 180.3,
      "end": 181
    },
    {
      "word": "after",
      "start": 181,
      "end": 181.305
    },
    {
      "word": "just",
      "start": 181.305,
      "end": 181.548
    },
    {
      "word": "one",
      "start": 181.548,
      "end": 181.777
    },
    {
      "word": "single",
      "start": 181.777,
      "end": 182.142
    },
    {
      "word": "missed",
      "start": 182.142,
      "end": 182.508
    },
    {
      "word": "health",
      "start": 182.508,
      "end": 182.873
    },
    {
      "word": "check",
      "start": 182.873,
      "end": 183.178
    },
    {
      "word": "is",
      "start": 183.178,
      "end": 183.406
    },
    {
      "word": "a",
      "start": 183.406,
      "end": 183.635
    },
    {
      "word": "recipe",
      "start": 183.635,
      "end": 184
    },
    {
      "word": "for",
      "start": 184,
      "end": 184.228
    },
    {
      "word": "disaster.",
      "start": 184.228,
      "end": 184.716
    },
    {
      "word": "It",
      "start": 184.716,
      "end": 184.944
    },
    {
      "word": "represents",
      "start": 184.944,
      "end": 185.553
    },
    {
      "word": "a",
      "start": 185.553,
      "end": 185.782
    },
    {
      "word": "fundamental",
      "start": 185.782,
      "end": 186.452
    },
    {
      "word": "trade-off",
      "start": 186.452,
      "end": 187
    },
    {
      "word": "we",
      "start": 187,
      "end": 187.22
    },
    {
      "word": "face",
      "start": 187.22,
      "end": 187.455
    },
    {
      "word": "in",
      "start": 187.455,
      "end": 187.675
    },
    {
      "word": "availability",
      "start": 187.675,
      "end": 188.379
    },
    {
      "word": "engineering.",
      "start": 188.379,
      "end": 189.024
    },
    {
      "word": "Look",
      "start": 189.024,
      "end": 189.259
    },
    {
      "word": "at",
      "start": 189.259,
      "end": 189.479
    },
    {
      "word": "the",
      "start": 189.479,
      "end": 189.699
    },
    {
      "word": "low",
      "start": 189.699,
      "end": 189.919
    },
    {
      "word": "threshold",
      "start": 189.919,
      "end": 190.447
    },
    {
      "word": "approach.",
      "start": 190.447,
      "end": 190.917
    },
    {
      "word": "It",
      "start": 190.917,
      "end": 191.137
    },
    {
      "word": "gives",
      "start": 191.137,
      "end": 191.43
    },
    {
      "word": "you",
      "start": 191.43,
      "end": 191.65
    },
    {
      "word": "incredibly",
      "start": 191.65,
      "end": 192.237
    },
    {
      "word": "fast",
      "start": 192.237,
      "end": 192.472
    },
    {
      "word": "detection,",
      "start": 192.472,
      "end": 193
    },
    {
      "word": "which",
      "start": 193,
      "end": 193.242
    },
    {
      "word": "sounds",
      "start": 193.242,
      "end": 193.532
    },
    {
      "word": "great",
      "start": 193.532,
      "end": 193.773
    },
    {
      "word": "for",
      "start": 193.773,
      "end": 193.955
    },
    {
      "word": "recovery",
      "start": 193.955,
      "end": 194.341
    },
    {
      "word": "time,",
      "start": 194.341,
      "end": 194.535
    },
    {
      "word": "but",
      "start": 194.535,
      "end": 194.716
    },
    {
      "word": "it",
      "start": 194.716,
      "end": 194.897
    },
    {
      "word": "brings",
      "start": 194.897,
      "end": 195.187
    },
    {
      "word": "a",
      "start": 195.187,
      "end": 195.369
    },
    {
      "word": "dangerously",
      "start": 195.369,
      "end": 195.9
    },
    {
      "word": "high",
      "start": 195.9,
      "end": 196.094
    },
    {
      "word": "risk",
      "start": 196.094,
      "end": 196.287
    },
    {
      "word": "of",
      "start": 196.287,
      "end": 196.468
    },
    {
      "word": "false",
      "start": 196.468,
      "end": 196.71
    },
    {
      "word": "alarms",
      "start": 196.71,
      "end": 197
    },
    {
      "word": "and",
      "start": 197,
      "end": 197.167
    },
    {
      "word": "system",
      "start": 197.167,
      "end": 197.435
    },
    {
      "word": "instability.",
      "start": 197.435,
      "end": 197.925
    },
    {
      "word": "I",
      "start": 197.925,
      "end": 198.092
    },
    {
      "word": "mean,",
      "start": 198.092,
      "end": 198.27
    },
    {
      "word": "literally",
      "start": 198.27,
      "end": 198.671
    },
    {
      "word": "just",
      "start": 198.671,
      "end": 198.85
    },
    {
      "word": "a",
      "start": 198.85,
      "end": 199.017
    },
    {
      "word": "tiny",
      "start": 199.017,
      "end": 199.195
    },
    {
      "word": "network",
      "start": 199.195,
      "end": 199.507
    },
    {
      "word": "blip",
      "start": 199.507,
      "end": 199.685
    },
    {
      "word": "or",
      "start": 199.685,
      "end": 199.852
    },
    {
      "word": "a",
      "start": 199.852,
      "end": 200.019
    },
    {
      "word": "garbage",
      "start": 200.019,
      "end": 200.331
    },
    {
      "word": "collection",
      "start": 200.331,
      "end": 200.777
    },
    {
      "word": "pause",
      "start": 200.777,
      "end": 201
    },
    {
      "word": "could",
      "start": 201,
      "end": 201.316
    },
    {
      "word": "trigger",
      "start": 201.316,
      "end": 201.759
    },
    {
      "word": "a",
      "start": 201.759,
      "end": 201.997
    },
    {
      "word": "massive,",
      "start": 201.997,
      "end": 202.44
    },
    {
      "word": "completely",
      "start": 202.44,
      "end": 203.073
    },
    {
      "word": "unnecessary",
      "start": 203.073,
      "end": 203.769
    },
    {
      "word": "database",
      "start": 203.769,
      "end": 204.275
    },
    {
      "word": "failover.",
      "start": 204.275,
      "end": 204.782
    },
    {
      "word": "Now",
      "start": 204.782,
      "end": 205.019
    },
    {
      "word": "on",
      "start": 205.019,
      "end": 205.256
    },
    {
      "word": "the",
      "start": 205.256,
      "end": 205.494
    },
    {
      "word": "flip",
      "start": 205.494,
      "end": 205.747
    },
    {
      "word": "side,",
      "start": 205.747,
      "end": 206
    },
    {
      "word": "a",
      "start": 206,
      "end": 206.236
    },
    {
      "word": "high",
      "start": 206.236,
      "end": 206.487
    },
    {
      "word": "threshold",
      "start": 206.487,
      "end": 207.053
    },
    {
      "word": "gives",
      "start": 207.053,
      "end": 207.368
    },
    {
      "word": "you",
      "start": 207.368,
      "end": 207.604
    },
    {
      "word": "rock",
      "start": 207.604,
      "end": 207.855
    },
    {
      "word": "solid",
      "start": 207.855,
      "end": 208.17
    },
    {
      "word": "stability",
      "start": 208.17,
      "end": 208.736
    },
    {
      "word": "and",
      "start": 208.736,
      "end": 208.972
    },
    {
      "word": "way",
      "start": 208.972,
      "end": 209.208
    },
    {
      "word": "fewer",
      "start": 209.208,
      "end": 209.522
    },
    {
      "word": "false",
      "start": 209.522,
      "end": 209.836
    },
    {
      "word": "alarms.",
      "start": 209.836,
      "end": 210.214
    },
    {
      "word": "But",
      "start": 210.214,
      "end": 210.45
    },
    {
      "word": "the",
      "start": 210.45,
      "end": 210.686
    },
    {
      "word": "catch,",
      "start": 210.686,
      "end": 211
    },
    {
      "word": "your",
      "start": 211,
      "end": 211.238
    },
    {
      "word": "users",
      "start": 211.238,
      "end": 211.536
    },
    {
      "word": "are",
      "start": 211.536,
      "end": 211.759
    },
    {
      "word": "going",
      "start": 211.759,
      "end": 212.057
    },
    {
      "word": "to",
      "start": 212.057,
      "end": 212.28
    },
    {
      "word": "experience",
      "start": 212.28,
      "end": 212.875
    },
    {
      "word": "a",
      "start": 212.875,
      "end": 213.098
    },
    {
      "word": "noticeably",
      "start": 213.098,
      "end": 213.693
    },
    {
      "word": "longer",
      "start": 213.693,
      "end": 214.051
    },
    {
      "word": "outage",
      "start": 214.051,
      "end": 214.408
    },
    {
      "word": "before",
      "start": 214.408,
      "end": 214.765
    },
    {
      "word": "the",
      "start": 214.765,
      "end": 214.988
    },
    {
      "word": "system",
      "start": 214.988,
      "end": 215.345
    },
    {
      "word": "finally",
      "start": 215.345,
      "end": 215.762
    },
    {
      "word": "says,",
      "start": 215.762,
      "end": 216
    },
    {
      "word": "okay,",
      "start": 216,
      "end": 216.237
    },
    {
      "word": "yeah,",
      "start": 216.237,
      "end": 216.473
    },
    {
      "word": "it",
      "start": 216.473,
      "end": 216.695
    },
    {
      "word": "is",
      "start": 216.695,
      "end": 216.917
    },
    {
      "word": "really",
      "start": 216.917,
      "end": 217.272
    },
    {
      "word": "dead,",
      "start": 217.272,
      "end": 217.509
    },
    {
      "word": "let's",
      "start": 217.509,
      "end": 217.805
    },
    {
      "word": "failover.",
      "start": 217.805,
      "end": 218.278
    },
    {
      "word": "So",
      "start": 218.278,
      "end": 218.5
    },
    {
      "word": "how",
      "start": 218.5,
      "end": 218.722
    },
    {
      "word": "do",
      "start": 218.722,
      "end": 218.944
    },
    {
      "word": "we",
      "start": 218.944,
      "end": 219.166
    },
    {
      "word": "handle",
      "start": 219.166,
      "end": 219.521
    },
    {
      "word": "this?",
      "start": 219.521,
      "end": 219.757
    },
    {
      "word": "Well,",
      "start": 219.757,
      "end": 219.994
    },
    {
      "word": "production",
      "start": 219.994,
      "end": 220.586
    },
    {
      "word": "systems",
      "start": 220.586,
      "end": 221
    },
    {
      "word": "typically",
      "start": 221,
      "end": 221.496
    },
    {
      "word": "use",
      "start": 221.496,
      "end": 221.702
    },
    {
      "word": "strict",
      "start": 221.702,
      "end": 222.033
    },
    {
      "word": "numerical",
      "start": 222.033,
      "end": 222.529
    },
    {
      "word": "thresholds.",
      "start": 222.529,
      "end": 223.08
    },
    {
      "word": "A",
      "start": 223.08,
      "end": 223.287
    },
    {
      "word": "super",
      "start": 223.287,
      "end": 223.562
    },
    {
      "word": "common",
      "start": 223.562,
      "end": 223.893
    },
    {
      "word": "magic",
      "start": 223.893,
      "end": 224.168
    },
    {
      "word": "number",
      "start": 224.168,
      "end": 224.499
    },
    {
      "word": "is",
      "start": 224.499,
      "end": 224.705
    },
    {
      "word": "three.",
      "start": 224.705,
      "end": 224.981
    },
    {
      "word": "You",
      "start": 224.981,
      "end": 225.187
    },
    {
      "word": "wait",
      "start": 225.187,
      "end": 225.408
    },
    {
      "word": "for",
      "start": 225.408,
      "end": 225.614
    },
    {
      "word": "exactly",
      "start": 225.614,
      "end": 226
    },
    {
      "word": "three",
      "start": 226,
      "end": 226.23
    },
    {
      "word": "consecutive",
      "start": 226.23,
      "end": 226.736
    },
    {
      "word": "failed",
      "start": 226.736,
      "end": 227.011
    },
    {
      "word": "health",
      "start": 227.011,
      "end": 227.287
    },
    {
      "word": "checks",
      "start": 227.287,
      "end": 227.563
    },
    {
      "word": "in",
      "start": 227.563,
      "end": 227.736
    },
    {
      "word": "a",
      "start": 227.736,
      "end": 227.908
    },
    {
      "word": "row",
      "start": 227.908,
      "end": 228.08
    },
    {
      "word": "before",
      "start": 228.08,
      "end": 228.356
    },
    {
      "word": "officially",
      "start": 228.356,
      "end": 228.816
    },
    {
      "word": "declaring",
      "start": 228.816,
      "end": 229.23
    },
    {
      "word": "a",
      "start": 229.23,
      "end": 229.402
    },
    {
      "word": "component",
      "start": 229.402,
      "end": 229.816
    },
    {
      "word": "dead.",
      "start": 229.816,
      "end": 230
    },
    {
      "word": "This",
      "start": 230,
      "end": 230.288
    },
    {
      "word": "is",
      "start": 230.288,
      "end": 230.559
    },
    {
      "word": "the",
      "start": 230.559,
      "end": 230.829
    },
    {
      "word": "sweet",
      "start": 230.829,
      "end": 231.189
    },
    {
      "word": "spot.",
      "start": 231.189,
      "end": 231.477
    },
    {
      "word": "It",
      "start": 231.477,
      "end": 231.748
    },
    {
      "word": "ensures",
      "start": 231.748,
      "end": 232.252
    },
    {
      "word": "we",
      "start": 232.252,
      "end": 232.523
    },
    {
      "word": "are",
      "start": 232.523,
      "end": 232.793
    },
    {
      "word": "not",
      "start": 232.793,
      "end": 233.063
    },
    {
      "word": "aggressively",
      "start": 233.063,
      "end": 233.928
    },
    {
      "word": "triggering",
      "start": 233.928,
      "end": 234.649
    },
    {
      "word": "a",
      "start": 234.649,
      "end": 234.919
    },
    {
      "word": "massive",
      "start": 234.919,
      "end": 235.423
    },
    {
      "word": "recovery",
      "start": 235.423,
      "end": 236
    },
    {
      "word": "just",
      "start": 236,
      "end": 236.189
    },
    {
      "word": "because",
      "start": 236.189,
      "end": 236.52
    },
    {
      "word": "of",
      "start": 236.52,
      "end": 236.697
    },
    {
      "word": "a",
      "start": 236.697,
      "end": 236.875
    },
    {
      "word": "momentary",
      "start": 236.875,
      "end": 237.3
    },
    {
      "word": "hiccup",
      "start": 237.3,
      "end": 237.584
    },
    {
      "word": "in",
      "start": 237.584,
      "end": 237.761
    },
    {
      "word": "the",
      "start": 237.761,
      "end": 237.939
    },
    {
      "word": "network,",
      "start": 237.939,
      "end": 238.27
    },
    {
      "word": "but",
      "start": 238.27,
      "end": 238.447
    },
    {
      "word": "we",
      "start": 238.447,
      "end": 238.624
    },
    {
      "word": "are",
      "start": 238.624,
      "end": 238.801
    },
    {
      "word": "still",
      "start": 238.801,
      "end": 239.038
    },
    {
      "word": "acting",
      "start": 239.038,
      "end": 239.322
    },
    {
      "word": "fast",
      "start": 239.322,
      "end": 239.511
    },
    {
      "word": "enough",
      "start": 239.511,
      "end": 239.794
    },
    {
      "word": "to",
      "start": 239.794,
      "end": 239.972
    },
    {
      "word": "save",
      "start": 239.972,
      "end": 240.161
    },
    {
      "word": "the",
      "start": 240.161,
      "end": 240.338
    },
    {
      "word": "user",
      "start": 240.338,
      "end": 240.527
    },
    {
      "word": "experience.",
      "start": 240.527,
      "end": 241
    },
    {
      "word": "Now",
      "start": 241,
      "end": 241.197
    },
    {
      "word": "let",
      "start": 241.197,
      "end": 241.394
    },
    {
      "word": "us",
      "start": 241.394,
      "end": 241.591
    },
    {
      "word": "talk",
      "start": 241.591,
      "end": 241.801
    },
    {
      "word": "about",
      "start": 241.801,
      "end": 242.063
    },
    {
      "word": "the",
      "start": 242.063,
      "end": 242.26
    },
    {
      "word": "actual",
      "start": 242.26,
      "end": 242.575
    },
    {
      "word": "infrastructure",
      "start": 242.575,
      "end": 243.31
    },
    {
      "word": "doing",
      "start": 243.31,
      "end": 243.572
    },
    {
      "word": "all",
      "start": 243.572,
      "end": 243.769
    },
    {
      "word": "this",
      "start": 243.769,
      "end": 243.979
    },
    {
      "word": "heavy",
      "start": 243.979,
      "end": 244.241
    },
    {
      "word": "lifting",
      "start": 244.241,
      "end": 244.609
    },
    {
      "word": "with",
      "start": 244.609,
      "end": 244.819
    },
    {
      "word": "the",
      "start": 244.819,
      "end": 245.016
    },
    {
      "word": "checking",
      "start": 245.016,
      "end": 245.436
    },
    {
      "word": "and",
      "start": 245.436,
      "end": 245.633
    },
    {
      "word": "routing.",
      "start": 245.633,
      "end": 246
    },
    {
      "word": "Section",
      "start": 246,
      "end": 246.656
    },
    {
      "word": "four,",
      "start": 246.656,
      "end": 247.031
    },
    {
      "word": "load",
      "start": 247.031,
      "end": 247.406
    },
    {
      "word": "balancers",
      "start": 247.406,
      "end": 248.25
    },
    {
      "word": "and",
      "start": 248.25,
      "end": 248.602
    },
    {
      "word": "recovery.",
      "start": 248.602,
      "end": 249.352
    },
    {
      "word": "In",
      "start": 249.352,
      "end": 249.703
    },
    {
      "word": "most",
      "start": 249.703,
      "end": 250.078
    },
    {
      "word": "modern",
      "start": 250.078,
      "end": 250.641
    },
    {
      "word": "distributed",
      "start": 250.641,
      "end": 251.672
    },
    {
      "word": "systems,",
      "start": 251.672,
      "end": 252.328
    },
    {
      "word": "load",
      "start": 252.328,
      "end": 252.703
    },
    {
      "word": "balancers",
      "start": 252.703,
      "end": 253.547
    },
    {
      "word": "are",
      "start": 253.547,
      "end": 253.898
    },
    {
      "word": "the",
      "start": 253.898,
      "end": 254.25
    },
    {
      "word": "real",
      "start": 254.25,
      "end": 254.625
    },
    {
      "word": "MVPs,",
      "start": 254.625,
      "end": 255
    },
    {
      "word": "actively",
      "start": 255,
      "end": 255.638
    },
    {
      "word": "using",
      "start": 255.638,
      "end": 256.037
    },
    {
      "word": "these",
      "start": 256.037,
      "end": 256.435
    },
    {
      "word": "health",
      "start": 256.435,
      "end": 256.914
    },
    {
      "word": "checks.",
      "start": 256.914,
      "end": 257.392
    },
    {
      "word": "And",
      "start": 257.392,
      "end": 257.691
    },
    {
      "word": "their",
      "start": 257.691,
      "end": 258.09
    },
    {
      "word": "workflow,",
      "start": 258.09,
      "end": 258.728
    },
    {
      "word": "it",
      "start": 258.728,
      "end": 259.027
    },
    {
      "word": "is",
      "start": 259.027,
      "end": 259.326
    },
    {
      "word": "honestly",
      "start": 259.326,
      "end": 259.963
    },
    {
      "word": "pretty",
      "start": 259.963,
      "end": 260.442
    },
    {
      "word": "elegant.",
      "start": 260.442,
      "end": 261
    },
    {
      "word": "First,",
      "start": 261,
      "end": 261.324
    },
    {
      "word": "they",
      "start": 261.324,
      "end": 261.583
    },
    {
      "word": "continuously",
      "start": 261.583,
      "end": 262.359
    },
    {
      "word": "ping",
      "start": 262.359,
      "end": 262.618
    },
    {
      "word": "the",
      "start": 262.618,
      "end": 262.861
    },
    {
      "word": "backend",
      "start": 262.861,
      "end": 263.314
    },
    {
      "word": "servers.",
      "start": 263.314,
      "end": 263.767
    },
    {
      "word": "Second,",
      "start": 263.767,
      "end": 264.155
    },
    {
      "word": "the",
      "start": 264.155,
      "end": 264.398
    },
    {
      "word": "moment",
      "start": 264.398,
      "end": 264.786
    },
    {
      "word": "a",
      "start": 264.786,
      "end": 265.029
    },
    {
      "word": "server",
      "start": 265.029,
      "end": 265.417
    },
    {
      "word": "looks",
      "start": 265.417,
      "end": 265.741
    },
    {
      "word": "sick,",
      "start": 265.741,
      "end": 266
    },
    {
      "word": "they",
      "start": 266,
      "end": 266.176
    },
    {
      "word": "dynamically",
      "start": 266.176,
      "end": 266.661
    },
    {
      "word": "yank",
      "start": 266.661,
      "end": 266.837
    },
    {
      "word": "it",
      "start": 266.837,
      "end": 267.002
    },
    {
      "word": "right",
      "start": 267.002,
      "end": 267.222
    },
    {
      "word": "out",
      "start": 267.222,
      "end": 267.388
    },
    {
      "word": "of",
      "start": 267.388,
      "end": 267.553
    },
    {
      "word": "the",
      "start": 267.553,
      "end": 267.718
    },
    {
      "word": "rotation.",
      "start": 267.718,
      "end": 268.07
    },
    {
      "word": "And",
      "start": 268.07,
      "end": 268.236
    },
    {
      "word": "third,",
      "start": 268.236,
      "end": 268.456
    },
    {
      "word": "they",
      "start": 268.456,
      "end": 268.632
    },
    {
      "word": "automatically",
      "start": 268.632,
      "end": 269.205
    },
    {
      "word": "put",
      "start": 269.205,
      "end": 269.37
    },
    {
      "word": "it",
      "start": 269.37,
      "end": 269.535
    },
    {
      "word": "back",
      "start": 269.535,
      "end": 269.711
    },
    {
      "word": "in",
      "start": 269.711,
      "end": 269.877
    },
    {
      "word": "once",
      "start": 269.877,
      "end": 270.053
    },
    {
      "word": "it",
      "start": 270.053,
      "end": 270.218
    },
    {
      "word": "is",
      "start": 270.218,
      "end": 270.383
    },
    {
      "word": "fully",
      "start": 270.383,
      "end": 270.604
    },
    {
      "word": "recovered.",
      "start": 270.604,
      "end": 271
    },
    {
      "word": "So",
      "start": 271,
      "end": 271.187
    },
    {
      "word": "imagine",
      "start": 271.187,
      "end": 271.536
    },
    {
      "word": "we",
      "start": 271.536,
      "end": 271.723
    },
    {
      "word": "have",
      "start": 271.723,
      "end": 271.923
    },
    {
      "word": "10",
      "start": 271.923,
      "end": 272.11
    },
    {
      "word": "FoodDash",
      "start": 272.11,
      "end": 272.509
    },
    {
      "word": "API",
      "start": 272.509,
      "end": 272.696
    },
    {
      "word": "servers.",
      "start": 272.696,
      "end": 273.045
    },
    {
      "word": "If",
      "start": 273.045,
      "end": 273.232
    },
    {
      "word": "one",
      "start": 273.232,
      "end": 273.419
    },
    {
      "word": "suddenly",
      "start": 273.419,
      "end": 273.818
    },
    {
      "word": "stops",
      "start": 273.818,
      "end": 274.067
    },
    {
      "word": "responding,",
      "start": 274.067,
      "end": 274.566
    },
    {
      "word": "the",
      "start": 274.566,
      "end": 274.753
    },
    {
      "word": "load",
      "start": 274.753,
      "end": 274.953
    },
    {
      "word": "balancer",
      "start": 274.953,
      "end": 275.352
    },
    {
      "word": "just",
      "start": 275.352,
      "end": 275.551
    },
    {
      "word": "instantly",
      "start": 275.551,
      "end": 276
    },
    {
      "word": "removes",
      "start": 276,
      "end": 276.345
    },
    {
      "word": "it.",
      "start": 276.345,
      "end": 276.529
    },
    {
      "word": "It",
      "start": 276.529,
      "end": 276.714
    },
    {
      "word": "makes",
      "start": 276.714,
      "end": 276.96
    },
    {
      "word": "sure",
      "start": 276.96,
      "end": 277.157
    },
    {
      "word": "any",
      "start": 277.157,
      "end": 277.342
    },
    {
      "word": "new",
      "start": 277.342,
      "end": 277.526
    },
    {
      "word": "hungry",
      "start": 277.526,
      "end": 277.822
    },
    {
      "word": "users",
      "start": 277.822,
      "end": 278.068
    },
    {
      "word": "only",
      "start": 278.068,
      "end": 278.265
    },
    {
      "word": "get",
      "start": 278.265,
      "end": 278.449
    },
    {
      "word": "routed",
      "start": 278.449,
      "end": 278.745
    },
    {
      "word": "to",
      "start": 278.745,
      "end": 278.929
    },
    {
      "word": "the",
      "start": 278.929,
      "end": 279.114
    },
    {
      "word": "nine",
      "start": 279.114,
      "end": 279.311
    },
    {
      "word": "healthy",
      "start": 279.311,
      "end": 279.655
    },
    {
      "word": "servers,",
      "start": 279.655,
      "end": 280
    },
    {
      "word": "at",
      "start": 280,
      "end": 280.227
    },
    {
      "word": "least",
      "start": 280.227,
      "end": 280.529
    },
    {
      "word": "until",
      "start": 280.529,
      "end": 280.831
    },
    {
      "word": "that",
      "start": 280.831,
      "end": 281.073
    },
    {
      "word": "broken",
      "start": 281.073,
      "end": 281.435
    },
    {
      "word": "one",
      "start": 281.435,
      "end": 281.662
    },
    {
      "word": "gets",
      "start": 281.662,
      "end": 281.903
    },
    {
      "word": "its",
      "start": 281.903,
      "end": 282.13
    },
    {
      "word": "act",
      "start": 282.13,
      "end": 282.356
    },
    {
      "word": "together.",
      "start": 282.356,
      "end": 282.84
    },
    {
      "word": "And",
      "start": 282.84,
      "end": 283.066
    },
    {
      "word": "honestly,",
      "start": 283.066,
      "end": 283.55
    },
    {
      "word": "this",
      "start": 283.55,
      "end": 283.792
    },
    {
      "word": "perfectly",
      "start": 283.792,
      "end": 284.335
    },
    {
      "word": "illustrates",
      "start": 284.335,
      "end": 285
    },
    {
      "word": "the",
      "start": 285,
      "end": 285.193
    },
    {
      "word": "crazy",
      "start": 285.193,
      "end": 285.45
    },
    {
      "word": "scalability",
      "start": 285.45,
      "end": 286.015
    },
    {
      "word": "of",
      "start": 286.015,
      "end": 286.208
    },
    {
      "word": "this",
      "start": 286.208,
      "end": 286.414
    },
    {
      "word": "concept,",
      "start": 286.414,
      "end": 286.774
    },
    {
      "word": "because",
      "start": 286.774,
      "end": 287.134
    },
    {
      "word": "this",
      "start": 287.134,
      "end": 287.339
    },
    {
      "word": "exact",
      "start": 287.339,
      "end": 287.596
    },
    {
      "word": "same",
      "start": 287.596,
      "end": 287.802
    },
    {
      "word": "detect",
      "start": 287.802,
      "end": 288.111
    },
    {
      "word": "and",
      "start": 288.111,
      "end": 288.303
    },
    {
      "word": "reroute",
      "start": 288.303,
      "end": 288.663
    },
    {
      "word": "principle",
      "start": 288.663,
      "end": 289.126
    },
    {
      "word": "applies",
      "start": 289.126,
      "end": 289.486
    },
    {
      "word": "everywhere.",
      "start": 289.486,
      "end": 290
    },
    {
      "word": "It",
      "start": 290,
      "end": 290.145
    },
    {
      "word": "does",
      "start": 290.145,
      "end": 290.3
    },
    {
      "word": "not",
      "start": 290.3,
      "end": 290.446
    },
    {
      "word": "matter",
      "start": 290.446,
      "end": 290.678
    },
    {
      "word": "if",
      "start": 290.678,
      "end": 290.823
    },
    {
      "word": "you",
      "start": 290.823,
      "end": 290.969
    },
    {
      "word": "are",
      "start": 290.969,
      "end": 291.114
    },
    {
      "word": "doing",
      "start": 291.114,
      "end": 291.308
    },
    {
      "word": "a",
      "start": 291.308,
      "end": 291.453
    },
    {
      "word": "really",
      "start": 291.453,
      "end": 291.685
    },
    {
      "word": "small",
      "start": 291.685,
      "end": 291.879
    },
    {
      "word": "scale",
      "start": 291.879,
      "end": 292.073
    },
    {
      "word": "failover,",
      "start": 292.073,
      "end": 292.383
    },
    {
      "word": "just",
      "start": 292.383,
      "end": 292.538
    },
    {
      "word": "swapping",
      "start": 292.538,
      "end": 292.847
    },
    {
      "word": "between",
      "start": 292.847,
      "end": 293.119
    },
    {
      "word": "two",
      "start": 293.119,
      "end": 293.264
    },
    {
      "word": "local",
      "start": 293.264,
      "end": 293.458
    },
    {
      "word": "backend",
      "start": 293.458,
      "end": 293.729
    },
    {
      "word": "servers,",
      "start": 293.729,
      "end": 294
    },
    {
      "word": "or",
      "start": 294,
      "end": 294.172
    },
    {
      "word": "a",
      "start": 294.172,
      "end": 294.345
    },
    {
      "word": "massive",
      "start": 294.345,
      "end": 294.667
    },
    {
      "word": "large",
      "start": 294.667,
      "end": 294.897
    },
    {
      "word": "scale",
      "start": 294.897,
      "end": 295.126
    },
    {
      "word": "failover,",
      "start": 295.126,
      "end": 295.494
    },
    {
      "word": "where",
      "start": 295.494,
      "end": 295.724
    },
    {
      "word": "you",
      "start": 295.724,
      "end": 295.897
    },
    {
      "word": "are",
      "start": 295.897,
      "end": 296.069
    },
    {
      "word": "shifting",
      "start": 296.069,
      "end": 296.437
    },
    {
      "word": "global",
      "start": 296.437,
      "end": 296.713
    },
    {
      "word": "traffic",
      "start": 296.713,
      "end": 297.034
    },
    {
      "word": "away",
      "start": 297.034,
      "end": 297.218
    },
    {
      "word": "from",
      "start": 297.218,
      "end": 297.402
    },
    {
      "word": "an",
      "start": 297.402,
      "end": 297.575
    },
    {
      "word": "entire",
      "start": 297.575,
      "end": 297.851
    },
    {
      "word": "unhealthy",
      "start": 297.851,
      "end": 298.264
    },
    {
      "word": "geographic",
      "start": 298.264,
      "end": 298.724
    },
    {
      "word": "region.",
      "start": 298.724,
      "end": 299
    },
    {
      "word": "We",
      "start": 299,
      "end": 299.177
    },
    {
      "word": "are",
      "start": 299.177,
      "end": 299.354
    },
    {
      "word": "talking",
      "start": 299.354,
      "end": 299.684
    },
    {
      "word": "about",
      "start": 299.684,
      "end": 299.92
    },
    {
      "word": "routing",
      "start": 299.92,
      "end": 300.251
    },
    {
      "word": "millions",
      "start": 300.251,
      "end": 300.628
    },
    {
      "word": "of",
      "start": 300.628,
      "end": 300.805
    },
    {
      "word": "users",
      "start": 300.805,
      "end": 301.041
    },
    {
      "word": "from",
      "start": 301.041,
      "end": 301.23
    },
    {
      "word": "a",
      "start": 301.23,
      "end": 301.407
    },
    {
      "word": "completely",
      "start": 301.407,
      "end": 301.879
    },
    {
      "word": "down",
      "start": 301.879,
      "end": 302.068
    },
    {
      "word": "data",
      "start": 302.068,
      "end": 302.257
    },
    {
      "word": "center",
      "start": 302.257,
      "end": 302.54
    },
    {
      "word": "in",
      "start": 302.54,
      "end": 302.717
    },
    {
      "word": "Mumbai,",
      "start": 302.717,
      "end": 303
    },
    {
      "word": "straight",
      "start": 303,
      "end": 303.413
    },
    {
      "word": "over",
      "start": 303.413,
      "end": 303.62
    },
    {
      "word": "to",
      "start": 303.62,
      "end": 303.814
    },
    {
      "word": "a",
      "start": 303.814,
      "end": 304.008
    },
    {
      "word": "healthy",
      "start": 304.008,
      "end": 304.37
    },
    {
      "word": "one",
      "start": 304.37,
      "end": 304.563
    },
    {
      "word": "in",
      "start": 304.563,
      "end": 304.757
    },
    {
      "word": "Singapore.",
      "start": 304.757,
      "end": 305.222
    },
    {
      "word": "At",
      "start": 305.222,
      "end": 305.416
    },
    {
      "word": "the",
      "start": 305.416,
      "end": 305.61
    },
    {
      "word": "end",
      "start": 305.61,
      "end": 305.804
    },
    {
      "word": "of",
      "start": 305.804,
      "end": 305.997
    },
    {
      "word": "the",
      "start": 305.997,
      "end": 306.191
    },
    {
      "word": "day,",
      "start": 306.191,
      "end": 306.385
    },
    {
      "word": "the",
      "start": 306.385,
      "end": 306.579
    },
    {
      "word": "core",
      "start": 306.579,
      "end": 306.786
    },
    {
      "word": "logic",
      "start": 306.786,
      "end": 307.044
    },
    {
      "word": "is",
      "start": 307.044,
      "end": 307.238
    },
    {
      "word": "exactly",
      "start": 307.238,
      "end": 307.599
    },
    {
      "word": "the",
      "start": 307.599,
      "end": 307.793
    },
    {
      "word": "same.",
      "start": 307.793,
      "end": 308
    },
    {
      "word": "But",
      "start": 308,
      "end": 308.184
    },
    {
      "word": "of",
      "start": 308.184,
      "end": 308.368
    },
    {
      "word": "course,",
      "start": 308.368,
      "end": 308.662
    },
    {
      "word": "building",
      "start": 308.662,
      "end": 309.054
    },
    {
      "word": "all",
      "start": 309.054,
      "end": 309.238
    },
    {
      "word": "this",
      "start": 309.238,
      "end": 309.434
    },
    {
      "word": "automated",
      "start": 309.434,
      "end": 309.875
    },
    {
      "word": "failover",
      "start": 309.875,
      "end": 310.267
    },
    {
      "word": "requires",
      "start": 310.267,
      "end": 310.659
    },
    {
      "word": "some",
      "start": 310.659,
      "end": 310.855
    },
    {
      "word": "really",
      "start": 310.855,
      "end": 311.15
    },
    {
      "word": "careful",
      "start": 311.15,
      "end": 311.493
    },
    {
      "word": "design",
      "start": 311.493,
      "end": 311.787
    },
    {
      "word": "around",
      "start": 311.787,
      "end": 312.081
    },
    {
      "word": "capacity",
      "start": 312.081,
      "end": 312.473
    },
    {
      "word": "and",
      "start": 312.473,
      "end": 312.657
    },
    {
      "word": "routing.",
      "start": 312.657,
      "end": 313
    },
    {
      "word": "And",
      "start": 313,
      "end": 313.269
    },
    {
      "word": "that",
      "start": 313.269,
      "end": 313.556
    },
    {
      "word": "leads",
      "start": 313.556,
      "end": 313.914
    },
    {
      "word": "us",
      "start": 313.914,
      "end": 314.183
    },
    {
      "word": "to",
      "start": 314.183,
      "end": 314.452
    },
    {
      "word": "our",
      "start": 314.452,
      "end": 314.72
    },
    {
      "word": "next",
      "start": 314.72,
      "end": 315.007
    },
    {
      "word": "section,",
      "start": 315.007,
      "end": 315.509
    },
    {
      "word": "chaos",
      "start": 315.509,
      "end": 315.867
    },
    {
      "word": "engineering",
      "start": 315.867,
      "end": 316.656
    },
    {
      "word": "and",
      "start": 316.656,
      "end": 316.925
    },
    {
      "word": "testing",
      "start": 316.925,
      "end": 317.427
    },
    {
      "word": "failover.",
      "start": 317.427,
      "end": 318
    },
    {
      "word": "There",
      "start": 318,
      "end": 318.375
    },
    {
      "word": "is",
      "start": 318.375,
      "end": 318.655
    },
    {
      "word": "an",
      "start": 318.655,
      "end": 318.936
    },
    {
      "word": "absolute",
      "start": 318.936,
      "end": 319.536
    },
    {
      "word": "golden",
      "start": 319.536,
      "end": 319.985
    },
    {
      "word": "rule",
      "start": 319.985,
      "end": 320.285
    },
    {
      "word": "in",
      "start": 320.285,
      "end": 320.566
    },
    {
      "word": "systems",
      "start": 320.566,
      "end": 321.09
    },
    {
      "word": "design,",
      "start": 321.09,
      "end": 321.539
    },
    {
      "word": "and",
      "start": 321.539,
      "end": 321.82
    },
    {
      "word": "it",
      "start": 321.82,
      "end": 322.101
    },
    {
      "word": "goes",
      "start": 322.101,
      "end": 322.401
    },
    {
      "word": "like",
      "start": 322.401,
      "end": 322.7
    },
    {
      "word": "this.",
      "start": 322.7,
      "end": 323
    },
    {
      "word": "The",
      "start": 323,
      "end": 323.182
    },
    {
      "word": "absolute",
      "start": 323.182,
      "end": 323.57
    },
    {
      "word": "worst",
      "start": 323.57,
      "end": 323.813
    },
    {
      "word": "time",
      "start": 323.813,
      "end": 324.007
    },
    {
      "word": "to",
      "start": 324.007,
      "end": 324.189
    },
    {
      "word": "discover",
      "start": 324.189,
      "end": 324.578
    },
    {
      "word": "your",
      "start": 324.578,
      "end": 324.772
    },
    {
      "word": "failover",
      "start": 324.772,
      "end": 325.16
    },
    {
      "word": "process",
      "start": 325.16,
      "end": 325.5
    },
    {
      "word": "is",
      "start": 325.5,
      "end": 325.682
    },
    {
      "word": "broken,",
      "start": 325.682,
      "end": 325.973
    },
    {
      "word": "is",
      "start": 325.973,
      "end": 326.155
    },
    {
      "word": "right",
      "start": 326.155,
      "end": 326.398
    },
    {
      "word": "in",
      "start": 326.398,
      "end": 326.58
    },
    {
      "word": "the",
      "start": 326.58,
      "end": 326.762
    },
    {
      "word": "middle",
      "start": 326.762,
      "end": 327.053
    },
    {
      "word": "of",
      "start": 327.053,
      "end": 327.235
    },
    {
      "word": "an",
      "start": 327.235,
      "end": 327.417
    },
    {
      "word": "actual",
      "start": 327.417,
      "end": 327.709
    },
    {
      "word": "outage.",
      "start": 327.709,
      "end": 328
    },
    {
      "word": "That",
      "start": 328,
      "end": 328.31
    },
    {
      "word": "is",
      "start": 328.31,
      "end": 328.601
    },
    {
      "word": "exactly",
      "start": 328.601,
      "end": 329.143
    },
    {
      "word": "why",
      "start": 329.143,
      "end": 329.434
    },
    {
      "word": "mature",
      "start": 329.434,
      "end": 329.899
    },
    {
      "word": "engineering",
      "start": 329.899,
      "end": 330.752
    },
    {
      "word": "teams",
      "start": 330.752,
      "end": 331.14
    },
    {
      "word": "practice",
      "start": 331.14,
      "end": 331.76
    },
    {
      "word": "chaos",
      "start": 331.76,
      "end": 332.147
    },
    {
      "word": "engineering.",
      "start": 332.147,
      "end": 333
    },
    {
      "word": "They",
      "start": 333,
      "end": 333.233
    },
    {
      "word": "run",
      "start": 333.233,
      "end": 333.452
    },
    {
      "word": "intense",
      "start": 333.452,
      "end": 333.86
    },
    {
      "word": "failover",
      "start": 333.86,
      "end": 334.327
    },
    {
      "word": "drills",
      "start": 334.327,
      "end": 334.676
    },
    {
      "word": "where",
      "start": 334.676,
      "end": 334.968
    },
    {
      "word": "they",
      "start": 334.968,
      "end": 335.201
    },
    {
      "word": "intentionally",
      "start": 335.201,
      "end": 335.959
    },
    {
      "word": "shut",
      "start": 335.959,
      "end": 336.192
    },
    {
      "word": "down",
      "start": 336.192,
      "end": 336.426
    },
    {
      "word": "servers,",
      "start": 336.426,
      "end": 336.834
    },
    {
      "word": "kill",
      "start": 336.834,
      "end": 337.067
    },
    {
      "word": "backend",
      "start": 337.067,
      "end": 337.475
    },
    {
      "word": "processes,",
      "start": 337.475,
      "end": 338
    },
    {
      "word": "or",
      "start": 338,
      "end": 338.218
    },
    {
      "word": "just",
      "start": 338.218,
      "end": 338.451
    },
    {
      "word": "sever",
      "start": 338.451,
      "end": 338.741
    },
    {
      "word": "network",
      "start": 338.741,
      "end": 339.148
    },
    {
      "word": "paths.",
      "start": 339.148,
      "end": 339.439
    },
    {
      "word": "It",
      "start": 339.439,
      "end": 339.657
    },
    {
      "word": "sounds",
      "start": 339.657,
      "end": 340.006
    },
    {
      "word": "crazy,",
      "start": 340.006,
      "end": 340.297
    },
    {
      "word": "right?",
      "start": 340.297,
      "end": 340.587
    },
    {
      "word": "But",
      "start": 340.587,
      "end": 340.805
    },
    {
      "word": "it",
      "start": 340.805,
      "end": 341.023
    },
    {
      "word": "is",
      "start": 341.023,
      "end": 341.241
    },
    {
      "word": "absolutely",
      "start": 341.241,
      "end": 341.823
    },
    {
      "word": "the",
      "start": 341.823,
      "end": 342.041
    },
    {
      "word": "only",
      "start": 342.041,
      "end": 342.273
    },
    {
      "word": "way",
      "start": 342.273,
      "end": 342.491
    },
    {
      "word": "to",
      "start": 342.491,
      "end": 342.709
    },
    {
      "word": "prove",
      "start": 342.709,
      "end": 343
    },
    {
      "word": "your",
      "start": 343,
      "end": 343.206
    },
    {
      "word": "recovery",
      "start": 343.206,
      "end": 343.617
    },
    {
      "word": "mechanisms",
      "start": 343.617,
      "end": 344.131
    },
    {
      "word": "actually",
      "start": 344.131,
      "end": 344.542
    },
    {
      "word": "work",
      "start": 344.542,
      "end": 344.748
    },
    {
      "word": "in",
      "start": 344.748,
      "end": 344.941
    },
    {
      "word": "the",
      "start": 344.941,
      "end": 345.134
    },
    {
      "word": "real",
      "start": 345.134,
      "end": 345.339
    },
    {
      "word": "world,",
      "start": 345.339,
      "end": 345.596
    },
    {
      "word": "long",
      "start": 345.596,
      "end": 345.802
    },
    {
      "word": "before",
      "start": 345.802,
      "end": 346.111
    },
    {
      "word": "real",
      "start": 346.111,
      "end": 346.316
    },
    {
      "word": "paying",
      "start": 346.316,
      "end": 346.625
    },
    {
      "word": "customers",
      "start": 346.625,
      "end": 347.087
    },
    {
      "word": "ever",
      "start": 347.087,
      "end": 347.293
    },
    {
      "word": "feel",
      "start": 347.293,
      "end": 347.499
    },
    {
      "word": "the",
      "start": 347.499,
      "end": 347.692
    },
    {
      "word": "impact.",
      "start": 347.692,
      "end": 348
    },
    {
      "word": "All",
      "start": 348,
      "end": 348.221
    },
    {
      "word": "right,",
      "start": 348.221,
      "end": 348.515
    },
    {
      "word": "let",
      "start": 348.515,
      "end": 348.735
    },
    {
      "word": "us",
      "start": 348.735,
      "end": 348.956
    },
    {
      "word": "do",
      "start": 348.956,
      "end": 349.176
    },
    {
      "word": "a",
      "start": 349.176,
      "end": 349.397
    },
    {
      "word": "really",
      "start": 349.397,
      "end": 349.75
    },
    {
      "word": "quick",
      "start": 349.75,
      "end": 350.044
    },
    {
      "word": "recap",
      "start": 350.044,
      "end": 350.338
    },
    {
      "word": "of",
      "start": 350.338,
      "end": 350.559
    },
    {
      "word": "everything",
      "start": 350.559,
      "end": 351.147
    },
    {
      "word": "we",
      "start": 351.147,
      "end": 351.368
    },
    {
      "word": "have",
      "start": 351.368,
      "end": 351.603
    },
    {
      "word": "covered",
      "start": 351.603,
      "end": 352.015
    },
    {
      "word": "in",
      "start": 352.015,
      "end": 352.235
    },
    {
      "word": "this",
      "start": 352.235,
      "end": 352.471
    },
    {
      "word": "explainer.",
      "start": 352.471,
      "end": 353
    },
    {
      "word": "First,",
      "start": 353,
      "end": 353.309
    },
    {
      "word": "health",
      "start": 353.309,
      "end": 353.679
    },
    {
      "word": "checks",
      "start": 353.679,
      "end": 354.049
    },
    {
      "word": "detect",
      "start": 354.049,
      "end": 354.42
    },
    {
      "word": "failures",
      "start": 354.42,
      "end": 354.914
    },
    {
      "word": "by",
      "start": 354.914,
      "end": 355.145
    },
    {
      "word": "making",
      "start": 355.145,
      "end": 355.515
    },
    {
      "word": "sure",
      "start": 355.515,
      "end": 355.762
    },
    {
      "word": "our",
      "start": 355.762,
      "end": 355.994
    },
    {
      "word": "systems",
      "start": 355.994,
      "end": 356.426
    },
    {
      "word": "can",
      "start": 356.426,
      "end": 356.657
    },
    {
      "word": "actually",
      "start": 356.657,
      "end": 357.151
    },
    {
      "word": "do",
      "start": 357.151,
      "end": 357.383
    },
    {
      "word": "useful",
      "start": 357.383,
      "end": 357.753
    },
    {
      "word": "work.",
      "start": 357.753,
      "end": 358
    },
    {
      "word": "Second,",
      "start": 358,
      "end": 358.346
    },
    {
      "word": "failover",
      "start": 358.346,
      "end": 358.807
    },
    {
      "word": "kicks",
      "start": 358.807,
      "end": 359.095
    },
    {
      "word": "in",
      "start": 359.095,
      "end": 359.311
    },
    {
      "word": "to",
      "start": 359.311,
      "end": 359.527
    },
    {
      "word": "automatically",
      "start": 359.527,
      "end": 360.277
    },
    {
      "word": "redirect",
      "start": 360.277,
      "end": 360.738
    },
    {
      "word": "the",
      "start": 360.738,
      "end": 360.954
    },
    {
      "word": "traffic.",
      "start": 360.954,
      "end": 361.357
    },
    {
      "word": "Third,",
      "start": 361.357,
      "end": 361.646
    },
    {
      "word": "we",
      "start": 361.646,
      "end": 361.862
    },
    {
      "word": "use",
      "start": 361.862,
      "end": 362.078
    },
    {
      "word": "strict",
      "start": 362.078,
      "end": 362.424
    },
    {
      "word": "thresholds",
      "start": 362.424,
      "end": 363
    },
    {
      "word": "to",
      "start": 363,
      "end": 363.19
    },
    {
      "word": "balance",
      "start": 363.19,
      "end": 363.546
    },
    {
      "word": "our",
      "start": 363.546,
      "end": 363.736
    },
    {
      "word": "recovery",
      "start": 363.736,
      "end": 364.142
    },
    {
      "word": "speed",
      "start": 364.142,
      "end": 364.396
    },
    {
      "word": "against",
      "start": 364.396,
      "end": 364.751
    },
    {
      "word": "the",
      "start": 364.751,
      "end": 364.942
    },
    {
      "word": "risk",
      "start": 364.942,
      "end": 365.145
    },
    {
      "word": "of",
      "start": 365.145,
      "end": 365.335
    },
    {
      "word": "false",
      "start": 365.335,
      "end": 365.589
    },
    {
      "word": "positives.",
      "start": 365.589,
      "end": 366.046
    },
    {
      "word": "Fourth,",
      "start": 366.046,
      "end": 366.35
    },
    {
      "word": "load",
      "start": 366.35,
      "end": 366.553
    },
    {
      "word": "balancers",
      "start": 366.553,
      "end": 367.01
    },
    {
      "word": "are",
      "start": 367.01,
      "end": 367.201
    },
    {
      "word": "the",
      "start": 367.201,
      "end": 367.391
    },
    {
      "word": "unsung",
      "start": 367.391,
      "end": 367.695
    },
    {
      "word": "heroes",
      "start": 367.695,
      "end": 368
    },
    {
      "word": "automating",
      "start": 368,
      "end": 368.608
    },
    {
      "word": "that",
      "start": 368.608,
      "end": 368.851
    },
    {
      "word": "recovery",
      "start": 368.851,
      "end": 369.337
    },
    {
      "word": "routing.",
      "start": 369.337,
      "end": 369.763
    },
    {
      "word": "And",
      "start": 369.763,
      "end": 369.991
    },
    {
      "word": "finally,",
      "start": 369.991,
      "end": 370.416
    },
    {
      "word": "failover",
      "start": 370.416,
      "end": 370.903
    },
    {
      "word": "absolutely",
      "start": 370.903,
      "end": 371.511
    },
    {
      "word": "100",
      "start": 371.511,
      "end": 371.739
    },
    {
      "word": "percent",
      "start": 371.739,
      "end": 372.164
    },
    {
      "word": "must",
      "start": 372.164,
      "end": 372.407
    },
    {
      "word": "be",
      "start": 372.407,
      "end": 372.635
    },
    {
      "word": "tested.",
      "start": 372.635,
      "end": 373
    },
    {
      "word": "So",
      "start": 373,
      "end": 373.19
    },
    {
      "word": "if",
      "start": 373.19,
      "end": 373.38
    },
    {
      "word": "you",
      "start": 373.38,
      "end": 373.57
    },
    {
      "word": "take",
      "start": 373.57,
      "end": 373.772
    },
    {
      "word": "away",
      "start": 373.772,
      "end": 373.975
    },
    {
      "word": "just",
      "start": 373.975,
      "end": 374.177
    },
    {
      "word": "one",
      "start": 374.177,
      "end": 374.367
    },
    {
      "word": "thing",
      "start": 374.367,
      "end": 374.62
    },
    {
      "word": "today,",
      "start": 374.62,
      "end": 374.873
    },
    {
      "word": "let",
      "start": 374.873,
      "end": 375.063
    },
    {
      "word": "it",
      "start": 375.063,
      "end": 375.253
    },
    {
      "word": "be",
      "start": 375.253,
      "end": 375.443
    },
    {
      "word": "this.",
      "start": 375.443,
      "end": 375.646
    },
    {
      "word": "True",
      "start": 375.646,
      "end": 375.848
    },
    {
      "word": "availability",
      "start": 375.848,
      "end": 376.456
    },
    {
      "word": "is",
      "start": 376.456,
      "end": 376.646
    },
    {
      "word": "not",
      "start": 376.646,
      "end": 376.835
    },
    {
      "word": "just",
      "start": 376.835,
      "end": 377.038
    },
    {
      "word": "having",
      "start": 377.038,
      "end": 377.342
    },
    {
      "word": "backup",
      "start": 377.342,
      "end": 377.646
    },
    {
      "word": "servers",
      "start": 377.646,
      "end": 378
    },
    {
      "word": "sitting",
      "start": 378,
      "end": 378.355
    },
    {
      "word": "in",
      "start": 378.355,
      "end": 378.546
    },
    {
      "word": "a",
      "start": 378.546,
      "end": 378.736
    },
    {
      "word": "closet",
      "start": 378.736,
      "end": 379.041
    },
    {
      "word": "somewhere.",
      "start": 379.041,
      "end": 379.497
    },
    {
      "word": "It",
      "start": 379.497,
      "end": 379.688
    },
    {
      "word": "is",
      "start": 379.688,
      "end": 379.878
    },
    {
      "word": "what",
      "start": 379.878,
      "end": 380.081
    },
    {
      "word": "happens",
      "start": 380.081,
      "end": 380.437
    },
    {
      "word": "when",
      "start": 380.437,
      "end": 380.64
    },
    {
      "word": "detection,",
      "start": 380.64,
      "end": 381.096
    },
    {
      "word": "routing,",
      "start": 381.096,
      "end": 381.452
    },
    {
      "word": "replication,",
      "start": 381.452,
      "end": 382.01
    },
    {
      "word": "and",
      "start": 382.01,
      "end": 382.201
    },
    {
      "word": "recovery",
      "start": 382.201,
      "end": 382.607
    },
    {
      "word": "all",
      "start": 382.607,
      "end": 382.797
    },
    {
      "word": "work",
      "start": 382.797,
      "end": 383
    },
    {
      "word": "completely",
      "start": 383,
      "end": 383.535
    },
    {
      "word": "seamlessly",
      "start": 383.535,
      "end": 384.07
    },
    {
      "word": "together.",
      "start": 384.07,
      "end": 384.497
    },
    {
      "word": "But",
      "start": 384.497,
      "end": 384.698
    },
    {
      "word": "you",
      "start": 384.698,
      "end": 384.898
    },
    {
      "word": "know,",
      "start": 384.898,
      "end": 385.112
    },
    {
      "word": "all",
      "start": 385.112,
      "end": 385.313
    },
    {
      "word": "of",
      "start": 385.313,
      "end": 385.513
    },
    {
      "word": "this",
      "start": 385.513,
      "end": 385.727
    },
    {
      "word": "leaves",
      "start": 385.727,
      "end": 386.048
    },
    {
      "word": "us",
      "start": 386.048,
      "end": 386.249
    },
    {
      "word": "with",
      "start": 386.249,
      "end": 386.463
    },
    {
      "word": "one",
      "start": 386.463,
      "end": 386.663
    },
    {
      "word": "really",
      "start": 386.663,
      "end": 386.984
    },
    {
      "word": "provocative",
      "start": 386.984,
      "end": 387.572
    },
    {
      "word": "question.",
      "start": 387.572,
      "end": 388
    },
    {
      "word": "Let",
      "start": 388,
      "end": 388.165
    },
    {
      "word": "us",
      "start": 388.165,
      "end": 388.33
    },
    {
      "word": "say",
      "start": 388.33,
      "end": 388.496
    },
    {
      "word": "our",
      "start": 388.496,
      "end": 388.661
    },
    {
      "word": "system",
      "start": 388.661,
      "end": 388.925
    },
    {
      "word": "does",
      "start": 388.925,
      "end": 389.101
    },
    {
      "word": "recover",
      "start": 389.101,
      "end": 389.41
    },
    {
      "word": "automatically",
      "start": 389.41,
      "end": 389.982
    },
    {
      "word": "and",
      "start": 389.982,
      "end": 390.148
    },
    {
      "word": "super",
      "start": 390.148,
      "end": 390.368
    },
    {
      "word": "fast.",
      "start": 390.368,
      "end": 390.544
    },
    {
      "word": "How",
      "start": 390.544,
      "end": 390.709
    },
    {
      "word": "do",
      "start": 390.709,
      "end": 390.874
    },
    {
      "word": "we",
      "start": 390.874,
      "end": 391.04
    },
    {
      "word": "actually",
      "start": 391.04,
      "end": 391.392
    },
    {
      "word": "measure",
      "start": 391.392,
      "end": 391.7
    },
    {
      "word": "how",
      "start": 391.7,
      "end": 391.866
    },
    {
      "word": "much",
      "start": 391.866,
      "end": 392.042
    },
    {
      "word": "downtime",
      "start": 392.042,
      "end": 392.394
    },
    {
      "word": "is",
      "start": 392.394,
      "end": 392.559
    },
    {
      "word": "acceptable?",
      "start": 392.559,
      "end": 393
    },
    {
      "word": "I",
      "start": 393,
      "end": 393.203
    },
    {
      "word": "mean,",
      "start": 393.203,
      "end": 393.42
    },
    {
      "word": "how",
      "start": 393.42,
      "end": 393.623
    },
    {
      "word": "do",
      "start": 393.623,
      "end": 393.827
    },
    {
      "word": "big",
      "start": 393.827,
      "end": 394.03
    },
    {
      "word": "tech",
      "start": 394.03,
      "end": 394.247
    },
    {
      "word": "companies",
      "start": 394.247,
      "end": 394.734
    },
    {
      "word": "define",
      "start": 394.734,
      "end": 395.06
    },
    {
      "word": "their",
      "start": 395.06,
      "end": 395.331
    },
    {
      "word": "targets",
      "start": 395.331,
      "end": 395.71
    },
    {
      "word": "and",
      "start": 395.71,
      "end": 395.913
    },
    {
      "word": "calculate",
      "start": 395.913,
      "end": 396.401
    },
    {
      "word": "the",
      "start": 396.401,
      "end": 396.604
    },
    {
      "word": "real",
      "start": 396.604,
      "end": 396.821
    },
    {
      "word": "world",
      "start": 396.821,
      "end": 397.092
    },
    {
      "word": "cost",
      "start": 397.092,
      "end": 397.309
    },
    {
      "word": "of",
      "start": 397.309,
      "end": 397.512
    },
    {
      "word": "being",
      "start": 397.512,
      "end": 397.783
    },
    {
      "word": "down?",
      "start": 397.783,
      "end": 398
    },
    {
      "word": "Well,",
      "start": 398,
      "end": 398.212
    },
    {
      "word": "you",
      "start": 398.212,
      "end": 398.41
    },
    {
      "word": "will",
      "start": 398.41,
      "end": 398.622
    },
    {
      "word": "have",
      "start": 398.622,
      "end": 398.833
    },
    {
      "word": "to",
      "start": 398.833,
      "end": 399.032
    },
    {
      "word": "join",
      "start": 399.032,
      "end": 399.243
    },
    {
      "word": "us",
      "start": 399.243,
      "end": 399.442
    },
    {
      "word": "in",
      "start": 399.442,
      "end": 399.64
    },
    {
      "word": "our",
      "start": 399.64,
      "end": 399.839
    },
    {
      "word": "next",
      "start": 399.839,
      "end": 400.05
    },
    {
      "word": "explainer",
      "start": 400.05,
      "end": 400.526
    },
    {
      "word": "to",
      "start": 400.526,
      "end": 400.725
    },
    {
      "word": "find",
      "start": 400.725,
      "end": 400.937
    },
    {
      "word": "out,",
      "start": 400.937,
      "end": 401.135
    },
    {
      "word": "because",
      "start": 401.135,
      "end": 401.505
    },
    {
      "word": "we",
      "start": 401.505,
      "end": 401.704
    },
    {
      "word": "are",
      "start": 401.704,
      "end": 401.902
    },
    {
      "word": "going",
      "start": 401.902,
      "end": 402.167
    },
    {
      "word": "to",
      "start": 402.167,
      "end": 402.365
    },
    {
      "word": "dive",
      "start": 402.365,
      "end": 402.577
    },
    {
      "word": "deep",
      "start": 402.577,
      "end": 402.788
    },
    {
      "word": "into",
      "start": 402.788,
      "end": 403
    },
    {
      "word": "availability",
      "start": 403,
      "end": 403.759
    },
    {
      "word": "targets,",
      "start": 403.759,
      "end": 404.203
    },
    {
      "word": "uptime",
      "start": 404.203,
      "end": 404.582
    },
    {
      "word": "percentages,",
      "start": 404.582,
      "end": 405.278
    },
    {
      "word": "and",
      "start": 405.278,
      "end": 405.516
    },
    {
      "word": "the",
      "start": 405.516,
      "end": 405.753
    },
    {
      "word": "famous",
      "start": 405.753,
      "end": 406.133
    },
    {
      "word": "nines.",
      "start": 406.133,
      "end": 406.449
    },
    {
      "word": "Make",
      "start": 406.449,
      "end": 406.703
    },
    {
      "word": "sure",
      "start": 406.703,
      "end": 406.956
    },
    {
      "word": "you",
      "start": 406.956,
      "end": 407.193
    },
    {
      "word": "hit",
      "start": 407.193,
      "end": 407.43
    },
    {
      "word": "subscribe",
      "start": 407.43,
      "end": 408
    },
    {
      "word": "so",
      "start": 408,
      "end": 409.444
    },
    {
      "word": "you",
      "start": 409.444,
      "end": 410.888
    },
    {
      "word": "do",
      "start": 410.888,
      "end": 412.332
    },
    {
      "word": "not",
      "start": 412.332,
      "end": 413.775
    },
    {
      "word": "miss",
      "start": 413.775,
      "end": 415.316
    },
    {
      "word": "it,",
      "start": 415.316,
      "end": 416.759
    },
    {
      "word": "and",
      "start": 416.759,
      "end": 418.203
    },
    {
      "word": "I",
      "start": 418.203,
      "end": 419.647
    },
    {
      "word": "will",
      "start": 419.647,
      "end": 421.187
    },
    {
      "word": "see",
      "start": 421.187,
      "end": 422.631
    },
    {
      "word": "you",
      "start": 422.631,
      "end": 424.075
    },
    {
      "word": "there.",
      "start": 424.075,
      "end": 426
    }
  ],
  "captionGroups": [
    {
      "start": 0,
      "end": 2.141,
      "words": [
        {
          "word": "Welcome",
          "start": 0,
          "end": 0.458
        },
        {
          "word": "back",
          "start": 0.458,
          "end": 0.719
        },
        {
          "word": "to",
          "start": 0.719,
          "end": 0.964
        },
        {
          "word": "Engineering",
          "start": 0.964,
          "end": 1.683
        },
        {
          "word": "Systems.",
          "start": 1.683,
          "end": 2.141
        }
      ]
    },
    {
      "start": 2.141,
      "end": 4.477,
      "words": [
        {
          "word": "Today,",
          "start": 2.141,
          "end": 2.467
        },
        {
          "word": "we're",
          "start": 2.467,
          "end": 2.794
        },
        {
          "word": "continuing",
          "start": 2.794,
          "end": 3.448
        },
        {
          "word": "our",
          "start": 3.448,
          "end": 3.693
        },
        {
          "word": "Availability",
          "start": 3.693,
          "end": 4.477
        }
      ]
    },
    {
      "start": 4.477,
      "end": 5,
      "words": [
        {
          "word": "Patterns",
          "start": 4.477,
          "end": 5
        }
      ]
    },
    {
      "start": 5,
      "end": 7.007,
      "words": [
        {
          "word": "Explainer,",
          "start": 5,
          "end": 5.623
        },
        {
          "word": "jumping",
          "start": 5.623,
          "end": 6.107
        },
        {
          "word": "right",
          "start": 6.107,
          "end": 6.453
        },
        {
          "word": "back",
          "start": 6.453,
          "end": 6.73
        },
        {
          "word": "into",
          "start": 6.73,
          "end": 7.007
        }
      ]
    },
    {
      "start": 7.007,
      "end": 9.256,
      "words": [
        {
          "word": "our",
          "start": 7.007,
          "end": 7.266
        },
        {
          "word": "real-world",
          "start": 7.266,
          "end": 7.958
        },
        {
          "word": "example",
          "start": 7.958,
          "end": 8.443
        },
        {
          "word": "of",
          "start": 8.443,
          "end": 8.702
        },
        {
          "word": "FoodDash",
          "start": 8.702,
          "end": 9.256
        }
      ]
    },
    {
      "start": 9.256,
      "end": 10,
      "words": [
        {
          "word": "to",
          "start": 9.256,
          "end": 9.516
        },
        {
          "word": "explore",
          "start": 9.516,
          "end": 10
        }
      ]
    },
    {
      "start": 10,
      "end": 12.213,
      "words": [
        {
          "word": "how",
          "start": 10,
          "end": 10.246
        },
        {
          "word": "systems",
          "start": 10.246,
          "end": 10.705
        },
        {
          "word": "automatically",
          "start": 10.705,
          "end": 11.557
        },
        {
          "word": "bounce",
          "start": 11.557,
          "end": 11.951
        },
        {
          "word": "back",
          "start": 11.951,
          "end": 12.213
        }
      ]
    },
    {
      "start": 12.213,
      "end": 13.705,
      "words": [
        {
          "word": "from",
          "start": 12.213,
          "end": 12.475
        },
        {
          "word": "failure.",
          "start": 12.475,
          "end": 12.934
        },
        {
          "word": "Now,",
          "start": 12.934,
          "end": 13.18
        },
        {
          "word": "last",
          "start": 13.18,
          "end": 13.443
        },
        {
          "word": "time,",
          "start": 13.443,
          "end": 13.705
        }
      ]
    },
    {
      "start": 13.705,
      "end": 15,
      "words": [
        {
          "word": "we",
          "start": 13.705,
          "end": 13.951
        },
        {
          "word": "upgraded",
          "start": 13.951,
          "end": 14.475
        },
        {
          "word": "FoodDash",
          "start": 14.475,
          "end": 15
        }
      ]
    },
    {
      "start": 15,
      "end": 17.104,
      "words": [
        {
          "word": "by",
          "start": 15,
          "end": 15.229
        },
        {
          "word": "adding",
          "start": 15.229,
          "end": 15.595
        },
        {
          "word": "redundancy",
          "start": 15.595,
          "end": 16.204
        },
        {
          "word": "and",
          "start": 16.204,
          "end": 16.433
        },
        {
          "word": "replication,",
          "start": 16.433,
          "end": 17.104
        }
      ]
    },
    {
      "start": 17.104,
      "end": 18.841,
      "words": [
        {
          "word": "right?",
          "start": 17.104,
          "end": 17.409
        },
        {
          "word": "We",
          "start": 17.409,
          "end": 17.637
        },
        {
          "word": "proved",
          "start": 17.637,
          "end": 18.003
        },
        {
          "word": "how",
          "start": 18.003,
          "end": 18.232
        },
        {
          "word": "absolutely",
          "start": 18.232,
          "end": 18.841
        }
      ]
    },
    {
      "start": 18.841,
      "end": 20,
      "words": [
        {
          "word": "crucial",
          "start": 18.841,
          "end": 19.268
        },
        {
          "word": "having",
          "start": 19.268,
          "end": 19.634
        },
        {
          "word": "backup",
          "start": 19.634,
          "end": 20
        }
      ]
    },
    {
      "start": 20,
      "end": 21.966,
      "words": [
        {
          "word": "infrastructure",
          "start": 20,
          "end": 20.949
        },
        {
          "word": "is.",
          "start": 20.949,
          "end": 21.203
        },
        {
          "word": "But,",
          "start": 21.203,
          "end": 21.458
        },
        {
          "word": "as",
          "start": 21.458,
          "end": 21.712
        },
        {
          "word": "we",
          "start": 21.712,
          "end": 21.966
        }
      ]
    },
    {
      "start": 21.966,
      "end": 23.475,
      "words": [
        {
          "word": "are",
          "start": 21.966,
          "end": 22.22
        },
        {
          "word": "about",
          "start": 22.22,
          "end": 22.559
        },
        {
          "word": "to",
          "start": 22.559,
          "end": 22.814
        },
        {
          "word": "see,",
          "start": 22.814,
          "end": 23.068
        },
        {
          "word": "having",
          "start": 23.068,
          "end": 23.475
        }
      ]
    },
    {
      "start": 23.475,
      "end": 25.068,
      "words": [
        {
          "word": "a",
          "start": 23.475,
          "end": 23.729
        },
        {
          "word": "backup",
          "start": 23.729,
          "end": 24.136
        },
        {
          "word": "is",
          "start": 24.136,
          "end": 24.39
        },
        {
          "word": "really",
          "start": 24.39,
          "end": 24.797
        },
        {
          "word": "only",
          "start": 24.797,
          "end": 25.068
        }
      ]
    },
    {
      "start": 25.068,
      "end": 26,
      "words": [
        {
          "word": "half",
          "start": 25.068,
          "end": 25.339
        },
        {
          "word": "the",
          "start": 25.339,
          "end": 25.593
        },
        {
          "word": "battle,",
          "start": 25.593,
          "end": 26
        }
      ]
    },
    {
      "start": 26,
      "end": 28.214,
      "words": [
        {
          "word": "because",
          "start": 26,
          "end": 26.5
        },
        {
          "word": "redundancy",
          "start": 26.5,
          "end": 27.214
        },
        {
          "word": "alone",
          "start": 27.214,
          "end": 27.571
        },
        {
          "word": "just",
          "start": 27.571,
          "end": 27.857
        },
        {
          "word": "isn't",
          "start": 27.857,
          "end": 28.214
        }
      ]
    },
    {
      "start": 28.214,
      "end": 29,
      "words": [
        {
          "word": "quite",
          "start": 28.214,
          "end": 28.571
        },
        {
          "word": "enough.",
          "start": 28.571,
          "end": 29
        }
      ]
    },
    {
      "start": 29,
      "end": 30.381,
      "words": [
        {
          "word": "Think",
          "start": 29,
          "end": 29.317
        },
        {
          "word": "about",
          "start": 29.317,
          "end": 29.635
        },
        {
          "word": "it",
          "start": 29.635,
          "end": 29.873
        },
        {
          "word": "like",
          "start": 29.873,
          "end": 30.127
        },
        {
          "word": "this.",
          "start": 30.127,
          "end": 30.381
        }
      ]
    },
    {
      "start": 30.381,
      "end": 32.317,
      "words": [
        {
          "word": "We",
          "start": 30.381,
          "end": 30.619
        },
        {
          "word": "have",
          "start": 30.619,
          "end": 30.873
        },
        {
          "word": "a",
          "start": 30.873,
          "end": 31.111
        },
        {
          "word": "perfectly",
          "start": 31.111,
          "end": 31.683
        },
        {
          "word": "replicated",
          "start": 31.683,
          "end": 32.317
        }
      ]
    },
    {
      "start": 32.317,
      "end": 34,
      "words": [
        {
          "word": "backup",
          "start": 32.317,
          "end": 32.698
        },
        {
          "word": "database",
          "start": 32.698,
          "end": 33.206
        },
        {
          "word": "ready",
          "start": 33.206,
          "end": 33.524
        },
        {
          "word": "to",
          "start": 33.524,
          "end": 33.762
        },
        {
          "word": "go.",
          "start": 33.762,
          "end": 34
        }
      ]
    },
    {
      "start": 34,
      "end": 35.312,
      "words": [
        {
          "word": "But",
          "start": 34,
          "end": 34.231
        },
        {
          "word": "how",
          "start": 34.231,
          "end": 34.463
        },
        {
          "word": "does",
          "start": 34.463,
          "end": 34.71
        },
        {
          "word": "the",
          "start": 34.71,
          "end": 34.941
        },
        {
          "word": "system",
          "start": 34.941,
          "end": 35.312
        }
      ]
    },
    {
      "start": 35.312,
      "end": 36.747,
      "words": [
        {
          "word": "actually",
          "start": 35.312,
          "end": 35.806
        },
        {
          "word": "know",
          "start": 35.806,
          "end": 36.052
        },
        {
          "word": "to",
          "start": 36.052,
          "end": 36.284
        },
        {
          "word": "use",
          "start": 36.284,
          "end": 36.515
        },
        {
          "word": "it?",
          "start": 36.515,
          "end": 36.747
        }
      ]
    },
    {
      "start": 36.747,
      "end": 38.398,
      "words": [
        {
          "word": "Sure,",
          "start": 36.747,
          "end": 36.994
        },
        {
          "word": "redundancy",
          "start": 36.994,
          "end": 37.611
        },
        {
          "word": "gives",
          "start": 37.611,
          "end": 37.92
        },
        {
          "word": "us",
          "start": 37.92,
          "end": 38.151
        },
        {
          "word": "that",
          "start": 38.151,
          "end": 38.398
        }
      ]
    },
    {
      "start": 38.398,
      "end": 39,
      "words": [
        {
          "word": "safety",
          "start": 38.398,
          "end": 38.769
        },
        {
          "word": "net.",
          "start": 38.769,
          "end": 39
        }
      ]
    },
    {
      "start": 39,
      "end": 40.393,
      "words": [
        {
          "word": "But",
          "start": 39,
          "end": 39.192
        },
        {
          "word": "without",
          "start": 39.192,
          "end": 39.55
        },
        {
          "word": "an",
          "start": 39.55,
          "end": 39.741
        },
        {
          "word": "automated",
          "start": 39.741,
          "end": 40.201
        },
        {
          "word": "way",
          "start": 40.201,
          "end": 40.393
        }
      ]
    },
    {
      "start": 40.393,
      "end": 41.633,
      "words": [
        {
          "word": "to",
          "start": 40.393,
          "end": 40.585
        },
        {
          "word": "detect",
          "start": 40.585,
          "end": 40.891
        },
        {
          "word": "a",
          "start": 40.891,
          "end": 41.083
        },
        {
          "word": "failure",
          "start": 41.083,
          "end": 41.441
        },
        {
          "word": "and",
          "start": 41.441,
          "end": 41.633
        }
      ]
    },
    {
      "start": 41.633,
      "end": 43,
      "words": [
        {
          "word": "actually",
          "start": 41.633,
          "end": 42.042
        },
        {
          "word": "redirect",
          "start": 42.042,
          "end": 42.45
        },
        {
          "word": "the",
          "start": 42.45,
          "end": 42.642
        },
        {
          "word": "traffic,",
          "start": 42.642,
          "end": 43
        }
      ]
    },
    {
      "start": 43,
      "end": 44.782,
      "words": [
        {
          "word": "our",
          "start": 43,
          "end": 43.252
        },
        {
          "word": "hungry",
          "start": 43.252,
          "end": 43.655
        },
        {
          "word": "FoodDash",
          "start": 43.655,
          "end": 44.193
        },
        {
          "word": "users",
          "start": 44.193,
          "end": 44.529
        },
        {
          "word": "are",
          "start": 44.529,
          "end": 44.782
        }
      ]
    },
    {
      "start": 44.782,
      "end": 46.378,
      "words": [
        {
          "word": "just",
          "start": 44.782,
          "end": 45.05
        },
        {
          "word": "stuck.",
          "start": 45.05,
          "end": 45.387
        },
        {
          "word": "They",
          "start": 45.387,
          "end": 45.655
        },
        {
          "word": "are",
          "start": 45.655,
          "end": 45.908
        },
        {
          "word": "waiting",
          "start": 45.908,
          "end": 46.378
        }
      ]
    },
    {
      "start": 46.378,
      "end": 48.008,
      "words": [
        {
          "word": "for",
          "start": 46.378,
          "end": 46.63
        },
        {
          "word": "a",
          "start": 46.63,
          "end": 46.882
        },
        {
          "word": "human",
          "start": 46.882,
          "end": 47.218
        },
        {
          "word": "engineer",
          "start": 47.218,
          "end": 47.756
        },
        {
          "word": "to",
          "start": 47.756,
          "end": 48.008
        }
      ]
    },
    {
      "start": 48.008,
      "end": 49,
      "words": [
        {
          "word": "notice",
          "start": 48.008,
          "end": 48.412
        },
        {
          "word": "the",
          "start": 48.412,
          "end": 48.664
        },
        {
          "word": "alert,",
          "start": 48.664,
          "end": 49
        }
      ]
    },
    {
      "start": 49,
      "end": 50.488,
      "words": [
        {
          "word": "grab",
          "start": 49,
          "end": 49.264
        },
        {
          "word": "their",
          "start": 49.264,
          "end": 49.595
        },
        {
          "word": "laptop,",
          "start": 49.595,
          "end": 49.992
        },
        {
          "word": "log",
          "start": 49.992,
          "end": 50.24
        },
        {
          "word": "in,",
          "start": 50.24,
          "end": 50.488
        }
      ]
    },
    {
      "start": 50.488,
      "end": 52.157,
      "words": [
        {
          "word": "and",
          "start": 50.488,
          "end": 50.736
        },
        {
          "word": "manually",
          "start": 50.736,
          "end": 51.264
        },
        {
          "word": "fix",
          "start": 51.264,
          "end": 51.512
        },
        {
          "word": "things.",
          "start": 51.512,
          "end": 51.909
        },
        {
          "word": "And",
          "start": 51.909,
          "end": 52.157
        }
      ]
    },
    {
      "start": 52.157,
      "end": 53.413,
      "words": [
        {
          "word": "let",
          "start": 52.157,
          "end": 52.405
        },
        {
          "word": "us",
          "start": 52.405,
          "end": 52.653
        },
        {
          "word": "be",
          "start": 52.653,
          "end": 52.901
        },
        {
          "word": "real,",
          "start": 52.901,
          "end": 53.165
        },
        {
          "word": "in",
          "start": 53.165,
          "end": 53.413
        }
      ]
    },
    {
      "start": 53.413,
      "end": 55,
      "words": [
        {
          "word": "modern",
          "start": 53.413,
          "end": 53.81
        },
        {
          "word": "distributed",
          "start": 53.81,
          "end": 54.537
        },
        {
          "word": "systems,",
          "start": 54.537,
          "end": 55
        }
      ]
    },
    {
      "start": 55,
      "end": 56.809,
      "words": [
        {
          "word": "humans",
          "start": 55,
          "end": 55.467
        },
        {
          "word": "are",
          "start": 55.467,
          "end": 55.759
        },
        {
          "word": "simply",
          "start": 55.759,
          "end": 56.226
        },
        {
          "word": "way",
          "start": 56.226,
          "end": 56.518
        },
        {
          "word": "too",
          "start": 56.518,
          "end": 56.809
        }
      ]
    },
    {
      "start": 56.809,
      "end": 58.482,
      "words": [
        {
          "word": "slow.",
          "start": 56.809,
          "end": 57.121
        },
        {
          "word": "So,",
          "start": 57.121,
          "end": 57.412
        },
        {
          "word": "that",
          "start": 57.412,
          "end": 57.724
        },
        {
          "word": "brings",
          "start": 57.724,
          "end": 58.191
        },
        {
          "word": "us",
          "start": 58.191,
          "end": 58.482
        }
      ]
    },
    {
      "start": 58.482,
      "end": 60,
      "words": [
        {
          "word": "to",
          "start": 58.482,
          "end": 58.774
        },
        {
          "word": "our",
          "start": 58.774,
          "end": 59.066
        },
        {
          "word": "first",
          "start": 59.066,
          "end": 59.455
        },
        {
          "word": "section,",
          "start": 59.455,
          "end": 60
        }
      ]
    },
    {
      "start": 60,
      "end": 61.663,
      "words": [
        {
          "word": "Health",
          "start": 60,
          "end": 60.305
        },
        {
          "word": "Checks",
          "start": 60.305,
          "end": 60.61
        },
        {
          "word": "and",
          "start": 60.61,
          "end": 60.8
        },
        {
          "word": "Detecting",
          "start": 60.8,
          "end": 61.257
        },
        {
          "word": "Failures.",
          "start": 61.257,
          "end": 61.663
        }
      ]
    },
    {
      "start": 61.663,
      "end": 62.641,
      "words": [
        {
          "word": "Let",
          "start": 61.663,
          "end": 61.854
        },
        {
          "word": "us",
          "start": 61.854,
          "end": 62.044
        },
        {
          "word": "dive",
          "start": 62.044,
          "end": 62.248
        },
        {
          "word": "into",
          "start": 62.248,
          "end": 62.451
        },
        {
          "word": "how",
          "start": 62.451,
          "end": 62.641
        }
      ]
    },
    {
      "start": 62.641,
      "end": 64,
      "words": [
        {
          "word": "we",
          "start": 62.641,
          "end": 62.832
        },
        {
          "word": "actually",
          "start": 62.832,
          "end": 63.238
        },
        {
          "word": "spot",
          "start": 63.238,
          "end": 63.441
        },
        {
          "word": "these",
          "start": 63.441,
          "end": 63.695
        },
        {
          "word": "issues",
          "start": 63.695,
          "end": 64
        }
      ]
    },
    {
      "start": 64,
      "end": 65.635,
      "words": [
        {
          "word": "the",
          "start": 64,
          "end": 64.261
        },
        {
          "word": "second",
          "start": 64.261,
          "end": 64.678
        },
        {
          "word": "they",
          "start": 64.678,
          "end": 64.957
        },
        {
          "word": "happen.",
          "start": 64.957,
          "end": 65.374
        },
        {
          "word": "At",
          "start": 65.374,
          "end": 65.635
        }
      ]
    },
    {
      "start": 65.635,
      "end": 67.2,
      "words": [
        {
          "word": "its",
          "start": 65.635,
          "end": 65.896
        },
        {
          "word": "core,",
          "start": 65.896,
          "end": 66.174
        },
        {
          "word": "a",
          "start": 66.174,
          "end": 66.435
        },
        {
          "word": "health",
          "start": 66.435,
          "end": 66.852
        },
        {
          "word": "check",
          "start": 66.852,
          "end": 67.2
        }
      ]
    },
    {
      "start": 67.2,
      "end": 69.043,
      "words": [
        {
          "word": "is",
          "start": 67.2,
          "end": 67.461
        },
        {
          "word": "a",
          "start": 67.461,
          "end": 67.722
        },
        {
          "word": "small,",
          "start": 67.722,
          "end": 68.07
        },
        {
          "word": "continuous",
          "start": 68.07,
          "end": 68.765
        },
        {
          "word": "test",
          "start": 68.765,
          "end": 69.043
        }
      ]
    },
    {
      "start": 69.043,
      "end": 70,
      "words": [
        {
          "word": "used",
          "start": 69.043,
          "end": 69.322
        },
        {
          "word": "to",
          "start": 69.322,
          "end": 69.583
        },
        {
          "word": "verify",
          "start": 69.583,
          "end": 70
        }
      ]
    },
    {
      "start": 70,
      "end": 71.8,
      "words": [
        {
          "word": "if",
          "start": 70,
          "end": 70.257
        },
        {
          "word": "a",
          "start": 70.257,
          "end": 70.514
        },
        {
          "word": "system",
          "start": 70.514,
          "end": 70.926
        },
        {
          "word": "component",
          "start": 70.926,
          "end": 71.543
        },
        {
          "word": "can",
          "start": 71.543,
          "end": 71.8
        }
      ]
    },
    {
      "start": 71.8,
      "end": 73.771,
      "words": [
        {
          "word": "still",
          "start": 71.8,
          "end": 72.143
        },
        {
          "word": "actually",
          "start": 72.143,
          "end": 72.691
        },
        {
          "word": "serve",
          "start": 72.691,
          "end": 73.034
        },
        {
          "word": "traffic.",
          "start": 73.034,
          "end": 73.514
        },
        {
          "word": "But",
          "start": 73.514,
          "end": 73.771
        }
      ]
    },
    {
      "start": 73.771,
      "end": 75.246,
      "words": [
        {
          "word": "here",
          "start": 73.771,
          "end": 74.046
        },
        {
          "word": "is",
          "start": 74.046,
          "end": 74.303
        },
        {
          "word": "what",
          "start": 74.303,
          "end": 74.577
        },
        {
          "word": "is",
          "start": 74.577,
          "end": 74.834
        },
        {
          "word": "really",
          "start": 74.834,
          "end": 75.246
        }
      ]
    },
    {
      "start": 75.246,
      "end": 76,
      "words": [
        {
          "word": "interesting.",
          "start": 75.246,
          "end": 76
        }
      ]
    },
    {
      "start": 76,
      "end": 77.182,
      "words": [
        {
          "word": "A",
          "start": 76,
          "end": 76.195
        },
        {
          "word": "good",
          "start": 76.195,
          "end": 76.403
        },
        {
          "word": "health",
          "start": 76.403,
          "end": 76.714
        },
        {
          "word": "check",
          "start": 76.714,
          "end": 76.974
        },
        {
          "word": "goes",
          "start": 76.974,
          "end": 77.182
        }
      ]
    },
    {
      "start": 77.182,
      "end": 78.455,
      "words": [
        {
          "word": "way",
          "start": 77.182,
          "end": 77.377
        },
        {
          "word": "beyond",
          "start": 77.377,
          "end": 77.688
        },
        {
          "word": "just",
          "start": 77.688,
          "end": 77.896
        },
        {
          "word": "pinging",
          "start": 77.896,
          "end": 78.26
        },
        {
          "word": "a",
          "start": 78.26,
          "end": 78.455
        }
      ]
    },
    {
      "start": 78.455,
      "end": 79.545,
      "words": [
        {
          "word": "server",
          "start": 78.455,
          "end": 78.766
        },
        {
          "word": "to",
          "start": 78.766,
          "end": 78.961
        },
        {
          "word": "see",
          "start": 78.961,
          "end": 79.156
        },
        {
          "word": "if",
          "start": 79.156,
          "end": 79.351
        },
        {
          "word": "it",
          "start": 79.351,
          "end": 79.545
        }
      ]
    },
    {
      "start": 79.545,
      "end": 80,
      "words": [
        {
          "word": "is",
          "start": 79.545,
          "end": 79.74
        },
        {
          "word": "awake.",
          "start": 79.74,
          "end": 80
        }
      ]
    },
    {
      "start": 80,
      "end": 81.53,
      "words": [
        {
          "word": "Why?",
          "start": 80,
          "end": 80.258
        },
        {
          "word": "Well,",
          "start": 80.258,
          "end": 80.533
        },
        {
          "word": "imagine",
          "start": 80.533,
          "end": 81.014
        },
        {
          "word": "an",
          "start": 81.014,
          "end": 81.272
        },
        {
          "word": "API",
          "start": 81.272,
          "end": 81.53
        }
      ]
    },
    {
      "start": 81.53,
      "end": 83.335,
      "words": [
        {
          "word": "returning",
          "start": 81.53,
          "end": 82.149
        },
        {
          "word": "a",
          "start": 82.149,
          "end": 82.407
        },
        {
          "word": "200",
          "start": 82.407,
          "end": 82.665
        },
        {
          "word": "OK",
          "start": 82.665,
          "end": 82.923
        },
        {
          "word": "status.",
          "start": 82.923,
          "end": 83.335
        }
      ]
    },
    {
      "start": 83.335,
      "end": 85.072,
      "words": [
        {
          "word": "It",
          "start": 83.335,
          "end": 83.593
        },
        {
          "word": "is",
          "start": 83.593,
          "end": 83.851
        },
        {
          "word": "happily",
          "start": 83.851,
          "end": 84.332
        },
        {
          "word": "telling",
          "start": 84.332,
          "end": 84.814
        },
        {
          "word": "you",
          "start": 84.814,
          "end": 85.072
        }
      ]
    },
    {
      "start": 85.072,
      "end": 86,
      "words": [
        {
          "word": "its",
          "start": 85.072,
          "end": 85.33
        },
        {
          "word": "web",
          "start": 85.33,
          "end": 85.587
        },
        {
          "word": "server",
          "start": 85.587,
          "end": 86
        }
      ]
    },
    {
      "start": 86,
      "end": 87.231,
      "words": [
        {
          "word": "is",
          "start": 86,
          "end": 86.19
        },
        {
          "word": "running.",
          "start": 86.19,
          "end": 86.546
        },
        {
          "word": "But",
          "start": 86.546,
          "end": 86.736
        },
        {
          "word": "behind",
          "start": 86.736,
          "end": 87.041
        },
        {
          "word": "the",
          "start": 87.041,
          "end": 87.231
        }
      ]
    },
    {
      "start": 87.231,
      "end": 88.779,
      "words": [
        {
          "word": "scenes,",
          "start": 87.231,
          "end": 87.536
        },
        {
          "word": "it",
          "start": 87.536,
          "end": 87.726
        },
        {
          "word": "is",
          "start": 87.726,
          "end": 87.916
        },
        {
          "word": "completely",
          "start": 87.916,
          "end": 88.424
        },
        {
          "word": "failing",
          "start": 88.424,
          "end": 88.779
        }
      ]
    },
    {
      "start": 88.779,
      "end": 89.959,
      "words": [
        {
          "word": "to",
          "start": 88.779,
          "end": 88.97
        },
        {
          "word": "talk",
          "start": 88.97,
          "end": 89.173
        },
        {
          "word": "to",
          "start": 89.173,
          "end": 89.363
        },
        {
          "word": "a",
          "start": 89.363,
          "end": 89.553
        },
        {
          "word": "critical",
          "start": 89.553,
          "end": 89.959
        }
      ]
    },
    {
      "start": 89.959,
      "end": 91,
      "words": [
        {
          "word": "database",
          "start": 89.959,
          "end": 90.365
        },
        {
          "word": "or",
          "start": 90.365,
          "end": 90.556
        },
        {
          "word": "a",
          "start": 90.556,
          "end": 90.746
        },
        {
          "word": "cache",
          "start": 90.746,
          "end": 91
        }
      ]
    },
    {
      "start": 91,
      "end": 92.382,
      "words": [
        {
          "word": "like",
          "start": 91,
          "end": 91.27
        },
        {
          "word": "Redis.",
          "start": 91.27,
          "end": 91.607
        },
        {
          "word": "So",
          "start": 91.607,
          "end": 91.86
        },
        {
          "word": "yeah,",
          "start": 91.86,
          "end": 92.129
        },
        {
          "word": "it",
          "start": 92.129,
          "end": 92.382
        }
      ]
    },
    {
      "start": 92.382,
      "end": 94.219,
      "words": [
        {
          "word": "is",
          "start": 92.382,
          "end": 92.635
        },
        {
          "word": "technically",
          "start": 92.635,
          "end": 93.376
        },
        {
          "word": "alive,",
          "start": 93.376,
          "end": 93.713
        },
        {
          "word": "but",
          "start": 93.713,
          "end": 93.966
        },
        {
          "word": "it",
          "start": 93.966,
          "end": 94.219
        }
      ]
    },
    {
      "start": 94.219,
      "end": 96.191,
      "words": [
        {
          "word": "is",
          "start": 94.219,
          "end": 94.472
        },
        {
          "word": "practically",
          "start": 94.472,
          "end": 95.213
        },
        {
          "word": "useless",
          "start": 95.213,
          "end": 95.685
        },
        {
          "word": "to",
          "start": 95.685,
          "end": 95.938
        },
        {
          "word": "the",
          "start": 95.938,
          "end": 96.191
        }
      ]
    },
    {
      "start": 96.191,
      "end": 97,
      "words": [
        {
          "word": "person",
          "start": 96.191,
          "end": 96.596
        },
        {
          "word": "trying",
          "start": 96.596,
          "end": 97
        }
      ]
    },
    {
      "start": 97,
      "end": 98.38,
      "words": [
        {
          "word": "to",
          "start": 97,
          "end": 97.244
        },
        {
          "word": "order",
          "start": 97.244,
          "end": 97.568
        },
        {
          "word": "a",
          "start": 97.568,
          "end": 97.812
        },
        {
          "word": "pizza.",
          "start": 97.812,
          "end": 98.136
        },
        {
          "word": "To",
          "start": 98.136,
          "end": 98.38
        }
      ]
    },
    {
      "start": 98.38,
      "end": 100.588,
      "words": [
        {
          "word": "solve",
          "start": 98.38,
          "end": 98.705
        },
        {
          "word": "this",
          "start": 98.705,
          "end": 98.964
        },
        {
          "word": "problem,",
          "start": 98.964,
          "end": 99.419
        },
        {
          "word": "engineers",
          "start": 99.419,
          "end": 100.003
        },
        {
          "word": "structure",
          "start": 100.003,
          "end": 100.588
        }
      ]
    },
    {
      "start": 100.588,
      "end": 102,
      "words": [
        {
          "word": "health",
          "start": 100.588,
          "end": 100.977
        },
        {
          "word": "checks",
          "start": 100.977,
          "end": 101.367
        },
        {
          "word": "in",
          "start": 101.367,
          "end": 101.61
        },
        {
          "word": "layers.",
          "start": 101.61,
          "end": 102
        }
      ]
    },
    {
      "start": 102,
      "end": 102.984,
      "words": [
        {
          "word": "It",
          "start": 102,
          "end": 102.192
        },
        {
          "word": "is",
          "start": 102.192,
          "end": 102.383
        },
        {
          "word": "kind",
          "start": 102.383,
          "end": 102.588
        },
        {
          "word": "of",
          "start": 102.588,
          "end": 102.78
        },
        {
          "word": "like",
          "start": 102.78,
          "end": 102.984
        }
      ]
    },
    {
      "start": 102.984,
      "end": 104.121,
      "words": [
        {
          "word": "a",
          "start": 102.984,
          "end": 103.176
        },
        {
          "word": "pyramid.",
          "start": 103.176,
          "end": 103.534
        },
        {
          "word": "At",
          "start": 103.534,
          "end": 103.725
        },
        {
          "word": "the",
          "start": 103.725,
          "end": 103.917
        },
        {
          "word": "very",
          "start": 103.917,
          "end": 104.121
        }
      ]
    },
    {
      "start": 104.121,
      "end": 105.54,
      "words": [
        {
          "word": "bottom,",
          "start": 104.121,
          "end": 104.428
        },
        {
          "word": "we",
          "start": 104.428,
          "end": 104.62
        },
        {
          "word": "check",
          "start": 104.62,
          "end": 104.875
        },
        {
          "word": "process",
          "start": 104.875,
          "end": 105.233
        },
        {
          "word": "health.",
          "start": 105.233,
          "end": 105.54
        }
      ]
    },
    {
      "start": 105.54,
      "end": 106,
      "words": [
        {
          "word": "Basically,",
          "start": 105.54,
          "end": 106
        }
      ]
    },
    {
      "start": 106,
      "end": 107.178,
      "words": [
        {
          "word": "is",
          "start": 106,
          "end": 106.175
        },
        {
          "word": "the",
          "start": 106.175,
          "end": 106.35
        },
        {
          "word": "process",
          "start": 106.35,
          "end": 106.676
        },
        {
          "word": "running",
          "start": 106.676,
          "end": 107.003
        },
        {
          "word": "and",
          "start": 107.003,
          "end": 107.178
        }
      ]
    },
    {
      "start": 107.178,
      "end": 108.087,
      "words": [
        {
          "word": "is",
          "start": 107.178,
          "end": 107.353
        },
        {
          "word": "the",
          "start": 107.353,
          "end": 107.528
        },
        {
          "word": "port",
          "start": 107.528,
          "end": 107.714
        },
        {
          "word": "open?",
          "start": 107.714,
          "end": 107.901
        },
        {
          "word": "Move",
          "start": 107.901,
          "end": 108.087
        }
      ]
    },
    {
      "start": 108.087,
      "end": 109.02,
      "words": [
        {
          "word": "up",
          "start": 108.087,
          "end": 108.262
        },
        {
          "word": "a",
          "start": 108.262,
          "end": 108.437
        },
        {
          "word": "level,",
          "start": 108.437,
          "end": 108.671
        },
        {
          "word": "and",
          "start": 108.671,
          "end": 108.845
        },
        {
          "word": "we",
          "start": 108.845,
          "end": 109.02
        }
      ]
    },
    {
      "start": 109.02,
      "end": 110,
      "words": [
        {
          "word": "have",
          "start": 109.02,
          "end": 109.207
        },
        {
          "word": "application",
          "start": 109.207,
          "end": 109.72
        },
        {
          "word": "health.",
          "start": 109.72,
          "end": 110
        }
      ]
    },
    {
      "start": 110,
      "end": 111.114,
      "words": [
        {
          "word": "Can",
          "start": 110,
          "end": 110.22
        },
        {
          "word": "the",
          "start": 110.22,
          "end": 110.44
        },
        {
          "word": "app",
          "start": 110.44,
          "end": 110.659
        },
        {
          "word": "load",
          "start": 110.659,
          "end": 110.894
        },
        {
          "word": "its",
          "start": 110.894,
          "end": 111.114
        }
      ]
    },
    {
      "start": 111.114,
      "end": 112.842,
      "words": [
        {
          "word": "configs",
          "start": 111.114,
          "end": 111.524
        },
        {
          "word": "and",
          "start": 111.524,
          "end": 111.744
        },
        {
          "word": "reach",
          "start": 111.744,
          "end": 112.037
        },
        {
          "word": "its",
          "start": 112.037,
          "end": 112.256
        },
        {
          "word": "downstream",
          "start": 112.256,
          "end": 112.842
        }
      ]
    },
    {
      "start": 112.842,
      "end": 114,
      "words": [
        {
          "word": "dependencies?",
          "start": 112.842,
          "end": 113.546
        },
        {
          "word": "And",
          "start": 113.546,
          "end": 113.766
        },
        {
          "word": "then,",
          "start": 113.766,
          "end": 114
        }
      ]
    },
    {
      "start": 114,
      "end": 115.258,
      "words": [
        {
          "word": "right",
          "start": 114,
          "end": 114.314
        },
        {
          "word": "at",
          "start": 114.314,
          "end": 114.55
        },
        {
          "word": "the",
          "start": 114.55,
          "end": 114.786
        },
        {
          "word": "top,",
          "start": 114.786,
          "end": 115.022
        },
        {
          "word": "the",
          "start": 115.022,
          "end": 115.258
        }
      ]
    },
    {
      "start": 115.258,
      "end": 117.129,
      "words": [
        {
          "word": "ultimate",
          "start": 115.258,
          "end": 115.761
        },
        {
          "word": "test,",
          "start": 115.761,
          "end": 116.013
        },
        {
          "word": "business",
          "start": 116.013,
          "end": 116.516
        },
        {
          "word": "health.",
          "start": 116.516,
          "end": 116.893
        },
        {
          "word": "Can",
          "start": 116.893,
          "end": 117.129
        }
      ]
    },
    {
      "start": 117.129,
      "end": 119,
      "words": [
        {
          "word": "FoodDash",
          "start": 117.129,
          "end": 117.632
        },
        {
          "word": "actually",
          "start": 117.632,
          "end": 118.135
        },
        {
          "word": "place",
          "start": 118.135,
          "end": 118.45
        },
        {
          "word": "an",
          "start": 118.45,
          "end": 118.686
        },
        {
          "word": "order?",
          "start": 118.686,
          "end": 119
        }
      ]
    },
    {
      "start": 119,
      "end": 120.755,
      "words": [
        {
          "word": "Can",
          "start": 119,
          "end": 119.233
        },
        {
          "word": "it",
          "start": 119.233,
          "end": 119.466
        },
        {
          "word": "calculate",
          "start": 119.466,
          "end": 120.025
        },
        {
          "word": "the",
          "start": 120.025,
          "end": 120.258
        },
        {
          "word": "delivery",
          "start": 120.258,
          "end": 120.755
        }
      ]
    },
    {
      "start": 120.755,
      "end": 122.214,
      "words": [
        {
          "word": "fee?",
          "start": 120.755,
          "end": 120.988
        },
        {
          "word": "The",
          "start": 120.988,
          "end": 121.22
        },
        {
          "word": "huge",
          "start": 121.22,
          "end": 121.469
        },
        {
          "word": "takeaway",
          "start": 121.469,
          "end": 121.966
        },
        {
          "word": "here",
          "start": 121.966,
          "end": 122.214
        }
      ]
    },
    {
      "start": 122.214,
      "end": 124,
      "words": [
        {
          "word": "is",
          "start": 122.214,
          "end": 122.447
        },
        {
          "word": "that",
          "start": 122.447,
          "end": 122.696
        },
        {
          "word": "true",
          "start": 122.696,
          "end": 122.944
        },
        {
          "word": "availability",
          "start": 122.944,
          "end": 123.689
        },
        {
          "word": "means",
          "start": 123.689,
          "end": 124
        }
      ]
    },
    {
      "start": 124,
      "end": 126.145,
      "words": [
        {
          "word": "the",
          "start": 124,
          "end": 124.264
        },
        {
          "word": "system",
          "start": 124.264,
          "end": 124.686
        },
        {
          "word": "can",
          "start": 124.686,
          "end": 124.949
        },
        {
          "word": "successfully",
          "start": 124.949,
          "end": 125.793
        },
        {
          "word": "serve",
          "start": 125.793,
          "end": 126.145
        }
      ]
    },
    {
      "start": 126.145,
      "end": 127.481,
      "words": [
        {
          "word": "the",
          "start": 126.145,
          "end": 126.409
        },
        {
          "word": "user.",
          "start": 126.409,
          "end": 126.69
        },
        {
          "word": "It",
          "start": 126.69,
          "end": 126.954
        },
        {
          "word": "is",
          "start": 126.954,
          "end": 127.218
        },
        {
          "word": "not",
          "start": 127.218,
          "end": 127.481
        }
      ]
    },
    {
      "start": 127.481,
      "end": 129.363,
      "words": [
        {
          "word": "just",
          "start": 127.481,
          "end": 127.763
        },
        {
          "word": "about",
          "start": 127.763,
          "end": 128.114
        },
        {
          "word": "keeping",
          "start": 128.114,
          "end": 128.607
        },
        {
          "word": "a",
          "start": 128.607,
          "end": 128.87
        },
        {
          "word": "machine",
          "start": 128.87,
          "end": 129.363
        }
      ]
    },
    {
      "start": 129.363,
      "end": 130.945,
      "words": [
        {
          "word": "powered",
          "start": 129.363,
          "end": 129.855
        },
        {
          "word": "on",
          "start": 129.855,
          "end": 130.119
        },
        {
          "word": "in",
          "start": 130.119,
          "end": 130.382
        },
        {
          "word": "some",
          "start": 130.382,
          "end": 130.664
        },
        {
          "word": "data",
          "start": 130.664,
          "end": 130.945
        }
      ]
    },
    {
      "start": 130.945,
      "end": 132,
      "words": [
        {
          "word": "center",
          "start": 130.945,
          "end": 131.367
        },
        {
          "word": "somewhere.",
          "start": 131.367,
          "end": 132
        }
      ]
    },
    {
      "start": 132,
      "end": 133.247,
      "words": [
        {
          "word": "OK,",
          "start": 132,
          "end": 132.176
        },
        {
          "word": "so",
          "start": 132.176,
          "end": 132.353
        },
        {
          "word": "what",
          "start": 132.353,
          "end": 132.541
        },
        {
          "word": "actually",
          "start": 132.541,
          "end": 132.918
        },
        {
          "word": "happens",
          "start": 132.918,
          "end": 133.247
        }
      ]
    },
    {
      "start": 133.247,
      "end": 134.306,
      "words": [
        {
          "word": "when",
          "start": 133.247,
          "end": 133.435
        },
        {
          "word": "one",
          "start": 133.435,
          "end": 133.612
        },
        {
          "word": "of",
          "start": 133.612,
          "end": 133.788
        },
        {
          "word": "those",
          "start": 133.788,
          "end": 134.024
        },
        {
          "word": "health",
          "start": 134.024,
          "end": 134.306
        }
      ]
    },
    {
      "start": 134.306,
      "end": 135.671,
      "words": [
        {
          "word": "checks",
          "start": 134.306,
          "end": 134.588
        },
        {
          "word": "repeatedly",
          "start": 134.588,
          "end": 135.059
        },
        {
          "word": "fails?",
          "start": 135.059,
          "end": 135.294
        },
        {
          "word": "Well,",
          "start": 135.294,
          "end": 135.482
        },
        {
          "word": "that",
          "start": 135.482,
          "end": 135.671
        }
      ]
    },
    {
      "start": 135.671,
      "end": 136.671,
      "words": [
        {
          "word": "brings",
          "start": 135.671,
          "end": 135.953
        },
        {
          "word": "us",
          "start": 135.953,
          "end": 136.129
        },
        {
          "word": "to",
          "start": 136.129,
          "end": 136.306
        },
        {
          "word": "our",
          "start": 136.306,
          "end": 136.482
        },
        {
          "word": "next",
          "start": 136.482,
          "end": 136.671
        }
      ]
    },
    {
      "start": 136.671,
      "end": 137,
      "words": [
        {
          "word": "section,",
          "start": 136.671,
          "end": 137
        }
      ]
    },
    {
      "start": 137,
      "end": 139.165,
      "words": [
        {
          "word": "failover",
          "start": 137,
          "end": 137.447
        },
        {
          "word": "and",
          "start": 137.447,
          "end": 137.656
        },
        {
          "word": "automatic",
          "start": 137.656,
          "end": 138.159
        },
        {
          "word": "traffic",
          "start": 138.159,
          "end": 138.55
        },
        {
          "word": "redirection.",
          "start": 138.55,
          "end": 139.165
        }
      ]
    },
    {
      "start": 139.165,
      "end": 140.226,
      "words": [
        {
          "word": "Let",
          "start": 139.165,
          "end": 139.374
        },
        {
          "word": "us",
          "start": 139.374,
          "end": 139.584
        },
        {
          "word": "see",
          "start": 139.584,
          "end": 139.793
        },
        {
          "word": "how",
          "start": 139.793,
          "end": 140.003
        },
        {
          "word": "this",
          "start": 140.003,
          "end": 140.226
        }
      ]
    },
    {
      "start": 140.226,
      "end": 141.777,
      "words": [
        {
          "word": "builds",
          "start": 140.226,
          "end": 140.561
        },
        {
          "word": "into",
          "start": 140.561,
          "end": 140.785
        },
        {
          "word": "an",
          "start": 140.785,
          "end": 140.994
        },
        {
          "word": "actual",
          "start": 140.994,
          "end": 141.33
        },
        {
          "word": "recovery",
          "start": 141.33,
          "end": 141.777
        }
      ]
    },
    {
      "start": 141.777,
      "end": 142,
      "words": [
        {
          "word": "plan.",
          "start": 141.777,
          "end": 142
        }
      ]
    },
    {
      "start": 142,
      "end": 143.658,
      "words": [
        {
          "word": "Remember",
          "start": 142,
          "end": 142.405
        },
        {
          "word": "our",
          "start": 142.405,
          "end": 142.595
        },
        {
          "word": "active",
          "start": 142.595,
          "end": 142.899
        },
        {
          "word": "passive",
          "start": 142.899,
          "end": 143.253
        },
        {
          "word": "FoodDash",
          "start": 143.253,
          "end": 143.658
        }
      ]
    },
    {
      "start": 143.658,
      "end": 145.43,
      "words": [
        {
          "word": "database",
          "start": 143.658,
          "end": 144.063
        },
        {
          "word": "setup?",
          "start": 144.063,
          "end": 144.316
        },
        {
          "word": "Automatic",
          "start": 144.316,
          "end": 144.772
        },
        {
          "word": "failover",
          "start": 144.772,
          "end": 145.177
        },
        {
          "word": "there",
          "start": 145.177,
          "end": 145.43
        }
      ]
    },
    {
      "start": 145.43,
      "end": 147,
      "words": [
        {
          "word": "follows",
          "start": 145.43,
          "end": 145.785
        },
        {
          "word": "three",
          "start": 145.785,
          "end": 146.038
        },
        {
          "word": "really",
          "start": 146.038,
          "end": 146.342
        },
        {
          "word": "distinct",
          "start": 146.342,
          "end": 146.747
        },
        {
          "word": "steps.",
          "start": 146.747,
          "end": 147
        }
      ]
    },
    {
      "start": 147,
      "end": 148.321,
      "words": [
        {
          "word": "Step",
          "start": 147,
          "end": 147.216
        },
        {
          "word": "one,",
          "start": 147.216,
          "end": 147.418
        },
        {
          "word": "the",
          "start": 147.418,
          "end": 147.62
        },
        {
          "word": "system",
          "start": 147.62,
          "end": 147.943
        },
        {
          "word": "detects",
          "start": 147.943,
          "end": 148.321
        }
      ]
    },
    {
      "start": 148.321,
      "end": 149.925,
      "words": [
        {
          "word": "multiple",
          "start": 148.321,
          "end": 148.752
        },
        {
          "word": "failed",
          "start": 148.752,
          "end": 149.075
        },
        {
          "word": "health",
          "start": 149.075,
          "end": 149.399
        },
        {
          "word": "checks",
          "start": 149.399,
          "end": 149.722
        },
        {
          "word": "and",
          "start": 149.722,
          "end": 149.925
        }
      ]
    },
    {
      "start": 149.925,
      "end": 151.582,
      "words": [
        {
          "word": "realizes",
          "start": 149.925,
          "end": 150.356
        },
        {
          "word": "that",
          "start": 150.356,
          "end": 150.571
        },
        {
          "word": "the",
          "start": 150.571,
          "end": 150.774
        },
        {
          "word": "primary",
          "start": 150.774,
          "end": 151.151
        },
        {
          "word": "database",
          "start": 151.151,
          "end": 151.582
        }
      ]
    },
    {
      "start": 151.582,
      "end": 152,
      "words": [
        {
          "word": "is",
          "start": 151.582,
          "end": 151.784
        },
        {
          "word": "dead",
          "start": 151.784,
          "end": 152
        }
      ]
    },
    {
      "start": 152,
      "end": 152.818,
      "words": [
        {
          "word": "and",
          "start": 152,
          "end": 152.146
        },
        {
          "word": "it",
          "start": 152.146,
          "end": 152.292
        },
        {
          "word": "is",
          "start": 152.292,
          "end": 152.438
        },
        {
          "word": "no",
          "start": 152.438,
          "end": 152.584
        },
        {
          "word": "longer",
          "start": 152.584,
          "end": 152.818
        }
      ]
    },
    {
      "start": 152.818,
      "end": 153.567,
      "words": [
        {
          "word": "safe",
          "start": 152.818,
          "end": 152.973
        },
        {
          "word": "to",
          "start": 152.973,
          "end": 153.119
        },
        {
          "word": "use.",
          "start": 153.119,
          "end": 153.265
        },
        {
          "word": "Step",
          "start": 153.265,
          "end": 153.421
        },
        {
          "word": "two,",
          "start": 153.421,
          "end": 153.567
        }
      ]
    },
    {
      "start": 153.567,
      "end": 154.91,
      "words": [
        {
          "word": "it",
          "start": 153.567,
          "end": 153.713
        },
        {
          "word": "promotes",
          "start": 153.713,
          "end": 154.024
        },
        {
          "word": "the",
          "start": 154.024,
          "end": 154.17
        },
        {
          "word": "secondary",
          "start": 154.17,
          "end": 154.521
        },
        {
          "word": "replicated",
          "start": 154.521,
          "end": 154.91
        }
      ]
    },
    {
      "start": 154.91,
      "end": 155.727,
      "words": [
        {
          "word": "backup",
          "start": 154.91,
          "end": 155.144
        },
        {
          "word": "to",
          "start": 155.144,
          "end": 155.29
        },
        {
          "word": "be",
          "start": 155.29,
          "end": 155.436
        },
        {
          "word": "the",
          "start": 155.436,
          "end": 155.582
        },
        {
          "word": "new",
          "start": 155.582,
          "end": 155.727
        }
      ]
    },
    {
      "start": 155.727,
      "end": 156,
      "words": [
        {
          "word": "primary.",
          "start": 155.727,
          "end": 156
        }
      ]
    },
    {
      "start": 156,
      "end": 157.503,
      "words": [
        {
          "word": "And",
          "start": 156,
          "end": 156.23
        },
        {
          "word": "step",
          "start": 156.23,
          "end": 156.475
        },
        {
          "word": "three,",
          "start": 156.475,
          "end": 156.782
        },
        {
          "word": "it",
          "start": 156.782,
          "end": 157.012
        },
        {
          "word": "actively",
          "start": 157.012,
          "end": 157.503
        }
      ]
    },
    {
      "start": 157.503,
      "end": 159.635,
      "words": [
        {
          "word": "redirects",
          "start": 157.503,
          "end": 158.055
        },
        {
          "word": "all",
          "start": 158.055,
          "end": 158.285
        },
        {
          "word": "that",
          "start": 158.285,
          "end": 158.531
        },
        {
          "word": "application",
          "start": 158.531,
          "end": 159.206
        },
        {
          "word": "traffic",
          "start": 159.206,
          "end": 159.635
        }
      ]
    },
    {
      "start": 159.635,
      "end": 161,
      "words": [
        {
          "word": "over",
          "start": 159.635,
          "end": 159.88
        },
        {
          "word": "to",
          "start": 159.88,
          "end": 160.11
        },
        {
          "word": "the",
          "start": 160.11,
          "end": 160.34
        },
        {
          "word": "new",
          "start": 160.34,
          "end": 160.571
        },
        {
          "word": "primary.",
          "start": 160.571,
          "end": 161
        }
      ]
    },
    {
      "start": 161,
      "end": 162.591,
      "words": [
        {
          "word": "By",
          "start": 161,
          "end": 161.201
        },
        {
          "word": "automating",
          "start": 161.201,
          "end": 161.735
        },
        {
          "word": "this",
          "start": 161.735,
          "end": 161.949
        },
        {
          "word": "whole",
          "start": 161.949,
          "end": 162.217
        },
        {
          "word": "shebang,",
          "start": 162.217,
          "end": 162.591
        }
      ]
    },
    {
      "start": 162.591,
      "end": 163.687,
      "words": [
        {
          "word": "we",
          "start": 162.591,
          "end": 162.791
        },
        {
          "word": "take",
          "start": 162.791,
          "end": 163.005
        },
        {
          "word": "what",
          "start": 163.005,
          "end": 163.219
        },
        {
          "word": "could",
          "start": 163.219,
          "end": 163.487
        },
        {
          "word": "be",
          "start": 163.487,
          "end": 163.687
        }
      ]
    },
    {
      "start": 163.687,
      "end": 165.479,
      "words": [
        {
          "word": "a",
          "start": 163.687,
          "end": 163.888
        },
        {
          "word": "massive,",
          "start": 163.888,
          "end": 164.262
        },
        {
          "word": "hours-long",
          "start": 164.262,
          "end": 164.797
        },
        {
          "word": "nightmare",
          "start": 164.797,
          "end": 165.278
        },
        {
          "word": "of",
          "start": 165.278,
          "end": 165.479
        }
      ]
    },
    {
      "start": 165.479,
      "end": 166,
      "words": [
        {
          "word": "an",
          "start": 165.479,
          "end": 165.679
        },
        {
          "word": "outage",
          "start": 165.679,
          "end": 166
        }
      ]
    },
    {
      "start": 166,
      "end": 167.197,
      "words": [
        {
          "word": "and",
          "start": 166,
          "end": 166.211
        },
        {
          "word": "shrink",
          "start": 166.211,
          "end": 166.549
        },
        {
          "word": "it",
          "start": 166.549,
          "end": 166.761
        },
        {
          "word": "down",
          "start": 166.761,
          "end": 166.986
        },
        {
          "word": "to",
          "start": 166.986,
          "end": 167.197
        }
      ]
    },
    {
      "start": 167.197,
      "end": 168.592,
      "words": [
        {
          "word": "just",
          "start": 167.197,
          "end": 167.423
        },
        {
          "word": "a",
          "start": 167.423,
          "end": 167.634
        },
        {
          "word": "tiny",
          "start": 167.634,
          "end": 167.859
        },
        {
          "word": "brief",
          "start": 167.859,
          "end": 168.141
        },
        {
          "word": "slowdown",
          "start": 168.141,
          "end": 168.592
        }
      ]
    },
    {
      "start": 168.592,
      "end": 169.901,
      "words": [
        {
          "word": "or",
          "start": 168.592,
          "end": 168.803
        },
        {
          "word": "maybe",
          "start": 168.803,
          "end": 169.085
        },
        {
          "word": "a",
          "start": 169.085,
          "end": 169.296
        },
        {
          "word": "few",
          "start": 169.296,
          "end": 169.507
        },
        {
          "word": "dropped",
          "start": 169.507,
          "end": 169.901
        }
      ]
    },
    {
      "start": 169.901,
      "end": 171,
      "words": [
        {
          "word": "requests",
          "start": 169.901,
          "end": 170.352
        },
        {
          "word": "for",
          "start": 170.352,
          "end": 170.563
        },
        {
          "word": "the",
          "start": 170.563,
          "end": 170.775
        },
        {
          "word": "user.",
          "start": 170.775,
          "end": 171
        }
      ]
    },
    {
      "start": 171,
      "end": 171.806,
      "words": [
        {
          "word": "But",
          "start": 171,
          "end": 171.159
        },
        {
          "word": "hey,",
          "start": 171.159,
          "end": 171.318
        },
        {
          "word": "we",
          "start": 171.318,
          "end": 171.477
        },
        {
          "word": "all",
          "start": 171.477,
          "end": 171.637
        },
        {
          "word": "know",
          "start": 171.637,
          "end": 171.806
        }
      ]
    },
    {
      "start": 171.806,
      "end": 173.154,
      "words": [
        {
          "word": "distributed",
          "start": 171.806,
          "end": 172.273
        },
        {
          "word": "systems",
          "start": 172.273,
          "end": 172.57
        },
        {
          "word": "are",
          "start": 172.57,
          "end": 172.729
        },
        {
          "word": "messy,",
          "start": 172.729,
          "end": 172.942
        },
        {
          "word": "right?",
          "start": 172.942,
          "end": 173.154
        }
      ]
    },
    {
      "start": 173.154,
      "end": 174.247,
      "words": [
        {
          "word": "Failover",
          "start": 173.154,
          "end": 173.493
        },
        {
          "word": "is",
          "start": 173.493,
          "end": 173.653
        },
        {
          "word": "never",
          "start": 173.653,
          "end": 173.865
        },
        {
          "word": "quite",
          "start": 173.865,
          "end": 174.077
        },
        {
          "word": "that",
          "start": 174.077,
          "end": 174.247
        }
      ]
    },
    {
      "start": 174.247,
      "end": 175,
      "words": [
        {
          "word": "simple",
          "start": 174.247,
          "end": 174.501
        },
        {
          "word": "in",
          "start": 174.501,
          "end": 174.66
        },
        {
          "word": "practice.",
          "start": 174.66,
          "end": 175
        }
      ]
    },
    {
      "start": 175,
      "end": 176.21,
      "words": [
        {
          "word": "Let",
          "start": 175,
          "end": 175.239
        },
        {
          "word": "us",
          "start": 175.239,
          "end": 175.477
        },
        {
          "word": "look",
          "start": 175.477,
          "end": 175.732
        },
        {
          "word": "at",
          "start": 175.732,
          "end": 175.971
        },
        {
          "word": "the",
          "start": 175.971,
          "end": 176.21
        }
      ]
    },
    {
      "start": 176.21,
      "end": 178.294,
      "words": [
        {
          "word": "big",
          "start": 176.21,
          "end": 176.448
        },
        {
          "word": "engineering",
          "start": 176.448,
          "end": 177.149
        },
        {
          "word": "challenge",
          "start": 177.149,
          "end": 177.721
        },
        {
          "word": "here,",
          "start": 177.721,
          "end": 177.976
        },
        {
          "word": "false",
          "start": 177.976,
          "end": 178.294
        }
      ]
    },
    {
      "start": 178.294,
      "end": 180.045,
      "words": [
        {
          "word": "positives.",
          "start": 178.294,
          "end": 178.867
        },
        {
          "word": "Here",
          "start": 178.867,
          "end": 179.122
        },
        {
          "word": "is",
          "start": 179.122,
          "end": 179.361
        },
        {
          "word": "the",
          "start": 179.361,
          "end": 179.599
        },
        {
          "word": "failing",
          "start": 179.599,
          "end": 180.045
        }
      ]
    },
    {
      "start": 180.045,
      "end": 181,
      "words": [
        {
          "word": "over",
          "start": 180.045,
          "end": 180.3
        },
        {
          "word": "immediately",
          "start": 180.3,
          "end": 181
        }
      ]
    },
    {
      "start": 181,
      "end": 182.508,
      "words": [
        {
          "word": "after",
          "start": 181,
          "end": 181.305
        },
        {
          "word": "just",
          "start": 181.305,
          "end": 181.548
        },
        {
          "word": "one",
          "start": 181.548,
          "end": 181.777
        },
        {
          "word": "single",
          "start": 181.777,
          "end": 182.142
        },
        {
          "word": "missed",
          "start": 182.142,
          "end": 182.508
        }
      ]
    },
    {
      "start": 182.508,
      "end": 184,
      "words": [
        {
          "word": "health",
          "start": 182.508,
          "end": 182.873
        },
        {
          "word": "check",
          "start": 182.873,
          "end": 183.178
        },
        {
          "word": "is",
          "start": 183.178,
          "end": 183.406
        },
        {
          "word": "a",
          "start": 183.406,
          "end": 183.635
        },
        {
          "word": "recipe",
          "start": 183.635,
          "end": 184
        }
      ]
    },
    {
      "start": 184,
      "end": 185.782,
      "words": [
        {
          "word": "for",
          "start": 184,
          "end": 184.228
        },
        {
          "word": "disaster.",
          "start": 184.228,
          "end": 184.716
        },
        {
          "word": "It",
          "start": 184.716,
          "end": 184.944
        },
        {
          "word": "represents",
          "start": 184.944,
          "end": 185.553
        },
        {
          "word": "a",
          "start": 185.553,
          "end": 185.782
        }
      ]
    },
    {
      "start": 185.782,
      "end": 187,
      "words": [
        {
          "word": "fundamental",
          "start": 185.782,
          "end": 186.452
        },
        {
          "word": "trade-off",
          "start": 186.452,
          "end": 187
        }
      ]
    },
    {
      "start": 187,
      "end": 189.024,
      "words": [
        {
          "word": "we",
          "start": 187,
          "end": 187.22
        },
        {
          "word": "face",
          "start": 187.22,
          "end": 187.455
        },
        {
          "word": "in",
          "start": 187.455,
          "end": 187.675
        },
        {
          "word": "availability",
          "start": 187.675,
          "end": 188.379
        },
        {
          "word": "engineering.",
          "start": 188.379,
          "end": 189.024
        }
      ]
    },
    {
      "start": 189.024,
      "end": 190.447,
      "words": [
        {
          "word": "Look",
          "start": 189.024,
          "end": 189.259
        },
        {
          "word": "at",
          "start": 189.259,
          "end": 189.479
        },
        {
          "word": "the",
          "start": 189.479,
          "end": 189.699
        },
        {
          "word": "low",
          "start": 189.699,
          "end": 189.919
        },
        {
          "word": "threshold",
          "start": 189.919,
          "end": 190.447
        }
      ]
    },
    {
      "start": 190.447,
      "end": 192.237,
      "words": [
        {
          "word": "approach.",
          "start": 190.447,
          "end": 190.917
        },
        {
          "word": "It",
          "start": 190.917,
          "end": 191.137
        },
        {
          "word": "gives",
          "start": 191.137,
          "end": 191.43
        },
        {
          "word": "you",
          "start": 191.43,
          "end": 191.65
        },
        {
          "word": "incredibly",
          "start": 191.65,
          "end": 192.237
        }
      ]
    },
    {
      "start": 192.237,
      "end": 193,
      "words": [
        {
          "word": "fast",
          "start": 192.237,
          "end": 192.472
        },
        {
          "word": "detection,",
          "start": 192.472,
          "end": 193
        }
      ]
    },
    {
      "start": 193,
      "end": 194.341,
      "words": [
        {
          "word": "which",
          "start": 193,
          "end": 193.242
        },
        {
          "word": "sounds",
          "start": 193.242,
          "end": 193.532
        },
        {
          "word": "great",
          "start": 193.532,
          "end": 193.773
        },
        {
          "word": "for",
          "start": 193.773,
          "end": 193.955
        },
        {
          "word": "recovery",
          "start": 193.955,
          "end": 194.341
        }
      ]
    },
    {
      "start": 194.341,
      "end": 195.369,
      "words": [
        {
          "word": "time,",
          "start": 194.341,
          "end": 194.535
        },
        {
          "word": "but",
          "start": 194.535,
          "end": 194.716
        },
        {
          "word": "it",
          "start": 194.716,
          "end": 194.897
        },
        {
          "word": "brings",
          "start": 194.897,
          "end": 195.187
        },
        {
          "word": "a",
          "start": 195.187,
          "end": 195.369
        }
      ]
    },
    {
      "start": 195.369,
      "end": 196.71,
      "words": [
        {
          "word": "dangerously",
          "start": 195.369,
          "end": 195.9
        },
        {
          "word": "high",
          "start": 195.9,
          "end": 196.094
        },
        {
          "word": "risk",
          "start": 196.094,
          "end": 196.287
        },
        {
          "word": "of",
          "start": 196.287,
          "end": 196.468
        },
        {
          "word": "false",
          "start": 196.468,
          "end": 196.71
        }
      ]
    },
    {
      "start": 196.71,
      "end": 197,
      "words": [
        {
          "word": "alarms",
          "start": 196.71,
          "end": 197
        }
      ]
    },
    {
      "start": 197,
      "end": 198.27,
      "words": [
        {
          "word": "and",
          "start": 197,
          "end": 197.167
        },
        {
          "word": "system",
          "start": 197.167,
          "end": 197.435
        },
        {
          "word": "instability.",
          "start": 197.435,
          "end": 197.925
        },
        {
          "word": "I",
          "start": 197.925,
          "end": 198.092
        },
        {
          "word": "mean,",
          "start": 198.092,
          "end": 198.27
        }
      ]
    },
    {
      "start": 198.27,
      "end": 199.507,
      "words": [
        {
          "word": "literally",
          "start": 198.27,
          "end": 198.671
        },
        {
          "word": "just",
          "start": 198.671,
          "end": 198.85
        },
        {
          "word": "a",
          "start": 198.85,
          "end": 199.017
        },
        {
          "word": "tiny",
          "start": 199.017,
          "end": 199.195
        },
        {
          "word": "network",
          "start": 199.195,
          "end": 199.507
        }
      ]
    },
    {
      "start": 199.507,
      "end": 200.777,
      "words": [
        {
          "word": "blip",
          "start": 199.507,
          "end": 199.685
        },
        {
          "word": "or",
          "start": 199.685,
          "end": 199.852
        },
        {
          "word": "a",
          "start": 199.852,
          "end": 200.019
        },
        {
          "word": "garbage",
          "start": 200.019,
          "end": 200.331
        },
        {
          "word": "collection",
          "start": 200.331,
          "end": 200.777
        }
      ]
    },
    {
      "start": 200.777,
      "end": 201,
      "words": [
        {
          "word": "pause",
          "start": 200.777,
          "end": 201
        }
      ]
    },
    {
      "start": 201,
      "end": 203.073,
      "words": [
        {
          "word": "could",
          "start": 201,
          "end": 201.316
        },
        {
          "word": "trigger",
          "start": 201.316,
          "end": 201.759
        },
        {
          "word": "a",
          "start": 201.759,
          "end": 201.997
        },
        {
          "word": "massive,",
          "start": 201.997,
          "end": 202.44
        },
        {
          "word": "completely",
          "start": 202.44,
          "end": 203.073
        }
      ]
    },
    {
      "start": 203.073,
      "end": 205.256,
      "words": [
        {
          "word": "unnecessary",
          "start": 203.073,
          "end": 203.769
        },
        {
          "word": "database",
          "start": 203.769,
          "end": 204.275
        },
        {
          "word": "failover.",
          "start": 204.275,
          "end": 204.782
        },
        {
          "word": "Now",
          "start": 204.782,
          "end": 205.019
        },
        {
          "word": "on",
          "start": 205.019,
          "end": 205.256
        }
      ]
    },
    {
      "start": 205.256,
      "end": 206,
      "words": [
        {
          "word": "the",
          "start": 205.256,
          "end": 205.494
        },
        {
          "word": "flip",
          "start": 205.494,
          "end": 205.747
        },
        {
          "word": "side,",
          "start": 205.747,
          "end": 206
        }
      ]
    },
    {
      "start": 206,
      "end": 207.604,
      "words": [
        {
          "word": "a",
          "start": 206,
          "end": 206.236
        },
        {
          "word": "high",
          "start": 206.236,
          "end": 206.487
        },
        {
          "word": "threshold",
          "start": 206.487,
          "end": 207.053
        },
        {
          "word": "gives",
          "start": 207.053,
          "end": 207.368
        },
        {
          "word": "you",
          "start": 207.368,
          "end": 207.604
        }
      ]
    },
    {
      "start": 207.604,
      "end": 209.208,
      "words": [
        {
          "word": "rock",
          "start": 207.604,
          "end": 207.855
        },
        {
          "word": "solid",
          "start": 207.855,
          "end": 208.17
        },
        {
          "word": "stability",
          "start": 208.17,
          "end": 208.736
        },
        {
          "word": "and",
          "start": 208.736,
          "end": 208.972
        },
        {
          "word": "way",
          "start": 208.972,
          "end": 209.208
        }
      ]
    },
    {
      "start": 209.208,
      "end": 210.686,
      "words": [
        {
          "word": "fewer",
          "start": 209.208,
          "end": 209.522
        },
        {
          "word": "false",
          "start": 209.522,
          "end": 209.836
        },
        {
          "word": "alarms.",
          "start": 209.836,
          "end": 210.214
        },
        {
          "word": "But",
          "start": 210.214,
          "end": 210.45
        },
        {
          "word": "the",
          "start": 210.45,
          "end": 210.686
        }
      ]
    },
    {
      "start": 210.686,
      "end": 211,
      "words": [
        {
          "word": "catch,",
          "start": 210.686,
          "end": 211
        }
      ]
    },
    {
      "start": 211,
      "end": 212.28,
      "words": [
        {
          "word": "your",
          "start": 211,
          "end": 211.238
        },
        {
          "word": "users",
          "start": 211.238,
          "end": 211.536
        },
        {
          "word": "are",
          "start": 211.536,
          "end": 211.759
        },
        {
          "word": "going",
          "start": 211.759,
          "end": 212.057
        },
        {
          "word": "to",
          "start": 212.057,
          "end": 212.28
        }
      ]
    },
    {
      "start": 212.28,
      "end": 214.408,
      "words": [
        {
          "word": "experience",
          "start": 212.28,
          "end": 212.875
        },
        {
          "word": "a",
          "start": 212.875,
          "end": 213.098
        },
        {
          "word": "noticeably",
          "start": 213.098,
          "end": 213.693
        },
        {
          "word": "longer",
          "start": 213.693,
          "end": 214.051
        },
        {
          "word": "outage",
          "start": 214.051,
          "end": 214.408
        }
      ]
    },
    {
      "start": 214.408,
      "end": 216,
      "words": [
        {
          "word": "before",
          "start": 214.408,
          "end": 214.765
        },
        {
          "word": "the",
          "start": 214.765,
          "end": 214.988
        },
        {
          "word": "system",
          "start": 214.988,
          "end": 215.345
        },
        {
          "word": "finally",
          "start": 215.345,
          "end": 215.762
        },
        {
          "word": "says,",
          "start": 215.762,
          "end": 216
        }
      ]
    },
    {
      "start": 216,
      "end": 217.272,
      "words": [
        {
          "word": "okay,",
          "start": 216,
          "end": 216.237
        },
        {
          "word": "yeah,",
          "start": 216.237,
          "end": 216.473
        },
        {
          "word": "it",
          "start": 216.473,
          "end": 216.695
        },
        {
          "word": "is",
          "start": 216.695,
          "end": 216.917
        },
        {
          "word": "really",
          "start": 216.917,
          "end": 217.272
        }
      ]
    },
    {
      "start": 217.272,
      "end": 218.722,
      "words": [
        {
          "word": "dead,",
          "start": 217.272,
          "end": 217.509
        },
        {
          "word": "let's",
          "start": 217.509,
          "end": 217.805
        },
        {
          "word": "failover.",
          "start": 217.805,
          "end": 218.278
        },
        {
          "word": "So",
          "start": 218.278,
          "end": 218.5
        },
        {
          "word": "how",
          "start": 218.5,
          "end": 218.722
        }
      ]
    },
    {
      "start": 218.722,
      "end": 219.994,
      "words": [
        {
          "word": "do",
          "start": 218.722,
          "end": 218.944
        },
        {
          "word": "we",
          "start": 218.944,
          "end": 219.166
        },
        {
          "word": "handle",
          "start": 219.166,
          "end": 219.521
        },
        {
          "word": "this?",
          "start": 219.521,
          "end": 219.757
        },
        {
          "word": "Well,",
          "start": 219.757,
          "end": 219.994
        }
      ]
    },
    {
      "start": 219.994,
      "end": 221,
      "words": [
        {
          "word": "production",
          "start": 219.994,
          "end": 220.586
        },
        {
          "word": "systems",
          "start": 220.586,
          "end": 221
        }
      ]
    },
    {
      "start": 221,
      "end": 223.08,
      "words": [
        {
          "word": "typically",
          "start": 221,
          "end": 221.496
        },
        {
          "word": "use",
          "start": 221.496,
          "end": 221.702
        },
        {
          "word": "strict",
          "start": 221.702,
          "end": 222.033
        },
        {
          "word": "numerical",
          "start": 222.033,
          "end": 222.529
        },
        {
          "word": "thresholds.",
          "start": 222.529,
          "end": 223.08
        }
      ]
    },
    {
      "start": 223.08,
      "end": 224.499,
      "words": [
        {
          "word": "A",
          "start": 223.08,
          "end": 223.287
        },
        {
          "word": "super",
          "start": 223.287,
          "end": 223.562
        },
        {
          "word": "common",
          "start": 223.562,
          "end": 223.893
        },
        {
          "word": "magic",
          "start": 223.893,
          "end": 224.168
        },
        {
          "word": "number",
          "start": 224.168,
          "end": 224.499
        }
      ]
    },
    {
      "start": 224.499,
      "end": 225.614,
      "words": [
        {
          "word": "is",
          "start": 224.499,
          "end": 224.705
        },
        {
          "word": "three.",
          "start": 224.705,
          "end": 224.981
        },
        {
          "word": "You",
          "start": 224.981,
          "end": 225.187
        },
        {
          "word": "wait",
          "start": 225.187,
          "end": 225.408
        },
        {
          "word": "for",
          "start": 225.408,
          "end": 225.614
        }
      ]
    },
    {
      "start": 225.614,
      "end": 226,
      "words": [
        {
          "word": "exactly",
          "start": 225.614,
          "end": 226
        }
      ]
    },
    {
      "start": 226,
      "end": 227.563,
      "words": [
        {
          "word": "three",
          "start": 226,
          "end": 226.23
        },
        {
          "word": "consecutive",
          "start": 226.23,
          "end": 226.736
        },
        {
          "word": "failed",
          "start": 226.736,
          "end": 227.011
        },
        {
          "word": "health",
          "start": 227.011,
          "end": 227.287
        },
        {
          "word": "checks",
          "start": 227.287,
          "end": 227.563
        }
      ]
    },
    {
      "start": 227.563,
      "end": 228.816,
      "words": [
        {
          "word": "in",
          "start": 227.563,
          "end": 227.736
        },
        {
          "word": "a",
          "start": 227.736,
          "end": 227.908
        },
        {
          "word": "row",
          "start": 227.908,
          "end": 228.08
        },
        {
          "word": "before",
          "start": 228.08,
          "end": 228.356
        },
        {
          "word": "officially",
          "start": 228.356,
          "end": 228.816
        }
      ]
    },
    {
      "start": 228.816,
      "end": 230,
      "words": [
        {
          "word": "declaring",
          "start": 228.816,
          "end": 229.23
        },
        {
          "word": "a",
          "start": 229.23,
          "end": 229.402
        },
        {
          "word": "component",
          "start": 229.402,
          "end": 229.816
        },
        {
          "word": "dead.",
          "start": 229.816,
          "end": 230
        }
      ]
    },
    {
      "start": 230,
      "end": 231.477,
      "words": [
        {
          "word": "This",
          "start": 230,
          "end": 230.288
        },
        {
          "word": "is",
          "start": 230.288,
          "end": 230.559
        },
        {
          "word": "the",
          "start": 230.559,
          "end": 230.829
        },
        {
          "word": "sweet",
          "start": 230.829,
          "end": 231.189
        },
        {
          "word": "spot.",
          "start": 231.189,
          "end": 231.477
        }
      ]
    },
    {
      "start": 231.477,
      "end": 233.063,
      "words": [
        {
          "word": "It",
          "start": 231.477,
          "end": 231.748
        },
        {
          "word": "ensures",
          "start": 231.748,
          "end": 232.252
        },
        {
          "word": "we",
          "start": 232.252,
          "end": 232.523
        },
        {
          "word": "are",
          "start": 232.523,
          "end": 232.793
        },
        {
          "word": "not",
          "start": 232.793,
          "end": 233.063
        }
      ]
    },
    {
      "start": 233.063,
      "end": 236,
      "words": [
        {
          "word": "aggressively",
          "start": 233.063,
          "end": 233.928
        },
        {
          "word": "triggering",
          "start": 233.928,
          "end": 234.649
        },
        {
          "word": "a",
          "start": 234.649,
          "end": 234.919
        },
        {
          "word": "massive",
          "start": 234.919,
          "end": 235.423
        },
        {
          "word": "recovery",
          "start": 235.423,
          "end": 236
        }
      ]
    },
    {
      "start": 236,
      "end": 237.3,
      "words": [
        {
          "word": "just",
          "start": 236,
          "end": 236.189
        },
        {
          "word": "because",
          "start": 236.189,
          "end": 236.52
        },
        {
          "word": "of",
          "start": 236.52,
          "end": 236.697
        },
        {
          "word": "a",
          "start": 236.697,
          "end": 236.875
        },
        {
          "word": "momentary",
          "start": 236.875,
          "end": 237.3
        }
      ]
    },
    {
      "start": 237.3,
      "end": 238.447,
      "words": [
        {
          "word": "hiccup",
          "start": 237.3,
          "end": 237.584
        },
        {
          "word": "in",
          "start": 237.584,
          "end": 237.761
        },
        {
          "word": "the",
          "start": 237.761,
          "end": 237.939
        },
        {
          "word": "network,",
          "start": 237.939,
          "end": 238.27
        },
        {
          "word": "but",
          "start": 238.27,
          "end": 238.447
        }
      ]
    },
    {
      "start": 238.447,
      "end": 239.511,
      "words": [
        {
          "word": "we",
          "start": 238.447,
          "end": 238.624
        },
        {
          "word": "are",
          "start": 238.624,
          "end": 238.801
        },
        {
          "word": "still",
          "start": 238.801,
          "end": 239.038
        },
        {
          "word": "acting",
          "start": 239.038,
          "end": 239.322
        },
        {
          "word": "fast",
          "start": 239.322,
          "end": 239.511
        }
      ]
    },
    {
      "start": 239.511,
      "end": 240.527,
      "words": [
        {
          "word": "enough",
          "start": 239.511,
          "end": 239.794
        },
        {
          "word": "to",
          "start": 239.794,
          "end": 239.972
        },
        {
          "word": "save",
          "start": 239.972,
          "end": 240.161
        },
        {
          "word": "the",
          "start": 240.161,
          "end": 240.338
        },
        {
          "word": "user",
          "start": 240.338,
          "end": 240.527
        }
      ]
    },
    {
      "start": 240.527,
      "end": 241,
      "words": [
        {
          "word": "experience.",
          "start": 240.527,
          "end": 241
        }
      ]
    },
    {
      "start": 241,
      "end": 242.063,
      "words": [
        {
          "word": "Now",
          "start": 241,
          "end": 241.197
        },
        {
          "word": "let",
          "start": 241.197,
          "end": 241.394
        },
        {
          "word": "us",
          "start": 241.394,
          "end": 241.591
        },
        {
          "word": "talk",
          "start": 241.591,
          "end": 241.801
        },
        {
          "word": "about",
          "start": 241.801,
          "end": 242.063
        }
      ]
    },
    {
      "start": 242.063,
      "end": 243.769,
      "words": [
        {
          "word": "the",
          "start": 242.063,
          "end": 242.26
        },
        {
          "word": "actual",
          "start": 242.26,
          "end": 242.575
        },
        {
          "word": "infrastructure",
          "start": 242.575,
          "end": 243.31
        },
        {
          "word": "doing",
          "start": 243.31,
          "end": 243.572
        },
        {
          "word": "all",
          "start": 243.572,
          "end": 243.769
        }
      ]
    },
    {
      "start": 243.769,
      "end": 245.016,
      "words": [
        {
          "word": "this",
          "start": 243.769,
          "end": 243.979
        },
        {
          "word": "heavy",
          "start": 243.979,
          "end": 244.241
        },
        {
          "word": "lifting",
          "start": 244.241,
          "end": 244.609
        },
        {
          "word": "with",
          "start": 244.609,
          "end": 244.819
        },
        {
          "word": "the",
          "start": 244.819,
          "end": 245.016
        }
      ]
    },
    {
      "start": 245.016,
      "end": 246,
      "words": [
        {
          "word": "checking",
          "start": 245.016,
          "end": 245.436
        },
        {
          "word": "and",
          "start": 245.436,
          "end": 245.633
        },
        {
          "word": "routing.",
          "start": 245.633,
          "end": 246
        }
      ]
    },
    {
      "start": 246,
      "end": 248.602,
      "words": [
        {
          "word": "Section",
          "start": 246,
          "end": 246.656
        },
        {
          "word": "four,",
          "start": 246.656,
          "end": 247.031
        },
        {
          "word": "load",
          "start": 247.031,
          "end": 247.406
        },
        {
          "word": "balancers",
          "start": 247.406,
          "end": 248.25
        },
        {
          "word": "and",
          "start": 248.25,
          "end": 248.602
        }
      ]
    },
    {
      "start": 248.602,
      "end": 251.672,
      "words": [
        {
          "word": "recovery.",
          "start": 248.602,
          "end": 249.352
        },
        {
          "word": "In",
          "start": 249.352,
          "end": 249.703
        },
        {
          "word": "most",
          "start": 249.703,
          "end": 250.078
        },
        {
          "word": "modern",
          "start": 250.078,
          "end": 250.641
        },
        {
          "word": "distributed",
          "start": 250.641,
          "end": 251.672
        }
      ]
    },
    {
      "start": 251.672,
      "end": 254.25,
      "words": [
        {
          "word": "systems,",
          "start": 251.672,
          "end": 252.328
        },
        {
          "word": "load",
          "start": 252.328,
          "end": 252.703
        },
        {
          "word": "balancers",
          "start": 252.703,
          "end": 253.547
        },
        {
          "word": "are",
          "start": 253.547,
          "end": 253.898
        },
        {
          "word": "the",
          "start": 253.898,
          "end": 254.25
        }
      ]
    },
    {
      "start": 254.25,
      "end": 255,
      "words": [
        {
          "word": "real",
          "start": 254.25,
          "end": 254.625
        },
        {
          "word": "MVPs,",
          "start": 254.625,
          "end": 255
        }
      ]
    },
    {
      "start": 255,
      "end": 257.392,
      "words": [
        {
          "word": "actively",
          "start": 255,
          "end": 255.638
        },
        {
          "word": "using",
          "start": 255.638,
          "end": 256.037
        },
        {
          "word": "these",
          "start": 256.037,
          "end": 256.435
        },
        {
          "word": "health",
          "start": 256.435,
          "end": 256.914
        },
        {
          "word": "checks.",
          "start": 256.914,
          "end": 257.392
        }
      ]
    },
    {
      "start": 257.392,
      "end": 259.326,
      "words": [
        {
          "word": "And",
          "start": 257.392,
          "end": 257.691
        },
        {
          "word": "their",
          "start": 257.691,
          "end": 258.09
        },
        {
          "word": "workflow,",
          "start": 258.09,
          "end": 258.728
        },
        {
          "word": "it",
          "start": 258.728,
          "end": 259.027
        },
        {
          "word": "is",
          "start": 259.027,
          "end": 259.326
        }
      ]
    },
    {
      "start": 259.326,
      "end": 261,
      "words": [
        {
          "word": "honestly",
          "start": 259.326,
          "end": 259.963
        },
        {
          "word": "pretty",
          "start": 259.963,
          "end": 260.442
        },
        {
          "word": "elegant.",
          "start": 260.442,
          "end": 261
        }
      ]
    },
    {
      "start": 261,
      "end": 262.861,
      "words": [
        {
          "word": "First,",
          "start": 261,
          "end": 261.324
        },
        {
          "word": "they",
          "start": 261.324,
          "end": 261.583
        },
        {
          "word": "continuously",
          "start": 261.583,
          "end": 262.359
        },
        {
          "word": "ping",
          "start": 262.359,
          "end": 262.618
        },
        {
          "word": "the",
          "start": 262.618,
          "end": 262.861
        }
      ]
    },
    {
      "start": 262.861,
      "end": 264.786,
      "words": [
        {
          "word": "backend",
          "start": 262.861,
          "end": 263.314
        },
        {
          "word": "servers.",
          "start": 263.314,
          "end": 263.767
        },
        {
          "word": "Second,",
          "start": 263.767,
          "end": 264.155
        },
        {
          "word": "the",
          "start": 264.155,
          "end": 264.398
        },
        {
          "word": "moment",
          "start": 264.398,
          "end": 264.786
        }
      ]
    },
    {
      "start": 264.786,
      "end": 266,
      "words": [
        {
          "word": "a",
          "start": 264.786,
          "end": 265.029
        },
        {
          "word": "server",
          "start": 265.029,
          "end": 265.417
        },
        {
          "word": "looks",
          "start": 265.417,
          "end": 265.741
        },
        {
          "word": "sick,",
          "start": 265.741,
          "end": 266
        }
      ]
    },
    {
      "start": 266,
      "end": 267.222,
      "words": [
        {
          "word": "they",
          "start": 266,
          "end": 266.176
        },
        {
          "word": "dynamically",
          "start": 266.176,
          "end": 266.661
        },
        {
          "word": "yank",
          "start": 266.661,
          "end": 266.837
        },
        {
          "word": "it",
          "start": 266.837,
          "end": 267.002
        },
        {
          "word": "right",
          "start": 267.002,
          "end": 267.222
        }
      ]
    },
    {
      "start": 267.222,
      "end": 268.236,
      "words": [
        {
          "word": "out",
          "start": 267.222,
          "end": 267.388
        },
        {
          "word": "of",
          "start": 267.388,
          "end": 267.553
        },
        {
          "word": "the",
          "start": 267.553,
          "end": 267.718
        },
        {
          "word": "rotation.",
          "start": 267.718,
          "end": 268.07
        },
        {
          "word": "And",
          "start": 268.07,
          "end": 268.236
        }
      ]
    },
    {
      "start": 268.236,
      "end": 269.535,
      "words": [
        {
          "word": "third,",
          "start": 268.236,
          "end": 268.456
        },
        {
          "word": "they",
          "start": 268.456,
          "end": 268.632
        },
        {
          "word": "automatically",
          "start": 268.632,
          "end": 269.205
        },
        {
          "word": "put",
          "start": 269.205,
          "end": 269.37
        },
        {
          "word": "it",
          "start": 269.37,
          "end": 269.535
        }
      ]
    },
    {
      "start": 269.535,
      "end": 270.383,
      "words": [
        {
          "word": "back",
          "start": 269.535,
          "end": 269.711
        },
        {
          "word": "in",
          "start": 269.711,
          "end": 269.877
        },
        {
          "word": "once",
          "start": 269.877,
          "end": 270.053
        },
        {
          "word": "it",
          "start": 270.053,
          "end": 270.218
        },
        {
          "word": "is",
          "start": 270.218,
          "end": 270.383
        }
      ]
    },
    {
      "start": 270.383,
      "end": 271,
      "words": [
        {
          "word": "fully",
          "start": 270.383,
          "end": 270.604
        },
        {
          "word": "recovered.",
          "start": 270.604,
          "end": 271
        }
      ]
    },
    {
      "start": 271,
      "end": 272.11,
      "words": [
        {
          "word": "So",
          "start": 271,
          "end": 271.187
        },
        {
          "word": "imagine",
          "start": 271.187,
          "end": 271.536
        },
        {
          "word": "we",
          "start": 271.536,
          "end": 271.723
        },
        {
          "word": "have",
          "start": 271.723,
          "end": 271.923
        },
        {
          "word": "10",
          "start": 271.923,
          "end": 272.11
        }
      ]
    },
    {
      "start": 272.11,
      "end": 273.419,
      "words": [
        {
          "word": "FoodDash",
          "start": 272.11,
          "end": 272.509
        },
        {
          "word": "API",
          "start": 272.509,
          "end": 272.696
        },
        {
          "word": "servers.",
          "start": 272.696,
          "end": 273.045
        },
        {
          "word": "If",
          "start": 273.045,
          "end": 273.232
        },
        {
          "word": "one",
          "start": 273.232,
          "end": 273.419
        }
      ]
    },
    {
      "start": 273.419,
      "end": 274.953,
      "words": [
        {
          "word": "suddenly",
          "start": 273.419,
          "end": 273.818
        },
        {
          "word": "stops",
          "start": 273.818,
          "end": 274.067
        },
        {
          "word": "responding,",
          "start": 274.067,
          "end": 274.566
        },
        {
          "word": "the",
          "start": 274.566,
          "end": 274.753
        },
        {
          "word": "load",
          "start": 274.753,
          "end": 274.953
        }
      ]
    },
    {
      "start": 274.953,
      "end": 276,
      "words": [
        {
          "word": "balancer",
          "start": 274.953,
          "end": 275.352
        },
        {
          "word": "just",
          "start": 275.352,
          "end": 275.551
        },
        {
          "word": "instantly",
          "start": 275.551,
          "end": 276
        }
      ]
    },
    {
      "start": 276,
      "end": 277.157,
      "words": [
        {
          "word": "removes",
          "start": 276,
          "end": 276.345
        },
        {
          "word": "it.",
          "start": 276.345,
          "end": 276.529
        },
        {
          "word": "It",
          "start": 276.529,
          "end": 276.714
        },
        {
          "word": "makes",
          "start": 276.714,
          "end": 276.96
        },
        {
          "word": "sure",
          "start": 276.96,
          "end": 277.157
        }
      ]
    },
    {
      "start": 277.157,
      "end": 278.265,
      "words": [
        {
          "word": "any",
          "start": 277.157,
          "end": 277.342
        },
        {
          "word": "new",
          "start": 277.342,
          "end": 277.526
        },
        {
          "word": "hungry",
          "start": 277.526,
          "end": 277.822
        },
        {
          "word": "users",
          "start": 277.822,
          "end": 278.068
        },
        {
          "word": "only",
          "start": 278.068,
          "end": 278.265
        }
      ]
    },
    {
      "start": 278.265,
      "end": 279.311,
      "words": [
        {
          "word": "get",
          "start": 278.265,
          "end": 278.449
        },
        {
          "word": "routed",
          "start": 278.449,
          "end": 278.745
        },
        {
          "word": "to",
          "start": 278.745,
          "end": 278.929
        },
        {
          "word": "the",
          "start": 278.929,
          "end": 279.114
        },
        {
          "word": "nine",
          "start": 279.114,
          "end": 279.311
        }
      ]
    },
    {
      "start": 279.311,
      "end": 280,
      "words": [
        {
          "word": "healthy",
          "start": 279.311,
          "end": 279.655
        },
        {
          "word": "servers,",
          "start": 279.655,
          "end": 280
        }
      ]
    },
    {
      "start": 280,
      "end": 281.435,
      "words": [
        {
          "word": "at",
          "start": 280,
          "end": 280.227
        },
        {
          "word": "least",
          "start": 280.227,
          "end": 280.529
        },
        {
          "word": "until",
          "start": 280.529,
          "end": 280.831
        },
        {
          "word": "that",
          "start": 280.831,
          "end": 281.073
        },
        {
          "word": "broken",
          "start": 281.073,
          "end": 281.435
        }
      ]
    },
    {
      "start": 281.435,
      "end": 282.84,
      "words": [
        {
          "word": "one",
          "start": 281.435,
          "end": 281.662
        },
        {
          "word": "gets",
          "start": 281.662,
          "end": 281.903
        },
        {
          "word": "its",
          "start": 281.903,
          "end": 282.13
        },
        {
          "word": "act",
          "start": 282.13,
          "end": 282.356
        },
        {
          "word": "together.",
          "start": 282.356,
          "end": 282.84
        }
      ]
    },
    {
      "start": 282.84,
      "end": 285,
      "words": [
        {
          "word": "And",
          "start": 282.84,
          "end": 283.066
        },
        {
          "word": "honestly,",
          "start": 283.066,
          "end": 283.55
        },
        {
          "word": "this",
          "start": 283.55,
          "end": 283.792
        },
        {
          "word": "perfectly",
          "start": 283.792,
          "end": 284.335
        },
        {
          "word": "illustrates",
          "start": 284.335,
          "end": 285
        }
      ]
    },
    {
      "start": 285,
      "end": 286.414,
      "words": [
        {
          "word": "the",
          "start": 285,
          "end": 285.193
        },
        {
          "word": "crazy",
          "start": 285.193,
          "end": 285.45
        },
        {
          "word": "scalability",
          "start": 285.45,
          "end": 286.015
        },
        {
          "word": "of",
          "start": 286.015,
          "end": 286.208
        },
        {
          "word": "this",
          "start": 286.208,
          "end": 286.414
        }
      ]
    },
    {
      "start": 286.414,
      "end": 287.802,
      "words": [
        {
          "word": "concept,",
          "start": 286.414,
          "end": 286.774
        },
        {
          "word": "because",
          "start": 286.774,
          "end": 287.134
        },
        {
          "word": "this",
          "start": 287.134,
          "end": 287.339
        },
        {
          "word": "exact",
          "start": 287.339,
          "end": 287.596
        },
        {
          "word": "same",
          "start": 287.596,
          "end": 287.802
        }
      ]
    },
    {
      "start": 287.802,
      "end": 289.486,
      "words": [
        {
          "word": "detect",
          "start": 287.802,
          "end": 288.111
        },
        {
          "word": "and",
          "start": 288.111,
          "end": 288.303
        },
        {
          "word": "reroute",
          "start": 288.303,
          "end": 288.663
        },
        {
          "word": "principle",
          "start": 288.663,
          "end": 289.126
        },
        {
          "word": "applies",
          "start": 289.126,
          "end": 289.486
        }
      ]
    },
    {
      "start": 289.486,
      "end": 290,
      "words": [
        {
          "word": "everywhere.",
          "start": 289.486,
          "end": 290
        }
      ]
    },
    {
      "start": 290,
      "end": 290.823,
      "words": [
        {
          "word": "It",
          "start": 290,
          "end": 290.145
        },
        {
          "word": "does",
          "start": 290.145,
          "end": 290.3
        },
        {
          "word": "not",
          "start": 290.3,
          "end": 290.446
        },
        {
          "word": "matter",
          "start": 290.446,
          "end": 290.678
        },
        {
          "word": "if",
          "start": 290.678,
          "end": 290.823
        }
      ]
    },
    {
      "start": 290.823,
      "end": 291.685,
      "words": [
        {
          "word": "you",
          "start": 290.823,
          "end": 290.969
        },
        {
          "word": "are",
          "start": 290.969,
          "end": 291.114
        },
        {
          "word": "doing",
          "start": 291.114,
          "end": 291.308
        },
        {
          "word": "a",
          "start": 291.308,
          "end": 291.453
        },
        {
          "word": "really",
          "start": 291.453,
          "end": 291.685
        }
      ]
    },
    {
      "start": 291.685,
      "end": 292.847,
      "words": [
        {
          "word": "small",
          "start": 291.685,
          "end": 291.879
        },
        {
          "word": "scale",
          "start": 291.879,
          "end": 292.073
        },
        {
          "word": "failover,",
          "start": 292.073,
          "end": 292.383
        },
        {
          "word": "just",
          "start": 292.383,
          "end": 292.538
        },
        {
          "word": "swapping",
          "start": 292.538,
          "end": 292.847
        }
      ]
    },
    {
      "start": 292.847,
      "end": 294,
      "words": [
        {
          "word": "between",
          "start": 292.847,
          "end": 293.119
        },
        {
          "word": "two",
          "start": 293.119,
          "end": 293.264
        },
        {
          "word": "local",
          "start": 293.264,
          "end": 293.458
        },
        {
          "word": "backend",
          "start": 293.458,
          "end": 293.729
        },
        {
          "word": "servers,",
          "start": 293.729,
          "end": 294
        }
      ]
    },
    {
      "start": 294,
      "end": 295.126,
      "words": [
        {
          "word": "or",
          "start": 294,
          "end": 294.172
        },
        {
          "word": "a",
          "start": 294.172,
          "end": 294.345
        },
        {
          "word": "massive",
          "start": 294.345,
          "end": 294.667
        },
        {
          "word": "large",
          "start": 294.667,
          "end": 294.897
        },
        {
          "word": "scale",
          "start": 294.897,
          "end": 295.126
        }
      ]
    },
    {
      "start": 295.126,
      "end": 296.437,
      "words": [
        {
          "word": "failover,",
          "start": 295.126,
          "end": 295.494
        },
        {
          "word": "where",
          "start": 295.494,
          "end": 295.724
        },
        {
          "word": "you",
          "start": 295.724,
          "end": 295.897
        },
        {
          "word": "are",
          "start": 295.897,
          "end": 296.069
        },
        {
          "word": "shifting",
          "start": 296.069,
          "end": 296.437
        }
      ]
    },
    {
      "start": 296.437,
      "end": 297.575,
      "words": [
        {
          "word": "global",
          "start": 296.437,
          "end": 296.713
        },
        {
          "word": "traffic",
          "start": 296.713,
          "end": 297.034
        },
        {
          "word": "away",
          "start": 297.034,
          "end": 297.218
        },
        {
          "word": "from",
          "start": 297.218,
          "end": 297.402
        },
        {
          "word": "an",
          "start": 297.402,
          "end": 297.575
        }
      ]
    },
    {
      "start": 297.575,
      "end": 299,
      "words": [
        {
          "word": "entire",
          "start": 297.575,
          "end": 297.851
        },
        {
          "word": "unhealthy",
          "start": 297.851,
          "end": 298.264
        },
        {
          "word": "geographic",
          "start": 298.264,
          "end": 298.724
        },
        {
          "word": "region.",
          "start": 298.724,
          "end": 299
        }
      ]
    },
    {
      "start": 299,
      "end": 300.251,
      "words": [
        {
          "word": "We",
          "start": 299,
          "end": 299.177
        },
        {
          "word": "are",
          "start": 299.177,
          "end": 299.354
        },
        {
          "word": "talking",
          "start": 299.354,
          "end": 299.684
        },
        {
          "word": "about",
          "start": 299.684,
          "end": 299.92
        },
        {
          "word": "routing",
          "start": 299.92,
          "end": 300.251
        }
      ]
    },
    {
      "start": 300.251,
      "end": 301.407,
      "words": [
        {
          "word": "millions",
          "start": 300.251,
          "end": 300.628
        },
        {
          "word": "of",
          "start": 300.628,
          "end": 300.805
        },
        {
          "word": "users",
          "start": 300.805,
          "end": 301.041
        },
        {
          "word": "from",
          "start": 301.041,
          "end": 301.23
        },
        {
          "word": "a",
          "start": 301.23,
          "end": 301.407
        }
      ]
    },
    {
      "start": 301.407,
      "end": 302.717,
      "words": [
        {
          "word": "completely",
          "start": 301.407,
          "end": 301.879
        },
        {
          "word": "down",
          "start": 301.879,
          "end": 302.068
        },
        {
          "word": "data",
          "start": 302.068,
          "end": 302.257
        },
        {
          "word": "center",
          "start": 302.257,
          "end": 302.54
        },
        {
          "word": "in",
          "start": 302.54,
          "end": 302.717
        }
      ]
    },
    {
      "start": 302.717,
      "end": 303,
      "words": [
        {
          "word": "Mumbai,",
          "start": 302.717,
          "end": 303
        }
      ]
    },
    {
      "start": 303,
      "end": 304.37,
      "words": [
        {
          "word": "straight",
          "start": 303,
          "end": 303.413
        },
        {
          "word": "over",
          "start": 303.413,
          "end": 303.62
        },
        {
          "word": "to",
          "start": 303.62,
          "end": 303.814
        },
        {
          "word": "a",
          "start": 303.814,
          "end": 304.008
        },
        {
          "word": "healthy",
          "start": 304.008,
          "end": 304.37
        }
      ]
    },
    {
      "start": 304.37,
      "end": 305.61,
      "words": [
        {
          "word": "one",
          "start": 304.37,
          "end": 304.563
        },
        {
          "word": "in",
          "start": 304.563,
          "end": 304.757
        },
        {
          "word": "Singapore.",
          "start": 304.757,
          "end": 305.222
        },
        {
          "word": "At",
          "start": 305.222,
          "end": 305.416
        },
        {
          "word": "the",
          "start": 305.416,
          "end": 305.61
        }
      ]
    },
    {
      "start": 305.61,
      "end": 306.579,
      "words": [
        {
          "word": "end",
          "start": 305.61,
          "end": 305.804
        },
        {
          "word": "of",
          "start": 305.804,
          "end": 305.997
        },
        {
          "word": "the",
          "start": 305.997,
          "end": 306.191
        },
        {
          "word": "day,",
          "start": 306.191,
          "end": 306.385
        },
        {
          "word": "the",
          "start": 306.385,
          "end": 306.579
        }
      ]
    },
    {
      "start": 306.579,
      "end": 307.793,
      "words": [
        {
          "word": "core",
          "start": 306.579,
          "end": 306.786
        },
        {
          "word": "logic",
          "start": 306.786,
          "end": 307.044
        },
        {
          "word": "is",
          "start": 307.044,
          "end": 307.238
        },
        {
          "word": "exactly",
          "start": 307.238,
          "end": 307.599
        },
        {
          "word": "the",
          "start": 307.599,
          "end": 307.793
        }
      ]
    },
    {
      "start": 307.793,
      "end": 308,
      "words": [
        {
          "word": "same.",
          "start": 307.793,
          "end": 308
        }
      ]
    },
    {
      "start": 308,
      "end": 309.238,
      "words": [
        {
          "word": "But",
          "start": 308,
          "end": 308.184
        },
        {
          "word": "of",
          "start": 308.184,
          "end": 308.368
        },
        {
          "word": "course,",
          "start": 308.368,
          "end": 308.662
        },
        {
          "word": "building",
          "start": 308.662,
          "end": 309.054
        },
        {
          "word": "all",
          "start": 309.054,
          "end": 309.238
        }
      ]
    },
    {
      "start": 309.238,
      "end": 310.855,
      "words": [
        {
          "word": "this",
          "start": 309.238,
          "end": 309.434
        },
        {
          "word": "automated",
          "start": 309.434,
          "end": 309.875
        },
        {
          "word": "failover",
          "start": 309.875,
          "end": 310.267
        },
        {
          "word": "requires",
          "start": 310.267,
          "end": 310.659
        },
        {
          "word": "some",
          "start": 310.659,
          "end": 310.855
        }
      ]
    },
    {
      "start": 310.855,
      "end": 312.473,
      "words": [
        {
          "word": "really",
          "start": 310.855,
          "end": 311.15
        },
        {
          "word": "careful",
          "start": 311.15,
          "end": 311.493
        },
        {
          "word": "design",
          "start": 311.493,
          "end": 311.787
        },
        {
          "word": "around",
          "start": 311.787,
          "end": 312.081
        },
        {
          "word": "capacity",
          "start": 312.081,
          "end": 312.473
        }
      ]
    },
    {
      "start": 312.473,
      "end": 313,
      "words": [
        {
          "word": "and",
          "start": 312.473,
          "end": 312.657
        },
        {
          "word": "routing.",
          "start": 312.657,
          "end": 313
        }
      ]
    },
    {
      "start": 313,
      "end": 314.452,
      "words": [
        {
          "word": "And",
          "start": 313,
          "end": 313.269
        },
        {
          "word": "that",
          "start": 313.269,
          "end": 313.556
        },
        {
          "word": "leads",
          "start": 313.556,
          "end": 313.914
        },
        {
          "word": "us",
          "start": 313.914,
          "end": 314.183
        },
        {
          "word": "to",
          "start": 314.183,
          "end": 314.452
        }
      ]
    },
    {
      "start": 314.452,
      "end": 316.656,
      "words": [
        {
          "word": "our",
          "start": 314.452,
          "end": 314.72
        },
        {
          "word": "next",
          "start": 314.72,
          "end": 315.007
        },
        {
          "word": "section,",
          "start": 315.007,
          "end": 315.509
        },
        {
          "word": "chaos",
          "start": 315.509,
          "end": 315.867
        },
        {
          "word": "engineering",
          "start": 315.867,
          "end": 316.656
        }
      ]
    },
    {
      "start": 316.656,
      "end": 318,
      "words": [
        {
          "word": "and",
          "start": 316.656,
          "end": 316.925
        },
        {
          "word": "testing",
          "start": 316.925,
          "end": 317.427
        },
        {
          "word": "failover.",
          "start": 317.427,
          "end": 318
        }
      ]
    },
    {
      "start": 318,
      "end": 319.985,
      "words": [
        {
          "word": "There",
          "start": 318,
          "end": 318.375
        },
        {
          "word": "is",
          "start": 318.375,
          "end": 318.655
        },
        {
          "word": "an",
          "start": 318.655,
          "end": 318.936
        },
        {
          "word": "absolute",
          "start": 318.936,
          "end": 319.536
        },
        {
          "word": "golden",
          "start": 319.536,
          "end": 319.985
        }
      ]
    },
    {
      "start": 319.985,
      "end": 321.82,
      "words": [
        {
          "word": "rule",
          "start": 319.985,
          "end": 320.285
        },
        {
          "word": "in",
          "start": 320.285,
          "end": 320.566
        },
        {
          "word": "systems",
          "start": 320.566,
          "end": 321.09
        },
        {
          "word": "design,",
          "start": 321.09,
          "end": 321.539
        },
        {
          "word": "and",
          "start": 321.539,
          "end": 321.82
        }
      ]
    },
    {
      "start": 321.82,
      "end": 323,
      "words": [
        {
          "word": "it",
          "start": 321.82,
          "end": 322.101
        },
        {
          "word": "goes",
          "start": 322.101,
          "end": 322.401
        },
        {
          "word": "like",
          "start": 322.401,
          "end": 322.7
        },
        {
          "word": "this.",
          "start": 322.7,
          "end": 323
        }
      ]
    },
    {
      "start": 323,
      "end": 324.189,
      "words": [
        {
          "word": "The",
          "start": 323,
          "end": 323.182
        },
        {
          "word": "absolute",
          "start": 323.182,
          "end": 323.57
        },
        {
          "word": "worst",
          "start": 323.57,
          "end": 323.813
        },
        {
          "word": "time",
          "start": 323.813,
          "end": 324.007
        },
        {
          "word": "to",
          "start": 324.007,
          "end": 324.189
        }
      ]
    },
    {
      "start": 324.189,
      "end": 325.682,
      "words": [
        {
          "word": "discover",
          "start": 324.189,
          "end": 324.578
        },
        {
          "word": "your",
          "start": 324.578,
          "end": 324.772
        },
        {
          "word": "failover",
          "start": 324.772,
          "end": 325.16
        },
        {
          "word": "process",
          "start": 325.16,
          "end": 325.5
        },
        {
          "word": "is",
          "start": 325.5,
          "end": 325.682
        }
      ]
    },
    {
      "start": 325.682,
      "end": 326.762,
      "words": [
        {
          "word": "broken,",
          "start": 325.682,
          "end": 325.973
        },
        {
          "word": "is",
          "start": 325.973,
          "end": 326.155
        },
        {
          "word": "right",
          "start": 326.155,
          "end": 326.398
        },
        {
          "word": "in",
          "start": 326.398,
          "end": 326.58
        },
        {
          "word": "the",
          "start": 326.58,
          "end": 326.762
        }
      ]
    },
    {
      "start": 326.762,
      "end": 328,
      "words": [
        {
          "word": "middle",
          "start": 326.762,
          "end": 327.053
        },
        {
          "word": "of",
          "start": 327.053,
          "end": 327.235
        },
        {
          "word": "an",
          "start": 327.235,
          "end": 327.417
        },
        {
          "word": "actual",
          "start": 327.417,
          "end": 327.709
        },
        {
          "word": "outage.",
          "start": 327.709,
          "end": 328
        }
      ]
    },
    {
      "start": 328,
      "end": 329.899,
      "words": [
        {
          "word": "That",
          "start": 328,
          "end": 328.31
        },
        {
          "word": "is",
          "start": 328.31,
          "end": 328.601
        },
        {
          "word": "exactly",
          "start": 328.601,
          "end": 329.143
        },
        {
          "word": "why",
          "start": 329.143,
          "end": 329.434
        },
        {
          "word": "mature",
          "start": 329.434,
          "end": 329.899
        }
      ]
    },
    {
      "start": 329.899,
      "end": 333,
      "words": [
        {
          "word": "engineering",
          "start": 329.899,
          "end": 330.752
        },
        {
          "word": "teams",
          "start": 330.752,
          "end": 331.14
        },
        {
          "word": "practice",
          "start": 331.14,
          "end": 331.76
        },
        {
          "word": "chaos",
          "start": 331.76,
          "end": 332.147
        },
        {
          "word": "engineering.",
          "start": 332.147,
          "end": 333
        }
      ]
    },
    {
      "start": 333,
      "end": 334.676,
      "words": [
        {
          "word": "They",
          "start": 333,
          "end": 333.233
        },
        {
          "word": "run",
          "start": 333.233,
          "end": 333.452
        },
        {
          "word": "intense",
          "start": 333.452,
          "end": 333.86
        },
        {
          "word": "failover",
          "start": 333.86,
          "end": 334.327
        },
        {
          "word": "drills",
          "start": 334.327,
          "end": 334.676
        }
      ]
    },
    {
      "start": 334.676,
      "end": 336.426,
      "words": [
        {
          "word": "where",
          "start": 334.676,
          "end": 334.968
        },
        {
          "word": "they",
          "start": 334.968,
          "end": 335.201
        },
        {
          "word": "intentionally",
          "start": 335.201,
          "end": 335.959
        },
        {
          "word": "shut",
          "start": 335.959,
          "end": 336.192
        },
        {
          "word": "down",
          "start": 336.192,
          "end": 336.426
        }
      ]
    },
    {
      "start": 336.426,
      "end": 338,
      "words": [
        {
          "word": "servers,",
          "start": 336.426,
          "end": 336.834
        },
        {
          "word": "kill",
          "start": 336.834,
          "end": 337.067
        },
        {
          "word": "backend",
          "start": 337.067,
          "end": 337.475
        },
        {
          "word": "processes,",
          "start": 337.475,
          "end": 338
        }
      ]
    },
    {
      "start": 338,
      "end": 339.439,
      "words": [
        {
          "word": "or",
          "start": 338,
          "end": 338.218
        },
        {
          "word": "just",
          "start": 338.218,
          "end": 338.451
        },
        {
          "word": "sever",
          "start": 338.451,
          "end": 338.741
        },
        {
          "word": "network",
          "start": 338.741,
          "end": 339.148
        },
        {
          "word": "paths.",
          "start": 339.148,
          "end": 339.439
        }
      ]
    },
    {
      "start": 339.439,
      "end": 340.805,
      "words": [
        {
          "word": "It",
          "start": 339.439,
          "end": 339.657
        },
        {
          "word": "sounds",
          "start": 339.657,
          "end": 340.006
        },
        {
          "word": "crazy,",
          "start": 340.006,
          "end": 340.297
        },
        {
          "word": "right?",
          "start": 340.297,
          "end": 340.587
        },
        {
          "word": "But",
          "start": 340.587,
          "end": 340.805
        }
      ]
    },
    {
      "start": 340.805,
      "end": 342.273,
      "words": [
        {
          "word": "it",
          "start": 340.805,
          "end": 341.023
        },
        {
          "word": "is",
          "start": 341.023,
          "end": 341.241
        },
        {
          "word": "absolutely",
          "start": 341.241,
          "end": 341.823
        },
        {
          "word": "the",
          "start": 341.823,
          "end": 342.041
        },
        {
          "word": "only",
          "start": 342.041,
          "end": 342.273
        }
      ]
    },
    {
      "start": 342.273,
      "end": 343,
      "words": [
        {
          "word": "way",
          "start": 342.273,
          "end": 342.491
        },
        {
          "word": "to",
          "start": 342.491,
          "end": 342.709
        },
        {
          "word": "prove",
          "start": 342.709,
          "end": 343
        }
      ]
    },
    {
      "start": 343,
      "end": 344.748,
      "words": [
        {
          "word": "your",
          "start": 343,
          "end": 343.206
        },
        {
          "word": "recovery",
          "start": 343.206,
          "end": 343.617
        },
        {
          "word": "mechanisms",
          "start": 343.617,
          "end": 344.131
        },
        {
          "word": "actually",
          "start": 344.131,
          "end": 344.542
        },
        {
          "word": "work",
          "start": 344.542,
          "end": 344.748
        }
      ]
    },
    {
      "start": 344.748,
      "end": 345.802,
      "words": [
        {
          "word": "in",
          "start": 344.748,
          "end": 344.941
        },
        {
          "word": "the",
          "start": 344.941,
          "end": 345.134
        },
        {
          "word": "real",
          "start": 345.134,
          "end": 345.339
        },
        {
          "word": "world,",
          "start": 345.339,
          "end": 345.596
        },
        {
          "word": "long",
          "start": 345.596,
          "end": 345.802
        }
      ]
    },
    {
      "start": 345.802,
      "end": 347.293,
      "words": [
        {
          "word": "before",
          "start": 345.802,
          "end": 346.111
        },
        {
          "word": "real",
          "start": 346.111,
          "end": 346.316
        },
        {
          "word": "paying",
          "start": 346.316,
          "end": 346.625
        },
        {
          "word": "customers",
          "start": 346.625,
          "end": 347.087
        },
        {
          "word": "ever",
          "start": 347.087,
          "end": 347.293
        }
      ]
    },
    {
      "start": 347.293,
      "end": 348,
      "words": [
        {
          "word": "feel",
          "start": 347.293,
          "end": 347.499
        },
        {
          "word": "the",
          "start": 347.499,
          "end": 347.692
        },
        {
          "word": "impact.",
          "start": 347.692,
          "end": 348
        }
      ]
    },
    {
      "start": 348,
      "end": 349.176,
      "words": [
        {
          "word": "All",
          "start": 348,
          "end": 348.221
        },
        {
          "word": "right,",
          "start": 348.221,
          "end": 348.515
        },
        {
          "word": "let",
          "start": 348.515,
          "end": 348.735
        },
        {
          "word": "us",
          "start": 348.735,
          "end": 348.956
        },
        {
          "word": "do",
          "start": 348.956,
          "end": 349.176
        }
      ]
    },
    {
      "start": 349.176,
      "end": 350.559,
      "words": [
        {
          "word": "a",
          "start": 349.176,
          "end": 349.397
        },
        {
          "word": "really",
          "start": 349.397,
          "end": 349.75
        },
        {
          "word": "quick",
          "start": 349.75,
          "end": 350.044
        },
        {
          "word": "recap",
          "start": 350.044,
          "end": 350.338
        },
        {
          "word": "of",
          "start": 350.338,
          "end": 350.559
        }
      ]
    },
    {
      "start": 350.559,
      "end": 352.235,
      "words": [
        {
          "word": "everything",
          "start": 350.559,
          "end": 351.147
        },
        {
          "word": "we",
          "start": 351.147,
          "end": 351.368
        },
        {
          "word": "have",
          "start": 351.368,
          "end": 351.603
        },
        {
          "word": "covered",
          "start": 351.603,
          "end": 352.015
        },
        {
          "word": "in",
          "start": 352.015,
          "end": 352.235
        }
      ]
    },
    {
      "start": 352.235,
      "end": 353,
      "words": [
        {
          "word": "this",
          "start": 352.235,
          "end": 352.471
        },
        {
          "word": "explainer.",
          "start": 352.471,
          "end": 353
        }
      ]
    },
    {
      "start": 353,
      "end": 354.914,
      "words": [
        {
          "word": "First,",
          "start": 353,
          "end": 353.309
        },
        {
          "word": "health",
          "start": 353.309,
          "end": 353.679
        },
        {
          "word": "checks",
          "start": 353.679,
          "end": 354.049
        },
        {
          "word": "detect",
          "start": 354.049,
          "end": 354.42
        },
        {
          "word": "failures",
          "start": 354.42,
          "end": 354.914
        }
      ]
    },
    {
      "start": 354.914,
      "end": 356.426,
      "words": [
        {
          "word": "by",
          "start": 354.914,
          "end": 355.145
        },
        {
          "word": "making",
          "start": 355.145,
          "end": 355.515
        },
        {
          "word": "sure",
          "start": 355.515,
          "end": 355.762
        },
        {
          "word": "our",
          "start": 355.762,
          "end": 355.994
        },
        {
          "word": "systems",
          "start": 355.994,
          "end": 356.426
        }
      ]
    },
    {
      "start": 356.426,
      "end": 358,
      "words": [
        {
          "word": "can",
          "start": 356.426,
          "end": 356.657
        },
        {
          "word": "actually",
          "start": 356.657,
          "end": 357.151
        },
        {
          "word": "do",
          "start": 357.151,
          "end": 357.383
        },
        {
          "word": "useful",
          "start": 357.383,
          "end": 357.753
        },
        {
          "word": "work.",
          "start": 357.753,
          "end": 358
        }
      ]
    },
    {
      "start": 358,
      "end": 359.527,
      "words": [
        {
          "word": "Second,",
          "start": 358,
          "end": 358.346
        },
        {
          "word": "failover",
          "start": 358.346,
          "end": 358.807
        },
        {
          "word": "kicks",
          "start": 358.807,
          "end": 359.095
        },
        {
          "word": "in",
          "start": 359.095,
          "end": 359.311
        },
        {
          "word": "to",
          "start": 359.311,
          "end": 359.527
        }
      ]
    },
    {
      "start": 359.527,
      "end": 361.646,
      "words": [
        {
          "word": "automatically",
          "start": 359.527,
          "end": 360.277
        },
        {
          "word": "redirect",
          "start": 360.277,
          "end": 360.738
        },
        {
          "word": "the",
          "start": 360.738,
          "end": 360.954
        },
        {
          "word": "traffic.",
          "start": 360.954,
          "end": 361.357
        },
        {
          "word": "Third,",
          "start": 361.357,
          "end": 361.646
        }
      ]
    },
    {
      "start": 361.646,
      "end": 363,
      "words": [
        {
          "word": "we",
          "start": 361.646,
          "end": 361.862
        },
        {
          "word": "use",
          "start": 361.862,
          "end": 362.078
        },
        {
          "word": "strict",
          "start": 362.078,
          "end": 362.424
        },
        {
          "word": "thresholds",
          "start": 362.424,
          "end": 363
        }
      ]
    },
    {
      "start": 363,
      "end": 364.396,
      "words": [
        {
          "word": "to",
          "start": 363,
          "end": 363.19
        },
        {
          "word": "balance",
          "start": 363.19,
          "end": 363.546
        },
        {
          "word": "our",
          "start": 363.546,
          "end": 363.736
        },
        {
          "word": "recovery",
          "start": 363.736,
          "end": 364.142
        },
        {
          "word": "speed",
          "start": 364.142,
          "end": 364.396
        }
      ]
    },
    {
      "start": 364.396,
      "end": 365.589,
      "words": [
        {
          "word": "against",
          "start": 364.396,
          "end": 364.751
        },
        {
          "word": "the",
          "start": 364.751,
          "end": 364.942
        },
        {
          "word": "risk",
          "start": 364.942,
          "end": 365.145
        },
        {
          "word": "of",
          "start": 365.145,
          "end": 365.335
        },
        {
          "word": "false",
          "start": 365.335,
          "end": 365.589
        }
      ]
    },
    {
      "start": 365.589,
      "end": 367.201,
      "words": [
        {
          "word": "positives.",
          "start": 365.589,
          "end": 366.046
        },
        {
          "word": "Fourth,",
          "start": 366.046,
          "end": 366.35
        },
        {
          "word": "load",
          "start": 366.35,
          "end": 366.553
        },
        {
          "word": "balancers",
          "start": 366.553,
          "end": 367.01
        },
        {
          "word": "are",
          "start": 367.01,
          "end": 367.201
        }
      ]
    },
    {
      "start": 367.201,
      "end": 368,
      "words": [
        {
          "word": "the",
          "start": 367.201,
          "end": 367.391
        },
        {
          "word": "unsung",
          "start": 367.391,
          "end": 367.695
        },
        {
          "word": "heroes",
          "start": 367.695,
          "end": 368
        }
      ]
    },
    {
      "start": 368,
      "end": 369.991,
      "words": [
        {
          "word": "automating",
          "start": 368,
          "end": 368.608
        },
        {
          "word": "that",
          "start": 368.608,
          "end": 368.851
        },
        {
          "word": "recovery",
          "start": 368.851,
          "end": 369.337
        },
        {
          "word": "routing.",
          "start": 369.337,
          "end": 369.763
        },
        {
          "word": "And",
          "start": 369.763,
          "end": 369.991
        }
      ]
    },
    {
      "start": 369.991,
      "end": 372.164,
      "words": [
        {
          "word": "finally,",
          "start": 369.991,
          "end": 370.416
        },
        {
          "word": "failover",
          "start": 370.416,
          "end": 370.903
        },
        {
          "word": "absolutely",
          "start": 370.903,
          "end": 371.511
        },
        {
          "word": "100",
          "start": 371.511,
          "end": 371.739
        },
        {
          "word": "percent",
          "start": 371.739,
          "end": 372.164
        }
      ]
    },
    {
      "start": 372.164,
      "end": 373,
      "words": [
        {
          "word": "must",
          "start": 372.164,
          "end": 372.407
        },
        {
          "word": "be",
          "start": 372.407,
          "end": 372.635
        },
        {
          "word": "tested.",
          "start": 372.635,
          "end": 373
        }
      ]
    },
    {
      "start": 373,
      "end": 373.975,
      "words": [
        {
          "word": "So",
          "start": 373,
          "end": 373.19
        },
        {
          "word": "if",
          "start": 373.19,
          "end": 373.38
        },
        {
          "word": "you",
          "start": 373.38,
          "end": 373.57
        },
        {
          "word": "take",
          "start": 373.57,
          "end": 373.772
        },
        {
          "word": "away",
          "start": 373.772,
          "end": 373.975
        }
      ]
    },
    {
      "start": 373.975,
      "end": 375.063,
      "words": [
        {
          "word": "just",
          "start": 373.975,
          "end": 374.177
        },
        {
          "word": "one",
          "start": 374.177,
          "end": 374.367
        },
        {
          "word": "thing",
          "start": 374.367,
          "end": 374.62
        },
        {
          "word": "today,",
          "start": 374.62,
          "end": 374.873
        },
        {
          "word": "let",
          "start": 374.873,
          "end": 375.063
        }
      ]
    },
    {
      "start": 375.063,
      "end": 376.456,
      "words": [
        {
          "word": "it",
          "start": 375.063,
          "end": 375.253
        },
        {
          "word": "be",
          "start": 375.253,
          "end": 375.443
        },
        {
          "word": "this.",
          "start": 375.443,
          "end": 375.646
        },
        {
          "word": "True",
          "start": 375.646,
          "end": 375.848
        },
        {
          "word": "availability",
          "start": 375.848,
          "end": 376.456
        }
      ]
    },
    {
      "start": 376.456,
      "end": 377.646,
      "words": [
        {
          "word": "is",
          "start": 376.456,
          "end": 376.646
        },
        {
          "word": "not",
          "start": 376.646,
          "end": 376.835
        },
        {
          "word": "just",
          "start": 376.835,
          "end": 377.038
        },
        {
          "word": "having",
          "start": 377.038,
          "end": 377.342
        },
        {
          "word": "backup",
          "start": 377.342,
          "end": 377.646
        }
      ]
    },
    {
      "start": 377.646,
      "end": 378,
      "words": [
        {
          "word": "servers",
          "start": 377.646,
          "end": 378
        }
      ]
    },
    {
      "start": 378,
      "end": 379.497,
      "words": [
        {
          "word": "sitting",
          "start": 378,
          "end": 378.355
        },
        {
          "word": "in",
          "start": 378.355,
          "end": 378.546
        },
        {
          "word": "a",
          "start": 378.546,
          "end": 378.736
        },
        {
          "word": "closet",
          "start": 378.736,
          "end": 379.041
        },
        {
          "word": "somewhere.",
          "start": 379.041,
          "end": 379.497
        }
      ]
    },
    {
      "start": 379.497,
      "end": 380.64,
      "words": [
        {
          "word": "It",
          "start": 379.497,
          "end": 379.688
        },
        {
          "word": "is",
          "start": 379.688,
          "end": 379.878
        },
        {
          "word": "what",
          "start": 379.878,
          "end": 380.081
        },
        {
          "word": "happens",
          "start": 380.081,
          "end": 380.437
        },
        {
          "word": "when",
          "start": 380.437,
          "end": 380.64
        }
      ]
    },
    {
      "start": 380.64,
      "end": 382.607,
      "words": [
        {
          "word": "detection,",
          "start": 380.64,
          "end": 381.096
        },
        {
          "word": "routing,",
          "start": 381.096,
          "end": 381.452
        },
        {
          "word": "replication,",
          "start": 381.452,
          "end": 382.01
        },
        {
          "word": "and",
          "start": 382.01,
          "end": 382.201
        },
        {
          "word": "recovery",
          "start": 382.201,
          "end": 382.607
        }
      ]
    },
    {
      "start": 382.607,
      "end": 383,
      "words": [
        {
          "word": "all",
          "start": 382.607,
          "end": 382.797
        },
        {
          "word": "work",
          "start": 382.797,
          "end": 383
        }
      ]
    },
    {
      "start": 383,
      "end": 384.898,
      "words": [
        {
          "word": "completely",
          "start": 383,
          "end": 383.535
        },
        {
          "word": "seamlessly",
          "start": 383.535,
          "end": 384.07
        },
        {
          "word": "together.",
          "start": 384.07,
          "end": 384.497
        },
        {
          "word": "But",
          "start": 384.497,
          "end": 384.698
        },
        {
          "word": "you",
          "start": 384.698,
          "end": 384.898
        }
      ]
    },
    {
      "start": 384.898,
      "end": 386.048,
      "words": [
        {
          "word": "know,",
          "start": 384.898,
          "end": 385.112
        },
        {
          "word": "all",
          "start": 385.112,
          "end": 385.313
        },
        {
          "word": "of",
          "start": 385.313,
          "end": 385.513
        },
        {
          "word": "this",
          "start": 385.513,
          "end": 385.727
        },
        {
          "word": "leaves",
          "start": 385.727,
          "end": 386.048
        }
      ]
    },
    {
      "start": 386.048,
      "end": 387.572,
      "words": [
        {
          "word": "us",
          "start": 386.048,
          "end": 386.249
        },
        {
          "word": "with",
          "start": 386.249,
          "end": 386.463
        },
        {
          "word": "one",
          "start": 386.463,
          "end": 386.663
        },
        {
          "word": "really",
          "start": 386.663,
          "end": 386.984
        },
        {
          "word": "provocative",
          "start": 386.984,
          "end": 387.572
        }
      ]
    },
    {
      "start": 387.572,
      "end": 388,
      "words": [
        {
          "word": "question.",
          "start": 387.572,
          "end": 388
        }
      ]
    },
    {
      "start": 388,
      "end": 388.925,
      "words": [
        {
          "word": "Let",
          "start": 388,
          "end": 388.165
        },
        {
          "word": "us",
          "start": 388.165,
          "end": 388.33
        },
        {
          "word": "say",
          "start": 388.33,
          "end": 388.496
        },
        {
          "word": "our",
          "start": 388.496,
          "end": 388.661
        },
        {
          "word": "system",
          "start": 388.661,
          "end": 388.925
        }
      ]
    },
    {
      "start": 388.925,
      "end": 390.368,
      "words": [
        {
          "word": "does",
          "start": 388.925,
          "end": 389.101
        },
        {
          "word": "recover",
          "start": 389.101,
          "end": 389.41
        },
        {
          "word": "automatically",
          "start": 389.41,
          "end": 389.982
        },
        {
          "word": "and",
          "start": 389.982,
          "end": 390.148
        },
        {
          "word": "super",
          "start": 390.148,
          "end": 390.368
        }
      ]
    },
    {
      "start": 390.368,
      "end": 391.392,
      "words": [
        {
          "word": "fast.",
          "start": 390.368,
          "end": 390.544
        },
        {
          "word": "How",
          "start": 390.544,
          "end": 390.709
        },
        {
          "word": "do",
          "start": 390.709,
          "end": 390.874
        },
        {
          "word": "we",
          "start": 390.874,
          "end": 391.04
        },
        {
          "word": "actually",
          "start": 391.04,
          "end": 391.392
        }
      ]
    },
    {
      "start": 391.392,
      "end": 392.559,
      "words": [
        {
          "word": "measure",
          "start": 391.392,
          "end": 391.7
        },
        {
          "word": "how",
          "start": 391.7,
          "end": 391.866
        },
        {
          "word": "much",
          "start": 391.866,
          "end": 392.042
        },
        {
          "word": "downtime",
          "start": 392.042,
          "end": 392.394
        },
        {
          "word": "is",
          "start": 392.394,
          "end": 392.559
        }
      ]
    },
    {
      "start": 392.559,
      "end": 393,
      "words": [
        {
          "word": "acceptable?",
          "start": 392.559,
          "end": 393
        }
      ]
    },
    {
      "start": 393,
      "end": 394.03,
      "words": [
        {
          "word": "I",
          "start": 393,
          "end": 393.203
        },
        {
          "word": "mean,",
          "start": 393.203,
          "end": 393.42
        },
        {
          "word": "how",
          "start": 393.42,
          "end": 393.623
        },
        {
          "word": "do",
          "start": 393.623,
          "end": 393.827
        },
        {
          "word": "big",
          "start": 393.827,
          "end": 394.03
        }
      ]
    },
    {
      "start": 394.03,
      "end": 395.71,
      "words": [
        {
          "word": "tech",
          "start": 394.03,
          "end": 394.247
        },
        {
          "word": "companies",
          "start": 394.247,
          "end": 394.734
        },
        {
          "word": "define",
          "start": 394.734,
          "end": 395.06
        },
        {
          "word": "their",
          "start": 395.06,
          "end": 395.331
        },
        {
          "word": "targets",
          "start": 395.331,
          "end": 395.71
        }
      ]
    },
    {
      "start": 395.71,
      "end": 397.092,
      "words": [
        {
          "word": "and",
          "start": 395.71,
          "end": 395.913
        },
        {
          "word": "calculate",
          "start": 395.913,
          "end": 396.401
        },
        {
          "word": "the",
          "start": 396.401,
          "end": 396.604
        },
        {
          "word": "real",
          "start": 396.604,
          "end": 396.821
        },
        {
          "word": "world",
          "start": 396.821,
          "end": 397.092
        }
      ]
    },
    {
      "start": 397.092,
      "end": 398,
      "words": [
        {
          "word": "cost",
          "start": 397.092,
          "end": 397.309
        },
        {
          "word": "of",
          "start": 397.309,
          "end": 397.512
        },
        {
          "word": "being",
          "start": 397.512,
          "end": 397.783
        },
        {
          "word": "down?",
          "start": 397.783,
          "end": 398
        }
      ]
    },
    {
      "start": 398,
      "end": 399.032,
      "words": [
        {
          "word": "Well,",
          "start": 398,
          "end": 398.212
        },
        {
          "word": "you",
          "start": 398.212,
          "end": 398.41
        },
        {
          "word": "will",
          "start": 398.41,
          "end": 398.622
        },
        {
          "word": "have",
          "start": 398.622,
          "end": 398.833
        },
        {
          "word": "to",
          "start": 398.833,
          "end": 399.032
        }
      ]
    },
    {
      "start": 399.032,
      "end": 400.05,
      "words": [
        {
          "word": "join",
          "start": 399.032,
          "end": 399.243
        },
        {
          "word": "us",
          "start": 399.243,
          "end": 399.442
        },
        {
          "word": "in",
          "start": 399.442,
          "end": 399.64
        },
        {
          "word": "our",
          "start": 399.64,
          "end": 399.839
        },
        {
          "word": "next",
          "start": 399.839,
          "end": 400.05
        }
      ]
    },
    {
      "start": 400.05,
      "end": 401.505,
      "words": [
        {
          "word": "explainer",
          "start": 400.05,
          "end": 400.526
        },
        {
          "word": "to",
          "start": 400.526,
          "end": 400.725
        },
        {
          "word": "find",
          "start": 400.725,
          "end": 400.937
        },
        {
          "word": "out,",
          "start": 400.937,
          "end": 401.135
        },
        {
          "word": "because",
          "start": 401.135,
          "end": 401.505
        }
      ]
    },
    {
      "start": 401.505,
      "end": 402.577,
      "words": [
        {
          "word": "we",
          "start": 401.505,
          "end": 401.704
        },
        {
          "word": "are",
          "start": 401.704,
          "end": 401.902
        },
        {
          "word": "going",
          "start": 401.902,
          "end": 402.167
        },
        {
          "word": "to",
          "start": 402.167,
          "end": 402.365
        },
        {
          "word": "dive",
          "start": 402.365,
          "end": 402.577
        }
      ]
    },
    {
      "start": 402.577,
      "end": 403,
      "words": [
        {
          "word": "deep",
          "start": 402.577,
          "end": 402.788
        },
        {
          "word": "into",
          "start": 402.788,
          "end": 403
        }
      ]
    },
    {
      "start": 403,
      "end": 405.516,
      "words": [
        {
          "word": "availability",
          "start": 403,
          "end": 403.759
        },
        {
          "word": "targets,",
          "start": 403.759,
          "end": 404.203
        },
        {
          "word": "uptime",
          "start": 404.203,
          "end": 404.582
        },
        {
          "word": "percentages,",
          "start": 404.582,
          "end": 405.278
        },
        {
          "word": "and",
          "start": 405.278,
          "end": 405.516
        }
      ]
    },
    {
      "start": 405.516,
      "end": 406.956,
      "words": [
        {
          "word": "the",
          "start": 405.516,
          "end": 405.753
        },
        {
          "word": "famous",
          "start": 405.753,
          "end": 406.133
        },
        {
          "word": "nines.",
          "start": 406.133,
          "end": 406.449
        },
        {
          "word": "Make",
          "start": 406.449,
          "end": 406.703
        },
        {
          "word": "sure",
          "start": 406.703,
          "end": 406.956
        }
      ]
    },
    {
      "start": 406.956,
      "end": 408,
      "words": [
        {
          "word": "you",
          "start": 406.956,
          "end": 407.193
        },
        {
          "word": "hit",
          "start": 407.193,
          "end": 407.43
        },
        {
          "word": "subscribe",
          "start": 407.43,
          "end": 408
        }
      ]
    },
    {
      "start": 408,
      "end": 415.316,
      "words": [
        {
          "word": "so",
          "start": 408,
          "end": 409.444
        },
        {
          "word": "you",
          "start": 409.444,
          "end": 410.888
        },
        {
          "word": "do",
          "start": 410.888,
          "end": 412.332
        },
        {
          "word": "not",
          "start": 412.332,
          "end": 413.775
        },
        {
          "word": "miss",
          "start": 413.775,
          "end": 415.316
        }
      ]
    },
    {
      "start": 415.316,
      "end": 422.631,
      "words": [
        {
          "word": "it,",
          "start": 415.316,
          "end": 416.759
        },
        {
          "word": "and",
          "start": 416.759,
          "end": 418.203
        },
        {
          "word": "I",
          "start": 418.203,
          "end": 419.647
        },
        {
          "word": "will",
          "start": 419.647,
          "end": 421.187
        },
        {
          "word": "see",
          "start": 421.187,
          "end": 422.631
        }
      ]
    },
    {
      "start": 422.631,
      "end": 426,
      "words": [
        {
          "word": "you",
          "start": 422.631,
          "end": 424.075
        },
        {
          "word": "there.",
          "start": 424.075,
          "end": 426
        }
      ]
    }
  ]
};
