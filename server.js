const express = require('express')
const Datastore = require('nedb')
const bodyParser = require('body-parser')
const path = require('path')
const ics = require('ics')
const nodemailer = require('nodemailer');
const fs = require('fs')
const cors = require('cors')

const PORT = process.env.PORT || 4000;
let db = new Datastore({ filename: './db/tf.db', autoload: true });

const app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cors())
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "/dist")));

const transporter = nodemailer.createTransport({

  // host: "smtp-mail.outlook.com", // hostname
  // secureConnection: false, // TLS requires secureConnection to be false
  // port: 587,
  // auth: {
  //   user: 'sejal@techforce.ai',
  //   pass: 'jarvis1995'
  // },
  // tls: {
  //   ciphers: 'SSLv3'
  // }


  service: "hotmail",
  auth: {
    user: 'sjljarvis@outlook.com',
    pass: 'q1w2e3r4t5y6'
  },


});

// var transporter = nodemailer.createTransport('smtp://sjljarvis%40outlook.com:jarvis1995@smtp-mail.outlook.com');

app.get("/slots", (req, res) => {
  db.find({}, (err, docs) => {
    docs = docs.sort((a, b) => { return a.count - b.count })
    res.json({ status: true, slots: docs })
  })
})

app.get("/slots/fill", (req, res) => {
  db.remove({}, { multi: true }, (err, docs) => {
    db.insert(generateSlots(), (err, docs) => {
      res.json(docs)
    })
  })
})

app.get("/book/:_id", (req, res) => {
  let { _id } = req.params;
  let { email } = req.query;
  db.findOne({ _id }, (err, doc) => {
    if (doc.booked) {
      res.json({ status: false, message: "slot booked already" })
    }
    else {
      let event = generateEvent(doc);
      sendEmail(event, email, (err, result) => {
        if (!err) {
          db.update({ _id }, { $set: { booked: true } }, (err, result) => {
            res.json({ message: "meeting confirmed", err, result })
          })
        }
      })
    }
  })
})


app.listen(PORT, () => {
  console.log("server running at port", PORT)
})



//Helpers 


let event_meta = {
  title: "techforce.ai platform demo",
  duration: { hours: 1 },
  description: 'Short introduction to techforce.ai SaaS',
  url: 'https://digitamize.my.webex.com/join/techforce.ai',
  categories: ["Meeting"],
  status: 'CONFIRMED',
  organizer: { name: 'Vijay Navaluri', email: 'vj@techforce.ai' },
  attendees: [
    { name: "Sejal", email: 'sejal@techforce.ai', rsvp: true },
    { name: 'Vijay Navaluri', email: 'vj@techforce.ai', rsvp: true },
    { name: "hari", email: 'hari@techforce.ai', rsvp: true }
  ]
}

function generateSlots() {
  let slots = [];
  let count = 0;
  let timeSlots = [9, 12, 15, 18, 21]
  let todaysDate = new Date();
  for (let i = 1; i <= 5; i++) {
    let _date = addDays(todaysDate, i);
    timeSlots.forEach(time => {
      count++
      slots.push({ time, date: _date, booked: false, count })
    })
  }
  return slots
}

function addDays(startDate, numberOfDays) {
  return new Date(startDate.getTime() + (numberOfDays * 24 * 60 * 60 * 1000)).toLocaleDateString();
}

function generateEvent(doc) {

  let temp = doc.date.split("-")
  let year = parseInt(temp[0])
  let month = parseInt(temp[1])
  let day = parseInt(temp[2])

  let start = [year, month, day, doc.time]

  return Object.assign({}, event_meta, { start })
}

function sendEmail(event, email, callback) {
  ics.createEvent(event, (error, value) => {
    if (error) {
      console.log(error)
    }
    
    let mailOptions = {
      from: "sjljarvis@outlook.com", // sender address
      to: `${email},sejal@techforce.ai,vj@techforce.ai,hari@techforce.ai`, // list of receivers
      subject: 'techforce.ai SaaS Demo', // Subject line
      html: `
      <h4>Hey !!</h4>
      <p>Please add calendar event and join conference call here : <a href="https://digitamize.my.webex.com/join/techforce.ai" target="_blank">https://digitamize.my.webex.com/join/techforce.ai </a> </p>`,
      icalEvent: {
        filename: 'invitation.ics',
        method: 'request',
        content: value
      }
    };

    transporter.sendMail(mailOptions, function (err, info) {
      console.log(err)
      if (err)
        callback(err, null)
      else
        callback(null, info)
    });

  })
}
