import { Router } from 'express'

import { Op } from 'sequelize'

import { validateAuth } from '../middleware/auth.js'
import { Book } from '../sequelize/db/models/index.js'

const router = Router()

const apiBaseURL = 'https://www.googleapis.com/books/v1/volumes/'
const apiSearch = '?projection=lite&langRestrict=en&filter=paid-ebooks&q='

const bookForClient = book => ({
  googleId: book.id,
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors,
  price: book.saleInfo.retailPrice.amount * 100,
  rating: book.volumeInfo.averageRating,
  images: [book.volumeInfo.imageLinks.thumbnail],
  genres: [book.volumeInfo.categories],
  pages: book.volumeInfo.pageCount,
  publishingHouse: book.volumeInfo.publisher,
  published: book.volumeInfo.publishedDate,
  language: book.volumeInfo.language,
  description: book.volumeInfo.description,
  stock: book.stock
})

router.get('/', async (req, res) => {
  let condition
  const { title, googleId } = req.query
  if (title) condition = { title: {[Op.iLike]: `%${title}%`} }
  if (googleId) condition = { googleId }
  const books = await Book.findAll({ where: condition }, { include: 'Genre' })
  return res.status(200).send(books)
})

// TODO replace validateAuth with validateAdmin middleware
router.post('/', validateAuth, async (req, res) => {
  const { googleId, stock } = req.body
  const response = await fetch(apiBaseURL.concat(googleId))
  const book = await response.json()
  const bookToAdd = await Book.create(bookForClient({...book, stock}))
  res.status(201).send(bookToAdd)
})

router.get('/search/:textToSearch', async (req, res) => {
  const { textToSearch } = req.params
  const response = await fetch(apiBaseURL.concat(apiSearch, textToSearch))
  const books = (await response.json()).items
  const booksForClient = books.map(book => bookForClient(book))
  res.status(200).send(booksForClient)
})

router.get('/volume/:id', async (req, res) => {
  const { id } = req.params
  const response = await fetch(apiBaseURL.concat(id))
  const book = await response.json()
  res.status(200).send(bookForClient(book))
})

export default router
