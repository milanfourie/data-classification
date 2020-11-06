const router = require('express').Router()

router.post('/', (req, res) => {

    if (req.files.file.name.split(".")[1] == 'txt' || req.files.file.name.split(".")[1] == 'csv'){
        let uploadedFile = req.files.file

        uploadedFile.mv('./uploads/' + uploadedFile.name, function(error){
            if (error) {
                console.log(error)               
            }

            const fs = require('fs')
            const path = require('path')
        
            const readStream = fs.createReadStream(path.join(__dirname, './uploads', uploadedFile.name))

            let data = ''
    
            readStream.on('data', (chunk) => {
                data += chunk
            })
        
            readStream.on('end', function(){
                let nameAndSurname = data.match('[A-Z]{1}[a-z]+[ ][A-Z]{1}[a-z]+')
                let contactNumber = data.match('[0-9]{3}[ ]?[0-9]{3}[ ]?[0-9]{4}')
                let emailAddress = data.match('[a-zA-Z0-9]+[.-]?[a-zA-Z0-9]+@[a-zA-Z]+[.]?[a-z]+[.]?[a-z]+')
                let idNumber = data.match('[0-9]{6}[ ]?[0-9]{4}[ ]?[0-9]{3}')
                let dateOfBirth = data.match('[0-9]{4}[-/]{1}[0-9]{2}[-/]{1}[0-9]{2}')
                let linkedIn = data.match('https://www.linkedin.com/in/[a-zA-Z0-9.-]+')
    
                res.json({
                    heading: 'We found the following POPI details: ',
                    fileName: uploadedFile.name,
                    nameAndSurname: nameAndSurname == null ? ' ' : nameAndSurname,
                    contactNumber: contactNumber == null ? ' ' : contactNumber,
                    emailAddress: emailAddress == null ? ' ' : emailAddress,
                    idNumber: idNumber == null ? ' ' : idNumber,
                    dateOfBirth: dateOfBirth == null ? ' ' : dateOfBirth,
                    linkedIn: linkedIn == null ? ' ' : linkedIn,
                })
            })
        })
    }
    else
    {
        res.json({
            heading: `We can't process ${req.files.file.name.split('.')[1]} files at the moment. Please fill in the necessary details below.`,
            fileName: '',
            nameAndSurname: '',
            contactNumber: '',
            emailAddress: '',
            idNumber: '',
            dateOfBirth: '',
            linkedIn: '',
        })
    }
})

module.exports = router