const express = require('express');
const tasksRouter = require('./routes/tasksRouter');
const taskRouter = require('./routes/taskRouter');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.text());
app.use('/task',  taskRouter);
app.use('/tasks',tasksRouter);

app.listen(3000, () => console.log('Started on port 3000'));


