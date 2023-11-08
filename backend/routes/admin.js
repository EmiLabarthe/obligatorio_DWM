const express = require('express');
const adminSchema = require('../models/admin');
const router = express.Router();




//create a activity
router.post('/admin', (req, res) => {
    const admin = adminSchema(req.body);
    admin
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    
})



module.exports = router;