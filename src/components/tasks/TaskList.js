import React, { useEffect, useState } from "react"

// create the function responsible for displaying the task list/manager
export const TaskList = () => {
    const [tasks, setTasks] = useState([])

// fetch all existing tasks from the database
// set initial state for tasks
    useEffect(
        () => {
            fetch("http://localhost:8088/tasks")
                .then(res => res.json())
                .then((taskArray) => {
                    setTasks(taskArray)
                })
        },
        []
    )


    return (
            tasks.map(
            (task) => {
                return <p key={`task--${task.id}`}>{task.description}</p>
            }
            )
    )
}

// iterate through the tasks array and return each individual task 
// you access each task thorugh id & you interpolate the description 