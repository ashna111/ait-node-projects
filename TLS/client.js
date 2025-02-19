// client side code for the websocket
const WebSocket = require('ws')
const url = 'ws://localhost:8080/ws'
const connection = new WebSocket(url)

connection.onopen = () => {
  connection.send('Message From Client')
}

connection.onerror = (error) => {
  console.log(`WebSocket error: ${error}`)
}

connection.onmessage = (e) => {
  console.log(e.data)
}