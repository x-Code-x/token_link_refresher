import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import './i18n';
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>loading...</>}>
      <App />
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root'),
);
