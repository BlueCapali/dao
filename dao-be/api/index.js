const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { getDBResults, getLastDBResult } = require("../db/index");

const schema = buildSchema(`
  type Query {
    daos: [Page]
    lastDao: [Page]
  }

  type Page {
    updateTime: Float
    pages: [Config]
  }

  type Config {
    name: String
    results: [Result]
  }

  type Result {
    title: String
    value: String
  }
`);

const root = {
  daos: async () => {
    const dbResults = await getDBResults();
    return dbResults;
  },
  lastDao: async () => {
    const dbResult = await getLastDBResult();
    return dbResult;
  },
};

const app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);
app.listen(4000);
console.log("Running a GraphQL API server at http://localhost:4000/graphql");
