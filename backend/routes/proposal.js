const express = require('express');
const proposalSchema = require('../models/proposal');
const router = express.Router();

//create a proposal
router.post('/proposal', (req, res) => {
    const proposal = proposalSchema(req.body);
    proposal
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})
//get all proposals
router.get('/proposals', (req, res) => {
    res.send('¡Hola, Prop!');
    
    proposalSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});


module.exports = router;