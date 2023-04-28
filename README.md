# cithi-company

"CITHI-COMPANY" - це веб-сайт, який надає послуги в сфері інформаційних технологій. На цьому сайті користувачі можуть знайти інформацію про компанію, її послуги та продукти, а також зв'язатися з її представниками. "CITHI-COMPANY" може запропонувати широкий спектр послуг, включаючи розробку веб-сайтів, програмне забезпечення, мобільні додатки, аналітику даних, інтернет-маркетинг, технічне обслуговування компьютерів та багато іншого. Крім того, на сайті може бути розміщений блог, де користувачі можуть знайти корисні статті та новини про сферу ІТ."

## 1. Клієнтська частина сайту
### index.js - головний файл додатку React JS (./client/index.js)
Цей код є файлом JavaScript, який використовує бібліотеку React для створення веб-додатку.

import React, { Suspense } from 'react'; імпортує React та інші компоненти з бібліотеки React.

import {createRoot} from 'react-dom/client'; імпортує функцію createRoot з бібліотеки react-dom.

import reportWebVitals from './reportWebVitals'; імпортує функцію reportWebVitals з локального файлу reportWebVitals.js.

import {createGlobalStyle} from 'styled-components'; імпортує функцію createGlobalStyle з бібліотеки styled-components.

import Lato400woff from "./assets/fonts/Lato-Regular.woff";, import Lato500woff from "./assets/fonts/Lato-Semibold.woff";, та import Lato600woff from "./assets/fonts/Lato-Bold.woff"; імпортують шрифти Lato з локальної папки ./assets/fonts/.

import './i18n'; імпортує локалізаційний файл з локальної папки ./i18n/.

import AppWrapper from "./app"; імпортує головний компонент AppWrapper з локального файлу app.js.

const Global = createGlobalStyle... оголошує змінну Global, яка містить глобальні стилі для додатку, такі як налаштування шрифту.

createRoot(document.getElementById(root)).render(...); створює вузол React для відображення компонентів, передає його вузол з id рівним root та рендерить компонент AppWrapper разом з глобальними стилями та локалізацією.

reportWebVitals(); викликає функцію reportWebVitals для відслідковування та повідомлення про вимірювання виконання додатку.
```
import React, { Suspense } from 'react';
import {createRoot} from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {createGlobalStyle} from 'styled-components';
import Lato400woff from "./assets/fonts/Lato-Regular.woff";
import Lato500woff from "./assets/fonts/Lato-Semibold.woff";
import Lato600woff from "./assets/fonts/Lato-Bold.woff";
import './i18n';
import AppWrapper from "./app";


const Global = createGlobalStyle`
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      user-select: none;
      font-size: 16px;
    };
    /* lato-regular */
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 400;
      src: url(${Lato400woff}) format('woff'), /* Modern Browsers */
    };
    /* lato-semibold */
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 500;
      src: url('${Lato500woff}') format('woff'), /* Modern Browsers */
    };
    
createRoot(document.getElementById(`root`)).render(
    <Suspense fallback={<div>Loading...</div>}>
        <Global />
        <AppWrapper />
    </Suspense>
);


reportWebVitals();


i18n.js
import i18n from 'i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
  lng: 'uk',
  debug: true,
  detection: {
    order: ['queryString', 'cookie'],
    cache: ['cookie']
  },
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
```

### index.js (AppWrapper) - обгортка App React JS (./client/src/app/index.js)
import React from "react"; імпортує бібліотеку React.

import App from "./App"; імпортує головний компонент App з локального файлу App.js.


import { BrowserRouter} from 'react-router-dom'; імпортує BrowserRouter з бібліотеки react-router-dom, який дозволяє створити маршрутизацію веб-додатку.

import { GoogleOAuthProvider } from '@react-oauth/google'; імпортує GoogleOAuthProvider з бібліотеки @react-oauth/google, яка надає можливість використовувати Google OAuth для аутентифікації користувачів.

const AppWrapper = () => { ... }; оголошує змінну AppWrapper, яка містить функціональний компонент, який повертає обгортку BrowserRouter, яка містить GoogleOAuthProvider та головний компонент App.

<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><App /></GoogleOAuthProvider> передає clientId для GoogleOAuthProvider, який містить ідентифікатор клієнта, який використовується для отримання доступу до Google API. Головний компонент App відображається всередині GoogleOAuthProvider.

export default AppWrapper; експортує AppWrapper для використання в інших файлах.

```
import React from "react";
import App from "./App";
import { BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';


const AppWrapper = () => {

    return (
        <BrowserRouter>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}><App /></GoogleOAuthProvider>

        </BrowserRouter>

    );
};

export default AppWrapper;

```
### App.js - одаток React JS (./client/src/app/App.js)

Основна частина коду - компонент "App". У ньому використовуються різні хуки React, такі як "useState" та "useEffect". Також компонент містить ряд інших компонентів, які відображають заголовок, футер та інші елементи інтерфейсу.
Компонент "App" має наступний функціонал:
*	зберігання даних користувача та стану авторизації в локальному сховищі;
*	відображення різних сторінок в залежності від шляху, по якому вони запитуються;
*	перехід на сторінку після успішної авторизації;
*	обробка подій від модального вікна для авторизації та реєстрації;
*	відображення повідомлення про успішну авторизацію та можливість вийти з облікового запису;
*	передача даних користувача на сторінки.
Код також містить компонент "PrivateRoute", який перевіряє, чи користувач авторизований, перш ніж дозволяти йому перейти на сторінку.

Компонент App є головним компонентом нашого додатку на React. В ньому ми імпортуємо всі необхідні стилі та компоненти, які потрібні нам для створення різних сторінок додатку.

Крім того, в компоненті App ми визначаємо стан для декількох змінних, таких як isAuthDialogOpen, loggedIn, logSuccessful, data. Вони допомагають нам відслідковувати, чи користувач авторизований, чи відкрите діалогове вікно авторизації тощо.

Для управління роутингом нашого додатку ми використовуємо бібліотеку react-router-dom, яка надає нам функції, такі як Routes, Route, useLocation, useNavigate. З їх допомогою ми описуємо, яку сторінку має відображатися при певному URL.

Крім того, ми використовуємо компонент PrivateRoute, який відображає компонент, тільки якщо користувач авторизований. Якщо користувач не авторизований, PrivateRoute відображає діалогове вікно авторизації.

Також в компоненті App ми визначаємо кілька функцій для обробки подій, такі як handleAuthClick, handleAuthModalClose, handleLoginSuccess, handleLogOutButtonClick, handleRegisterSuccess, handleDataSubmit, handleCloseSuccessful, setIsAuthDialogOpen, setOpenSuccessful, handleCardClick, handleLogout. Вони допомагають нам виконувати різні дії, такі як відкриття діалогового вікна авторизації, вхід користувача в систему, вихід з системи, збереження даних тощо.

Нарешті, ми використовуємо компоненти Header, Footer, HomePage, ServicesPage, AboutPage, ServicesPageInOne, ServicesPageInTwo, ServicesPageInThree, ContactPage, UserCabinetPage, Error, AuthDialog та Successful для відображення різних сторінок та елементів інтерфейсу нашого додатку.

Компонент Routes містить шляхи до сторінок нашого додатку. Ми можемо визначити шляхи для створення сторінок з різними URL-адресами та компонентами, які будуть відображатись на цих сторінках. Наприклад, ми можемо визначити шлях до головної сторінки нашого додатку, який відображатиме компонент Home, або шлях до сторінки профілю, який відображатиме компонент UserCabinet.

```
import React, {useEffect, useState} from "react";
import styled from 'styled-components';
import {
    Routes,
    Route,
    useLocation, useNavigate
} from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import AboutPage from "../pages/AboutPage";
import ServicesPageInOne from "../pages/ServicesPageInOne";
import ServicesPageInTwo from "../pages/ServicesPageInTwo";
import ServicesPageInThree from "../pages/ServicesPageInThree";
import ContactPage from "../pages/ContactPage";
import UserCabinetPage from "../pages/UserCabinetPage";
import Error from "../pages/Error";
import AuthDialog from "../components/AuthDialog";
import Successful from "../components/Successful";
import PrivateRoute from "../entities/PrivateRoute";


const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

const App = () => {

    const [isAuthDialogOpen, setShowAuthModal] = useState(false);
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const [logSuccessful, setLogSuccessful] = useState(false);
    const [data, setData] = useState(JSON.parse(localStorage.getItem('data')) || {});
    const navigate = useNavigate();


    useEffect(() => {
        const storedData = localStorage.getItem('data');
        const parsedData = storedData ? JSON.parse(storedData) : {};
        setData(parsedData);
    }, []);

    const handleAuthClick = () => {
        if (!loggedIn) {
            setShowAuthModal(true);
            localStorage.setItem('isAuthDialogOpen', true);
        }
    };

    const handleAuthModalClose = (event) => {
        event.preventDefault();
        setShowAuthModal(false);
    };

    const handleLoginSuccess = (path, userData) => {
        setLoggedIn(true);
        setLogSuccessful(true);
        navigate(path);
        console.log(userData)
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('data', JSON.stringify(userData));
    };


    const handleLogOutButtonClick = () => {
        localStorage.removeItem('loggedIn');
        setLoggedIn(false);
        navigate('/');
    };



    const handleLogout = () => {
        setLogSuccessful(false);
    };

    const handleRegisterSuccess = (path, userData) => {
        setLoggedIn(true);
        setLogSuccessful(true);
        navigate(path);
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('data', JSON.stringify(userData));
    };

    const handleDataSubmit = (data) => {
        setData(data);
        localStorage.setItem('data', JSON.stringify(data));
    };

    const handleCloseSuccessful = () => {
    };

    const setIsAuthDialogOpen = () => {

    };

    const setOpenSuccessful = () => {
        setLoggedIn(true)
    };

    const handleCardClick = (path) => {
        navigate(path);

    };

    const authDialogProps = {
        onClose: handleAuthModalClose,
        onLoginSuccess: handleLoginSuccess,
        onLoginSuccessServ: handleCardClick,
        onRegisterSuccess: handleRegisterSuccess,
        onCloseSuccessful: handleCloseSuccessful,
        setIsAuthDialogOpen: setIsAuthDialogOpen,
        setOpenSuccessful: setOpenSuccessful,
        setShowAuthModal: setShowAuthModal,
        setUserData: setData,
        onDataSubmit: handleDataSubmit
    };

    const setProps = {
        onLoginButtonClick: handleAuthClick,
        handleLogOutButtonClick: handleLogOutButtonClick,
        onLoginSuccessServ: handleLoginSuccess,
        loggedIn: loggedIn,
        data: data
    };

    const privateProps = {
        loggedIn: loggedIn,
        isAuthDialogOpen: isAuthDialogOpen,
        authProps: authDialogProps
    };

    return (
        <>
                <ScrollToTop />
                <AppWrapper>
                    <Header {...setProps} />
                    <Routes>
                        <Route path="/" element={<HomePage {...setProps} />} />
                        <Route path="/services" element={<ServicesPage {...setProps} />} />
                        <Route path="/services/services1"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInOne data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/services/services2"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInTwo data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/services/services3"
                            element={
                                <PrivateRoute {...privateProps}>
                                    <ServicesPageInThree data={data} />
                                </PrivateRoute>}
                        />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/contacts" element={<ContactPage />} />
                        <Route path="/user"
                               element={
                                   <PrivateRoute {...privateProps}>
                                        <UserCabinetPage data={data}/>
                                   </PrivateRoute>}
                        />
                        <Route path="*" element={<Error />} />
                    </Routes>
                    {(loggedIn && !isAuthDialogOpen) ? (
                        <Successful username={data.username} onClose={handleLogout} />
                    ) : (
                        isAuthDialogOpen && <AuthDialog {...authDialogProps} />
                    )}
                    <Footer />
                </AppWrapper>
        </>
    );
}

export default App;

