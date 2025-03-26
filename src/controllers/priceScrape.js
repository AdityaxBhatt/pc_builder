const puppeteer = require("puppeteer");

async function scrapeAmazonPrice(url) {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(url, { waitUntil: "domcontentloaded" });

    // Extract the price using the correct selector
    const price = await page.evaluate(() => {
        let priceElement = document.querySelector(".a-price.aok-align-center .a-offscreen");
        return priceElement ? priceElement.innerText : "Price not found";
    });

    await browser.close();
    return price;
}

// Example: Get price of a product
scrapeAmazonPrice("https://www.amazon.in/INNO3D-GEFORCE-256-bit-pci_e_x16-Graphics/dp/B0BLVG22ZV") // Replace with your product URL
    .then(price => console.log("Price:", price))
    .catch(error => console.log("Error:", error));