// Login payload modal
export interface LoginPayload {
    username: string,
    password: string
}

// Product modals
export interface Product {
    id?: number;
    title?: string;
    price?: number;
    description?: string;
    category?: string;
    image?: string;
    rating?: Rating;
    cartCount?:number
}
export interface Cart {
    id?: number;
    title?: string;
    price?: number ;
    description?: string;
    category?: string;
    image?: string;
    rating?: Rating;
    cartCount:number
}


export interface Rating {
    rate: number;
    count: number;
}

export interface InitialState{
    loading:boolean,
    products:Product[],
    cart:Cart[]
}

export interface ICARTBILL{
    qty:number,
    total:number
}

export interface TOKEN{
    token:null | string
}

export interface ProductList{
    products:Product[]
}

export interface CartPayload{
    userId: number,
    date: string,
    products: CartProduct[]
  
}

export interface CartProduct{
    productId: number | undefined,
    quantity: number
  }