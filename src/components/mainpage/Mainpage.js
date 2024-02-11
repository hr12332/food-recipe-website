import React from "react";
import "./mainpage.css";

import Navbar from "../../navbar/Navbar";
import { useNavigate } from "react-router-dom";
const Mainpage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />
      <div className="main_container">
        OUR RECIPES
        <div className="our_recipes" onClick={() => navigate("/recipe ")}>
          EXPLORE NOW
        </div>
      </div>
    </>
  );
};

export default Mainpage;
