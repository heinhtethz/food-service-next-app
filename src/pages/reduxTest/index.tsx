import { decrement, increment, selectCount } from "@/store/slices/counterSlice";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  console.log(count);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        width: 200,
        margin: "0 auto",
        mt: 5,
      }}
    >
      <Typography
        variant="h3"
        sx={{ display: "flex", justifyContent: "center" }}
      >
        {count}
      </Typography>
      <Box
        sx={{ display: "flex", justifyContent: "center", columnGap: 5, mt: 3 }}
      >
        <Button variant="contained" onClick={() => dispatch(increment())}>
          +
        </Button>
        <Button variant="contained" onClick={() => dispatch(decrement())}>
          -
        </Button>
      </Box>
    </Box>
  );
};

export default ReduxConcepts;