```
### PrivateRoute.js - компонент React JS (./client/src/entities/PrivateRoute.js)

Цей компонент є кастомним маршрутом (route) для захисту від несанкціонованого доступу до сторінок. Компонент перевіряє, чи користувач авторизований (залогінений) перед відображенням вмісту сторінки, який передається через пропс children.

Якщо користувач не залогінений, то компонент перенаправляє його на домашню сторінку, використовуючи Navigate з бібліотеки react-router-dom.

Компонент приймає пропс loggedIn, який вказує, чи користувач залогінений або ні. Цей пропс повинен передаватися в компонент зовні, в залежності від стану авторизації.

```

import React from 'react';
import { Navigate } from 'react-router-dom';


const PrivateRoute = ({ children, loggedIn }) => {

    if(!loggedIn){
        return <>
                <Navigate to={"/"} />
            </>
    }

    return children;
};

export default PrivateRoute;

```

### Header.js - компонент React JS (./client/src/components/Header.js)

Цей компонент є реалізацією верхньої частини веб-сайту, що містить головне меню, кнопки авторизації користувача, кнопки зміни мови, логотип та інші елементи. Основна робота компонента полягає в обробці подій, які відбуваються при взаємодії з цими елементами.

Компонент використовує декілька додаткових бібліотек, таких як react-i18next, react-router-dom, styled-components та react-hamburger-menu. Він також імпортує іконки та інші зображення з додаткових файлів.

Для зміни мови використовується метод changeLanguage з бібліотеки react-i18next. Кнопки зміни мови містять відповідні обробники подій, які викликають changeLanguage з відповідним параметром мови.

Компонент містить кнопки авторизації користувача та виходу з аккаунту. При кліку на кнопку авторизації відкривається модальне вікно з формою авторизації. При успішній авторизації, відображається кнопка для переходу до кабінету користувача та кнопка виходу з аккаунту. При кліку на кнопку виходу з аккаунту виконується відповідний запит до сервера, та відображається повідомлення про вихід з аккаунту.

Компонент також містить гамбургер-меню для відображення головного меню на мобільних пристроях. Він працює за допомогою react-hamburger-menu. При кліку на гамбургер відкривається меню, яке можна закрити, клікнувши знову на гамбургер або на будь-який пункт меню.

```
import React, { useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoIcon from '../assets/IconLogo.svg';
import AddUserIcon from '../assets/IconAddUser.svg';
import HamburgerMenu from "./HamburgerMenu";
import LoginIcon from '../assets/IconLogin.svg';
import OutIcon from '../assets/out.png'
import AuthDialog from "./AuthDialog";
import { LogOut } from "../entities/api"

const Header = ({ onLoginButtonClick, handleLogOutButtonClick, loggedIn }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'header' });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);

    const handleButtonClickLogOut = async () => {
        const url = `/logout`;
        try {
            const result = await LogOut(url);
            if (result) {
                console.log(result.message);
                console.log(true);
            }
        }catch {
            console.log(false);
        }
    };

    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };

    const handleToggle = () => setOpen(!open);
    const mediaQuery = '(max-width: 768px)';

    const hamProps = {
        onLoginButtonClick: onLoginButtonClick,
        loggedIn: loggedIn,
        handleLogOutButtonClick: handleLogOutButtonClick,
        logOutServer: handleButtonClickLogOut
    };
    return (
        <StyledHeader>
            <StyledLink to="/">
                <Logo>
                    <img src={LogoIcon} alt={t('alts.iconLogo')} />
                </Logo>
            </StyledLink>
            <StyledMenu>
                <StyledLinkMenu to="/">{t('menu.homepage')}</StyledLinkMenu>
                <StyledLinkMenu to="/services">{t('menu.services')}</StyledLinkMenu>
                <StyledLinkMenu to="/about">{t('menu.about')}</StyledLinkMenu>
                <StyledLinkMenu to="/contacts">{t('menu.contacts')}</StyledLinkMenu>
            </StyledMenu>
            <StyledLocaleButtons>
                <StyledButtonLocale onClick={() => changeLanguage('uk')}>UK</StyledButtonLocale>
                <StyledButtonLocale onClick={() => changeLanguage('en')}>EN</StyledButtonLocale>
            </StyledLocaleButtons>
            <ButtonsWrapper>
                {loggedIn ? (
                    <>
                        <StyledLinkUserCabinet to="/user">
                            <img src={LoginIcon} alt="" />
                        </StyledLinkUserCabinet>
                        <StyledButtonLogOut onClick={() => {
                            localStorage.removeItem('loggedIn');
                            handleLogOutButtonClick();
                            handleButtonClickLogOut();
                        }}>
                            <img src={OutIcon} alt="" />
                        </StyledButtonLogOut>
                    </>
                ) : (
                    <>
                        <StyledButtonAuth onClick={() => {onLoginButtonClick()}}>
                            <img src={AddUserIcon} alt="" />
                        </StyledButtonAuth>
                    </>
                )}
            </ButtonsWrapper>
            {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
            <StyledHamburger onClick={handleToggle} >
                <span></span>
                <span></span>
                <span></span>
            </StyledHamburger>
            <HamburgerMenu open={open} setOpen={setOpen} {...hamProps} />
            {open || !window.matchMedia(mediaQuery).matches ? (
                <HamburgerMenu isOpen={open} onClose={handleToggle} {...hamProps} />
            ) : null}
        </StyledHeader>
    );
};

export default Header;

```
### HamburgerMenu.js - компонент React JS (./client/src/components/HamburgerMenu.js)
Компонент HamburgerMenu є частиною інтерфейсу користувача, який містить гамбургер-меню (меню, яке випадає при кліку на гамбургер-іконку) та різні елементи управління мовою та аутентифікацією користувача. 

Він приймає на вхід такі параметри, як стан відкритості меню, функції обробки кліків на елементи меню та стан аутентифікації користувача. 

Компонент використовує бібліотеку styled-components для стилізації та реалізації адаптивності для різних розмірів екрану. 

Крім того, він використовує бібліотеку react-i18next для підтримки міжнародних мовних налаштувань та відображення текстових рядків на відповідній мові. Компонент містить AuthDialog - діалогове вікно для аутентифікації користувача, яке може з'явитися при кліку на відповідний елемент меню.

```

import React, { useState } from 'react';
import styled from 'styled-components';
import {useTranslation} from "react-i18next";
import {Link} from 'react-router-dom';
import AuthDialog from "./AuthDialog";


const HamburgerMenu = ({ open, setOpen, onLoginButtonClick, loggedIn, handleLogOutButtonClick, logOutServer }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'header' });
    const changeLanguage = (language) => {
        i18n.changeLanguage(language);
    };

    const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);


    const closeAuthDialog = () => {
        setIsAuthDialogOpen(false);
    };
    return (
        <StyledMenuWrapper open={open}>
            <StyledMenu>
                <StyledLocaleButtons>
                    <StyledButtonLocale type="button" onClick={() => changeLanguage('uk')}>UK</StyledButtonLocale>
                    <StyledButtonLocale type="button" onClick={() => changeLanguage('en')}>EN</StyledButtonLocale>
                </StyledLocaleButtons>
                <StyledLinkMenu to="/" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.homepage')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/services" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.services')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/about" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.about')}
                </StyledLinkMenu>
                <StyledLinkMenu to="/contacts" onClick={() => {setOpen(false); changeLanguage(i18n.language);}}>
                    {t('menu.contacts')}
                </StyledLinkMenu>
                <ButtonsWrapper>
                    {loggedIn ? (
                        <>
                            <StyledLinkUserCabinet to="/user" onClick={() =>{
                                changeLanguage(i18n.language);
                                setOpen(false);
                            }}>
                            {t('menu.cabinet')}
                            </StyledLinkUserCabinet>
                            <StyledButtonLogOut onClick={() => {
                                localStorage.removeItem('loggedIn');
                                handleLogOutButtonClick();
                                changeLanguage(i18n.language);
                                setOpen(false);
                                logOutServer()
                            }}>
                                {t('menu.out')}
                            </StyledButtonLogOut>
                        </>
                    ) : (
                        <>
                            <StyledButtonAuth type="button" onClick={() => {
                                onLoginButtonClick();
                                changeLanguage(i18n.language);
                                setOpen(false);
                            }}>
                                {t('menu.auth')}
                            </StyledButtonAuth>
                        </>
                    )}
                </ButtonsWrapper>

                {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
            </StyledMenu>
        </StyledMenuWrapper>
    );
};

export default HamburgerMenu;

```

### Footer.js - компонент React JS (./client/src/components/Footer.js)

Цей компонент Footer відповідає за відображення нижньої частини сторінки (футера). Він імпортує React для створення функціонального компонента, useTranslation для забезпечення перекладу тексту, Link з react-router-dom для створення посилань на інші сторінки сайту, styled для створення стилів та LogoIcon для імпортування логотипу з SVG-файлу.

Компонент Footer складається з двох блоків: блоку з логотипом та блоку з меню. Кожен з блоків містить свої стилі. Блок з меню містить посилання на головну сторінку сайту, сторінку послуг, сторінку про нас та сторінку контактів. На кожне посилання накладається переклад тексту з допомогою useTranslation. В блоку з логотипом є посилання на головну сторінку сайту з логотипом, який також імпортується з SVG-файлу.

```
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import styled from 'styled-components';
import LogoIcon from '../assets/IconLogo.svg';

const Footer = () => {
    const {t} = useTranslation('translation',  {keyPrefix: 'footer'});

    return (
        <>
            <StyledFooter>
                <StyledBlockLogo>
                    <StyledLink to='/'>
                        <Logo>
                            <img src={LogoIcon} alt={t("alts.iconLogo")}/>
                        </Logo>
                    </StyledLink>
                </StyledBlockLogo>
                <StyledBlockMenu>
                    <StyledMenu>
                        <StyledLinkMenu to='/'>{t("menu.homepage")}</StyledLinkMenu>
                        <StyledLinkMenu to='/services'>{t("menu.services")}</StyledLinkMenu>
                        <StyledLinkMenu to='/about'>{t("menu.about")}</StyledLinkMenu>

                        <StyledLinkMenu to='/contacts'>{t("menu.contacts")}</StyledLinkMenu>
                    </StyledMenu>
                    <StyledParagraph>
                        {t("copyright")}
                    </StyledParagraph>
                </StyledBlockMenu>

            </StyledFooter>
        </>
    );
};

export default Footer;

