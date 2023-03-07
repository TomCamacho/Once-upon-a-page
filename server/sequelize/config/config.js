const username = process.env.DEV_OUAP_USERNAME || null
const password = process.env.DEV_OUAP_PASSWORD || null
const host = process.env.DEV_OUAP_HOSTNAME || 'localhost'
const dialect = 'postgres'
const database = process.env.DEV_OUAP_NAME || 'once_upon_a_page_dev'
const logging = process.env.DEV_OUAP_LOGGING || false

const config = {
  development: {
    username,
    password,
    database,
    host,
    dialect,
    logging,
  },
  test: {
    username: process.env.CI_OUAP_USERNAME,
    password: process.env.CI_OUAP_PASSWORD,
    database: process.env.CI_OUAP_NAME,
    host,
    dialect,
    logging,
  },
  production: {
    username: process.env.PROD_OUAP_USERNAME,
    password: process.env.PROD_OUAP_PASSWORD,
    database: process.env.PROD_OUAP_NAME,
    host: process.env.PROD_OUAP_HOSTNAME,
    port: process.env.PROD_OUAP_PORT,
    dialect,
    logging,
  },
}

export default config
