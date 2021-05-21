const mongoose = require('mongoose')

const Schema = mongoose.Schema
const targetSchema = new Schema({
    name: String
})

module.exports = mongoose.model('Todo', targetSchema)