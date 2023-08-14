import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";
import HomePage from "../pages/home";
import UsersPage from "../pages/users";
import { NoMatch } from "../components/shared/noMatch";

const MainStack = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />

        {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
};

export default MainStack;
