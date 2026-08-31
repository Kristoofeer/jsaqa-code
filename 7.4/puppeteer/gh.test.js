let page;

describe("Github page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  }, 60000);

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    await page.waitForSelector('h1', {
      timeout: 10000
    });
    const h1Text = await page.$eval('h1', el => el.textContent);
    expect(h1Text).toContain("Build like the best teams on the planet");
  }, 60000);

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 60000);

  test("The page contains Sign in button", async () => {
    // Ищем span с текстом "Sign up for free"
    const spans = await page.$$("span");
    let found = false;
    for (let span of spans) {
      const text = await page.evaluate(el => el.textContent, span);
      if (text.includes("Sign up for free")) {
        found = true;
        break;
      }
    }
    expect(found).toBe(true);
  }, 60000);
});

describe("Github pages titles", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/features");
  }, 60000);

  afterEach(() => {
    page.close();
  });

  test("Features page title", async () => {
    const title = await page.title();
    expect(title).toContain("Features");
  }, 60000);

  test("Pricing page title", async () => {
    await page.goto("https://github.com/pricing");
    const title = await page.title();
    expect(title).toContain("Pricing");
  }, 60000);

  test("Enterprise page title", async () => {
    await page.goto("https://github.com/enterprise");
    const title = await page.title();
    expect(title).toContain("Enterprise");
  }, 60000);
});