const express = require("express");
const app = express();
const db = require("./database");

//Deleting a posting with a user report
async function deletePost(req, res) {
  const id = req.body["PostID"]; //only the id should be deleted

  db.query(
    "DELETE FROM JobListing WHERE JobID = ?",
    [id],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).send(false);
      }
      if (results.length === 0) {
        res.status(403);
      }
      console.log("Posting successfully deleted!");
      res.status(200).send(true);
    }
  );
}

module.exports = deletePost;
