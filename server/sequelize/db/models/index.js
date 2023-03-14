'use strict'

import User from './user.js'
import Book from './book.js'
import Genre from './genre.js'

Book.hasMany(Genre)
Genre.belongsTo(Book)

export default {
  User,
  Book,
  Genre
}