```
### AuthDialog.js - компонент React JS (./client/src/components/AuthDialog.js)
AuthDialog - це компонент React, який відображає діалогове вікно для авторизації та реєстрації користувачів. Компонент отримує на вхід функції, які виконуються після успішної авторизації та реєстрації, а також змінюють стан батьківського компонента. Компонент також використовує бібліотеки styled-components та react-i18next для стилізації та локалізації.

У компоненті є стан, що зберігає активну вкладку (login або registration) та чи показувати форму для відновлення паролю. Також у компоненті є ефект, який перевіряє, чи користувач вже авторизований (це зберігається в localStorage) та відповідно встановлює стан компонента. Коли форма для логінування або реєстрації була успішно відправлена, виконуються функції з вхідним параметром даними користувача.

У компоненті також є обробники подій для натискання на кнопки логінування та реєстрації. Якщо вибрано вкладку логінування, то відображається форма для логінування, або форма для відновлення паролю. Якщо вибрано вкладку реєстрації, то відображається форма для реєстрації.

Компонент AuthDialog приймає кілька пропсів, включаючи onClose, onLoginSuccess, onRegisterSuccess, setOpenSuccessful, setShowAuthModal та setUserData.

Компонент використовує useEffect для перевірки стану автентифікації користувача в локальному сховищі. Якщо користувач є автентифікований, setOpenSuccessful буде викликано з аргументом true, інакше setShowAuthModal буде викликано з аргументом true.

Залежно від активної вкладки activeTab компонент відображає або діалогове вікно входу LoginDialog, або діалогове вікно реєстрації RegisterDialog.

Крім того, компонент містить кнопки, які змінюють активну вкладку та мову, що використовується для відображення тексту.

Якщо користувач успішно увійшов або зареєструвався, викликається функція handleSuccess, яка передає дані про користувача далі за допомогою пропсів onLoginSuccess, onRegisterSuccess та setUserData.

Компонент також містить обробники подій handleLoginSubmit та handleRegistrationSubmit, які викликаються при відправці форм входу та реєстрації відповідно.

У цілому, цей компонент є важливим для реалізації функціоналу авторизації та реєстрації користувача в додатку.

Перш за все, AuthDialog імпортує декілька компонентів, які використовуються в цьому компоненті: LoginDialog, RegisterDialog, ResetPassword, styled, useTranslation та useLocation.

Далі компонент містить функцію AuthDialog, яка приймає декілька пропсів: onClose, onLoginSuccess, onRegisterSuccess, setOpenSuccessful, setShowAuthModal та setUserData.

Компонент AuthDialog включає в себе декілька станів: activeTab, який відповідає за вибір вкладки між вкладками "Вхід" та "Реєстрація"; showResetPassword, який відповідає за відображення форми для скидання пароля;

Функція useEffect використовується для перевірки, чи користувач аутентифікований. Якщо так, вікно успішного входу відображається. Якщо ні, відображається вікно аутентифікації.

Компонент також містить ряд функцій, які використовуються для обробки подій: handleSuccess, handleLoginSubmit та handleRegistrationSubmit.

Нарешті, компонент повертає кілька розміток HTML, які включають в себе елементи, які відображають вкладки "Вхід" та "Реєстрація", форми для входу та реєстрації, а також кнопки закриття та оновлення мови.

AuthDialog є частиною більшої системи аутентифікації, яка дозволяє користувачам входити в систему або реєструватися на веб-сайті.

```
import React, {useEffect, useState} from 'react';
import LoginDialog from "./LoginDialog";
import RegisterDialog from "./RegisterDialog";
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useLocation} from "react-router-dom";
import ResetPassword from "./ResetPassword";

const AuthDialog = ({ onClose, onLoginSuccess, onRegisterSuccess, setOpenSuccessful, setShowAuthModal, setUserData }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'auth' });
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const location = useLocation();
    const [activeTab, setActiveTab] = useState('login');
    const [showResetPassword, setShowResetPassword] = useState(false);
    useEffect(() => {
        const isAuthenticated = localStorage.getItem('isAuthenticated');
        if (isAuthenticated) {
            setOpenSuccessful(true);

        } else {
            setShowAuthModal(true);

        }
    }, [setOpenSuccessful, setShowAuthModal]);

    const handleSuccess = (data) => {
        setShowAuthModal(false);
        setOpenSuccessful(true);
        onLoginSuccess(location.pathname, data);
        onRegisterSuccess(location.pathname, data);
        setUserData(data);
        console.log(data);
        setUserData(data);
    };

    const handleLoginSubmit = (event) => {
        event.preventDefault();

        onClose();
    };

    const handleRegistrationSubmit = (event) => {
        event.preventDefault();


        onClose();
    };



    return (
        <>
            <StyledOverlay />
            <StyledSection>
                <StyledBlock>
                    <StyledButtonClose onClick={onClose}>&#10006;</StyledButtonClose>
                    <StyledButtonBlock>
                        <StyledButton onClick={() => {
                            setActiveTab('login');
                            changeLanguage(i18n.language);
                        }}>{t("buttonLog")} </StyledButton>
                        <StyledButton onClick={() => {
                            setActiveTab('registration');
                            changeLanguage(i18n.language);
                        }}>{t("buttonReg")} </StyledButton>
                    </StyledButtonBlock>
                    {activeTab === 'login' ? (
                        <>
                        {showResetPassword ? <ResetPassword setShowResetPassword={setShowResetPassword} /> :
                            <LoginDialog onSubmit={handleLoginSubmit}
                             onLoginSuccess={handleSuccess}
                             showResetPassword={showResetPassword} setShowResetPassword={setShowResetPassword}  />}
                        </>
                    ) : (
                        <RegisterDialog onSubmit={handleRegistrationSubmit}
                                        onRegisterSuccess={handleSuccess}
                                        showResetPassword={showResetPassword}
                                        setShowResetPassword={setShowResetPassword}/>
                    )}
                </StyledBlock>
            </StyledSection>
        </>
    );
};

export default AuthDialog;

```
### LoginDialog.js - компонент React JS (./client/src/components/LoginDialog.js)

LoginDialog реалізує форму авторизації користувача з можливістю використання облікового запису Google. Для реалізації форми використовується бібліотека "react-hook-form", що дозволяє легко і зручно працювати з формами в React. Також використовується бібліотека "react-i18next" для міжнародизації сторінки.

Компонент містить елементи форми, такі як інпути для введення email та пароля користувача, кнопки для відправки даних форми та кнопки для відновлення пароля користувача. Крім того, компонент містить функціональність для використання облікового запису Google для авторизації.

Компонент також використовує декілька іконок та стилів зі стилізованої бібліотеки "styled-components", які використовуються для стилізації елементів форми.

Компонент містить стани для відображення повідомлення про помилку або успішну авторизацію, а також функціональність для відправки запиту на сервер для авторизації користувача з використанням даних, введених в форму.

LoginDialog використовує наступні імпорти:

*	React і useState - для створення компонентів та збереження стану компонентів;
*	useForm - для валідації та збереження даних форми входу користувача;
*	useTranslation - для локалізації текстових рядків;
*	styled-components - для створення стилів компонентів;
*	Input - компонент, який відповідає за відображення вхідних полів;
*	EmailIcon і PasswordIcon - зображення, які відображаються в лівій частині вхідних полів;
*	iconGoogle - зображення іконки Google;
*	loginUser - функція, яка виконує запит на сервер для входу користувача;
*	useGoogleLogin - хук, який дозволяє користувачеві увійти за допомогою облікового запису Google.

Компонент містить декілька констант, які використовуються для валідації вхідних даних:

*	MIN_LENGTH та MAX_LENGTH - мінімальна та максимальна довжина введеного паролю.
*	EMAIL_PATTERN - регулярний вираз для перевірки правильності введеного email.
*	PASSWORD_PATTERN - регулярний вираз для перевірки пароля на наявність пробілів.

LoginDialog використовує бібліотеку react-hook-form для збору та валідації введених даних з форми. Для перекладу текстів використовується бібліотека react-i18next.

LoginDialog містить функцію onSubmit, яка викликається при відправці форми. У цій функції дані форми передаються на сервер за допомогою функції loginUser з модуля api. Якщо відповідь від сервера успішна, то викликається функція onLoginSuccess, яка передає дані про користувача компоненту-батьківському елементу.

Крім того, компонент LoginDialog містить функціональність входу за допомогою облікового запису Google за допомогою бібліотеки @react-oauth/google. Для цього використовується функція loginGoogle, яка викликається при натисканні кнопки "Увійти через Google". Після успішної авторизації викликається функція loginUser з передачею email та тимчасового пароля, який генерується на основі email.


```
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Input from "./Input";
import EmailIcon from "../assets/icons/EmailIcon.svg";
import PasswordIcon from "../assets/icons/PasswordIcon.svg";
import iconGoogle from "../assets/IconGoogle.svg";
import {loginUser} from "../entities/api";
import { useGoogleLogin } from '@react-oauth/google';



const MIN_LENGTH = 3;
const MAX_LENGTH = 25;
const EMAIL_PATTERN = /^([^!#$%&‘*+-/=?^_`{|}~ ])([a-z_A-Z.0-9-]*)@\w{1,63}\.\w{1,63}([^!#$%&‘*+—/=?^_`{|}~ ])$/;
const PASSWORD_PATTERN = /^[^ ]+/g;

const LoginDialog = ({ onLoginSuccess, showResetPassword, setShowResetPassword }) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'loginpage'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const loginGoogle = useGoogleLogin({
        onSuccess: async response => {
            try {
                const headers = {
                    "Authorization": `Bearer ${response.access_token}`
                };
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers });
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }
                const data = await res.json();
                console.log(data);
                const email = data.email;
                const password = data.email.split("@")[0] +'@:-)';
                try {
                    const result = await loginUser(`/login`, {
                        "email": email,
                        "password": password});
                    if (result) {
                        setResponseMessage(`Success ${result.message}`);
                        onLoginSuccess(result.data);
                    }
                } catch (error) {
                    console.log(error)
                    setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
                    setResponseIsError(true); // устанавливаем флаг ошибки
                    reset();
                }
            } catch (err) {
                console.log(err);
            }
        }
    });

    const [responseMessage, setResponseMessage] = useState('');
    const [responseIsError, setResponseIsError] = useState(false);
    const {
        register,
        reset,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({mode: "onBlur"});


    const onSubmit = async (data, event) => {

        try {
            const result = await loginUser(`/login`, data);
            if (result) {
                setResponseMessage(`Success ${result.message}`);
                onLoginSuccess(result.data);
            }
        } catch (error) {
            console.log(error);
            setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
            setResponseIsError(true); // устанавливаем флаг ошибки
            reset();
        }
    };


    return (
        <StyledSection>
            <Title>{t("title")}</Title>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledMessage isError={responseIsError}>{responseMessage}</StyledMessage>
                <Input
                    placeholder={t("placeholders.email")}
                    register={register}
                    name='email'
                    required={true}
                    pattern={{
                        value: EMAIL_PATTERN,
                        message: t("errors.validEmail")}
                    }
                    icon={EmailIcon}
                    alt={t("alts.iconEmail")}
                    error={errors}
                />
                <Input
                    type='password'
                    placeholder={t("placeholders.password")}
                    register={register}
                    name="password"
                    required={true}
                    pattern={{
                        value: PASSWORD_PATTERN,
                        message: t("errors.validPassword")
                    }}
                    rules={{
                        minLength: {
                            value: MIN_LENGTH,
                            message: t("errors.minLength")
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: t("errors.maxLength")
                        }
                    }}
                    icon={PasswordIcon}
                    alt={t("alts.iconPassword")}
                    error={errors}
                />
                <LoginLinkWrapper>
                    <StyledButtonSubmit type="submit"
                                        value={t("links.login")}
                                        disabled={!isValid}/>
                    <StyledButtonAuth type="submit" onClick={loginGoogle}>
                        <img src={iconGoogle} alt={'googleIcon'}/>
                    </StyledButtonAuth>
                    <StyledButtonReset onClick={() => {
                        setShowResetPassword(!showResetPassword);
                        changeLanguage(i18n.language);
                    }}>
                        {showResetPassword ? t("links.backToLogin") : t("links.passwordReset")}
                    </StyledButtonReset>
                </LoginLinkWrapper>
            </StyledForm>
        </StyledSection>
    );
};
export default LoginDialog;

