'use strict';
const uuidv4 = require('uuid/v4');
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function(req, res) {
  res.json({
    state: {
      tasks: [
        { id: uuidv4(), description: "Walk the dog", completed: false },
        { id: uuidv4(), description: "Eat cheese", completed: false },
        { id: uuidv4(), description: "Learn the kazoo", completed: false }
      ],
  }
});
});

module.exports.tasks = serverless(app);