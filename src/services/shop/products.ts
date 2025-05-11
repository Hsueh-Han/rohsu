import axios from 'axios';

const apiPath = import.meta.env.VITE_API_PATH;

// 取得商品清單(條件)
export const getProducts = (page: number, category?: string) => axios.get(`/api/${apiPath}/products?page=${page}${category ? `&category=${category}` : ''}`);