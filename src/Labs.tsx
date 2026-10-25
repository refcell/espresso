import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronRight,
  Droplets,
  Flame,
  Info,
  RotateCcw,
  ShieldCheck,
  Thermometer,
  TriangleAlert,
  Waves,
} from "lucide-react";

const phases = [
  {
    id: "idle",
    label: "Idle",
    title: "Ready, not flowing.",
    description:
      "The pump is off. Heaters may cycle to maintain temperature, but no water is being dispensed. The diagram does not simulate boiler refill until you choose that state.",
    pump: "Off",
    valve: "Supply closed",
    route: "No dispensing flow",
  },
  {
    id: "brew",
    label: "Brewing",
    title: "One continuous path.",
    description:
      "The pump moves fresh water toward the brew boiler. The three-way valve connects the hot supply to the group, and water passes through the coffee into the cup.",
    pump: "On",
    valve: "Supply → group",
    route: "Reservoir → pump → brew boiler → valve → group → cup",
  },
  {
    id: "release",
    label: "Release",
    title: "Let the pressure go.",
    description:
      "The pump stops. The three-way valve closes the supply and opens the group’s route to the drain. This is a brief discharge, shown as a repeating trace for visibility.",
    pump: "Off",
    valve: "Group → drain",
    route: "Group → three-way valve → drip tray",
  },
  {
    id: "steam",
    label: "Steaming",
    title: "Stored heat at work.",
    description:
      "The steam valve opens. Steam flows from the boiler’s headspace to the wand because of the pressure difference. The brew pump is not driving this steam flow.",
    pump: "Off in this state",
    valve: "Steam valve open",
    route: "Steam boiler headspace → steam valve → wand",
  },
  {
    id: "refill",
    label: "Boiler refill",
    title: "Restore the water level.",
    description:
      "A low water-level signal opens the fill valve and starts the pump in this tank-fed example. Incoming water replenishes the steam boiler. This is a separate operation from dispensing steam.",
    pump: "On",
    valve: "Fill valve open",
    route: "Reservoir → pump → fill valve → steam boiler",
  },
];

