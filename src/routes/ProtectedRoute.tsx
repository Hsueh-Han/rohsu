import { getAuthToken } from '@/utils/helpers';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    element: JSX.Element
    authRequired: boolean
}

function ProtectedRoute ({element, authRequired}: ProtectedRouteProps) {
    const token = getAuthToken();

    return (authRequired && !token ? <Navigate to="/login" replace /> : element)
};

export default ProtectedRoute