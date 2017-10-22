// add models
var Campground = require("../models/campground")
  , Comment = require("../models/comment")

var middleware = {}

// checking if user logged in is the owner of the campground
middleware.checkCampgroundOwnership = function(req, res, next) {
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

// checking if user logged in is the owner of the comment
middleware.checkCommentOwnership = function(req, res, next) {
  if (req.isAuthenticated()) {
    Comment.findById(req.params.comment_id, function(err, comment) {
      if (err) {
        res.redirect("back")
      } else {
        if (comment.author.id.equals(req.user._id)) {
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
middleware.isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect("/login")
}

module.exports = middleware
