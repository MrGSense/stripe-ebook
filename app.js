const express = require("express");
const stripe = require("stripe")("sk_test_ECIx2xMd9Ojzt4l5lfFO8YZA00npBeuKoL");
const exphbs = require("express-handlebars");

const app = express();

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json({ extended: false }));

// Set static folder
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("index");
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
