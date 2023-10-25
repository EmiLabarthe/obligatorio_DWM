const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    image: {
        type: Image,
        required: true
    },
    text: {
        type: String,
        required: false
    }
});

module.exports = mongoose.model('Activity', activitySchema);