import React from 'react'

class Edit extends React.Component{
    constructor() {
        super()
        this.state = {
            heading: '',
            fileName: '',
            nameAndSurname: '',
            contactNumber: '',
            emailAddress: '',
            idNumber: '',
            dateOfBirth: '',
            linkedIn: '',
            metadata: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e){
        e.preventDefault()
        let formData = new FormData()
        for (const [key, value] of Object.entries(this.state)){
            formData.append(key, value)
        }

        fetch('/api/save', {
            method: 'POST', 
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            this.setState({metadata: true})
            console.log(data)
        })
        .catch(error => console.log(error))
    }

    componentDidMount() {
        this.setState({
            heading: this.props.heading,
            fileName: this.props.fileName,
            nameAndSurname: this.props.nameAndSurname,
            contactNumber: this.props.contactNumber,
            emailAddress: this.props.emailAddress,
            idNumber: this.props.idNumber,
            dateOfBirth: this.props.dateOfBirth,
            linkedIn: this.props.linkedIn
        })
    }

    render() {
        if (!this.state.metadata) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h1> {this.state.heading} </h1>
                        <label>
                            Name and Surname: <input type="text" name="nameAndSurname" value={this.state.nameAndSurname} width="100%" onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <label>
                            Contact Number: <input type="text" name="contactNumber" value={this.state.contactNumber} onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <label>
                            Email Address: <input type="text" name="emailAddress" value={this.state.emailAddress} onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <label>
                            ID Number: <input type="text" name="idNumber" value={this.state.idNumber} onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <label>
                            Date of Birth: <input type="text" name="dateOfBirth" value={this.state.dateOfBirth} onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <label>
                            LinkedIn: <input type="text" name="linkedIn" value={this.state.linkedIn} onChange={this.handleChange}></input>
                        </label>
                        <br></br>
                        <button> Save </button>
                    </form>                
                </div>  
            )
        }
        else {
            return (
                <div>
                    <h1> File metadata saved! </h1>
                    <br></br>
                    <div>  
                        File Name: {this.state.fileName === '' ? "true" : "false"} <br></br>
                        Name and Surname: {this.state.nameAndSurname === '' ? "true" : "false"} <br></br>
                        Email Address: {this.state.emailAddress === '' ? "true" : "false"} <br></br>
                        ID Number: {this.state.idNumber === '' ? "true" : "false"} <br></br>
                        Contact Number: {this.state.contactNumber === '' ? "true" : "false"} <br></br>
                        LinkedIn: {this.state.linkedIn === '' ? "true" : "false"} <br></br>
                        Date of Birth: {this.state.dateOfBirth === '' ? "true" : "false"} <br></br>
                    </div>
                </div>
            )
        }
    }
}

export default Edit