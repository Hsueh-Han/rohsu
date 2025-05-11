import axios from 'axios';
import { LoginRequest } from '@/types/api';

export const login = (data: LoginRequest) => axios.post('/admin/signin', data);

export const logout = () => axios.post('/logout');