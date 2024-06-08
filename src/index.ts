import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";

import https from 'https'
import fs from 'fs';

import app from "./server";

const port = config.port

if (process.env.NODE_ENV !== "development") {
  https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.crt'),
  }, app).listen(port, () => {
    console.log(`Protein tracker api running on port ${port}!`);
  });
} else {
  app.listen(port, () => {
    console.log(`Protein tracker api running on port ${port}!`);
  })
}