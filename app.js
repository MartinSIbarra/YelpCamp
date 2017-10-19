var express = require("express")
  , bodyParser = require("body-parser")
  , app = express()
  , mongoose = require("mongoose")
  , Campground = require("./models/campground")
  , seedDB = require("./seeds")

mongoose.connect("mongodb://localhost/yelp_camp")
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

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
      res.render("index", {campgrounds: allCampgrounds})
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
  res.render("new")
})

app.get("/campgrounds/:id", function(req, res) {
  Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
    if (err) {
      console.log(err)
    } else {
      console.log(foundCampground)
      res.render("show", {campground: foundCampground})
    }
  })
})

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
