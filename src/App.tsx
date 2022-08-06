import "react-toastify/dist/ReactToastify.css";
import AppRouter from "./AppRouter";
import { useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";
import { ToastContainer } from "react-toastify";
import { BrowserRouter } from "react-router-dom";

import "./App.css";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
          <AppRouter />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
          />
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
