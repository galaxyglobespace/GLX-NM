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
    <MoralisProvider serverUrl="https://btbpgajnttxt.usemoralis.com:2053/server" appId="cg083RyJzWvVbLtyQ7WxQpfAyIICON4AN8MGSxqe">
    <App />
    </MoralisProvider>
  </BrowserRouter>,
  document.getElementById('root')
);
