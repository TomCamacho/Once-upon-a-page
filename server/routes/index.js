import { Router } from 'express'
const router = Router()
import booksRouter from './books.js'
import CartRouter from './carts.js'
import UserRouter from './users.js'

router.use('/books', booksRouter)
router.use('/cart', CartRouter)
router.use('/user', UserRouter)
export default router
