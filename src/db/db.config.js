const mongoose = require('mongoose')

const connexion = async () => {
    try {
        const rep = await mongoose.connect(process.env.MONGO_URI)
        console.log(`Connexion réusiie à la BD : ${rep.connection.name}`);
    } catch (error) {
        console.log(`Erreur lors de la connexion : ${error.message}`);
    }
}

module.exports = connexion