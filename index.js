const app = require('./app') 
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app) //Creates the server using the app file

server.listen(config.PORT, () => { //Defines the port to listen to
    logger.info(`Server running on port ${config.PORT}`)
})