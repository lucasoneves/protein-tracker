import * as dotenv from "dotenv";
dotenv.config();
import config from "./config";

import app from "./server";

const port = config.port
 
app.listen(port, () => {
  console.log(`Protein tracker api running on port ${port}!`);
});
