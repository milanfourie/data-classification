const router = require('express').Router()
const fileModel = require('./models/file.model')

router.post('/', (req, res) => {
    let formData = {
        fileName: req.body.fileName,
        nameAndSurname: req.body.nameAndSurname == '' ? false : true,
        contactNumber: req.body.contactNumber == '' ? false : true,
        emailAddress: req.body.emailAddress == '' ? false : true,
        idNumber: req.body.idNumber == '' ? false : true,
        dateOfBirth: req.body.dateOfBirth == '' ? false : true,
        linkedInProfile: req.body.linkedInProfile == '' ? false : true
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