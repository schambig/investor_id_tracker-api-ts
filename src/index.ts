import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";

import { inversionistaRouter } from "./inversionista/inversionista.router";

// load environment variables from .env file and adds them to the process.env object
dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

// get the port from ../.env file
const PORT: number = parseInt(<string>(process.env.PORT), 10);

// create the app
const app = express();

/*
  A middleware is a function that has access to the request and response objects in the application's request-response cycle.
  Middleware functions can perform various operations on the request and response, such as modifying the request or response headers,
  transforming the data in the request or response, or performing logging or other auxiliary functions.

  Middleware functions can be added to the Express application's request-response cycle using the app.use() method,
  which takes the middleware function as its argument. Middleware functions are executed in the order they are added,
  and each middleware function can optionally pass control to the next middleware function in the chain by calling the next() function.
*/

// add cors middleware to express
app.use(cors());
// add express.json middleware to express that parses the incoming JSON payload
app.use(express.json());

app.use("/api/inversionistas", inversionistaRouter);

// start a server that listen on port 3000, and call the provided callback function when the server starts listening
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} ...`);
});

