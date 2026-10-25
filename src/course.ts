export type LessonId =
  | "anatomy"
  | "water"
  | "heat"
  | "pressure"
  | "group"
  | "steam"
  | "marzocco"
  | "care";
export type PartId =
  "reservoir" | "pump" | "brew" | "steam" | "group" | "valve" | "pid" | "wand";

export type Part = {
  id: PartId;
  name: string;
  category: string;
  description: string;
  detail: string;
  metric: string;
  metricLabel: string;
};

export const parts: Part[] = [
  {
    id: "reservoir",
    name: "Water reservoir",
    category: "THE SUPPLY",
    description: "Every shot starts here.",
    detail:
      "The tank supplies fresh water to the pump. Plumbed-in machines use a treated mains supply instead. Water chemistry affects taste, scale, and corrosion, so a filter is not automatically the right treatment.",
    metric: "Fresh + treated",
    metricLabel: "THE RIGHT STARTING POINT",
  },
  {
    id: "pump",
    name: "Rotary pump",
    category: "THE PRESSURE SOURCE",
    description: "Creates flow. Resistance creates pressure.",
    detail:
      "A motor turns a rotary-vane pump, pushing water toward the boilers and coffee. The puck resists this flow. A regulating bypass limits pump pressure. Many other home machines use a vibration pump instead.",
    metric: "≈ 9 bar",
    metricLabel: "A COMMON BREWING REFERENCE",
  },
  {
    id: "brew",
    name: "Brew boiler",
    category: "THE TEMPERATURE KEEPER",
    description: "A small reservoir with a very precise job.",
    detail:
      "The brew boiler heats water for extraction independently of the steam boiler. A sensor and controller regulate its heater. Water temperature at the coffee also depends on the group, flow, and how thoroughly the machine has warmed up.",
    metric: "≈ 93°C",
    metricLabel: "AN EXAMPLE BREW SETPOINT",
  },
  {
    id: "steam",
    name: "Steam boiler",
    category: "THE STEAM ENGINE",
    description: "A hotter boiler, a different purpose.",
    detail:
      "This vessel contains hot water and a headspace of pressurized steam. Opening the steam valve releases steam through the wand. A level probe and fill valve maintain the water level. A safety valve protects against excessive pressure.",
    metric: "> 100°C",
    metricLabel: "PRESSURIZED WATER + STEAM",
  },
  {
    id: "group",
    name: "Brew group",
    category: "THE FINAL HANDOFF",
    description: "Where the machine meets the coffee.",
    detail:
      "The group holds the portafilter, distributes water through a diffuser and shower screen, and provides a stable thermal environment. A gasket seals the basket rim. Group architecture matters as much as the boiler setpoint.",
    metric: "58 mm",
    metricLabel: "COMMON NOMINAL BASKET DIAMETER",
  },
  {
    id: "valve",
    name: "Three-way valve",
    category: "THE TRAFFIC CONTROLLER",
    description: "Brew, stop, then release pressure.",
    detail:
      "In the simplified brew circuit, this solenoid connects the boiler to the group during brewing. When brewing stops, it shuts the supply and vents the group to the drain. Exact valve arrangements differ across machines.",
    metric: "Supply / group / drain",
    metricLabel: "THREE PORTS, TWO STATES",
  },
  {
    id: "pid",
    name: "PID controller",
    category: "THE FEEDBACK LOOP",
    description: "Measures, compares, then adjusts.",
    detail:
      "The controller compares a temperature sensor reading with a target and adjusts heater power. Proportional, integral, and derivative terms respond to present error, accumulated error, and the rate of change. It cannot make a cold group hot instantly.",
    metric: "Sense → adjust",
    metricLabel: "CONTINUOUS TEMPERATURE FEEDBACK",
  },
  {
    id: "wand",
    name: "Steam wand",
    category: "THE MILK TEXTURIZER",
    description: "Turns stored heat into silky milk.",
    detail:
      "Steam leaves the boiler through a valve and wand tip. Condensing steam heats the milk. Tip position controls air incorporation and circulation. Purge, steam, wipe, and purge again, following the machine manual.",
    metric: "Air + circulation",
    metricLabel: "TWO JOBS WHILE STEAMING",
  },
];

