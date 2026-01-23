import { HomePage } from '@pages/home';
import { BrowserRouter, Route, Routes } from 'react-router';

const basename = import.meta.env.VITE_BASENAME;

export const AppNavigator = () => {
    return (
        <BrowserRouter basename={basename}>
            <Routes>
                <Route path="/" element={<HomePage />} />
            </Routes>
        </BrowserRouter>
    );
};
