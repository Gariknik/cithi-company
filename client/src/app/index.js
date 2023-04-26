import React from "react";
import App from "./App";
import { BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const AppWrapper = () => {

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><App /></GoogleOAuthProvider>

        </BrowserRouter>

    );
};

export default AppWrapper;