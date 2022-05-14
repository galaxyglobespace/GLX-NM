import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from 'react-router-dom'
import ScrollToTop from './ScrollToTop';
import { MoralisProvider } from "react-moralis";
import './polyfill'


ReactDOM.render(
  <BrowserRouter >
    <ScrollToTop />
    <MoralisProvider serverUrl="https://xk9idsattwuf.usemoralis.com:2053/server" appId="15Iy1jKDEBdnTjYWxPCBGXP2ttRu6drjrhuKpFD7">
    <App />
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
