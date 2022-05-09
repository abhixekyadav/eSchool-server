const express = require("express");
const cors = require("cors");
const readdirSync = require("fs").readdirSync;
const mongoose = require("mongoose");
const csrf = require("csurf");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
require("dotenv").config();
const path = require("path");
// const text = require("./text.txt");
const text = "text.txt";

const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// db
mongoose
  .connect(process.env.DATABASE, {
    // userNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: true,
  })
  .then(() => console.log("**DB CONNECTED**"))
  .catch((err) => console.log("DB CONNECTION ERR => ", err));

// apply middlewares
app.use(
  cors({
    // origin: "http://localhost:3000",
    // origin: "*",
    origin: "https://e-school.vercel.app",
    credentials: true,
  })
);
app.use(express.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(morgan("dev"));

// route
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
// csrf
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

const options = {
  root: path.join(__dirname),
};
app.get("/.well-known/pki-validation/:file", (req, res) => {
  console.log(text);
  res.sendFile(text, options);
});

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
