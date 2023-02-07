const HTTPError = require('./HTTPError')

module.exports = function responseErrorHandler (response, error) {
  console.log(error)
  if (error instanceof HTTPError) {
    response.status(error.code).json({ message: error.message })
  } else {
    console.log(error)
    response.status(500).json({ message: 'Something Broke.. Internal Server Error' })
  }
}
