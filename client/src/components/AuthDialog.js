import React, {useEffect, useState} from 'react';
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import ResetPassword from "./ResetPassword";

const AuthDialog = ({ onClose, onLoginSuccess, onRegisterSuccess, setOpenSuccessful, setShowAuthModal, setUserData }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const location = useLocation();
    const [activeTab, setActiveTab] = useState('login');
    const [showResetPassword, setShowResetPassword] = useState(false);
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            setOpenSuccessful(true);

        } else {
            setShowAuthModal(true);

        }
    }, [setOpenSuccessful, setShowAuthModal]);

    const handleSuccess = (data) => {
        setShowAuthModal(false);
        setOpenSuccessful(true);
        onLoginSuccess(location.pathname, data);
        onRegisterSuccess(location.pathname, data);
        setUserData(data);
        console.log(data);
        setUserData(data);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        onClose();
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();


        onClose();
    };



    return (
        <>
            <StyledOverlay />
            <StyledSection>
                <StyledBlock>
                    <StyledButtonClose onClick={onClose}>&#10006;</StyledButtonClose>
                    <StyledButtonBlock>
                        <StyledButton onClick={() => {
                            setActiveTab('login');
                            changeLanguage(i18n.language);
                        }}>{t("buttonLog")} </StyledButton>
                        <StyledButton onClick={() => {
                            setActiveTab('registration');
                            changeLanguage(i18n.language);
                        }}>{t("buttonReg")} </StyledButton>
                    </StyledButtonBlock>
                    {activeTab === 'login' ? (
                        <>
                        {showResetPassword ? <ResetPassword setShowResetPassword={setShowResetPassword} /> :
                            <LoginDialog onSubmit={handleLoginSubmit}
                             onLoginSuccess={handleSuccess}
                             showResetPassword={showResetPassword} setShowResetPassword={setShowResetPassword}  />}
                        </>
                    ) : (
                        <RegisterDialog onSubmit={handleRegistrationSubmit}
                                        onRegisterSuccess={handleSuccess}
                                        showResetPassword={showResetPassword}
                                        setShowResetPassword={setShowResetPassword}/>
                    )}
                </StyledBlock>
            </StyledSection>
        </>
    );
};

export default AuthDialog;

const StyledOverlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.5);
`;

const StyledSection = styled.section`
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
    width: 100%;
    height: 655px;
    position: fixed;
    top: 0;
    right: 10px;
    padding: 0 40px;
    @media (max-width: 600px) {
       padding: 0;
       width: 100%;
       right: 0;
       left: 0;
    };
    
`;


const StyledBlock = styled.div`
    height: 655px;
    width: 455px;
    background: #fff;
    color: #000;
    border: solid 1px #83C166;
    display: block;
    margin: auto auto;
    padding: 0 0 50px;
    @media (max-width: 600px) {
       padding: 0;
       width: 100%;
    };
`;

const StyledButtonBlock = styled.div`
    padding: 0 ;
    margin-bottom: 4rem;
`;

const StyledButton = styled.button`
    border: none;
    font-weight: 300;
    font-size: 1.5rem;
    margin-left: 30px;
    background-color: #fff;
    color: rgba(0, 0, 0, 0.5);
    :active{
        color: rgba(0, 0, 0, 1);
    };
     :focus{
        color: rgba(0, 0, 0, 1);
    };
`;

const StyledButtonClose = styled.button`
    background: none;
    width: 35px;
    border: solid 0.5px #83C166;
    font-size: 1.5rem;
    font-weight: 400;
    color: #83C166;
    margin-bottom: 2rem;
    position: relative;
    top: 0;
    left: 418px;
    @media (max-width: 600px) {
       
    };
    @media (max-width : 600px) {
    };
    @media (max-width : 533px) {
        left: 388px;
    };
    @media (max-width : 360px) {
        left: 322px;
    };
    @media (max-width : 320px) {
    };
`;
