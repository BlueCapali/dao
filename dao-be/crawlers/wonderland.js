const { Builder, By, Key, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");

async function crawler({ timeout, url }) {
  const RESULT = [];
  let driver = await new Builder()
    .forBrowser("chrome")
    .setChromeOptions(new chrome.Options().headless())
    .build();
  try {
    await driver.get(url);
    await driver
      .wait(() => {}, timeout)
      .catch(async () => {
        const dashCard = await driver.findElements(
          By.className("dashboard-card")
        );
        for (let i = 0; i < dashCard.length; i++) {
          const cardTitle = await dashCard[i].findElement(
            By.className("card-title")
          );
          const cardValue = await dashCard[i].findElement(
            By.className("card-value")
          );
          const cardTitleText = await cardTitle.getText();
          const cardValueText = await cardValue.getText();
          RESULT.push({ title: cardTitleText, value: cardValueText });
        }
      });
    return RESULT;
  } finally {
    await driver.quit();
  }
}

async function run({ url, timeout }) {
  const results = await crawler({ url, timeout });
  return results;
}

module.exports = { run };
