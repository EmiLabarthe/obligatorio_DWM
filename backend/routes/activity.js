const express = require('express');
const activitySchema = require('../models/activity');
const router = express.Router();
const authUtils=require('../middleware/jwtAuth');




//create a activity
router.post('/activities', async (req, res) => {
    console.log("llego al endpoint");
    try {

        console.log(req.body);
        let title = req.body.title;
        let imgPath = req.body.imgPath;

        const existingActivity = await activitySchema.findOne({ title: title });
        if (existingActivity) {
            return res.status(409).json({ message: 'Activity already exists' });
        }
       
        const nuevaActivity = new activitySchema({
            title: title,
            imgPath: imgPath
        });

        const data = await nuevaActivity.save();
        res.status(201).json({ mensaje: 'Activity creada exitosamente', data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor al crear la activity' ,data});
    }
});

//get all activities
router.get('/activities', (req, res) => {
    
    activitySchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message:error}))
});


module.exports = router;