window.__timelines = window.__timelines || {};

const DURATION = 426;
const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });

function q(selector) {
  return document.querySelector(selector);
}

function qa(selector) {
  return Array.from(document.querySelectorAll(selector));
}

function sceneIn(id, t) {
  tl.set(id, { opacity: 1, zIndex: 3 }, t);
  tl.from(`${id} .section-header`, { y: -24, opacity: 0, duration: 0.55, ease: "power3.out" }, t + 0.12);
  tl.from(`${id} .world`, { scale: 0.985, opacity: 0, duration: 0.55, ease: "sine.out" }, t + 0.16);
  tl.from(`${id} .node, ${id} .phone, ${id} .panel, ${id} .label-plate, ${id} .health-layer, ${id} .mini-server, ${id} .region, ${id} .drill-board`, {
    y: 24,
    opacity: 0,
    duration: 0.48,
    stagger: 0.035,
    ease: "back.out(1.25)",
  }, t + 0.34);
}

function transition(from, to, t) {
  tl.set(to, { opacity: 1, zIndex: 2 }, t);
  tl.set(from, { zIndex: 3 }, t);
  tl.to(from, { filter: "blur(10px)", scale: 1.015, duration: 0.28, ease: "power2.in" }, t);
  tl.to(to, { opacity: 1, duration: 0.38, ease: "sine.inOut" }, t + 0.1);
  tl.to(from, { opacity: 0, duration: 0.32, ease: "sine.inOut" }, t + 0.22);
  tl.set(from, { filter: "none", scale: 1, zIndex: 1 }, t + 0.58);
  sceneIn(to, t + 0.2);
}

function pulse(selector, start, end, scale = 1.04) {
  const cycle = 1.6;
  tl.to(selector, {
    scale,
    duration: cycle / 2,
    repeat: Math.ceil((end - start) / cycle) - 1,
    yoyo: true,
    ease: "sine.inOut",
  }, start);
}

function routePacket(selector, points, start, end) {
  const duration = 2.4;
  const repeat = Math.max(0, Math.ceil((end - start) / duration) - 1);
  const vars = { duration, repeat, ease: "none" };
  points.forEach((point, index) => {
    vars[`x${index ? index + 1 : ""}`] = point[0];
    vars[`y${index ? index + 1 : ""}`] = point[1];
  });
}

function movePacket(selector, from, to, start, end, delay = 0) {
  const travel = 2.6;
  tl.set(selector, { x: from[0], y: from[1], opacity: 1 }, start + delay);
  tl.to(selector, {
    x: to[0],
    y: to[1],
    duration: travel,
    repeat: Math.max(0, Math.ceil((end - start - delay) / travel) - 1),
    ease: "none",
  }, start + delay);
}

function activateXs(selector, times) {
  const xs = qa(`${selector} .fail-x`);
  xs.forEach((el, index) => {
    const at = times[index] ?? times[times.length - 1];
    tl.to(el, { backgroundColor: "#f4f4f4", color: "#000000", borderColor: "#f4f4f4", duration: 0.16, ease: "power4.out" }, at);
  });
}

function buildCaptions() {
  let stage = q("#caption-stage");
  if (!stage) {
    const root = q("#root") || document.body;
    if (!root) return;
    stage = document.createElement("div");
    stage.id = "caption-stage";
    stage.className = "caption-stage";
    root.appendChild(stage);
  }
  const groups = window.TRANSCRIPT_DATA.captionGroups;
  const maxGroups = groups.length;

  groups.forEach((group, gi) => {
    const groupEl = document.createElement("div");
    groupEl.className = "caption-group";
    groupEl.id = `cg-${gi}`;
    group.words.forEach((word, wi) => {
      const wordEl = document.createElement("span");
      wordEl.className = "caption-word";
      wordEl.id = `cg-${gi}-w-${wi}`;
      wordEl.textContent = word.word;
      groupEl.appendChild(wordEl);
    });
    stage.appendChild(groupEl);
  });

  groups.forEach((group, gi) => {
    const groupSelector = `#cg-${gi}`;
    tl.set(groupSelector, { opacity: 1 }, group.start);
    tl.from(groupSelector, { y: 10, scale: 0.985, duration: 0.12, ease: "power2.out" }, group.start);
    group.words.forEach((word, wi) => {
      const wordSelector = `#cg-${gi}-w-${wi}`;
      tl.set(wordSelector, { className: "caption-word active" }, word.start);
      tl.set(wordSelector, { className: "caption-word spoken" }, word.end);
    });
    tl.to(groupSelector, { opacity: 0, scale: 0.98, duration: 0.1, ease: "power2.in" }, Math.max(group.start, group.end - 0.1));
    tl.set(groupSelector, { opacity: 0 }, group.end);
  });

  tl.set("#caption-stage", { opacity: 0 }, 402);
  tl.set("#caption-stage", { opacity: 1 }, 0);
  console.info(`Caption groups: ${maxGroups}`);
}

