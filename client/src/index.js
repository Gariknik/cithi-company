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
    
    /* lato-bold */
    @font-face {
      font-family: 'Lato';
      font-style: normal;
      font-weight: 600;
      src: url('${Lato600woff}') format('woff'), /* Modern Browsers */
    }
    body {
      font-family: 'Lato', sans-serif;
    };
`;

createRoot(document.getElementById(`root`)).render(
    <Suspense fallback={<div>Loading...</div>}>
        <Global />
        <AppWrapper />
    </Suspense>
);


reportWebVitals();
