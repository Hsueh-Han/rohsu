import axios from 'axios';

const apiPath = import.meta.env.VITE_API_PATH;

// 上傳圖片
export const uploadImage = (formData: FormData) => axios.post(`/api/${apiPath}/admin/upload`, formData);