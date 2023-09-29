import axios from "axios";
import React from "react";
import {useState} from "react"

const SignUp = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")

    const formSubmitHandler = async (e) => {
        e.preventDefault()
        try{
        const message = await axios.post("http://localhost:4000/api/users/signup", {email, password, password2})
        console.log(message)
        }catch(err){
            console.log(err)
        }
    }
  return (
    <div className="flex justify-center items-center h-full bg-skin-tertiary">
      <form className="max-w-[400px] w-full mx-auto p-8 bg-white shadow-xl rounded-lg" onSubmit={formSubmitHandler}>
        <h2 className="text-4xl font-bold text-center py-6">TIME-IT</h2>
        <div className="flex flex-col my-3">
            <label>Email</label>
            <input className="border relative bg-gray-100 p-2 rounded shadow-md" type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="flex flex-col my-3">
            <label>Password</label>
            <input className="border relative bg-gray-100 p-2 rounded shadow-md" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="flex flex-col my-3">
            <label>Confirm Password</label>
            <input className="border relative bg-gray-100 p-2 rounded shadow-md" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)}/>
        </div>
        <button className="w-full py-3 mt-8 mb-2 bg-skin-secondary hover:bg-skin-primary relative text-white rounded">Sign up</button>
        <button type="button">Already have an account?</button>
      </form>
    </div>
  );
};

export default SignUp;