export function CircuitLab() {
  const [phase, setPhase] = useState(phases[1]);
  const activePaths =
    phase.id === "brew"
      ? ["supply", "brew", "coffee"]
      : phase.id === "release"
        ? ["release"]
        : phase.id === "steam"
          ? ["steam"]
          : phase.id === "refill"
            ? ["supply", "fill"]
            : [];
  const paths = [
    { id: "supply", d: "M112 133H195", color: "#92c7c0" },
    { id: "brew", d: "M251 133H336M454 133H552M598 133H659", color: "#d6ad7e" },
    { id: "coffee", d: "M688 159V211", color: "#c9a578" },
    { id: "release", d: "M659 145H579V225H535V390H600", color: "#a9b0cc" },
    { id: "fill", d: "M223 162V311H366", color: "#92c7c0" },
    { id: "steam", d: "M485 287H595V311H651V345", color: "#e0bd96" },
  ];
  return (
    <div className="lab-split circuit-lab">
      <div className="dark-canvas">
        <div className="canvas-topline">
          <span>
            THE WATER CIRCUIT{" "}
            <span className="canvas-subtitle">A functional schematic</span>
          </span>
          <span className="figure-number">FIG. 03</span>
        </div>
        <svg
          viewBox="0 0 760 460"
          role="img"
          aria-label={`${phase.label}: ${phase.route}`}
        >
          <defs>
            <pattern
              id="circuit-grid"
              width="30"
              height="30"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r=".8" fill="#768c7c" opacity=".22" />
            </pattern>
            <marker
              id="arrow"
              viewBox="0 0 10 10"
              refX="7"
              refY="5"
              markerWidth="4"
              markerHeight="4"
              orient="auto-start-reverse"
            >
              <path d="M0 0l10 5L0 10Z" fill="context-stroke" />
            </marker>
          </defs>
          <rect width="760" height="460" fill="url(#circuit-grid)" />
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="#536958"
              strokeWidth="3"
              fill="none"
            />
          ))}
          {paths
            .filter((path) => activePaths.includes(path.id))
            .map((path) => (
              <g key={path.id}>
                <path
                  d={path.d}
                  stroke={path.color}
                  strokeWidth="4"
                  fill="none"
                  markerEnd="url(#arrow)"
                />
                <path
                  className="flow-trace"
                  d={path.d}
                  stroke="#fff9df"
                  strokeWidth="2"
                  strokeDasharray="5 12"
                  fill="none"
                />
              </g>
            ))}
          <g fill="#20392e" stroke="#9cae94" strokeWidth="1.5">
            <path d="M48 85v79q0 10 10 10h44q10 0 10-10V85" />
            <path d="M52 129h56v35H52Z" fill="#67968c" opacity=".5" />
            <path d="M52 129q14-9 28 0t28 0" fill="none" stroke="#95c5ba" />
            <circle cx="223" cy="133" r="28" />
            <path d="M212 117l27 16-27 16Z" fill="#b9c79c" />
            <rect x="336" y="94" width="118" height="78" rx="20" />
            <path
              d="M356 150q7-24 14 0t14 0t14 0t14 0t14 0"
              stroke="#dda672"
              strokeWidth="3"
              fill="none"
            />
            <rect x="552" y="110" width="46" height="46" rx="4" />
            <path
              d={phase.id === "brew" ? "M560 133h30" : "M590 135h-15v15"}
              stroke={phase.id === "release" ? "#a9b0cc" : "#d6ad7e"}
              strokeWidth="3"
              fill="none"
            />
            <path d="M659 109h57v47l-28 10-29-10Z" />
            <path d="M664 142h47v9h-47" fill="#6e5137" stroke="#bd9976" />
            <path d="M668 216h40v23q-20 19-40 0Z" fill="#d9ddc8" />
            <path d="M708 220h9v12h-9" fill="none" />
            <rect x="366" y="265" width="119" height="95" rx="20" />
            <path
              d="M371 315h109v24q0 16-16 16h-77q-16 0-16-16Z"
              fill="#62978b"
              opacity=".5"
            />
            <path
              d="M371 315q14-8 28 0t28 0t28 0t25 0"
              fill="none"
              stroke="#9cc4b5"
            />
            <path
              d="M393 295q-8-7 0-14m20 14q-8-7 0-14m20 14q-8-7 0-14"
              stroke="#dfc29c"
              fill="none"
            />
            <path
              d="M293 300l20 22v-22l-20 22Z"
              fill={phase.id === "refill" ? "#8ebbb0" : "#2b4536"}
            />
            <path
              d="M585 275l20 22v-22l-20 22Z"
              fill={phase.id === "steam" ? "#d6b284" : "#2b4536"}
            />
            <path d="M600 381h72v18h-72Z" fill="#536754" />
            <path d="M605 386h62" strokeDasharray="3 3" />
          </g>
          <g fill="#d5ddca" fontSize="11" textAnchor="middle">
            <text x="80" y="63">
              01 · Reservoir
            </text>
            <text x="223" y="83">
              02 · Pump
            </text>
            <text x="395" y="76">
              03 · Brew boiler
            </text>
            <text x="575" y="83">
              04 · 3-way valve
            </text>
            <text x="688" y="85">
              05 · Group
            </text>
            <text x="688" y="265">
              Espresso
            </text>
            <text x="305" y="346">
              Fill valve
            </text>
            <text x="425" y="387">
              Steam boiler
            </text>
            <text x="598" y="253">
              Steam valve
            </text>
            <text x="670" y="363">
              Wand
            </text>
            <text x="638" y="424">
              Drip tray
            </text>
          </g>
          <text
            x="395"
            y="125"
            fill="#e0b98d"
            fontSize="10"
            textAnchor="middle"
          >
            BREW WATER
          </text>
          <text x="425" y="345" fill="#c6ded0" fontSize="9" textAnchor="middle">
            WATER + STEAM
          </text>
        </svg>
        <div className="circuit-legend">
          <span>
            <i className="cold" /> Fresh water
          </span>
          <span>
            <i className="hot" /> Hot water / steam
          </span>
          <span>
            <i className="drain" /> Discharge
          </span>
        </div>
      </div>
      <aside className="lab-sidebar">
        <span className="eyebrow">CHANGE THE MACHINE STATE</span>
        <div className="state-buttons">
          {phases.map((item, i) => (
            <button
              key={item.id}
              className={phase.id === item.id ? "active" : ""}
              aria-pressed={phase.id === item.id}
              onClick={() => setPhase(item)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
              {phase.id === item.id ? (
                <span className="status-dot" />
              ) : (
                <ChevronRight size={14} />
              )}
            </button>
          ))}
        </div>
        <div className="state-description" aria-live="polite">
          <h2>{phase.title}</h2>
          <p>{phase.description}</p>
          <dl>
            <div>
              <dt>Pump</dt>
              <dd>{phase.pump}</dd>
            </div>
            <div>
              <dt>Valve state</dt>
              <dd>{phase.valve}</dd>
            </div>
          </dl>
          <p className="route-text">{phase.route}</p>
        </div>
        <p className="fine-print">
          Simplified routing. Safety valves, check valves, and preheating
          circuits are omitted.
        </p>
      </aside>
    </div>
  );
}

