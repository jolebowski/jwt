const express = require("express");
const path = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");

const app = express();

app.use(logger("dev"));

const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");

// Body Parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/login", (req, res) => {
  res.render("login", { title: "Connexion" });
});
const fakeUser = { email: "fakeuser@gmail.com", password: "toto" };
const secret =
  "qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq";
app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(500);
  } else {
    if (
      fakeUser.email === req.body.email &&
      fakeUser.password === req.body.password
    ) {
      const myToken = jwt.sign(
        { iss: "test.fr", user: "jordan", role: "moderator" },
        secret
      );
      return res.send(myToken);
    } else {
      return res.status(401).json({ msg: "Please include  a email" });
    }
  }
});

app.listen(PORT, () => console.log(`server is listenning in port ${PORT}`));

// Set static folder
//app.use(express.static(path.join(__dirname, "public")));
