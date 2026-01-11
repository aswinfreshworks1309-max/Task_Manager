
const express = require('express');
const router = express.Router();
const pool = require('../db');


//get all tasks

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM task");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Database error" });
  }
});

// Create a new task

router.post("/post",async (req,res)=>{
    try {
        const {title} = req.body;
        if(!title) {
            return res.status(400).json({error: 'Title is required'});
        }
        const result = await pool.query("INSERT INTO task(title) VALUES($1) RETURNING *",
            [title]
        );
        res.json(result.rows[0]);
    } catch(err) {
        console.error('Error adding task:', err);
        res.status(500).json({error: 'Failed to add task'});
    }
});


// Delete a task


router.delete("/delete/task/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        if(!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        await pool.query("DELETE FROM task WHERE id = $1",
            [id]
        );
        res.json({message: "Task deleted"});
    } catch(err) {
        console.error('Error deleting task:', err);
        res.status(500).json({error: 'Failed to delete task'});
    }
});



module.exports = router;


