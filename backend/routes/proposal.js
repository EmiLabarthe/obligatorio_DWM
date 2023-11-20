const express = require('express');
const proposalSchema = require('../models/proposal');
const activitySchema = require('../models/activity');
const router = express.Router();
const authUtils = require('../middleware/jwtAuth');


//create a proposal
router.post('/proposals', authUtils.verifyToken, async (req, res) => {
    console.log("llego al endpoint");
    try {
        let arrayActividades = [];
        console.log(req.body);
        let actividades = req.body.activities;


        // Extract title from the array
        const proposalTitle = req.body.title;

        for (const element of actividades) {
            arrayActividades.push(await activitySchema.findOne({ title: element }));
        }

        console.log(arrayActividades);
        console.log(proposalTitle);
        const nuevaProposal = new proposalSchema({
            title: proposalTitle,
            activities: arrayActividades
        });

        const data = await nuevaProposal.save();
        res.status(201).json({ mensaje: 'Proposal creada exitosamente', _id: data._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al crear la proposal' });
    }
});

//get all proposals
router.get('/proposals', authUtils.verifyToken, (req, res) => {
    proposalSchema
        .find()
        .populate('activities')
        .exec()
        .then((data) => res.json(data))
        .catch((error) => res.json({ message: error }))
});

// get proposal by ID
// PASAR ID DE MONGO PORQUE LA HARDCODEADA ROMPE TUTI
router.get('/proposal/:id', authUtils.verifyToken, (req, res) => {
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