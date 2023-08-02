import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './components/App';


/** Redux Store */
import store from './redux/store';
import { Provider } from 'react-redux';

import './18n'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense fallback={<div>ALMAS KILICHOV</div>}>
    <App />
    </Suspense>
  </Provider>
);

