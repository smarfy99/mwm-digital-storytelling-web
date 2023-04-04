import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-transparent fixed top-0 left-0 right-0 z-50">
      <Link to="/" className="text-gray-500 left-10 hover:cursor-pointer">MWM</Link>
    </nav>
  );
};

export default NavBar;
