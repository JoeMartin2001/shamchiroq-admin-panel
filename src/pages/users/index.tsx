import React, { useCallback, useEffect, useState } from "react";
import { useAxios } from "../../hooks/useAxios";
import { BASE_URL_API } from "../../utils/api";
import { User } from "../../model";
import { UserCard } from "../../components/users/UserCard";
import { Box, Grid, Pagination } from "@mui/material";

const limit = 30;

const UsersPage = () => {
  const axios = useAxios();

  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);

  const getAllUsers = useCallback(async () => {
    try {
      const users = await axios.get(
        `${BASE_URL_API}/user/getUsers?page=${page}&limit=${limit}`
      );

      const newUsers = users.data as User[];

      console.log(newUsers);

      setAllUsers(newUsers);
    } catch (error) {
      console.log(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div>
      <Box marginBottom={5}>
        <Grid container spacing={2} marginBottom={5}>
          {allUsers.map((user, idx) => (
            <Grid item xs={4} key={idx + user.id!}>
              <UserCard user={user} key={idx + user.id} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Pagination
        onChange={(_, nextPage) => setPage(nextPage)}
        count={10}
        variant="outlined"
      />
    </div>
  );
};

export default UsersPage;
