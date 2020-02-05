'use strict';
const serverless = require('serverless-http');
const express = require('express');
const app = express();

app.get('/tasks', function(req, res) {
  res.json({
    state: {
      tasks: [
        { id: 1, description: "Walk the dog", completed: false },
        { id: 2, description: "Eat cheese", completed: false },
        { id: 3, description: "Learn the kazoo", completed: false }
      ],
  }
});
});

module.exports.tasks = serverless(app);