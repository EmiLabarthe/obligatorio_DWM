const express = require('express');
const activitySchema = require('../models/activity');
const router = express.Router();




//create a activity
router.post('/activity', (req, res) => {
    const activity = activitySchema(req.body);
    activity
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})
//get all activities
router.get('/activities', (req, res) => {
    
    activitySchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});
router.get('/activity/byId/:id', (req, res) => {
    const {id} = req.params;
    activitySchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});


module.exports = router; 