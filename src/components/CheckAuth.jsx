import  { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom"

const CheckAuth = ({ children, protectedRoute }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const user = useSelector(function(appStore){
        return appStore.user.user;
    })


    useEffect(() => {
        
        if (protectedRoute) {
            if (!user) {
                navigate('/login');
            }
            else {
                setLoading(false);
            }
        }
        else {
            if (user) {
                navigate('/');
            }
            else {
                setLoading(false);
            }
        }
    }, [navigate, protectedRoute,user]);

    if (loading) {
        return <div>Loading...</div>
    }
    else {
       return children;
    }
}

export default CheckAuth