type Answer = { text: string; correct: boolean; feedback: string };
export type Lesson = {
  id: LessonId;
  nav: string;
  title: string;
  accent: string;
  subtitle: string;
  minutes: number;
  objective: string;
  sections: { title: string; text: string }[];
  note: { title: string; text: string };
  question: string;
  answers: Answer[];
  sources: string[];
};

export const lessons: Lesson[] = [
  {
    id: "anatomy",
    nav: "Meet the machine",
    title: "Beneath the",
    accent: "surface.",
    minutes: 5,
    subtitle: "A remarkable amount of engineering. One small cup of coffee.",
    objective:
      "Move the explode slider, then select the brew boiler, pump, and group. Follow the job each part does.",
    sections: [
      {
        title: "Three things, working together",
        text: "An espresso machine supplies hot water, drives it through a resistant bed of coffee, and keeps the process repeatable. The pump moves water. The boiler supplies heat. The group delivers that water to the puck. Electricity powers heaters, the pump motor, and controls; it is a separate system from the water circuit.",
      },
      {
        title: "Read the machine as systems",
        text: "Separate the machine into supply, pressure, heat, and delivery. The reservoir belongs to supply. The pump and regulating valves manage pressure. Boilers and their sensors manage heat. The group, shower screen, and portafilter deliver water through the coffee. A failure in one system can look like a problem in another.",
      },
      {
        title: "Why two boilers?",
        text: "Brewing and steaming need different temperatures. A dual-boiler machine gives each job its own vessel and controls. This lets you brew and steam together without asking one boiler to switch temperatures. Not every espresso machine uses this layout. Heat exchangers and single boilers solve the same problem differently.",
      },
    ],
    note: {
      title: "A teaching model, not a service drawing",
      text: "The exploded view is an original, simplified dual-boiler illustration. Placement, dimensions, pipe routes, and omitted safety components are not a teardown guide for any La Marzocco model. Explore the principles here; use the exact model manual for the real machine.",
    },
    question: "Which component moves water toward the coffee?",
    answers: [
      {
        text: "The brew boiler",
        correct: false,
        feedback:
          "The brew boiler heats and stores brew water. Look for the motor-driven component that creates flow.",
      },
      {
        text: "The pump",
        correct: true,
        feedback:
          "Exactly. The pump creates flow; resistance from the coffee and circuit allows pressure to build.",
      },
      {
        text: "The PID controller",
        correct: false,
        feedback:
          "The PID regulates temperature by controlling heater power. It does not move water.",
      },
    ],
    sources: ["mini", "micra"],
  },
  {
    id: "water",
    nav: "Follow the water",
    title: "Follow every",
    accent: "drop.",
    minutes: 5,
    subtitle: "From the reservoir to your cup, with a few important detours.",
    objective:
      "Switch between idle, brewing, and release. Watch the three-way valve change which path is open.",
    sections: [
      {
        title: "During a shot",
        text: "In this simplified dual-boiler circuit, fresh water enters the pump, then the brew boiler. The brew valve opens the path to the group. Water passes the diffuser and shower screen, wets the coffee, and exits through the basket as espresso. Some machines preheat incoming brew water through a heat exchanger before it reaches the brew boiler.",
      },
      {
        title: "After you stop",
        text: "The pump stops and the brew supply closes. A three-way valve opens a path from the group to the drain, releasing trapped pressure and sending a small discharge to the drip tray. That release helps you remove the portafilter safely after pressure has dissipated. Never force a pressurized portafilter open.",
      },
      {
        title: "The other branch",
        text: "Steam-boiler filling is a separate, level-controlled branch. The fill valve opens when the level is low and closes when the probe detects enough water. Steam comes from the headspace, not directly from the pump. The illustration omits check valves, restrictors, safety valves, and model-specific preheating paths so you can follow the main route.",
      },
    ],
    note: {
      title: "Two meanings of “pre”",
      text: "Pre-brewing often means a short pump-on wetting phase followed by a pause. Pre-infusion means wetting at a lower pressure before full extraction pressure. La Marzocco implementations vary by model, generation, plumbing, and app settings. The words are not interchangeable.",
    },
    question:
      "Where does trapped group pressure go after a shot in this circuit?",
    answers: [
      {
        text: "Back into the water reservoir",
        correct: false,
        feedback:
          "The group discharge is spent brew water. The three-way valve directs it toward the drain, not the fresh water tank.",
      },
      {
        text: "Through the steam wand",
        correct: false,
        feedback:
          "The steam circuit is a different branch. Follow the line from the group to the drip tray.",
      },
      {
        text: "Through the three-way valve to the drain",
        correct: true,
        feedback:
          "Right. The valve closes the brew supply and vents the group to the drain.",
      },
    ],
    sources: ["preinfusion", "manuals"],
  },
  {
    id: "heat",
    nav: "Heat & boilers",
    title: "The art of",
    accent: "staying warm.",
    minutes: 5,
    subtitle: "Temperature is a system, not just a number on a display.",
    objective:
      "Compare the three boiler architectures. Change the brew setpoint, then explore how each handles steam.",
    sections: [
      {
        title: "Single boiler, two temperatures",
        text: "A single-boiler dual-use machine heats one vessel to brew temperature or to a higher steam temperature. It normally needs a transition between the two jobs, with refill or cooling steps specified by its manual. Its simplicity and smaller size come at the cost of workflow flexibility.",
      },
      {
        title: "The heat-exchanger approach",
        text: "An HX machine stores hot water and steam in one boiler. Fresh brew water travels through a separate tube within that hotter vessel. The streams do not mix. Group design, idle time, flow, and the heat exchanger determine brew temperature. Some HX machines need a cooling flush; follow the model procedure rather than assuming every one does.",
      },
      {
        title: "Dual boilers and thermal mass",
        text: "A dedicated brew boiler can target extraction temperature while the steam boiler stays hotter. PID control improves regulation, but the sensor measures one location. The group and portafilter still need to warm up. Changing the setpoint is not an instantaneous change at the puck, and a stable display does not prove the entire machine is ready.",
      },
    ],
    note: {
      title: "La Marzocco’s distinction",
      text: "The Linea Mini and Micra have integrated brew groups: compact assemblies coupling the brew boiler and group. The GS3 uses a saturated group in thermal continuity with its brew boiler. Both pursue stability, but they are not the same physical design.",
    },
    question: "Why can a dual-boiler machine brew and steam at the same time?",
    answers: [
      {
        text: "Both jobs need the same temperature",
        correct: false,
        feedback:
          "Brewing uses water below the steam boiler’s temperature. Sharing one temperature would compromise one of the jobs.",
      },
      {
        text: "Each job has a separately heated boiler",
        correct: true,
        feedback:
          "Correct. Separate brew and steam boilers allow different thermal targets and simultaneous operation.",
      },
      {
        text: "The pump heats water as it moves",
        correct: false,
        feedback:
          "Electrical heating elements supply the useful heat. The pump supplies flow.",
      },
    ],
    sources: ["mini", "micra", "gs3"],
  },
  {
    id: "pressure",
    nav: "Pressure & flow",
    title: "Pressure meets",
    accent: "resistance.",
    minutes: 6,
    subtitle: "Nine bars on a gauge does not tell the whole story.",
    objective:
      "Keep pump pressure fixed and increase puck resistance. Predict what happens to flow before you move the slider.",
    sections: [
      {
        title: "Pressure is not flow",
        text: "Pressure is a difference in force per area. Flow is the amount of water moving per unit time. A pump can deliver high flow with little pressure against an open outlet. A blocked basket can produce high pressure with almost no flow. Those two cases are why pressure alone cannot tell you whether an extraction is good.",
      },
      {
        title: "The coffee is a changing restriction",
        text: "Grind, dose, basket geometry, puck preparation, and the coffee itself affect resistance. A finer grind often reduces flow at a given pressure. But the bed swells, erodes, and may develop channels. Channels let water bypass much of the coffee, so a fast shot is not a direct measurement of grind size or a guarantee of uniform extraction.",
      },
      {
        title: "Regulation is not a recipe",
        text: "A rotary pump commonly uses a bypass to regulate its outlet pressure. Many vibration-pump circuits use an overpressure valve to limit brew pressure. An expansion valve can relieve pressure created as trapped water heats; that is a different job from setting the pump. A pressure gauge’s reading also depends on where the gauge is connected.",
      },
    ],
    note: {
      title: "What this experiment can tell you",
      text: "The lab uses Q = ΔP / R with arbitrary resistance units. It demonstrates one relationship, not a pump curve, a fluid-dynamics model, or a prediction of shot time and taste. Nine bar is a common starting point, not a universal optimum. Do not open a live machine to adjust pressure.",
    },
    question:
      "At fixed pressure, what does greater puck resistance do in this simplified model?",
    answers: [
      {
        text: "Reduces flow through the puck",
        correct: true,
        feedback:
          "Yes. In Q = ΔP / R, raising resistance at fixed pressure lowers flow. Real coffee adds changing permeability and channeling.",
      },
      {
        text: "Always increases flow",
        correct: false,
        feedback:
          "A more resistant path allows less flow at the same pressure, not more.",
      },
      {
        text: "Automatically improves the espresso",
        correct: false,
        feedback:
          "The model describes flow, not flavor. Less flow does not establish better or more uniform extraction.",
      },
    ],
    sources: ["pressure"],
  },
  {
    id: "group",
    nav: "Inside the group",
    title: "The last",
    accent: "few centimeters.",
    minutes: 4,
    subtitle:
      "A close-up of the parts that turn hot water into an even extraction.",
    objective:
      "Separate the group assembly. Select the gasket, shower screen, and basket to see why each matters.",
    sections: [
      {
        title: "Distribution before extraction",
        text: "The group’s internal passages and diffuser distribute incoming water over the shower screen. The screen spreads it toward the puck, but it cannot fix unevenly prepared coffee. Old oils and blocked holes can interfere with distribution. Clean only as directed in the machine manual.",
      },
      {
        title: "A seal, a basket, and a handle",
        text: "The gasket seals the basket rim against the group when the portafilter locks in. The basket holds the grounds and provides a perforated outlet. The portafilter supports the basket and locks into the group. A bottomless portafilter removes the spouted base, not the basket, and makes the underside of extraction visible.",
      },
      {
        title: "Hot metal matters",
        text: "A cold group or portafilter can absorb heat from brew water. Saturated, integrated, and thermosyphon-heated groups address heat transfer in different ways. “58 mm” describes a nominal basket size, not universal compatibility: basket shape, portafilter ears, gasket dimensions, and model fit still matter.",
      },
    ],
    note: {
      title: "An exploded relationship, not removal order",
      text: "This diagram shows how the parts relate. It is not a disassembly sequence. Designs may use a screw, a different diffuser, or other retention parts. The group and water can remain hot after power is off. Use the exact model instructions for cleaning and replacement.",
    },
    question: "Which part seals the basket rim to the brew group?",
    answers: [
      {
        text: "The shower screen",
        correct: false,
        feedback:
          "The screen distributes water. The flexible gasket makes the pressure seal.",
      },
      {
        text: "The portafilter handle",
        correct: false,
        feedback:
          "The handle gives leverage to lock the portafilter. The gasket makes the seal against the basket rim.",
      },
      {
        text: "The group gasket",
        correct: true,
        feedback:
          "Exactly. A worn, dirty, or incorrectly seated gasket can cause leaks around the portafilter.",
      },
    ],
    sources: ["manuals"],
  },
  {
    id: "steam",
    nav: "Steam & milk",
    title: "A little air.",
    accent: "A lot of physics.",
    minutes: 4,
    subtitle: "Follow the energy from the steam boiler into the milk.",
    objective:
      "Move through the four steaming stages. See where the wand tip sits and what each stage changes.",
    sections: [
      {
        title: "Steam stores useful energy",
        text: "The steam boiler holds liquid water with steam above it. When its valve opens, steam flows toward the lower-pressure atmosphere. Steam condenses in the cooler milk and transfers substantial heat. The pump may replenish boiler water, but it is not what directly drives steam out of the wand.",
      },
      {
        title: "Introduce air, then mix it",
        text: "With the tip near the milk surface, the moving steam draws in air. Lowering the tip slightly and positioning it off-center encourages circulation that mixes the bubbles into the milk. Too much air can make stiff foam; too little gives hot, flat milk. Pitcher geometry, tip design, and milk type change the technique.",
      },
      {
        title: "Finish safely and cleanly",
        text: "Start with cold milk in a suitable pitcher. Keep hands away from the steam jet. Shut the valve before removing the tip from milk. Wipe the wand with a dedicated damp cloth and purge into the drip tray as instructed. Many baristas aim around 55–65°C for milk texture and drinking comfort, but that is not a food-safety pasteurization procedure.",
      },
    ],
    note: {
      title: "Steam pressure is not brew pressure",
      text: "A steam gauge measures the steam boiler, usually relative to atmospheric pressure. A brew gauge measures a hydraulic circuit. Their scales and meanings differ. Never defeat a safety valve, and never use a blocked wand as a pressure test.",
    },
    question: "What supplies most of the useful heat during steaming?",
    answers: [
      {
        text: "Steam condensing in the milk",
        correct: true,
        feedback:
          "Right. Steam gives up latent heat when it condenses, rapidly heating the milk.",
      },
      {
        text: "The pump spinning faster",
        correct: false,
        feedback:
          "The steam boiler heater supplies the energy. Boiler pressure drives steam through the wand.",
      },
      {
        text: "Air bubbles rubbing together",
        correct: false,
        feedback:
          "Air affects foam texture. Condensing steam supplies the heating energy.",
      },
    ],
    sources: ["manuals"],
  },
  {
    id: "marzocco",
    nav: "The La Marzocco way",
    title: "From Florence,",
    accent: "with precision.",
    minutes: 6,
    subtitle: "One engineering philosophy. Several very different machines.",
    objective:
      "Compare the Linea Micra, reimagined Linea Mini, and GS3. Switch models and pay attention to the group and brew controls.",
    sections: [
      {
        title: "Micra and Mini: integrated groups",
        text: "Both home machines combine separate brew and steam boilers with compact integrated brew groups, rotary pumps, and electronic temperature control. They are not miniature copies of every commercial internal part. The Micra prioritizes a compact home footprint. The reimagined Mini adds its own controls and pre-infusion hardware. Check the generation and market specification before transferring a feature from one to the other.",
      },
      {
        title: "GS3: AV and MP are different",
        text: "The GS3 uses a saturated brew group. The AV version uses electronic volumetric dosing with programmable buttons. The MP version uses a mechanical paddle and a conical valve to let the operator vary flow and influence pressure through the shot. Moving the paddle on a Linea Mini is not the same as mechanically profiling a shot on a GS3 MP.",
      },
      {
        title: "The commercial family",
        text: "The Linea PB uses separate coffee and steam boilers and saturated groups for a commercial workflow. The Strada name spans different control systems and generations: AV, EE, MP, EP, and X are not interchangeable labels. The Strada X uses electronically controlled pressure profiling and mass-based features. Do not infer its capabilities from an older Strada or a home-model paddle.",
      },
    ],
    note: {
      title: "Independent guide",
      text: "This tutorial is not affiliated with or endorsed by La Marzocco. Brand and model names identify the equipment being discussed. The diagrams are original conceptual illustrations, not OEM drawings. Linked manufacturer pages are the authority for model-specific details.",
    },
    question:
      "Which statement accurately distinguishes the GS3 MP from the Linea Mini?",
    answers: [
      {
        text: "Every paddle gives identical pressure profiling",
        correct: false,
        feedback:
          "The physical shape of the control does not determine the hydraulics behind it.",
      },
      {
        text: "The GS3 MP paddle mechanically varies flow; the Mini paddle is a brew switch",
        correct: true,
        feedback:
          "Correct. The GS3 MP’s valve enables manual control through the shot. The Mini’s paddle starts and stops an electronically controlled brew process.",
      },
      {
        text: "The Linea Mini has a single boiler",
        correct: false,
        feedback:
          "The Linea Mini has separate brew and steam boilers with an integrated brew group.",
      },
    ],
    sources: ["micra", "mini", "gs3", "pb", "strada", "preinfusion"],
  },
  {
    id: "care",
    nav: "Care & diagnosis",
    title: "Know the signs.",
    accent: "Respect the machine.",
    minutes: 5,
    subtitle:
      "Use your new mental model without turning a lesson into a risky repair.",
    objective:
      "Choose a symptom in the diagnostic cards. Separate a safe external check from work that needs a qualified technician.",
    sections: [
      {
        title: "Start with what you can observe",
        text: "Note what changed: coffee, grind, dose, water supply, warm-up time, or a recent cleaning. Compare the behavior with and without coffee only if the machine manual permits that normal operation. A slow shot with normal group flow suggests a different problem than no water anywhere. One symptom can have several causes; this guide cannot diagnose an electrical or pressure-vessel fault.",
      },
      {
        title: "Keep the water and coffee paths clean",
        text: "Use water that meets the manufacturer’s hardness, alkalinity, and chloride guidance. A softener and a carbon filter do different jobs. Clean the basket, portafilter, shower screen, and steam wand at the recommended intervals. Use the specified detergent and backflush procedure only on machines designed for it. Blindly descaling a plumbed or dual-boiler machine can cause damage.",
      },
      {
        title: "Know when to stop",
        text: "Leaks inside the housing, tripping breakers, a burning smell, uncontrolled heating, or abnormal safety-valve discharge need professional attention. Stop using the machine and isolate power and water if you can do so safely. Switching off does not instantly remove stored heat, pressure, or electrical hazards. Do not remove covers, probe live circuits, or loosen hot fittings.",
      },
    ],
    note: {
      title: "Your mental model is the takeaway",
      text: "You can now trace supply → pump → heating → group → coffee, explain the separate steam circuit, and distinguish pressure from flow. Use that model to ask better questions, recognize changing behavior, and describe a fault clearly to a technician.",
    },
    question:
      "You see an internal leak and the machine trips a breaker. What is the right next step?",
    answers: [
      {
        text: "Reset the breaker repeatedly and keep brewing",
        correct: false,
        feedback:
          "Repeated tripping can signal a serious electrical fault. Stop using the machine.",
      },
      {
        text: "Open the housing while it runs to find the leak",
        correct: false,
        feedback:
          "Water, mains electricity, hot metal, and pressure are a dangerous combination. Do not open a live machine.",
      },
      {
        text: "Stop use, isolate safely, and contact a qualified technician",
        correct: true,
        feedback:
          "Correct. Good diagnosis includes recognizing when further testing is unsafe.",
      },
    ],
    sources: ["manuals", "water"],
  },
];

