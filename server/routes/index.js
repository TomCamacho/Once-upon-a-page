import { Router } from 'express'

import booksRouter from './books.js'
import userRouter from './users.js'

const router = Router()
router.use('/books', booksRouter)
router.use('/user', userRouter)

export default router
