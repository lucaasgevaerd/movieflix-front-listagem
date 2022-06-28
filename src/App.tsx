import AppRouter from "./AppRouter";
import { useState } from "react";
import { AuthContext, AuthContextData } from "./AuthContext";

import "./App.css";

function App() {
  const [authContextData, setAuthContextData] = useState<AuthContextData>({
    authenticated: false,
  });

  return (
    <>
      <AuthContext.Provider value={{ authContextData, setAuthContextData }}>
        <AppRouter />
      </AuthContext.Provider>
    </>
  );
}

export default App;
