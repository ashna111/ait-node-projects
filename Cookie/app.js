const express = require('express')
const cookieParser = require('cookie-parser')

const app=express()
app.use(cookieParser())

app.get('/', function (req, res) {
  // Cookies that have not been signed
  console.log('Cookies: ', req.cookies)
 
  // Cookies that have been signed
  console.log('Signed Cookies: ', req.signedCookies)
  res.send("Here's a cookie for you")
})

app.listen(8080, (err) => {
  if (err) console.error(err)
  else {
    console.log("Cookie demo")
  }
})