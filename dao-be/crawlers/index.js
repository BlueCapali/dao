const { run: jade } = require("./jade");
const { run: metaverse } = require("./metaverse");
const { run: wonderland } = require("./wonderland");

async function runCrawlers() {
  const wonderlandResults = await wonderland({
    url: "https://app.wonderland.money/#/dashboard",
    timeout: 5000,
  });

  const metaverseResults = await metaverse({
    url: "https://app.metaverse.pro/#/calc",
    timeout: 10000,
  });

  const jadeResults = await jade({
    url: "https://jadeprotocol.io/#",
    timeout: 10000,
  });

  return [
    { name: "jade", results: jadeResults },
    { name: "metaverse", results: metaverseResults },
    { name: "wonderland", results: wonderlandResults },
  ];
}

async function getCrawlerResults() {
  const results = await runCrawlers();
  return results;
}

module.exports = { getCrawlerResults };
