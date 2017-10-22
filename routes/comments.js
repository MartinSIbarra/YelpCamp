// adding packages
var express = require("express")
// adding models
  , Campground = require("../models/campground")
  , Comment = require("../models/comment")
// adding middleware
  , middleware = require("../middleware")
// setting router
  , router = express.Router({mergeParams: true})

// new
router.get("/comments/new", middleware.isLoggedIn, function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      res.redirect("back")
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

// create
router.post("/comments", middleware.isLoggedIn, function(req, res) {
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
          campground.comments.push(comment)
          campground.save()
          res.redirect("/campgrounds/" + campground._id)
        }
      })
    }
  })
})

// edit
router.get("/comments/:comment_id/edit", middleware.checkCommentOwnership, function (req, res) {
  Comment.findById(req.params.comment_id, function (err, comment){
    if (err) {
      res.redirect("back")
    } else {
      params = {
        campground_id: req.params.id,
        comment: comment
      }
      res.render("comments/edit", params)
    }
  })
})

// update
router.put("/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment){
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

//destroy
router.delete("/comments/:comment_id", middleware.checkCommentOwnership, function(req, res){
  Comment.findByIdAndRemove(req.params.comment_id, function(err) {
    if (err) {
      res.redirect("back")
    } else {
      res.redirect("/campgrounds/" + req.params.id)
    }
  })
})

module.exports = router
