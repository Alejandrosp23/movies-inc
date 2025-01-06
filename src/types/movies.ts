interface Genre {
    id: number;
    name: string;
}

interface Movie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
    poster_path: string;
    overview: string;
    genres: Genre[];
    cast: CastMember[];
}

interface CastMember {
    id: number;
    name: string;
    profile_path: string;
    character: string;
    order: number;
}



export { Movie, Genre, CastMember };