// Category
export interface Category {
  id: number;
  name: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

// Plan
export interface Plan {
  id: number;
  plan_name: string;
  description: string;
  price: string;
  currency: string;
  validity_value: number;
  validity_unit: string;
  is_active: number;
  created_at: string;
  updated_at: string;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
}

// Vendor (from list)
export interface VendorListItem {
  id: number;
  email: string; // "hidden" maybe, but string
  business_name: string;
  category_id: number;
  location: string;
  whatsapp_no: string; // "hidden"
  about: string;
  years_in_business: number;
  export_markets: string[];
  languages: string[];
  image_path: string;
  onboarding_step: number;
  status: string;
  rejection_reason: string | null;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
  category: Category;
}

// Vendor Details (same as list item but maybe more)
export interface VendorDetails extends VendorListItem {
  // same fields
}

// Product image
export interface ProductImage {
  id: number;
  product_id: number;
  type: 'image' | 'video';
  path: string;
  thumbnail_path: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// Product video
export interface ProductVideo extends ProductImage {
  type: 'video';
}

// Product from list inside vendor products
export interface ProductListItem {
  id: number;
  vendor_id: number;
  category_id: number;
  title: string;
  short_description: string;
  description: string;
  location: string;
  currency: string;
  price: string;
  old_price: string | null;
  moq: number;
  is_deal: boolean;
  is_active: boolean;
  status: string;
  ideal_for: string[];
  tags: string | null;
  created_at: string;
  updated_at: string;
  cover_image: string;
  category: Category;
  images: ProductImage[];
  videos: ProductVideo[];
}

// Product details (extended)
export interface ProductDetails extends ProductListItem {
  vendor_image?: string; // from details endpoint
  images_list?: Array<{ id: number; url: string; sort_order: number }>;
  videos_list?: Array<{ id: number; url: string; sort_order: number }>;
  vendor?: {
    id: number;
    business_name: string;
    location: string;
    image_path: string;
    status: string;
  };
}

// Vendor products response
export interface VendorProductsResponse {
  vendor: {
    id: number;
    business_name: string;
    location: string;
    image: string;
  };
  products: {
    current_page: number;
    data: ProductListItem[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: any[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
  };
}

// Quote
export interface Quote {
  id: number
  user_id: number
  vendor_id: number
  product_id: number
  product_title: string
  quantity: number
  unit: string
  shipping_country: string
  shipping_city: string
  note: string
  quoted_price: string | null
  currency: string
  quoted_moq: number | null
  status: 'open' | 'quoted' | 'accepted'| 'confirmed' | 'cancelled'
  last_message_at: string
  created_at: string
  updated_at: string
  vendor: {
    id: number
    business_name: string
    location: string
    image_path: string
  }
  product: {
    id: number
    title: string
  }
}

// Paginated Quotes Response
export interface PaginatedQuotesResponse {
  current_page: number
  data: Quote[]
  first_page_url: string
  from: number
  last_page: number
  last_page_url: string
  links: any[]
  next_page_url: string | null
  path: string
  per_page: number
  prev_page_url: string | null
  to: number
  total: number
}

// Message
export interface Message {
  id: number
  quote_request_id: number
  sender_type: 'user' | 'vendor'
  sender_id: number
  message: string
  is_seen?: boolean
  created_at: string
  updated_at: string
    seen_by_user_at: string | null
  seen_by_vendor_at: string | null
  attachment_path: string | null
  attachment_type: string | null
}
// Send Message Response
export interface SendMessageResponse {
  quote_request_id: number
  sender_type: string
  sender_id: number
  message: string
  updated_at: string
  created_at: string
  id: number
}



// Subscription
export interface Subscription {
  id: number;
  user_id: number;
  plan_id: number;
  stripe_subscription_id?: string;
  status: 'active' | 'canceled' | 'past_due' | 'incomplete';
  current_period_start: string;
  current_period_end: string;
  created_at: string;
  updated_at: string;
  plan?: Plan;
}

// Payment status response
export interface PaymentStatus {
  session_id: string;
  status: 'complete' | 'open' | 'expired';
  customer_email?: string;
  subscription_id?: string;
}