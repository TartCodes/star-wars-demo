import React from "react";
import { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
	const [movies, setMovies] = useState([]);
	const fetchMoviesHandlder = () => {
		fetch("https://swapi.py4e.com/api/films/")
			.then((res) => res.json())
			.then((data) => setMovies(data.results));
	};

	return (
		<React.Fragment>
			<section>
				<button>Fetch Movies</button>
			</section>
			<section>
				<MoviesList movies={movies} />
			</section>
		</React.Fragment>
	);
}

export default App;
