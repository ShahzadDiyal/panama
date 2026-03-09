import api from './api';
import type { Subscription, PaymentStatus } from '../types';

export const subscriptionService = {
    /**
     * Create a Stripe Checkout session for a plan
     */
    checkout: async (planId: number): Promise<{ checkout_url: string; session_id: string }> => {
        const response = await api.post('/user/subscriptions/checkout', { plan_id: planId });
        return response.data.data; // expects { checkout_url, session_id }
    },

    /**
     * Upgrade current subscription to a new plan
     */
    upgrade: async (newPlanId: number): Promise<{ success: boolean; subscription?: Subscription }> => {
        const response = await api.post('/user/subscriptions/upgrade', { new_plan_id: newPlanId });
        return response.data;
    },

    /**
     * Get payment status after Stripe redirect
     */
    getPaymentStatus: async (sessionId: string): Promise<PaymentStatus> => {
        const response = await api.get(`/user/subscriptions/status?session_id=${sessionId}`);
        return response.data.data;
    },

    /**
     * Get current user's subscription (if any)
     */
    getMySubscription: async (): Promise<Subscription | null> => {
        const response = await api.get('/user/subscriptions/me');
        return response.data.data; // may be null if no subscription
    },
};