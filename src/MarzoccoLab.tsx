import { useState } from "react";
import { ArrowUpRight, CircleCheck, GitCompareArrows } from "lucide-react";

const models = [
  {
    id: "micra",
    name: "Linea Micra",
    era: "Compact home platform",
    group: "Integrated",
    pump: "Internal rotary-vane",
    controls: "Electrical paddle switch",
    dosing: "Manual start / stop",
    prebrew: "Single valve · discharge during pause",
    description:
      "A compact brew boiler and group assembly reduces the thermal footprint. The paddle operates a switch; its travel does not continuously adjust a mechanical brew valve.",
    feature: "Small footprint, dedicated brew and steam systems.",
    source:
      "https://www.lamarzocco.com/uk/en/home-products/espresso-machines/linea-micra/",
  },
  {
    id: "mini",
    name: "Linea Mini",
    era: "2024 redesign · serial prefix MI",
    group: "Integrated",
    pump: "Internal rotary",
    controls: "Electrical paddle switch",
    dosing: "Manual; brew-by-weight with compatible scale",
    prebrew: "Two valves · water retained during pause",
    description:
      "The redesigned Mini keeps separate brew and steam boilers and adds a two-solenoid prebrew system. Timed line-pressure preinfusion requires a plumbed connection and the app. The paddle is still not a mechanical profiling valve.",
    feature: "Check the serial prefix. The original LM Mini differs.",
    source: "https://home.lamarzoccousa.com/features-of-the-linea-mini/",
  },
  {
    id: "gs3-av",
    name: "GS3 AV",
    era: "Automatic volumetric configuration",
    group: "Saturated",
    pump: "Internal rotary",
    controls: "Programmable brew buttons",
    dosing: "Automatic, measured by flowmeter",
    prebrew: "Single valve · discharge during pause",
    description:
      "The saturated group is in thermal continuity with the brew boiler. A flowmeter counts water entering the brew circuit, and the controller stops at a programmed dose. That is not a measurement of espresso mass in the cup.",
    feature: "AV means automatic volumetric, not gravimetric.",
    source:
      "https://www.lamarzocco.com/it/en/home-products/espresso-machines/gs3/",
  },
  {
    id: "gs3-mp",
    name: "GS3 MP",
    era: "Updated conical-valve version · 2016 onward",
    group: "Saturated",
    pump: "Internal rotary",
    controls: "Mechanical conical-valve paddle",
    dosing: "Manual control through the shot",
    prebrew: "Manual low-pressure control, including from tank",
    description:
      "The updated mechanical paddle controls a conical valve. The operator can vary flow and the resulting group pressure while the pump runs. This version supports low-pressure operation from its reservoir, not only from mains plumbing.",
    feature: "Manual pressure manipulation, not automatic profile replay.",
    source: "https://home.lamarzoccousa.com/introducing-the-new-gs3-mp/",
  },
];

