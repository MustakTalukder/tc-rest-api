const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const port = 5000


const postRouter = require('./routes/postRoute')


mongoose.connect('mongodb://localhost/rest_api', { useNewUrlParser: true }, () => {
    console.log("DB Connected");
    
})


const app = express()


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use('/api/posts', postRouter)

app.get('/', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

