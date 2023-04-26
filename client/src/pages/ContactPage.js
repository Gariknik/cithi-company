import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import EllipseGreen from "../assets/pictures/contacts/EllipseGreen.svg";
import EllipseYellow from "../assets/pictures/contacts/EllipseYellow.svg";
import Picture from "../assets/pictures/contacts/Picture.svg";

const ContactPage = () => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'contacts'});
    // eslint-disable-next-line no-unused-vars
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };
    return (
        <>
            <StyledSection>
                <StyledContainer>
                    <StyledTitle> {t("titles.title")}</StyledTitle>
                    <StyledDiv
                        image1={EllipseGreen}
                        image2={EllipseYellow}
                        image3={Picture}
                        image1Pos="center"
                        image2Pos="top left"
                        image3Pos="bottom right"
                        image1PosX="85%"
                        image2PosX="15%"
                        image3PosX="50%"
                        image1PosY="150%"
                        image2PosY="-50%"
                        image3PosY="50%"
                    >
                        <StyledHours>
                            <StyledSecondTitle>{t("titles.titleHours")}</StyledSecondTitle>
                            <StyledText>{t("texts.textHours")}</StyledText>
                        </StyledHours>
                        <StyledPhone>
                            <StyledSecondTitle>{t("titles.titlePhone")}</StyledSecondTitle>
                            <StyledText>{t("texts.textPhone1")}</StyledText>
                            <StyledText className={"phone"}>{t("texts.textPhone2")}</StyledText>
                        </StyledPhone>
                        <StyledEmail>
                            <StyledSecondTitle>{t("titles.titleEmail")}</StyledSecondTitle>
                            <StyledText>{t("texts.textEmail")}</StyledText>
                        </StyledEmail>
                    </StyledDiv>
                </StyledContainer>
            </StyledSection>
        </>
    );
};

export default ContactPage;

const StyledSection = styled.section`
    justify-content: center;
    width: 100%;
    height: 768px;
    @media (max-width: 1000px) {
        height: 100%;
    };
`;

const StyledContainer = styled.div`
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    @media (max-width: 1000px) {
       padding: 0 70px;
    };
    @media (max-width: 600px) {
       padding: 0 50px;
    };
    @media (max-width: 410px) {
       padding: 0 10px;
    };
`;

const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 400;
    margin: 7rem 0 2rem 0;
    @media (max-width: 1000px) {
       margin: 5rem 0 0 0;
    };
`;

const StyledDiv = styled.div`
    background: url(${props => props.image1}), url(${props => props.image2}), url(${props => props.image3});
    background-position-x: ${props => props.image1PosX}, ${props => props.image2PosX}, ${props => props.image3PosX};
    background-position-y: ${props => props.image1PosY}, ${props => props.image2PosY}, ${props => props.image3PosY};
    background-repeat: no-repeat;
    height: 492px;
    display: flex;
    justify-content: space-around;
    @media (max-width: 1000px) {
        justify-content: space-between;
        height: 100%;
    };
    @media (max-width: 860px) {
        flex-direction: column;
        justify-content: center;
        text-align: center;
    };
`;

const StyledHours = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 0;
    @media (max-width: 1000px) {
       padding: 2rem 0;
    };
     @media (max-width: 768px) {
       padding: 1rem 0;
    };
`;

const StyledPhone = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 0;
    @media (max-width: 1000px) {
       padding: 2rem 0;
    };
    @media (max-width: 600px) {
       padding: 1rem 0;
    };
`;

const StyledEmail = styled.div`
    display: flex;
    flex-direction: column;
    padding: 150px 0;
    @media (max-width: 1000px) {
       padding: 2rem 0;
    };
    @media (max-width: 600px) {
       padding: 1rem 0;
    };
`;

const StyledSecondTitle = styled.h2`
    font-size: 1.5rem;
    font-weight: 400;
    margin: 0 0 3rem;
    @media (max-width: 1000px) {
       padding: 2rem 0;
    };
    @media (max-width: 1000px) {
       margin: 0;
    };
`;

const StyledText = styled.p`
    max-width: 250px;
    font-size: 1.5rem;
    font-weight: 400;
    letter-spacing: 0.075em;
    color: rgba(0, 0, 0, 0.6);
    margin-bottom: 2rem;
`;