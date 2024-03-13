import * as dotenv from "dotenv";
dotenv.config();

import swagger from "swagger-ui-express";
import swaggerJson from "./docs/swagger.json";
import { createApp } from "./util/api.helper";

const app = createApp();

app.use("/docs", swagger.serve);
app.use("/docs", swagger.setup(swaggerJson));

app.listen(process.env.PORT, () => {
    console.log("API está rodando");
});
