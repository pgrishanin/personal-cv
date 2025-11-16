import { HomePage } from '@pages/home';
import { BrowserRouter, Route, Routes } from 'react-router';

export const AppNavigator = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};
