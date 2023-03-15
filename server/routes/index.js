import { Router } from 'express'

import booksRouter from './books.js'
import userRouter from './users.js'
import genreRouter from './genres.js'

const router = Router()
router.use('/books', booksRouter)
router.use('/user', userRouter)
router.use('/genres', genreRouter)

export default router
