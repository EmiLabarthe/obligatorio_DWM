const express = require('express');
const proposalSchema = require('../models/proposal');
const sessionSchema = require('../models/session');
const router = express.Router();

// Generar ranking de actividades
router.get('/sessions/ranking/:id', async (req, res) => {
    try{
        const sessionId = req.params.id;

        const session = await sessionSchema.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Sesión no encontrada' });
        }
        console.log(session)

        const votes = session.reactionList.map(reaction => ({
            idAct: reaction.idAct,
            votes: [...new Set(reaction.votes)].length
          }));

        const sortedVotes = votes.sort((a, b) => b.votes - a.votes);

        res.json(sortedVotes)
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
})

//create a session
 router.post('/sessions', async (req, res) => {
    try{
        const proposalId = req.body._id;
        const proposalExistente = await proposalSchema.findById(proposalId);

        if (proposalExistente)  {
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




module.exports = router;