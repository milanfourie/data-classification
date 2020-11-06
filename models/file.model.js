const mongoose = require('mongoose')
const mongodbURI = 'mongodb+srv://milanfourie:1DvPs89rKDYQd7bk@cluster0.csz3b.azure.mongodb.net/fouriedb?retryWrites=true&w=majority'

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const mongooseConnection = mongoose.connection

mongooseConnection.on('error', function(mongooseConnectionError){
    console.log(`Mongoose Connection Error: ${mongooseConnectionError}`)
})

mongooseConnection.on('open', function(){
    console.log(`MongoDB Atlas connected successfully!`)
})

const fileSchema = new mongoose.Schema({
    fileName: String,
    nameAndSurname: String,
    contactNumber: String,
    emailAddress: String,
    idNumber: String, 
    dateOfBirth: String,
    linkedInProfile: String
})

const fileModel = new mongoose.model('files', fileSchema)

module.exports = fileModel