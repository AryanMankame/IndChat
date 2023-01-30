const mongoose = require('mongoose')
const Person = mongoose.Schema({
    name:String,
    age:Number
})
module.exports = mongoose.model('person',Person)