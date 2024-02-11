import { Route, Routes } from "react-router-dom";
import { AppLayout } from "../components/layouts/AppLayout";
import HomePage from "../pages/home";
import UsersPage from "../pages/users";
import { NoMatch } from "../components/shared/noMatch";
import ItemsPage from "../pages/items";
import ManageUser from "../pages/users/manage";
import ManageItem from "../pages/items/manage";
import BlocksPage from "../pages/blocks";
import NotificationsPage from "../pages/notifications";
import { ManageBlock } from "../pages/blocks/manage";

const MainStack = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="users" element={<UsersPage />} />
        <Route path="items" element={<ItemsPage />} />
        <Route path="blocks" element={<BlocksPage />} />
        <Route path="notifications" element={<NotificationsPage />} />

        <Route path="*" element={<NoMatch />} />
      </Route>

      <Route path="reports/:id" element={<HomePage />} />
      <Route path="users/:id" element={<ManageUser />} />
      <Route path="items/:id" element={<ManageItem />} />
      <Route path="blocks/:id" element={<ManageBlock />} />
      <Route path="notifications/:id" element={<ManageItem />} />
    </Routes>
  );
};

export default MainStack;
