import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import GenreFilter from "../../components/GenreFilter";
import { Movie } from "../../types/vendor/movie";
import { SpringPage } from "../../types/vendor/springPage";
import { requestBackEnd } from "../../util/requests";
import Loader from "../../components/Loader";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  activeGenreFilter: number;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [isLoading, setIsLoading] = useState(false);
  const [controlComponentsData, setControlComponentsData] =
    useState<ControlComponentsData>({
      activePage: 0,
      activeGenreFilter: 0,
    });

  const handlePageChange = (pageNumber: number) => {
    setControlComponentsData({
      activePage: pageNumber,
      activeGenreFilter: controlComponentsData.activeGenreFilter,
    });
  };

  const handleSubmitFilter = (value: number) => {
    setControlComponentsData({ activePage: 0, activeGenreFilter: value });
  };

  const getMovies = useCallback(() => {
    const params: AxiosRequestConfig = {
      url: "/movies",
      withCredentials: true,
      params: {
        page: controlComponentsData.activePage,
        size: 4,
        genreId: controlComponentsData.activeGenreFilter,
      },
    };

    requestBackEnd(params).then((response) => {
      setPage(response.data);
    });
  }, [controlComponentsData]);

  useEffect(() => {
    getMovies();
  }, [getMovies]);

  return (
    <>
      <main className="movie-links-main-container">
        <section>
          <GenreFilter onSubmitFilter={handleSubmitFilter} />
        </section>
                {page !== undefined ? (
        <>
          <section>
            <div className="movie-cards-container">
              {page?.content.map((movie) => (
                <MovieCard
                  id={movie.id}
                  imgUrl={movie.imgUrl}
                  title={movie.title}
                  year={movie.year}
                  subTitle={movie.subTitle}
                  key={movie.id}
                />
              ))}
            </div>
          </section>
          <section>
            {page !== undefined && (
              <Pagination
                forcePage={page?.number}
                pageCount={page.totalPages}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              />
            )}
          </section>
        </>
        ) : (
          <Loader />
        )}
      </main>
    </>
  );
};

export default Movies;
