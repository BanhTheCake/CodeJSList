import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import setupAxiosClient from './api/setupAxiosClient';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

const theme = extendTheme({
    fonts: {
        body: `'Poppins', sans-serif`,
    },
});

let persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ChakraProvider theme={theme}>
                    <App />
                </ChakraProvider>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

setupAxiosClient(store);
