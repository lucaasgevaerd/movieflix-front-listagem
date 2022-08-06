import { AxiosRequestConfig } from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import MovieCard from "../../components/MovieCard";
import Pagination from "../../components/Pagination";
import GenreFilter from "../../components/GenreFilter";
import { Movie } from "../../types/vendor/movie";
import { SpringPage } from "../../types/vendor/springPage";
import { requestBackEnd } from "../../util/requests";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import Loader from "../../components/Loader";

import "./styles.css";

type ControlComponentsData = {
  activePage: number;
  activeGenreFilter: number;
};

const Movies = () => {
  const [page, setPage] = useState<SpringPage<Movie>>();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

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
    setSearchParamsInURL(pageNumber, controlComponentsData.activeGenreFilter);
  };

  const handleSubmitFilter = (value: number) => {
    setControlComponentsData({ activePage: 0, activeGenreFilter: value });
    setSearchParamsInURL(0, value);
  };

  const setSearchParamsInURL = (
    pageNumber: number,
    activeGenreFilter: number
  ) => {
      setSearchParams({
        genreId: String(activeGenreFilter),
        page: String(pageNumber),
        size: "4",
        sort: "title",
      });
  };
  
  const genreIdParam = Number(searchParams.get("genreId"));
  const pageParam = Number(searchParams.get("page"));
  /* const searchParamsObject = Object.fromEntries(new URLSearchParams(searchParams)) */

  useEffect(() => {
    if (pageParam !== null && genreIdParam !== null) {
      setControlComponentsData({
        activePage: pageParam,
        activeGenreFilter: genreIdParam
      })
    }
  }, [genreIdParam, pageParam])

  const getMovies = useCallback(() => {
    const config: AxiosRequestConfig = {
      url: `/movies`,
      withCredentials: true,
      params: {
        size: 4,
        sort: "title",
        page: pageParam,
        genreId: genreIdParam,
      },
    };
    requestBackEnd(config).then((response) => {
      setPage(response.data);
    });
    if (location.search === "") {
      setSearchParams({
        genreId: String(controlComponentsData.activeGenreFilter),
        page: String(controlComponentsData.activePage),
        size: "4",
        sort: "title",
      });
    }
  }, [
    controlComponentsData.activeGenreFilter,
    controlComponentsData.activePage,
    genreIdParam,
    location.search,
    pageParam,
    setSearchParams,
  ]);

  useEffect(() => {
    getMovies();
  }, [genreIdParam, getMovies, pageParam]);

  useEffect(() => {
    if (page && page.content.length > 0) {
      window.sessionStorage.setItem(
        "genreId",
        `${searchParams.get("genreId")}`
      );
      window.sessionStorage.setItem("page", `${searchParams.get("page")}`);
    }
    if (page && page.content.length === 0) {
      navigate(
        `/movies?genreId=${window.sessionStorage.getItem(
          "genreId"
        )}&page=${window.sessionStorage.getItem("page")}&size=4&sort=title`,
        { replace: true }
      );
    }
  }, [controlComponentsData, navigate, page, searchParams]);

  return (
    <>
      <main className="movie-links-main-container">
        <section>
          <GenreFilter
            onSubmitFilter={handleSubmitFilter}
            searchParameterGenrer={searchParams.get("genreId")}
          />
        </section>
        {page !== undefined ? (
          <>
            <section>
              <div className="movie-cards-container">
                {page?.content.map((movie) => (
                  <Link to={`/movies/${movie.id}`} key={movie.id}>
                    <MovieCard
                      id={movie.id}
                      imgUrl={movie.imgUrl}
                      title={movie.title}
                      year={movie.year}
                      subTitle={movie.subTitle}
                      key={movie.id}
                    />
                  </Link>
                ))}
              </div>
            </section>
            <section>
              {page !== undefined && (
                <Pagination
                  forcePage={page.number}
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
