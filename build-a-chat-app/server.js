import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer()

server.on('request', (req, res) => {
  fs.readFile('./public/index.html', (err, data) => {
    if (err) {
      console.log(err);
      res.sendDate(null)
      return
    }
    res.writeHead(200, {
      "Content-Type": "text/html"
    })
    res.end(data)
  })
})

const ws = new WebSocketServer({ server });

ws.on('connection', (stream, req) => {

  const username = new URL(req.url, "http://localhost").searchParams.get(
    "username",
  );
  console.log("Client connected:", username);

  const message = JSON.stringify({ type: "system", text: `${username} joined` });

  ws.clients.forEach((client) => client.readyState === WebSocket.OPEN && client.send(message))

  stream.on('message', (data) => {
    const { username, text } = JSON.parse(data);

    const message = JSON.stringify({ type: 'chat', username, text })
    ws.clients.forEach((client) => client.readyState === WebSocket.OPEN && client.send(message))
  })

  stream.on('close', () => {
    const message = JSON.stringify({ type: 'system', text: `${username} left` })
    ws.clients.forEach((client) => client.readyState === WebSocket.OPEN && client.send(message))
  })
})



server.listen(PORT, () => {
  console.log('Chat server running at http://localhost:3001')
})
