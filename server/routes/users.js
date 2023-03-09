import { Router } from 'express'
import { ValidationError } from 'sequelize'

import User from '../sequelize/db/models/user.js'
import { generateToken } from '../config/tokens.js'
import { validateAuth } from '../middlewares/auth.js'

const router = Router()

router.post('/register', async (req, res, next) => {
  try {
    const addedUser = await User.create(req.body)
    res.status(201).send(addedUser)
  } catch (error) {
    if (error instanceof ValidationError) error.status = 422
    next(error)
  }
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  User.findByPk(id)
    .then(user => user.update(req.body))
    .then(updatedUser => res.status(202).send(updatedUser))
    .catch(error => console.log(error))
})

router.post('/login', (req, res) => {
  const { email, password } = req.body
  User.findOne({ where: { email } }).then(user => {
    if (!user) return res.sendStatus(401)

    user.hasPassword(password).then(passwordMatches => {
      if (!passwordMatches) return res.sendStatus(401)

      const payload = {
        email: user.email,
        name: user.name,
      }
      const token = generateToken(payload)
      res.cookie('token', token)
      res.send(payload)
    })
  })
})

router.get('/secret', validateAuth, (req, res) => {
  res.send(req.user)
})

router.get('/me', validateAuth, (req, res) => {
  res.send(req.user)
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.sendStatus(204)
})

export default router
