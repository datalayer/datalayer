import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { authContext } from "../auth/AuthContext";
import { User } from "../model/AuthModel"
import { DlaHeader1 } from "dspWidgets/Landing"

const Header = () => {
  const { user } = useContext(authContext);
  return <DlaHeader1 user={user} />
}

/*
 * Simple text header.
 */
export const TextHeader = (props: { user: User | null, title: string }) => {
  return (
    <>
      <Link to="/" style={{ fontWeight: "bold" }}>{props.title}</Link>
      {" | "}
      <Link to="/tell">Tell</Link>
      {" | "}
      <Link to="/about">About</Link>
      {" | "}
      <Link to="/contact">Contact</Link>
      {" | "}
      {props.user ? (
        <>
          <Link to="/profile">Profile</Link>
          {" | "}
          <Link to="/logout">Logout</Link>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          {" | "}
          <Link to="/join">Join</Link>
        </>
      )}
    </>
  );
}

export default Header;
