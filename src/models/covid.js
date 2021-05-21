const mongoose = require('../database');

const CovidSchema = new mongoose.Schema({
    country: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    confirmed:{
        type: String,
        required:true,
    },
    recovered:{
      type: String,
      required: true,
    },
    deaths:{
      type: String,
      required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Covid = mongoose.model('Covid', CovidSchema);

module.exports = Covid;