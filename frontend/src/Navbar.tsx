import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import  emblem from "./images/logo/emblem.png";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <div className="navbarContainer">
      <Link className="backRouteButton" to="/">
        <img src={emblem} alt="logo" width="150" height="150"></img>
      </Link>
      <DropdownMenu></DropdownMenu>
    </div>
  );
};

export default Navbar;
