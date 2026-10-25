import { useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  ChevronRight,
  Layers3,
  Minus,
  Plus,
  RotateCcw,
  ScanLine,
} from "lucide-react";
import { parts, type PartId } from "./course";

export function MetalDefs() {
  return (
    <defs>
      <linearGradient id="steel" x1="0" y1="0" x2="1" y2=".75">
        <stop stopColor="#657b7a" />
        <stop offset=".18" stopColor="#bac8c3" />
        <stop offset=".38" stopColor="#e3e8dd" />
        <stop offset=".58" stopColor="#91a39d" />
        <stop offset=".78" stopColor="#4d6664" />
        <stop offset="1" stopColor="#a4b3aa" />
      </linearGradient>
      <linearGradient id="steel-dark" x1="0" y1="0" x2=".4" y2="1">
        <stop stopColor="#9caca7" />
        <stop offset=".2" stopColor="#556c69" />
        <stop offset=".72" stopColor="#263d3a" />
        <stop offset="1" stopColor="#5f7670" />
      </linearGradient>
      <linearGradient id="copper" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#e8bb8a" />
        <stop offset=".22" stopColor="#b77a4c" />
        <stop offset=".45" stopColor="#f1c399" />
        <stop offset=".7" stopColor="#a36541" />
        <stop offset="1" stopColor="#6c402b" />
      </linearGradient>
      <linearGradient id="brass">
        <stop stopColor="#7e643b" />
        <stop offset=".4" stopColor="#dac48c" />
        <stop offset=".6" stopColor="#af925b" />
        <stop offset="1" stopColor="#78613a" />
      </linearGradient>
      <linearGradient id="panel" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#91a6a0" />
        <stop offset=".3" stopColor="#4a6560" />
        <stop offset="1" stopColor="#1c3430" />
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#8bc0b8" stopOpacity=".5" />
        <stop offset="1" stopColor="#426e6a" stopOpacity=".24" />
      </linearGradient>
      <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path
          d="M32 0H0V32"
          fill="none"
          stroke="#9bb4a3"
          strokeOpacity=".09"
          strokeWidth=".6"
        />
      </pattern>
      <pattern
        id="perforation"
        width="9"
        height="9"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="4" cy="4" r="1.2" fill="#142824" />
      </pattern>
      <filter id="shadow" x="-30%" y="-30%" width="170%" height="180%">
        <feDropShadow
          dx="0"
          dy="10"
          stdDeviation="7"
          floodColor="#06120f"
          floodOpacity=".4"
        />
      </filter>
      <filter id="selected-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feDropShadow
          dx="0"
          dy="0"
          stdDeviation="5"
          floodColor="#b4d395"
          floodOpacity=".6"
        />
      </filter>
    </defs>
  );
}

function Selectable({
  id,
  selected,
  onSelect,
  children,
  transform = "",
}: {
  id: PartId;
  selected: PartId;
  onSelect: (id: PartId) => void;
  children: ReactNode;
  transform?: string;
}) {
  const part = parts.find((part) => part.id === id);
  return (
    <g
      transform={transform}
      className={`machine-part ${selected === id ? "selected-part" : ""}`}
      role="button"
      tabIndex={0}
      aria-label={`Inspect ${part?.name}`}
      aria-pressed={selected === id}
      onClick={() => onSelect(id)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onSelect(id);
        }
      }}
    >
      <title>{part?.name}</title>
      {children}
    </g>
  );
}

