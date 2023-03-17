import { Router } from 'express'

import Genre from '../sequelize/db/models/genre.js'
import { validateAdmin, validateAuth } from '../middleware/auth.js'

const router = Router()

router.post('/', validateAuth, validateAdmin, (req, res) => {
  Genre.create(req.body)
    .then(genre => res.status(201).send(genre))
    .catch(error => console.log(error))
})

router.put('/name', validateAuth, validateAdmin, async (req, res) => {
  const { genre } = req.params
  try {
    await Genre.update(req.body, { where: { name: genre } })
    res.sendStatus(202)
  } catch (error) {
    res.sendStatus(404)
  }
})

router.delete('/name', validateAuth, validateAdmin, async (req, res) => {
  const { genre } = req.params
  try {
    await Genre.destroy({ where: { name: genre } })
    res.sendStatus(202)
  } catch (error) {
    res.sendStatus(404)
  }
})
export default router
