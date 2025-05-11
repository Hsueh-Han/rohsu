import { useContext } from 'react';
import { ToastMessageContext } from '@/store/toastMessageStore';
import { ToastType } from '@/types/enum';

export const useToastMessage = () => {
    const {state: messageList, dispatch} = useContext(ToastMessageContext);

    const updateToastMessage = (type: ToastType, content: string) => {
        const message = {
            id: new Date().getTime(),
            type,
            content,
        }

        dispatch({
            type: 'CREATE',
            message,
        });
        setTimeout(() => {
            dispatch({
                type: 'REMOVE',
                message,
            });
        }, 3500);
    };

    return {
        messageList,
        updateToastMessage
    }
};