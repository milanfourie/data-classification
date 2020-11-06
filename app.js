const app = require('express')()

const uploadAPI = require('./upload')
const saveAPI = require('./save')

app.use(require('cors')())
app.use(require('express-fileupload')())
app.use('/api/upload', uploadAPI)
app.use('/api/save', saveAPI)

if (process.env.NODE_ENV == 'production') {
    app.use(express.static('./front-end/build'))
}

app.get('*', (req, res) => {
    res.sendFile(require('path').resolve(__dirname, 'front-end', 'build', 'index.html'))
})

const port = process.env.PORT || 3001
app.listen(port, console.log(`App listenting to port ${port}`))