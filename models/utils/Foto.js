const mongoose = require('mongoose');

const FotoSchema = new mongoose.Schema({
    name: String,
    size: Number,
    key: String,
    url: String
});

module.exports = mongoose.model('fotos', FotoSchema);