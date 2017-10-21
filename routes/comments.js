var express = require("express")
  , router = express.Router({mergeParams: true})
  , Campground = require("../models/campground")
  , Comment = require("../models/comment")

// new
router.get("/new", isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

// create
router.post("/", isLoggedIn, function(req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      Comment.create(req.body.comment, function(err, comment){
        if (err) {
        } else {
          comment.author.id = req.user._id
          comment.author.username = req.user.username
          comment.save()
          console.log(comment)
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/" + campground._id)
        }
      })
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
