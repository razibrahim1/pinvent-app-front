import React from "react";
import { RiProductHuntLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./Home.scss";
import heroImg from "../../assets/inv-img.png";
import { ShowOnLogin, ShowOnLogout } from "../../components/protect/HiddenLink";

const Home = () => {
  return (
    <div className="home">
      <nav className="container --flex-between">
        <div className="logo">
          <RiProductHuntLine size={35} />
        </div>

        <ul className="home-links">
          <ShowOnLogout>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogout>
            <li>
              <Link to="/login">
                <button className="--btn --btn-primary">Login</button>
              </Link>
            </li>
          </ShowOnLogout>
          <ShowOnLogin>
            <li>
              <Link to="/dashboard">
                <button className="--btn --btn-primary">Dashboard</button>
              </Link>
            </li>
          </ShowOnLogin>
        </ul>
      </nav>
      {/* HERO SECTION */}
      <Hero />
    </div>
  );
};

const Hero = () => {
  return (
    <section className="container hero">
      <div className="hero-text">
        <h1>Inventory & Stock Management Solution</h1>
        <p>
          Inventory system to control and manage products in the warehouse in
          real-time and integrated to make it easier to develop your business.
        </p>
        <div className="hero-buttons">
          <Link to="/dashboard">
            <button className="--btn --btn-primary">Free Trial 1 Month</button>
          </Link>
        </div>
        <div className="--flex-start">
          <NumberText num="14K" text="Brand Owners" />
          <NumberText num="23K" text="Active Users" />
          <NumberText num="500+" text="Partners" />
        </div>
      </div>

      <div className="hero-image">
        <img src={heroImg} alt="Inventory Management" />
      </div>
    </section>
  );
};

const NumberText = ({ num, text }) => {
  return (
    <div className="--mr">
      <h3 className="--color-white">{num}</h3>
      <p className="--color-white">{text}</p>
    </div>
  );
};

export default Home;
