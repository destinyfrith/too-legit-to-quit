import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom";

export const TaskForm = () => {

    // we need to track transient state while user is interacting with form 
    // initial state is an object
    // as user interacts, these two state variables will be updated
    const [task, addTask] = useState({
        description: "",
        urgent: false,
        category: "",
        completed: false
    });


    // declare history so you can use it in this module
    // history.push will be used to take user back to task list
    const history = useHistory()

    // need to get the state of the current categories
    const [categories, setCategories] = useState([])

    useEffect(
        () => {
            fetch("http://localhost:8088/categories")
                .then(res => res.json())
                .then((categories) => {
                    setCategories(categories)
                })
        },
        []
    )

    // use UseState variable to create a new onject to post to API
    // put employeeId 1 to avoid react from deleting the object bc it needs a foreign key
    const submitTask = (event) => {

        // use preventDefault prevents screen from blinking blank when you submit a ticket
        event.preventDefault()

        // create a new task object format
        const newTask = {
            description: task.description,
            urgent: task.urgent,
            userId: parseInt(localStorage.getItem("legit_user")),
            categoryId: task.categoryId,
            completed: task.completed
        }

        // use POST method to create the task - stringify 

        const fetchOption = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTask)
        }

        // return a fetch of the list of tasks once they submit a request and .then history push tasks
        return fetch("http://localhost:8088/tasks?_expand=category", fetchOption)
            .then(() => {
                history.push("/tasks")
            })
    }
    // this .then returns you to task list^

    // write html format of the whole task form with the event listeners inside 
    return (
        <form className="taskForm">
            <h2 className="taskForm__title"> ADD A NEW TASK:</h2>
            <br></br>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>

                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        placeholder="What will you accomplish today?"

                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.description = evt.target.value
                                addTask(copy)
                            }
                        } />
                </div>
            </fieldset>

            <fieldset>
                <div className="select-container">
                    <label htmlFor="category">Category: </label>
                    <select name="category" className="form-control"

                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.categoryId = evt.target.value
                                addTask(copy)
                            }
                        }>
                        <option value="0">Select Category: </option>

                        {categories.map((category) => {
                            return <option value={category.id} key={category.id}>{category.name}</option>
                        })
                    }
                    </select>
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Is this task urgent? </label>
                    <input type="checkbox"className="checkbox"
                        // can't check a checkbox's value but you can check to see if it's checked
                        onChange={
                            (evt) => {
                                const copy = { ...task }
                                copy.urgent = evt.target.checked
                                addTask(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button onClick={submitTask} className="btn-primary">
                Add Task
            </button>
        </form>
    )
}

    // title
    // task = text input
    // category = select box
    // urgency = checkbox

    // copy state of form inputs with on change function
    // invoke the setter function here with a paramter of task

    // include add task button
