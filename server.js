// import our dependancies
const express = require("express");
const app = express()
const mysql =require('mysql2');
const dotenv = require('dotenv')



//cors and ejs


//configure environment variable
dotenv.config();
// create a connection object
const db = mysql.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME

})

//Test the connection.
db.connect((err) =>{
    //connection not succesfull
    if(err){
        return console.log('error connecting to the database', err)
    }
    console.log('succesfully connected to MYSQL:', db.threadId)
})






//endpoints

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


//Retrieve all patients
app.get('/patients', (req, res)=> {
    const getPatients = "SELECT first_name, last_name, date_of_birth  FROM patients"
    db.query(getPatients, (err, data)=>{
        // check if i have an error
        if(err){
            return req.status(400).send("Failed to get patients", err)
        }
            
        res.status(200).render('data', {data}) 
    })
})
//2.Retrieve all providers
app.get('/providers', (req, res)=> {
    const getProviders = "SELECT provider_id, first_name, last_name, provider_specialty  FROM providers"
    db.query(getProviders, (err, data)=>{
        // check if i have an error
        if(err){
            return req.status(400).send("Failed to get providers", err)
        }
            
        res.status(200).render('data', {data}) 
    })
})
//3. Filter patients by First Name
app.get('/patients', (req, res)=> {
    const getPatients = "SELECT  patient_id, first_name, last_name  FROM providers WHERE first_name = ?"
    db.query(getPatients, (err, data)=>{
        // check if i have an error
        if(err){
            return req.status(400).send("Failed to get patients by first name", err)
        }
            
        res.status(200).render('data', {data}) 
    })
})
//4. Retrieve all providers by their specialty
app.get('/providers', (req, res)=> {
    const getProviders = "SELECT  provider_id, first_name, last_name  FROM providers WHERE provider_specialty = ?"
    db.query(getProviders, (err, data)=>{
        // check if i have an error
        if(err){
            return req.status(400).send("Failed to get providers by povider specialty", err)
        }
            
        res.status(200).render('data', {data}) 
    })
})



// start and listen to the server
const PORT = 3700;
app.listen(3700,() => {
    console.log('server is running on port 3700 ...')
});
