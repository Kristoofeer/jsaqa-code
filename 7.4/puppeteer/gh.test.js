let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 30000);

  afterEach(() => {
    page.close();
  });

  test("The h1 header content", async () => {
    await page.waitForSelector('h1', {
      timeout: 10000
    });
    const h1Text = await page.$eval('h1', el => el.textContent);
    expect(h1Text).toContain("Build like the best teams on the planet");
  }, 30000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 30000);

  test("The page contains Sign in button", async () => {
    const btnSelector = "span";
    const spans = await page.$$(btnSelector);
    let hasSignUpButton = false;

    for (let span of spans) {
      const text = await page.evaluate(el => el.textContent, span);
      if (text.includes("Sign up for free")) {
        hasSignUpButton = true;
        break;
      }
    }

    expect(hasSignUpButton).toBe(true);
  }, 30000);
});

describe("Github pages titles", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/features");
  }, 30000);

  afterEach(() => {
    page.close();
  });

  test("Features page title", async () => {
    const title = await page.title();
    expect(title).toContain("Features");
  }, 30000);

  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 30000);

  test("Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 30000);
});