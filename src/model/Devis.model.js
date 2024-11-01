const mongoose = require('mongoose')

const devisSchema = new mongoose.Schema({
    nom: {type: String, required: true},
    prenom: {type: String, required: true},
    phone: {type: String, required: true},
    email: {type: String, required: true},
    demande: {type: String, required: true}
})

module.exports = mongoose.model("Devis", devisSchema)