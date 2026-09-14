import createApp from './app.js'

function startServer() {
  const app = createApp()

  app.listen(3000, () => {
    console.log('Server started on port 3000 ') 
  })
}
startServer()