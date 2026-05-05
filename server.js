const puppeeteer = require('puppeteer-extra');
const express = require('express');
const app = express();
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  try {
    const browser = await puppeteer.launch({
      headless: true,
      executablePath: await chromium.executablePath(),
    });
    const page = await browser.newPage();
    await page.goto(url);
    await browser.close();
    const title = await page.title();
    res.status(200).json({ message: 'Scraping completed', title });
  }
  catch (error) { 
    console.error('Error during scraping:', error);
    res.status(500).json({ message: 'Error during scraping', error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});