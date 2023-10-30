const mongoose = require('mongoose');

const proposalSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
        }
});

module.exports = mongoose.model('Proposal', proposalSchema);
