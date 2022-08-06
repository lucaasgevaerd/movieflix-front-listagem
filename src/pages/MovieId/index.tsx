import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MovieIdCard from "../../components/MovieIdCard";
import ReviewForm from "../../components/ReviewForm";
import ReviewsCard from "../../components/ReviewsCard";
import { MovieIdContent } from "../../types/vendor/movieIdContent";
import { Review } from "../../types/vendor/review";
import { hasAnyRoles, requestBackEnd } from "../../util/requests";

import "./styles.css";

const MovieId = () => {

  const [movieIdContent, setMovieIdContent] = useState<MovieIdContent>();
  const [reviews, setReviews] = useState<Review[]>([]);

  const movie = useParams();
  const movieId = Number(movie.id);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}`,
      withCredentials: true,
    };

    requestBackEnd(params).then((response) => {
      setMovieIdContent(response.data);
    });
  }, [movieId]);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${movieId}/reviews`,
      withCredentials: true,
    };

    requestBackEnd(params).then((response) => {
      setReviews(response.data)
    });
  }, [movieId]);

  const handleInsertReview = (review: Review) => {
    const clone = [...reviews];
    clone.push(review);
    setReviews(clone);
  }

  return (
    <>
      {movieIdContent?.id && (
        <>
          <main className="movie-id-main-container">
            <MovieIdCard
              imgUrl={movieIdContent?.imgUrl}
              title={movieIdContent?.title}
              year={movieIdContent?.year}
              subTitle={movieIdContent?.subTitle}
              synopsis={movieIdContent?.synopsis}
            />

            {hasAnyRoles(["ROLE_MEMBER"]) && <ReviewForm movieId={movieId} onInsertReview={handleInsertReview}/>}

            {reviews.length !== 0 && (
              <section className="movie-reviews-card-container">
                {reviews.map((rev: Review) => (
                  <ReviewsCard
                    id={rev.id}
                    movieId={rev.movieId}
                    text={rev.text}
                    user={rev.user}
                    key={rev.id}
                  />
                ))}
              </section>
            )}
          </main>
        </>
      )}
    </>
  );
};

export default MovieId;
