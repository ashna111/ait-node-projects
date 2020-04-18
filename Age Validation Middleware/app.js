const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser())
app.set("view engine", "ejs")

const ageValidation = (req, res, next) => {
    const age = req.body.age
    if (age >= 0 && age <= 120) {
        next()
    } else {
        res.end("Invalid Age Value :(")
    }
}

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', ageValidation, async (req, res, next) => {
    try {
        const name = req.body.name
        const email = req.body.email
        const age = req.body.age
        res.end('Valid User Age!')

    } catch (error) {
        next(error)
    }
})


app.listen(3000, () => {
    console.log("Make use of custom middleware!")
})