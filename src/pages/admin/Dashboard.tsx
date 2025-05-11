import { Outlet, useNavigate, NavLink } from 'react-router-dom';

import { $adminAuthApi } from '@/services';
import { clearAuthToken } from '@/utils/helpers';
import { useLoadingState } from '@/hooks/useLoadingState';

import Button from '@/components/common/Button';
import Icon from '@/components/common/Icon';

import '@/assets/scss/pages/admin/dashboard.scss';

function Dashboard() {

    const navigate = useNavigate();

    const {
        getIsLoadingRef,
        getUiLoadingState,
        updateUiLoadingState,
    } = useLoadingState();

    const logout = async() => {
        if (!getIsLoadingRef()) {
            try {
                updateUiLoadingState(true);
                await $adminAuthApi.logout();
            } catch (error) {
                console.debug(error);
            } finally {
                clearAuthToken();
                navigate('/login');
                updateUiLoadingState(false);
            }
        }

    };

    return(
        <div className="bg-rps-secondary-lighter">
            <div className="flex items-center justify-between px-2 py-2 border-b">
                <NavLink
                    className="block w-16 h-8 py-1 text-center text-rps-warnning"
                    to="/"
                >
                    <Icon type="gem" />
                </NavLink>
                <Button
                    size="sm"
                    clickHandler={logout}
                    isLoading={getUiLoadingState()}
                    hasLoading
                >
                    Logout
                </Button>
            </div>
            <div className="flex h-[calc(100vh_-_49px)]">
                <div className="side-menu">
                    <NavLink
                        className="menu-item"
                        to="/admin/products"
                    >
                        PRODUCTS
                    </NavLink>
                    <NavLink
                        className="menu-item"
                        to="/admin/orders"
                    >
                        ORDERS
                    </NavLink>
                    <NavLink
                        className="menu-item"
                        to="/admin/coupons"
                    >
                        COUPONS
                    </NavLink>
                </div>
                <div className="w-full overflow-auto px-5">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard