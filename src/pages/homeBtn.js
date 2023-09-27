import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineHome } from 'react-icons/ai';

const HomeBtn = () => {
  return (
    <nav className="homeBtn">
      <div className="logo">
        <Link to="/" className="home-link">
          <AiOutlineHome size={35} />
        </Link>
      </div>
    </nav>
  );
};

export default HomeBtn;
