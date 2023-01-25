const express = require('express');
const tasksRouter = require('./routes/tasksRoutes');
const taskRouter = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.text());
app.use((_, response, next) => {
	response.set({'content-type': 'application/json'});
	next();
} );
app.use('/tasks',tasksRouter);
app.use('/task',  taskRouter);


app.listen(3000, () => console.log('Started on port 3000'));


