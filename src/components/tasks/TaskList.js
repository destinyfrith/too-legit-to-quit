import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import './Tasks.css';

// create the function responsible for displaying the task list/manager
// set initial state variables 
export const TaskList = () => {
    const [tasks, setTasks] = useState([])
    // need new hooks for editing function
    const [taskEditing, setTaskEditing] = useState(null)
    const [editingText, setEditingText] = useState("")

    const history = useHistory()

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

    // add ability to mark as complete
    // set new state of the updated task
    // invoke function that updates new task and pass id of task as parameter
    const toggleComplete = (id) => {
        const updatedTasks = [...tasks].map((task) => {
            if (task.id === id) {
                task.completed = !task.completed
            }
            return task
        })
        setTasks(updatedTasks)
        updateTask(id)
    }

    // function that allows edits to save and update
    // return will return every todo but if it matches the one we are editing, it will update it
    const editTask = (id) => {
        const updatedTasks = [...tasks].map((task) => {
            if (task.id === id) {
                task.description = editingText
            }
            return task
        })

        console.log(updatedTasks)
        setTasks(updatedTasks)
        setTaskEditing(null)
        setEditingText("")
        updateTask(id)

    }

    // add a PUT method that updates task property updates
    // add updateTask function to button onClick for submit?
    // should have the format of the object
    const updateTask = (id) => {

        const updatedTask = tasks.find(
            (task) => {
                if (task.id === id) {
                    return true
                }

            }
        )



        // Perform the PUT HTTP request to replace the resource
        fetch(`http://localhost:8088/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedTask)
        })
            .then(() => {
                history.push("/tasks")
            })
    }




    return (

        tasks.map(
            (task) => {
                return <div key={`task--${task.id}`} className="list-item">
                    <p className={`task ${task.categoryId === "1" ? `personal` : ""}`}></p>
                    <p className={`task ${task.categoryId === "2" ? `work` : ""}`}></p>
                    <p className={`task ${task.categoryId === "3" ? `school` : ""}`}></p>


                    {taskEditing === task.id ?
                        (<input
                            type="text"
                            onChange={(event) => setEditingText(event.target.value)}
                            value={editingText}
                        />)
                        :
                        (<div>{task.description}</div>)}

                        <button onClick={() => { deleteTask(task.id) }}> Delete</button>

                    <input type="checkbox"
                        onChange={() => toggleComplete(task.id)}
                        checked={task.completed} />

                    {taskEditing === task.id ?
                        (<button onClick={() => editTask(task.id)}>Submit Edits</button>)
                        :
                        (<button onClick={() => setTaskEditing(task.id)}> Edit</button>)}

                </div>
                
            }
        )

    )
}


// iterate through the tasks array and return each individual task 
// you access each task thorugh id & you interpolate the description 

// add edit button
// add delete button
// add ability to mark complete