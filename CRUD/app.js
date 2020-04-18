const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

//DB connection
mongoose.connect("mongodb://localhost/adopet")

//Models
const Pet = require('./models/pet')

//Configuration
app.use(bodyParser())
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
  res.render("home")
})

//Pet Routes
app.get("/pets", (req, res) => {
  Pet.find({}, (err, pets) => {
    if (err) {
      console.log("Error")
    } else {
      res.render("pets/pets", { pets: pets })
    }
  })
})

app.post("/pets", (req, res) => {
  const name = req.body.name;
  const image = req.body.image
  const description = req.body.description

  const newPet = { name: name, image_url: image, description: description }
  Pet.create(newPet, (err, newlyCreated) => {
    if (err) {
      console.log("Error")
    } else {
      res.redirect("/pets")
    }
  })
})

app.get("/pets/new", (req, res) => {
  res.render("pets/pets_new")
});

app.get("/pets/:id/edit", (req, res) => {
  Pet.findById(req.params.id, (err, petFound) => {
    if (err) {
      console.log(err);
    } else {
      res.render("pets/pet_edit", { pet: petFound });
    }
  })
});

app.put('/pets/:id', (req, res) => {
  console.log(req.body)
  Pet.findByIdAndUpdate(req.params.id, req.body.pet, (err, updatedPet) => {
    if (err) {
      console.log(err)
      // res.redirect("/pets")
    } else {
      res.redirect("/pets")
    }
  })
})

app.delete("/pets/:id/", (req, res) => {
  Pet.findByIdAndRemove(req.params.id, function (err) {
    if (err) {
      console.log(err)
    } else {
      res.redirect("/pets");
    }
  })
});


app.listen(3000, () => {
  console.log("CRUD Operations!")
})