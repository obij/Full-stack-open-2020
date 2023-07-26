const app = require('./app') // the actual Express application
const http = require('http')
const logger = require('./utils/logger')
const config = require('./utils/config')


const server = http.createServer(app)

//const PORT = 3003
server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})

