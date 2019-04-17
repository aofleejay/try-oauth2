import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'
import OAuthServer from 'express-oauth-server'
import model from './model'

mongoose.connect('mongodb://database/auth')
const db = mongoose.connection
db.on('error', err => console.log(`Fail to connect database with error ${err}.`))
db.once('open', () => console.log('Database connected.'))

const app = express()

app.oauth = new OAuthServer({
  model,
})
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(app.oauth.authorize())

app.get('/', (req, res) => {
  res.json({ hello: 'world' })
})

app.listen(4000, () => console.log('Server started.'))
