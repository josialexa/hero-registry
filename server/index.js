const express = require('express')
const hc = require('./controllers/heroes')
const ec = require('./controllers/events')

const app = express()

app.use(express.json())

app.get('/api/heroes', hc.heroRead)
app.post('/api/heroes', hc.heroCreate)
app.put('/api/heroes/:id', hc.heroUpdate)
app.delete('/api/heroes/:id', hc.heroDelete)

app.get('/api/events', ec.eventRead)
app.post('/api/events', ec.eventCreate)
app.put('/api/events/:id', ec.eventUpdate)
app.delete('/api/events/:id', ec.eventDelete)

app.listen(5050, () => {
    console.log('Listening on port 5050')
})