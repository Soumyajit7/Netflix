export const API_KEY = process.env.REACT_APP_tmdb_API_KEY;
export const TMDB_BASE_URL = "https://api.themoviedb.org/3"


// const response = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/videos?api_key=${API_KEY}`);
// const data = await response.json();

// const trailer = data.results.find(video => video.type === 'Trailer' && video.site === 'YouTube');
// const trailerUrl = `https://www.youtube.com/watch?v=${trailer.key}`;


// export const getTrailerUrl = async (movieId) => {
//     const trailerKey = (await (await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`)).json()).results.find(video => video.type === 'Trailer' && video.site === 'YouTube')?.key;
//     return `https://www.youtube.com/watch?v=${trailerKey}`;
// }
