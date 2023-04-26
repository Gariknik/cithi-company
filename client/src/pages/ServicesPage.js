import React, {useEffect, useState } from 'react';
import {useTranslation} from "react-i18next";
import styled from "styled-components";
import FirstIcon from "../assets/pictures/homepage/ThirdSectionFirstCardImg.svg";
import SecondIcon from "../assets/pictures/homepage/ThirdSectionSecondCardImg.svg";
import ThirdIcon from "../assets/pictures/homepage/ThirdSectionThirdCardImg.svg";



const ServicesPage = ({onLoginButtonClick, onLoginSuccessServ, loggedIn, data}) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'services'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);


    return (
        <StaledSection>
            <StyledContainer>
                <StyledTitle >{t("titles.title")}</StyledTitle>
                <StyledBlock>
                    <StyledHeadTwoWrap>
                        <StyledHeadTwo>
                            {t("titles.h")}
                        </StyledHeadTwo>
                    </StyledHeadTwoWrap>
                    <StyledContentBlock className={isVisible ? 'item fade-in' : 'item'}>
                        <StyledText>{t("texts.textInBlock")}</StyledText>
                        <StyledWrap>
                            <StyledCard>
                                <StyledBlockImgTitle>
                                    <StyledImg src={FirstIcon} alt={t("alts.firstCard")}/>
                                    <StyledTitleCard>{t("titles.firstCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.firstCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {onLoginButtonClick();
                                        loggedIn && onLoginSuccessServ('/services/services1', data);
                                        changeLanguage(i18n.language)}}
                                    className='card-button'/>
                            </StyledCard>
                            <StyledCard>
                                <StyledBlockImgTitle>
                                    <StyledImg src={SecondIcon} alt={t("alts.secondCard")}/>
                                    <StyledTitleCard>{t("titles.secondCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.secondCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {onLoginButtonClick();
                                        loggedIn && onLoginSuccessServ('/services/services2', data);
                                        changeLanguage(i18n.language)}}
                                    className='card-button'/>
                            </StyledCard>
                            <StyledCard>
                                <StyledBlockImgTitle>
                                    <StyledImg src={ThirdIcon} alt={t("alts.thirdCard")}/>
                                    <StyledTitleCard>{t("titles.thirdCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.thirdCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {onLoginButtonClick();
                                        loggedIn && onLoginSuccessServ('/services/services3', data);
                                        changeLanguage(i18n.language)}}
                                    className='card-button'/>
                            </StyledCard>
                        </StyledWrap>
                    </StyledContentBlock>
                </StyledBlock>
            </StyledContainer>
        </StaledSection>
    );

};

export default ServicesPage;


const StaledSection = styled.section`
    margin-top: 70px;
    justify-content: center;
    width: 100%;
    height: 668px;
    @media (max-width: 1000px) {
        height: 100%;
    };

`;

const StyledContainer = styled.div`
    padding: 0 100px;
    @media (max-width: 1000px) {
       padding: 0 50px;
    };
`;

const StyledTitle = styled.h1`
    max-width: 33.5625rem;
    font-size: 3rem;
    font-weight: 400;
    margin: 7rem 0 0 0;
    @media (max-width: 1000px) {
       margin: 5rem 0 0 0;
    };
`;

const StyledBlock = styled.div`
    display: flex;
    margin-top: 3.5rem;
    justify-content: space-around;
`;

const StyledText = styled.p`
    font-size: 1.5rem;
    font-weight: 400;
    @media (max-width: 600px) {
       display: none;
    };
`;

const StyledContentBlock = styled.div`
    max-width: 909px;
    height: 386px;
    padding: 2rem;
    background: rgba(199, 199, 199, 0.5);
    border-radius: 50px;
    opacity: 0;
    transition: all 3s ease;
    transform: translateX(50px);
    
    &.fade-in {
    opacity: 1;
    transform: translateX(0);
    }
    @media (max-width: 1000px) {
        max-width: 809px;
        height: 100%;
    };
    @media (max-width: 600px) {
       max-width: 100%;
    };
`;

const StyledWrap = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        justify-content: center;
    };
    @media (max-width: 600px) {
       padding: 1rem;
    };
    @media (max-width: 400px) {
       padding: 0;
    };
`;

const StyledCard = styled.div`
    width: 282px;
    height: 299px;
    border-radius: 50px;
    background: rgba(199, 199, 199, 0.0);
    padding: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    z-index: 1;
    transition: all .5s ease;
    :hover{
       font-weight: 600;
       transform: translateY(10px);
       background: #fff;
       border-radius: 50px;
       box-shadow: 0 0 15px rgba(0, 0, 0, .3); 
    };
    :hover .card-text {
        display: block;
    }
    :hover .card-button {
        display: block;
    };
    @media (max-width: 1000px) {
        padding: 1rem;
    };
    @media (max-width: 600px) {
       padding: 1rem;
    };
`;

const StyledHeadTwoWrap = styled.div`
    @media (max-width: 1060px) {
        display: none;
        
    };
`;

const StyledHeadTwo = styled.h2`
    display: block;
    color: #83C166;
    font-size: 3rem;
    font-weight: 400;
    width: 150px;
    margin-top: 255px;
    transform: rotate(270deg);
    transform-origin: bottom;
    @media (max-width: 1100px) {
        margin-top: 200px;
        
    };
`;

const StyledBlockImgTitle = styled.div`
    margin: auto auto;
`;

const StyledImg = styled.img`
`;

const StyledTitleCard = styled.h3`
    font-size: 1.25rem;
    font-weight: 400;
    margin: 1rem auto 0.5rem;

`;

const StyledParagraph = styled.p `
    font-size: 0.8125rem;
    margin: 0 auto 0.5rem;
    display: none;
`;

const StyledButton = styled.input`
    display: none;
    user-select: none;
    text-align: center;
    width: 25px;
    height: 25px;
    margin: 0 auto;
    background: #83C166;
    border-radius: 50%;
    border: none; 
    outline: none;
    font-size: 1.125rem;
    font-weight: 400;
    color: #fff;
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