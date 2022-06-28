import { Link } from "react-router-dom";

import "./styles.css";

const Movies = () => {
  return (
    <>
      <main className="movie-links-main-container">
        <section>
          <h2>Tela listagem de filmes</h2>
          <p className="movie-links">
            <Link to="/movies/1">
              Acessar /movies/1
            </Link>
          </p>
          <p className="movie-links">
            <Link to="/movies/2">
              Acessar /movies/2
            </Link>
          </p>
        </section>
      </main>
    </>
  );
};

export default Movies;