const architectures = [
  {
    id: "single",
    name: "Single boiler",
    subtitle: "One vessel. Two jobs.",
    detail:
      "Brew first, then switch the same boiler to a hotter steam setting. The machine needs time and the correct refill or cooldown procedure between modes.",
    independent: false,
  },
  {
    id: "hx",
    name: "Heat exchanger",
    subtitle: "Two water paths. One boiler.",
    detail:
      "Fresh brew water passes through a separate tube in the steam boiler. The streams never mix. Brew temperature depends on flow, idle time, and the group; it is not a separately controlled boiler setpoint.",
    independent: false,
  },
  {
    id: "dual",
    name: "Dual boiler",
    subtitle: "Different jobs. Dedicated boilers.",
    detail:
      "The brew boiler controls water for extraction. A separate, hotter boiler supplies steam. Their independent heating systems let you brew and steam at the same time.",
    independent: true,
  },
];

export function HeatLab() {
  const [architecture, setArchitecture] = useState(architectures[2]);
  const [target, setTarget] = useState(93);
  const [steam, setSteam] = useState(false);
  const steamOnly = architecture.id === "single" && steam;
  return (
    <div className="heat-lab bordered-lab">
      <div className="lab-toolbar">
        <span className="eyebrow">THREE WAYS TO MANAGE HEAT</span>
        <div className="segmented">
          {architectures.map((item) => (
            <button
              className={architecture.id === item.id ? "active" : ""}
              aria-pressed={architecture.id === item.id}
              onClick={() => setArchitecture(item)}
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
      <div className="heat-layout">
        <div className="heat-visual">
          <div className="thermal-heading">
            <span className="eyebrow">{architecture.name.toUpperCase()}</span>
            <h2>{architecture.subtitle}</h2>
          </div>
          <div
            className={`boiler-illustrations ${architecture.id === "dual" ? "two-boilers" : ""}`}
          >
            <div
              className={`boiler-vessel ${steamOnly || architecture.id === "hx" ? "steam-vessel" : ""}`}
            >
              <div className="vessel-neck" />
              <div className="vessel-cap" />
              <div className="vessel-body">
                <span>
                  {architecture.id === "hx"
                    ? "STEAM BOILER"
                    : steamOnly
                      ? "STEAM MODE"
                      : "BREW WATER"}
                </span>
                <strong>
                  {architecture.id === "hx" || steamOnly ? ">100" : target}
                  <small>°C</small>
                </strong>
                {architecture.id === "hx" && (
                  <div className="hx-coil">Separate brew-water tube</div>
                )}
                <div className="heater-coil">∿∿∿∿</div>
              </div>
              <div className="vessel-feet" />
            </div>
            {architecture.id === "dual" && (
              <>
                <div className="boiler-divider">
                  <span>
                    INDEPENDENT
                    <br />
                    CONTROL
                  </span>
                </div>
                <div className="boiler-vessel steam-vessel">
                  <div className="vessel-neck" />
                  <div className="vessel-cap" />
                  <div className="vessel-body">
                    <span>STEAM + WATER</span>
                    <strong>
                      &gt;100<small>°C</small>
                    </strong>
                    <div className="steam-lines">∿ ∿ ∿</div>
                    <div className="heater-coil">∿∿∿∿</div>
                  </div>
                  <div className="vessel-feet" />
                </div>
              </>
            )}
          </div>
          <div className="thermal-status">
            {architecture.id === "single" ? (
              <>
                <RotateCcw size={16} /> Switch temperature to change jobs
              </>
            ) : (
              <>
                <Check size={16} /> Brew and steam simultaneously
              </>
            )}
          </div>
          <p className="fine-print">
            Conceptual temperatures, not a live thermal simulation. Pressure
            affects the steam boiler’s boiling point.
          </p>
        </div>
        <aside className="heat-controls">
          <Thermometer size={26} strokeWidth={1.3} />
          <h3>{architecture.name}</h3>
          <p>{architecture.detail}</p>
          {architecture.id === "single" && (
            <div className="segmented">
              <button
                onClick={() => setSteam(false)}
                className={!steam ? "active" : ""}
                aria-pressed={!steam}
              >
                Brew mode
              </button>
              <button
                onClick={() => setSteam(true)}
                className={steam ? "active" : ""}
                aria-pressed={steam}
              >
                Steam mode
              </button>
            </div>
          )}
          <label className="range-label" htmlFor="brew-target">
            Brew setpoint{" "}
            <output>
              {architecture.id === "hx" ? "Not independent" : `${target}°C`}
            </output>
          </label>
          <input
            id="brew-target"
            type="range"
            min="88"
            max="98"
            value={target}
            disabled={architecture.id === "hx" || steamOnly}
            onChange={(event) => setTarget(Number(event.target.value))}
          />
          <div className="range-extents">
            <span>88°C</span>
            <span>98°C</span>
          </div>
          <div className="inset-note">
            <Info size={16} />
            <p>
              {architecture.id === "hx"
                ? "This control is disabled because the diagram has no independently heated brew boiler."
                : "A setpoint is a target at the sensor. It is not a measurement of temperature everywhere in the coffee puck."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function PressureLab() {
  const [pressure, setPressure] = useState(9);
  const [resistance, setResistance] = useState(3);
  const relativeFlow = pressure / resistance / 3;
  const needleAngle = -120 + (pressure / 12) * 240;
  return (
    <div className="bordered-lab pressure-lab">
      <div className="lab-toolbar">
        <span className="eyebrow">THE PRESSURE & FLOW BENCH</span>
        <span className="pill">Illustrative model</span>
      </div>
      <div className="pressure-layout">
        <div className="pressure-visual">
          <svg
            viewBox="0 0 570 330"
            role="img"
            aria-label={`${pressure} bar pressure and ${resistance} resistance gives ${relativeFlow.toFixed(2)} times reference flow`}
          >
            <circle cx="164" cy="157" r="112" fill="#e8e6dc" stroke="#c5c7bb" />
            <circle
              cx="164"
              cy="157"
              r="103"
              fill="#f9f8f2"
              stroke="#bbc2b5"
              strokeWidth="2"
            />
            {Array.from({ length: 25 }, (_, i) => (
              <g key={i} transform={`rotate(${-120 + i * 10} 164 157)`}>
                <path
                  d={`M164 67v${i % 2 === 0 ? 12 : 6}`}
                  stroke="#7b8978"
                  strokeWidth={i % 2 === 0 ? 1.5 : 1}
                />
              </g>
            ))}
            <path
              d="M91 200A84 84 0 1 1 237 200"
              fill="none"
              stroke="#a8b89b"
              strokeWidth="5"
            />
            <path
              d="M164 157V91"
              stroke="#ad6246"
              strokeWidth="3"
              transform={`rotate(${needleAngle} 164 157)`}
              className="gauge-needle"
            />
            <circle cx="164" cy="157" r="7" fill="#ad6246" />
            <text
              x="164"
              y="202"
              textAnchor="middle"
              fontSize="36"
              fill="#273c31"
              fontFamily="Georgia, serif"
            >
              {pressure}
              <tspan fontSize="12"> bar</tspan>
            </text>
            <text
              x="164"
              y="300"
              textAnchor="middle"
              fontSize="10"
              fill="#536349"
              letterSpacing="0.5"
            >
              IDEAL PRESSURE DIFFERENCE
            </text>
            <text x="84" y="218" fontSize="10" fill="#77806d">
              0
            </text>
            <text x="233" y="218" fontSize="10" fill="#77806d">
              12
            </text>
            <path d="M288 160h50" stroke="#a8b8a0" strokeWidth="2" />
            <path
              d="M331 154l7 6-7 6"
              stroke="#a8b8a0"
              strokeWidth="2"
              fill="none"
            />
            <path
              d="M366 103h140l-14 108H380Z"
              fill="#dce5dc"
              stroke="#91a48f"
              strokeWidth="2"
            />
            <path d="M374 154h124l-6 51H380Z" fill="#8a6448" />
            {Array.from({ length: 48 }, (_, i) => (
              <circle
                key={i}
                cx={382 + (i % 12) * 10}
                cy={161 + Math.floor(i / 12) * 12}
                r={1.5 + resistance * 0.18}
                fill="#b68d69"
              />
            ))}
            <path
              d="M381 212h110"
              stroke="#52705b"
              strokeWidth="4"
              strokeDasharray="2 4"
            />
            {pressure > 0 &&
              [407, 436, 465].map((x) => (
                <path
                  key={x}
                  className="flow-trace"
                  d={`M${x} 221V275`}
                  stroke="#b28a60"
                  strokeWidth={Math.min(6, relativeFlow * 3)}
                  strokeDasharray="5 5"
                  style={{
                    animationDuration: `${2 / Math.max(0.1, relativeFlow)}s`,
                  }}
                />
              ))}
            <text
              x="436"
              y="82"
              textAnchor="middle"
              fontSize="10"
              fill="#6d7c68"
              letterSpacing="1.5"
            >
              THE COFFEE PUCK
            </text>
            <text
              x="436"
              y="300"
              textAnchor="middle"
              fontSize="12"
              fill="#52674f"
            >
              {pressure === 0
                ? "No pressure-driven flow"
                : "Flow through the basket"}
            </text>
          </svg>
          <div className="flow-result" aria-live="polite">
            <div>
              <span className="eyebrow">RELATIVE FLOW</span>
              <strong data-testid="relative-flow">
                {relativeFlow.toFixed(2)}
                <small>×</small>
              </strong>
            </div>
            <p>
              Reference: 9 bar at resistance 3.
              <br />
              <span>Q = ΔP / R. No taste or shot-time prediction.</span>
            </p>
          </div>
        </div>
        <aside className="pressure-controls">
          <span className="eyebrow">MAKE A PREDICTION. THEN TRY IT.</span>
          <label className="range-label" htmlFor="pressure">
            Pressure difference <output>{pressure} bar</output>
          </label>
          <input
            id="pressure"
            type="range"
            min="0"
            max="12"
            step=".5"
            value={pressure}
            onChange={(event) => setPressure(Number(event.target.value))}
          />
          <div className="range-extents">
            <span>0 bar</span>
            <span>12 bar</span>
          </div>
          <label className="range-label" htmlFor="resistance">
            Puck resistance <output>{resistance}</output>
          </label>
          <input
            id="resistance"
            type="range"
            min="1"
            max="8"
            step=".5"
            value={resistance}
            onChange={(event) => setResistance(Number(event.target.value))}
          />
          <div className="range-extents">
            <span>Low resistance</span>
            <span>High resistance</span>
          </div>
          <div className="inset-note">
            <Droplets size={19} />
            <p>
              {pressure === 0
                ? "With no pressure difference, this model has no pressure-driven flow."
                : resistance > 3
                  ? "At the same pressure, a more resistant puck lets less water through."
                  : resistance === 3
                    ? "This is the reference puck resistance. Change pressure to see flow change while the puck stays the same."
                    : "A less resistant path permits more flow at the same pressure. More flow does not automatically mean better extraction."}
            </p>
          </div>
          <button
            className="secondary-button"
            onClick={() => {
              setPressure(9);
              setResistance(3);
            }}
          >
            <RotateCcw size={14} /> Reset experiment
          </button>
          <p className="fine-print">
            Resistance is in arbitrary units. Real pumps and changing coffee
            beds do not obey this simple model across all conditions.
          </p>
        </aside>
      </div>
    </div>
  );
}

const steamSteps = [
  {
    name: "Purge",
    title: "Start with steam, not condensate.",
    description:
      "Before entering the milk, briefly purge the wand into the drip tray as the manual directs. Keep hands away from the jet. Start with cold milk in a suitable pitcher.",
    label: "WAND OUTSIDE MILK",
    temperature: "Cold milk",
  },
  {
    name: "Introduce air",
    title: "Keep the tip near the surface.",
    description:
      "Place the tip just below the surface and open the steam valve. A controlled amount of air enters the milk. This increases volume; excessive air makes large bubbles.",
    label: "TIP NEAR THE SURFACE",
    temperature: "Milk warming",
  },
  {
    name: "Integrate",
    title: "Let circulation do the mixing.",
    description:
      "Lower the tip slightly so it stops drawing in new air. Position it off-center to establish circulation. The milk heats as steam condenses and the bubbles mix throughout.",
    label: "TIP SLIGHTLY DEEPER",
    temperature: "Approach 55–65°C",
  },
  {
    name: "Finish & clean",
    title: "Close the valve before lifting.",
    description:
      "Stop steam before removing the wand from the milk. Wipe the wand with a dedicated damp cloth, then purge safely into the tray. Follow the model manual. Hot metal and steam can burn.",
    label: "VALVE CLOSED BEFORE REMOVAL",
    temperature: "Serve promptly",
  },
];

export function SteamLab() {
  const [step, setStep] = useState(0);
  const current = steamSteps[step];
  return (
    <div className="lab-split steam-lab">
      <div className="dark-canvas">
        <div className="canvas-topline">
          <span>
            THE MILK LAB{" "}
            <span className="canvas-subtitle">Steam → heat + texture</span>
          </span>
          <span className="figure-number">FIG. 04</span>
        </div>
        <svg
          viewBox="0 0 680 470"
          role="img"
          aria-label={`${current.name}: ${current.label}`}
        >
          <defs>
            <linearGradient id="pitcher" x1="0" x2="1">
              <stop stopColor="#516c65" />
              <stop offset=".4" stopColor="#c0cbb6" />
              <stop offset="1" stopColor="#667e68" />
            </linearGradient>
          </defs>
          <ellipse
            cx="332"
            cy="405"
            rx="148"
            ry="24"
            fill="#0d211a"
            opacity=".5"
          />
          <path
            d="M230 173L208 151l3 57 21 152q100 71 200 0l24-169Z"
            fill="url(#pitcher)"
            stroke="#b1bfa5"
            strokeWidth="2"
          />
          <path
            d="M447 217h45q31 0 25 37l-12 52q-4 21-27 21h-33"
            stroke="#a5b89d"
            strokeWidth="14"
            fill="none"
          />
          <path
            d="M447 217h45q31 0 25 37l-12 52q-4 21-27 21h-33"
            stroke="#54705b"
            strokeWidth="6"
            fill="none"
          />
          <ellipse
            cx="333"
            cy="187"
            rx="122"
            ry="39"
            fill="#172e24"
            stroke="#d4dac4"
            strokeWidth="4"
          />
          <ellipse cx="333" cy="202" rx="107" ry="28" fill="#e2dfc9" />
          <path
            d={`M${step === 0 || step === 3 ? 500 : 405} 55v55l-55 ${step === 2 ? 137 : 106}`}
            stroke="#a4b7a2"
            strokeWidth="14"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d={`M${step === 0 || step === 3 ? 500 : 405} 55v55l-55 ${step === 2 ? 137 : 106}`}
            stroke="#e0e3cc"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
          />
          {step === 0 && (
            <g
              stroke="#d2c9a6"
              fill="none"
              strokeWidth="2"
              className="steam-puffs"
            >
              <path d="M447 231q-18 17-6 40M456 234q-11 15-3 32M435 230q-15 16-8 29" />
            </g>
          )}
          {step === 1 &&
            [0, 1, 2, 3, 4, 5].map((i) => (
              <circle
                key={i}
                cx={320 + (i % 3) * 17}
                cy={192 + Math.floor(i / 3) * 10}
                r={4 + (i % 2) * 3}
                fill="none"
                stroke="#b4ad8d"
                className="milk-bubble"
              />
            ))}
          {step === 2 && (
            <g className="milk-swirl" transform="translate(333 200)">
              <path
                d="M-62-2C-40-28 70-15 70 0S-65 24-60 5C-54-6 40-10 43 3S-23 15-25 4"
                stroke="#b5b393"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M66-8l8 8 5-10"
                stroke="#b5b393"
                fill="none"
                strokeWidth="2"
              />
            </g>
          )}
          <text
            x="333"
            y="311"
            textAnchor="middle"
            fill="#263e2b"
            fontSize="11"
            letterSpacing="3"
          >
            ESPRESSO ATELIER
          </text>
          <text
            x="333"
            y="334"
            textAnchor="middle"
            fill="#263e2b"
            fontSize="8"
            letterSpacing="2"
          >
            THE MILK LAB
          </text>
          <text
            x="340"
            y="448"
            textAnchor="middle"
            fill="#b9c7ae"
            fontSize="10"
            letterSpacing="2"
          >
            {current.label}
          </text>
        </svg>
      </div>
      <aside className="lab-sidebar">
        <span className="eyebrow">A FOUR-STAGE WORKFLOW</span>
        <div className="steam-step-buttons">
          {steamSteps.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setStep(i)}
              className={i === step ? "active" : ""}
              aria-pressed={i === step}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.name}
            </button>
          ))}
        </div>
        <div aria-live="polite">
          <h2>{current.title}</h2>
          <p>{current.description}</p>
          <div className="temperature-tag">
            <Thermometer size={17} /> {current.temperature}
          </div>
        </div>
        <button
          className="secondary-button"
          onClick={() => setStep((step + 1) % steamSteps.length)}
        >
          {step === 3 ? "Start again" : "Next stage"}
          <ArrowRight size={15} />
        </button>
        <p className="fine-print">
          A technique illustration, not a measured heating simulation or
          food-safety procedure.
        </p>
      </aside>
    </div>
  );
}

const symptoms = [
  {
    name: "The shot runs slowly",
    icon: Droplets,
    title: "Separate coffee resistance from machine flow.",
    checks: [
      "Check whether the grind, dose, basket, or coffee changed.",
      "Follow the manual’s normal water-flush procedure, without a portafilter, only if the machine is otherwise operating normally.",
      "If normal group flow returns without coffee, revisit grind, dose, and puck preparation.",
    ],
    stop: "If water flow is weak even without coffee, or the pump sounds abnormal, stop and arrange service. Do not run the pump dry.",
  },
  {
    name: "Water leaks at the group",
    icon: Waves,
    title: "Look at the seal, not just the pump.",
    checks: [
      "Stop brewing and wait for pressure to release before touching the portafilter.",
      "When safe and cool, check the basket rim for coffee residue and verify the basket is seated correctly.",
      "Use only the cleaning or gasket procedure approved for your exact model.",
    ],
    stop: "Persistent leakage, damaged locking parts, or any leak inside the housing needs a qualified technician.",
  },
  {
    name: "Steam feels weak",
    icon: Flame,
    title: "Check readiness before changing anything.",
    checks: [
      "Check that the steam boiler is enabled and the machine has completed its normal warm-up.",
      "Check the normal water-supply indicators and compare the steam gauge with the manual’s operating guidance.",
      "Clean the wand only using the manufacturer’s procedure. A blocked tip is one possible cause, not a diagnosis.",
    ],
    stop: "Do not raise safety settings, dismantle a hot wand, or bypass a valve. If pressure or heating is abnormal, stop use and contact service.",
  },
  {
    name: "Electrical or internal fault",
    icon: TriangleAlert,
    title: "This is a stop-use condition.",
    checks: [
      "Stop using the machine if there is an internal leak, burning smell, breaker trip, or uncontrolled heating.",
      "Isolate power and the water supply if you can do so safely. Keep clear of wet electrical equipment.",
      "Contact a qualified technician and describe what happened before the fault.",
    ],
    stop: "Do not repeatedly reset breakers or remove covers. Power off does not mean cool, depressurized, or safe to open.",
  },
];

export function CareLab() {
  const [selected, setSelected] = useState(symptoms[0]);
  return (
    <div className="bordered-lab care-lab">
      <div className="lab-toolbar">
        <span className="eyebrow">OBSERVE FIRST. DIAGNOSE CAREFULLY.</span>
        <ShieldCheck size={19} />
      </div>
      <div className="care-layout">
        <div className="symptom-list">
          {symptoms.map((item) => (
            <button
              key={item.name}
              className={selected.name === item.name ? "active" : ""}
              aria-pressed={selected.name === item.name}
              onClick={() => setSelected(item)}
            >
              <item.icon size={19} />
              <span>{item.name}</span>
              <ChevronRight size={16} />
            </button>
          ))}
          <p>
            These are safe starting points, not fault diagnoses. Several faults
            can produce the same symptom.
          </p>
        </div>
        <div className="diagnosis" aria-live="polite">
          <span className="eyebrow">{selected.name}</span>
          <h2>{selected.title}</h2>
          <ol>
            {selected.checks.map((check) => (
              <li key={check}>{check}</li>
            ))}
          </ol>
          <div className="safety-stop">
            <TriangleAlert size={20} />
            <div>
              <strong>Know when to stop</strong>
              <p>{selected.stop}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