```
### ResetPasword.js - компонент React JS (./client/src/components/ResetPasword.js)
ResetPasword містить форму для скидання пароля.

Він імпортує функції useState, useForm і useTranslation з різних бібліотек, а також компоненти Input та Successful.

Компонент використовує різні стани для відображення повідомлень про помилки та успіх, а також для відображення самої форми та вікна успішного відправлення даних.

Форма містить одне текстове поле для введення електронної пошти, яка повинна відповідати певному формату. Якщо користувач успішно відправляє дані, відображається повідомлення про успіх і форма очищується. Якщо виникає помилка, відображається повідомлення про помилку та форма очищується.

Крім того, у компонента є можливість зміни мови за допомогою функції з бібліотеки i18n.

Компонент ResetPasword створено для відновлення пароля користувача. Компонент містить форму, де користувач може ввести свій електронний лист і надіслати запит на відновлення пароля.

Компонент використовує бібліотеку react-hook-form для валідації та обробки введених даних. Також використовується бібліотека react-i18next для міжнародного перекладу.

Крім того, компонент містить стилізовані кнопки та іконки для покращення візуальної привабливості.

Після успішного відправлення запиту на відновлення пароля, користувач буде повідомлений про це за допомогою відповідного повідомлення, яке з'явиться на екрані.

Також компонент містить функціонал для закриття вікна відновлення пароля та переключення мови за допомогою кнопок, які також стилізовані для покращення візуальної привабливості.

ResetPasword відповідає за форму для скидання пароля. 

Він використовує бібліотеку React, а також деякі додаткові бібліотеки, такі як react-hook-form, react-i18next і styled-components. 

Компонент містить форму з одним текстовим полем для введення електронної пошти користувача, який хоче скинути свій пароль. 

Коли користувач вводить свою електронну адресу і натискає кнопку "Надіслати", дані форми передаються на сервер за допомогою функції getPassword(). Якщо сервер успішно оброблює запит, користувач отримує повідомлення про успішне скидання пароля, і його форма скидається. Якщо виникає помилка, користувач отримує повідомлення про невдалу спробу скинути пароль і форма очищується. 

ResetPasword також містить кнопку "Повернутися до входу", яку можна використовувати для повернення до форми входу без виконання скидання пароля.

```
import React, { useState }from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Input from "./Input";
import EmailIcon from "../assets/icons/EmailIcon.svg";
import {getPassword} from "../entities/api";
import Successful from "./Successful";



const EMAIL_PATTERN = /^([^!#$%&‘*+-/=?^_`{|}~ ])([a-z_A-Z.0-9-]*)@\w{1,63}\.\w{1,63}([^!#$%&‘*+—/=?^_`{|}~ ])$/;

const ResetPasword = ({ onLoginSuccess, showResetPassword, setShowResetPassword }) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'reset'});
    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };


    const [responseMessage, setResponseMessage] = useState('');
    const [responseIsError, setResponseIsError] = useState(false);
    const [showSuccessful, setShowSuccessful] = useState(false);
    const {
        register,
        reset,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({mode: "onBlur"});



    const onSubmit = async (data, event) => {
        try {
            const result = await getPassword(`/send_password`, data);
            if (result) {
                setResponseMessage(`Success`);
                reset();
                setShowSuccessful(true);

            }
        } catch (error) {
            setResponseMessage('Registration failed. Please try again.');
            setResponseIsError(true);
            reset();
        }
    };
    const handleResetClick = () => {
        setShowResetPassword(false);
        changeLanguage(i18n.language);
    };


    const handleSuccessfulClose = () => {
        setShowSuccessful(false);
    };

    return (
        <StyledSection>
            <Title>{t("title")}</Title>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledMessage isError={responseIsError}>{responseMessage}</StyledMessage>
                <Input
                    placeholder={t("placeholders.email")}
                    register={register}
                    name='email'
                    required={true}
                    pattern={{
                        value: EMAIL_PATTERN,
                        message: t("errors.validEmail")}
                    }
                    icon={EmailIcon}
                    alt={t("alts.iconEmail")}
                    error={errors}
                />
                <LoginLinkWrapper>
                    <StyledButtonSubmit type="submit"
                                        value={t("links.send")}
                                        disabled={!isValid} />
                    <StyledButtonReset onClick={handleResetClick}>
                        {t("links.return")}
                    </StyledButtonReset>
                </LoginLinkWrapper>
                {showSuccessful && (<Successful onClose={handleSuccessfulClose} />)}
            </StyledForm>
        </StyledSection>
    );
};
export default ResetPasword;

```

### RegisterDialog.js - компонент React JS (./client/src/components/RegisterDialog.js)
RegisterDialog описує компонент React, що представляє сторінку реєстрації користувача.

Перший рядок import React, { useState } from 'react'; імпортує модуль React та useState hook. useState hook використовується для збереження стану компонента.

Наступні рядки імпортують додаткові модулі, такі як useForm, useTranslation і styled-components, а також додаткові компоненти, такі як Input.

Наступні рядки визначають константи, які використовуються в компоненті, такі як MIN_LENGTH, MAX_LENGTH, EMAIL_PATTERN, PASSWORD_PATTERN.

RegisterDialog є основним компонентом. Він приймає проп onRegisterSuccess, який викликається, коли реєстрація користувача успішна.

У компоненті використовується useTranslation для локалізації тексту.

RegisterDialog визначає два стану - responseMessage і responseIsError, які використовуються для відображення повідомлень про реєстрацію.

Далі використовується useGoogleLogin для створення кнопки реєстрації через обліковий запис Google. Ця функція викликається при натисканні кнопки StyledButtonAuth.

Після цього компонент використовує useForm для створення форми для входу користувача, що містить вхідні поля для email, пароля та імені користувача. Кожне поле є окремим компонентом Input.

Після введення даних користувач може натиснути кнопку StyledButtonSubmit, щоб зареєструватися.

Код використовує registerUser для виклику API, який реєструє нового користувача. Якщо реєстрація успішна, onRegisterSuccess буде викликано, щоб обновити стан сторінки та перейти на сторінку з привітанням. Якщо реєстрація не вдається, буде показано повідомлення про помилку.

```
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Input from "./Input";
import EmailIcon from "../assets/icons/EmailIcon.svg";
import PasswordIcon from "../assets/icons/PasswordIcon.svg";
import UserIcon from "../assets/icons/UserIcon.svg";
import iconGoogle from "../assets/IconGoogle.svg";
import {registerUser} from "../entities/api"
import {useGoogleLogin} from "@react-oauth/google";


