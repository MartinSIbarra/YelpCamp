var express = require("express")
  , router = express.Router({mergeParams: true})
  , Campground = require("../models/campground")
  , Comment = require("../models/comment")

// index
router.get("/", function(req, res){
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      console.log(err)
    } else {
      console.log(allCampgrounds)
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})

// create
router.post("/", isLoggedIn, function(req, res){
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

// new
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})

// show
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground)
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})

// login validation
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

module.exports = router
