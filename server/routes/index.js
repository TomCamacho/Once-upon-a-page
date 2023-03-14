import { Router } from 'express'

import booksRouter from './books.js'
import userRouter from './users.js'
import orderRouter from './orders.js'

const router = Router()
router.use('/books', booksRouter)
router.use('/user', userRouter)
router.use('/order', orderRouter)

export default router
