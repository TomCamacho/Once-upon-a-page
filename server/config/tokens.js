import jwt from 'jsonwebtoken'
import { secret } from '../dotenv.js'

export const generateToken = payload => {
  const token = jwt.sign({ user: payload }, secret, { expiresIn: '2d' })
  return token
}

export const validateToken = token => {
  return jwt.verify(token, secret)
}
