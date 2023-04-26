import React, { useState } from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {Link} from 'react-router-dom';
import AuthDialog from "./AuthDialog";


const HamburgerMenu = ({ open, setOpen, onLoginButtonClick, loggedIn, handleLogOutButtonClick, logOutServer }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'header' });
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);


    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };
    return (
        <StyledMenuWrapper open={open}>
            <StyledMenu>
                <StyledLocaleButtons>
                    <StyledButtonLocale type="button" onClick={() => changeLanguage('uk')}>UK</StyledButtonLocale>
                    <StyledButtonLocale type="button" onClick={() => changeLanguage('en')}>EN</StyledButtonLocale>
                </StyledLocaleButtons>
                <StyledLinkMenu to="/" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.homepage')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/services" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.services')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/about" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.about')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/contacts" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.contacts')}
                </StyledLinkMenu>
                <ButtonsWrapper>
                    {loggedIn ? (
                        <>
                            <StyledLinkUserCabinet to="/user" onClick={() =>{
                                changeLanguage(i18n.language);
                                setOpen(false);
                            }}>
                            {t('menu.cabinet')}
                            </StyledLinkUserCabinet>
                            <StyledButtonLogOut onClick={() => {
                                localStorage.removeItem('loggedIn');
                                handleLogOutButtonClick();
                                changeLanguage(i18n.language);
                                setOpen(false);
                                logOutServer()
                            }}>
                                {t('menu.out')}
                            </StyledButtonLogOut>
                        </>
                    ) : (
                        <>
                            <StyledButtonAuth type="button" onClick={() => {
                                onLoginButtonClick();
                                changeLanguage(i18n.language);
                                setOpen(false);
                            }}>
                                {t('menu.auth')}
                            </StyledButtonAuth>
                        </>
                    )}
                </ButtonsWrapper>

                {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
            </StyledMenu>
        </StyledMenuWrapper>
    );
};

export default HamburgerMenu;



const StyledMenuWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 999;
    visibility: ${({ open }) => (open ? 'visible' : 'hidden')};
    opacity: ${({ open }) => (open ? '1' : '0')};
    transition: visibility 0s, opacity 0.5s ease-in-out;
`;

const StyledMenu = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    list-style: none;
`;

const StyledLinkMenu = styled(Link)`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #fdc500;
    }
`;
const StyledButtonAuth = styled.button`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    background: none;
    border: none;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #fdc500;
    }
`;

const StyledLocaleButtons = styled.div`
`;


const StyledButtonLocale = styled.button`
	width: 50px;
	height: 50px;
	font-size: 1.25rem;
	font-weight: 400;
	color: #fff;
	background: rgba(0, 0, 0, 0);
	border: none;
	text-decoration-color: #C9A31E;
	transition: all .2s ease;
	:hover{
		color: #fdc500;
	};

	:active{
		color: #fdc500;
	}; 
	:focus{
		color: #fdc500;
	}; 
	@media (max-width: 868px) {
       max-width: 50px;
       max-height: 50px;
    };
`;

const ButtonsWrapper = styled.div`
        display: flex;
        justify-content: space-between;
    `;

const StyledButtonLogOut = styled.button`
    background: none;
    width: 30px;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    text-align: center;

    `;

const StyledLinkUserCabinet = styled(Link)`
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    margin: 1rem;
    text-align: center;
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
        color: #fdc500;
    }
    `;