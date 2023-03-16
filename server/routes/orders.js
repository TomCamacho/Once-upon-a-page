import { Router } from 'express'

import { validateAuth, validateAdmin } from '../middleware/auth.js'
import Order from '../sequelize/db/models/order.js'

const router = Router()

// ----ADMIN----

router.get('/', validateAuth, validateAdmin, (req, res) => {
  Order.findAll()
    .then(orders => res.status(200).send(orders))
    .catch(error => console.log(error))
})

router.post('/', validateAuth, validateAdmin, (req, res) => {
  Order.create(req.body)
    .then(order => res.status(201).send(order))
    .catch(error => console.log(error))
})

router.put('/:id', validateAuth, validateAdmin, (req, res) => {
  const { id } = req.params
  Order.update(req.body, {
    where: {
      id: id,
    },
    returning: true,
  })
    .then(order => res.status(201).send(order))
    .catch(error => console.log(error))
})

export default router
