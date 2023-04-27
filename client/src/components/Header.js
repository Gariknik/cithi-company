import React, { useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../assets/IconLogo.svg';
import AddUserIcon from '../assets/IconAddUser.svg';
import HamburgerMenu from "./HamburgerMenu";
import LoginIcon from '../assets/IconLogin.svg';
import OutIcon from '../assets/out.png'
import AuthDialog from "./AuthDialog";
import { LogOut } from "../entities/api"

const Header = ({ onLoginButtonClick, handleLogOutButtonClick, loggedIn }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'header' });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleButtonClickLogOut = async () => {
        const url = `/logout`;
        try {
            const result = await LogOut(url);
            if (result) {
                console.log(result.message);
                console.log(true);
            }
        }catch {
            console.log(false);
        }
    };

    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };

    const handleToggle = () => setOpen(!open);
    const mediaQuery = '(max-width: 768px)';

    const hamProps = {
        onLoginButtonClick: onLoginButtonClick,
        loggedIn: loggedIn,
        handleLogOutButtonClick: handleLogOutButtonClick,
        logOutServer: handleButtonClickLogOut
    };
    return (
        <StyledHeader>
            <StyledLink to="/">
                <Logo>
                    <img src={LogoIcon} alt={t('alts.iconLogo')} />
                </Logo>
            </StyledLink>
            <StyledMenu>
                <StyledLinkMenu to="/">{t('menu.homepage')}</StyledLinkMenu>
                <StyledLinkMenu to="/services">{t('menu.services')}</StyledLinkMenu>
                <StyledLinkMenu to="/about">{t('menu.about')}</StyledLinkMenu>
                <StyledLinkMenu to="/contacts">{t('menu.contacts')}</StyledLinkMenu>
            </StyledMenu>
            <StyledLocaleButtons>
                <StyledButtonLocale onClick={() => changeLanguage('uk')}>UK</StyledButtonLocale>
                <StyledButtonLocale onClick={() => changeLanguage('en')}>EN</StyledButtonLocale>
            </StyledLocaleButtons>
            <ButtonsWrapper>
                {loggedIn ? (
                    <>
                        <StyledLinkUserCabinet to="/user">
                            <img src={LoginIcon} alt="" />
                        </StyledLinkUserCabinet>
                        <StyledButtonLogOut onClick={() => {
                            localStorage.removeItem('loggedIn');
                            handleLogOutButtonClick();
                            handleButtonClickLogOut();
                        }}>
                            <img src={OutIcon} alt="" />
                        </StyledButtonLogOut>
                    </>
                ) : (
                    <>
                        <StyledButtonAuth onClick={() => {onLoginButtonClick()}}>
                            <img src={AddUserIcon} alt="" />
                        </StyledButtonAuth>
                    </>
                )}
            </ButtonsWrapper>
            {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
            <StyledHamburger onClick={handleToggle} >
                <span></span>
                <span></span>
                <span></span>
            </StyledHamburger>
            <HamburgerMenu open={open} setOpen={setOpen} {...hamProps} />
            {open || !window.matchMedia(mediaQuery).matches ? (
                <HamburgerMenu isOpen={open} onClose={handleToggle} {...hamProps} />
            ) : null}
        </StyledHeader>
    );
};

export default Header;

const StyledHeader = styled.header`
    position: fixed;
    z-index: 3;
    top: 0;
    width: 100%;
    height: 70px;
    border-radius: 0 0 7px 7px;
    padding: 10px 100px;
    text-decoration: none;
	display: flex;
	justify-content: space-between;
	align-items: center;
	@media (max-width: 868px) {
        padding: 10px 60px;
    };
    @media (max-width: 600px) {
       padding: 0 50px;
    };
    @media (max-width: 410px) {
       padding: 0 10px;
    };
`;

const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledMenu = styled.div`
    width: 600px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media (max-width: 1164px) {
        max-width: 400px;
    };
    @media (max-width: 768px) {
        display: none;
    };
`;

const StyledLinkMenu = styled(Link)`
    text-decoration: none;
    font-size: 1.25rem;
    color: #000;
    margin-right: 30px ;
    transition: all .2s ease;
    :hover{
        font-weight: 600;
    };
    :active{
        font-weight: 600;
    };
    :focus{
        font-weight: 600;
    }
    @media (max-width: 1165px) {
       margin-right: 1rem ;
    };
`;

const Logo = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    cursor: pointer;
`;
const StyledLocaleButtons = styled.div`
    @media (max-width: 768px) {
        display: none;
    };
`;


const StyledButtonLocale = styled.button`
	width: 35px;
	height: 35px;
	font-size: 1rem;
	font-weight: 400;
	color: #242424;
	background: none;
	border: none;
	text-decoration-color: #C9A31E;
	transition: all .2s ease;
	:hover{
		color: #6BD4D4;
	};

	:active{
		color: #83C166;
	}; 
	:focus{
		color: #83C166;
		border: 1px solid #83C166;
	}; 
	@media (max-width: 868px) {
       max-width: 35px;
       max-height: 35px;
    };
`;

const StyledButtonAuth = styled.button`
    background: none;
    border: none;
    @media (max-width: 768px) {
        display: none;
    };
`;

const StyledHamburger = styled.button`
  display: none;
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 30px;
    height: 25px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin-right: 20px;

    &:focus {
      outline: none;
    }

    span {
      width: 100%;
      height: 3px;
      background: #000;
      border-radius: 5px;
      transition: all 0.3s ease-in-out;
      position: relative;
      transform-origin: center;
    }

    .bar1 {
      transform: ${({ open }) => open ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)'};
    }

    .bar2 {
      opacity: ${({ open }) => open ? '0' : '1'};
    }

    .bar3 {
      transform: ${({ open }) => open ? 'rotate(-45deg) translate(7px, -6px)' : 'rotate(0)'};
    }
  }
`;

const ButtonsWrapper = styled.div`
        width: 100px;
        display: flex;
        justify-content: space-between;
    `;

const StyledButtonLogOut = styled.button`
    background: none;
    cursor: pointer;
    width: 30px;
    border: none;
    @media (max-width: 768px) {
        display: none;
    };
    `;

const StyledLinkUserCabinet = styled(Link)`
    cursor: pointer;
    `;