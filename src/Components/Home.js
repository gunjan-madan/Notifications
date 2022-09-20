import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    document.title = "eZRX";
  });

  return (
    <div>
      <h2 className="label-place-order">Welcome to eZRX</h2>
    </div>
  );
};

export default Home;
