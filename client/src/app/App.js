import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {
    Routes,
    Route,
    useLocation, useNavigate
} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ServicesPageInOne from "../pages/ServicesPageInOne";
import ServicesPageInTwo from "../pages/ServicesPageInTwo";
import ServicesPageInThree from "../pages/ServicesPageInThree";
import ContactPage from "../pages/ContactPage";
import UserCabinetPage from "../pages/UserCabinetPage";
import Error from "../pages/Error";
import AuthDialog from "../components/AuthDialog";
import Successful from "../components/Successful";
import PrivateRoute from "../entities/PrivateRoute";


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {

    const [isAuthDialogOpen, setShowAuthModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const [logSuccessful, setLogSuccessful] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {});
    const navigate = useNavigate();


    useEffect(() => {
        const storedData = localStorage.getItem('data');
        const parsedData = storedData ? JSON.parse(storedData) : {};
        setData(parsedData);
    }, []);

    const handleAuthClick = () => {
        if (!loggedIn) {
            setShowAuthModal(true);
            localStorage.setItem('isAuthDialogOpen', true);
        }
    };

    const handleAuthModalClose = (event) => {
        event.preventDefault();
        setShowAuthModal(false);
    };

    const handleLoginSuccess = (path, userData) => {
        setLoggedIn(true);
        setLogSuccessful(true);
        navigate(path);
        console.log(userData)
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('data', JSON.stringify(userData));
    };


    const handleLogOutButtonClick = () => {
        localStorage.removeItem('loggedIn');
        setLoggedIn(false);
        navigate('/');
    };



    const handleLogout = () => {
        setLogSuccessful(false);
    };

    const handleRegisterSuccess = (path, userData) => {
        setLoggedIn(true);
        setLogSuccessful(true);
        navigate(path);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('data', JSON.stringify(userData));
    };

    const handleDataSubmit = (data) => {
        setData(data);
        localStorage.setItem('data', JSON.stringify(data));
    };

    const handleCloseSuccessful = () => {
    };

    const setIsAuthDialogOpen = () => {

    };

    const setOpenSuccessful = () => {
        setLoggedIn(true)
    };

    const handleCardClick = (path) => {
        navigate(path);

    };

    const authDialogProps = {
        onClose: handleAuthModalClose,
        onLoginSuccess: handleLoginSuccess,
        onLoginSuccessServ: handleCardClick,
        onRegisterSuccess: handleRegisterSuccess,
        onCloseSuccessful: handleCloseSuccessful,
        setIsAuthDialogOpen: setIsAuthDialogOpen,
        setOpenSuccessful: setOpenSuccessful,
        setShowAuthModal: setShowAuthModal,
        setUserData: setData,
        onDataSubmit: handleDataSubmit
    };

    const setProps = {
        onLoginButtonClick: handleAuthClick,
        handleLogOutButtonClick: handleLogOutButtonClick,
        onLoginSuccessServ: handleLoginSuccess,
        loggedIn: loggedIn,
        data: data
    };

    const privateProps = {
        loggedIn: loggedIn,
        isAuthDialogOpen: isAuthDialogOpen,
        authProps: authDialogProps
    };

    return (
        <>
                <ScrollToTop />
                <AppWrapper>
                    <Header {...setProps} />
                    <Routes>
                        <Route path="/" element={<HomePage {...setProps} />} />
                        <Route path="/services" element={<ServicesPage {...setProps} />} />
                        <Route path="/services/services1"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInOne data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/services/services2"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInTwo data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/services/services3"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInThree data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactPage />} />
                        <Route path="/user"
                               element={
                                   <PrivateRoute {...privateProps}>
                                        <UserCabinetPage data={data}/>
                                   </PrivateRoute>}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    {(loggedIn && !isAuthDialogOpen) ? (
                        <Successful username={data.username} onClose={handleLogout} />
                    ) : (
                        isAuthDialogOpen && <AuthDialog {...authDialogProps} />
                    )}
                    <Footer />
                </AppWrapper>
        </>
    );
}

export default App;


const AppWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: #fff;
`;