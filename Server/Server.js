require("dotenv").config({});
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {env} = require('../Environments/env');
const Routes = require('../Routes/Routes')


const initilization = () => {
  setupCors();
  setupBodyParser();
  setupDatabase();
  setupRoutes();
  setupError404Handler();
  setupErrorHandler();
};

initilization();

function setupCors(){
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );
};

function setupBodyParser(){
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
};

function setupDatabase(){
  mongoose
    .connect(env().db_root)
    .then((r) => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("Error connecting to MongoDB", e);
    });
};

function setupRoutes(){
  app.use("/api/v1",Routes);
};

function setupError404Handler(){
  app.use((req, res) => {
    res.status(404);
    res.json({
        status:404,
        message: 'Not Found.',
        data:{}
    });
  });
};

function setupErrorHandler(){
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        status:error.status || 500,
        message: error.message || 'Something went wrong. Please try again later.',
        data:{}
    });
  });
};

module.exports = app;
