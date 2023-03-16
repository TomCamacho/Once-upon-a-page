import { Router } from 'express'

import booksRouter from './books.js'
import userRouter from './users.js'
import checkoutRouter from './checkout.js'

const router = Router()

router.use('/books', booksRouter)
router.use('/user', userRouter)
router.use('/orders', checkoutRouter)

export default router
