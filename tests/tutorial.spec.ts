import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("lesson navigation replaces the lab and resets local quiz feedback", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to lesson" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("heading", { level: 1 })).toBeFocused();
  await page.getByRole("button", { name: "B The pump", exact: true }).click();
  await page
    .getByRole("link", { name: "02 Follow the water", exact: true })
    .click();
  await expect(page.getByRole("img", { name: /^Brewing:/ })).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Assembled", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByText("Lesson completed", { exact: true })).toHaveCount(
    0,
  );
  await page
    .getByRole("link", { name: /Heat & boilers/ })
    .first()
    .click();
  await expect(
    page.getByRole("slider", { name: /Brew setpoint/ }),
  ).toBeVisible();
  await expect(page.getByRole("img", { name: /^Brewing:/ })).toHaveCount(0);
  await page.goBack();
  await expect(page.getByRole("img", { name: /^Brewing:/ })).toBeVisible();
  await expect(page.getByRole("slider", { name: /Brew setpoint/ })).toHaveCount(
    0,
  );
  await page
    .getByRole("link", { name: /Meet the machine/ })
    .first()
    .click();
  await expect(
    page.getByRole("button", { name: "Assembled", exact: true }),
  ).toHaveCount(1);
  await expect(
    page.getByText("Lesson completed", { exact: true }),
  ).toBeVisible();
});

