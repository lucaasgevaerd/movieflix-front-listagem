import { AxiosRequestConfig } from "axios";
import { useForm } from "react-hook-form";
import { Review } from "../../types/vendor/review";
import { requestBackEnd } from "../../util/requests";
import { toast } from "react-toastify";
import "./styles.css";

type FormData = {
  movieId: number;
  text: string;
}

type Props = {
  movieId: number;
  onInsertReview: (review: Review) => void;
}

const ReviewForm = ( { movieId, onInsertReview } : Props ) => {

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  
  const onSubmit = (formData : FormData) => {
    const data = {
      text: formData.text,
      movieId: movieId,
    };

    const params: AxiosRequestConfig = {
      method: "POST",
      url: `/reviews`,
      data: data,
      withCredentials: true,
    };

    requestBackEnd(params).then((response) => {
      setValue('text', '');
      onInsertReview(response.data);
      toast.info('Avaliação cadastrada com sucesso!');
    }).catch(() => {
      toast.error('Erro ao cadastrar avaliação!');
    })

  };

  return (
    <section className="review-form-card">
      <form onSubmit={handleSubmit(onSubmit)} className="review-form">
        <input
          {...register("text", {
            required: "Campo obrigatório",
          })}
          type="text"
          placeholder="Deixe sua avaliação aqui"
          name="text"
          className={`${
            errors.text ? "error-review-input-field" : "review-input-field"
          }`}
        />
        <div className="required-field">{errors.text?.message}</div>
        <button type="submit" className="review-button-submit">
          SALVAR AVALIAÇÃO
        </button>
      </form>
    </section>
  )};

export default ReviewForm;