const MIN_LENGTH = 3;
const MAX_LENGTH = 25;
const EMAIL_PATTERN = /^([^!#$%&‘*+-/=?^_`{|}~ ])([a-z_A-Z.0-9-]*)@\w{1,63}\.\w{1,63}([^!#$%&‘*+—/=?^_`{|}~ ])$/;
const PASSWORD_PATTERN = /^[^ ]+/g;



const RegisterDialog = ({ onRegisterSuccess }) => {
    const {t} = useTranslation('translation',  {keyPrefix: 'regpage'});

    const [responseMessage, setResponseMessage] = useState('');
    const [responseIsError, setResponseIsError] = useState(false);

    const registerGoogle = useGoogleLogin({
        onSuccess: async response => {
            try {
                const headers = {
                    "Authorization": `Bearer ${response.access_token}`
                };
                const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", { headers });
                if (!res.ok) {
                    throw new Error(`Ошибка HTTP: ${res.status}`);
                }
                const data = await res.json();
                console.log(data);
                const email = data.email;
                const username = data.email.split("@")[0];
                const password = data.email.split("@")[0] +'@:-)';
                console.log({
                    "email": email,
                    "password": password,
                    "username": username});
                try {
                    const result = await registerUser(`/register`, {
                        "email": email,
                        "password": password,
                        "username": username});
                    if (result) {
                        setResponseMessage(`Success ${result.message}`);
                        onRegisterSuccess(result.data);
                    }
                } catch (error) {
                    console.log(error)
                    setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
                    setResponseIsError(true); // устанавливаем флаг ошибки
                    reset();
                }
            } catch (err) {
                console.log(err);
            }
        }
    });



    const {
        register,
        reset,
        formState: { errors, isValid },
        handleSubmit
    } = useForm({mode: "onBlur"});

    const onSubmit = async (data, event) => {

        try {
            const result = await registerUser(`/register`, data);
            if (result) {
                setResponseMessage(`Success ${result.message}`);
                onRegisterSuccess(result.data);
                reset();
            }
        } catch (error) {
            console.log(error)
            setResponseMessage('Registration failed. Please try again.'); // сообщение об ошибке
            setResponseIsError(true);
            reset();
        }
    };

    return (
        <StyledSection>
            <StyledForm onSubmit={handleSubmit(onSubmit)}>
                <StyledMessage isError={responseIsError}>{responseMessage}</StyledMessage>
                <Input
                    placeholder={t("placeholders.username")}
                    register={register}
                    name='username'
                    required={true}
                    icon={UserIcon}
                    alt={t("alts.iconUser")}
                    error={errors}
                    rules={{
                        minLength: {
                            value: MIN_LENGTH,
                            message: t("errors.minLength")
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: t("errors.maxLength")
                        }
                    }}
                />
                <Input
                    placeholder={t("placeholders.email")}
                    register={register}
                    name='email'
                    required={true}
                    pattern={{
                        value: EMAIL_PATTERN,
                        message: t("errors.validEmail")}
                    }
                    icon={EmailIcon}
                    alt={t("alts.iconEmail")}
                    error={errors}
                />
                <Input
                    type='password'
                    placeholder={t("placeholders.password")}
                    register={register}
                    name="password"
                    required={true}
                    pattern={{
                        value: PASSWORD_PATTERN,
                        message: t("errors.validPassword")
                    }}
                    rules={{
                        minLength: {
                            value: MIN_LENGTH,
                            message: t("errors.minLength")
                        },
                        maxLength: {
                            value: MAX_LENGTH,
                            message: t("errors.maxLength")
                        }
                    }}
                    icon={PasswordIcon}
                    alt={t("alts.iconPassword")}
                    error={errors}
                />
                <LoginLinkWrapper>
                    <StyledButtonSubmit type="submit"
                                        value={t("links.register")}
                                        disabled={!isValid}
                                        onRegister={true}/>
                    <StyledButtonAuth type="submit" onClick={registerGoogle}>
                        <img src={iconGoogle} alt={'googleIcon'}/>
                    </StyledButtonAuth>
                </LoginLinkWrapper>
            </StyledForm>
        </StyledSection>
    );
};
export default RegisterDialog;

```

### Successful .js - компонент React JS (./client/src/components/Successful.js)
Successful є простим повідомленням успіху, яке може використовуватися для повідомлення про успішну реєстрацію, вхід тощо. Компонент містить зображення позначки чеку, яке відображається разом з текстом повідомлення. Компонент автоматично закриється через 1 секунду після того, як з'явиться на екрані. Якщо користувач хоче закрити повідомлення раніше, він може натиснути на кнопку "закрити".

Компонент Successful має два параметри: username і onClose. username - це ім'я користувача, яке буде відображатися в повідомленні успіху. Якщо значення параметра username не передається, то відображатиметься загальне повідомлення про успіх. onClose - це функція, яка викликається при закритті повідомлення.

Для перекладу повідомлень використовується бібліотека react-i18next. Окрім зображення позначки чеку, компонент також містить стилі, які задають вигляд повідомлення успіху.

```
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

```

### Input.js - компонент React JS (./client/src/components/Input.js)
Компонент Input - це перевикористовуваний компонент, який призначений для відображення поля введення даних на сторінці. Компонент приймає наступні властивості:
*	type (за замовчуванням 'text') - тип поля введення даних (наприклад, 'text', 'email', 'password' і т.д.);
*	placeholder - текстова підказка, яка з'являється в полі введення даних;
*	register - об'єкт з методами реєстрації поля введення даних у формі;
*	name - ім'я поля введення даних;
*	required (за замовчуванням false) - прапорець, що вказує, чи є поле введення даних обов'язковим для заповнення;
*	pattern - регулярний вираз, який перевіряє коректність введеного значення;
*	error - об'єкт з помилками, які стосуються поля введення даних;
*	rules - додаткові правила валідації поля введення даних;
*	icon - іконка, яка відображається поруч з полем введення даних;
*	alt - альтернативний текст для іконки.

Крім того, компонент Input використовує хуки useTranslation для локалізації тексту та useState для відображення помилок. Компонент складається з наступних елементів:

*	InputWrapper - контейнер для іконки та поля введення даних;
*	LinkIcon - контейнер для іконки;
*	StyledInput - стилізоване поле введення даних;
*	ErrorText - текст помилки, який відображається під полем введення даних в разі некоректного введення даних.

```
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";

const Input = ({type='text', placeholder, register, name, required, pattern, error, rules, icon, alt}) => {
    const {t} = useTranslation('translation',  {keyPrefix: 'loginpage'});
    const isValid = !Boolean(error[name]);
    return (
        <>
            <InputWrapper>
                <LinkIcon>
                    <img src={icon} alt={alt}/>
                </LinkIcon>
                <StyledInput
                    type={type}
                    placeholder={placeholder}
                    {...register(name, {
                        required: required ? t("errors.required") : false,
                        pattern: pattern,
                        ...rules
                    })}
                    isValid={isValid}
                />
            </InputWrapper>
            {!isValid && <ErrorText>{error[name]?.message}</ErrorText>}
        </>
    );
};

export default Input;

```

### HomePage - компонент React JS (./client/src/pages/HomePage/index.js)
Цей компонент HomePage складається з трьох секцій: FirstSection, SecondSection та ThirdSection. Компонент передає різні властивості до кожної секції через propsHome. Ці властивості включають функції onLoginButtonClick та onLoginSuccessServ, змінну loggedIn та дані data. FirstSection та ThirdSection використовують ці властивості для відображення відповідної інформації та забезпечення можливості входу користувача. SecondSection не використовує жодну з цих властивостей і просто відображає статичний контент.

```
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

```

### FirstSection - компонент React JS (./client/src/pages/HomePage/FirstSection.js)
   
   Компонент "FirstSection" - це частина сторінки "Домашня сторінка" веб-додатка, яка містить вітальний блок з заголовком, описом та кнопкою для вхід/реєстрації. Також на десктопних екранах він містить слайдер зображень. На маленьких екранах слайдер не відображається, а його місце займає статичне зображення. Компонент використовує бібліотеку "react-i18next" для забезпечення підтримки різних мов. Крім того, він містить модальне вікно для входу/реєстрації, яке можна відкрити, натиснувши на кнопку "вхід/реєстрація". Компонент отримує дані про залогіненого користувача і передає їх у функції "onLoginButtonClick" та "onLoginSuccessServ".
   
   Цей компонент FirstSection є частиною головної сторінки додатку. Він містить заголовок, текст, кнопку для вхіду користувача, а також слайдер зображень.
   
   FirstSection використовує бібліотеку react-i18next для перекладу тексту. Також він має властивості onLoginButtonClick, onLoginSuccessServ, loggedIn та data, які передаються з батьківського компонента HomePage.
   
   FirstSection перевіряє розмір екрану користувача та відображає слайдер зображень лише на більших екранах. Крім того, компонент використовує модальне вікно AuthDialog для відображення форми входу користувача, якщо користувач натисне кнопку входу.
   
   
   
   ```
   import React, {useEffect, useState} from 'react';
   import { useTranslation } from 'react-i18next';
   import styled from "styled-components";
   import SliderFirstSection from "../../features/SliderFirstSection";
   import firstImg from "../../assets/pictures/homepage/firstImgFirstSection.svg";
   import secondImg from "../../assets/pictures/homepage/secondImgFirstSection.svg";
   import thirdImg from "../../assets/pictures/homepage/thirdImgFirstSection.svg";
   import AuthDialog from "../../components/AuthDialog";
   import ShemTop from "../../assets/pictures/homepage/ShemTop.svg";
   import ShemBottom from "../../assets/pictures/homepage/ShemBottom.svg";
   
   const images = [
       firstImg,
       secondImg,
       thirdImg
   ];
   
   
   const FirstSection = ({ onLoginButtonClick, onLoginSuccessServ, loggedIn, data }) => {
       const {t, i18n} = useTranslation('translation',  {keyPrefix: 'homepage'});
       const changeLanguage = (language) => {
           i18n.changeLanguage(language)
       };
   
       const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
       const [isSmallScreen, setIsSmallScreen] = useState(false);
   
       useEffect(() => {
           const mediaQuery = window.matchMedia('(max-width: 1064px)');
           setIsSmallScreen(mediaQuery.matches);
           const handler = (e) => setIsSmallScreen(e.matches);
           mediaQuery.addListener(handler);
           return () => mediaQuery.removeListener(handler);
       }, []);
   
   
   
       const closeAuthDialog = () => {
           setIsAuthDialogOpen(false);
       };
   
       return (
           <StyledSection>
               <StyledContainer >
                   <StyledWrap>
                       <StyledBlock>
                           <StyledContentBlock>
                               <StyledTitle>{t("titles.first")}</StyledTitle>
                               <StyledParagraph>{t("paragraphs.first")}</StyledParagraph>
                               <StyledButton
                                   type="button"
                                   value={t("button")}
                                   onClick={() => {
                                       onLoginButtonClick();
                                       loggedIn && onLoginSuccessServ('/services/services1', data);
                                       changeLanguage(i18n.language);}} />
                           </StyledContentBlock>
                           <StyledWrapperSlider>
                               <ShemImgBottom src={ShemBottom} alt="shem" />
                               {!isSmallScreen && <SliderFirstSection images={images} />}
                               <ShemImgTop src={ShemTop} alt="shem"/>
                           </StyledWrapperSlider>
                       </StyledBlock>
                   </StyledWrap>
               </StyledContainer>
               {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
           </StyledSection>
       );
   };
   
   export default FirstSection;
   
   ```

### SliderFirstSection - компонент React JS (./client/src/features/SliderFirstSection.js)

Компонент SliderFirstSection це слайдер, який приймає список зображень та автоматично перемикає між ними кожні 4 секунди. Крім того, слайдер містить індикатори, які дозволяють користувачеві перемикати зображення вручну.

У рендері компонента, створено блок з класом slider. Цей блок містить 3 картинки: дві - ShemBottom та ShemTop на верхньому та нижньому шарах відповідно, та список зображень, які змінюються згідно індексу index відповідно до таймера.

Використовуються хуки useState та useEffect, які слідкують за індексом та таймером відповідно. Кожні 4 секунди, таймер відновлює індекс зображень і збільшує його на 1. Якщо індекс досягає останнього зображення, він повертається до першого зображення.

Кожен елемент в списку зображень містить зображення з властивістю transform у стилі, що переміщує його на відстань, еквівалентну добутку індексу на 100. Якщо елемент має індекс, що дорівнює index, йому присвоюється атрибут data-active.

Також створено список кнопок-індикаторів, кожна з яких представляє одне зображення у списку. Якщо кнопка індикатора вибрана, вона отримує властивість active. Коли кнопка натискається, викликається функція handleIndicatorClick, яка встановлює індекс на індекс кнопки, що була натиснута.


```
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

```

### SecondSection - компонент React JS (./client/src/pages/HomePage/SecondSection.js)

Компонент SecondSection - це простий функціональний компонент, який містить в собі блок з картинкою та контентом. У компоненті використовується useEffect для відслідковування скролу на сторінці та визначення чи елемент вже видимий на екрані. Коли елемент з'являється на екрані, встановлюється стан isVisible на true, що призводить до появи анімації на картинці та контенті. Компонент використовує бібліотеку react-i18next для перекладу текстів. Контент у компоненті складається з заголовка, параграфу та посилання на іншу сторінку, яке перекладається за допомогою бібліотеки react-router-dom. В компоненті також використовуються стилі з styled-components.

```
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

```

### ThirdSection - компонент React JS (./client/src/pages/HomePage/ThirdSection.js)

ThirdSection  - компонент React для відображення третьої секції домашньої сторінки. Використовуються бібліотеки styled-components та react-i18next. Функціональний компонент має внутрішній стан isAuthDialogOpen, що змінюється функцією setIsAuthDialogOpen, викликаною при відкритті або закритті діалогового вікна авторизації.

Також використовується функція useTranslation з бібліотеки react-i18next для перекладу тексту на інші мови, що встановлені в додатку.

Код містить масив об'єктів cards, який містить зображення та текст для кожної картки відображення послуг, а також функцію onClick для кожної з карток. Функції onLoginButtonClick, onLoginSuccessServ, loggedIn та data передаються як пропси в компонент. Кожна картка також містить умовний оператор, який змінює мову на поточну при кліку на картку.

Компонент повертає HTML-елементи, які відображають вміст секції, зображення, текст, кнопки та діалогове вікно авторизації.

```
import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import styled from "styled-components";
import ThirdSectionBackGround from "../../assets/pictures/homepage/ThirdSectionBackground.svg";
import FirstIcon from "../../assets/pictures/homepage/ThirdSectionFirstCardImg.svg";
import SecondIcon from "../../assets/pictures/homepage/ThirdSectionSecondCardImg.svg";
import ThirdIcon from "../../assets/pictures/homepage/ThirdSectionThirdCardImg.svg";
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
                        {renderCards()}
                    </StyledContentBlock>
                    {isAuthDialogOpen && <AuthDialog onClose={closeAuthDialog} />}
                </StyledBlock>
            </StyledContainer>

        </StyledSection>
    );
};

export default ThirdSection;

```

### ServicesPage - компонент React JS (./client/src/pages/ServicesPage.js)

ServicesPage використовує бібліотеку react-i18next для перекладу тексту на різні мови. Він також містить три картки послуг з іконками та описами, які можна вибрати, натиснувши на картку.

ServicesPage включає функціональність для зміни мови та виклику функції після натискання на картку, якщо користувач вже авторизований.

Компонент відображає сторінку послуг. Використовує бібліотеку React для побудови інтерфейсу користувача, а також додаткові бібліотеки: react-i18next для локалізації текстів і styled-components для стилізації компонентів.

Структура компонента ServicesPage включає в себе змінні стану, функції зміни стану та функції ефекту, які виконуються при зміні стану. Також у компоненті використовуються props, передані з вищестоящих компонентів, для забезпечення комунікації між компонентами.

В середині компонента створюється HTML-код з використанням спеціальних тегів React, які замінюють стандартні HTML-теги. Код містить також декілька додаткових компонентів, які були імпортовані з інших файлів.

Компонент містить функції, які викликаються при подіях від користувача, такі як натискання на кнопки. Код також містить імплементацію механізму локалізації текстів з використанням функціональності бібліотеки react-i18next.

У цілому, компонент ServicesPage відображає сторінку з трьома карточками, які містять інформацію про послуги. Кожна карточка містить зображення, текстовий блок і кнопку, яку можна натиснути для переходу на сторінку з більш детальною інформацією про послугу.

Компонент отримує такі параметри: onLoginButtonClick, onLoginSuccessServ, loggedIn та data.

Використовуються такі бібліотеки: react, react-i18next та styled-components.

Компонент містить обробники подій onClick для кожної картки з послугами, які, при наявності авторизації користувача, перенаправляють на відповідну сторінку з детальним описом послуги.

Компонент також містить функціонал зміни мови для відображення текстів на сторінці та анімацію відображення блоку з послугами за допомогою стану isVisible.

У першому рядку ми імпортуємо функції React, useEffect, useState, useTranslation та styled з бібліотеки styled-components, а також зображення іконок для карток зі сторінками послуг.

Далі ми оголошуємо компонент ServicesPage, який приймає на вхід деякі функції та дані. Ми використовуємо функцію useTranslation з бібліотеки react-i18next для підключення до нашого додатка системи локалізації та отримання текстових рядків для відображення на екрані.

У функції компонента ми використовуємо хук useEffect для того, щоб показати сторінку з послугами після завантаження компонента. Для цього ми створюємо стан isVisible за допомогою хука useState та змінюємо його значення на true в функції useEffect.

Далі ми повертаємо JSX-елементи з компоненту. Ми оголошуємо низку стилів за допомогою бібліотеки styled-components, використовуючи теги та класи, щоб налаштувати вигляд нашої сторінки з послугами. Всі текстові рядки відображаються через використання функції трансляції, яка бере дані з файлу перекладу.

Для кожної карти зі сторінками послуг ми створюємо окремий елемент StyledCard, який містить зображення, заголовок, текст та кнопку. Кожен елемент StyledCard містить обробник onClick, який запускає функцію onLoginButtonClick та onLoginSuccessServ з передачею в них URL-адреси та даних, якщо користувач вже ввійшов в систему.

Функція useEffect використовується для виконання певних дій після рендерингу компонента. У даному випадку, вона встановлює стан isVisible в true, коли компонент відобразився на сторінці.

Компонент містить в собі функцію useTranslation з бібліотеки react-i18next, яка дозволяє локалізувати текстові дані відповідно до вибраної користувачем мови. Змінна t містить переклади, які можна використовувати в компоненті, і використовується для відображення текстового контенту. Змінна i18n містить різноманітні налаштування для бібліотеки локалізації.

Компонент містить три картки з іконками та текстом, які можна клікнути. При кліку на кожну картку викликається функція onLoginButtonClick, яка зазвичай відкриває модальне вікно для авторизації користувача. Якщо користувач авторизований, то викликається функція onLoginSuccessServ, яка перенаправляє користувача на сторінку з послугами, вказану в аргументі функції.

Кожна картка містить текстовий блок, який міститься в змінній t, та кнопку зі стрілкою, при кліку на яку змінюється мова на ту, яка вибрана в бібліотеці локалізації. Іконки для карток завантажуються з файлів зображень, які містяться в папці assets.


```
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
                            <StyledCard onClick={() => {onLoginButtonClick();
                                loggedIn && onLoginSuccessServ('/services/services1', data);}}>
                                <StyledBlockImgTitle>
                                    <StyledImg src={FirstIcon} alt={t("alts.firstCard")}/>
                                    <StyledTitleCard>{t("titles.firstCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.firstCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {changeLanguage(i18n.language)}}
                                    className='card-button'/>
                            </StyledCard>
                            <StyledCard onClick={() => {onLoginButtonClick();
                                loggedIn && onLoginSuccessServ('/services/services2', data);}}>
                                <StyledBlockImgTitle>
                                    <StyledImg src={SecondIcon} alt={t("alts.secondCard")}/>
                                    <StyledTitleCard>{t("titles.secondCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.secondCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {changeLanguage(i18n.language)}}
                                    className='card-button'/>
                            </StyledCard>
                            <StyledCard onClick={() => {onLoginButtonClick();
                                loggedIn && onLoginSuccessServ('/services/services3', data);}}>
                                <StyledBlockImgTitle>
                                    <StyledImg src={ThirdIcon} alt={t("alts.thirdCard")}/>
                                    <StyledTitleCard>{t("titles.thirdCard")}</StyledTitleCard>
                                </StyledBlockImgTitle>
                                <StyledParagraph className='card-text'>{t("texts.thirdCard")}</StyledParagraph>
                                <StyledButton
                                    value="&rarr;"
                                    onClick={() => {changeLanguage(i18n.language)}}
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

```

### ServicesPageInOne - приватний компонент React JS (./client/src/pages/ServicesPageInOne.js)
### ServicesPageInTwo - приватний компонент React JS (./client/src/pages/ServicesPageInTwo.js)
### ServicesPageInTree - приватний компонент React JS (./client/src/pages/ServicesPageInThree.js)

Компонент ServicesPageInOne приймає об'єкт data та містить віджети, які дозволяють користувачу взаємодіяти зі сторінкою.

В першу чергу, використовуються бібліотеки styled-components, react-i18next та react-router-dom. styled-components дозволяє створювати стилізовані компоненти з CSS в JS, react-i18next забезпечує мультилінгвістичні можливості додатка, а react-router-dom - навігацію між сторінками.

В компоненті знаходиться метод renderCards, який повертає масив карток з даними, які виводяться на сторінці. Кожна карточка містить назву та кнопку, яку можна натиснути для додавання замовлення. При натисканні на кнопку відправляється POST-запит на сервер з параметрами user_id та price_id, а також відображається модальне вікно Successful, яке показує, що замовлення успішно додано.

Крім того, в компоненті використовується useState для зберігання станів компонента, а useEffect використовується для визначення часу відображення блоку з картками.

Всі інші компоненти відповідають за відображення елементів на сторінці та реагують на події взаємодії з користувачем.

Цей код - це компонент React, що відображає сторінку з послугами.
* import React, {useEffect, useState} from 'react'; - імпортуємо бібліотеки React.
* import styled from "styled-components"; - імпортуємо бібліотеку styled-components, яка дозволяє використовувати CSS в стилі JavaScript.
* import {useTranslation} from "react-i18next"; - імпортуємо бібліотеку react-i18next, яка дозволяє використовувати мультилінгвальність в React додатках.
* import {useNavigate} from "react-router-dom"; - імпортуємо бібліотеку react-router-dom, яка дозволяє маршрутизувати наш додаток.
* import {sendPostRequestAddOrders} from "../entities/api" - імпортуємо функцію sendPostRequestAddOrders з власного API.
* import Successful from "../components/Successful"; - імпортуємо компонент Successful, який буде відображатись, коли замовлення було успішно створено.
* const ServicesPageInOne = ({data}) => { ... } - створюємо функціональний компонент ServicesPageInOne із параметром data.
* const {t, i18n} = useTranslation('translation', {keyPrefix: 'services1'}); - використовуємо функцію useTranslation для отримання об'єкту t, який дозволяє нам локалізувати тексти, і об'єкту i18n, який дозволяє змінювати мову нашого додатка. В useTranslation передається ключ translation і префікс services1, що означає, що тексти, які будуть локалізовані, повинні бути у вигляді ключа services1:ключ у файлі перекладів.
* const changeLanguage = (language) => { i18n.changeLanguage(language) }; - створюємо функцію changeLanguage, яка приймає мову, і викликає функцію changeLanguage з об'єкту i18n, щоб змінити мову додатка.
* const \[isVisible, setIsVisible\] = useState(false); - створюємо стан isVisible, який буде відповідати за те, чи видимі карти з послугами.

Компонент використовує useTranslation для перекладу тексту на поточну мову користувача за допомогою бібліотеки react-i18next. Ця бібліотека надає зручний спосіб додавання багатомовної підтримки до додатка.

Компонент містить декілька станів, таких як isVisible, isLoading та showSuccessful, кожен з яких залежить від деяких дій користувача або результату запитів. Ініціалізація деяких станів відбувається за допомогою useState, наприклад, setIsVisible та setIsLoading.

Компонент використовує useNavigate для навігації між сторінками за допомогою react-router-dom. Наприклад, функція handelBackPage використовує navigate(-1) для переходу на попередню сторінку.

Компонент містить функцію handleButtonClick, яка відправляє запит POST на сервер за допомогою функції sendPostRequestAddOrders. Ця функція передає об'єкт з двома параметрами - user_id та price_id. Якщо запит виконується успішно, компонент встановлює стан showSuccessful в true, інакше встановлює його в false.

Компонент також містить функцію renderCards, яка генерує карти за допомогою мапування масиву cardsData та передає параметри компонента StyledCard та StyledButton. Компоненти StyledCard та StyledButton створені з використанням styled-components і містять CSS стилі.

Компонент повертає кілька React-елементів, таких як StyledSection, StyledContainer, StyledTitle тощо, кожен з яких має свої властивості та стилі. Ці елементи складаються в загальний інтерфейс користувача.

```
import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom";
import {sendPostRequestAddOrders} from "../entities/api"
import Successful from "../components/Successful";


const ServicesPageInOne = ({data}) => {
    const {t, i18n} = useTranslation('translation',  {keyPrefix: 'services1'});
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
            id: i18n.language === "en" ? "1" : "13",
            title: t("titles.firstCard"),
        },
        {
            id: i18n.language === "en" ? "2" : "14",
            title: t("titles.secondCard"),
        },
        {
            id: i18n.language === "en" ? "3" : "15",
            title: t("titles.thirdCard"),
        },
        {
            id: i18n.language === "en" ? "4" : "16",
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
                    <StyledButtonDiff value={t("btnDiff")} onChange={changeLanguage} onClick={handelBackPage}/>
                    {showSuccessful && (<Successful onClose={handleSuccessfulClose} />)}
                </StyledContainer>
            </StyledSection>
        </>
    );
};

export default ServicesPageInOne;


```

### AboutPage - компонент React JS (./client/src/pages/AboutPage.js)

Цей код містить React компонент "AboutPage", який представляє сторінку "Про нас".

У компоненті використовуються наступні імпорти:

*	React з бібліотеки React;
*	styled з бібліотеки styled-components для створення стилів;
*	useTranslation з бібліотеки react-i18next для перекладу тексту;
*	AboutBackground як зображення фону, яке імпортується з локального файлу;
*	Counter з власної компоненти, що представляє рахівник.

Компонент містить блок з назвою та описом "Про нас", що відображається використовуючи бібліотеку useTranslation.

Далі відображається блок з трьома статистичними значеннями. Для кожного значення використовується компонент Counter для анімації зміни числа. Ім'я для кожного значення береться з джерела перекладу за допомогою useTranslation.

Загальний дизайн сторінки оформлюється з використанням стилів з styled-components. У блок зі статистикою також обгорнутий у стилізований контейнер.

Усі ці елементи виводяться в return методі компонента.

```
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

```

### Counter - компонент React JS (./client/src/features/Counter.js)

Counter реалізує анімацію зростання числа від 0 до певного значення, переданого властивістю count. Властивість updateInterval визначає, з якою частотою компонент повинен оновлювати відображення числа.

У стані компонента використовується змінна displayCount, яка показує поточний стан відображення числа. Використання useState дозволяє оновлювати це значення при кожному виклику setDisplayCount.

Компонент також використовує useEffect для налаштування інтервалу оновлення числа. Якщо поточне відображення менше за передане значення count, то setInterval викликає функцію, яка збільшує displayCount на 1 і повертає її в якості нового значення стану.

Компонент повертає відображення числа в контейнері CounterContainer.


```
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
```

### ContactPage - компонент React JS (./client/src/pages/ContactPage.js)

Цей код створює сторінку з контактами, що використовує компоненти зі стилізацією з бібліотеки styled-components та переклад з бібліотеки react-i18next. Зображення, що використовуються на сторінці, імпортуються з локальних файлів.

Створюється компонент ContactPage, який відображує блок з контактною інформацією: годинами роботи, телефоном і електронною поштою. Для перекладу використовується ключ 'contacts', що передається як параметр до функції useTranslation.

Крім того, є можливість змінити мову сторінки через функцію changeLanguage. Наступні параметри задають розміщення зображень на блоку: image1Pos, image2Pos, image3Pos встановлюють положення на блоку (центр, верхній лівий кут, нижній правий кут); image1PosX, image2PosX, image3PosX встановлюють положення по горизонталі; image1PosY, image2PosY, image3PosY встановлюють положення по вертикалі.

Компоненти, що використовуються на сторінці: StyledSection, StyledContainer, StyledTitle, StyledDiv, StyledHours, StyledSecondTitle, StyledText, StyledPhone, StyledEmail.


```
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
```

### UserCabinetPage - приватний компонент React JS (./client/src/pages/UserCabinetPage.js)

UserCabinetPage - особистий кабінет користувача. У компоненті використовуються бібліотеки styled-components та react-i18next.

На початку компонента знаходяться імпорти. Після імпортів визначається функціональний компонент UserCabinetPage, який приймає пропс data.

У середині компонента є кілька хуків, таких як useState, useCallback та useEffect. Зокрема, за допомогою хука useState створюється стан для userOrders, activeIndex та isItemTrash, які зберігають дані про замовлення користувача, активний індекс і флаг видалення замовлення відповідно.

У компоненті також є функція fetchUserOrders, яка отримує дані про замовлення користувача за допомогою API-запиту та зберігає їх у стані userOrders за допомогою хука useEffect.

Крім того, у компоненті є функції для відображення даних про замовлення та для видалення замовлення. Ці функції використовуються для рендерингу списку замовлень користувача, який відображається у вигляді таблиці з можливістю розгортання деталей замовлення та можливістю видалення замовлення.

Компонент також містить стилі для його візуального відображення.

Компонент UserCabinetPage використовує хуки useState, useCallback та useEffect. Він також імпортує інші компоненти та зображення з відповідних файлів.

Компонент містить функцію fetchUserOrders, яка використовує API-запит для отримання інформації про замовлення користувача. Дані, отримані з запиту, зберігаються у стані компонента за допомогою хука useState. Функція fetchUserOrders оголошена за допомогою хука useCallback для того, щоб уникнути зайвих рендерів компонента, коли функція викликається повторно.

Хук useEffect використовується для запуску функції fetchUserOrders при монтуванні компонента та коли змінюється стан isItemTrash. Коли запит виконується успішно, дані зберігаються у стані за допомогою функції setUserOrders.

Компонент також містить ряд функцій, таких як handleDeleteOrder, яка видаляє замовлення, handleItemClick, яка змінює активний елемент, та renderStats, яка відображає замовлення користувача у вигляді списку. Функція renderStats перевіряє наявність замовлень користувача та відображає їх у вигляді списку. Кожен елемент списку може розкриватися, щоб показати більш детальну інформацію про замовлення.

У всіх елементах списку є кнопка видалення, яка викликає функцію handleDeleteOrder та оновлює стан isItemTrash. Кнопка видалення також змінює мову інтерфейсу на поточну мову за допомогою функції changeLanguage з бібліотеки react-i18next.


```
import React, {useCallback, useEffect, useState} from 'react';
import styled from "styled-components";
import userAvatar from "../assets/userAvatar.svg"
import {useTranslation} from "react-i18next";
import trash from "../assets/trash.svg"
import {getUserOrders, deleteOrder} from "../entities/api"



const UserCabinetPage = ({ data }) => {
    const { t, i18n } = useTranslation('translation', { keyPrefix: 'cabinet' });

    const changeLanguage = (language) => {
        i18n.changeLanguage(language)
    };

    const [userOrders, setUserOrders] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [isItemTrash, setIsItemTrash] = useState(false);

    const fetchUserOrders = useCallback(async () => {
        const url = `/user_orders/${encodeURIComponent(data.id)}`;
        const orders = await getUserOrders(url);
        setUserOrders(orders);
    }, [data.id]);

    useEffect(() => {
        fetchUserOrders();
    }, [fetchUserOrders, isItemTrash]);

    const handleDeleteOrder = useCallback(async (id) => {
        const url = `/delete/${encodeURIComponent(id)}`;
        await deleteOrder(url);
        setUserOrders(prevState => {
            const updatedOrders = prevState.orders.filter((order) => order.id !== id);
            return { ...prevState, orders: updatedOrders };
        });
    }, []);

    const handleItemClick = useCallback((index) => {
        setActiveIndex(activeIndex === index ? -1 : index);
    }, [activeIndex]);



    const renderStats = () => {
        if (userOrders.orders && userOrders.orders.length !== 0) {
            return userOrders.orders.map((order, index) => (
                <>
                    <StyledItem key={index}>
                        <StyledData>
                            <StyledText>{order.name_service}</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.count_item} w</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.price} doll</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledText>{order.cost} doll</StyledText>
                        </StyledData>
                        <StyledData>
                            <StyledBtnTogle onClick={() => handleItemClick(index)}>
                                {activeIndex === index ? "-" : "+"}
                            </StyledBtnTogle>
                        </StyledData>
                    </StyledItem>
                    {activeIndex === index && (
                        <>
                            {order.orders_for_price_id.map((item, i) => (
                                <StyledItemHower key={i} >
                                    <StyledData>
                                        <StyledText>{item.name_service}</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledText>{item.price} doll</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledText>{item.order_date}</StyledText>
                                    </StyledData>
                                    <StyledData>
                                        <StyledBtnClose onClick={() => {handleDeleteOrder(item.id);
                                                                        setIsItemTrash(item.id);
                                                                        changeLanguage(i18n.language);}}>
                                            <img src={trash} alt={t("alts.iconTrash")}/>
                                        </StyledBtnClose>
                                    </StyledData>
                                </StyledItemHower>
                            ))}
                        </>
                    )}
                    {(isItemTrash !== order.id || order.orders_for_price_id.length === 0) && (
                        <></>
                    )}
                </>
            ));
        } else {
            return (
                <>
                    <StyledItem>
                        <StyledData>
                            <StyledText>---No orders---</StyledText>
                        </StyledData>
                    </StyledItem>
                </>
            );
        }
    };

    return (
        <StyledSection>
            <StyledContainer>
                <StyledWrapImg>
                    <img src={userAvatar} alt={t("alts.iconMain")} />
                </StyledWrapImg>
                <StyledWrapData>
                    <StyledTextUsername>{t("username")} : {data.username}</StyledTextUsername>
                    <StyledTextEmail>{t("email")} : {data.email}</StyledTextEmail>
                    <StyledStatBlock>
                        <StyledSecondTitle>{t("title")}</StyledSecondTitle>
                    </StyledStatBlock>
                    {renderStats()}
                </StyledWrapData>
            </StyledContainer>
        </StyledSection>
);
};

export default UserCabinetPage;

```

### api.js - приватний компонент React JS (./client/src/entities/api.js)

Це набір функцій, які виконують різноманітні API-запити до сервера.

Функція sendPostRequestAddOrders відправляє POST-запит з вказаною URL-адресою і даними, щоб додати нове замовлення на сервер. Якщо відповідь успішна, повертається true. Якщо сталася помилка, генерується об'єкт помилки, який містить текстове повідомлення про помилку.

Функції loginUser і registerUser використовуються для авторизації користувачів і реєстрації нових користувачів на сервері відповідно. Обидві функції відправляють POST-запит з вказаною URL-адресою і даними. Якщо відповідь успішна, повертається об'єкт з даними про користувача. Якщо сталася помилка, генерується об'єкт помилки, який містить текстове повідомлення про помилку.

Функція getUserOrders використовується для отримання списку замовлень користувача. Вона відправляє GET-запит з вказаною URL-адресою і повертає масив замовлень користувача. Якщо сталася помилка, повертається null.

Функція deleteOrder використовується для видалення замовлення з сервера. Вона відправляє DELETE-запит з вказаною URL-адресою. Якщо відповідь успішна, функція повертає undefined. Якщо сталася помилка, генерується об'єкт помилки, який містить текстове повідомлення про помилку.

Функція getPassword використовується для отримання пароля користувача з сервера. Вона відправляє POST-запит з вказаною URL-адресою і даними. Якщо відповідь успішна, повертається true. Якщо сталася помилка, генерується об'єкт помилки, який містить текстове повідомлення про помилку.

Крім того, у цьому коді є ще декілька функцій для взаємодії з API:

*	deleteOrder - відправляє DELETE-запит для видалення запису зі списку замовлень користувача на сервері.
*	getPassword - відправляє POST-запит для отримання паролю користувача з сервера.
*	LogOut - відправляє POST-запит для виходу з аккаунту користувача на сервері.

Всі ці функції використовують fetch для взаємодії з сервером і повертають асинхронний результат у вигляді об'єкта Promise. При успішному виконанні запиту функції повертають корисну інформацію, а при невдачі викидають виключення з помилкою.

Такі функції дозволяють зручно і безпечно взаємодіяти з сервером, відправляти запити і отримувати відповіді, а також реагувати на помилки. Вони можуть бути використані в будь-якому компоненті, що потребує взаємодії з сервером, дозволяючи уникнути дублювання коду і зберігати код бази в організованій структурі.

```
const sendPostRequestAddOrders = async (url = '', data, setIsLoading) => {
    try {
        setIsLoading(true);
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data),
            mode: 'cors'
        });

        const responseData = await response.json();
        console.log(responseData)
        if (responseData || responseData.success) {
            return true
        }
        setIsLoading(false);
        throw new Error(responseData.error || 'Something went wrong');
    } catch (error) {
        return error;
    }
};

