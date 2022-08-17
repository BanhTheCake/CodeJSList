import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Login } from './features/auth/layout/Login';
import { Register } from './features/auth/layout/Register';
import PrivateRouteUser from './features/user/PrivateRouteUser';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/*" element={<PrivateRouteUser />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
