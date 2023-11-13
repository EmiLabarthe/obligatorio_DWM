const express = require('express');
const adminSchema = require('../models/admin');
const authUtils=require('../middleware/jwtAuth');
const router = express.Router();





router.post('/login', async (req, res) => {
    const admin = adminSchema(req.body);
    const token =  authUtils.generateToken("admin");
    
    try {
        const adminName = await adminSchema.findOne({ name: admin.name });
        const adminPassword = await adminSchema.findOne({ password: admin.password });
        if (!adminName || !adminPassword) {
            return res.json({ exists: false });
        } else {

            return res.json({ exists:true, token: token });
        }
    }
    catch (error) {
        console.error(error);
        console.log(token);
        return res.status(500).json({ message: 'Server error' });
        
    }

    /*
    admin
        .save()
        .then((data)=> res.json(data))
        .catch((err)=> res.json({message: err}));
    */
})



module.exports = router;