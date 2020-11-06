const app = require('express')()

app.use(require('cors')())
app.use(require('express-fileupload')())
app.use('/api', require('./api.routes'))

const port = process.env.PORT || 3001
app.listen(port, console.log(`App listenting to port ${port}`))