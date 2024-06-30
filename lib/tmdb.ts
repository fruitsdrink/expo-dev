export interface TopRatedMovies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export interface Movie {
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

const API_ACCESS_TOKEN = process.env.EXPO_PUBLIC_TMDB_API_ACCESS_TOKEN;

export const fetchTopRatedMovies = async (
  page: number = 1
): Promise<TopRatedMovies> => {
  const url = `https://api.themoviedb.org/3/movie/top_rated?language=zh-CN&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${API_ACCESS_TOKEN}`
    }
  };
  const res = await fetch(url, options);
  // console.log("res ok: ", res.ok);
  if (!res.ok) {
    throw new Error("Failed to fetch top rated movies.");
  }
  const json = await res.json();
  // console.log(JSON.stringify(json, null, 2));
  return json as TopRatedMovies;
};
