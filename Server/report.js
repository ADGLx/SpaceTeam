const express = require("express");
const app = express();
const db = require("./database");

//Change report entry when report has been triggered
async function report(req, res) {
  const JobID = req.body.jobID.jobID;
  db.query(
    "UPDATE JobListing SET Report = 1 WHERE JobID = ?",
    [JobID],
    function (error, result, fields) {
      if (error) {
        console.log(error);
      }
      if (result.length === 0) {
        console.log("Non existent element queried!");
        res.status(403);
      } else {
        console.log("Successfuly reported listing!");
        console.log(result);
        res.status(200).send(result);
      }
    }
  );
}

module.exports = report;
