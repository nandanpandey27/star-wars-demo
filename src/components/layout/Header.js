import React, { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUser } from "./../../redux/actions";

const Header = React.memo(() => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = useCallback(() => {
    dispatch(logoutUser());
    history.push("/login");
  }, [logoutUser]);

  const site = useMemo(
    () =>
      `Star Wars Demo${user && user.user ? " ( " + user.user.name + " )" : ""}`,
    [user]
  );

  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light menu">
        <div className="navbar-nav col-md-11">
          <a className="nav-item nav-link active " href={"/"}>
            {site}
            <span className="sr-only">(current)</span>
          </a>
        </div>
        {user.isLoggedIn ? (
          <button className="btn btn-success col-md-1" onClick={logout}>
            Logout
          </button>
        ) : (
          ""
        )}
      </nav>
    </div>
  );
});

export default Header;
