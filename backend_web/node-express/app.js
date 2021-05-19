const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const app = express();

// call API

const companies = require("./API/companies");

// middlewares

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// create API route

app.use("/api/companies", companies);

module.exports = app;
