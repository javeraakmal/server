const express = require('express')
const app = express()
const port = 3000
app.get('/', (req, res) => {
  res.send(`
  <a href="/">Home</a>
  <h1 style="background-color: skyblue;">home page</h1>
  <a href="/about">About</a>
  <a href="/contact">Contact</a>
  <a href="/gallery">Gallery</a>
  `)
})

app.get('/', (req, res) => {
    res.send('home page!')
  })


app.get('/about', (req, res) => {
    res.send('About page!')
  })

 
  app.get('/contact', (req, res) => {
    res.send('contact page!')
  })

  app.get('/gallery', (req, res) => {
    res.send('gallery page!')
  })
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})