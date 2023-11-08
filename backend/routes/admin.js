const express = require('express');
const adminSchema = require('../models/admin');
const router = express.Router();




//create a activity
router.post('/admin', async (req, res) => {
    const admin = adminSchema(req.body);
    try {
        const adminName = await adminSchema.findOne({ name: admin.name });
        const adminPassword = await adminSchema.findOne({ password: admin.password });
        if (!adminName || !adminPassword) {
            return res.json({ exists: false })
        } else {
            return res.json({ exists: true })
        }
    }
    catch (error) {
        console.error(error);
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