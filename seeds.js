var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

campgroundsSeeds = [
  {
    name: "Corrior Lake",
    image: "http://i1276.photobucket.com/albums/y470/ConstantLeads/Zumba/Campgrounds/campmountain_zpsb1db8fc4.jpg~original",
    description: "blah blah blah blah "
  },
  {
    name: "Lake Tomato",
    image: "http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg",
    description: "blah blah blah blah "
  },
  {
    name: "Familiar Lake",
    image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
    description: "blah blah blah blah "
  }
]

commentsSeeds = [
  {
    text: "This is a great campground, but I whish there was internet.",
    author: "Bob Dylan",
  },
  {
    text: "I don't like it so mucho, I won't come back here.",
    author: "Brad Cherson",
  }
]

function seedDB(){
  Campground.remove({}, function(err) {
    if (err) {
      console.log(err)
    } else {
      console.log("All campgrounds removed!")
      Comment.remove({}, function(err) {
        if (err) {
          console.log(err)
        } else {
          console.log("All comments removed!");
          campgroundsSeeds.forEach(function(campgroundSeed){
            Campground.create(campgroundSeed, function(err, campground){
              if (err) {
                console.log(err)
              } else {
                console.log("Campground created:")
                console.log(campground)
                commentsSeeds.forEach(function(commentSeed) {
                  Comment.create(commentSeed, function(err, comment) {
                    if (err) {
                      console.log(err)
                    } else {
                      console.log("Comment created:")
                      console.log(comment)
                      campground.comments.push(comment)
                      campground.save()
                    }
                  })
                })
              }
            })
          })
        }
      })
    }
  })
}

module.exports = seedDB
