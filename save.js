const router = require('express').Router()
const fileModel = require('./models/file.model')

router.post('/', (req, res) => {
    let formData = {
        fileName: req.body.fileName,
        nameAndSurname: req.body.nameAndSurname != ' ' ? true : false,
        contactNumber: req.body.contactNumber != ' ' ? true : false,
        emailAddress: req.body.emailAddress != ' ' ? true : false,
        idNumber: req.body.idNumber != ' ' ? true : false,
        dateOfBirth: req.body.dateOfBirth != ' ' ? true : false,
        linkedInProfile: req.body.linkedInProfile != ' ' ? true : false
    }

    let fileMetadata = new fileModel(formData)

    fileMetadata.save((error, doc) => {
        if (error) {
            console.log(error)
        }

        res.json(doc)
    })
})

module.exports = router