const express = require("express");
const app = express();
const db = require("./database");

async function editAccount(req, res) {
  //Getting all the info
  const userID = req.body.ID;
  const username = req.body.username;
  const email = req.body.email;

  //Have here a check to make sure it is not empty, if it is empty just send an error back
  if ((username == "") | (email == "")) {
    console.log("Attempted to edit wrong account!");
    res.status(403).send(false);
    return;
  }

  var fileBuffer1 = "";
  if (req.files["cv"] != null) fileBuffer1 = req.files["cv"][0].buffer;

  var fileBuffer2 = "";
  if (req.files["pf"] != null) fileBuffer2 = req.files["pf"][0].buffer;
  db.query(
    "UPDATE users SET username = ?, email = ?, CV = ?, PF= ?  WHERE ID = ?;",
    [username, email, fileBuffer1, fileBuffer2, userID],
    function (error, results, fields) {
      if (error) {
        console.log(error);
      }
      if (results.length === 0) {
        console.log("Wrong query input!");
        res.status(500).send(false);
      } else {
        console.log("User was updated: " + userID + " " + email);
        res.status(200).send(true);
      }
    }
  );
}

module.exports = editAccount;
