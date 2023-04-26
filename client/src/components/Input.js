import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Input = ({type='text', placeholder, register, name, required, pattern, error, rules, icon, alt}) => {
    const {t} = useTranslation('translation',  {keyPrefix: 'loginpage'});
    const isValid = !Boolean(error[name]);
    return (
        <>
            <InputWrapper>
                <LinkIcon>
                    <img src={icon} alt={alt}/>
                </LinkIcon>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    {...register(name, {
                        required: required ? t("errors.required") : false,
                        pattern: pattern,
                        ...rules
                    })}
                    isValid={isValid}
                />
            </InputWrapper>
            {!isValid && <ErrorText>{error[name]?.message}</ErrorText>}
        </>
    );
};

export default Input;

const StyledInput = styled.input`
    width: 200px;
    height: 35px;
    padding: 10px;
    border-style: none;
    border-bottom-style: solid;
    border-width: 1px;
    background: #fff;
    color: #000;
    ::placeholder {
         color: #616161;
         font-size: 0.94rem;
    };
    :active, :hover, :focus {
        outline: 0;
        outline-offset: 0;
    }; 
`;

const ErrorText = styled.p`
    color: #D12645;
    font-size: 0.94rem;
    position: absolute;
    margin: 0 auto;
`;

const InputWrapper = styled.div `
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2rem 0 0;
`;


const LinkIcon = styled.div`
    display: block;
    width: 35px;
    height: 36px;
    border: none; 
    border-bottom-style: solid;
    border-width: 1px;
    outline: none;
    transition: all .2s ease;
    };
`;