const express = require('express');
const sessionSchema = require('../models/session');
const router = express.Router();


//create a activity
 router.post('/session', (req, res) => {
    const activity = activitySchema(req.body);
    activity
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})

//get all activities
router.get('/session', (req, res) => {
    
    sessionSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});
/*
startProposal(number proposalId): int sessionId
getNextActivity(number sessionId, number activityPosition): activity nextActivity
postActivityReaction(number sessionId, number activityPosition, number reaction)
getPodium(number sessionId): activity[] activityList
finishSession(number sessionId)
 */
 

module.exports = router;