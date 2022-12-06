
export interface Reviews {
    reviews:            Review[];
    total:              number;
    possible_languages: string[];
}

export interface Review {
    id:           string;
    rating:       number;
    user:         User;
    text:         string;
    time_created: string;
    url:          string;
}

export interface User {
    id:          string;
    profile_url: string;
    image_url:   null | string;
    name:        string;

}

