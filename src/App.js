import React from "react";
import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchMoviesHandler = async () => {
		setIsLoading(true);
		setError(null);
		try {
			const res = await fetch("https://swapi.py4e.com/api/film/");
			if (!res.ok) {
				throw new Error("Something went wrong...");
			}
			const data = await res.json();
			const transformedMovies = data.results.map((movieData) => {
				return {
					id: movieData.episode_id,
					title: movieData.title,
					openingText: movieData.opening_crawl,
					releaseData: movieData.release_date
				};
			});
			setMovies(transformedMovies);
		} catch (error) {
			setError(error.message);
		}
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
				{!isLoading && movies.length === 0 && <p>Found No Movies</p>}
				{isLoading && <p>Loading...</p>}
				{!isLoading && error && <p>{error}</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
