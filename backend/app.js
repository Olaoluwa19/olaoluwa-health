import express from "express";
import cors from "cors";
import credentials from "./middleware/credentials.js";
import corsOptions from "./config/corsOption";
import path from "path";
import { fileURLToPath } from "url";

// Define __dirname and __filename for ESM compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app config
const app = express();

// Handle options credential check before cors
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle url encoded data i.e form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

// middleware for cookies
app.use(cookieParser());

// serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

// health check route
app.get("/health", (req, res) => res.json({ status: "OK" }));

// api endpoints
app.get("/", (req, res) => {
  res.send("API running...");
});

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found." });
  } else {
    res.type("txt").send("404 Not Found.");
  }
});

export default app;