const registerUser = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return responseData;
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Something went wrong');
    }
};

const loginUser = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return responseData;
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);
        throw new Error(error.message || 'Something went wrong');
    }
};


const getUserOrders = async (url = '') => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const orders = await response.json();
        return orders;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return null;
    }
};

const deleteOrder = async (url='') => {
    try {
        const response = await fetch(url, {
            method: 'DELETE',
        });
        if (response.ok) {
            return
        } else {
            throw new Error('Failed to delete record.');
        }
    } catch (error) {
        console.error(error);
        alert('Failed to delete record.');
    }
};


const getPassword = async (url = '', data = {}) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();

        if (responseData.status === "ok") {
            return true
        }
        throw new Error(responseData.error || 'Something went wrong');

    } catch (error) {
        console.error(error);

    }
};

const LogOut = async (url = '') => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const res = await response.json();
        return res;
    } catch (error) {
        console.error('Error fetching user orders:', error);
        return null;
    }
};

export { sendPostRequestAddOrders, loginUser, registerUser, getUserOrders, deleteOrder,  getPassword, LogOut};

```


## 2. Серверна частина сайту</h2>

### app.py (./app.py)

Код веб-додатку на Python з використанням фреймворка Flask і реалізує REST API для додатку, який дозволяє користувачам реєструватися, увійти, робити замовлення і отримувати їх інформацію. Додаток має статичні сторінки, які обслуговуються з цього ж Flask додатку.

Це код для веб-додатку на Flask. Для його роботи потрібні додаткові модулі Flask, Flask_SQLAlchemy, Flask_Mail, Flask_CORS та SQLAlchemy. Запускати потрібно з файлу, який містить функцію create_app(), що створює Flask додаток і встановлює потрібні конфігурації.

У цьому додатку зібрані ряд сторінок, що знаходяться в папці client/build. Також є ряд маршрутів для запитів: реєстрація, вхід користувача, отримання сторінок з послугами, контакти та інформація про користувача. Крім того, є маршрут /add_order для додавання нового запису про замовлення в базу даних.

Є встановлені деякі конфігурації: URI бази даних, налаштування електронної пошти (SMTP), ключ доступу до бази даних та секретний ключ. Використовується ORM SQLAlchemy для взаємодії з базою даних. Також є створення таблиці з вартістю послуг. Якщо ціна для послуги не знайдена в базі даних, вона додається.

Для забезпечення CORS здійснюється виклик функції CORS () з додатком Flask.

У функції register_user() та login_user() використовуються дані, що надійшли з форми реєстрації та входу користувача. Користувачі додаються в базу даних, якщо не знайдено вже існуючого користувача з такою ж електронною адресою. Введені дані автоматично переводяться в нижній регістр. Якщо авторизація пройшла успішно, повертається повідомлення про успішний вхід.

У функції add_record () отримується інформація про замовлення, відправлена з клієнтської сторони. Після отримання ID ціни з таблиці prices, запис про замовлення додається в базу даних.

if name == 'main': app.run(host='0.0.0.0', port=5000)

У цьому коді ми використовуємо фреймворк Flask для створення веб-додатку. Ми також використовуємо додаткові бібліотеки, такі як SQLAlchemy, Flask-Mail і Flask-CORS. Ми також налаштували деякі параметри додатку, такі як секретний ключ, адресу бази даних та адресу серверу електронної пошти.

Додаток містить кілька маршрутів, які повертають відповідні HTML-сторінки. Ми також маємо кілька маршрутів, які приймають запити POST та зберігають дані в базі даних. Наприклад, маршрут /add_order приймає параметри user_id та price_id, дістає інформацію про ціну з бази даних та створює новий запис в таблиці Order. Після успішного створення запису ми надсилаємо листа користувачеві, щоб повідомити його про успішне замовлення.

Код містить кілька функцій маршрутизації (доступні з певних URL-адрес). Функції serve(), services(), services_services1(), services_services2(), services_services3(), about(), contact(), user() обслуговують статичні сторінки. Функція register_user() дозволяє користувачам зареєструватися в додатку, перевіряючи, чи не існує вже користувач з такою ж адресою електронної пошти. Функція login_user() дозволяє користувачам увійти до додатку. Функція add_record() дозволяє користувачам створювати замовлення і зберігає їх у базі даних. Функція get_user_orders() дозволяє користувачам отримувати інформацію про їх замовлення.

У функції register_user(), після успішної реєстрації нового користувача, відповідь містить заголовок Access-Control-Allow-Origin зі значенням http://localhost:3000, що дозволяє запитам з цього домену звертатися до цього API.

Для додаткової безпеки, в функції login_user(), перед порівнянням пароля з базою даних, планується захешувати пароль та порівняти хеш-значення.

Функція @app.route('/') @cross_origin() def serve(): 
Ця функція описує адресу за замовчуванням, яка використовується при запуску веб-додатку. Вона повертає статичний файл 'index.html', який знаходиться в папці static_folder. Крім того, за допомогою декоратора cross_origin() дозволяється запитувати цей ресурс з будь-якого джерела.

Функція register_user() - додає нового користувача у базу даних. Вхідні дані передаються методом POST. Якщо користувач з такою ж поштою вже існує, повертається помилка. Якщо реєстрація успішна, повертається JSON з повідомленням про успішну реєстрацію та даними про створеного користувача.

Функція login_user() - перевіряє, чи є в базі даних користувач з вказаною поштою та паролем. Якщо авторизація успішна, повертається JSON з повідомленням про успішний вхід та даними про користувача. Якщо авторизація не вдалась, повертається помилка.

Функція add_record()- відповідає за додавання нового замовлення в базу даних. Вона очікує на отримання POST запиту з JSON-даними, що містять інформацію про user_id (ідентифікатор користувача) та price_id (ідентифікатор ціни). Далі, функція запитує базу даних для отримання інформації про ціну (назву послуги та вартість), створює новий об'єкт Order з отриманими даними та додає його в базу даних. На виході функція повертає JSON-відповідь із статусом "ok".

Функція get_user_orders(user_id) - повертає список всіх замовлень для користувача з певним ідентифікатором user_id. Функція очікує на GET запит з ідентифікатором користувача у URL-адресі. Функція використовує SQLAlchemy для отримання даних про замовлення, групує їх за ідентифікатором послуги та сортує за датою замовлення. Потім функція перебирає список замовлень та створює словник з інформацією про замовлення та додатковою інформацією про кожне замовлення, включаючи його ідентифікатор, ідентифікатор користувача, вартість, дату замовлення та інше. На виході функція повертає JSON-відповідь із списком замовлень та інформацією про кожне замовлення.

Функція delete_record(id) призначена для видалення замовлення з бази даних за його ідентифікатором id. У випадку, якщо замовлення з таким ідентифікатором не знайдено, функція повертає помилку "Order not found" з кодом статусу 404. Якщо замовлення знайдено і успішно видалено з бази даних, функція повертає повідомлення про успішне видалення замовлення з вказаним ідентифікатором.

Функція send_password() відправляє пароль користувача на його електронну пошту. Вона отримує електронну пошту користувача як параметр запиту POST із ключем email. Далі функція виконує запит до бази даних за email, щоб знайти користувача з таким email. Якщо користувача не знайдено, функція повертає повідомлення "Пользователь с таким email не найден". Якщо користувача знайдено, функція отримує його пароль та створює об'єкт Message з заголовком "Ваш пароль" та текстом повідомлення, що містить пароль користувача. Об'єкт Message відправляється на електронну пошту користувача за допомогою методу mail.send(). У випадку успішної відправки, функція повертає JSON об'єкт із статусом "ok" та прапорцем success у значенні True.

Функція logout_user() призначена для виходу користувача з системи. Вона повертає повідомлення про успішний вихід користувача з системи.

```
from flask import Flask, request, jsonify, session, render_template, make_response
from flask.helpers import send_from_directory
from flask_cors import CORS, cross_origin
from sqlalchemy import func
from flask_mail import Mail, Message
from config import ApplicationConfig
from models import db, User, Order, Price
import os

