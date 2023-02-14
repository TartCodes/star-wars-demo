import React from "react";
import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	const fetchMoviesHandler = async () => {
		setIsLoading(true);
		const res = await fetch("https://swapi.py4e.com/api/films/");
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
		setIsLoading(false);
	};

	return (
		<React.Fragment>
			<section>
				<button onClick={fetchMoviesHandler}>Fetch Movies</button>
			</section>
			<section>
				{!isLoading && <MoviesList movies={movies} />}
				{isLoading && <p>Loading...</p>}
			</section>
		</React.Fragment>
	);
}

export default App;
