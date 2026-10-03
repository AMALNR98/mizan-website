export function HomeOrbitAnimation() {
  const keywords = [
    { className: "k1", label: "Policy" },
    { className: "k2", label: "Evidence" },
    { className: "k3", label: "Review" },
    { className: "k4", label: "Approval" },
    { className: "k5", label: "Owner" },
    { className: "k6", label: "Conditions" },
    { className: "k7", label: "Monitor" },
    { className: "k8", label: "Audit" },
    { className: "k9", label: "Human control" },
    { className: "k10", label: "Public purpose" },
  ];

  return (
    <section className="orbit-landscape command-graph-landscape" aria-label="Animated MIZAN governance command graph">
      <div className="command-graph-stage" aria-label="MIZAN application keywords">
        <svg className="command-graph-map" viewBox="0 0 1440 760" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id="commandPath" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#aebdca" stopOpacity="0.14" />
              <stop offset="0.48" stopColor="#e4c77e" stopOpacity="0.82" />
              <stop offset="1" stopColor="#aebdca" stopOpacity="0.16" />
            </linearGradient>
            <linearGradient id="commandPlane" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#102842" stopOpacity="0.08" />
              <stop offset="0.52" stopColor="#e4c77e" stopOpacity="0.08" />
              <stop offset="1" stopColor="#102842" stopOpacity="0.10" />
            </linearGradient>
            <filter id="commandGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="9" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
          </defs>

          <g className="command-graph-plane">
            <path d="M102 464 L710 160 L1338 466 L718 724 Z" />
            <path d="M214 408 L806 124 L1242 334" />
            <path d="M130 512 L650 246 L1310 544" />
            <path d="M286 344 L972 664" />
            <path d="M420 276 L1114 604" />
            <path d="M552 214 L1240 536" />
            <path d="M256 538 L876 220" />
            <path d="M394 596 L1012 278" />
            <path d="M544 656 L1162 338" />
          </g>

          <g className="command-graph-softforms">
            <path d="M118 170 C240 94 402 100 524 162 C656 230 770 224 906 154 C1048 80 1218 96 1346 188 L1346 0 L118 0 Z" />
            <path d="M52 622 C176 528 326 510 486 570 C628 624 756 618 902 554 C1072 480 1220 500 1398 612 L1398 760 L52 760 Z" />
          </g>

          <g className="command-graph-routes">
            <path id="commandRouteA" d="M246 426 C410 342 540 296 698 379 C858 464 1006 428 1216 318" pathLength="1" />
            <path id="commandRouteB" d="M358 564 C504 476 588 432 704 382 C842 324 986 246 1194 204" pathLength="1" />
            <path id="commandRouteC" d="M316 278 C472 352 570 400 710 382 C888 360 1008 468 1248 560" pathLength="1" />
            <path id="commandRouteD" d="M168 510 C346 470 496 500 628 432 C760 364 900 354 1330 430" pathLength="1" />
          </g>

          <g className="command-graph-pulses" filter="url(#commandGlow)">
            <circle r="5"><animateMotion dur="8.4s" repeatCount="indefinite"><mpath href="#commandRouteA" /></animateMotion></circle>
            <circle r="4"><animateMotion dur="10.2s" begin="-2.8s" repeatCount="indefinite"><mpath href="#commandRouteB" /></animateMotion></circle>
            <circle r="4"><animateMotion dur="11.8s" begin="-5s" repeatCount="indefinite"><mpath href="#commandRouteC" /></animateMotion></circle>
            <circle r="6"><animateMotion dur="13s" begin="-7s" repeatCount="indefinite"><mpath href="#commandRouteD" /></animateMotion></circle>
          </g>

          <g className="command-graph-nodes" filter="url(#commandGlow)">
            <circle cx="246" cy="426" r="8" /><circle cx="358" cy="564" r="6" /><circle cx="704" cy="382" r="10" />
            <circle cx="1194" cy="204" r="7" /><circle cx="1216" cy="318" r="6" /><circle cx="1248" cy="560" r="8" />
            <circle cx="316" cy="278" r="5" /><circle cx="1330" cy="430" r="5" />
          </g>
        </svg>

        <div className="command-core" aria-hidden="true">
          <span className="command-core-orbit one"></span>
          <span className="command-core-orbit two"></span>
          <span className="command-core-tile"><i></i></span>
        </div>

        <div className="command-keywords" aria-hidden="false">
          {keywords.map((keyword) => (
            <span key={keyword.className} className={`command-keyword ${keyword.className}`}>
              <i></i>{keyword.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
