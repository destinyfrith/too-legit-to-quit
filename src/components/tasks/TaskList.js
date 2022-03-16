import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import './Tasks.css';
import { Button, IconButton } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlined"
import EditOutlined from "@mui/icons-material/EditOutlined"

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
        <>
            <h2>Current Tasks:</h2>
            {
                tasks.map(
                    (task) => {
                        return <div key={`task--${task.id}`} >

                            <div className="list-item">
                                <p className={`task ${task.categoryId === "1" ? `personal` : ""}`}>
                                    <p className={`task ${task.categoryId === "2" ? `work` : ""}`}>
                                        <p className={`task ${task.categoryId === "3" ? `school` : ""}`}>

                                            {taskEditing === task.id ?
                                                (<input
                                                    type="text"
                                                    onChange={(event) => setEditingText(event.target.value)}
                                                    value={editingText}
                                                />)
                                                :
                                                (task.description)
                                            }

                                            <Button variant="outlined">
                                                {task.categoryId === "1" ?
                                                    ("PERSONAL")
                                                    :
                                                    task.categoryId === "2" ?
                                                        ("WORK")
                                                        :
                                                        task.categoryId === "3" ?
                                                            ("SCHOOL")
                                                            :
                                                            ""}
                                            </Button>

                                            <IconButton onClick={() => { deleteTask(task.id) }}> <DeleteOutlined /></IconButton>

                                            <input type="checkbox"
                                                onChange={() => toggleComplete(task.id)}
                                                checked={task.completed} />

                                            {taskEditing === task.id ?
                                                (<button onClick={() => editTask(task.id)}>Submit Edits</button>)
                                                :
                                                (<IconButton onClick={() => setTaskEditing(task.id)}> <EditOutlined /> </IconButton>)}

                                        </p></p></p>
                            </div>
                        </div>
                    }


                )
            }
        </>
    )
}

// if task.category = personal, insert button PERSONAL, else null

// iterate through the tasks array and return each individual task 
// you access each task thorugh id & you interpolate the description 

// add edit button
// add delete button
// add ability to mark complete