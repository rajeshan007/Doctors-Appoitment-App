const express = require('express')
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors')
const configureDB = require('./config/db')

const usersCtrl = require('./app/controllers/userCtrl')
const authentication = require('./app/middlewares/authentication')
const doctorCtrl = require('./app/controllers/doctorCtrl')




doctorCtrl
port = process.env.PORT
const app = express()
app.use(express.json())
app.use(cors())

configureDB()



app.post('/api/users/register', usersCtrl.register)
app.post('/api/users/login', usersCtrl.login)
app.post('/api/users/getUser', authentication, usersCtrl.getUser)

app.post('/api/users/apply-doctor', authentication, doctorCtrl.register)
app.post("/api/user/mark-all-notifications-as-seen", authentication, doctorCtrl.markAllNotificationsAsSeen)
app.post("/api/user/delete-all-notifications", authentication, doctorCtrl.deleteAllNotifications)

app.listen(port, () => {
    console.log(`server is running on port ${process.env.PORT}`)
})
