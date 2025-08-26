import { useState } from "react";
import React, { useRef } from 'react'
import { useNavigate } from "react-router-dom";
import { VITE_SERVER_URL } from "../main";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useRef(null);
  const password = useRef(null);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const results = await axios.post(`${VITE_SERVER_URL}/auth/login`, {
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
        dispatch(addUser(results.data.user));
        navigate("/");
      }
    } catch (err) {
      alert("Something went wrong");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <form onSubmit={(e) => { e.preventDefault() }} className="card-body">
          <h2 className="card-title justify-center">Login</h2>

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
              className="btn btn-primary w-full"
              disabled={loading}
              onClick={() => { handleLogin() }}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login;
