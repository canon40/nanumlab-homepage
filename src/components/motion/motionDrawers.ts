import type { MotionId } from "../../data/motionCatalog";

type Ctx = CanvasRenderingContext2D;

function bg(ctx: Ctx, w: number, h: number) {
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, "#0a1929");
  g.addColorStop(1, "#102a43");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function grid(ctx: Ctx, w: number, h: number, t: number) {
  ctx.strokeStyle = `rgba(37, 99, 235, ${0.04 + Math.sin(t * 0.002) * 0.02})`;
  ctx.lineWidth = 1;
  for (let x = 0; x < w; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, h);
    ctx.stroke();
  }
  for (let y = 0; y < h; y += 32) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(w, y);
    ctx.stroke();
  }
}

function drawPlatform(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  grid(ctx, w, h, t);
  const x1 = w * 0.2;
  const x2 = w * 0.8;
  const y = h * 0.5;
  ctx.strokeStyle = "#334e68";
  ctx.lineWidth = 2;
  ctx.strokeRect(w * 0.08, h * 0.25, w * 0.28, h * 0.5);
  ctx.strokeRect(w * 0.64, h * 0.25, w * 0.28, h * 0.5);
  const progress = (t * 0.001) % 1;
  const px = x1 + (x2 - x1) * progress;
  ctx.beginPath();
  ctx.arc(px, y, 6, 0, Math.PI * 2);
  ctx.fillStyle = "#3b82f6";
  ctx.fill();
  ctx.strokeStyle = "rgba(59, 130, 246, 0.4)";
  ctx.setLineDash([4, 8]);
  ctx.beginPath();
  ctx.moveTo(x1, y);
  ctx.lineTo(x2, y);
  ctx.stroke();
  ctx.setLineDash([]);
}

