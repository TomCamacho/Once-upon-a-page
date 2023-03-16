import { validateToken } from '../config/tokens.js'

export const validateAuth = (req, res, next) => {
  const token = req.cookies.token
  if (!token) return res.sendStatus(401)

  const { user } = validateToken(token)
  if (!user) return res.sendStatus(401)

  req.user = user
  next()
}
export const validateAdmin = (req, res, next) => {
  if (!req.user.admin) return res.sendStatus(401)
  next()
}
