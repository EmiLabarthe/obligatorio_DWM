const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    id:{
        type: String,
        required: true
    },
    proposalTemplateId:{
        type: String,
        required:true
    },
    reactionList:{
        type:Array,
    },
    currentPosition:{
        type:Number
    },
    active:{
        type:Boolean,
        required:true
    }
});

module.exports = mongoose.model('Session', sessionSchema);
