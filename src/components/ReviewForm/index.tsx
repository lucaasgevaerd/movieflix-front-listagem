import { useForm } from "react-hook-form";
import "./styles.css";

type ReviewFormData = {
  review: string;
};

const ReviewForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>();

  const onSubmit = (review: ReviewFormData) => {};

  return (
    <section className="review-form-card">
      <form onSubmit={handleSubmit(onSubmit)} className="review-form">
        <input
          {...register("review", {
            required: "Campo obrigatório",
          })}
          type="text"
          placeholder="Deixe sua avaliação aqui"
          name="review"
          className={`${errors.review ? 'error-review-input-field' : 'review-input-field'}`}
        />
        <div className="required-field">{errors.review?.message}</div>
        <button type="submit" className="review-button-submit">
          SALVAR AVALIAÇÃO
        </button>
      </form>
    </section>
  );
};

export default ReviewForm;
