const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { request, response } = require('express');
dotenv.config();

const dbService = require('./dbService');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// create data
// app.post('/insert', (request, response) => {

// });


// Read data
app.get('/getData',(request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.getAllData();
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

// Read single element
app.get('/getItem/:email', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const {email} = request.params;

    const result = db.getSelectedData(email);

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
});

//Create new entry in the table
app.post('/insert', (request, response) => {
    const {name, email, password } = request.body;
    const userData = [name, email, password];
    const db = dbService.getDbServiceInstance();

    const result = db.storeUserData(userData);

    result
    .then(data => response.json({success: true}))
    .catch(err => console.log(err));
});

// Read liked leagues column
app.get('/getLeagues/:email', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const {email} = request.params;

    const result = db.getUserLeagues(email);
    
    result
    .then(data => response.json({data:data}))
    .catch(err => console.log(err));
});

// Update user liked leagues 
app.post('/storeLeagues', (request, response) => {
    const {str, email} = request.body;
    const userData = [str,email];

    const db = dbService.getDbServiceInstance();

    const result = db.storeUserLeagues(userData);

    result
    .then(data => response.json({success:true}))
    .then(err => console.log(err));
});

app.listen(process.env.PORT, () => {
    console.log('backend is running');
})