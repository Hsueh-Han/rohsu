import { createContext } from 'react';
import { ToastListItem} from '@/types/common';

type ToastMessageAction = { type: 'CREATE' | 'REMOVE'; message: ToastListItem};

interface ContextType {
    state: ToastListItem[]
    dispatch: React.Dispatch<ToastMessageAction>
}

const defaultValue: ContextType = {
    state: [],
    dispatch: () => {},
};

export const ToastMessageContext = createContext<ContextType>(defaultValue);

export const toastMessageReducer = (state: ToastListItem[], action: ToastMessageAction) => {
    switch (action.type) {
        case 'CREATE':
            return [
                ...state,
                action.message
            ]

        case 'REMOVE':
            return state.filter((item) => item.id !== action.message.id);

        default:
            return state;
    }
};