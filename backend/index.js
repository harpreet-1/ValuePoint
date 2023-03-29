const express = require("express");
const cors = require("cors");
const { connection } = require("./server");

require("dotenv").config();

const { productRouter } = require("./Controller/routes/product.routes");
const { cartRouter } = require("./Controller/routes/cart.routes");
const { usersRouter } = require("./Controller/routes/user.routes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productRouter);
app.use("/todos", cartRouter);
app.use("/users", usersRouter);

app.listen(7700, () => {
  connection();
});
