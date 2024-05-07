const express = require("express");
const app = express();

// app.use("/", (req, res) => {
//   res.send("Server is Running Right?");
// });

// app.listen(5000, console.log("Server is Running on Port 5000"));

app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(3001, () => console.log("Server ready on port 3001."));

module.exports = app;
