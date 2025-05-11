import { ToastType } from '@/types/enum';

export interface TableColumn {
    column: string
    title: string
    align?: 'left' | 'center' | 'right'
}

export interface DataItem {
    [key: string]: string | number | boolean
}

export interface PageData {
    currentPage: number
    totalPage: number
}

export interface ProductItem {
    title: string
    category: string
    origin_price: number
    price: number
    unit: string
    description: string
    content: string
    is_enabled: number
    imageUrl: string
    imagesUrl: string[]
    id?: string
}

export interface ToastListItem {
    id: string | number
    content: string
    type: ToastType
}