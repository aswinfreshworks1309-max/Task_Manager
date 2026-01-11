const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routs/tasks');


const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks",taskRoutes);
app.listen(3000,()=>{
    console.log("Backend running on port 3000");
});