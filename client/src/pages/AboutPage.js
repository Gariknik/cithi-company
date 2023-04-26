import React from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import AboutBackground from "../assets/pictures/about/AboutBackground.svg";
import Counter from "../features/Counter";


const AboutPage = (props) => {
    const {t} = useTranslation('translation',  {keyPrefix: 'about'});

    return (
        <StyledSection>
            <StyledContainer>
                <StyledTitle>{t("titles.title")}</StyledTitle>
                <StyledTitleSecond>
                    {t("titles.titleSecond")}
                </StyledTitleSecond>
                <StyledText>
                    {t("texts.paragraph")}
                </StyledText>
            </StyledContainer>
            <StyledWrap>
                <StyledContainer>
                    <StyledBlock>
                        <StyledStatistic>
                            <StyledWrapCounter>
                                <Counter count={15} updateInterval={200}/>
                                <StyledNum>+</StyledNum>
                            </StyledWrapCounter>
                            <StyledName>{t("texts.statNameFirst")}</StyledName>
                        </StyledStatistic>
                        <StyledStatistic>
                            <StyledWrapCounter>
                                <Counter count={945} updateInterval={2.5}/>
                                <StyledNum>+</StyledNum>
                            </StyledWrapCounter>
                            <StyledName>{t("texts.statNameSecond")}</StyledName>
                        </StyledStatistic>
                        <StyledStatistic>
                            <StyledWrapCounter>
                                <Counter count={1400} updateInterval={1}/>
                                <StyledNum>+</StyledNum>
                            </StyledWrapCounter>
                            <StyledName>{t("texts.statNameThird")}</StyledName>
                        </StyledStatistic>
                    </StyledBlock>
                </StyledContainer>
            </StyledWrap>
        </StyledSection>
    );
};

export default AboutPage;

const StyledSection = styled.section`
    margin-top: 70px;
    justify-content: center;
    width: 100%;
    height: 768px;
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

const StyledTitle = styled.h1`
    font-size: 3rem;
    font-weight: 400;
    margin: 7rem 0 0 0;
`;

const StyledTitleSecond = styled.h2`
    font-size: 2rem;
    margin: 4.125rem 0 2rem;
`;

const StyledText = styled.p`
    font-size: 1.25rem;
    font-weight: 400;
    max-width: 586px;
    margin: 0 0 8.25rem;
    line-height: 24px;
`;

const StyledWrap = styled.div`
    background-image: url(${AboutBackground});
    background-rapid: nereid;
    position: relative;
    height: 347px;
    
    &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(251, 218, 101, 0.6);
    }
`;
const StyledBlock = styled.div`
    display: flex;
    justify-content: space-around;
    padding: 90px 0;
    @media (max-width: 800px) {
        flex-direction: column;
        padding: 30px 0;
    };
`;
const StyledStatistic = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
    @media (max-width: 800px) {
        flex-direction: row;
        align-items: center;
        justify-content: space-around;
    };
`;

const StyledWrapCounter = styled.div`
    display: flex;   
`;

const StyledNum = styled.p`
    color: #fff;
    font-size: 4.5rem;
    font-weight: 600;
    margin: 0 0 2rem 0;
    z-index: 1;
    @media (max-width: 800px) {
        margin: 0 0 0 0;
    };
`;

const StyledName = styled.p`
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    z-index: 1;
    
`;