function Cylinder({
  x,
  y,
  width,
  height,
  label,
}: {
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={`M0 0 L${width} -${width * 0.22} L${width} ${height - width * 0.22} L0 ${height}Z`}
        fill="url(#steel)"
        stroke="#a7b8ac"
        strokeWidth="1"
      />
      <ellipse
        cx={width}
        cy={height / 2 - width * 0.22}
        rx={height * 0.21}
        ry={height / 2}
        fill="url(#steel-dark)"
        stroke="#c0c8b7"
      />
      <ellipse
        cy={height / 2}
        rx={height * 0.21}
        ry={height / 2}
        fill="url(#steel-dark)"
        stroke="#c0c8b7"
      />
      <ellipse
        cy={height / 2}
        rx={height * 0.15}
        ry={height * 0.38}
        fill="url(#steel)"
        stroke="#506862"
      />
      <path
        d={`M${width * 0.17} -${width * 0.035}V${height - width * 0.035}M${width * 0.82} -${width * 0.18}V${height - width * 0.18}`}
        stroke="#435c55"
        strokeWidth="6"
        opacity=".6"
      />
      <path
        d={`M${width * 0.17 + 2} -${width * 0.035}V${height - width * 0.035}M${width * 0.82 + 2} -${width * 0.18}V${height - width * 0.18}`}
        stroke="#b1bca8"
        strokeWidth="1.5"
      />
      <rect
        x={width * 0.46}
        y={-width * 0.1 - 14}
        width="13"
        height="17"
        rx="2"
        fill="url(#brass)"
        stroke="#b89e6d"
      />
      <ellipse
        cx={width * 0.46 + 6.5}
        cy={-width * 0.1 - 14}
        rx="6.5"
        ry="3"
        fill="#d6bf87"
      />
      <text
        x={width * 0.34}
        y={height * 0.53}
        fill="#283d34"
        fontSize="7"
        letterSpacing="2"
        transform={`rotate(-12 ${width * 0.34} ${height * 0.53})`}
      >
        {label}
      </text>
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={Math.sin((i * Math.PI) / 2) * height * 0.12}
          cy={height / 2 + Math.cos((i * Math.PI) / 2) * height * 0.36}
          r="2"
          fill="#d3dccb"
          stroke="#435a51"
        />
      ))}
    </g>
  );
}

