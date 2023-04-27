import React, {useEffect, useState} from "react";
import styled from "styled-components";

const Counter = ({ count, updateInterval }) => {
    const [displayCount, setDisplayCount] = useState(0);

    useEffect(() => {
        let timer;
        if (displayCount < count) {
            timer = setInterval(() => {
                setDisplayCount((prevCount) => prevCount + 1);
            }, updateInterval);
        }
        return () => {
            clearInterval(timer);
        };
    }, [displayCount, count, updateInterval]);

    return <CounterContainer>{displayCount}</CounterContainer>;
};
export default Counter;

const CounterContainer = styled.div`
    color: #fff;
    font-size: 4.5rem;
    font-weight: 600;
    margin: 0 0 2rem 0;
    z-index: 1;
    @media (max-width: 600px) {
       font-size: 2rem;
       margin: 0 0 2rem 0;
    };
`;
