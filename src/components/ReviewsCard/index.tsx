import { ReactComponent as Star } from "../../assets/images/star.svg";
import './styles.css';

type Props = {
  id: number;
  text: string;
  movieId: number;
  user: {
    id: number;
    email: string;
    name: string;
  }
}

const ReviewsCard = ( {id, text, movieId, user} : Props) => {
    return (
        <section className="reviews-card-container">
          <div className="review-card">
            <div className="member-name">
              <Star />
              <h3>{user.name}</h3>
            </div>
            <div className="review-comment">
              <p>
                {text}
              </p>
            </div>
          </div>
        </section>
    );
}

export default ReviewsCard;