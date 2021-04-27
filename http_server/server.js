const express = require('express')
var cors      = require('cors')
const app     = express()
const port    = 3000;

app.use(cors());
app.set('trust proxy', true)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tasks', (req, res) => {
  res.json([{
    name: "task 1",
    description: "Test 1",
    date: Date.now()
  }, {
    name: "task 2",
    description: "Test 2",
    date: Date.now()
  }])
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})