function Callout({
  x,
  y,
  endX,
  endY,
  number,
  label,
  active,
  onClick,
}: {
  x: number;
  y: number;
  endX: number;
  endY: number;
  number: number;
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  const left = x < endX;
  return (
    <g onClick={onClick} className="callout" aria-hidden="true">
      <path
        d={`M${x} ${y}H${left ? endX - 28 : endX + 28}L${endX} ${endY}`}
        fill="none"
        stroke={active ? "#c4d7ae" : "#83988a"}
        strokeWidth=".8"
        opacity={active ? 1 : 0.65}
      />
      <circle cx={endX} cy={endY} r="3" fill={active ? "#d4e8bc" : "#92a996"} />
      <circle
        cx={x}
        cy={y}
        r="10"
        fill={active ? "#c9d8b3" : "#1e342d"}
        stroke={active ? "#d4e8bc" : "#83988a"}
      />
      <text
        x={x}
        y={y + 3}
        fill={active ? "#1a2b22" : "#d9e2d4"}
        textAnchor="middle"
        fontSize="8"
      >
        {number.toString().padStart(2, "0")}
      </text>
      <text
        x={x + (left ? -15 : 15)}
        y={y - 12}
        textAnchor={left ? "start" : "end"}
        fill={active ? "#e7edd9" : "#a9b9ad"}
        fontSize="9"
        letterSpacing="1.3"
      >
        {label.toUpperCase()}
      </text>
    </g>
  );
}

export function MachineDrawing({
  exploded,
  selected,
  onSelect,
  labels,
  zoom,
}: {
  exploded: number;
  selected: PartId;
  onSelect: (id: PartId) => void;
  labels: boolean;
  zoom: number;
}) {
  const e = exploded / 100;
  return (
    <svg
      className="machine-svg"
      viewBox="0 0 780 500"
      role="group"
      aria-label="Interactive conceptual dual-boiler espresso machine exploded diagram"
    >
      <MetalDefs />
      <rect width="780" height="500" fill="url(#grid)" />
      <g opacity=".3" stroke="#779080" strokeWidth=".7">
        <path d="M30 30h12m-6-6v12M738 30h12m-6-6v12M30 466h12m-6-6v12M738 466h12m-6-6v12" />
      </g>
      <g
        transform={`translate(${390 * (1 - zoom)} ${260 * (1 - zoom)}) scale(${zoom})`}
        className="zoom-group"
      >
        <ellipse
          cx="420"
          cy="428"
          rx="230"
          ry="43"
          fill="#081b14"
          opacity=".45"
        />
        <g filter="url(#shadow)">
          <path
            d="M235 376L462 427L626 343L404 300Z"
            fill="url(#steel-dark)"
            stroke="#9daf9e"
          />
          <path
            d="M235 376V395L462 447V427Z"
            fill="url(#steel)"
            stroke="#718b7a"
          />
          <path
            d="M462 427L626 343V362L462 447Z"
            fill="url(#steel-dark)"
            stroke="#718b7a"
          />
          <path
            d="M260 402v14l19 5v-14M439 443v14l18 4v-14M594 372v13l17-8v-13"
            fill="#0d1d17"
            stroke="#506858"
            strokeWidth="2"
          />
          <path
            d="M259 375V199L411 122L606 166V342"
            fill="none"
            stroke="#5a7165"
            strokeWidth="8"
          />
          <path
            d="M259 375V199L411 122L606 166V342"
            fill="none"
            stroke="#afbbab"
            strokeWidth="1.5"
          />
          <path
            d="M462 421V248L606 174M267 202L460 249"
            fill="none"
            stroke="#677e71"
            strokeWidth="6"
          />
        </g>
        <g
          transform={`translate(${-80 * e} ${-20 * e})`}
          opacity={0.82 + e * 0.18}
        >
          <path
            d="M258 200L405 126V303L258 376Z"
            fill="url(#panel)"
            stroke="#a3b3a2"
          />
          <path
            d="M267 205L396 140V293L267 358Z"
            fill="none"
            stroke="#a3b3a2"
            opacity=".35"
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M${286 + i * 14} ${197 - i * 7}v45`}
              stroke="#142d22"
              strokeWidth="4"
            />
          ))}
          <path
            d="M273 339l104-53"
            stroke="#b4c1ab"
            strokeWidth="1"
            opacity=".5"
          />
        </g>
        <Selectable
          id="reservoir"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${-46 * e} ${-36 * e})`}
        >
          <path
            d="M319 185L367 162L413 174L363 198Z"
            fill="#80ada4"
            fillOpacity=".45"
            stroke="#a6c4ba"
          />
          <path
            d="M319 185V280L363 294V198Z"
            fill="url(#glass)"
            stroke="#a6c4ba"
          />
          <path
            d="M363 198L413 174V268L363 294Z"
            fill="url(#glass)"
            stroke="#a6c4ba"
          />
          <path
            d="M322 231L363 244L410 221V265L363 289L322 277Z"
            fill="#72a79a"
            opacity=".45"
          />
          <path d="M325 232L363 244L407 222" fill="none" stroke="#accec1" />
          <path
            d="M335 183L369 167L400 175L365 191Z"
            fill="#233d30"
            stroke="#729380"
          />
          <path
            d="M378 190v53q0 12 16 16"
            fill="none"
            stroke="#bec3a3"
            strokeWidth="4"
          />
        </Selectable>
        <g
          stroke="url(#copper)"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M393 261v48l73 17v35" />
          <path d="M477 219l57 13v69l-64 33" />
          <path d="M351 289v-44l60-32h25" />
          <path d="M378 333l-27 17v25" />
        </g>
        <Selectable
          id="steam"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${12 * e} ${-45 * e})`}
        >
          <Cylinder x={439} y={216} width={108} height={87} label="STEAM" />
          <path
            d="M489 183v-14h30v32"
            fill="none"
            stroke="url(#copper)"
            strokeWidth="5"
          />
          <rect
            x="511"
            y="165"
            width="16"
            height="10"
            rx="2"
            fill="url(#brass)"
          />
          <rect
            x="444"
            y="299"
            width="13"
            height="16"
            fill="url(#steel-dark)"
          />
          <rect
            x="522"
            y="280"
            width="13"
            height="16"
            fill="url(#steel-dark)"
          />
        </Selectable>
        <Selectable
          id="pid"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${58 * e} ${-48 * e})`}
        >
          <path
            d="M528 223L575 197L602 205L553 233Z"
            fill="#2f5e49"
            stroke="#a2b392"
          />
          <path d="M528 223v36l25 9v-35Z" fill="#233f32" stroke="#7f9d7d" />
          <path
            d="M553 233L602 205V240L553 268Z"
            fill="#41654b"
            stroke="#a2b392"
          />
          <path d="M560 236l32-17v19l-32 17Z" fill="#102b23" stroke="#9eb798" />
          <text
            x="568"
            y="242"
            fill="#d2e1a0"
            fontSize="10"
            transform="rotate(-28 568 242)"
          >
            93.0
          </text>
          <path
            d="M549 265v20l-31 16M556 266v20l-29 16"
            fill="none"
            stroke="#ab7852"
            strokeWidth="2"
          />
        </Selectable>
        <Selectable
          id="pump"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${30 * e} ${20 * e})`}
        >
          <g transform="translate(447 337) rotate(-14)">
            <rect
              x="0"
              y="0"
              width="70"
              height="43"
              rx="10"
              fill="url(#steel-dark)"
              stroke="#9bac98"
            />
            {[0, 1, 2, 3, 4].map((i) => (
              <path
                key={i}
                d={`M${15 + i * 9} 4v35`}
                stroke="#b2bba7"
                strokeOpacity=".6"
                strokeWidth="2"
              />
            ))}
            <ellipse
              cx="2"
              cy="21"
              rx="10"
              ry="21"
              fill="#243c2e"
              stroke="#8ea58a"
            />
            <rect
              x="-28"
              y="9"
              width="24"
              height="26"
              rx="4"
              fill="url(#brass)"
              stroke="#b9a66e"
            />
            <rect x="-22" y="-1" width="10" height="13" fill="url(#brass)" />
            <path d="M10 44v7h45v-7" fill="#2c4533" stroke="#819477" />
          </g>
        </Selectable>
        <Selectable
          id="brew"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${-23 * e} ${-20 * e})`}
        >
          <Cylinder x={335} y={285} width={82} height={57} label="BREW" />
          <path
            d="M380 256v-14h-24v22"
            fill="none"
            stroke="url(#copper)"
            strokeWidth="5"
          />
          <rect x="329" y="305" width="12" height="13" fill="url(#brass)" />
        </Selectable>
        <Selectable
          id="valve"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${-29 * e} ${14 * e})`}
        >
          <path
            d="M382 335l20-10 20 5-20 11Z"
            fill="#6c7964"
            stroke="#98ab8a"
          />
          <path d="M382 335v24l20 6v-24Z" fill="#192d22" stroke="#72866a" />
          <path d="M402 341l20-11v24l-20 11Z" fill="#304631" stroke="#72866a" />
          <rect
            x="391"
            y="361"
            width="24"
            height="9"
            rx="2"
            fill="url(#brass)"
          />
          <path
            d="M391 365h-14v12M415 365h16"
            fill="none"
            stroke="url(#copper)"
            strokeWidth="5"
          />
        </Selectable>
        <g transform={`translate(${72 * e} ${4 * e})`} opacity={0.9}>
          <path
            d="M470 255L613 182V358L470 431Z"
            fill="url(#panel)"
            fillOpacity={1 - e * 0.83}
            stroke="#b2c0a9"
          />
          <path
            d="M481 259L601 198V346L481 408Z"
            fill="none"
            stroke="#a5b89e"
            opacity=".4"
          />
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <path
              key={i}
              d={`M${501 + i * 12} ${260 - i * 6}v43`}
              stroke="#183126"
              strokeWidth="3"
              opacity={1 - e * 0.6}
            />
          ))}
          <circle cx="488" cy="391" r="2" fill="#b6c4ad" />
          <circle cx="592" cy="216" r="2" fill="#b6c4ad" />
        </g>
        <g transform={`translate(0 ${-98 * e})`}>
          <path
            d="M255 193L403 117L614 165L465 243Z"
            fill="url(#steel-dark)"
            stroke="#b5c4ac"
          />
          <path d="M255 193v7l210 50v-7Z" fill="url(#steel)" stroke="#91a58d" />
          <path
            d="M465 243l149-78v7l-149 78Z"
            fill="#57725d"
            stroke="#91a58d"
          />
          <path
            d="M278 190l126-63 185 42-125 65Z"
            fill="url(#perforation)"
            opacity=".9"
          />
          <path
            d="M273 190v-14l130-66 195 46v14M403 110v-13M463 233v-13"
            fill="none"
            stroke="#a8bba0"
            strokeWidth="3"
          />
        </g>
        <g transform={`translate(${-20 * e} ${15 * e})`}>
          <path
            d="M262 241l204 48v65l-204-48Z"
            fill="url(#panel)"
            stroke="#a0b399"
            opacity={1 - e * 0.68}
          />
          <g transform="translate(284 278)">
            <circle r="15" fill="url(#steel)" stroke="#c6cfb9" />
            <circle r="11" fill="#ebeedb" />
            <path
              d="M-7 4A8 8 0 1 1 7 4"
              fill="none"
              stroke="#637768"
              strokeWidth="1.5"
            />
            <path d="M0 1l4-6" stroke="#a46545" strokeWidth="2" />
            <circle r="2" fill="#59684f" />
          </g>
          <path d="M353 279l38 9v10l-38-9Z" fill="#14271e" stroke="#78906f" />
        </g>
        <Selectable
          id="wand"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${64 * e} ${9 * e})`}
        >
          <ellipse
            cx="449"
            cy="302"
            rx="13"
            ry="16"
            fill="#17291f"
            stroke="#839779"
          />
          <ellipse
            cx="453"
            cy="302"
            rx="11"
            ry="14"
            fill="#29412e"
            stroke="#7a916e"
          />
          <path
            d="M445 317v28q0 14 13 20l26 15v37"
            fill="none"
            stroke="#4e6552"
            strokeWidth="9"
            strokeLinecap="round"
          />
          <path
            d="M445 317v28q0 14 13 20l26 15v37"
            fill="none"
            stroke="#c1c9b0"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path d="M484 411v11" stroke="#809476" strokeWidth="10" />
        </Selectable>
        <Selectable
          id="group"
          selected={selected}
          onSelect={onSelect}
          transform={`translate(${-45 * e} ${27 * e})`}
        >
          <path
            d="M323 322l42 9v24l-42-9Z"
            fill="url(#steel)"
            stroke="#bdc7ac"
          />
          <path
            d="M302 349v19c0 21 77 30 77 10v-18Z"
            fill="url(#steel-dark)"
            stroke="#b5c1a6"
          />
          <ellipse
            cx="341"
            cy="355"
            rx="39"
            ry="15"
            transform="rotate(12 341 355)"
            fill="url(#steel)"
            stroke="#c2ccb2"
          />
          <ellipse
            cx="339"
            cy="374"
            rx="36"
            ry="12"
            transform="rotate(12 339 374)"
            fill="url(#steel)"
            stroke="#b5c1a6"
          />
          <path d="M311 374l-44 27" stroke="#9bad94" strokeWidth="12" />
          <path
            d="M270 398l-57 34"
            stroke="#0d2019"
            strokeWidth="19"
            strokeLinecap="round"
          />
          <path
            d="M265 395l-53 32"
            stroke="#4e6550"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M337 382v11l-9 6m9-6 8 9"
            stroke="#bdc5ad"
            strokeWidth="4"
            fill="none"
          />
        </Selectable>
        <g transform={`translate(${-40 * e} ${43 * e})`}>
          <path
            d="M235 379l144 33-63 33-145-33Z"
            fill="url(#steel)"
            stroke="#a3b595"
          />
          <path
            d="M171 412v9l145 33v-9Z"
            fill="url(#steel-dark)"
            stroke="#95aa88"
          />
          <path d="M316 445l63-33v9l-63 33Z" fill="#425e46" stroke="#95aa88" />
          {Array.from({ length: 11 }, (_, i) => (
            <path
              key={i}
              d={`M${190 + i * 12} ${411 + i * 2.7}l47-25`}
              stroke="#344d37"
              strokeWidth="3"
            />
          ))}
        </g>
        {labels && (
          <g className="diagram-labels">
            <Callout
              x={120}
              y={175}
              endX={336 - 46 * e}
              endY={216 - 36 * e}
              number={1}
              label="Water reservoir"
              active={selected === "reservoir"}
              onClick={() => onSelect("reservoir")}
            />
            <Callout
              x={122}
              y={295}
              endX={335 - 23 * e}
              endY={305 - 20 * e}
              number={3}
              label="Brew boiler"
              active={selected === "brew"}
              onClick={() => onSelect("brew")}
            />
            <Callout
              x={643}
              y={164}
              endX={508 + 12 * e}
              endY={231 - 45 * e}
              number={4}
              label="Steam boiler"
              active={selected === "steam"}
              onClick={() => onSelect("steam")}
            />
            <Callout
              x={647}
              y={381}
              endX={489 + 30 * e}
              endY={350 + 20 * e}
              number={2}
              label="Rotary pump"
              active={selected === "pump"}
              onClick={() => onSelect("pump")}
            />
            <Callout
              x={125}
              y={380}
              endX={318 - 45 * e}
              endY={355 + 27 * e}
              number={5}
              label="Brew group"
              active={selected === "group"}
              onClick={() => onSelect("group")}
            />
          </g>
        )}
      </g>
      <g transform="translate(44 425)" fill="none" strokeWidth="1">
        <path d="M0 28V0M0 28l23 8M0 28l-17 12" stroke="#88a087" />
        <text x="-3" y="-8" fill="#9db096" fontSize="8">
          Z
        </text>
        <text x="26" y="40" fill="#9db096" fontSize="8">
          X
        </text>
        <text x="-25" y="48" fill="#9db096" fontSize="8">
          Y
        </text>
      </g>
    </svg>
  );
}