export const sources = [
  {
    id: "mini",
    title: "Linea Mini",
    publisher: "La Marzocco Home · 2024 redesign features",
    url: "https://home.lamarzoccousa.com/features-of-the-linea-mini/",
  },
  {
    id: "micra",
    title: "Linea Micra",
    publisher: "La Marzocco · product specifications",
    url: "https://www.lamarzocco.com/uk/en/home-products/espresso-machines/linea-micra/",
  },
  {
    id: "gs3",
    title: "GS3",
    publisher: "La Marzocco · AV and MP configurations",
    url: "https://www.lamarzocco.com/it/en/home-products/espresso-machines/gs3/",
  },
  {
    id: "gs3-mp",
    title: "The updated GS3 MP",
    publisher: "La Marzocco Home · conical valve and tank-fed pressure control",
    url: "https://home.lamarzoccousa.com/introducing-the-new-gs3-mp/",
  },
  {
    id: "pb",
    title: "Linea PB manual",
    publisher: "La Marzocco · commercial machine manual, PDF",
    url: "https://lamarzoccousa.com/wp-content/uploads/2020/03/MAN.10.1.03_LINEAPB_EN_V4.0_ONLINE.pdf",
  },
  {
    id: "strada",
    title: "Strada X",
    publisher: "La Marzocco · commercial machines",
    url: "https://www.lamarzocco.com/uk/en/commercial-products/espresso-machines/strada-x/",
  },
  {
    id: "preinfusion",
    title: "Pre-brew systems, explained",
    publisher: "La Marzocco Home · original versus modern valve arrangements",
    url: "https://home.lamarzoccousa.com/pre-brew-in-espresso-explained/",
  },
  {
    id: "pressure",
    title: "Experimenting with pressure and espresso",
    publisher: "La Marzocco · Linea Mini education",
    url: "https://www.lamarzocco.com/uk/en/experimenting-with-pressure-espresso-on-the-linea-mini/",
  },
  {
    id: "manuals",
    title: "Product support and manuals",
    publisher: "La Marzocco Home · use the manual for your exact model",
    url: "https://home.lamarzoccousa.com/maintenance-service/",
  },
  {
    id: "water",
    title: "Water specifications",
    publisher: "La Marzocco · complete water specification, PDF",
    url: "https://lamarzoccousa.com/wp-content/uploads/2023/09/Water-Specifications.pdf",
  },
];

