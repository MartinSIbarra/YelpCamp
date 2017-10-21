// adding packages
var express = require("express")
// adding models
  , Campground = require("../models/campground")
  , Comment = require("../models/comment")
// setting router
  , router = express.Router({mergeParams: true})

// index
router.get("/", function(req, res){
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})

// new
router.get("/new", isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})

// create
router.post("/", isLoggedIn, function(req, res){
  var newCampground = {
    name: req.body.campground.name,
    image: req.body.campground.image,
    description: req.body.campground.description,
    author: {
      id: req.user._id,
      username: req.user.username
    }
  }

  Campground.create(newCampground, function (err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds")
    }
  })
})

// edit
router.get("/:id/edit", checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/edit", {campground: foundCampground})
    }
  })
})

// update
router.put("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + campground._id)
    }
  })
})

// destroy
router.delete("/:id", checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds")
    }
  })
})

// show
router.get("/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})

// middleware functions
// checking if user logged in is the owner of the campground
function checkCampgroundOwnership(req, res, next) {
  if (req.isAuthenticated()) {
    Campground.findById(req.params.id, function(err, campground) {
      if (err) {
        res.redirect("back")
      } else {
        if (campground.author.id.equals(req.user._id)) {
          return next()
        } else {
          res.redirect("back")
        }
      }
    })
  } else {
    res.redirect("back")
  }
}

// login validation logic
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

// exporting router
module.exports = router
