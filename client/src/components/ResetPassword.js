import React, { useState }from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Input from "./Input";
import EmailIcon from "../assets/icons/EmailIcon.svg";
import {getPassword} from "../entities/api";
import Successful from "./Successful";



const EMAIL_PATTERN = /^([^!#$%&‘*+-/=?^_`{|}~ ])([a-z_A-Z.0-9-]*)@\w{1,63}\.\w{1,63}([^!#$%&‘*+—/=?^_`{|}~ ])$/;

const ResetPasword = ({ onLoginSuccess, showResetPassword, setShowResetPassword }) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'reset'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };


    const [responseMessage, setResponseMessage] = useState('');
    const [responseIsError, setResponseIsError] = useState(false);
    const [showSuccessful, setShowSuccessful] = useState(false);
    const {
        register,
        reset,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({mode: "onBlur"});



    const onSubmit = async (data, event) => {
        try {
            const result = await getPassword(`/send_password`, data);
            if (result) {
                setResponseMessage(`Success`);
                reset();
                setShowSuccessful(true);

            }
        } catch (error) {
            setResponseMessage('Registration failed. Please try again.');
            setResponseIsError(true);
            reset();
        }
    };
    const handleResetClick = () => {
        setShowResetPassword(false);
        changeLanguage(i18n.language);
    };


    const handleSuccessfulClose = () => {
        setShowSuccessful(false);
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
                <LoginLinkWrapper>
                    <StyledButtonSubmit type="submit"
                                        value={t("links.send")}
                                        disabled={!isValid} />
                    <StyledButtonReset onClick={handleResetClick}>
                        {t("links.return")}
                    </StyledButtonReset>
                </LoginLinkWrapper>
                {showSuccessful && (<Successful onClose={handleSuccessfulClose} />)}
            </StyledForm>
        </StyledSection>
    );
};
export default ResetPasword;

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

const Title = styled.p `
    font-size: 0.9375rem;
    color: rgba(0, 0, 0, 0.5);
    font-weight: 400;
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