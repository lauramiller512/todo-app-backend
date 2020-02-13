'use strict';
const uuidv4 = require('uuid/v4');
const serverless = require('serverless-http');
const express = require('express');
const mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'tr-course-rds-instance.ckseo0dq8xc9.eu-west-2.rds.amazonaws.com',
  user     : 'root',
  password : 'shh',
  database : 'tasks'
});
// const app = express();

// Retrieving tasks
app.get('/tasks', function (req, res) {

  connection.query('SELECT * FROM `task` WHERE `userId` = "geoff"', function (error, results, fields) {
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
  res.json({
    message: 'Your POST works',
  });
});

// Updating tasks
app.put('/tasks/:taskId', function (req, res) {
  res.json({
    message: 'Your PUT works',
  });
});

// Deleting tasks
app.delete('/tasks/:taskId', function (req, res) {
  res.json({
    message: 'Your DELETE works',
  });
});



// app.get('/tasks', function(req, res) {

//   let tasks = [];
//   console.log('Your tasks are' + tasks);

//   connection.query('SELECT taskDescription, status FROM task', function (error, results, fields) {
//     console.log('inside query callback');
//     if (error) throw error;
//     console.log('Query results:' + results);
//     results.forEach(row => {
//       tasks.push({Description:row.taskDescription , Completed:row.status})
//     });
//   });

//   res.json(
//     tasks
// );
// });

module.exports.tasks = serverless(app);