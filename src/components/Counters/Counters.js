import React, { useContext } from "react";
import Counter from "./Counter";
import { Context } from "./../../Context";

const Counters = (props) => {
  const {
    data: { confirmed, recovered, deaths },
  } = useContext(Context);

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        marginTop: 50,
      }}
    >
      <Counter count={confirmed.value} type="confirmed" />
      <Counter count={recovered.value} type="recovered" />
      <Counter count={deaths.value} type="deaths" />
    </div>
  );
};

export default Counters;
