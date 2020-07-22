export interface Genre {
    id?: number;
    genre: string;
}

interface Country {
    id?: number;
    country: string;
}

export interface Film {
    filmId: number;
    nameRu: string;
    nameEn: string;
    year: string;
    filmLength: string;
    genres: Genre[];
    countries: Country[];
    rating: string;
    ratingVoteCount: number;
    posterUrl: string;
    ratingChange: number;
    slogan?: string;
    description?: string;
}
