import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return (
    <nav
      className={`w-full h-14 fixed z-10 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="flex justify-center">
        <Link to={"/"}>
          <img src={logo} alt="logo" className="h-10 my-2" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
