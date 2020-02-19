const express = require("express");
const stripe = require("stripe")("sk_test_ECIx2xMd9Ojzt4l5lfFO8YZA00npBeuKoL");
const exphbs = require("express-handlebars");

const app = express();

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
