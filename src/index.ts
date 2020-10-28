import "reflect-metadata";
import express from "express";

const main = async () => {
    const app = express();

    app.get("/", (_, res) => res.send("hello"));

    app.listen(4000, () => {
        console.log("express server started 🚀")
    })
};

main();