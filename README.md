# Espresso Atelier

An interactive field guide to espresso-machine internals, with original exploded SVG diagrams and source-linked La Marzocco comparisons. Eight lessons connect the water circuit, boilers, pressure, group assembly, and steam system.

## Run the tutorial

Use Node.js 22 or newer and npm.

```sh
git clone https://github.com/refcell/espresso.git
cd espresso
npm ci
npm run dev
```

Open the localhost address Vite prints. Start with **Meet the machine**, move the explosion slider, and select a part. Each lesson includes an experiment, an explanation, and a question with feedback. Correct answers save progress in that browser. All lessons remain available in any order.

## Explore the lessons

1. **Meet the machine:** separate the chassis and select eight internal components.
2. **Follow the water:** switch between brewing, pressure release, steam, refill, and idle states.
3. **Heat & boilers:** compare single-boiler, heat-exchanger, and dual-boiler architectures.
4. **Pressure & flow:** vary pressure and puck resistance in a simplified experiment.
5. **Inside the group:** separate the group, diffuser, gasket, screen, basket, and portafilter.
6. **Steam & milk:** step through purging, air introduction, circulation, and cleanup.
7. **The La Marzocco way:** compare the Micra, redesigned Mini, GS3 AV, and updated GS3 MP. Inspect how their controls and prebrew systems differ.
8. **Care & diagnosis:** distinguish safe external observations from faults that need professional service.

The glossary and source library are searchable. Controls support keyboard operation, narrow screens, and reduced-motion preferences. Progress stays on the device; there are no accounts, analytics, or runtime API calls. Fonts are bundled locally.

## Verify a change

```sh
npx playwright install chromium
npm test
npm run format:check
```

The browser suite builds the production app and serves it on port 4173. It exercises the diagrams, lesson navigation, experiments, quizzes, saved progress, storage failure, mobile layout, and reduced motion. Axe checks cover the lesson pages and reference library. Automated checks do not replace visual or assistive-technology review.

To use an installed Google Chrome instead of Playwright's Chromium:

```sh
PLAYWRIGHT_CHANNEL=chrome npm test
```

To build and inspect the static output:

```sh
npm run build
npm run preview
```

Vite writes `dist/`. Relative asset paths and hash-based lesson links allow static hosting under a subdirectory. This repository does not configure a deployment.

## Content and implementation

`src/course.ts` contains the lessons, glossary, component explanations, and primary-source links. `src/App.tsx` owns navigation and progress. The lab components own their controls and SVG artwork. Progress uses a versioned storage key per lesson so completion in one tab cannot overwrite another tab's progress.

La Marzocco facts distinguish the redesigned Mini with serial prefix `MI` from the original `LM` Mini. The GS3 MP comparison describes the updated conical-valve version. Model review was completed in October 2026; installed hardware, market, firmware, and accessories can differ. The in-app source library links the manufacturer documentation used, including [prebrew systems](https://home.lamarzoccousa.com/pre-brew-in-espresso-explained/), [Mini features](https://home.lamarzoccousa.com/features-of-the-linea-mini/), and the [updated GS3 MP](https://home.lamarzoccousa.com/introducing-the-new-gs3-mp/).

## Safety and scope

The diagrams are original conceptual illustrations, not manufacturer service drawings or disassembly instructions. Their spacing, dimensions, and connections are simplified. The pressure experiment uses `Q = ΔP / R` with arbitrary resistance units; it does not predict shot time, extraction yield, or taste.

Follow the manual for your exact machine. Do not remove covers, work on live electrical systems, loosen hot fittings, or adjust safety valves. Internal leaks, electrical faults, uncontrolled heating, and abnormal safety-valve discharge require qualified service.

This is an independent educational project, not affiliated with or endorsed by La Marzocco. Brand names identify the equipment discussed. Manufacturer documents are linked rather than reproduced. Bundled fonts and icons retain their upstream licenses.
