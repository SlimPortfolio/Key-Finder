const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Server is Running Right?");
});

app.listen(5000, console.log("Server is Running on Port 5000"));