export const glossary = [
  {
    term: "Bar",
    definition:
      "A unit of pressure. One bar is 100,000 pascals. A gauge often reports pressure above atmosphere, not absolute pressure.",
  },
  {
    term: "Brew ratio",
    definition:
      "The relationship between dry coffee dose and espresso mass. An 18 g dose with a 36 g yield is 1:2, a starting recipe rather than a universal target.",
  },
  {
    term: "Channeling",
    definition:
      "Uneven flow through preferential paths in the coffee bed. Some coffee sees more water than the rest.",
  },
  {
    term: "Expansion valve",
    definition:
      "A valve that releases excess pressure as trapped water expands during heating. Its role differs from a pump’s pressure-regulating bypass.",
  },
  {
    term: "Heat exchanger",
    definition:
      "A separate water path that gains heat from a hotter surrounding fluid without the two fluids mixing.",
  },
  {
    term: "Integrated group",
    definition:
      "A compact assembly coupling the brew boiler and group, used in the Linea Mini and Micra.",
  },
  {
    term: "OPV",
    definition:
      "Overpressure valve. In many pump circuits it limits pressure by diverting water when a threshold is reached. Layout and terminology vary by machine.",
  },
  {
    term: "PID",
    definition:
      "Proportional–integral–derivative control. A feedback method that adjusts heater power in response to temperature error.",
  },
  {
    term: "Pre-brewing",
    definition:
      "An initial wetting stage, often a brief pump-on period followed by a pause. Exact behavior is model-specific.",
  },
  {
    term: "Pre-infusion",
    definition:
      "Lower-pressure wetting before full extraction pressure. The available pressure and control depend on the machine and water supply.",
  },
  {
    term: "Puck",
    definition:
      "The prepared bed of ground coffee in the filter basket. It provides resistance and changes during extraction.",
  },
  {
    term: "Saturated group",
    definition:
      "A group design whose water-filled cavity is in thermal continuity with the brew boiler, helping keep the brew path stable.",
  },
  {
    term: "Solenoid",
    definition:
      "An electromagnetic actuator. In a solenoid valve, energizing a coil changes which fluid passages are open.",
  },
  {
    term: "Thermosyphon",
    definition:
      "Circulation driven by density differences between hotter and cooler water, used to move heat through some group designs.",
  },
  {
    term: "Volumetric dosing",
    definition:
      "Stopping a shot based on a flowmeter’s measured water volume. It is not the same as weighing espresso in the cup.",
  },
];
