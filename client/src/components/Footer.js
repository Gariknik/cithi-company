import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import LogoIcon from '../assets/IconLogo.svg';

const Footer = () => {
    const {t} = useTranslation('translation',  {keyPrefix: 'footer'});

    return (
        <>
            <StyledFooter>
                <StyledBlockLogo>
                    <StyledLink to='/'>
                        <Logo>
                            <img src={LogoIcon} alt={t("alts.iconLogo")}/>
                        </Logo>
                    </StyledLink>
                </StyledBlockLogo>
                <StyledBlockMenu>
                    <StyledMenu>
                        <StyledLinkMenu to='/'>{t("menu.homepage")}</StyledLinkMenu>
                        <StyledLinkMenu to='/services'>{t("menu.services")}</StyledLinkMenu>
                        <StyledLinkMenu to='/about'>{t("menu.about")}</StyledLinkMenu>

                        <StyledLinkMenu to='/contacts'>{t("menu.contacts")}</StyledLinkMenu>
                    </StyledMenu>
                    <StyledParagraph>
                        {t("copyright")}
                    </StyledParagraph>
                </StyledBlockMenu>

            </StyledFooter>
        </>
    );
};

export default Footer;

const StyledFooter = styled.footer`
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 0 100px 50px;
    text-decoration: none;
	display: flex;
	background: #fff;
	justify-content: space-between;
	@media (max-width: 1100px) {
	    justify-content: space-around;
        flex-wrap: wrap;
    };
     @media (max-width: 768px) {
       padding: 50px 50px;
    };
    @media (max-width: 410px) {
       padding: 50px 10px;
    };
`;

const StyledBlockLogo = styled.div`
    display: flex;
    align-items: center;
`;

const StyledBlockMenu = styled.div`
    display: flex;
    flex-direction: column;
`;
const StyledLink = styled(Link)`
    text-decoration: none;
`;

const StyledMenu = styled.div`
    max-width: 700px;
    display: flex;
    justify-content: flex-end;
    @media (max-width: 1100px) {
	    justify-content: center;
        flex-wrap: wrap;
    }
`;

const StyledLinkMenu = styled(Link)`
    text-decoration: none;
    font-size: 1.25rem;
    color: #000;
    margin-left: 30px 
`;

const Logo = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;
`;

const StyledParagraph = styled.p`
    display: block;
    margin-top: 6rem;
    text-align: end;
    font-size: 1.25rem;
    @media (max-width: 1100px) {
	    margin: 2rem auto 0;
	    text-align: center;
    }
`;