app = Flask(__name__, static_folder='client/build', static_url_path='')
# CORS(app, supports_credentials=True)

app.config.from_object(ApplicationConfig)
CORS(app)
db.init_app(app)

app.config['SECRET_KEY'] = 'a really really really really long secret key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:pass@localhost/flask_app_db'
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'cithicom436@gmail.com'
app.config['MAIL_DEFAULT_SENDER'] = 'cithicom436@gmail.com'
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')
mail = Mail(app)


with app.app_context():
    db.create_all()
    service_prices = {
        "Logotype": 100,
        "Landing page": 500,
        "Set of icons": 300,
        "Website": 1000,
        "Prevention": 200,
        "Repair": 300,
        "Equipment": 100,
        "Diagnostics": 150,
        "Coding": 1500,
        "Consultancy": 200,
        "Testing": 500,
        "Development": 3000,
        "Логотип": 100,
        "Посадкова сторінка": 500,
        "Набір іконок": 300,
        "Веб-сайт": 1000,
        "Профілактика": 200,
        "Ремонт": 300,
        "Комплектація": 100,
        "Діагностика": 150,
        "Верстання": 1500,
        "Консультування": 200,
        "Тестування": 500,
        "Розробка": 3000
    }
    for service, price in service_prices.items():
        existing_price = Price.query.filter_by(name_service=service, price=price).first()
        if existing_price is None:
            new_price = Price(name_service=service, price=price)
            db.session.add(new_price)
        else:
            existing_price.price = price
    db.session.commit()



