import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children, loggedIn }) => {

    if(!loggedIn){
        return <>
                <Navigate to={"/"} />
            </>
    }

    return children;
};

export default PrivateRoute;