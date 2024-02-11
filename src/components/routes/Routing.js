import React from "react";
import Login from "../login/Login";
import Recipe from "../homepage/Recipe";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "../signup/SignUp";
import Forgot from "../forgot/Forgot";
import RecipeInfo from "../recipeinfo/RecipeInfo";
import Favorite from "../favorite/favorite";
import Mainpage from "../mainpage/Mainpage";

const Routing = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot" element={<Forgot />} />
          <Route path="/recipe" element={<Recipe />} />
          <Route path="/recipeinfo" element={<RecipeInfo />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/homepage" element={<Mainpage />} />
  
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default Routing;
