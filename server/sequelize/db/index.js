import Sequelize from 'sequelize'

import connectionConfigurations from '../config/config.js'

const environment = process.env.NODE_ENV || 'development'
const selectedConfiguration = connectionConfigurations[environment]
const { database, username, password } = selectedConfiguration

const sequelize = new Sequelize(
  database,
  username,
  password,
  selectedConfiguration
)

export default sequelize