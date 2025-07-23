require("dotenv").config(); // Load environment variables early

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const passport = require("passport");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");

// Models
const User = require("./models/user");

// Routes
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const reviewsRouter = require("./routes/reviews");

const app = express();

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));

mongoose.connection.on("connected", () => console.log("MongoDB connected"));
mongoose.connection.on("error", (err) => console.error("MongoDB error:", err));

// View engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// set public assets directory
app.use(express.static(path.join(__dirname, "public")));

// Middlewares
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride("_method")); // Support PUT & DELETE from forms

// Session management
const isProduction = process.env.NODE_ENV === "production";

app.use(
  session({
    secret: process.env.SESSION_PWD || "defaultSecret", // fallback in case env missing
    resave: false,
    saveUninitialized: false, // better for login systems
    cookie: {
      secure: isProduction,
      httpOnly: true,
      sameSite: "lax",
    },
  })
);

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
app.use("/", indexRouter);
app.use("/posts", postsRouter);
app.use("/posts/:postId/reviews", reviewsRouter); // nested
// Avoid duplicate mount if all reviews are nested under posts
// app.use("/reviews", reviewsRouter); // Enable only if you need standalone reviews

// Catch 404 and forward to error handler
app.use((req, res, next) => next(createError(404)));

// Error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
