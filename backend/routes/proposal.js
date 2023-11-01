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
    proposalSchema
        .find()
        .populate('activities') 
        .exec()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});

// get proposal by ID
// PASAR ID DE MONGO PORQUE LA HARDCODEADA ROMPE TUTI
router.get('/proposal/:id', (req, res) => {
    const proposalId = req.params.id;

    proposalSchema.findById(proposalId)
        .populate('activities')
        .exec()
        .then((proposal) => {
        if (!proposal) {
            return res.status(404).json({ message: 'Propuesta no encontrada' });
        }
        res.json(proposal);
        })
        .catch((error) => res.status(500).json({ message: error }));
})

module.exports = router;