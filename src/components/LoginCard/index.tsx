import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import {
  getTokenData,
  requestBackEndLogin,
  saveAuthData,
} from "../../util/requests";
import { toast } from "react-toastify";
import Loader from "../Loader";
import "./styles.css";

type FormData = {
  username: string;
  password: string;
};

const LoginCard = () => {
  const [hasError, setHasError] = useState(false);

  const { setAuthContextData } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = (formData: FormData) => {
    setIsLoading(true);
    requestBackEndLogin(formData)
      .then((response) => {
        saveAuthData(response.data);
        setHasError(false);
        setAuthContextData({ authenticated: true, tokenData: getTokenData() });
        setIsLoading(false);
        navigate("/movies");
        toast.success("Login efetuado com Sucesso!");
      })
      .catch((error) => {
        setHasError(true);
        console.log(error);
        setIsLoading(false);
        toast.error("Problemas ao efetuar login.");
      });
  };

  return (
    <section>
      <div className="login-card-container">
        <h2>LOGIN</h2>
        {hasError && <div className="error-alert">Erro ao efetuar o login</div>}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form-container"
        >
          <input
            {...register("username", {
              required: "Campo obrigatório",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Email inválido",
              },
            })}
            type="text"
            placeholder="Email"
            name="username"
            className={`${
              errors.username ? "error-input-field second-edge" : "input-field"
            }`}
          />
          <div className="required-field">{errors.username?.message}</div>
          <input
            {...register("password", {
              required: "Campo obrigatório",
            })}
            type="password"
            placeholder="Senha"
            name="password"
            className={`${
              errors.password ? "error-input-field" : "input-field"
            }`}
          />
          <div className="required-field">{errors.password?.message}</div>
          {isLoading && <Loader />}
          <button type="submit" className="button-submit">
            FAZER LOGIN
          </button>
        </form>
      </div>
    </section>
  );
};

export default LoginCard;
