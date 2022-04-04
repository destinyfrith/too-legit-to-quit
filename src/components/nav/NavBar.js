import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
    return (
        <ul className="navbar">

            <li className="navbar__item active">
                <Link className="navbar__link" to="/tasks/">MY TASKS</Link>
            </li>

            <li className="navbar__item active">
                <Link className="navbar__link" to="/taskform">ADD NEW TASK</Link>
            </li>

            <li className="navbar__item">
                <Link className="navbar__link" to="#"
                    onClick={
                        () => {
                            localStorage.removeItem("legit_user")
                        }
                    }>
                    LOGOUT
                </Link>
            </li>
        </ul>
    )
}

// if you add a link here, you must add a corresponding route on Appviews