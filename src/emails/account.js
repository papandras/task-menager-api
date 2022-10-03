const sgMail = require('@sendgrid/mail')
const apiKey = process.env.SG_API_KEY

sgMail.setApiKey(apiKey)


/**
 * 
 * @param {String} email 
 * @param {String} name 
 */
const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'papa@hermeszsoft.hu',
        subject: 'Thanks for joining in!',
        text: `Welcoma to the app ${name}. Let me know how you ge talong with the app.`
    })
}


/**
 * 
 * @param {String} email 
 * @param {String} name 
 */
const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'papa@hermeszsoft.hu',
        subject: 'Sorry to see you go!',
        text: `Sorry to see you go ${name}. Let me know what's wrong with the app.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}