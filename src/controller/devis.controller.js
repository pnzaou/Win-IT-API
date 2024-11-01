const Devis = require('../model/Devis.model')
const nodemailer = require('nodemailer')
const fs = require('fs')
const path = require('path')
require('dotenv').config()
const app_password = process.env.APP_PASSWORD
const sender = process.env.SENDER
const receiver = process.env.RECEIVER

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: sender,
        pass: app_password
    }
})

const emailTemplatePath = path.join('src', 'mail', 'mail.html')
const emailTemplate = fs.readFileSync(emailTemplatePath, 'utf8')

const addDevis = async (req, res) => {
    const { nom, prenom, phone, email, demande } = req.body
    try {
        const rep = await Devis.create({
            nom,
            prenom,
            phone,
            email,
            demande
        })
        const msg = "Votre demande à été envoyée avec succès."

        const emailContent = emailTemplate
            .replace('{{ nom }}', nom)
            .replace('{{ prenom }}', prenom)
            .replace('{{ phone }}', phone)
            .replace('{{ email }}', email)
            .replace('{{ demande }}', demande)
         
        const mailOptions = {
            from: sender,
            to: receiver,
            subject: 'Demande de devis',
            html: emailContent
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if(err) {
                console.log("Erreur lors de l'envoie du mail", err);
            } else {
                console.log('Email envoyé : ' + info.response);
            }
        })
            
        return res.status(201).json({message: msg, data: rep});
    } catch (error) {
        const msg = "Erreur lors de l'envoie de la demande !"
        return res.status(500).json({message: msg, erreur: error})
    }
}

module.exports = addDevis