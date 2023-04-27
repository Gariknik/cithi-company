import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import SliderFirstSection from "../../features/SliderFirstSection";
import firstImg from "../../assets/pictures/homepage/firstImgFirstSection.svg";
import secondImg from "../../assets/pictures/homepage/secondImgFirstSection.svg";
import thirdImg from "../../assets/pictures/homepage/thirdImgFirstSection.svg";
import AuthDialog from "../../components/AuthDialog";
import ShemTop from "../../assets/pictures/homepage/ShemTop.svg";
import ShemBottom from "../../assets/pictures/homepage/ShemBottom.svg";

const images = [
    firstImg,
    secondImg,
    thirdImg
];


const FirstSection = ({ onLoginButtonClick, onLoginSuccessServ, loggedIn, data }) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'homepage'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(max-width: 1064px)');
        setIsSmallScreen(mediaQuery.matches);
        const handler = (e) => setIsSmallScreen(e.matches);
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
    }, []);



    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };

    return (
        <StyledSection>
            <StyledContainer >
                <StyledWrap>
                    <StyledBlock>
                        <StyledContentBlock>
                            <StyledTitle>{t("titles.first")}</StyledTitle>
                            <StyledParagraph>{t("paragraphs.first")}</StyledParagraph>
                            <StyledButton
                                type="button"
                                value={t("button")}
                                onClick={() => {
                                    onLoginButtonClick();
                                    loggedIn && onLoginSuccessServ('/services/services1', data);
                                    changeLanguage(i18n.language);}} />
                        </StyledContentBlock>
                        <StyledWrapperSlider>
                            <ShemImgBottom src={ShemBottom} alt="shem" />
                            {!isSmallScreen && <SliderFirstSection images={images} />}
                            <ShemImgTop src={ShemTop} alt="shem"/>
                        </StyledWrapperSlider>
                    </StyledBlock>
                </StyledWrap>
            </StyledContainer>
            {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
        </StyledSection>
    );
};

export default FirstSection;

const StyledSection = styled.section`
    margin-top: 70px;
    width: 100%;
    height: 600px;
    @media (max-width: 1064px) {
       max-height: 600px;
    };
    @media (max-width: 600px) {
       padding: 0 50px;
       max-height: 400px;
    };
    @media (max-width: 410px) {
       padding: 0 10px;

    };
`;

const StyledContainer = styled.div`
    padding: 0 100px;
    @media (max-width: 600px) {
       padding: 0 50px;
    };
`;

const StyledWrap = styled.div`
   
`;

const StyledContentBlock = styled.div`
    margin: 100px 0 250px 100px;
    position: absolute;
    left: 0;
    @media (max-width: 1064px) {
        text-align: center;
        position: static;
        margin-top: 0;
    };
    @media (max-width: 600px) {
       max-height: 400px;
       margin: 0;
    };
`;


const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 500;
    margin: 112px 0 30px;
    text-align: center;
    @media (max-width: 600px) {
        font-size: 2.5rem;
        text-align: center;
        
    };

`;

const StyledParagraph = styled.p `
    font-size: 1.25rem;
     @media (max-width: 600px) {
        text-align: center;
        
    };    
`;


const StyledButton = styled.input`
    display: flex;
    text-align: center;
    user-select: none;
    width: 171px;
    height: 41px;
    margin: 70px;
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


const StyledBlock = styled.div`
    display: flex;
    justify-content: space-around;
`;

const StyledWrapperSlider = styled.div `
    margin: 70px 100px 70px 0;
    position: absolute;
    right: 0;
    @media (max-width: 1064px) {
        display: none
    };
    
`;

const ShemImgBottom = styled.img`
    position: relative;
    top: 430px;
    left: 0;
    @media (max-width: 1064px) {
        display: none
    };

`;

const ShemImgTop = styled.img`
    position: relative;
    top: -480px;
    right: -370px;
    @media (max-width: 1064px) {
        display: none
    };

`;