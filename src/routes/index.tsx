import { createHashRouter, RouteObject } from 'react-router-dom';
import App from '../App';
import {
    Login,
    Dashboard,
    AdminProducts,
    AdminCoupons,
    AdminOrders,
    Home,
    NotFound,
} from '@/pages/exports';
import ProtectedRoute from './ProtectedRoute';

const routes: RouteObject[] = [
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'admin',
                element: (
                    <ProtectedRoute
                        element={<Dashboard/>}
                        authRequired={true}
                    />
                ),
                children: [
                    {
                        path: 'products',
                        element: <AdminProducts />
                    },
                    {
                        path: 'coupons',
                        element: <AdminCoupons />
                    },
                    {
                        path: 'orders',
                        element: <AdminOrders />
                    },
                ]
            },
            {
                index: true,
                element: <Home />
            }
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    }
];

const router = createHashRouter(routes);

export default router;