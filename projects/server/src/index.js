const dotenv = require('dotenv');
dotenv.config();
// require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");
const bearerTokens = require('express-bearer-token')

console.log(process.env.PORT)
const PORT = process.env.PORT || 8000;
const app = express();
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//       process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(cors());
app.use(bearerTokens());
app.use(express.json());
app.use(express.static('./src/Public'));

// DB Check Connection
const { dbConf } = require('./Config/database');

dbConf.getConnection((err, connection) => {
  if (err) {
    console.log("ERROR MySQL Connection", err.message, err.sqlMessage);
  }

  console.log(`Connected to MySQL Server: , ${connection.threadId}`);
})

//#region API ROUTES

// ===========================
// NOTE : Add your routes here
// const { userRouters, addresRouters } = require('./Routers');
// const { response } = require("express");
// app.use('/api/users', userRouters);
// app.use('/api/address', addresRouters);
const configRouter = require("./Routers")
app.use('/api', configRouter);

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
// const clientPath = "../../client/build";
// app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
// app.get("*", (req, res) => {
//   res.sendFile(join(__dirname, clientPath, "index.html"));
// });

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
