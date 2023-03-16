import { Router } from 'express'

import booksRouter from './books.js'
import userRouter from './users.js'
import ordersRouter from './orders.js'

const router = Router()

router.use('/books', booksRouter)
router.use('/user', userRouter)
router.use('/orders', ordersRouter)

export default router
