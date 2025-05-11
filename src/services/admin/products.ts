import axios from 'axios';
import { ProductItem } from '@/types/common';

const apiPath = import.meta.env.VITE_API_PATH;

// 取得所有商品清單
export const getAllProducts = () => axios.get(`/api/${apiPath}/admin/products/all`);

// 取得商品清單(條件)
export const getProducts = (page: number) => axios.get(`/api/${apiPath}/admin/products?page=${page}`);

// 建立商品
export const createProduct = (data: ProductItem) => axios.post(`/api/${apiPath}/admin/product`, {data});

// 更新商品
export const updateProduct = (id: string, data: ProductItem) => axios.put(`/api/${apiPath}/admin/product/${id}`, {data});

// 刪除商品
export const removeProduct = (id: string) => axios.delete(`/api/${apiPath}/admin/product/${id}`);