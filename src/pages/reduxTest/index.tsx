import { decrement, increment, selectCount } from "@/store/slices/counterSlice";
import { Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store";

const ReduxConcepts = () => {
  const count = useAppSelector((state) => state.counter.value);
  console.log(count);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>{count}</h1>
      <Button variant="contained" onClick={() => dispatch(increment())}>
        +
      </Button>
      <Button variant="contained" onClick={() => dispatch(decrement())}>
        -
      </Button>
    </div>
  );
};

export default ReduxConcepts;
