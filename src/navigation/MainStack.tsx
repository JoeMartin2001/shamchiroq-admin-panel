import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";
import HomePage from "../pages/home";
import UsersPage from "../pages/users";
import { NoMatch } from "../components/shared/noMatch";
import ItemsPage from "../pages/items";
import ManageUser from "../pages/users/manage";
import ManageItem from "../pages/items/manage";

const MainStack = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="items" element={<ItemsPage />} />

        {/* Using path="*"" means "match anything", so this route
                  acts like a catch-all for URLs that we don't have explicit
                  routes for. */}
        <Route path="*" element={<NoMatch />} />
      </Route>

      <Route path="reports/:id" element={<HomePage />} />
      <Route path="users/:id" element={<ManageUser />} />
      <Route path="items/:id" element={<ManageItem />} />
    </Routes>
  );
};

export default MainStack;
