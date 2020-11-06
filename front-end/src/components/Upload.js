import React, { useState } from 'react';
import './Upload.css' 

import Edit from './Edit'

function Upload(){

    const [file, setFile] = useState('') //useState() to save the selected file in
    const [response, setResponse] = useState('') //useState() to save response from API

    const handleChange = (e) => {
        const fileToUpload = e.target.files[0]
        setFile(fileToUpload) //Save file to useState() for handleSubmit() function
    }

    const handleSubmit = (e) => {
        e.preventDefault() //Prevent default HTML form behaviour on submission for file upload

        if (file) {
            let formData = new FormData() //Create a new instance of FormData
            formData.append('file', file) //formData.append(key, value)
    
            fetch('/api/upload', {
                method: 'POST',
                body: formData //POST formData (with selected file) as body for fetch request
            })
            .then(response => response.json())
            .then(jsonResponse => setResponse(jsonResponse)) //Save API response to useState() for use with <Edit /> component
            .catch(error => console.log(error)) //Log any fetch-related errors to the console for now.
        }
    }

    if (!response) {
        return (
            <div className="fileUploadForm">
                <h1> Select a file to upload for data classification </h1>
                <form method="POST" encType="multipart/form-data" onSubmit={handleSubmit}>
                    <input type="file" onChange={handleChange}></input><button> Upload </button>
                </form>
            </div>
        )        
    }
    else {
        return (
            <Edit

                heading={response.heading}
                fileName={response.fileName}
                nameAndSurname={response.nameAndSurname}
                contactNumber={response.contactNumber}
                emailAddress={response.emailAddress}
                idNumber={response.idNumber}
                dateOfBirth={response.dateOfBirth}
                linkedIn={response.linkedIn}
                processed={response.processed}
                saved={response.saved}
                
            />            
        )
    }
}

export default Upload