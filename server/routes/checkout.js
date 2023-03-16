import { Router } from 'express'

import Book from '../sequelize/db/models/book.js'
import Order from '../sequelize/db/models/order.js'
import User from '../sequelize/db/models/user.js'

import { sendEmail } from '../emailConfiguration.js'

const router = Router()

router.get('/', async (req, res, next) => {
  const { email } = req.body
  try {
    const user = await User.findOne({
      where: { email },
    })
    const userOrders = await Order.findAll({
      where: { UserId: user.id },
    })
    res.status(200).send(userOrders)
  } catch (error) {
    next(error)
  }
})

router.post('/confirm', async (req, res, next) => {
  const { cartItems, totalQuantity, totalAmount } = req.body.cart
  const { fullName, email } = req.body.user
  try {
    const newOrder = await Order.create({
      totalQuantity,
      totalAmount,
    })
    const dataUser = await User.findOne({
      where: {
        email,
      },
    })
    newOrder.setUser(dataUser)

    cartItems.forEach(item => {
      Book.findOne(
        { where: { googleId: item.googleId } },
        { include: { model: Order } }
      )
        .then(book => {
          const { stock } = book
          const stockUpdated = stock - item.units
          Book.update(
            { stock: stockUpdated},
            {
              where: { id: book.id },
              returning: true,
            }
          )
            .then(([affectedRows, updated]) => {
              const bookUpdated = updated[0]
              bookUpdated.setOrders(newOrder)
            })
            .catch(error => next(error))
        })
        .catch(error => next(error))
    })

    const dataOrder = {
      numberOfOrder: newOrder.id,
      totalQuantity,
      totalAmount,
      date: new Date(newOrder.createdAt),
      user: {
        fullName,
        email,
      },
      products: cartItems,
    }

    sendEmail(email, dataOrder)

    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

export default router
