import { Router } from 'express'

import { Op } from 'sequelize'

import { validateAuth, validateAdmin } from '../middleware/auth.js'
import { Book, Author } from '../sequelize/db/models/index.js'
const router = Router()

const apiBaseURL = 'https://www.googleapis.com/books/v1/volumes/'
const apiSearch = '?projection=lite&langRestrict=en&filter=paid-ebooks&q='

const formatBookFromGoogle = book => ({
  googleId: book.id,
  title: book.volumeInfo.title,
  rating: book.volumeInfo.averageRating,
  images: [book.volumeInfo.imageLinks.thumbnail],
  pages: book.volumeInfo.pageCount,
  publishingHouse: book.volumeInfo.publisher,
  published: book.volumeInfo.publishedDate,
  language: book.volumeInfo.language,
  description: book.volumeInfo.description,
  stock: book.stock,
  price: book.price,
  genres: book.genres,
  authors: book.volumeInfo.authors.map(authorName => ({ name: authorName })),
})

router.get('/', async (req, res) => {
  return Book.findAll().then(books => res.status(200).send(books))
})

router.get('/search/algo', async (req, res) => {
  let condition
  const { title, googleId } = req.query
  if (title) condition = { title: { [Op.iLike]: `%${title}%` } }
  if (googleId) condition = { googleId }
  const books = await Book.findAll({ where: condition }, { include: 'Author' })
  return res.status(200).send(books)
})

router.get('/:id', async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: {
      model: Author,
      through: {
        attributes: [],
      },
    },
  })
  const newAuthors = book.authors.map(author => author.name)
  const { authors, ...dataToKeep } = book.dataValues
  const bookToReturn = { ...dataToKeep, authors: newAuthors }
  return res.status(200).send(bookToReturn)
})

// búsqueda por query a la api de google
router.get('/search/:textToSearch', async (req, res) => {
  const { textToSearch } = req.params
  const response = await fetch(apiBaseURL.concat(apiSearch, textToSearch))
  const books = (await response.json()).items
  const booksForClient = books.map(book => formatBookFromGoogle(book))
  res.status(200).send(booksForClient)
})

// consulta de volumen particular a la api de google
router.get('/volume/:id', async (req, res) => {
  const { id } = req.params
  const response = await fetch(apiBaseURL.concat(id))
  const book = await response.json()
  res.status(200).send(formatBookFromGoogle(book))
})

// TODO nunca va a llegar acá por overlap de rutas
// router.get('/:genre', (req, res) => {
//   const { genre } = req.params
//   console.log(genre)
//   Book.findAll({
//     where: {
//       genres: {
//         [Op.overlap]: [genre],
//       },
//     },
//   })
//     .then(books => res.status(200).send(books))
//     .catch(error => console.log(error))
// })

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

router.post('/', async (req, res) => {
  const { isbn, price, genres, stock } = req.body
  const isbnSearch = '?q=isbn:'.concat(isbn)
  const response = await fetch(apiBaseURL.concat(isbnSearch))
  const bookFromGoogle = await response.json()
  console.log(bookFromGoogle)
  const bookToAdd = await Book.create(
    formatBookFromGoogle({ ...bookFromGoogle.items[0], stock, price, genres }),
    { include: Author }
  )
  return res.status(201).send(bookToAdd)
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
