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
    id:{
       type: Number,
        required: true
    }
});

module.exports = mongoose.model('Activity', activitySchema);
