const express = require('express');
const router = express.Router();

router.post('/signalData', (req, res) => {
    const { gpsData, signalStrength } = req.body;
    // Processa os dados conforme necessário
    console.log(`GPS Data: ${gpsData}, Signal Strength: ${signalStrength}`);
    res.status(200).send('Data received');
});

module.exports = router;
