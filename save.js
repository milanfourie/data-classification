const router = require('express').Router()
const fileModel = require('./models/file.model')

router.post('/', (req, res) => {
    let formData = {
        fileName: req.body.fileName,
        nameAndSurname: req.body.nameAndSurname.replace(' ', '') != '' ? true : false,
        contactNumber: req.body.contactNumber.replace(' ', '') != '' : false,
        emailAddress: req.body.emailAddress.replace(' ', '') != '' : false,
        idNumber: req.body.idNumber.replace(' ', '') != '' ? true : false,
        dateOfBirth: req.body.dateOfBirth.replace(' ', '') != ' ' ? true : false,
        linkedInProfile: req.body.linkedInProfile.replace(' ', '') != ' ' ? true : false
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