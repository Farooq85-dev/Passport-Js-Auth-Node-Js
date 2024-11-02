import express from "express";
import { ConnectDb } from "./Db/Index.js";
import cors from "cors";
import { User } from "./Schema/user.schema.js";

const app = express();

// List of allowed origins
const AllowedOrigins = ["http://127.0.0.1:5500/"];

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

ConnectDb();

app.get("/", (_, res) => {
  return res.send({ msg: "Hello From Server!" });
});

app.post("/signup", async (req, res) => {
  try {
    const { body: userDetails } = req;
    const { email } = userDetails;

    const isExist = User.findOne(email);

    if (isExist) {
      return res.status(404).send({ msg: "User already exist!" });
    }

    const user = await User.create(userDetails);
    await user.save();

    return res
      .status(201)
      .send({ msg: "🔥 User created successfully! 🔥", user });
  } catch (error) {
    return res.status(400).send({ msg: "🔥 Internal Server error! 🔥" });
  }
});
app.post("/signin", async (req, res) => {
  try {
    const { body: userDetails } = req;
    const { email } = userDetails;

    return res
      .status(201)
      .send({ msg: "🔥 User created successfully! 🔥", user });
  } catch (error) {
    return res.status(400).send({ msg: "🔥 Internal Server error! 🔥" });
  }
});

app.listen(3000, () => {
  console.log("🔥🔥🔥 Server is Runing at 3000 🔥🔥🔥");
});
