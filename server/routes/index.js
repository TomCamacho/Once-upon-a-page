import { Router } from 'express'
const router = Router()
import booksRouter from './books.js'
import userRouter from './users.js'

router.use('/books', booksRouter)
router.use('/user', userRouter)
export default router
