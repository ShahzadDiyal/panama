import api from './api';

export const contactService = {
  /**
   * Get WhatsApp number for a product (requires active subscription)
   * @param productId - ID of the product
   * @returns Object containing whatsapp number
   */
  getVendorWhatsApp: async (productId: number): Promise<{ whatsapp: string }> => {
    const response = await api.get(`/user/products/${productId}/whatsapp`);
    // Expected response: { success: true, data: { whatsapp: "+123456789" } }
    return response.data.data;
  },
};