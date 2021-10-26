export interface ObjectType {
  [key: string]: any;
}

export interface AuthReducer {
  token: string | null;
  user_id: number | null;
  first_name: string | null;
  last_name: string | null;
  full_name: string | null;
  email: string;
  phone_number: string;
  is_store_owner: boolean;
  is_admin: boolean;
  username: string;
  address: {
    house_no: string;
    street: string;
    city: string;
    pincode: string;
  };
  isLoading: boolean;
}

interface CartItem {
  product_id: number;
  quantity: number;
}

export interface CartReducer {
  id: number | null;
  hash: string | null;
  total_amount: number;
  cart_item_ids: number[] | null;
  cart_items: CartItem[];
  cart_count: number;
}

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  is_available: boolean;
  description: string;
  category: string;
  added_by: number;
}

export interface ProductReducer {
  products: Product[];
  product_categories: string[];
}

export interface OrderReducer {
  orderList: ObjectType[];
  orderItem: ObjectType;
}

export interface RootState {
  router: ObjectType;
  auth: AuthReducer;
  cart: CartReducer;
  product: ProductReducer;
  order: OrderReducer;
}
