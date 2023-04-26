import React from 'react';
import styled from 'styled-components';

const LoginLink = ({icon, title, alt}) => {
    return (
        <StyledLink href='#'>
            <LinkTitle>
                {title}
            </LinkTitle>
        </StyledLink>
    );
};

export default LoginLink;

const StyledLink = styled.a`
    display: flex;
    justify-content: space-between;
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

const LinkTitle = styled.div`
    display: flex;
    background: #fff;
    padding-top: 15px;
    border: none; 
    outline: none;  
`;
