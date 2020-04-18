const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: String,
    image_url: String,
    description: String
});

module.exports = mongoose.model("Pet", petSchema);