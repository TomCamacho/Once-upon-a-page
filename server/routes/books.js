import { Router } from 'express'

import { Op } from 'sequelize'

import { validateAuth, validateAdmin } from '../middleware/auth.js'
import { Book } from '../sequelize/db/models/index.js'

const router = Router()

const apiBaseURL = 'https://www.googleapis.com/books/v1/volumes/'
const apiBaseURLISBN = 'https://www.googleapis.com/books/v1/volumes/?q=isbn:'
const apiSearch = '?projection=lite&langRestrict=en&filter=paid-ebooks&q='

const formatBookFromGoogle = book => ({
  googleId: book.id,
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors,
  rating: book.volumeInfo.averageRating,
  images: [book.volumeInfo.imageLinks.thumbnail],
  pages: book.volumeInfo.pageCount,
  publishingHouse: book.volumeInfo.publisher,
  published: book.volumeInfo.publishedDate,
  language: book.volumeInfo.language,
  description: book.volumeInfo.description,
  stock: book.stock,
  price: book.stock,
  genres: book.genres,
})

const formatBookFromGoogleByISBN = book => ({
  googleId: book.items[0].id,
  title: book.items[0].volumeInfo.title,
  authors: book.items[0].volumeInfo.authors,
  rating: book.items[0].volumeInfo.averageRating,
  images: [book.items[0].volumeInfo.imageLinks.thumbnail],
  pages: book.items[0].volumeInfo.pageCount,
  publishingHouse: book.items[0].volumeInfo.publisher,
  published: book.items[0].volumeInfo.publishedDate,
  language: book.items[0].volumeInfo.language,
  description: book.items[0].volumeInfo.description,
  stock: book.stock,
  price: book.stock,
  genres: book.genres,
})

router.get('/', async (req, res) => {
  let condition
  const { title, googleId } = req.query
  if (title) condition = { title: { [Op.iLike]: `%${title}%` } }
  if (googleId) condition = { googleId }
  const books = await Book.findAll({ where: condition }, { include: 'Genre' })
  return res.status(200).send(books)
})

router.get('/search/:textToSearch', async (req, res) => {
  const { textToSearch } = req.params
  const response = await fetch(apiBaseURL.concat(apiSearch, textToSearch))
  const books = (await response.json()).items
  const booksForClient = books.map(book => formatBookFromGoogle(book))
  res.status(200).send(booksForClient)
})

router.get('/volume/:id', async (req, res) => {
  const { id } = req.params
  const response = await fetch(apiBaseURL.concat(id))
  const book = await response.json()
  res.status(200).send(formatBookFromGoogle(book))
})

router.get('/:genre', (req, res) => {
  const { genre } = req.params
  console.log(genre)
  Book.findAll({
    where: {
      genres: {
        [Op.overlap]: [genre],
      },
    },
  })
    .then(books => res.status(200).send(books))
    .catch(error => console.log(error))
})

router.post('/:id', validateAuth, async (req, res, next) => {
  const { email } = req.body
  try {
    const book = await Book.findByPk(req.params.id)
    if (book.reviews.length !== 0) {
      return book.reviews.map(review => {
        if (review.email === email) {
          return res
            .status(401)
            .send('You have already created a review for this book.')
        }
      })
    }
    await book.update({ reviews: [...book.reviews, req.body] })
    res.status(201).send('New review created!')
  } catch (error) {
    next(error)
  }
})

// ----ADMIN----

router.post('/', validateAuth, validateAdmin, async (req, res) => {
  const { isbn, stock, price, genres } = req.body
  const response = await fetch(apiBaseURLISBN.concat(isbn))
  const book = await response.json()
  console.log(book)
  const bookToAdd = await Book.create(
    formatBookFromGoogleByISBN({ ...book, stock, price, genres })
  )
  res.status(201).send(bookToAdd)
})

router.put('/:id', validateAuth, validateAdmin, async (req, res) => {
  const { id } = req.params
  try {
    await Book.update(req.body, { where: { id: id } })
    res.sendStatus(202)
  } catch (error) {
    res.sendStatus(404)
  }
})

router.delete('/:id', validateAuth, validateAdmin, async (req, res) => {
  const { id } = req.params
  try {
    await Book.destroy({ where: { id: id } })
    res.sendStatus(202)
  } catch (error) {
    res.sendStatus(404)
  }
})

export default router
