const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    code:{
        type: Number
    },
    proposal:{ 
        type: mongoose.Schema.Types.ObjectId, ref: 'Proposal' 
    },
    reactionList:{
        type:Array,
    },
    currentPosition:{
        type:Number
    },
    active:{
        type:Boolean
    }
});

module.exports = mongoose.model('Session', sessionSchema);
