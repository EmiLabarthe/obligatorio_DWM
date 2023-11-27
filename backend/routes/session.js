const express = require('express');
const proposalSchema = require('../models/proposal');
const sessionSchema = require('../models/session');
const router = express.Router();

router.get('/sessions/rankingb/:id', async (req, res) => {
    try{
        const sessionId = req.params.id;

        const session = await sessionSchema.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Sesión no encontrada' });
        }
        console.log(session)

        const uniqueReactions = session.reactionList.map(reaction => ({
            idAct: reaction.idAct,
            votes: [...new Set(reaction.votes)].length
          }));

        res.json(uniqueReactions)
    }catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
})

function cleanVotes(reactionList) {
    const uniqueVotesLengths = {};

    reactionList.forEach(reaction => {
        const reactionId = Object.keys(reaction)[0];
        const votes = Object.values(reaction)[0];

        // Calcular la longitud de votos únicos para cada ID
        const uniqueUsers = [...new Set(votes)];
        const length = uniqueUsers.length;

        // Agregar al objeto de resultados
        uniqueVotesLengths[reactionId] = length;
    });

    return uniqueVotesLengths;
}

router.get('/sessions/ranking/:id', async (req, res) => {
    try{
        const sessionId = req.params.id;

        const session = await sessionSchema.findById(sessionId)
        if (!session) {
            return res.status(404).json({ error: 'Sesión no encontrada' });
        }
        console.log(session)

        const reactionList = {};
        for (const actividad in session.reactionList) {
            if (typeof session.reactionList[actividad] === 'object' && session.reactionList[actividad] !== null) {
                console.log("pre", session.reactionList[actividad])
                const usuarios = Object.values(session.reactionList[actividad]);
                // Eliminar votos duplicados pasando a Set
                const votosSinDuplicados = Array.from(new Set(usuarios.flat()));
                reactionList[actividad] = votosSinDuplicados;
                console.log("post", session.reactionList[actividad])
                
            } else {
                console.error('La propiedad no es un diccionario:', session.reactionList[actividad]);
            }
        }

        const actividadesConVotos = Object.entries(reactionList).map(([actividad, votos]) => ({
            actividad,
            votos: votos.length
        }));
        const actividadesOrdenadas = actividadesConVotos.sort((a, b) => b.votos - a.votos);
    
        res.status(200).json(actividadesOrdenadas);
    } catch (error) {
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