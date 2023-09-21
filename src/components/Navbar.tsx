import logo from "../assets/img/logo.svg";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white h-14 fixed z-10 shadow-md">
      <div className="flex justify-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-10 my-2" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
