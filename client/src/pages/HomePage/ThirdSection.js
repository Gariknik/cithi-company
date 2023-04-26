import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import ThirdSectionBackGround from "../../assets/pictures/homepage/ThirdSectionBackground.svg";
import FirstIcon from "../../assets/pictures/homepage/ThirdSectionFirstCardImg.svg";
import SecondIcon from "../../assets/pictures/homepage/ThirdSectionSecondCardImg.svg";
import ThirdIcon from "../../assets/pictures/homepage/ThirdSectionThirdCardImg.svg";
import VectorOne from "../../assets/pictures/homepage/ThirdSectionVectorOne.svg";
import VectorTwo from "../../assets/pictures/homepage/ThirdSectionVectorTwo.svg";
import VectorThree from "../../assets/pictures/homepage/ThirdSectionVectorThree.svg";
import AuthDialog from "../../components/AuthDialog";

const ThirdSection = ({onLoginButtonClick, onLoginSuccessServ, loggedIn, data}) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'homepage'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);


    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };

    const cards = [
        {
            image: FirstIcon,
            alt: t("alts.firstCard"),
            text: t("paragraphs.third.cardOne"),
            onClick: () => {
                onLoginButtonClick();
                loggedIn && onLoginSuccessServ('/services/services1', data);
                changeLanguage(i18n.language);
            }
        },
        {
            image: SecondIcon,
            alt: t("alts.secondCard"),
            text: t("paragraphs.third.cardTwo"),
            onClick: () => {
                onLoginButtonClick();
                loggedIn && onLoginSuccessServ('/services/services2', data);
                changeLanguage(i18n.language);
            }
        },
        {
            image: ThirdIcon,
            alt: t("alts.thirdCard"),
            text: t("paragraphs.third.cardThree"),
            onClick: () => {
                onLoginButtonClick();
                loggedIn && onLoginSuccessServ('/services/services3', data);
                changeLanguage(i18n.language);
            }
        }
    ];

    const renderCards = () => {
        return cards.map((card, index) => (
            <React.Fragment key={index}>
                <StyledCard>
                    <StyledImg src={card.image} alt={card.alt} />
                    <StyledParagraph>{card.text}</StyledParagraph>
                    <StyledButton type="button" value={t("button")} onClick={card.onClick} />
                </StyledCard>
                {index === 0 && <StyledVectorTwo src={VectorTwo} />}
                {index === 1 && <StyledVectorThree src={VectorThree} />}
            </React.Fragment>
        ));
    };


    return (
        <StyledSection>
            <StyledContainer>
                <StyledBlock>
                    <StyledTitle>{t("titles.third")}</StyledTitle>
                    <StyledContentBlock>
                        <div>
                            <StyledHeadTwo>
                                {t("titles.h")}
                            </StyledHeadTwo>
                        </div>
                        <StyledVectorOne src={VectorOne}/>
                        {renderCards()}
                    </StyledContentBlock>
                    {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
                </StyledBlock>
            </StyledContainer>

        </StyledSection>
    );
};

export default ThirdSection;

const StyledSection = styled.section`
    width: 100%;
    background-image: url(${ThirdSectionBackGround});
    background-size: 100%;
    background-repeat: no-repeat;
    height: 768px;
    @media (max-width: 1000px) {
        height: 100%;
    };
    @media (max-width: 600px) {
       background: none;
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

const StyledBlock = styled.div`
    display: flex;
    flex-direction: column;
`;

const StyledTitle = styled.h1`
    max-width: 33.5625rem;
    font-size: 3rem;
    font-weight: 500;
    margin: 7rem 0 0 0;
    text-align: center;
    @media (max-width: 1000px) {
       margin: 5rem 0 0 0;
    };
`;

const StyledContentBlock = styled.div`
    display: flex;
    margin-top: 5.5rem;
    justify-content: space-between;
    @media (max-width: 1000px) {
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 5.5rem;
    };
`;

const StyledCard = styled.div`
    width: 299px;
    height: 372px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(0, 0, 0, .7);
    padding: 50px;
    text-align: center;
    z-index: 1;
    transition: all .5s ease;
    :hover{
       font-weight: 600;
       transform: scale(1.05, 1.05);
       box-shadow: 0 0 15px rgba(0, 0, 0, .3); 
    };
     :active{
       font-weight: 600;
       transform: scale(1.05, 1.05);
       box-shadow: 0 0 15px rgba(0, 0, 0, .3) inset; 
    };
     @media (max-width: 1000px) {
        margin-bottom: 2rem;
    };
    
`;


const StyledHeadTwo = styled.h2`
    display: block;
    font-size: 3rem;
    font-weight: 400;
    width: 150px;
    margin-top: 255px;
    transform: rotate(270deg);
    transform-origin: bottom;
    @media (max-width: 1100px) {
        display: none;
    };
`;

const StyledImg = styled.img`
    display: block;
    margin: 0 auto 2rem;
`;

const StyledVectorOne = styled.img`
    position: absolute;
    top: 1875px;
    left: 160px;
    @media (max-width: 1100px) {
        display: none;
    };
`;
const StyledVectorTwo = styled.img`
    position: absolute;
    top: 1875px;
    left: 510px;
    @media (max-width: 1100px) {
        display: none;
    };
`;
const StyledVectorThree = styled.img`
    position: absolute;
    top: 1875px;
    left: 860px;
    @media (max-width: 1100px) {
        display: none;
    };
`;

const StyledParagraph = styled.p `
    font-size: 1.25rem;
    margin: 0 auto 3rem;
`;


const StyledButton = styled.input`
    display: flex;
    user-select: none;
    text-align: center;
    width: 171px;
    height: 41px;
    margin: 0 auto;
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


