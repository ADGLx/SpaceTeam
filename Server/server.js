const express = require('express')
const app = express()
// const router = express.Router() //I did not need this, for some reason 
var PORT = 5000;

//This is needed to avoid some error on the client console
const cors = require('cors'); //This is needed I think 
app.use(cors()); //This might have been needed?

const mysql = require('mysql')

app.use(express.json());//This is used to parse what comes 

//Connecting to the db
// var db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'SQLPass1',
//     database: 'default'
// });


//This connects to the remote db
var db = mysql.createConnection({
    host: '143.198.41.117',
    user: 'admin',
    password: 'SQLPass1.',
    database: 'default'
});

db.connect(); //Change so it runs without sql
console.log("Connected to db!");

//This is to register
app.post('/register', function (req, res) {

    //Getting all the info
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const type = req.body.type;
    


   // console.log(date + " aaa"+ time);
    // I should probably wrap this for errors or sum later
    db.query(
        "INSERT INTO users(`username`, `email`, `password`, `type`) VALUES (?, ?, ?, ?);", 
        [username, email, password, type], function (error, results,fields) {
            if(error){
                console.log(error);
                res.send(false);//An error occured
              
            }
          //  console.log(results);

          //Oh wait there is no result? Or is it
          console.log("A user was registered: "+ email);
        res.send(true);
          //It is normal that the result is empty because it was inserted

        }
    )


})


//This is the login function
app.post('/login', function (req,res){

    //console.log(req.body)
    //This is what the client searches 
    const username= req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE email = ? AND password = ?", 
        [username, password], function (error, results,fields) {
            if(error){
                console.log(error);
            }
          //  console.log(results);
            //Login here
            if(results.length>0)
            {
                //Successful login
                console.log("User with ID: "+ results[0]['ID'] + " has logged in!"); //This is how we get the ID
                //This is super unsafe but its fine, ill add proper authentication later.
                //The current token is just sending all the user info
                //console.log("Sending "+JSON.stringify(results[0]))
                res.send(JSON.stringify(results[0]))
            } else 
            {
                //send message with error
                console.log("Bad");
                res.send(true) //It sends an error
            }

        }
    )

})

// Basically in here we have whatever random back end api we want 

//Basically get all user reports when logged in as a moderator
app.get("/getUserReports",(req,res)=>
{
    db.query(
        "SELECT * FROM JobListing WHERE Report = 1", 
        [], function (error, results,fields) {
            if(error){
                console.log(error);
            }
           // console.log(results);
            //Ger reminders here
            if(results.length>0)
            {
                //Send all reminders here, but first 
                res.send(JSON.stringify(results))
            } else 
            {
                //send message with error
                console.log("There are no reports to show");
                res.send("error") //It sends an error
            }
    
        })
    
})

//Deleting a posting with a user report
app.post("/deletePost", (req, res) => {
    const id = req.body['PostID']; //only the id should be deleted

    db.query(
        "DELETE FROM JobListing WHERE JobID = ?", 
        [id], function (error, results,fields) {
            if(error){
                console.log(error);
                res.send(false);
            }

            res.send(true);
    
        })
})



// Listening to the port
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
 });
//To run server just use "npm run dev"


// Registering a job listing as an employer
app.post('/create-job', function (req, res) {

    const CompanyName =req.body.CompanyName;
    const Position =req.body.Position;
    const PositionInfo = req.body.PositionInfo;
    const Report= req.body.Report;
    
    db.connect (function(error){
        if (error)throw error;
    })
    
    //Insert information into db
    db.query(
        "INSERT INTO JobListing (`CompanyName`, `Position`,`PositionInfo`,`Report` ) VALUES (?, ?, ?, ?);", 
        [CompanyName, Position, PositionInfo, Report], function
        (error, results,fields){
            if(error){
                console.error("Error creating job posting", error);
                res.sendStatus(500);
            }
            else {
                console.log("Job posting was created successfully");
                res.sendStatus(200);            
            }
            db.end();
        }
    );
})

    //Retrieve all job vacancies from job listing table
    //Send all information received to frontend
    app.post('/displayJobs', function(req, res) {

        //collect EmployerID info
        const EmployerID = req.body.EmployerID;

        db.query(
            "SELECT JobID, ApplicantName, ApplicantEmail, Position, Date FROM JobApplicants WHERE EmployerID = ?",
            [EmployerID], function (error, results, fields) {
                if(error){
                    console.log(error);
                }
                else{
                    res.send(results);
                }
            }
            )
    })


    //Receive List of job listings from db and send information to frontend
    app.get('/jobListings', function(req,res){  
        db.query(
            "SELECT * FROM JobListing",
            //"SELECT CompanyName, Position, PositionInfo, Report FROM JobListing",
            function(error, result, fields) {
                if(error){
                    console.log(error);
                }
                else{
                    res.send(result);
                }
            }
        )

    })