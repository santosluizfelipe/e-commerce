const express = require("express");
const app = express();
const db = require("./models");


app.use(express.json());

app.use("/api/sellerUsers", require("./routes/sellerUserRoutes"));

app.use("/api/buyerUsers", require("./routes/buyerUserRoutes"));

db.sequelize.sync().then(() => {
  app.listen("3001", () => {
    console.log("Server running at port 3001");
  });
});
