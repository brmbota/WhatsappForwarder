//MODULES
const fs = require("fs");
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');
dotenv.config();

const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
        user: process.env.email, // generated ethereal user
        pass: process.env.pass, // generated ethereal password
    },
});
const client = new Client();

client.on('qr', (qr) => {
    // Generate and scan this code with your phone
    qrcode.generate(qr, { small: true });
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    msg.reply('Trenutno sam nedostupan, javljam ti se kasnije! -WhatsappForwarder'); //reply msg that you're unavailable

    const user = await msg.getContact();

    let MailMessage = {                                                             //Forming mail
        from: process.env.email,
        to: process.env.receiver,                                                   //user.name is how you saved Contact name
        subject: user.name + "[+" + user.id.user + "]" + " ti je poslao poruku!",   //user.id.user is contact number
        text: `${user.name} kaze:                                                   
            "${msg.body}"`                                                          //msg.body is content of message
    }
    transporter.sendMail(MailMessage, (err, info) => {                              //sending mail
        if (err) {
            console.log(err);
        }
        else {
            console.log("Email sent: " + info.response);

            let date = new Date();
            let logtxt =
                `---------------------------------------------
${date} --- ${info.response}
${user.name}/+${user.id.user} => ${msg.body}
---------------------------------------------`;

            fs.appendFile("log.txt", logtxt, "utf-8", (error) => {                            //log for every email sent
                if (error) throw error;
            });
        }
    });

});

client.initialize();