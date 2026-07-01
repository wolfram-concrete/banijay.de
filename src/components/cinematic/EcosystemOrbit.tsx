import { CLUSTERS, getCompaniesByCluster } from "@/data/companies";

// Animiertes Ökosystem-Visual für die „Banijay-Welt"-Sektion: zentrales B,
// zwei langsam gegenläufig rotierende Ringe mit Cluster-Knoten. Reine
// CSS-Animation (siehe globals .eco-spin / .eco-spin-rev).

const C = 200;
const R_OUTER = 150;
const R_INNER = 96;

// 5 Cluster auf einem Pentagon (Start oben).
const outerNodes = CLUSTERS.map((cluster, i) => {
  const angle = (-90 + i * 72) * (Math.PI / 180);
  return {
    cluster,
    x: C + R_OUTER * Math.cos(angle),
    y: C + R_OUTER * Math.sin(angle),
    count: getCompaniesByCluster(cluster.id).length,
  };
});

// 8 abstrakte „Company"-Punkte auf dem inneren Ring.
const innerNodes = Array.from({ length: 8 }, (_, i) => {
  const angle = (i * 45) * (Math.PI / 180);
  return { x: C + R_INNER * Math.cos(angle), y: C + R_INNER * Math.sin(angle) };
});

const ringOrigin = { transformBox: "view-box" as const, transformOrigin: "200px 200px" };

export function EcosystemOrbit() {
  const total = CLUSTERS.reduce((sum, c) => sum + getCompaniesByCluster(c.id).length, 0);

  return (
    <div className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 400 400" className="h-auto w-full" role="img" aria-label="Banijay-Ökosystem: ein Zentrum, fünf kreative Cluster">
        {/* Konzentrische Hilfskreise */}
        <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke="var(--border)" strokeWidth="1" />
        <circle cx={C} cy={C} r={R_INNER} fill="none" stroke="var(--border)" strokeWidth="1" />

        {/* Innerer Ring (gegenläufig) */}
        <g className="eco-spin-rev" style={ringOrigin}>
          {innerNodes.map((n, i) => (
            <circle key={i} cx={n.x} cy={n.y} r="3" fill="var(--muted-foreground)" opacity="0.5" />
          ))}
        </g>

        {/* Äußerer Ring (Cluster) */}
        <g className="eco-spin" style={ringOrigin}>
          {outerNodes.map((n, i) => (
            <g key={i}>
              <line x1={C} y1={C} x2={n.x} y2={n.y} stroke="var(--border)" strokeWidth="1" />
              <circle cx={n.x} cy={n.y} r="9" fill="var(--bj-coral)" />
              <circle cx={n.x} cy={n.y} r="9" fill="none" stroke="var(--background)" strokeWidth="2" />
            </g>
          ))}
        </g>

        {/* Zentrum: Banijay-B */}
        <circle cx={C} cy={C} r="46" fill="var(--foreground)" />
        <text
          x={C}
          y={C}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--background)"
          style={{ fontFamily: "var(--font-sharp)", fontWeight: 500, fontSize: "44px" }}
        >
          B
        </text>
      </svg>

      <p className="mt-2 text-center font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
        {CLUSTERS.length} Cluster · {total} Companies
      </p>
    </div>
  );
}
