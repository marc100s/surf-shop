const express = require("express");
const router = express.Router();
const passport = require("passport");

const {
  postRegister,
  getRegister,
  postLogin,
  getLogout,
} = require("../controllers/index");
const { asyncErrorHandler } = require("../middleware/index");

/* ========== Home Route ========== */
router.get("/", (req, res) => {
  res.render("index", { title: "Surf Shop - Home" });
});

/* ========== Auth Routes ========== */

/* GET /register — Show the registration page */
router.get("/register", asyncErrorHandler(getRegister)); // show form
router.post("/register", asyncErrorHandler(postRegister)); // handle form submission

/* GET /login — Show the login page */
router.get("/login", (req, res) => {
  res.render("login", {
    title: "Welcome back to Surf Shop - Login to access your account",
  });
});

/* POST /login — Authenticate and redirect to profile */
router.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  postLogin // controller simply redirects
);

/* POST /logout */
router.get("/logout", getLogout);

/* GET /profile */
router.get("/profile", (req, res) => {
  res.render("profile", { title: "Your Surf Shop Profile" });
});

/* PUT /profile/:user_id */
router.put("/profile/:user_id", (req, res) => {
  res.send(`Updated profile for user ${req.params.user_id}`);
});

/* ========== Password Reset ========== */

/* GET /forgot */
router.get("/forgot", (req, res) => {
  res.render("forgot", { title: "Forgot your Surf Shop password?" });
});

/* PUT /forgot */
router.put("/forgot", (req, res) => {
  res.send("Check your email for password reset instructions");
});

/* GET /reset/:token */
router.get("/reset/:token", (req, res) => {
  res.render("reset", {
    title: "Reset your password",
    token: req.params.token,
  });
});

/* PUT /reset/:token */
router.put("/reset/:token", (req, res) => {
  res.send(`Password reset for token: ${req.params.token}`);
});

/* ========== Post Pages ========== */

/* ========== Static Info Pages ========== */

router.get("/about", (req, res) => {
  res.render("about", { title: "Surf Shop - About Us" });
});

router.get("/contact", (req, res) => {
  res.render("contact", { title: "Surf Shop - Contact Us" });
});

router.get("/terms", (req, res) => {
  res.render("terms", { title: "Surf Shop - Terms of Service" });
});

router.get("/privacy", (req, res) => {
  res.render("privacy", { title: "Surf Shop - Privacy Policy" });
});

router.get("/faq", (req, res) => {
  res.render("faq", { title: "Surf Shop - FAQ" });
});

router.get("/sitemap", (req, res) => {
  res.render("sitemap", { title: "Surf Shop - Sitemap" });
});

/* GET /404 */
router.get("/404", (req, res) => {
  res.status(404).render("404", { title: "Surf Shop - Page Not Found" });
});

module.exports = router;
