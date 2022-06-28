import { ReactComponent as Star } from "../../assets/images/star.svg";
import './styles.css';

const ReviewsCard = () => {
    return (
        <section className="reviews-card-container">
          <div className="review-card">
            <div className="member-name">
              <Star />
              <h3>Maria Silva</h3>
            </div>
            <div className="review-comment">
              <p>
                Gostei muito do filme. Foi muito bom mesmo. Pena que durou
                pouco.
              </p>
            </div>
            <div className="member-name">
              <Star />
              <h3>Maria Silva</h3>
            </div>
            <div className="review-comment">
              <p>
                Gostei muito do filme. Foi muito bom mesmo. Pena que durou
                pouco.
              </p>
            </div>
            <div className="member-name">
              <Star />
              <h3>Maria Silva</h3>
            </div>
            <div className="review-comment">
              <p>
                Gostei muito do filme. Foi muito bom mesmo. Pena que durou
                pouco.
              </p>
            </div>
            <div className="member-name">
              <Star />
              <h3>Maria Silva</h3>
            </div>
            <div className="review-comment">
              <p>
                Gostei muito do filme. Foi muito bom mesmo. Pena que durou
                pouco.
              </p>
            </div>
            <div className="member-name">
              <Star />
              <h3>Maria Silva</h3>
            </div>
            <div className="review-comment">
              <p>
                Gostei muito do filme. Foi muito bom mesmo. Pena que durou
                pouco.
              </p>
            </div>
          </div>
        </section>
    );
}

export default ReviewsCard;