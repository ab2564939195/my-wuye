import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {LocaleProvider} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
    <div>
        <BrowserRouter>
            <LocaleProvider locale={zh_CN}><App /></LocaleProvider>
        </BrowserRouter>

    </div>
    , document.getElementById('root'));
serviceWorker.unregister();
