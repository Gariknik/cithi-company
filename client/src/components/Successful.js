import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import checkMark from '../assets/checkMark.svg'

const Successful = ({ username, onClose }) => {
    const {t} = useTranslation('translation',  {keyPrefix: 'successful'});


    const [show, setShow] = useState(true);

    if (!show) {
        return null;
    }

    setTimeout(() => {
        setShow(false);
        onClose();
    }, 1000);

    return (
        <StyledSuccessful>
            <StyledCkeckImg src={checkMark} alt={''}/>
            <StyledParagraph>{username ? `${t("message1")} ${username}` : t("message1")}</StyledParagraph>
        </StyledSuccessful>
    );
};

export default Successful;

const StyledSuccessful = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem;
  align-items: center;
  position: fixed;
  width: 235px;
  height: 50px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  color: #000;
  z-index: 999;
  box-shadow: 0 0 5px rgba(0, 0, 0, .3);
  background: #fff;
`;

const StyledCkeckImg = styled.img`
    display: block;
    width: 40px;
    height: 40px;
`;

const StyledParagraph = styled.p`
    font-size: 1rem;

`;