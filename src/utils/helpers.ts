import { AUTH_TOKEN_KEY } from '@/constants/constants';
import { $adminUploadApi } from '@/services';

export const getAuthToken = (): string => {
    const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith(`${AUTH_TOKEN_KEY}=`))
        ?.split('=')[1];

    return token || '';
};

export const saveAuthToken = (token: string, expired: number): void => {
    document.cookie = `${AUTH_TOKEN_KEY}=${token}; expires=${new Date(expired)}`;
};

export const clearAuthToken = (): void => {
    document.cookie = `${AUTH_TOKEN_KEY}=;`;
};

export const uploadImage = async(file: File) => {
    if (file) {
        const formData = new FormData();
        formData.append('file-to-upload', file);
        return $adminUploadApi.uploadImage(formData);
    }
};

export const formatCurrency = (value: number): string => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");