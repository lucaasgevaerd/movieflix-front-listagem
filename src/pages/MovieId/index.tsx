import ReviewForm from "../../components/ReviewForm";
import ReviewsCard from "../../components/ReviewsCard";
import { hasAnyRoles } from "../../util/requests";

import "./styles.css";

type Props = {
  id: number;
};

const MovieId = ({ id }: Props) => {
  return (
    <>
      <main className="movie-details-container">
        <h2>Tela detalhes do filme id: {id}</h2>
        {hasAnyRoles(["ROLE_MEMBER"]) &&<ReviewForm />}
        <ReviewsCard />
      </main>
    </>
  );
};

export default MovieId;