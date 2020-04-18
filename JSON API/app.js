const express = require('express')
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser())
app.use(express.json())
app.set("view engine", "ejs")


app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', async (req, res) => {
    const { name , email, age } = req.body
    try {
      res.status(200).json({ name, email, age })
    } catch (err) {
      console.log(err)
    }
  })

app.listen(3000, () => {
    console.log("JSON API Demo!")
})