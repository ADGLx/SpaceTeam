const express = require("express");
const app = express();
const db = require("./database");

// Registering a job listing as an employer
const validateJob = require("./validateJob");

async function createJob(req, res) {
  const EmployerID = req.body.EmployerID;
  const CompanyName = req.body.CompanyName;
  const Position = req.body.Position;
  const PositionInfo = req.body.PositionInfo;
  const Report = req.body.Report;

  //Check if position or positioninfo fields are empty and then insert

  if (validateJob(Position, PositionInfo)) {
    db.query(
      "INSERT INTO JobListing (`EmployerID`, `CompanyName`, `Position`,`PositionInfo`,`Report` ) VALUES (?,?, ?, ?, ?);",
      [EmployerID, CompanyName, Position, PositionInfo, Report],
      function (error, results, fields) {
        if (error) {
          //console.error("Error creating job posting", error);
          res.status(500);
        } else {
          console.log("Job posting was created successfully");
          res.status(200);
        }
      }
    );
  } else {
    console.log("Invalid input!");
    res.status(403);
  }
}

module.exports = createJob;
