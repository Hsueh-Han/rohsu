import { useRef, useState } from 'react';

type LoadingMap = Record<string, boolean>;

export const useLoadingState = () => {

    const isLoadingRef = useRef<LoadingMap>({
        default: false,
    });
    const [uiLoadingState, setUiLoadingState] = useState<LoadingMap>({
        default: false,
    });

    const updateUiLoadingState = (state: boolean, key = 'default') => {
        isLoadingRef.current[key] = state;
        setUiLoadingState((prev) => ({
            ...prev,
            [key]: state
        }));
    };

    const getIsLoadingRef = (key = 'default'): boolean => {
        return isLoadingRef.current[key];
    };
    const getUiLoadingState = (key = 'default'): boolean => {
        return uiLoadingState[key];
    };

    return {
        isLoadingRef,
        uiLoadingState,
        updateUiLoadingState,
        getIsLoadingRef,
        getUiLoadingState,
    };
};