const express = require('express')
const addDevis = require('../controller/devis.controller')
const router = express.Router()

router.post('/api/devis', addDevis)

module.exports = router