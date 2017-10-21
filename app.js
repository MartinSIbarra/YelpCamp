var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , mongoose = require("mongoose")
  , passport = require("passport")
  , localStrategy = require("passport-local")
  , User = require("./models/user")
  , Campground = require("./models/campground")
  , Comment = require("./models/comment")
  , seedDB = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

//==========================================================================
// PASSPORT CONFIGURATION
//==========================================================================

app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!",
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req, res, next){
  res.locals.currentUser = req.user
  next()
})
//==========================================================================
// ROUTES
//==========================================================================
// seedDB()

//==========================================================================
// ROUTES
//==========================================================================
app.get("/", function(req, res){
  res.render("landing")
})

app.get("/campgrounds", function(req, res){
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      console.log(allCampgrounds)
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})

app.post("/campgrounds", isLoggedIn, function(req, res){
  var newCampground = {
    name: req.body.name,
    image: req.body.image,
    description: req.body.description,
  }

  Campground.create(newCampground, function (err, campground) {
    if (err) {
      console.log(err)
    } else {
      console.log(campground)
      res.redirect("/campgrounds")
    }
  })
})

app.get("/campgrounds/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground)
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})

app.get("/campgrounds/:id/comments/new", isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

app.post("/campgrounds/:id/comments", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
          console.log(err)
        } else {
          console.log(comment)
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
})


//==========================================================================
// AUTH ROUTES
//==========================================================================

//show the register form
app.get("/register", function(req, res){
  res.render("register")
})

//handle sign up logic
app.post("/register", function(req, res) {
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

app.get("/login", function(req, res){
  res.render("login")
})

app.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
  }), function(res, req){
})

app.get("/logout", function(req, res) {
  req.logout()
  res.redirect("/campgrounds")
})

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

//==========================================================================
// SERVER
//==========================================================================

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
