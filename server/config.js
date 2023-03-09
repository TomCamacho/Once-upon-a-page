import * as dotenv from 'dotenv'

dotenv.config()
const requiredEnvs = ['SECRET']
requiredEnvs.forEach(env => {
  if (!process.env[env]) throw new Error(`Missing env variable ${env}`)
})

export const secret = process.env.SECRET
