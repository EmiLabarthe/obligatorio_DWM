const express = require('express');
const activitySchema = require('../models/activity');
const router = express.Router();
const authUtils=require('../middleware/jwtAuth');




//create a activity
router.post('/activity', /*authUtils.verifyToken*/(req, res) => {
    const activity = activitySchema(req.body);
    activity
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})
//get all activities
router.get('/activities', /*authUtils.verifyToken*/ (req, res) => {
    
    activitySchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});


module.exports = router;