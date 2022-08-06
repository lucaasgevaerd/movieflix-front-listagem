import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

import "./styles.css";

type Props = {
  id: number;
  imgUrl: string;
  title: string;
  year: number;
  subTitle: string;
};

function MovieCard({ id, imgUrl, title, year, subTitle }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
      <div className="movie-card-container">
        {loaded ? null : (
          <div className="loading-movie-card-container">
            <img
              src={require("../../assets/images/default-image.png")}
              alt="carregando imagem"
              className="loading-movie-card-image"
            />
            <div className="loading-movie-card-loader">
              <Loader />
            </div>
          </div>
        )}
        <img
          style={loaded ? {} : { display: "none" }}
          onLoad={() => setLoaded(true)}
          src={imgUrl}
          alt={title}
          className="movie-card-image"
        />
        <p className="movie-card-title">{title}</p>
        <p className="movie-card-year">{year}</p>
        <span className="movie-card-subtitle">{subTitle}</span>
      </div>
  );
}

export default MovieCard;
