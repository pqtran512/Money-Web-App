import React, { Component } from "react";
import { Link } from "react-router-dom";

// Style
import 'bootstrap/dist/css/bootstrap.css';

export default class Register extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { username: "", password: "", password2: "" };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e)
    {
        e.preventDefault();
        const { username, password, password2 } = this.state;

        // * Fill the form
        if (username === "" || password === "" || password2 === "")
        {
            alert("Please fill the form.");
            return;
        }

        // * Check confirmed password
        if (password !== password2)
        {
            alert("The passwords are not the same. Please try again.");
            return;
        }

        // * Fetch
        fetch("http://localhost:3005/register", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
            .then(response => response.json())
            .then(data => {console.log(data.message);
            
            // Display message
            if (data.message === "ALREADY EXIST")
            {
                alert("This username is already exist. Please choose other username");
            }
            else if (data.message === "SUCCESS")
            {
                alert("Register successful. Redirecting to login page...");
                window.location.href = "./login";
            }
        });
    }

    render()
    {
        return (
            <div 
                className="row" 
                style={{ backgroundImage: "url(bg-login.jpeg)", backgroundSize: `100% 100%` }}
            >
                {/* Image */}
                <div className="col-md-6 d-none d-sm-block p-0">
                    <img src="login.png" alt="login" className="w-100" />
                </div>

                {/* Login form */}
                <form onSubmit={this.handleSubmit} className="col-md-6 col-sm-12 px-5 m-auto text-start">
                    <h1 className="h2 mb-4 text-light">REGISTER</h1>

                    <div className="form-outline mb-4 w-100">
                        <input
                            type="text"
                            className="form-control form-control-lg"
                            placeholder="Username"
                            onChange={(e) => this.setState({ username: e.target.value })}
                        />
                    </div>

                    <div className="form-outline mb-4 w-100">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </div>

                    <div className="form-outline mb-3 w-100">
                        <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm password"
                            onChange={(e) => this.setState({ password2: e.target.value })}
                        />
                    </div>

                    <div className="text-end pe-1 mt-2">
                        <Link to='../login' className="cusLink">Login</Link>
                    </div>

                    <div className="my-3 text-center">
                        <button 
                            type="submit" 
                            className="btn text-light px-3 btn-lg" 
                            style={{backgroundColor: `#a3c12e`}}
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}