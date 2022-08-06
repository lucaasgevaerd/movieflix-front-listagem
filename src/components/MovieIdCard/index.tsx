import "./styles.css";

type Props = {
  imgUrl?: string;
  title?: string;
  year?: number;
  subTitle?: string;
  synopsis?: string;
};

const MovieIdCard = ({ imgUrl, title, year, subTitle, synopsis }: Props ) => {
  return (
    <>
      <section className="movie-id-container">
        <div className="movie-id-card-container">
          <div className="movie-id-card-image-container">
            <img src={imgUrl} alt={title} className="movie-id-card-image" />
          </div>
          <div className="movie-id-card-content-container">
            <p className="movie-id-card-title">{title}</p>
            <p className="movie-id-card-year">{year}</p>
            <p className="movie-id-card-subtitle">{subTitle}</p>
            <div className="movie-id-card-rectangle-synopsis">
              <p className="movie-id-card-synopsis">{synopsis}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MovieIdCard;
