// server.js

// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var autoIncrement = require("mongoose-auto-increment"); // MAI for mongoose
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var date = new Date();

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());


// Connect to MongoDB via Mongoose
var dbconnect = mongoose.connect('mongodb://@ds036577.mlab.com:36577/jct2', {
    user: "db_backend",
    pass: "password123",
    useMongoClient: true
});

// Initialize MAI
autoIncrement.initialize(dbconnect);

// MongoDB: define schema of models
var ticketSchema = new mongoose.Schema({
    ticID       : Number,           //unique, a-i
    subject     : String,
    body        : [{                //subschema
        body       : String,
        date       : {type: Date, default: Date.now}, 
        updatedBy  : Number
        }],
    lastUpdate  : { type: Date, default: Date.now },
    openDate    : Date,
    status      : String,
    custID      : Number
});
var customersSchema = new mongoose.Schema({
    custID      : Number,           //unique, a-i
    firstName   : String,
    midName     : String,
    lastName    : String,
    phone       : String,
    addrLine1   : String,
    addrLine2   : String,
    city        : String,
    postalCode  : String,
    country     : String
});

// applying auto increment to models
ticketSchema.plugin(autoIncrement.plugin, {
    model   : 'Ticket',
    field   : 'ticID',
    startAt : 1
});
customersSchema.plugin(autoIncrement.plugin, {
    model   : 'Customer',
    field   : 'custID',
    startAt : 1
});

// define model =================
var Ticket = mongoose.model('Ticket', ticketSchema);
var Customer = mongoose.model('Customer', customersSchema);

// create ticket
app.post('/api/tickets', function(req, res) {

    // create a ticket
    Ticket.create({
        subject     : req.body.subject,
        body        : [{               
            body       : req.body.body,
            date       : req.body.time
            }],
        lastUpdate  : req.body.time,
        openDate    : req.body.time

    });
});

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");