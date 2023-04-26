import React from 'react';
import FirstSection from "./FirstSection";
import SecondSection from "./SecondSection";
import ThirdSection from "./ThirdSection";

const HomePage = ({onLoginButtonClick, onLoginSuccessServ, loggedIn, data}) => {
    const propsHome = {
        onLoginButtonClick: onLoginButtonClick,
        onLoginSuccessServ: onLoginSuccessServ,
        loggedIn: loggedIn,
        data: data
    };

    return (
        <>
            <FirstSection {...propsHome} />
            <SecondSection />
            <ThirdSection {...propsHome} />
        </>
    );
};

export default HomePage;

