import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../components/auth/ProtectedRoute';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" />
            <Route path="/login"/>

            {/* Protected Routes */}
            <Route path="/dashboard"/>
        </Routes>
    )
}

export default AppRoutes;