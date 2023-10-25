const mongoose = require('mongoose');

const proposalSchema = mongoose.Schema({
    title: {
        typeof: String,
        required: true
    },
    activities:{
        
    }
})