const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgPath: {
        type: String, 
        required: false
    },
    
});

module.exports = mongoose.model('Activity', activitySchema);
