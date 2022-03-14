import React from "react"
import { Route } from "react-router-dom"
import { TaskList } from "./tasks/TaskList"
import { TaskForm } from "./tasks/TaskForm"

// this is controlling what you see when you click each indiviudal link on the nav bar
export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <TaskList />
            </Route>
            <Route path="/tasks">
                <TaskList />
            </Route>

            <Route path="/taskform">
                <TaskForm />
            </Route>
        </>
    )
}