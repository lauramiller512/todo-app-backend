'use strict';

const serverless = require('serverless-http');
const express = require('express');
const app = express();
app.use(express.json());
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

  connection.query('SELECT * FROM `task` WHERE `userId` = 2', function (error, results, fields) {
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
  taskToInsert.uuid = uuidv4();

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


// Updating tasks
app.put("/tasks/:taskID", function(req, res) {
	// accept from client what is being updated
	const taskToUpdate = req.params.taskID;

	// var of SQL statement
	var sqlUpdate =
		"UPDATE `task` SET `status` = ?, `taskDescription` = ? WHERE `taskID` = ?";

	// execute statement
	connection.query(
		sqlUpdate,
		[req.body.taskDescription, req.body.status, req.body.taskID, taskToUpdate],
		function(error, results, fields) {
			if (error) {
				console.error("error updating task", error);
				res.status(500).json({ errorMessage: error });
			} else {
				// 
				res.json({ updatedTask: taskToUpdate });
			}
		}
	);
});

// Deleting tasks
app.delete('/tasks/:taskId', function (req, res) {

  res.json({
    message: 'Your DELETE works',
  });
});


module.exports.tasks = serverless(app);