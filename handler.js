'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors());
const uuidv4 = require('uuid/v4');
const mysql = require('mysql');


const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_SCHEMA
});


// Retrieving tasks
app.get('/tasks', function (req, res) {

  // Reconfigure DB so that taskID is void, uuid is the taskId, and make tasks default to user 1.
  connection.query('SELECT * FROM `task` WHERE `status` = 0', function (error, results, fields) {
    // error will be an Error if one occurred during the query
    if(error) {
      console.error("Your query had a problem with fetching tasks", error);
      res.status(500).json({errorMessage: error});
    }
    else {
      // Query was successful
      res.json({tasks: results});
    }
  });
});

// Creating tasks
app.post('/tasks', function (req, res) {

// Accept information from the client
  // about what task is being created
  const taskToInsert = req.body;
  taskToInsert.id = uuidv4();

  // Take that information and pre-populate an SQL INSERT statement
  // Execute the statement
  connection.query('INSERT INTO `task` SET ?', taskToInsert, function (error, results, fields) {
    if(error) {
      console.error("Your query had a problem with insert a new task", error);
      res.status(500).json({errorMessage: error});
    }
    else {
      // Return to the client information about the task that has been created
      res.json({
        task: taskToInsert
      });
    }
  });
});


// Updating task to show it's been completed
app.put("/tasks/:id", function(req, res) {
  connection.query('UPDATE `task` SET `status` = 1 WHERE `id` = ?', req.params.id, function (error, results, fields) {
    if(error) {
      console.error("Your query had a problem with updating the task", error);
      res.status(500).json({errorMessage: error});
    }
    else {
      // Return to client info about task that has been updated
      res.json({
        updatedTask: results,
        message: "Task completed!"
      });
    }
  })
});

// Deleting tasks
app.delete('/tasks/:id', function (req, res) {
 // Pull the task being deleted
 const taskToDelete = req.params.id;

 connection.query('DELETE FROM `task` WHERE `id` = ?', taskToDelete, function (error, results, fields) {
   if(error) {
     console.error("Your query had a problem with deleting the task", error);
     res.status(500).json({errorMessage: error});
   }
   else {
     // Return to client info about task that has been deleted
     res.json({
       deletedTask: results,
       message: "Your task was deleted"
     });
   }
 })
});

module.exports.tasks = serverless(app);