import express from 'express';
import weatherRouter from "./weather.js";
import path from "path"
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const app = express();

const PORT = 3000;

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})

app.get('/api/info', (req, res) => {
  res.status(200).json({ 
    name: "weather",  
    version: "1.0.0",
    endpoints: ["/api/weather/:city", "/api/greet/:name", "/api/data"],
  })
})

app.get('/api/status', (req, res) => {
  res.status(200).json({ status: 200 })
})

app.get('/docs', (req, res) => {
  res.redirect('/api/info')
})

app.get('/api/greet/:name', (req, res) => {
  res.json({ greet: `Hello ${req.params.name}`})
})

app.route('/api/data').get((req, res) => {
  res.json({ data: 'data' })
}).post((req, res) => {
  res.status(201).json({ bla: 42 })
})

app.use('/api/weather', weatherRouter)

app.listen(PORT, () => {
  console.log(`started on port ${PORT}`)
})