var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , mongoose = require("mongoose")
  , Campground = require("./models/campground")
  , Comment = require("./models/comment")
  , seedDB = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))

seedDB()

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

app.post("/campgrounds", function(req, res){
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

app.get("/campgrounds/new", function(req, res){
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

app.get("/campgrounds/:id/comments/new", function (req, res) {
  Campground.findById(req.params.id, function(err, campground) {
    if (err) {
      console.log(err)
    } else {
      res.render("comments/new", {campground: campground})
    }
  })
})

app.post("/campgrounds/:id/comments", function(req, res) {
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

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
