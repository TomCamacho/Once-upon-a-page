'use strict'

import Book from './book.js'
import Order from './order.js'
import User from './user.js'
import Author from './author.js'

Order.belongsTo(User)
User.hasMany(Order)

Book.belongsToMany(Order, { through: 'Order_Book' })
Order.belongsToMany(Book, { through: 'Order_Book' })

Book.belongsToMany(Author, { through: 'Author_Book' })
Author.belongsToMany(Book, { through: 'Author_Book' })

export { Book, Order, User, Author }
