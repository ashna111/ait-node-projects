var express = require("express")
const app = express()
const bodyParser = require("body-parser")

app.use(bodyParser())
app.set("view engine", "ejs")

const ageValidate = (req, res, next) => {
    const age = req.body.age;
    if(age >= 0 && age <= 120){
        next()
    }
    else{
        res.end("Invalid")
    }
}

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', ageValidate, (req, res, next) => {
    try{
        const name = req.params.name
        const email = req.params.email
        const age = req.params.email
        res.end("Valid age")
    }
    catch(error){
        next(error)
    }
})

app.listen(3000, () => {
    console.log("Listening on 3000")
})