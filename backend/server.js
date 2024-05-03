const express = require("express");
const app = express();
const db = require("./models")

const productRoutes = require("./routes/productRoutes");
const buyerUserRoutes = require("./routes/buyerUserRoutes");
const sellerUserRoutes = require("./routes/sellerUserRoutes");
const basketRoutes = require("./routes/basketRoutes");
const oAuthRoutes = require("./routes/oAuthRoutes");

app.use(express.json());


app.use("/api/buyerUsers", buyerUserRoutes);
app.use("/api/sellerUsers", sellerUserRoutes);
app.use("/api/products", productRoutes);
app.use("/api/basket", basketRoutes);

//OAuth routes
app.use("/api/oauth", oAuthRoutes);




db.sequelize.sync().then(() => {
  app.listen("3001", () => {
    console.log("Server running at port 3001");
  });
});
