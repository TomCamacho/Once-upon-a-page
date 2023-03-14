import createError from 'http-errors'
import express from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import routes from './routes/index.js'
import db from './sequelize/db/index.js'
import { Order, Book, User } from './sequelize/db/models/index.js'

const app = express()
const PORT = process.env.PORT || 3001

app.use(logger('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/', routes)

app.use((req, res, next) => next(createError(404)))

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}
  res.status(err.status || 500)
  res.send(err)
})

db.sync({ force: true }).then(() => {
  console.log('Db connected')
  app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`)
  })
})

export default app
