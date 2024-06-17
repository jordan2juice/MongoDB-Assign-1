"use strict";

require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3002;
const cors = require("cors");

const DB = process.env.DATABASE;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = DB;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(cors());

app.use(express.json());
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

function notFound(req, res, next) {
  res.status(404).send.json();
  next(error);
}

function errorHandler(err, req, res, next) {
  res.status(500).send.json();
  console.log(err);
  next(err);
}
