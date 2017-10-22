var express = require("express")
  , router = express.Router({mergeParams: true})
  , passport = require("passport")
  , User = require("../models/user")

//landing page
router.get("/", function(req, res){
  res.render("landing")
})

//show the register form
router.get("/register", function(req, res){
  res.render("register")
})

//handle sign up logic
router.post("/register", function(req, res) {
  newUser = new User({username: req.body.username})
  User.register(newUser, req.body.password, function(err, user){
    if (err) {
      console.log(err)
      res.render("register")
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/campgrounds")
    })
  })
})

// login page
router.get("/login", function(req, res){
  res.render("login")
})

// login action
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(res, req){
})

// logout action
router.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/campgrounds")
})

//unknown routes
// router.get("*", function(req, res) {
//   res.redirect("/")
// })

// login validation
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

module.exports = router
