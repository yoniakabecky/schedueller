import "reflect-metadata";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { createConnection } from "typeorm";

const main = async () => {
  const app = express();

  app.get("/", (_, res) => res.send("hello"));

  await createConnection();

  const apolloServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String!
      }
    `,
    resolvers: {
      Query: {
        hello: () => "hello world",
      }
    }
  })

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("express server started 🚀")
  })
};

main();