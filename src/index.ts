import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import resolvers from "./resolvers";

const main = async () => {
  const app = express();

  await createConnection();

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers }),
    context: ({ req, res }) => ({ req, res }),
  })

  apolloServer.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("server started 🚀 http://localhost:4000/graphql")
  })
};

main();