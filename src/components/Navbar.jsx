import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { VITE_SERVER_URL } from "../main";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

export default function Navbar() {
   

    
    const navigate = useNavigate();
    const dispatch=useDispatch();

    const auth = useSelector(function(appStore){
        return appStore.user.user?true:false;
    })
    const user = useSelector(function(appStore){
        return appStore.user.user;
    })

    const logout = async() => {
        const result = await axios.get(`${VITE_SERVER_URL}/auth/logout`, { withCredentials: true });
        if(result.status===200){
                dispatch(removeUser());
        }
        navigate("/login");
    };
    return (
        <div className="navbar bg-base-200">
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-xl">
                    Ticket AI
                </Link>
            </div>
            <div className="flex gap-2">
                {!auth ? (
                    <>
                        <Link to="/signup" className="btn btn-sm">
                            Signup
                        </Link>
                        <Link to="/login" className="btn btn-sm">
                            Login
                        </Link>
                    </>
                ) : (
                    <>
                        <p>Hi, {user?.email}</p>
                        {user && user?.role === "admin" ? (
                            <Link to="/admin" className="btn btn-sm">
                                Admin
                            </Link>
                        ) : null}
                        <button onClick={()=>{logout()}} className="btn btn-sm">
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}