@app.route('/')
@cross_origin()
def serve():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/services')
@cross_origin()
def services():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/services/services1')
@cross_origin()
def services_services1():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/services/services2')
@cross_origin()
def services_services2():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/services/services3')
@cross_origin()
def services_services3():
    return send_from_directory(app.static_folder, 'index.html')


@app.route('/about')
@cross_origin()
def about():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/contacts')
@cross_origin()
def contact():
    return send_from_directory(app.static_folder, 'index.html')

@app.route('/user')
@cross_origin()
def user():
    return send_from_directory(app.static_folder, 'index.html')


@app.route("/register", methods=["POST"])
def register_user():
    username = request.json["username"]
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email.lower()).first() is not None

    if user_exists:
        return jsonify({"error": "User already exists"}), 409


    new_user = User(username=username, email=email.lower(), password=password)
    db.session.add(new_user)
    db.session.commit()

    response = jsonify({'message': 'success'})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')

    return jsonify({
        "status": "ok",
        "message": f'Welcome {new_user.username}!',
        "data": {
            "id": new_user.id,
            "email": new_user.email,
            "username": new_user.username
        }
    })


@app.route("/login", methods=["POST"])
def login_user():
    email = request.json["email"]
    password = request.json["password"]
    print(email)

    user = User.query.filter_by(email=email.lower()).first()

    if user is None:
        return jsonify({"status": "error", "messageErr": "Unauthorized"}), 401

    if password != user.password:
        return jsonify({"status": "error", "messageErr": "Unauthorized"}), 401


    return jsonify({
        "status": "ok",
        "message": f'Welcome {user.username}!',
        "data": {
            "id": user.id,
            "email": user.email,
            "username": user.username
        }
    })

@app.route('/add_order', methods=['POST'])
def add_record():

    user_id = request.json.get('user_id')
    price_id = request.json.get('price_id')
    print(request.json)

    # Getting price data from prices table
    name_service = Price.query.get(price_id).name_service
    price_value = Price.query.get(price_id).price
    print(user_id, type(user_id))
    print(price_id, type(price_id))
    print(name_service, type(name_service))
    print(price_value, type(price_value))
    # Creating a new order
    new_order = Order(user_id=user_id, price_id=int(price_id), name_service=name_service, price=price_value)
    db.session.add(new_order)
    db.session.commit()

    return jsonify({"status": "ok", 'success': True})

@app.route('/user_orders/<string:user_id>', methods=['GET'])
def get_user_orders(user_id):
    orders = db.session.query(Order.user_id,
                              Order.price_id,
                              func.count(Order.price_id).label('count_item'),
                              Order.name_service,
                              Order.price,
                              func.sum(Order.price).label('cost'),
                              Order.order_date
                              ).filter_by(user_id=user_id
                                          ).group_by(Order.user_id,
                                                     Order.name_service,
                                                     Order.price
                                                     ).order_by(Order.order_date.desc()
                                                                ).all()
    # List for storing results
    orders_list = []

    # We go through all the orders and add them to the list of results
    for order in orders:
        # We get information about the price and service for this order from related tables
        price = Price.query.filter_by(id=order[1]).first()
        service_name = price.name_service

        # Get a list of orders for a specific price_id
        orders_for_price_id = db.session.query(Order).filter_by(price_id=order[1], user_id=user_id).all()

        # Create a list of orders and add each order to it
        orders_for_price_id_list = []
        for order_for_price_id in orders_for_price_id:
            order_for_price_id_data = {
                'id': order_for_price_id.id,
                'user_id': order_for_price_id.user_id,
                'count_item': 1,
                'name_service': service_name,
                'price': order_for_price_id.price,
                'cost': order_for_price_id.price,
                'order_date': order_for_price_id.order_date.strftime('%d/%m/%Y')
            }
            orders_for_price_id_list.append(order_for_price_id_data)

        # Create a dictionary with order data and add it to the list
        order_data = {
            'user_id': order[0],
            'count_item': order[2],
            'name_service': service_name,
            'price': order[-3],
            'cost': order[-2],
            'order_date': order[-1].strftime('%d/%m/%Y'),
            'orders_for_price_id': orders_for_price_id_list
        }
        orders_list.append(order_data)

    # Returning results as a JSON object
    return jsonify({'orders': orders_list})

@app.route('/delete/<int:id>', methods=['DELETE'])
def delete_record(id):
    order = Order.query.get(id)
    if not order:
        return jsonify({'error': 'Order not found'}), 404
    db.session.delete(order)
    db.session.commit()
    return jsonify({'message': f'Order with id {id} has been deleted.'}), 200


@app.route('/send_password', methods=['POST'])
def send_password():
    email = request.json.get('email')
    print(email)
    user = User.query.filter_by(email=email.lower()).first()

    if user is None:
        return 'Пользователь с таким email не найден'

    password = user.password
    msg = Message('Ваш пароль', recipients=[email])
    msg.body = f'Ваш пароль: {password}'
    mail.send(msg)

    return jsonify({"status": "ok", 'success': True})

@app.route("/logout", methods=["POST"])
def logout_user():
    return {"message": "User logged out successfully"}


if __name__ == "__main__":
    app.run(debug=True)

```
### models.py (./models.py)

Це опис моделей даних в нашому додатку, реалізований за допомогою Flask SQLAlchemy.

Модель User відображає користувачів, які можуть створювати замовлення та авторизовуватись у системі. Кожен користувач має унікальний ідентифікатор, ім'я користувача, електронну пошту та пароль.

Модель Price відображає перелік послуг та їх ціну. Кожна послуга має унікальний ідентифікатор, назву та ціну.

Модель Order відображає замовлення, яке зробив користувач. Кожне замовлення має унікальний ідентифікатор, ідентифікатор користувача, ідентифікатор послуги, її назву, ціну та дату замовлення. При створенні замовлення user_id та price_id пов'язуються з відповідними ідентифікаторами користувача та послуги в моделях User та Price.

```
from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4
from datetime import datetime


db = SQLAlchemy()

def get_uuid():
    return uuid4().hex


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    username = db.Column(db.String(345), nullable=False)
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)


class Order(db.Model):
    __tablename__ = "orders"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.String(32), db.ForeignKey('users.id'), nullable=False)
    price_id = db.Column(db.Integer, db.ForeignKey('prices.id'), nullable=False)
    name_service = db.Column(db.String(345), nullable=False)
    price = db.Column(db.Float)
    order_date = db.Column(db.DateTime, default=datetime.utcnow)


class Price(db.Model):
    __tablename__ = "prices"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name_service = db.Column(db.String(345), nullable=False)
    price = db.Column(db.Float, nullable=False)

```

