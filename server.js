const express = require("express");
const app = express();
const connectDataBase = require("./Database/Connection.DB");
const UserRoute = require("./Routes/User.Route");
const EngineRoute = require("./Routes/Engine.Route");
const body_parser = require("body-parser");
const cors = require("cors")
const { PORT } = require("./Config/confg")

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));
app.use(cors({
  origin: "*",
  credentials: true
}))
app.use("/api/v1/user", UserRoute);
app.use("/api/v2/engine", EngineRoute);

connectDataBase();

app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