test("machine selection, assembly, and accessible diagram controls", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Beneath the surface.",
  );
  await page
    .getByRole("button", { name: "Inspect Rotary pump", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("heading", { name: "Rotary pump", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Assembled", exact: true }).click();
  await expect(
    page.getByRole("slider", { name: "Explode the view" }),
  ).toHaveValue("0");
  await page.getByRole("button", { name: "Exploded", exact: true }).click();
  await expect(
    page.getByRole("slider", { name: "Explode the view" }),
  ).toHaveValue("75");
  await page.getByRole("slider", { name: "Explode the view" }).focus();
  await page.keyboard.press("End");
  await expect(
    page.getByRole("slider", { name: "Explode the view" }),
  ).toHaveValue("100");
  await page.getByRole("button", { name: "Labels", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Labels", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Reset diagram" }).click();
  await expect(
    page.getByRole("heading", { name: "Brew boiler", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("slider", { name: "Explode the view" }),
  ).toHaveValue("75");
});

test("water states explain separate brew, discharge, steam, and fill paths", async ({
  page,
}) => {
  await page.goto("/#water");
  await expect(page.getByRole("img", { name: /^Brewing:/ })).toBeVisible();
  await page.getByRole("button", { name: /Release/ }).click();
  await expect(
    page.getByRole("img", {
      name: "Release: Group → three-way valve → drip tray",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("definition").filter({ hasText: /^Off$/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Steaming/ }).click();
  await expect(
    page.getByRole("img", { name: /Steaming: Steam boiler headspace/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Off in this state", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Boiler refill/ }).click();
  await expect(
    page.getByRole("img", {
      name: /Boiler refill: Reservoir → pump → fill valve/,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: /Idle/ }).click();
  await expect(
    page.getByRole("img", { name: "Idle: No dispensing flow" }),
  ).toBeVisible();
});

test("heat architectures expose only meaningful setpoint controls", async ({
  page,
}) => {
  await page.goto("/#heat");
  const setpoint = page.getByRole("slider", { name: /Brew setpoint/ });
  await expect(setpoint).toBeEnabled();
  await setpoint.fill("96");
  await expect(page.getByText("96°C", { exact: true }).first()).toBeVisible();
  await page
    .getByRole("button", { name: "Heat exchanger", exact: true })
    .click();
  await expect(setpoint).toBeDisabled();
  await page
    .getByRole("button", { name: "Single boiler", exact: true })
    .click();
  await page.getByRole("button", { name: "Steam mode", exact: true }).click();
  await expect(setpoint).toBeDisabled();
  await page.getByRole("button", { name: "Brew mode", exact: true }).click();
  await expect(setpoint).toBeEnabled();
  await expect(
    page.getByText("Switch temperature to change jobs"),
  ).toBeVisible();
});

test("pressure and resistance produce independently derived relative flow", async ({
  page,
}) => {
  await page.goto("/#pressure");
  const pressure = page.getByRole("slider", { name: /Pressure difference/ });
  const resistance = page.getByRole("slider", { name: /Puck resistance/ });
  await expect(page.getByTestId("relative-flow")).toHaveText("1.00×");
  await pressure.fill("6");
  await resistance.fill("4");
  await expect(page.getByTestId("relative-flow")).toHaveText("0.50×");
  await resistance.fill("8");
  await expect(page.getByTestId("relative-flow")).toHaveText("0.25×");
  await pressure.fill("0");
  await expect(page.getByTestId("relative-flow")).toHaveText("0.00×");
  await expect(
    page.getByText("No pressure-driven flow", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Reset experiment" }).click();
  await expect(pressure).toHaveValue("9");
  await expect(resistance).toHaveValue("3");
  await expect(page.getByTestId("relative-flow")).toHaveText("1.00×");
});

test("group assembly and milk workflow explain selected states", async ({
  page,
}) => {
  await page.goto("/#group");
  await page
    .getByRole("button", { name: "Inspect Shower screen", exact: true })
    .focus();
  await page.keyboard.press("Space");
  await expect(
    page.getByRole("heading", { name: "Shower screen", exact: true }),
  ).toBeVisible();
  await page.getByRole("slider", { name: "Separate the layers" }).fill("0");
  await expect(
    page.getByRole("slider", { name: "Separate the layers" }),
  ).toHaveValue("0");
  await page.goto("/#steam");
  await page.getByRole("button", { name: /Introduce air/ }).click();
  await expect(
    page.getByRole("img", { name: /Introduce air: TIP NEAR THE SURFACE/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next stage" }).click();
  await expect(
    page.getByRole("img", { name: /Integrate: TIP SLIGHTLY DEEPER/ }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Next stage" }).click();
  await expect(
    page.getByRole("heading", { name: "Close the valve before lifting." }),
  ).toBeVisible();
});

test("model variants, comparisons, and prebrew distinctions remain separate", async ({
  page,
}) => {
  await page.goto("/#marzocco");
  await expect(
    page.getByRole("img", { name: /^Integrated group:/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Two valves · water retained during pause", { exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "GS3 MP Saturated group" }).click();
  await expect(
    page.getByRole("img", { name: /^Saturated group:/ }),
  ).toBeVisible();
  await expect(
    page.getByText("Mechanical conical-valve paddle", { exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText("Manual low-pressure control, including from tank", {
      exact: true,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "GS3 AV Saturated group" }).click();
  await expect(
    page.getByText("Automatic, measured by flowmeter", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: /Compare all four configurations/ })
    .click();
  await expect(page.getByRole("table")).toBeVisible();
  await expect(
    page.getByRole("columnheader", { name: "Linea Micra" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Pulse + discharge", exact: true })
    .click();
  await expect(
    page.getByText("PAUSE + DISCHARGE", { exact: true }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Low-pressure fill", exact: true })
    .click();
  await expect(
    page.getByText("CONTINUOUS WETTING", { exact: true }),
  ).toBeVisible();
});

test("wrong answers do not complete lessons; correct answers survive reload and tabs", async ({
  page,
  context,
}) => {
  await page.goto("/");
  await page
    .getByRole("button", { name: "A The brew boiler", exact: true })
    .click();
  await expect(
    page.getByRole("status").filter({ hasText: "Try another answer." }),
  ).toBeVisible();
  await expect(page.getByText("0 of 8 lessons complete")).toBeVisible();
  await page.getByRole("button", { name: "B The pump", exact: true }).click();
  await expect(page.getByText("1 of 8 lessons complete")).toBeVisible();
  const other = await context.newPage();
  await other.goto("/#water");
  await other
    .getByRole("button", { name: /C Through the three-way valve to the drain/ })
    .click();
  await expect(page.getByText("2 of 8 lessons complete")).toBeVisible();
  await page.reload();
  await expect(page.getByText("2 of 8 lessons complete")).toBeVisible();
  await page.getByRole("button", { name: "B The pump", exact: true }).click();
  await expect(page.getByText("2 of 8 lessons complete")).toBeVisible();
});

test("all eight lessons can be completed through their visible questions", async ({
  page,
}) => {
  const answers = [
    ["anatomy", "B The pump"],
    ["water", "C Through the three-way valve to the drain"],
    ["heat", "B Each job has a separately heated boiler"],
    ["pressure", "A Reduces flow through the puck"],
    ["group", "C The group gasket"],
    ["steam", "A Steam condensing in the milk"],
    [
      "marzocco",
      "B The GS3 MP paddle mechanically varies flow; the Mini paddle is a brew switch",
    ],
    ["care", "C Stop use, isolate safely, and contact a qualified technician"],
  ];
  for (const [id, answer] of answers) {
    await page.goto(`/#${id}`);
    await page.getByRole("button", { name: answer, exact: true }).click();
    await expect(
      page.getByText("Lesson completed", { exact: true }),
    ).toBeVisible();
  }
  await expect(page.getByText("8 of 8 lessons complete")).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "You’ve seen beneath the surface." }),
  ).toBeVisible();
});

test("storage denial and malformed saved data do not break the course", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Unavailable", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await expect(
    page.getByText("Browser storage is unavailable.", { exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "B The pump", exact: true }).click();
  await expect(page.getByText("1 of 8 lessons complete")).toBeVisible();
});

test("invalid saved completion values are ignored", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("espresso-atelier:v1:complete:anatomy", "{broken");
    localStorage.setItem("espresso-atelier:v1:complete:unknown-lesson", "1");
  });
  await page.goto("/#not-a-lesson");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Beneath the surface.",
  );
  await expect(page.getByText("0 of 8 lessons complete")).toBeVisible();
});

test("reference library searches, handles no results, and closes with Escape", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Search the glossary" }).click();
  const dialog = page.getByRole("dialog", { name: "Reference library" });
  await dialog.getByRole("textbox").fill("saturated");
  await expect(
    dialog.getByRole("heading", { name: "Saturated group", exact: true }),
  ).toBeVisible();
  await dialog.getByRole("textbox").fill("zzzzzz");
  await expect(dialog.getByText(/No matching terms/)).toBeVisible();
  await dialog
    .getByRole("button", { name: "Sources & reading", exact: true })
    .click();
  await expect(
    dialog.getByRole("link", { name: /Water specifications/ }),
  ).toHaveAttribute("href", /Water-Specifications.pdf$/);
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(
    page.getByRole("button", { name: "Search the glossary" }),
  ).toBeFocused();
});

test("mobile menu, all lessons, and expanded comparisons fit the viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open course menu" }).click();
  await page
    .getByRole("dialog", { name: "Course navigation" })
    .getByRole("link", { name: /The La Marzocco way/ })
    .click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "From Florence, with precision.",
  );
  await expect(
    page.getByRole("dialog", { name: "Course navigation" }),
  ).not.toBeVisible();
  await page
    .getByRole("button", { name: /Compare all four configurations/ })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  for (const id of [
    "anatomy",
    "water",
    "heat",
    "pressure",
    "group",
    "steam",
    "care",
  ]) {
    await page.goto(`/#${id}`);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      id,
    ).toBe(true);
  }
  await page
    .getByRole("button", { name: /Electrical or internal fault/ })
    .click();
  await expect(
    page.getByRole("heading", { name: "This is a stop-use condition." }),
  ).toBeVisible();
});

test("core lessons and reference modal pass automated accessibility checks", async ({
  page,
}) => {
  for (const id of [
    "anatomy",
    "water",
    "heat",
    "pressure",
    "group",
    "steam",
    "marzocco",
    "care",
  ]) {
    await page.goto(`/#${id}`);
    await page.evaluate(() => document.fonts.ready);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    expect(
      result.violations.map((item) => ({
        id: item.id,
        nodes: item.nodes.map((node) => node.target),
      })),
      id,
    ).toEqual([]);
  }
  await page.getByRole("button", { name: "Search the glossary" }).click();
  const result = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa"])
    .analyze();
  expect(result.violations.map((item) => item.id)).toEqual([]);
});

test("reduced motion stops the animated water trace", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#water");
  expect(
    await page
      .locator(".flow-trace")
      .first()
      .evaluate((element) => getComputedStyle(element).animationName),
  ).toBe("none");
  await expect(
    page.getByText("Reservoir → pump → brew boiler → valve → group → cup", {
      exact: true,
    }),
  ).toBeVisible();
});
