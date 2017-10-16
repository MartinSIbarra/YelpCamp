var express = require("express")
var bodyParser = require("body-parser")
var app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs")

var campgrounds = [
  {
    name: "Salmon Creek",
    image: "http://littleriveroutfitters.com/images/developedcampgrounds2.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://www.nelsonkootenaylake.com/sites/default/files/images/PlacestoStay/CAMPING-400.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://static.workaway.info/gfx/foto/8/5/8/7/3/858739274415/xl/1.jpg"
  },
  {
    name: "Salmon Creek",
    image: "http://littleriveroutfitters.com/images/developedcampgrounds2.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://www.nelsonkootenaylake.com/sites/default/files/images/PlacestoStay/CAMPING-400.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://static.workaway.info/gfx/foto/8/5/8/7/3/858739274415/xl/1.jpg"
  },
  {
    name: "Salmon Creek",
    image: "http://littleriveroutfitters.com/images/developedcampgrounds2.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://www.nelsonkootenaylake.com/sites/default/files/images/PlacestoStay/CAMPING-400.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://static.workaway.info/gfx/foto/8/5/8/7/3/858739274415/xl/1.jpg"
  },
  {
    name: "Salmon Creek",
    image: "http://littleriveroutfitters.com/images/developedcampgrounds2.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://www.nelsonkootenaylake.com/sites/default/files/images/PlacestoStay/CAMPING-400.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://static.workaway.info/gfx/foto/8/5/8/7/3/858739274415/xl/1.jpg"
  },
  {
    name: "Salmon Creek",
    image: "http://littleriveroutfitters.com/images/developedcampgrounds2.jpg"
  },
  {
    name: "Granite Hill",
    image: "https://www.nelsonkootenaylake.com/sites/default/files/images/PlacestoStay/CAMPING-400.jpg"
  },
  {
    name: "Mountain Goat's Rest",
    image: "https://static.workaway.info/gfx/foto/8/5/8/7/3/858739274415/xl/1.jpg"
  },
]

app.get("/", function(req, res){
  res.render("landing")
})

app.get("/campgrounds", function(req, res){
  res.render("campgrounds", {campgrounds: campgrounds})
})

app.post("/campgrounds", function(req, res){
  var newCampground = {name: req.body.name, image: req.body.image}
  campgrounds.push(newCampground)
  res.redirect("/campgrounds")
})

app.get("/campgrounds/new", function(req, res){
  res.render("new")
})

app.listen(3000, function(){
  console.log("Server listening on port 3000");
});
