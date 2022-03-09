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
        const priceContainer = await driver.findElement(
          By.className("calculator-card-apy")
        );
        const priceValue = await priceContainer.findElement(
          By.className("calculator-card-metrics-value")
        );
        const priceText = await priceValue.getText();

        const apyContainer = await driver.findElement(
          By.className("calculator-card-tvl")
        );
        const apyValue = await apyContainer.findElement(
          By.className("calculator-card-metrics-value")
        );
        const apyText = await apyValue.getText();
        RESULT.push({ title: "Meta Price", value: priceText });
        RESULT.push({ title: "Meta APY", value: apyText });
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
