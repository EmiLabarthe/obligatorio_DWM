const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    image: {
        type: String, 
        required: false
    },
    text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Activity', activitySchema);
