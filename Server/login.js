const express = require('express')
const app = express()
const db = require('./database')

//This is the login function
async function login(req,res) {
    const username = req.body.username;
    const password = req.body.password;
    db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }
        if (results.length > 0 && username != "" && password != "") {
          //Successful login
          console.log("User with ID: " + results[0]["ID"] + " has logged in!"); 
          res.status(200).send(JSON.stringify(results[0]));
        } else {
          //send message with error
          console.log("Invalid Login");
          res.status(401).send(true); //It sends an error
        }
      }
    );
  }

module.exports = login
