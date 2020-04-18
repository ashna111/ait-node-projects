const express = require('express')
const app = express()
const WebSocket = require('ws')


const server = app.listen(8080, (err) => {
  if (err) console.error(err)
  else {
    console.log("TLS demo")
  }
})

const wss = new WebSocket.Server({ server: server, path: '/ws' })

wss.on('connection', ws => {
  ws.on('message', message => {
    console.log(`Received message => ${message}`)
  })
  ws.send('Hello! Message From Server!!')
})