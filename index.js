const express = require("express");
const path = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");

const app = express();

app.use(logger("dev"));
// Body Parse Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "ejs");
const secret =
  "qsdjS12ozehdoIJ123DJOZJLDSCqsdeffdg123ER56SDFZedhWXojqshduzaohduihqsDAqsdq";
app.use(
  expressJwt({ secret: secret, algorithms: ["HS256"] }).unless({
    path: ["/login"],
  })
);

app.get("/login", (req, res) => {
  res.render("login", { title: "Connexion" });
});
const fakeUser = { email: "fakeuser@gmail.com", password: "toto" };

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
