const express = require('express');
const sessionSchema = require('../models/session');
const router = express.Router();


//create a activity
/* router.post('/activity', (req, res) => {
    const activity = activitySchema(req.body);
    activity
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})
*/
//get all activities
router.get('/session', (req, res) => {
    
    sessionSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});
 

module.exports = router;