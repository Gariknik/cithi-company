import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Input from "./Input";
import EmailIcon from "../assets/icons/EmailIcon.svg";
import PasswordIcon from "../assets/icons/PasswordIcon.svg";
import iconGoogle from "../assets/IconGoogle.svg";
import {loginUser} from "../entities/api";
import { useGoogleLogin } from '@react-oauth/google';



const MIN_LENGTH = 3;
const MAX_LENGTH = 25;
const EMAIL_PATTERN = /^([^!#$%&‘*+-/=?^_`{|}~ ])([a-z_A-Z.0-9-]*)@\w{1,63}\.\w{1,63}([^!#$%&‘*+—/=?^_`{|}~ ])$/;
const PASSWORD_PATTERN = /^[^ ]+/g;

const LoginDialog = ({ onLoginSuccess, showResetPassword, setShowResetPassword }) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'loginpage'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async response => {
            try {
                const headers = {
                    "Authorization": `Bearer ${response.access_token}`
                };
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers });
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }
                const data = await res.json();
                console.log(data);
                const email = data.email;
                const password = data.email.split("@")[0] +'@:-)';
                try {
                    const result = await loginUser(`/login`, {
                        "email": email,
                        "password": password});
                    if (result) {
                        setResponseMessage(`Success ${result.message}`);
                        onLoginSuccess(result.data);
                    }
                } catch (error) {
                    console.log(error)
                    setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
                    setResponseIsError(true); // устанавливаем флаг ошибки
                    reset();
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responseIsError, setResponseIsError] = useState(false);
    const {
        register,
        reset,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({mode: "onBlur"});


    const onSubmit = async (data, event) => {

        try {
            const result = await loginUser(`http://127.0.0.1:5000/login`, data);
            if (result) {
                setResponseMessage(`Success ${result.message}`);
                onLoginSuccess(result.data);
            }
        } catch (error) {
            console.log(error);
            setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
            setResponseIsError(true); // устанавливаем флаг ошибки
            reset();
        }
    };


    return (
        <StyledSection>
            <Title>{t("title")}</Title>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledMessage isError={responseIsError}>{responseMessage}</StyledMessage>
                <Input
                    placeholder={t("placeholders.email")}
                    register={register}
                    name='email'
                    required={true}
                    pattern={{
                        value: EMAIL_PATTERN,
                        message: t("errors.validEmail")}
                    }
                    icon={EmailIcon}
                    alt={t("alts.iconEmail")}
                    error={errors}
                />
                <Input
                    type='password'
                    placeholder={t("placeholders.password")}
                    register={register}
                    name="password"
                    required={true}
                    pattern={{
                        value: PASSWORD_PATTERN,
                        message: t("errors.validPassword")
                    }}
                    rules={{
                        minLength: {
                            value: MIN_LENGTH,
                            message: t("errors.minLength")
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: t("errors.maxLength")
                        }
                    }}
                    icon={PasswordIcon}
                    alt={t("alts.iconPassword")}
                    error={errors}
                />
                <LoginLinkWrapper>
                    <StyledButtonSubmit type="submit"
                                        value={t("links.login")}
                                        disabled={!isValid}/>
                    <StyledButtonAuth type="submit" onClick={loginGoogle}>
                        <img src={iconGoogle} alt={'googleIcon'}/>
                    </StyledButtonAuth>
                    <StyledButtonReset onClick={() => {
                        setShowResetPassword(!showResetPassword);
                        changeLanguage(i18n.language);
                    }}>
                        {showResetPassword ? t("links.backToLogin") : t("links.passwordReset")}
                    </StyledButtonReset>
                </LoginLinkWrapper>
            </StyledForm>
        </StyledSection>
    );
};
export default LoginDialog;

const StyledSection = styled.section`
    padding: 0 40px;
    @media (max-width: 600px) {
       padding: 0;
    };
`;

const StyledForm = styled.form`
    background: #fff;
    padding: 0 60px;
    color: #000;
    @media (max-width: 600px) {
        padding: 0 30px;
        width: 100%;
    };
     @media (max-width: 400px) {
        padding: 0 10px;
    };
`;

const Title = styled.p `
    font-size: 0.9375rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 400;
`;

const StyledMessage = styled.p `
    color: ${props => props.isError ? '#ff1522' : '#2ed122'};
 `;

const LoginLinkWrapper = styled.div `
    display: flex;
    flex-direction: column;
    
`;

const StyledButtonSubmit = styled.input`
    display: flex;
    width: 171px;
    height: 41px;
    margin: 3rem auto 3rem;
    background: #83C166;
    border-radius: 5px;
    border: none; 
    outline: none;
    font-size: 1.125rem;
    font-weight: 400;
    color: #fff;
    justify-content: center;
    align-items: center;
    transition: all .2s ease;
    
    :hover{
       color: #83C166;
       cursor: pointer;
       background: #fff;
       border: solid 1px #83C166;
       box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    };
    
    :active{
       color: #83C166;
       background: #fff;
       border: solid 2px #83C166;
       box-shadow: 0 0 5px rgba(0, 0, 0, .3) inset; 
       transform: translate(0, 5px);
    };
`;
const StyledButtonAuth = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;

const StyledButtonReset = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    width: 231px;
    height: 59px;
    justify-content: left;
    align-items: center; 
    font-size: 0.94rem;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    text-decoration: none;
    transition: all .2s ease;
    :hover{
       color: #000;
    };
    
    :active{
       color: #000;
    };    
`;