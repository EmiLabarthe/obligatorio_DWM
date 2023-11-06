const mongoose = require('mongoose');

const activityReactedSchema = new mongoose.Schema({
    sessionId: {
        type: String, 
        required: true
    },
    activityPosition: {
        type: Number,
        required: true
    },
    reaction: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('activityReacted', activitySchema);
