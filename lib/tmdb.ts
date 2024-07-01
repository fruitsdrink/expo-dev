export interface MovieListResponse {
  page: number;
  results: MovieItem[];
  total_pages: number;
  total_results: number;
}

export interface MovieItem {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MovieDetail {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

interface Genre {
  id: number;
  name: string;
}

const API_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN;
const API_ACCESS_ID = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_ID;

const headers = {
  accept: "application/json",
  Authorization: `Bearer ${API_ACCESS_TOKEN}`
};

export const fetchTopRatedMovies = async (
  page: number = 1
): Promise<MovieListResponse> => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=zh-CN&page=${page}`;
  const options = {
    method: "GET",
    headers
  };
  // console.log("🌹 调用了tmdb接口", new Date().getTime());
  const res = await fetch(url, options);
  // console.log("res ok: ", res.ok);
  if (!res.ok) {
    throw new Error("Failed to fetch top rated movies.");
  }
  const json = await res.json();
  // console.log(JSON.stringify(json, null, 2));
  return json as MovieListResponse;
};

export const fetchMovieDetail = async (id: string) => {
  const url = `https://api.themoviedb.org/3/movie/${id}?language=zh-CN`;
  const options = {
    method: "GET",
    headers
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch movie detail");
  }
  const json = await res.json();

  return json as MovieDetail;
};

export const getImage = (path: string, size: "w500" = "w500") => {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
};

interface AddMovieToWatchListResponse {
  success: boolean;
  status_code: number;
  status_message: string;
}

export const addMovieToWatchList = async (movieId: string) => {
  const url = `https://api.themoviedb.org/3/account/${API_ACCESS_ID}/watchlist`;
  const options = {
    method: "POST",
    headers: {
      ...headers,
      "content-type": "application/json"
    },
    body: JSON.stringify({
      media_type: "movie",
      media_id: movieId,
      watchlist: true
    })
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to add movie to watchlist");
  }
  const json = await res.json();
  return json as AddMovieToWatchListResponse;
};

export const fetchWatchListMovies = async (page: number = 1) => {
  const url = `https://api.themoviedb.org/3/account/${API_ACCESS_ID}/watchlist/movies?language=zh-CN&page=1&sort_by=created_at.asc`;
  const options = {
    method: "GET",
    headers
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error("Failed to fetch watchlist movies");
  }

  const json = await res.json();
  return json as MovieListResponse;
};
