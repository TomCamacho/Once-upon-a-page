import { Book, Author } from '../models/index.js'
import books from './Books.json' assert {type: 'json'}

Book.bulkCreate(books, {
  include: Author,
  fields: [
    'googleId',
    'title',
    'images',
    'genres',
    'description',
    'stock',
    'price',
  ],
  validate: true,
})
