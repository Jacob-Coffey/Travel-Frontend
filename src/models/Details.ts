export interface BusinessInfo {
    id?:          string;
    alias:         string;
    name:          string;
    image_url:     string;
    is_claimed:    boolean;
    is_closed:     boolean;
    url:           string;
    phone:         string;
    display_phone: string;
    review_count:  number;
    categories:    Category[];
    rating:        number;
    location:      Location;
    coordinates:   Coordinates;
    photos:        string[];
    price:         string;
    hours:         Hour[];
    transactions:  any[];
    special_hours: SpecialHour[];
}

export interface Category {
    alias: string;
    title: string;
}

export interface Coordinates {
    latitude:  number;
    longitude: number;
}

export interface Hour {
    open:        Open[];
    hours_type:  string;
    is_open_now: boolean;
}

export interface Open {
    is_overnight: boolean;
    start:        string;
    end:          string;
    day:          number;
}

export interface Location {
    address1:        string;
    address2:        string;
    address3:        string;
    city:            string;
    zip_code:        string;
    country:         string;
    state:           string;
    display_address: string[];
    cross_streets:   string;
}

export interface SpecialHour {
    date:         string;
    is_closed:    null;
    start:        string;
    end:          string;
    is_overnight: boolean;
}
