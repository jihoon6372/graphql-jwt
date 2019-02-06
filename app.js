const express = require("express");
const bodyParser = require("body-parser");
const { graphqlExpress } = require("apollo-server-express");
const schema = require("./schema");
const jwt = require("express-jwt");

const app = express();

// bodyparser
app.use(bodyParser.json());

// authentication middleware
const authMiddleware = jwt({
  secret: "somesuperdupersecret"
});

app.use(authMiddleware);

app.use(
  "/api",
  graphqlExpress(req => ({
    schema,
    context: {
      user: req.user
    }
  }))
);

app.listen(3000, () => {
  console.log("Server is up on 3000");
});
