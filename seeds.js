var mongoose = require("mongoose")
var Campground = require("./models/campground")
var Comment = require("./models/comment")

campgroundsSeeds = [
  {
    name: "Corrior Lake",
    image: "http://i1276.photobucket.com/albums/y470/ConstantLeads/Zumba/Campgrounds/campmountain_zpsb1db8fc4.jpg~original",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Lake Tomato",
    image: "http://blog.koa.com/wp-content/uploads/unique-campgrounds-626x417.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
  },
  {
    name: "Familiar Lake",
    image: "http://farm9.staticflickr.com/8605/16573646931_22fc928bf9_o.jpg",
    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
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
      // console.log("All campgrounds removed!")
      // Comment.remove({}, function(err) {
      //   if (err) {
      //     console.log(err)
      //   } else {
      //     console.log("All comments removed!");
      //     campgroundsSeeds.forEach(function(campgroundSeed){
      //       Campground.create(campgroundSeed, function(err, campground){
      //         if (err) {
      //           console.log(err)
      //         } else {
      //           console.log("Campground created:")
      //           console.log(campground)
      //           commentsSeeds.forEach(function(commentSeed) {
      //             Comment.create(commentSeed, function(err, comment) {
      //               if (err) {
      //                 console.log(err)
      //               } else {
      //                 console.log("Comment created:")
      //                 console.log(comment)
      //                 campground.comments.push(comment)
      //                 campground.save()
      //               }
      //             })
      //           })
      //         }
      //       })
      //     })
      //   }
      // })
    }
  })
}

module.exports = seedDB
