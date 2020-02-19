const express = require("express");
const keys = require("./config/keys");
const stripe = require("stripe")(keys.stripeSecretKey);
const exphbs = require("express-handlebars");

const app = express();

// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.json({ extended: false }));

// Set static folder
app.use(express.static(`${__dirname}/public`));

app.get("/", (req, res) => {
  res.render("index", { stripePublishableKey: keys.stripePublishableKey });
});

app.post("/charge", (req, res) => {
  const amount = 1999;

  stripe.customers
    .create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Internet Etiquitte Ebook",
        currency: "usd",
        customer: customer.id
      })
    )
    .then(charge => res.render("success"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port: ${port}`));
