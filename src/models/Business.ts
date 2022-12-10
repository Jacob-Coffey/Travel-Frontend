

export interface Businesses {
    businesses: Business[],
}

export interface Business {
    _id?: string;
    rating: number;
    price: string;
    phone: string;
    id: string;
    alias: string;
    is_closed: boolean;
    review_count: number;
    name: string;
    url: string;
    img_url: string;
    location: string;
    distance: number;
    categories: string;
}