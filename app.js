//=============================================================================
// GENERAL APP SETTINGS
//=============================================================================
// adding packages
var express = require("express") // express framework
  , bodyParser = require("body-parser") // helper to parse the requests body
  , mongoose = require("mongoose") // database
  , passport = require("passport") // authentication
  , localStrategy = require("passport-local") // authentication
  , methodOverride = require("method-override") // helper to use extra methods
  , flash = require("connect-flash") // for showing flash messages

// adding models files
var User = require("./models/user")
  // , Campground = require("./models/campground")
  // , Comment = require("./models/comment")

// adding seeds files
var seedDB = require("./seeds")

// adding routes files
var campgroundRoutes = require("./routes/campgrounds")
  , commentRoutes = require("./routes/comments")
  , indexRoutes = require("./routes/index")

// setting application
var app = express()

// mongo db settings =====================================================
// mongoose.connect("mongodb://localhost/yelp_camp")
mongoose.connect(process.env.NODEMONGODB)
// body parser settings
app.use(bodyParser.urlencoded({extended: true}))
// view templates settings --> setting out view templates to ejs extension
app.set("view engine", "ejs")
// setting public to access from html views
app.use(express.static(__dirname + "/public"))

// connect-flash settings ================================================
app.use(flash())

// passport settings =====================================================
app.use(require("express-session")({
  secret: "Once again Rusty wins cutest dog!", // setting pepper
  resave: false,
  saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

// setting current user to all view templates
app.use(function(req, res, next){
  res.locals.currentUser = req.user
  res.locals.error = req.flash("error")
  res.locals.success = req.flash("success")
  next()
})

//==========================================================================
// ROUTES SETTINGS
//==========================================================================
// setting routes to use in the app
app.use(methodOverride("_method"))
app.use(campgroundRoutes)
app.use("/campgrounds/:id", commentRoutes)
app.use(indexRoutes)


//==========================================================================
// SEEDS SETTINGS
//==========================================================================
// seed function, view more in /seeds.js
// seedDB()

//==========================================================================
// SERVER SETTINGS
//==========================================================================
var port = process.env.NODEPORT
  , hostname = process.env.NODEHOST
  , backlog = 511

// starts server listen
app.listen(port, hostname, backlog, function(){
  console.log("Server listening on port 3000");
});
