import { Login } from "@mui/icons-material";
import { Route, Routes } from "react-router-dom";
import { NoMatch } from "../components/shared/noMatch";

const AuthStack = () => {
  return (
    <Routes>
      <Route path="/">
        <Route index element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default AuthStack;
