import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {sendPostRequestAddOrders} from "../entities/api"
import Successful from "../components/Successful";


const ServicesPageInTwo = ({data}) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'services2'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [isVisible, setIsVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessful, setShowSuccessful] = useState(false);
    const navigate = useNavigate();

    const handelBackPage = () => {navigate(-1)};

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleButtonClick = async (price_id) => {
        const user_id = data.id;
        const url = `/add_order`;
        try {
            const result = await sendPostRequestAddOrders(url, {"user_id": user_id , "price_id" : price_id}, setIsLoading);
            if (result) {
                setShowSuccessful(true);
            }
        }catch {
            setShowSuccessful(false);
        }
    };

    const handleSuccessfulClose = () => {
        setShowSuccessful(false);
    };


    const cardsData = [
        {
            id: i18n.language === "en" ? "5" : "17",
            title: t("titles.firstCard"),
        },
        {
            id: i18n.language === "en" ? "6" : "18",
            title: t("titles.secondCard"),
        },
        {
            id: i18n.language === "en" ? "7" : "19",
            title: t("titles.thirdCard"),
        },
        {
            id: i18n.language === "en" ? "8" : "20",
            title: t("titles.fourthCard"),
        },
    ];

    const renderCards = () => {
        return cardsData.map((card, index) => (
            <StyledCard key={index}>
                <StyledTitleCard>{card.title}</StyledTitleCard>
                <StyledButton value={t("btnCards")} onChange={changeLanguage} onClick={() => handleButtonClick(card.id)} />
            </StyledCard>
        ));
    };
    return (
        <>
            <StyledSection>
                <StyledContainer>
                    <StyledTitle>{t("titles.title")}</StyledTitle>
                    <StyledBlock>
                        <div>
                            <StyledHeadTwo>
                                {t("titles.h")}
                            </StyledHeadTwo>
                        </div>
                        <StyledContentBlock className={isVisible ? 'item fade-in' : 'item'}>
                            <StyledWrap>
                                {renderCards()}
                            </StyledWrap>
                        </StyledContentBlock>
                    </StyledBlock>
                    <StyledButtonDiff value={t("btnDiff")} onChange={changeLanguage} onClick={handelBackPage} />
                    {showSuccessful && (<Successful onClose={handleSuccessfulClose} />)}
                </StyledContainer>
            </StyledSection>
        </>
    );
};

export default ServicesPageInTwo;



const StyledSection = styled.section`
    justify-content: center;
    width: 100%;
    height: 768px;
    @media (max-width: 1170px) {
       height: 100%;
    };
`;

const StyledContainer = styled.div`
    padding: 0 100px;
    display: flex;
    flex-direction: column;
    @media (max-width: 600px) {
       padding: 0 2rem;
    };
`;

const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 400;
    margin: 7rem 0 0 0;
    @media (max-width: 600px) {
        font-size: 2.5rem;
        text-align: center;
        
    };
`;

const StyledBlock = styled.div`
    display: flex;
    margin-top: 3.5rem;
    justify-content: space-around;
`;


const StyledContentBlock = styled.div`
    width: 909px;
    height: 386px;
    @media (max-width: 1170px) {
       height: 100%;
    };
`;

const StyledWrap = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const StyledCard = styled.div`
    width: 338px;
    height: 147px;
    margin: 2rem;
    border-radius: 50px;
    background: #fff;
    box-shadow: 0 0 15px rgba(0, 0, 0, .3); 
    padding: 30px;
    display: flex;
    flex-direction: column;
    text-align: center;
    z-index: 1;
    @media (max-width: 600px) {
        width: 240px;
        height: auto;
        margin: 2rem 0;    
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
    @media (max-width: 770px) {
       display: none;
    };
`;


const StyledTitleCard = styled.h3`
    font-size: 1.25rem;
    font-weight: 400;
    margin: 0 auto 0.5rem;
`;


const StyledButton = styled.input`
    user-select: none;
    text-align: center;
    width: 141px;
    height: 40px;
    margin: 0.5rem auto;
    font-weight: 400;
    background: #83C166;
    border-radius: 50px;
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

const StyledButtonDiff = styled.input`
    user-select: none;
    text-align: center;
    width: 141px;
    height: 40px;
    margin: 3rem auto 0;
    font-weight: 400;
    color: #83C166;
    cursor: pointer;
    background: #fff;
    border: solid 1px #83C166;
    border-radius: 50px;
    outline: none;
    font-size: 1.125rem;
    font-weight: 400;
    transition: all .2s ease;
    
    :hover{
       color: #fff;
       cursor: pointer;
       background: #83C166;
       border: none;
       box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    };
    
    :active{
       color: #fff;
       cursor: pointer;
       background: #83C166;
       border: none;
       box-shadow: 0 0 5px rgba(0, 0, 0, .3);
    };
`;