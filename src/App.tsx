import { Outlet } from 'react-router-dom';
import Toast from '@/components/common/Toast';

import { ToastMessageContext, toastMessageReducer } from '@/store/toastMessageStore';
import { useReducer } from 'react';

function App() {
    const [state, dispatch] = useReducer(toastMessageReducer, []);

    return (
        <ToastMessageContext.Provider value={{state, dispatch}}>
            <Toast />
            <Outlet />
        </ToastMessageContext.Provider>
    )
}

export default App
