const express = require("express");
const path = require("path");
const logger = require("morgan");

const app = express();

app.use(logger("dev"));

// Body Parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server is listenning in port ${PORT}`));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));
