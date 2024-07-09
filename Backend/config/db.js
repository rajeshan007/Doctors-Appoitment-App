const mongoose = require('mongoose') 
const configureDB = async () => {
    try {
        const url = process.env.DB_URL || 'mongodb://127.0.0.1:27017'
        const dbName = process.env.DB_NAME || 'doc-app-portfolio'
        const db = await mongoose.connect(`${url}/${dbName}`)
        console.log(`connected to db ${process.env.DB_NAME}`)
    } catch(e) {
        console.log('error connecting to db')
    }
}

module.exports = configureDB