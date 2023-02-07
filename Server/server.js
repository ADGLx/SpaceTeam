const express = require('express')
const app = express()
// const router = express.Router() //I did not need this, for some reason 
var PORT = 5000;

//This is needed to avoid some error on the client console
const cors = require('cors'); //This is needed I think 
app.use(cors()); //This might have been needed?

const mysql = require('mysql')

app.use(express.json());//This is used to parse what comes 

//This should always trigger
// router.use('/user/:id', (req, res, next) => {
//     console.log('Request URL:', req.originalUrl)
//     next()
//   }, (req, res, next) => {
//     console.log('Request Type:', req.method)
//     next()
//   })

//Connecting to the db
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'admin',
    database: 'default'
});

db.connect();
console.log("Connected to db!");


//This is the login function
app.post('/login', function (req,res){

    //console.log(req.body)
    //This is what the client searches 
    const username= req.body.username;
    const password = req.body.password;
    db.query(
        "SELECT * FROM users WHERE username = ? AND password = ?", 
        [username, password], function (error, results,fields) {
            if(error){
                console.log(error);
            }
          //  console.log(results);
            //Login here
            if(results.length>0)
            {
                //Successful login
                console.log("User with ID: "+ results[0]['id'] + " has logged in!"); //This is how we get the ID
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

//This is to setReminders
app.post('/setReminder', function (req, res) {

    const userID = req.body.userID;
})

// Basically in here we have whatever random back end api we want 
app.get("/api", (req,res)=>{
    res.json({
        "users": ["obamo", "trolito", "juan"]
    })
})

// Listening to the port
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
 });
//To run server just use "npm run dev"