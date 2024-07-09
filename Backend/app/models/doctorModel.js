const mongoose = require('mongoose')
const { Schema, model } = mongoose

const doctorSchema = Schema({

    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    feesPerConsultation: {
        type: Number,
        required: true
    },
    timings: {
        type: Array,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    }

})

const Doctor = model('Doctor', doctorSchema)

module.exports = Doctor