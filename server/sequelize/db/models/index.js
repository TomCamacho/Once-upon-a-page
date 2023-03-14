import Book from './book.js'
import Order from './order.js'
import User from './user.js'

Order.belongsTo(User)
User.hasMany(Order)

Book.belongsToMany(Order, { through: 'Order_Book' })
Order.belongsToMany(Book, { through: 'Order_Book' })

export { Book, Order, User }