function buildStoryboard() {
  sceneIn("#scene-setup", 0.12);
  transition("#scene-setup", "#scene-health", 59.2);
  transition("#scene-health", "#scene-layered", 96.4);
  transition("#scene-layered", "#scene-failover", 136.4);
  transition("#scene-failover", "#scene-threshold", 174.2);
  transition("#scene-threshold", "#scene-lb", 245.2);
  transition("#scene-lb", "#scene-chaos", 312.4);

  movePacket(".setup-packet.p1", [305, 380], [690, 310], 6, 31, 0);
  movePacket(".setup-packet.p2", [800, 320], [1210, 300], 10, 39, 0.5);
  movePacket(".setup-packet.p3", [1235, 370], [1510, 430], 15, 45, 1);
  pulse("#setup-replica", 20, 39, 1.035);
  tl.from("#setup-alert", { x: -38, opacity: 0, duration: 0.4, ease: "power3.out" }, 39);
  tl.from("#manual-timeline", { y: 34, opacity: 0, duration: 0.55, ease: "back.out(1.4)" }, 46);
  tl.from("#automation-metric", { y: 25, opacity: 0, duration: 0.42, ease: "expo.out" }, 54);
  tl.to("#route-manual", { stroke: "rgba(255,255,255,0.62)", duration: 0.2 }, 45);
  tl.to("#setup-focus", { scale: 1.035, x: -38, y: -10, duration: 42, ease: "sine.inOut" }, 8);

  tl.from("#probe-health", { scale: 0.2, opacity: 0, duration: 0.35, ease: "back.out(2)" }, 61);
  tl.to("#probe-health", { x: 350, y: -22, duration: 4.2, ease: "power1.inOut" }, 63);
  tl.to("#probe-health", { x: 845, y: 8, duration: 5.5, ease: "power1.inOut" }, 69);
  tl.to("#health-db-line, #health-cache-line", { stroke: "rgba(255,255,255,0.18)", strokeDasharray: "6 18", duration: 0.22, ease: "power4.out" }, 81);
  tl.to("#health-db, #health-cache", { opacity: 0.35, duration: 0.2 }, 81.2);
  tl.from("#api-ok", { y: -18, opacity: 0, duration: 0.34, ease: "power3.out" }, 77);
  tl.to("#health-spinner", { rotation: 360, duration: 1.2, repeat: 12, ease: "none" }, 82);
  tl.to("#phone-status", { backgroundColor: "#0b0b0b", color: "#f4f4f4", border: "2px solid rgba(255,255,255,0.6)", duration: 0.2 }, 90);
  tl.from("#useful-fail", { y: 18, opacity: 0, duration: 0.34, ease: "expo.out" }, 92);

  tl.from("#layer-process", { y: 40, opacity: 0, duration: 0.45, ease: "power3.out" }, 101);
  tl.from("#layer-application", { y: 36, opacity: 0, duration: 0.45, ease: "back.out(1.3)" }, 110);
  tl.from("#layer-business", { y: 32, opacity: 0, duration: 0.45, ease: "expo.out" }, 121);
  tl.from("#layer-phone", { x: -45, opacity: 0, duration: 0.45, ease: "power2.out" }, 122);
  tl.from("#powered-on", { x: 35, opacity: 0, duration: 0.38, ease: "power3.out" }, 127);
  activateXs("#layer-fails", [130.6, 132.8, 135.2]);

  activateXs("#fo-counter", [139.2, 141.4, 143.6]);
  tl.to("#fo-primary", { opacity: 0.32, duration: 0.2 }, 145);
  tl.to("#fo-old-route", { stroke: "rgba(255,255,255,0.16)", strokeDasharray: "8 18", duration: 0.2 }, 146);
  tl.to("#fo-secondary", { backgroundColor: "#f4f4f4", color: "#000000", duration: 0.24, ease: "power4.out" }, 154);
  tl.to("#fo-secondary .node-label, #fo-secondary .node-state", { color: "#000000", duration: 0.12 }, 154);
  tl.to("#fo-new-route", { stroke: "rgba(255,255,255,0.9)", strokeDasharray: "none", duration: 0.26 }, 160);
  movePacket(".fo-packet", [282, 420], [1452, 420], 160, 174, 0);
  tl.from("#fo-duration", { y: 24, opacity: 0, duration: 0.42, ease: "expo.out" }, 168);

  tl.from("#network-blip", { y: -22, opacity: 0, duration: 0.35, ease: "power3.out" }, 178);
  tl.to("#blip-line", { strokeDashoffset: -80, duration: 1.2, repeat: 16, ease: "none" }, 179);
  tl.to("#domino-a", { rotation: 5, y: 22, opacity: 0.45, duration: 0.22, ease: "power4.in" }, 190);
  tl.to("#domino-b", { rotation: 5, y: 22, opacity: 0.45, duration: 0.22, ease: "power4.in" }, 190.22);
  tl.to("#domino-c", { rotation: 5, y: 22, opacity: 0.45, duration: 0.22, ease: "power4.in" }, 190.44);
  tl.from("#threshold-scale", { y: 35, opacity: 0, duration: 0.5, ease: "back.out(1.35)" }, 205);
  tl.to("#threshold-scale .scale-knob", { x: -250, duration: 0.8, ease: "power2.inOut" }, 212);
  tl.to("#threshold-scale .scale-knob", { x: 250, duration: 0.8, ease: "power2.inOut" }, 223);
  tl.to("#threshold-scale .scale-knob", { x: 0, duration: 0.8, ease: "power2.inOut" }, 236);
  activateXs("#threshold-counter", [231.3, 233.2, 235.1]);
  tl.from("#sweet-spot", { scale: 0.96, opacity: 0, duration: 0.42, ease: "expo.out" }, 239);

  tl.to("#lb-node", { scale: 1.04, duration: 0.4, yoyo: true, repeat: 4, ease: "sine.inOut" }, 250);
  tl.to("#server7", { opacity: 0.22, borderStyle: "dashed", duration: 0.28, ease: "power4.out" }, 265);
  tl.to("#lb-fanout", { strokeDashoffset: -120, duration: 1.4, repeat: 24, ease: "none" }, 252);
  tl.from("#lb-rule", { y: -22, opacity: 0, duration: 0.36, ease: "power3.out" }, 278);
  tl.to("#lb-focus", { scale: 1.05, x: -80, y: -25, duration: 8, ease: "sine.inOut" }, 288);
  tl.to("#mumbai", { opacity: 0.32, duration: 0.24 }, 295);
  tl.to("#singapore", { backgroundColor: "#f4f4f4", color: "#000000", duration: 0.24, ease: "power4.out" }, 299);
  tl.to("#singapore .status", { color: "rgba(0,0,0,0.72)", duration: 0.12 }, 299);
  tl.to("#global-route", { stroke: "rgba(255,255,255,0.88)", strokeDasharray: "none", duration: 0.24 }, 300);

  tl.from("#drill-board .drill-row", { x: -38, opacity: 0, duration: 0.44, stagger: 0.12, ease: "power3.out" }, 316);
  tl.fromTo("#recap-loop", { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.55, ease: "back.out(1.2)" }, 348);
  tl.to("#recap-loop .route", { strokeDashoffset: -220, duration: 2.2, repeat: 13, ease: "none" }, 349);
  tl.fromTo("#uptime-ladder", { x: -45, opacity: 0 }, { x: 0, opacity: 1, duration: 0.48, ease: "power3.out" }, 389);
  tl.to("#drill-board, #recap-loop", { opacity: 0.12, duration: 0.35, ease: "sine.inOut" }, 388.8);
  tl.from("#uptime-ladder .uptime-row", { x: -32, opacity: 0, duration: 0.38, stagger: 0.16, ease: "expo.out" }, 390);
  tl.to("#uptime-ladder, #recap-loop", { opacity: 0.08, duration: 0.35, ease: "sine.inOut" }, 404.4);
  tl.fromTo("#outro-cta", { x: 42, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: "power3.out" }, 405);
  tl.to("#scene-chaos", { opacity: 0, duration: 1.0, ease: "sine.inOut" }, 424.8);
}

if (q("#scene-setup")) {
  buildCaptions();
  buildStoryboard();
}

tl.seek(0);
window.mainTimeline = tl;
window.__timelines["main"] = tl;

const seekParam = new URLSearchParams(window.location.search).get("seek");
if (seekParam !== null) {
  const seekTime = Number(seekParam);
  if (Number.isFinite(seekTime)) {
    tl.seek(seekTime, false);
  }
}
