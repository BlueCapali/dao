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
      .wait(
        until.elementIsNotVisible(
          driver.findElement(By.className("MuiSkeleton-root"))
        ),
        timeout
      )
      .catch(async () => {
        const cardContainer = await driver.findElements(
          By.className("ohm-card")
        );

        for (let i = 0; i < cardContainer.length; i++) {
          const cardTitle = await cardContainer[i].findElement(
            By.tagName("h6")
          );

          const cardValue = await cardContainer[i].findElement(
            By.tagName("h5")
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
