const express = require('express');
const proposalSchema = require('../models/proposal');
const sessionSchema = require('../models/session');
const router = express.Router();



//create a session
 router.post('/sessions', async (req, res) => {
    try{
        const proposalId = req.body._id;
        const proposalExistente = await proposalSchema.findById(proposalId);

        if (proposalExistente) {
            const nuevaSession = new sessionSchema({
                code: 10,
                proposal: proposalExistente,
                reactionList: [],
                currentPosition: 23,
                active: true,
            });
        const data = await nuevaSession.save();
        res.status(201).json({ mensaje: 'Sesión creada exitosamente', _id: data._id });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al crear la sesión' });
    }
})

//get all sessions
router.get('/sessions', (req, res) => {
    
    sessionSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});

// get session by id
router.get('/sessions/:id', (req, res) => {
    const sessionId = req.params.id;

    sessionSchema.findById(sessionId)
        //.populate('proposals')
        .exec()
        .then((session) => {
        if (!session) {
            return res.status(404).json({ message: 'Propuesta no encontrada' });
        }
        res.json(session);
        })
        .catch((error) => res.status(500).json({ message: error }));
})

// post a reaction
router.post('/sessions/:id',async (req, res) => {
    try{
        const activityId = req.body._id;
        const sessionId = req.params.id;
        const user = req.body.user;
        const sessionVote = await sessionSchema.updateOne({ code:sessionId, "reactionList.idAct": activityId},
        { $addToSet: { 'reactionList.$.votes': user}  });
        if (sessionVote.modifiedCount > 0) {
            res.status(200).json({ message: 'User added to reactionList successfully' });
        } else {
            res.status(404).json({ message: 'Activity ID not found or user already exists in the list' });
        }
    }catch(error){
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al crear la sesión' });
    }
})

module.exports = router;