function ModelArchitecture({ group }: { group: string }) {
  const saturated = group === "Saturated";
  return (
    <svg
      className="model-portrait"
      viewBox="0 0 480 310"
      role="img"
      aria-label={
        saturated
          ? "Saturated group: a water-filled group extends from the coffee boiler; a separate boiler supplies steam. Functional schematic, not physical part locations."
          : "Integrated group: a compact brew boiler and group assembly; a separate boiler supplies steam. Functional schematic, not physical part locations."
      }
    >
      <defs>
        <linearGradient id="model-metal">
          <stop stopColor="#97a99a" />
          <stop offset=".4" stopColor="#e8ecdf" />
          <stop offset="1" stopColor="#9eae9a" />
        </linearGradient>
      </defs>
      <text x="184" y="30" textAnchor="middle" fill="#344c37" fontSize="14">
        {saturated ? "SATURATED GROUP" : "INTEGRATED GROUP"}
      </text>
      <text x="184" y="52" textAnchor="middle" fill="#536349" fontSize="10">
        {saturated ? "GS3 AV + GS3 MP" : "LINEA MINI + LINEA MICRA"}
      </text>
      <path d="M320 75v190" stroke="#a9b8a0" strokeDasharray="3 6" />
      {saturated ? (
        <>
          <path
            d="M82 94Q82 82 94 82H238Q250 82 250 94V169H222V204H162V169H94Q82 169 82 157Z"
            fill="url(#model-metal)"
            stroke="#5c775c"
            strokeWidth="2"
          />
          <path
            d="M94 95H237V155H210V201H174V155H94Z"
            fill="#abc9bd"
            stroke="#658c7d"
          />
          <text
            x="166"
            y="127"
            textAnchor="middle"
            fontSize="12"
            fill="#2d4a3c"
          >
            Coffee boiler
          </text>
          <path
            d="M192 144v43m-5-6 5 6 5-6"
            fill="none"
            stroke="#3f735e"
            strokeWidth="2"
          />
          <path
            d="M149 204h86v18h-86Z"
            fill="url(#model-metal)"
            stroke="#5c775c"
            strokeWidth="2"
          />
          <text
            x="281"
            y="181"
            textAnchor="middle"
            fontSize="10"
            fill="#536349"
          >
            Water-filled
          </text>
          <text
            x="281"
            y="195"
            textAnchor="middle"
            fontSize="10"
            fill="#536349"
          >
            group
          </text>
          <path d="M222 187h19" stroke="#5c775c" />
        </>
      ) : (
        <>
          <rect
            x="121"
            y="94"
            width="142"
            height="128"
            rx="13"
            fill="url(#model-metal)"
            stroke="#5c775c"
            strokeWidth="2"
          />
          <rect
            x="138"
            y="109"
            width="108"
            height="73"
            rx="8"
            fill="#abc9bd"
            stroke="#658c7d"
          />
          <text
            x="192"
            y="139"
            textAnchor="middle"
            fontSize="12"
            fill="#2d4a3c"
          >
            Compact
          </text>
          <text
            x="192"
            y="157"
            textAnchor="middle"
            fontSize="12"
            fill="#2d4a3c"
          >
            brew boiler
          </text>
          <path d="M178 183v18h28v-18" fill="#abc9bd" stroke="#658c7d" />
          <path d="M137 204h110" stroke="#5c775c" strokeWidth="3" />
          <text
            x="192"
            y="250"
            textAnchor="middle"
            fontSize="10"
            fill="#536349"
          >
            Compact boiler / group assembly
          </text>
        </>
      )}
      <path d="M159 222h66l-6 13h-54Z" fill="#846044" stroke="#5c775c" />
      <text
        x="192"
        y={saturated ? 251 : 272}
        textAnchor="middle"
        fontSize="10"
        fill="#536349"
      >
        Coffee basket
      </text>
      <rect
        x="352"
        y="95"
        width="83"
        height="118"
        rx="20"
        fill="#e1d6b9"
        stroke="#8e7954"
        strokeWidth="2"
      />
      <path
        d="M355 146q20-9 40 0t37 0v45q0 19-19 19h-39q-19 0-19-19Z"
        fill="#c4b797"
      />
      <path
        d="M376 129q-7-7 0-14m17 14q-7-7 0-14m17 14q-7-7 0-14"
        fill="none"
        stroke="#8e7954"
        strokeWidth="2"
      />
      <text x="394" y="176" textAnchor="middle" fill="#604e32" fontSize="11">
        Water
      </text>
      <text x="394" y="242" textAnchor="middle" fill="#536349" fontSize="11">
        Separate
      </text>
      <text x="394" y="259" textAnchor="middle" fill="#536349" fontSize="11">
        steam boiler
      </text>
    </svg>
  );
}