function drawWaves(ctx: Ctx, w: number, h: number, t: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.beginPath();
  for (let x = 0; x < w; x += 2) {
    const y = h * 0.5 + Math.sin(x * 0.04 + t * 0.008) * 20 + Math.sin(x * 0.02 + t * 0.012) * 10;
    if (x === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
}

function drawEverydayAi(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  drawWaves(ctx, w, h, t, "#22d3ee");
  ctx.fillStyle = "#1e3a5f";
  ctx.fillRect(w * 0.15, h * 0.65, w * 0.7, h * 0.18);
  const text = "voice search...";
  const len = Math.min(text.length, Math.floor((t * 0.003) % (text.length + 5)));
  ctx.fillStyle = "#94a3b8";
  ctx.font = "12px system-ui";
  ctx.fillText(text.slice(0, len), w * 0.2, h * 0.77);
}

function drawAutomation(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const steps = 4;
  for (let i = 0; i < steps; i++) {
    const active = Math.floor((t * 0.001) % (steps + 1)) > i;
    ctx.fillStyle = active ? "#3b82f6" : "#1e3a5f";
    ctx.fillRect(w * (0.12 + i * 0.22), h * 0.4, w * 0.16, h * 0.2);
    if (active) {
      ctx.fillStyle = "#34d399";
      ctx.font = "bold 14px system-ui";
      ctx.fillText("✓", w * (0.18 + i * 0.22), h * 0.54);
    }
  }
}

function drawSecurity(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const r = Math.min(w, h) * 0.28;
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  for (let i = 0; i < 6; i++) {
    const a = (t * 0.002 + (i * Math.PI) / 3) % (Math.PI * 2);
    const px = cx + Math.cos(a) * r * 0.7;
    const py = cy + Math.sin(a) * r * 0.7;
    ctx.beginPath();
    ctx.arc(px, py, 4, 0, Math.PI * 2);
    ctx.fillStyle = "#22d3ee";
    ctx.fill();
  }
  ctx.fillStyle = "#60a5fa";
  ctx.font = "bold 11px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("On-Premise", cx, cy + 4);
  ctx.textAlign = "left";
}

function drawMydata(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  for (let i = 0; i < 8; i++) {
    const x = ((t * 0.15 + i * 40) % (w + 40)) - 20;
    ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + (i % 3) * 0.15})`;
    ctx.fillRect(x, h * 0.3 + (i % 4) * 12, 30, 4);
  }
  ctx.fillStyle = "#34d399";
  ctx.font = "bold 28px system-ui";
  ctx.textAlign = "center";
  ctx.fillText("0.5s", w / 2, h * 0.62);
  ctx.fillStyle = "#94a3b8";
  ctx.font = "11px system-ui";
  ctx.fillText("MyData verify", w / 2, h * 0.75);
  ctx.textAlign = "left";
}

function drawInclusion(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const pulse = 1 + Math.sin(t * 0.006) * 0.15;
  ctx.fillStyle = "#1e3a5f";
  ctx.fillRect(w * 0.2, h * 0.2, w * 0.6, h * 0.6);
  ctx.beginPath();
  ctx.arc(w / 2, h * 0.38, 18 * pulse, 0, Math.PI * 2);
  ctx.fillStyle = "#3b82f6";
  ctx.fill();
  drawWaves(ctx, w, h, t, "rgba(34, 211, 238, 0.6)");
  ctx.fillStyle = "#34d399";
  ctx.fillRect(w * 0.3, h * 0.68, w * 0.4, h * 0.1);
}

function drawScanLine(ctx: Ctx, w: number, h: number, t: number, label: string) {
  bg(ctx, w, h);
  ctx.fillStyle = "#f8fafc";
  ctx.fillRect(w * 0.15, h * 0.2, w * 0.35, h * 0.6);
  ctx.fillStyle = "#102a43";
  ctx.fillRect(w * 0.55, h * 0.2, w * 0.3, h * 0.6);
  const sy = h * 0.2 + ((t * 0.08) % (h * 0.6));
  ctx.fillStyle = "rgba(59, 130, 246, 0.5)";
  ctx.fillRect(w * 0.15, sy, w * 0.35, 3);
  ctx.fillStyle = "#60a5fa";
  ctx.font = "10px system-ui";
  ctx.fillText(label, w * 0.58, h * 0.5);
}

function drawSpectrum(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const bars = 16;
  for (let i = 0; i < bars; i++) {
    const bh = 10 + Math.abs(Math.sin(t * 0.01 + i * 0.5)) * (h * 0.35);
    ctx.fillStyle = `hsl(${210 + i * 4}, 80%, 55%)`;
    ctx.fillRect(w * 0.15 + i * (w * 0.045), h * 0.7 - bh, w * 0.03, bh);
  }
}

function drawPins(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const pins = [
    [0.3, 0.4],
    [0.55, 0.35],
    [0.7, 0.55],
    [0.4, 0.6],
  ];
  pins.forEach(([px, py], i) => {
    const pulse = 1 + Math.sin(t * 0.005 + i) * 0.3;
    ctx.beginPath();
    ctx.arc(w * px, h * py, 8 * pulse, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
  });
}

function drawGeo(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const cx = w * 0.4;
  const cy = h * 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 50, 0, Math.PI * 2);
  ctx.fillStyle = "#1e3a5f";
  ctx.fill();
  ctx.strokeStyle = "#3b82f6";
  const ox = cx + Math.cos(t * 0.002) * 70;
  const oy = cy + Math.sin(t * 0.002) * 30;
  ctx.beginPath();
  ctx.arc(ox, oy, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#22d3ee";
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(ox, oy);
  ctx.stroke();
}

function drawXr(ctx: Ctx, w: number, h: number, t: number) {
  bg(ctx, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const s = 40;
  const rot = t * 0.001;
  const pts = [
    [-1, -1, -1],
    [1, -1, -1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, 1],
    [-1, 1, 1],
  ].map(([x, y, z]) => {
    const xr = x * Math.cos(rot) - z * Math.sin(rot);
    const zr = x * Math.sin(rot) + z * Math.cos(rot);
    return [cx + xr * s, cy + y * s * 0.8 + zr * s * 0.3];
  });
  const edges = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 0],
    [4, 5],
    [5, 6],
    [6, 7],
    [7, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  ctx.strokeStyle = "#60a5fa";
  ctx.lineWidth = 2;
  edges.forEach(([a, b]) => {
    ctx.beginPath();
    ctx.moveTo(pts[a][0], pts[a][1]);
    ctx.lineTo(pts[b][0], pts[b][1]);
    ctx.stroke();
  });
}

function drawPhase(ctx: Ctx, w: number, h: number, t: number, n: number) {
  bg(ctx, w, h);
  for (let i = 0; i < n; i++) {
    const on = Math.floor((t * 0.0008) % (n + 1)) > i;
    ctx.fillStyle = on ? "#3b82f6" : "#1e3a5f";
    ctx.beginPath();
    ctx.arc(w * (0.2 + i * 0.3), h * 0.5, 22, 0, Math.PI * 2);
    ctx.fill();
    if (i < n - 1) {
      ctx.strokeStyle = "#486581";
      ctx.beginPath();
      ctx.moveTo(w * (0.2 + i * 0.3) + 24, h * 0.5);
      ctx.lineTo(w * (0.2 + (i + 1) * 0.3) - 24, h * 0.5);
      ctx.stroke();
    }
  }
}

function drawNodes(ctx: Ctx, w: number, h: number, t: number, label: string) {
  bg(ctx, w, h);
  grid(ctx, w, h, t);
  ctx.fillStyle = "#60a5fa";
  ctx.font = "bold 12px system-ui";
  ctx.textAlign = "center";
  ctx.fillText(label, w / 2, h * 0.2);
  ctx.textAlign = "left";
  for (let i = 0; i < 5; i++) {
    const a = t * 0.002 + (i * Math.PI * 2) / 5;
    ctx.beginPath();
    ctx.arc(w / 2 + Math.cos(a) * 60, h * 0.55 + Math.sin(a) * 40, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#3b82f6";
    ctx.fill();
  }
}

const drawers: Record<MotionId, (ctx: Ctx, w: number, h: number, t: number) => void> = {
  platform: drawPlatform,
  "everyday-ai": drawEverydayAi,
  automation: drawAutomation,
  security: drawSecurity,
  mydata: drawMydata,
  inclusion: drawInclusion,
  "smart-ticket": (c, w, h, t) => drawScanLine(c, w, h, t, "QR Ticket"),
  ocr: (c, w, h, t) => drawScanLine(c, w, h, t, "OCR"),
  callcenter: drawSpectrum,
  local: drawPins,
  geo: drawGeo,
  xr: drawXr,
  "phase-1": (c, w, h, t) => drawPhase(c, w, h, t, 3),
  "phase-2": (c, w, h, t) => drawPhase(c, w, h, t, 2),
  "phase-3": (c, w, h, t) => drawPhase(c, w, h, t, 3),
  frontend: (c, w, h, t) => drawNodes(c, w, h, t, "React · Vite"),
  backend: (c, w, h, t) => drawNodes(c, w, h, t, "FastAPI · RBAC"),
  database: drawGeo,
  ai: drawSpectrum,
};

export function drawMotionFrame(ctx: Ctx, id: MotionId, w: number, h: number, t: number) {
  const draw = drawers[id] ?? drawers.platform;
  draw(ctx, w, h, t);
}
