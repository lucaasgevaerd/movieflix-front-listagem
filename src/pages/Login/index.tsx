import { ReactComponent as MainImage } from "../../assets/images/main-image.svg";
import LoginCard from "../../components/LoginCard";

import "./styles.css";

const Login = () => {
  return (
    <>
      <main className="main-container">
        <section>
          <div className="advertising-container">
            <h2>Avalie Filmes</h2>
            <p>Diga o que você achou do seu filme favorito</p>
            <MainImage className="main-image" />
          </div>
        </section>
        <LoginCard />
      </main>
    </>
  );
};

export default Login;
