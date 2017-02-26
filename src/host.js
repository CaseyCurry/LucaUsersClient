/*eslint-env node*/
"use strict";

const clientInitializer = require("luca-client-initializer");
const path = require("path");
const express = require("express");

const staticFileLocation = path.join(__dirname, "app");
clientInitializer.initialize("users-client", staticFileLocation);
