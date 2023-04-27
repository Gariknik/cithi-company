import React, { useState, useEffect } from "react";
import styled from "styled-components";



const SliderFirstSection = ({ images }) => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }, 4000);
        return () => clearInterval(intervalId);
    }, [images.length]);

    const handleIndicatorClick = (i) => {
        setIndex(i);
    };
    return (

        <StyledBlock  className="slider">
            <StyledSliderkWrap className="slider__image-container">

                {images.map((src, i) => (
                    <StyledImg
                        key={i}
                        src={src}
                        alt={`Slide ${i + 1}`}
                        index={i}
                        data-active={i === index}
                        style={{ transform: `translateX(-${index * 100}%)` }}
                    />
                ))}
            </StyledSliderkWrap>
            <StyledButtonBlock  className="slider__indicators">
                {images.map((_, i) => (
                    <StyledButton
                        key={i}
                        active={i === index}
                        onClick={() => handleIndicatorClick(i)}
                    />
                ))}

            </StyledButtonBlock>
        </StyledBlock >
    );
};

export default SliderFirstSection;


const StyledBlock = styled.div `
 
`;

const StyledSliderkWrap = styled.div `
    display: flex;
    overflow-x: hidden;
    width: 450px;
    margin: 0 auto;
    display: flex;
    
`;



const StyledImg = styled.img`
    flex: 0 0 auto;
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    transition: opacity 2s ease;
        &[data-active="true"] {
        opacity: 1;      
    }

`;

const StyledButtonBlock = styled.div `
    width: 120px;
    height: 30px;
    display: flex;
    justify-content: space-between;
    margin: auto 40%;
`;

const StyledButton = styled.button `    
  border: solid 1px ${(props) =>
    props.active ? '#83C166' : '#000'};
  background-color: ${(props) =>
    props.active ? '#83C166' : "transparent"};
  width: 20px;
  height: 20px;
  margin-right: 8px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: ${(props) => '#83C166'};
  }
`;