import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [user, setUser] = useState({ email: "", password: "" });
    let navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: user.email, password: user.password })
            });
            const json = await response.json();
            if(json.success !== 'true'){
                props.showAlert("danger", "Wrong crudential")
                return;
            }
            localStorage.setItem("token", json.authToken)
            navigate('/');
            props.showAlert("success", "Successfully login")
        } catch (error) {
            props.showAlert("danger", "Something went wrong!")
        }
    }

    const handleonChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    return (
        <div className="container my-5 border" style={{ maxWidth: "400px" }}>
            <h3 className="text-center my-3">Login Form</h3>
            <form className="my-3" onSubmit={handleSubmit}>
                <div className="form-outline mb-4">
                    <input type="email" id="form2Example1" className="form-control" name="email" onChange={handleonChange} />
                    <label className="form-label" htmlFor="form2Example1"  >Email address</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example2" name="password" className="form-control" onChange={handleonChange} />
                    <label className="form-label" htmlFor="form2Example2">Password</label>
                </div>
                <button type="submit" className="btn btn-primary btn-block mb-4">Sign in</button>
            </form>
        </div>
    )
}

export default Login