export function MachineLab({ onFollowWater }: { onFollowWater: () => void }) {
  const [exploded, setExploded] = useState(75);
  const [selected, setSelected] = useState<PartId>("brew");
  const [labels, setLabels] = useState(true);
  const [zoom, setZoom] = useState(1);
  const part = parts.find((part) => part.id === selected) ?? parts[0];
  const partNumber = parts.indexOf(part) + 1;
  return (
    <div className="anatomy-layout">
      <div className="machine-workspace">
        <div className="dark-canvas">
          <div className="canvas-topline">
            <div>
              <span className="live-dot" /> DUAL-BOILER MACHINE{" "}
              <span className="canvas-subtitle">
                A study in eight components
              </span>
            </div>
            <span className="figure-number">FIG. 01</span>
          </div>
          <div className="canvas-segment" aria-label="Machine assembly">
            <button
              className={exploded === 0 ? "active" : ""}
              onClick={() => setExploded(0)}
            >
              Assembled
            </button>
            <button
              className={exploded > 0 ? "active" : ""}
              onClick={() => setExploded(75)}
            >
              Exploded
            </button>
          </div>
          <MachineDrawing
            exploded={exploded}
            selected={selected}
            onSelect={setSelected}
            labels={labels}
            zoom={zoom}
          />
          <div className="canvas-tools">
            <button
              aria-label="Zoom in"
              disabled={zoom >= 1.3}
              onClick={() => setZoom(Math.min(1.3, zoom + 0.1))}
            >
              <Plus size={16} />
            </button>
            <button
              aria-label="Zoom out"
              disabled={zoom <= 0.8}
              onClick={() => setZoom(Math.max(0.8, zoom - 0.1))}
            >
              <Minus size={16} />
            </button>
            <button
              aria-label="Reset diagram"
              onClick={() => {
                setZoom(1);
                setExploded(75);
                setSelected("brew");
                setLabels(true);
              }}
            >
              <RotateCcw size={14} />
            </button>
          </div>
          <div className="canvas-bottomline">
            <span>
              <ScanLine size={13} /> SELECT A COMPONENT TO EXPLORE
            </span>
            <button onClick={() => setLabels(!labels)} aria-pressed={labels}>
              <span className={`mini-switch ${labels ? "on" : ""}`} /> Labels
            </button>
          </div>
        </div>
        <div className="explosion-control">
          <Layers3 size={17} />
          <label htmlFor="machine-explode">Explode the view</label>
          <input
            id="machine-explode"
            type="range"
            min="0"
            max="100"
            value={exploded}
            onChange={(event) => setExploded(Number(event.target.value))}
          />
          <output htmlFor="machine-explode">{exploded}%</output>
          <button
            aria-label="Reassemble machine"
            onClick={() => setExploded(0)}
          >
            <RotateCcw size={15} />
          </button>
        </div>
        <p className="diagram-caption">
          Original conceptual illustration · Not to scale · Not a manufacturer
          service drawing
        </p>
      </div>
      <aside className="component-panel">
        <div className="panel-eyebrow">
          COMPONENT {String(partNumber).padStart(2, "0")} <span>/ 08</span>
        </div>
        <div className="component-heading">
          <div className="component-symbol">
            <Layers3 size={26} strokeWidth={1.2} />
          </div>
          <ArrowUpRight size={19} />
        </div>
        <h2>{part.name}</h2>
        <p className="component-deck">{part.description}</p>
        <p className="component-detail" aria-live="polite">
          {part.detail}
        </p>
        <div className="component-metric">
          <strong>{part.metric}</strong>
          <span>{part.metricLabel}</span>
        </div>
        <button className="text-link" onClick={onFollowWater}>
          Follow the water path <ChevronRight size={15} />
        </button>
        <div className="component-switcher">
          <span>EXPLORE THE PARTS</span>
          <div>
            {parts.map((item, index) => (
              <button
                key={item.id}
                aria-label={`Select ${item.name}`}
                aria-pressed={selected === item.id}
                className={selected === item.id ? "active" : ""}
                onClick={() => setSelected(item.id)}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>
      </aside>
      <div className="parts-strip">
        {parts.map((part, index) => (
          <button
            key={part.id}
            className={selected === part.id ? "active" : ""}
            aria-pressed={selected === part.id}
            onClick={() => setSelected(part.id)}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {part.name}
            {selected === part.id && <Check size={13} />}
          </button>
        ))}
      </div>
    </div>
  );
}

const groupParts = [
  {
    name: "Group body",
    detail:
      "The thermally controlled body connects the machine’s brew circuit to the portafilter. The exact water passages and heating arrangement depend on the group design.",
    material: "THERMAL MASS + WATER PASSAGES",
  },
  {
    name: "Diffuser",
    detail:
      "Spreads incoming water across a wider area before it reaches the shower screen. This helps distribute flow instead of sending one concentrated jet into the coffee.",
    material: "WATER DISTRIBUTION",
  },
  {
    name: "Group gasket",
    detail:
      "A flexible ring seals the rim of the basket against the group. It sits around the screen area, not in the water path. Leaks at the portafilter can have several causes, including a worn or dirty gasket.",
    material: "THE PRESSURE SEAL",
  },
  {
    name: "Shower screen",
    detail:
      "A perforated screen distributes water over the coffee. Coffee oils and residue accumulate here, so follow the model-specific cleaning instructions.",
    material: "EVEN WATER DELIVERY",
  },
  {
    name: "Filter basket",
    detail:
      "Holds the coffee puck. Water moves through the coffee and exits through holes in the basket base. Basket size, dose, and grind interact to determine flow.",
    material: "THE COFFEE BED",
  },
  {
    name: "Portafilter",
    detail:
      "Locks the basket into the group. Its handle provides leverage, and its body supports the basket. Keep it warm for brewing and never unlock it while the group is pressurized.",
    material: "SUPPORT + LOCKING",
  },
];

export function GroupLab() {
  const [exploded, setExploded] = useState(85);
  const [selected, setSelected] = useState(2);
  const current = groupParts[selected];
  const spacing = 14 + exploded * 0.62;
  return (
    <div className="lab-split group-lab">
      <div className="dark-canvas">
        <div className="canvas-topline">
          <span>
            THE BREW GROUP{" "}
            <span className="canvas-subtitle">An illustrative assembly</span>
          </span>
          <span className="figure-number">FIG. 02</span>
        </div>
        <svg
          viewBox="0 0 680 510"
          role="group"
          aria-label="Exploded brew group assembly"
        >
          <MetalDefs />
          <rect width="680" height="510" fill="url(#grid)" />
          <path
            d="M290 60V455"
            stroke="#9bab90"
            strokeDasharray="4 7"
            strokeOpacity=".4"
          />
          {groupParts.map((part, i) => {
            const y = 95 + i * spacing;
            return (
              <g
                key={part.name}
                transform={`translate(290 ${y})`}
                className={`machine-part ${selected === i ? "selected-part" : ""}`}
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${part.name}`}
                aria-pressed={selected === i}
                onClick={() => setSelected(i)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    setSelected(i);
                  }
                }}
              >
                {i === 0 && (
                  <>
                    <path
                      d="M-78-15v37c0 30 156 30 156 0v-37"
                      fill="url(#steel-dark)"
                      stroke="#aab89a"
                    />
                    <ellipse
                      cy="-15"
                      rx="78"
                      ry="25"
                      fill="url(#steel)"
                      stroke="#bec8aa"
                    />
                    <path d="M-20-33v-16h40v16" fill="url(#brass)" />
                    <ellipse cy="-33" rx="20" ry="7" fill="url(#brass)" />
                  </>
                )}
                {i === 1 && (
                  <>
                    <path
                      d="M-59 0v10c0 25 118 25 118 0V0"
                      fill="url(#brass)"
                      stroke="#b6aa79"
                    />
                    <ellipse
                      rx="59"
                      ry="18"
                      fill="url(#brass)"
                      stroke="#d2c291"
                    />
                    <circle r="5" fill="#2c3f2e" />
                  </>
                )}
                {i === 2 && (
                  <>
                    <ellipse
                      rx="76"
                      ry="24"
                      fill="#12251e"
                      stroke="#92a487"
                      strokeWidth="2"
                    />
                    <ellipse rx="58" ry="15" fill="#20382b" stroke="#6e856b" />
                    <path
                      d="M-74 5c15 31 137 29 148 0"
                      fill="none"
                      stroke="#091b15"
                      strokeWidth="6"
                    />
                  </>
                )}
                {i === 3 && (
                  <>
                    <path
                      d="M-63 0v5c0 23 126 23 126 0V0"
                      fill="url(#steel-dark)"
                      stroke="#a1b28f"
                    />
                    <ellipse
                      rx="63"
                      ry="19"
                      fill="url(#steel)"
                      stroke="#d3dcc0"
                    />
                    <ellipse rx="58" ry="16" fill="url(#perforation)" />
                    <circle r="4" fill="#a9b89a" />
                  </>
                )}
                {i === 4 && (
                  <>
                    <path
                      d="M-63-5l12 35c8 18 94 18 102 0l12-35"
                      fill="url(#steel)"
                      stroke="#a7b99b"
                    />
                    <ellipse
                      cy="-5"
                      rx="63"
                      ry="21"
                      fill="#5e6d50"
                      stroke="#c4ceaf"
                      strokeWidth="4"
                    />
                    <ellipse cy="-3" rx="57" ry="16" fill="#70513a" />
                    <path
                      d="M-48 32q48 17 96 0"
                      stroke="#28432d"
                      strokeDasharray="2 4"
                      strokeWidth="2"
                      fill="none"
                    />
                  </>
                )}
                {i === 5 && (
                  <>
                    <path
                      d="M-72-7v21c0 26 144 26 144 0V-7"
                      fill="url(#steel-dark)"
                      stroke="#b8c4a3"
                    />
                    <ellipse
                      cy="-7"
                      rx="72"
                      ry="24"
                      fill="url(#steel)"
                      stroke="#c4cdae"
                    />
                    <ellipse cy="-7" rx="57" ry="18" fill="#21372a" />
                    <path d="M-68 8l-49 19" stroke="#b4c19d" strokeWidth="15" />
                    <path
                      d="M-117 27l-73 28"
                      stroke="#101e19"
                      strokeWidth="27"
                      strokeLinecap="round"
                    />
                    <path
                      d="M-121 20l-68 26"
                      stroke="#526548"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </>
                )}
                <path
                  d="M87 0h80"
                  stroke={selected === i ? "#d1ddae" : "#70876e"}
                  strokeWidth=".8"
                />
                <circle
                  cx="177"
                  r="10"
                  fill={selected === i ? "#c8d5ad" : "#243c2c"}
                  stroke="#95a580"
                />
                <text
                  x="177"
                  y="3"
                  textAnchor="middle"
                  fill={selected === i ? "#203222" : "#d9e1c4"}
                  fontSize="9"
                >
                  {i + 1}
                </text>
                <text
                  x="198"
                  y="4"
                  fill={selected === i ? "#e4e9d5" : "#a9b99c"}
                  fontSize="11"
                >
                  {part.name}
                </text>
              </g>
            );
          })}
        </svg>
        <div className="group-explode">
          <Layers3 size={16} />
          <label htmlFor="group-explode">Separate the layers</label>
          <input
            id="group-explode"
            type="range"
            min="0"
            max="100"
            value={exploded}
            onChange={(event) => setExploded(Number(event.target.value))}
          />
          <output>{exploded}%</output>
        </div>
      </div>
      <aside className="lab-sidebar">
        <span className="eyebrow">THE FINAL HANDOFF</span>
        <h2>
          Small parts.
          <br />
          <em>Big differences.</em>
        </h2>
        <p>
          Follow the water down the center. Notice how the gasket surrounds the
          water path rather than sitting across it.
        </p>
        <div className="group-part-list">
          {groupParts.map((part, i) => (
            <button
              key={part.name}
              className={selected === i ? "active" : ""}
              aria-pressed={selected === i}
              onClick={() => setSelected(i)}
            >
              <span>{String(i + 1).padStart(2, "0")}</span>
              {part.name}
              <ChevronRight size={15} />
            </button>
          ))}
        </div>
        <div className="selection-note" aria-live="polite">
          <span className="eyebrow">{current.material}</span>
          <h3>{current.name}</h3>
          <p>{current.detail}</p>
        </div>
        <p className="fine-print">
          <ArrowDown size={13} /> Exploded relationship, not removal order. Not
          an OEM assembly.
        </p>
      </aside>
    </div>
  );
}
