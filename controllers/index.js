const User = require("../models/user");

module.exports = {
  // GET /register — render registration form
  getRegister(req, res) {
    res.render("register", {
      title: "Register to Surf Shop",
    });
  },

  // POST /register — create user and log them in
  async postRegister(req, res, next) {
    try {
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        image: req.body.image,
        posts: [],
      });

      const registeredUser = await User.register(newUser, req.body.password);

      req.login(registeredUser, (err) => {
        if (err) return next(err);
        res.redirect(`/~${registeredUser.username}`);
      });
    } catch (err) {
      res.render("register", {
        title: "Register to Surf Shop",
        error: err.message,
      });
    }
  },
  // POST /login — Passport already authenticated the user; just redirect
  postLogin(req, res) {
    res.redirect(`/~${req.user.username}`);
  },

  getLogout(req, res, next) {
    if (!req.isAuthenticated()) return res.redirect("/login");

    req.logout((err) => {
      if (err) return next(err);
      res.redirect("/");
    });
  },
};
