import React, {useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import { Link } from "react-router-dom";
import SecondSectionPicture from "../../assets/pictures/homepage/SecondSectionPicture.svg"
import EllipseGreen from "../../assets/pictures/homepage/EllipseGreen.svg"
import EllipseYellow from "../../assets/pictures/homepage/EllipseYellow.svg"

const SecondSection = () => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'homepage'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.pageYOffset + window.innerHeight;
            const itemElement = document.querySelector('.item');

            if (itemElement && itemElement.offsetTop < scrollTop) {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <StyledSection>
            <StyledContainer>
                <StyledWrap>
                    <StyledBlock>
                        <StyledImgBlock>
                            <StyledEllipseYellow src={EllipseYellow} className={isVisible ? 'item fade-in' : 'item'}/>
                            <StyledImg src={SecondSectionPicture} className={isVisible ? 'item fade-in' : 'item'}/>
                            <StyledEllipseGreen src={EllipseGreen} className={isVisible ? 'item fade-in' : 'item'}/>
                        </StyledImgBlock>
                        <StyledContentBlock className={isVisible ? 'item fade-in' : 'item'}>
                            <StyledTitle>{t("titles.second")}</StyledTitle>
                            <StyledParagraph >{t("paragraphs.second")}</StyledParagraph>
                            <StyledLink to='/about' onChange={changeLanguage}>
                                {t("link")}<span>   &rarr;</span>
                            </StyledLink>
                        </StyledContentBlock>
                    </StyledBlock>
                </StyledWrap>
            </StyledContainer>
        </StyledSection>
    );
};

export default SecondSection;

const StyledSection = styled.section`
    width: 100%;
    height: 768px;
    @media (max-width: 1000px) {
        height: 668px;
    };
    @media (max-width: 600px) {
       max-height: 400px;
    };

`;

const StyledContainer = styled.div`
    padding: 0 100px;
    @media (max-width: 600px) {
       padding: 0 50px;
    };
    @media (max-width: 410px) {
       padding: 0 10px;
    };
`;

const StyledWrap = styled.div`

`;

const StyledImgBlock = styled.div`
    position: absolute;
    display: block;
    @media (max-width: 768px) {
        display: none;
    };
`;


const StyledImg = styled.img`
    position: relative;
    top: 100px;
    z-index: 1;
    opacity: 0;
    transition: all 6s ease;
    transform: translateY(-200px);
    
    &.fade-in {
    opacity: 1;
    transform: translateX(0);
    };

`;


const StyledEllipseGreen = styled.img`
    position: relative;
    top: 160px;
    right: 170px;
    opacity: 0;
    transition: all 4s ease;
    transform: translateY(-300px);
    
    &.fade-in {
    opacity: 1;
    transform: translateX(0);
    };
    @media (max-width: 1334px) {
        right: 350px;
    };
    @media (max-width: 1320px) {
        display: none;
    };
`;

const StyledEllipseYellow = styled.img`
    position: relative;
    top: -80px;
    left: 170px;
    opacity: 0;
    transition: all 3s ease;
    transform: translateY(-200px);
    
    &.fade-in {
    opacity: 1;
    transform: translateX(0);
    };
    @media screen and (max-width: 1334px) {
        left: 350px;
    };
    @media screen and (max-width: 1320px) {
        display: none;
    };
    
`;

const StyledContentBlock = styled.div`
    position: relative;
    z-index: 2;
    max-width: 260px;
    height: 400px;
    top: 140px;
    left: 260px;
    opacity: 0;
    transition: all 6s ease;
    transform: translateY(-300px);
    
    &.fade-in {
    opacity: 1;
    transform: translateX(0);
    }
    @media (max-width: 1164px) {
        max-width: 400px;
        left: 0;
    };
    
`;


const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 500;
    text-align: center;
    @media (max-width: 600px) {
        font-size: 2.5rem;
        text-align: center;
        
    };
`;

const StyledParagraph = styled.p `
    font-size: 1.25rem;
    margin-top: 2rem;
`;


const StyledLink =  styled(Link)`
    text-decoration: none;
    display: block;
    font-size: 1.25rem;
    color: #000;
    text-align: center;
    margin-top: 1.5rem;
    :hover {
        font-weight: 600;  
    };
     :active{
        font-weight: 600;
    };
    :focus{
        font-weight: 600;
    }
`;


const StyledBlock = styled.div`
    display: flex;
    justify-content: space-around;
`;