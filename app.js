var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , mongoose = require("mongoose")
  , passport = require("passport")
  , localStrategy = require("passport-local")
  , User = require("./models/user")
  // , Campground = require("./models/campground")
  // , Comment = require("./models/comment")
  // , seedDB = require("./seeds")

var campgroundRoutes = require("./routes/campgrounds")
  , commentRoutes = require("./routes/comments")
  , indexRoutes = require("./routes/index")

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

app.use("/campgrounds", campgroundRoutes)
app.use("/campgrounds/:id/comments", commentRoutes)
app.use(indexRoutes)

//==========================================================================
// SERVER
//==========================================================================

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
