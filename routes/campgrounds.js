// adding packages
var express = require("express")
// adding models
  , Campground = require("../models/campground")
  , Comment = require("../models/comment")
// adding middleware
  , middleware = require("../middleware")
// setting router
  , router = express.Router({mergeParams: true})

// index
router.get("/campgrounds", function(req, res){
  Campground.find({}, function (err, allCampgrounds) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/index", {campgrounds: allCampgrounds})
    }
  })
})

// new
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
  res.render("campgrounds/new")
})

// create
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
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
      req.flash("success", campground.name + ", successfully added!")
      res.redirect("/campgrounds")
    }
  })
})

// edit
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, foundCampground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/edit", {campground: foundCampground})
    }
  })
})

// update
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      req.flash("success", campground.name + ", successfully updated!")
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

// destroy
router.delete("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      Campground.remove(campground, function(err){
        if (err) {
          res.redirect("back")
        } else {
          campground.comments.forEach(function(comment){
            Comment.findByIdAndRemove(comment)
          })
          req.flash("success", campground.name + ", successfully removed!")
          res.redirect("/campgrounds")
        }
      })
    }
  })
})

// show
router.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("campgrounds/show", {campground: foundCampground})
    }
  })
})

// exporting router
module.exports = router
