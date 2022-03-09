const { getCrawlerResults } = require("./crawlers/index");
const { insertToDB } = require("./db/index");

const ONEHOUR = 3600000;
// const HALFAMINUTE = 30000;

async function start() {
  try {
    const results = await getCrawlerResults();

    const dbRecord = {
      updateTime: Date.now(),
      pages: results,
    };

    await insertToDB(dbRecord);
    await repeat();
  } catch (err) {
    throw err;
  }
}

async function repeat() {
  console.clear();
  setTimeout(start, ONEHOUR);
}

start();