export function MarzoccoLab() {
  const [model, setModel] = useState(models[1]);
  const [compare, setCompare] = useState(false);
  const [prebrew, setPrebrew] = useState<"exhaust" | "hold" | "low">("hold");
  return (
    <div className="marzocco-lab">
      <div className="model-tabs">
        {models.map((item) => (
          <button
            key={item.id}
            onClick={() => setModel(item)}
            className={model.id === item.id ? "active" : ""}
            aria-pressed={model.id === item.id}
          >
            {item.name}
            <span>{item.group} group</span>
          </button>
        ))}
      </div>
      <div className="model-main">
        <div className="model-visual">
          <span className="eyebrow">LA MARZOCCO HOME · A CLOSER LOOK</span>
          <ModelArchitecture group={model.group} />
          <p>
            Conceptual thermal architecture · Not physical part locations or a
            service drawing
          </p>
        </div>
        <div className="model-info" aria-live="polite">
          <span className="eyebrow">{model.era}</span>
          <h2>{model.name}</h2>
          <p>{model.description}</p>
          <dl>
            <div>
              <dt>Architecture</dt>
              <dd>Separate brew + steam boilers</dd>
            </div>
            <div>
              <dt>Brew group</dt>
              <dd>{model.group}</dd>
            </div>
            <div>
              <dt>Pump</dt>
              <dd>{model.pump}</dd>
            </div>
            <div>
              <dt>Brew control</dt>
              <dd>{model.controls}</dd>
            </div>
            <div>
              <dt>Shot stopping</dt>
              <dd>{model.dosing}</dd>
            </div>
            <div>
              <dt>Prewetting</dt>
              <dd>{model.prebrew}</dd>
            </div>
          </dl>
          <p className="model-caveat">
            <CircleCheck size={16} />
            {model.feature}
          </p>
          <a
            className="text-link"
            href={model.source}
            target="_blank"
            rel="noreferrer"
          >
            Read the manufacturer’s explanation <ArrowUpRight size={14} />
          </a>
        </div>
      </div>
      <button
        className="compare-toggle"
        aria-expanded={compare}
        onClick={() => setCompare(!compare)}
      >
        <GitCompareArrows size={17} />
        {compare
          ? "Close side-by-side comparison"
          : "Compare all four configurations"}
        <span>{compare ? "−" : "+"}</span>
      </button>
      {compare && (
        <div
          className="comparison-scroll"
          tabIndex={0}
          role="region"
          aria-label="Model comparison table"
        >
          <table>
            <caption>
              Model differences at a glance. Specifications refer to the
              variants identified above. Scroll horizontally on narrow screens.
            </caption>
            <thead>
              <tr>
                <th scope="col">Engineering detail</th>
                {models.map((item) => (
                  <th scope="col" key={item.id}>
                    {item.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Group</th>
                {models.map((item) => (
                  <td key={item.id}>{item.group}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Control</th>
                {models.map((item) => (
                  <td key={item.id}>{item.controls}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Shot stopping</th>
                {models.map((item) => (
                  <td key={item.id}>{item.dosing}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Prewetting</th>
                {models.map((item) => (
                  <td key={item.id}>{item.prebrew}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
      <div className="prebrew-lab">
        <div>
          <span className="eyebrow">SIMILAR WORDS. DIFFERENT HYDRAULICS.</span>
          <h3>What happens before the shot?</h3>
          <div className="segmented">
            <button
              className={prebrew === "exhaust" ? "active" : ""}
              aria-pressed={prebrew === "exhaust"}
              onClick={() => setPrebrew("exhaust")}
            >
              Pulse + discharge
            </button>
            <button
              className={prebrew === "hold" ? "active" : ""}
              aria-pressed={prebrew === "hold"}
              onClick={() => setPrebrew("hold")}
            >
              Pulse + hold
            </button>
            <button
              className={prebrew === "low" ? "active" : ""}
              aria-pressed={prebrew === "low"}
              onClick={() => setPrebrew("low")}
            >
              Low-pressure fill
            </button>
          </div>
        </div>
        <div className="prebrew-explanation" aria-live="polite">
          <div className="prebrew-timeline">
            <span>{prebrew === "low" ? "LOW-PRESSURE WATER" : "PUMP ON"}</span>
            <span className={prebrew === "hold" ? "hold" : ""}>
              {prebrew === "exhaust"
                ? "PAUSE + DISCHARGE"
                : prebrew === "hold"
                  ? "PAUSE + RETAIN WATER"
                  : "CONTINUOUS WETTING"}
            </span>
            <span>MAIN EXTRACTION</span>
          </div>
          <p>
            {prebrew === "exhaust"
              ? "The original Mini LM, Micra, and GS3 AV use a single-valve arrangement that exhausts the group during the prebrew pause."
              : prebrew === "hold"
                ? "The redesigned Mini MI uses two solenoids to keep water in the brew chamber during the pump-off pause. Retaining water does not mean maintaining the full pump pressure."
                : "Low-pressure preinfusion continuously supplies water before full extraction pressure. On the redesigned Mini, timed line-pressure preinfusion requires plumbing and the app. The updated GS3 MP can manually control low pressure from its tank."}
          </p>
          <a
            className="text-link"
            href="https://home.lamarzoccousa.com/pre-brew-in-espresso-explained/"
            target="_blank"
            rel="noreferrer"
          >
            Manufacturer’s prebrew guide <ArrowUpRight size={13} />
          </a>
          <p className="fine-print">
            Sequence only. Widths are not durations or measured pressure traces.
          </p>
        </div>
      </div>
    </div>
  );
}
