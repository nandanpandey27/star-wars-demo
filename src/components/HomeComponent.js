import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Search from "./SearchComponent";

const Home = React.memo(() => {
  const user = useSelector((state) => state.user);

  if (!user.isLoggedIn) {
    return <Redirect to="/login" />;
  }
  return <Search />;
});

export default Home;
