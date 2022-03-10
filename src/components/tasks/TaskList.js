import React, { useEffect, useState } from "react"

export const TaskList = () => {
    const [tasks, setTasks] = useState([])

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