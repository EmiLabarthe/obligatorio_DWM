const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    proposalTemplateId:{
        type: String
        
    }
});

module.exports = mongoose.model('Session', sessionSchema);
