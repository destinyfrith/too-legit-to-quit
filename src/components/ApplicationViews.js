import React from "react"
import { Route } from "react-router-dom"
import { TaskList } from "./tasks/TaskList"

// this is controlling what you see when you click each indiviudal link on the nav bar
export const ApplicationViews = () => {
    return (
        <>
            <Route path="/tasks">
                <TaskList />
            </Route>
        </>
    )
}