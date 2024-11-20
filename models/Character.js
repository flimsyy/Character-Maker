const mongoose = require ('mongoose')

const characterSchema = new mongoose.Schema({
    name: String, 
    attack: Number, 
    defense: Number, 
    health: Number, 
    description: String
})

module.exports = mongoose.model('Character', characterSchema);