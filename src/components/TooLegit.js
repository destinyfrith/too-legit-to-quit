import React from "react"
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./TooLegit.css"

export const TooLegit = () => (
    <>
    <Route
        render={() => {
            if (localStorage.getItem("legit_user")) {
                return (
                    <>
                        <NavBar />
                        <h1>TOO LEGIT TO QUIT!</h1>
                        <ApplicationViews />
                    </>
                );
            } else {
                return <Redirect to="/login" />;
            }
        }}
    />


    <Route path="/login">
            <Login />
        </Route>
        <Route path="/register">
            <Register />
        </Route>
    </>
);