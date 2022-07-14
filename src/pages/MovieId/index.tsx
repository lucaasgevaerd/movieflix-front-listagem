import { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../../components/ReviewForm";
import ReviewsCard from "../../components/ReviewsCard";
import { Movie } from "../../types/vendor/movie";
import { SpringPage } from "../../types/vendor/springPage";
import { hasAnyRoles, requestBackEnd } from "../../util/requests";

import "./styles.css";

const MovieId = () => {
  const [id, setId] = useState();
  const [imgUrl, setimgUrl] = useState();
  const [title, setTitle] = useState();
  const [year, setYear] = useState();
  const [subTitle, setSubTitle] = useState();

  const parameter = useParams();
  const parameterId = Number(parameter.id);

  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: `/movies/${parameterId}`,
      withCredentials: true,
      params: {
        page: 0,
        size: 1,
      },
    };

    requestBackEnd(params).then((response) => {
      setId(response.data.id);
      setimgUrl(response.data.imgUrl);
      setTitle(response.data.title);
      setYear(response.data.year);
      setSubTitle(response.data.subTitle);
    });
  });

  return (
    <>
      {id && (
        <>
        <main className="">
          <section className="">
            <img src={imgUrl} alt={title} className=""/>
            <p className="">{title}</p>
            <p className="">{year}</p>
            <span className="">{subTitle}</span>
          </section>
          <section>
            {hasAnyRoles(["ROLE_MEMBER"]) && <ReviewForm />}
          </section>
          <section>
            <ReviewsCard />
          </section>
          </main>
        </>
      )}
    </>
  );
};

export default MovieId;
