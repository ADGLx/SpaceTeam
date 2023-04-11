const express = require("express");
const app = express();
const multer = require("multer");
const sharp = require("sharp");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

var PORT = 5000;

//This is needed to avoid some error on the client console
const cors = require("cors"); //This is needed I think
app.use(cors()); //This might have been needed?

const fs = require("fs");
const { CONNREFUSED } = require("dns");
const { Console } = require("console");
const { errorMonitor } = require("events");
const { send } = require("process");

app.use(express.json()); //This is used to parse what comes

//Importing DB
const db = require("./database");
db.connect(); //Change so it runs without sql
console.log("Connected to db!");

// Listening to the port
app.listen(PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", PORT);
});
//To run server just use "npm run dev"

//Retrieves method to validate user
const validateUser = require("./validateUser");

//This is to register
app.post("/api/register", upload.single("CV"), function (req, res) {
  //Getting all the info
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const type = req.body.type;
  const fileBuffer = req.file.buffer;

  if (validateUser(username, email, password)) {
    db.query(
      "INSERT INTO users(`username`, `email`, `password`, `type`, `CV`) VALUES (?, ?, ?, ?, ?);",
      [username, email, password, type, fileBuffer],
      function (error, results, fields) {
        if (error) {
          console.log(error);
          res.send(false); //An error occured
        }

        //Oh wait there is no result? Or is it
        console.log("A user was registered: " + email);
        res.send(true);
        //It is normal that the result is empty because it was inserted
      }
    );
  } else {
    console.log("Invalid user entry.");
    res.send(false);
  }
});

//This is where we import the login function
const login = require("./login.js");
app.post("/api/login", login);

//Basically get all user reports when logged in as a moderator
app.get("/api/getUserReports", (req, res) => {
  db.query(
    "SELECT * FROM JobListing WHERE Report = 1",
    [],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      // console.log(results);
      //Ger reminders here
      if (results.length > 0) {
        //Send all reminders here, but first
        res.send(JSON.stringify(results));
      } else {
        //send message with error
        console.log("There are no reports to show");
        res.send([]); //It sends an error
      }
    }
  );
});

//Deleting a posting with a user report
const deletePost = require('./deletePost.js');
app.post("/api/deletePost", deletePost);

//Edit the account
const editAccount = require('./editAccount');
const cpUpload = upload.fields([{ name: "cv" }, { name: "pf" }]);
app.post("/api/editAccount", cpUpload, editAccount);


//Import create-job function
const createJob = require("./create-job.js");
app.post("/api/create-job", createJob);

//Retrieve all job vacancies from job listing table
//Send all information received to frontend
app.post("/api/displayJobs", function (req, res) {
  //collect EmployerID info
  const EmployerID = req.body.EmployerID;
  //console.log("Showing Jobs for "+ EmployerID)

  db.query(
    "SELECT ApplicantName, ApplicantEmail, Position, Date FROM JobApplicants WHERE EmployerID = ?",
    [EmployerID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        //console.log("Sending"+ results.length)
        res.send(results);
      }
    }
  );
});

//Going to try one cv call at a time:
app.post("/api/getCV", function (req, res) {
  const name = req.body.name;
  db.query(
    "SELECT CV FROM users WHERE ID = ?",
    [name],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
        return;
      }
      // console.log(results[0].CV);
      //res.send(results);

      if (results.length > 0) {
        res.send(results[0].CV.toString("base64"));
      } else {
        console.log("CV was null?");
      }
    }
  );
});

//Getting the profile pic
app.post("/api/getPF", function (req, res) {
  const id = req.body.id;
  console.log("User Attempted to view PF: " + id);
  db.query(
    "SELECT PF FROM users WHERE id = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send("Internal server error");
        return;
      }
      // console.log(results[0].PF);
      //res.send(results);

      if (results.length > 0 && results[0].PF != null)
        res.send(results[0].PF.toString("base64"));
      else res.send(null);
    }
  );
});
//Receive List of job listings from db and send information to frontend
app.get("/api/jobListings", function (req, res) {
  db.query(
    "SELECT * FROM JobListing",
    //"SELECT CompanyName, Position, PositionInfo, Report FROM JobListing",
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});

//Report a job listing as a moderator:
const reportJob = require("./report.js");
const { stringify } = require("querystring");
app.post("/api/report", reportJob);


app.post("/api/apply", function (req, res) {
  //collect JobID info to report
  const JobID = req.body.jobID;
  const UserID = req.body.userID;
  const EmployerID = req.body.employerID;
  const CompanyName = req.body.companyName;
  const Username = req.body.username;
  const Date = req.body.date;
  const Email = req.body.email;
  const Position = req.body.position;
  //console.log(req.body);

  db.query(
    "INSERT INTO JobApplicants (JobID, ApplicantID, EmployerID, CompanyName, ApplicantName, Date, ApplicantEmail, Position) SELECT ?, ?, ?, ?, ?, ?, ?, ? WHERE NOT EXISTS (SELECT * FROM JobApplicants WHERE CompanyName = ? AND ApplicantName = ? AND Position = ?);",
    [
      JobID,
      UserID,
      EmployerID,
      CompanyName,
      Username,
      Date,
      Email,
      Position,
      CompanyName,
      Username,
      Position,
    ],
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );

  db.query(
    "UPDATE JobListing SET NumOfApplicants = NumOfApplicants + 1 WHERE Position = ?;",
    [Position],
    function (error, result) {
      if (error) {
        console.log(error);
      } else {
        //console.log('Successfully incremented number of applicants');
      }
    }
  );
});

//Request job postings page info from db
app.post("/api/JobPostings", function (req, res) {
  //Collect user info to query db
  //const CompanyName = req.body.CompanyName;
  const userID = req.body.UserID;
  // console.log(CompanyName);

  db.query(
    "SELECT Position, PositionInfo, NumOfApplicants, JobID FROM JobListing WHERE EmployerID = ?",
    [userID],
    function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
        // console.log(response);
      }
    }
  );
});
app.get("/api/search", function (req, res) {
  const searchTerm = req.query.searchTerm || "";

  db.query(
    "SELECT * FROM JobListing WHERE Position LIKE ? OR CompanyName LIKE ?",
    [`%${searchTerm}%`, `%${searchTerm}%`],
    function (error, result, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});
app.get("/api/getAllUsers", (req, res)=>{
  db.query("SELECT * FROM users", [], function(error, results, fields){
    if(error){
      console.log(error);
    } else {
      res.send(JSON.stringify(results));
    }
  });
});
app.post("/api/deleteUser", (req, res)=>{
  const id =req.body.id;

  db.query("DELETE FROM users WHERE id = ?", [id], function(error, results, fields)
  {
    if(error){
      console.log(error);
    } else{
      res.send(true);
    }
  });
});

app.get("/get/getFlaggedJobs", (req, res)=>{
  db.query(
    "SELECT * FROM JobListing WHERE Report = 1", [], function(error, results, fields){
      if(error){
        console.log(error);
      } else {
        res.send(JSON.stringify(results));
      }
    }
  );
});
app.get("/api/AllJobPostings", function (req, res) {
  db.query(
    "SELECT Position, PositionInfo, NumOfApplicants, JobID FROM JobListing",
    function (err, response) {
      if (err) {
        console.log(err);
      } else {
        res.send(response);
      }
    }
  );
});
app.get("/api/getAllApplications", function (req, res) {
  db.query(
    "SELECT ApplicantName, ApplicantEmail, Position, Date FROM JobApplicants",
    function (error, results, fields) {
      if (error) {
        console.log(error);
      } else {
        res.send(results);
      }
    }
  );
});
