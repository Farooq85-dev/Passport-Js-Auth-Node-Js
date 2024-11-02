import express from "express";
import { ConnectDb } from "./Db/Index.js";
import cors from "cors";
import { User } from "./Schema/user.schema.js";
import passport from "passport";
import initializePassport from "./PassportJS/index.js";
import expressSession from "express-session";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();

// List of allowed origins
const AllowedOrigins = ["http://127.0.0.1:5500", "http://localhost:5500"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || AllowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(
          new Error("🔥🔥🔥 CORS policy: This origin is not allowed 🔥🔥🔥")
        );
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(
  expressSession({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(cookieParser());

app.use(passport.session());

ConnectDb();

initializePassport(passport);

app.post("/signup", async (req, res) => {
  try {
    const { body: userDetails } = req;
    const { email, password } = userDetails;

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(409).send({ msg: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ ...userDetails, password: hashedPassword });
    await user.save();

    return res
      .status(201)
      .send({ msg: "🔥 User created successfully! 🔥", user });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ msg: "🔥 Internal Server error! 🔥" });
  }
});

app.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Error during authentication:", err);
      return res.status(500).send({ msg: "Internal server error" });
    }
    if (!user) {
      const message =
        info && info.message ? info.message : "Invalid credentials";
      console.log("Authentication failed:", message);
      return res.status(401).send({ msg: message });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res
          .status(500)
          .send({ msg: "Internal server error during login" });
      }
      console.log("Login successful for user:", user);
      return res.status(200).send({ msg: "Login successful", user });
    });
  })(req, res, next);
});

app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send({ msg: "Logout failed" });
    }
    res.status(200).send({ msg: "Logout successful" });
  });
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 Server is Runing at 3000 🔥🔥🔥");
});
