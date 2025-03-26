const puppeteer = require("puppeteer");

const cpuListURL = "https://pcpartpicker.com/products/cpu/";

async function scrapeCPUs() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(cpuListURL, { waitUntil: "domcontentloaded" });

  // Step 1: Get all CPU links from the main page
  const cpuLinks = await page.evaluate(() => {
    return Array.from(document.querySelectorAll(".td__name a"))
      .map(el => ({
        name: el.innerText.trim(),
        link: "https://pcpartpicker.com" + el.getAttribute("href")
      }));
  });

  console.log(`Found ${cpuLinks.length} CPUs. Fetching details...`);

  let cpuDetails = [];
  for (let { name, link } of cpuLinks) {
    const cpuPage = await browser.newPage();
    await cpuPage.goto(link, { waitUntil: "domcontentloaded" });

    // Step 2: Extract CPU details from its page
    const details = await cpuPage.evaluate(() => {
      const getText = (selector) =>
        document.querySelector(selector)?.innerText.trim() || "N/A";

      return {
        price: getText(".td__price"),
        socket: getText(".specs__value[data-spec='socket']"),
        cores: getText(".specs__value[data-spec='core-count']"),
        threads: getText(".specs__value[data-spec='thread-count']"),
        baseClock: getText(".specs__value[data-spec='base-clock']"),
        boostClock: getText(".specs__value[data-spec='boost-clock']"),
        wattage: getText(".specs__value[data-spec='tdp']"),
        l2Cache: getText(".specs__value[data-spec='l2-cache']"),
        l3Cache: getText(".specs__value[data-spec='l3-cache']"),
        memoryType: getText(".specs__value[data-spec='memory-type']"),
        isFanIncluded: getText(".specs__value[data-spec='includes-cpu-cooler']").toLowerCase() === "yes"
      };
    });

    cpuDetails.push({ name, link, ...details });
    console.log(`Scraped: ${name}`);

    await cpuPage.close();
  }

  await browser.close();
  return cpuDetails;
}

scrapeCPUs().then(data => console.log(JSON.stringify(data, null, 2)));