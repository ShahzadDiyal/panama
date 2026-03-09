import api from './api';
import type { Category, Plan, VendorListItem, VendorDetails, VendorProductsResponse, ProductDetails } from '../types';
const BASE_STORAGE_URL = 'https://panama.petlovekw.com/storage'

export const getImageUrl = (path: string): string => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  return `${BASE_STORAGE_URL}/${path}`
}


export const publicService = {
  // Get categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get('/public/categories');
    return response.data.data;
  },

  // Get plans
  getPlans: async (): Promise<Plan[]> => {
    const response = await api.get('/public/plans');
    return response.data.data;
  },

  // Get vendors with optional filters
  getVendors: async (params?: {
    category_id?: number;
    location?: string;
    language?: string;
    export_market?: string;
    page?: number;
  }): Promise<{
    current_page: number;
    data: VendorListItem[];
    last_page: number;
    total: number;
  }> => {
    const response = await api.get('/public/vendors', { params });
    return response.data.data; // the paginated data object
  },

  // Get vendor details
  getVendorDetails: async (id: number): Promise<VendorDetails> => {
    const response = await api.get(`/public/vendors/${id}`);
    return response.data.data;
  },

  // Get vendor products
  getVendorProducts: async (vendorId: number, page?: number): Promise<VendorProductsResponse> => {
    const response = await api.get(`/public/vendors/${vendorId}/products`, {
      params: { page }
    });
    return response.data.data; // returns the object with vendor and products
  },

  // Get product details
  getProductDetails: async (productId: number): Promise<ProductDetails> => {
    const response = await api.get(`/public/products/${productId}`);
    return response.data.data;
  },
};