import React, { useEffect, useState } from "react"

// create the function responsible for displaying the task list/manager
// set initial state variables 
export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    // need new hooks for editing function
    const [taskEditing, setTaskEditing] = useState(null)
    const [editingText, setEditingText] = useState("")

    // fetch all existing tasks from the database
    // set the initial state
    // made this a get state function so we could get new updated state in delete function
    const getState = () => {
        fetch("http://localhost:8088/tasks")
            .then(res => res.json())
            .then((taskArray) => {
                setTasks(taskArray)
            })
        }

// create a use effect whose function is to get state so you can use it later 
useEffect(
    () => {
        getState()
    },
    []
)

// add a delete function

const deleteTask = (id) => {
    fetch(`http://localhost:8088/tasks/${id}`, {
        method: "DELETE"
    })
        .then((data) => {
            getState(data)
        })
}

// add an edit function
const toggleComplete = (id) => {
    const updatedTasks = [...tasks].map((task) => {
        if (task.id === id) {
            task.completed = !task.completed
        }
        return task
    })
    setTasks(updatedTasks)
}

// function that allows edits to save and update
// return will return every todo but if it matches the one we are editing, it will update it
const editTask = (id) => {
    const updatedTasks = [...tasks].map((task) => {
        if (task.id === id) {
            task.text = editingText
        }
        return task
    })
    setTasks(updatedTasks)
    setTaskEditing(null)
    setEditingText("")
}

return (
    tasks.map(
        (task) => {
            return <p key={`task--${task.id}`}>{task.description}


            {taskEditing === task.id ?
            (<input
                type="text"
                onChange={(event) => setEditingText(event.target.value)}
                value={editingText}
                />)
                :
                (<div>{task.text}</div>)}

            <button onClick={() => { editTask(task.id)}}> Edit</button>
            <button onClick={() => { deleteTask(task.id) }}> Delete</button>

            <input type="checkbox" 
            onChange={() => toggleComplete(task.id)}
            checked={task.completed}/>

            </p>
        }
    )
)
}

// iterate through the tasks array and return each individual task 
// you access each task thorugh id & you interpolate the description 

// add edit button
// add delete button
// add ability to mark complete