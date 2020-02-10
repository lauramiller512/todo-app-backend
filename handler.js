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
const app = express();

app.get('/tasks', function(req, res) {

  let tasks = [];
  console.log('Your tasks are' + tasks);

  connection.query('SELECT taskDescription, status FROM task', function (error, results, fields) {
    console.log('inside query callback');
    if (error) throw error;
    console.log('Query results:' + results);
    results.forEach(row => {
      tasks.push({Description:row.taskDescription , Completed:row.status})
    });
  });

  res.json(
    tasks
);
});

module.exports.tasks = serverless(app);