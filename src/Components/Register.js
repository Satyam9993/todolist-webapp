import React, { useState } from 'react'
import {useNavigate } from 'react-router-dom'

const Register = (props) => {

    const {showAlert} = props;
    const navigate = useNavigate()

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const [user, setUser] = useState({ name: "", email: "", password: "", cpassword: "" });
    
    const onSubmit=async(e)=>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: user.name, email: user.email, password: user.password })
            });
            const json = await response.json();
            if(json.success !== 'true'){
                showAlert("danger", "Wrong crudential")
                return;
            }
            localStorage.setItem("authToken", json.authToken)
            showAlert("success", "Successfully created account")
            navigate('/');
        } catch (error) {
            showAlert("danger", "Something went wrong!")
        }
    }
    return (
        <div className="container border" style={{ maxWidth: "700px", marginTop:"50px" }}>
            <form onSubmit={onSubmit} className="my-3">
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example1">Your name</label>
                    <input type="text" id="form3Example1" name="name" className="form-control" onChange={handleChange} />
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example3">Email address</label>
                    <input type="email" id="form3Example3" name="email" className="form-control" onChange={handleChange}/>
                </div>

                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">Password</label>
                    <input type="password" id="form3Example4" name="password" className="form-control" onChange={handleChange} minLength={5}/>
                </div>
                <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="form3Example4">Rewrite Password</label>
                    <input type="password" id="form3Example5" name="cpassword" className="form-control" onChange={handleChange} minLength={5}/>
                    {(user.password.length === 0 || user.cpassword.length === 0 || user.password !== user.cpassword) && <h6>Password mismatch or blank</h6>}
                </div>
                <button disabled={(user.password.length === 0 || user.cpassword.length === 0 || user.password !== user.cpassword)} type="submit" className="btn btn-primary mb-4">Sign up</button>
            </form>
        </div>
    )
}

export default Register
