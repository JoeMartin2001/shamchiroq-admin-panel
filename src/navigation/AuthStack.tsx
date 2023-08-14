import { Route, Routes } from "react-router-dom";
import { NoMatch } from "../components/shared/noMatch";
import LoginPage from "../pages/login";

const AuthStack = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<LoginPage />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default AuthStack;
