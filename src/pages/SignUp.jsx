import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { VITE_SERVER_URL } from '../main';
import Navbar from '../components/Navbar';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
//tMrt!HpC!3PB48W
const SignUp = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);


    const handleSignup = async () => {
        setLoading(true);
        try {
            const results = await axios.post(`${VITE_SERVER_URL}/auth/add`, {
                email: email.current.value,
                password: password.current.value
            },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );
            if (results) {
                navigate("/");
                dispatch(addUser(results.data.user));
            }
        } catch (error) {
            alert("Something went wrong");
            console.log("Error in Sign Up is", error.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200">
            <div className="card w-full max-w-sm shadow-xl bg-base-100">
                <form onSubmit={(e) => { e.preventDefault() }} className="card-body">
                    <h2 className="card-title justify-center">Sign Up</h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="input input-bordered"
                        ref={email}
                        required
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="input input-bordered"
                        ref={password}
                        required
                    />

                    <div className="form-control mt-4">
                        <button
                            type="submit"
                            onClick={() => { handleSignup() }}
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? "Signing up..." : "Sign Up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUp
