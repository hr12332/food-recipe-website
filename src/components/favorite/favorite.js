import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../homepage/Recipe.css";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { Col, Row, Button } from "antd";
import "../recipeinfo/info.css";
import Navbar from "../../navbar/Navbar";
import Aos from "aos";
const Favorite = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [show, setShow] = useState(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("favoriteRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  // console.log(favoriteRecipes);
  const removeFromFavorites = (index) => {
    const updatedFavorites = [...favoriteRecipes];
    updatedFavorites.splice(index, 1);
    setFavoriteRecipes(updatedFavorites);
  };
  useEffect(() => {
    // console.log("Updated favoriteRecipes:", favoriteRecipes);

    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  if (favoriteRecipes.length > 0) {
    return (
      <>
        <Navbar />
        <div className="favorite-container">
          <div className="back-button">
            <Button className="back" onClick={() => navigate("/recipe")}>
              Back
            </Button>
          </div>
          <div className="favoriteHeading">
            <p>Favorites</p>
          </div>
          <Row justify="center" gutter={[24,24]}>
            {favoriteRecipes.map((recipe, index) => (
              <Col lg={8} md={12} sm={24} xs={24} key={index}>
                <div className="RecipeContainer">
                  <img
                    className="CoverImage"
                    src={recipe.image}
                    alt={recipe.label}
                  />
                  <div className="RecipeName">
                    {recipe.label.charAt(0).toUpperCase() +
                      recipe.label.slice(1)}
                  </div>
                  <div className="DishType">
                    {recipe.dishType[0].charAt(0).toUpperCase() +
                      recipe.dishType[0].slice(1)}
                  </div>
                  <div
                    className="IngredientsText"
                    onClick={() => setShow(index)}
                  >
                    Ingredients
                  </div>
                  <div
                    className="SeeMore"
                    onClick={() =>
                      navigate("/recipeinfo", {
                        state: {
                          image: recipe?.image,
                          calories: recipe?.calories,
                          ingredients: recipe?.ingredients,
                          label: recipe?.label,
                          totalWeight: recipe?.totalWeight,
                          healthLabel: recipe?.healthLabels,
                          totalNutrients: recipe?.totalNutrients,
                        },
                      })
                    }
                  >
                    See Complete Recipe
                  </div>
                  <div
                    className="SeeMore"
                    onClick={() => removeFromFavorites(index)}
                  >
                    Remove From Favorite
                  </div>

                  <Dialog
                    onClose={() => setShow(null)}
                    aria-labelledby="simple-dialog-title"
                    open={show === index}
                  >
                    <DialogTitle>Ingredients</DialogTitle>
                    <DialogContent>
                      <div className="RecipeName">{recipe.label}</div>
                      <table>
                        <thead>
                          <th>Ingredient</th>
                          <th>Weight</th>
                        </thead>
                        <tbody>
                          {recipe.ingredients.map((ingredient, i) => (
                            <tr key={i} className="ingredient-list">
                              <td>{ingredient.text}</td>
                              <td>{ingredient.weight}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </DialogContent>
                    <DialogActions>
                      <div
                        className="SeeNewTab"
                        onClick={() =>
                          navigate("/recipeinfo", {
                            state: {
                              image: recipe?.image,
                              calories: recipe?.calories,
                              ingredients: recipe?.ingredients,
                              label: recipe?.label,
                              totalWeight: recipe?.totalWeight,
                              healthLabel: recipe?.healthLabels,
                              totalNutrients: recipe?.totalNutrients,
                            },
                          })
                        }
                      >
                        See More
                      </div>
                      <div className="close" onClick={() => setShow(null)}>
                        Close
                      </div>
                    </DialogActions>
                  </Dialog>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </>
    );
  } else {
    return (
      <div className="favorite-container">
        <div className="back-button">
          <Button className="back" onClick={() => navigate("/homepage")}>
            Back
          </Button>
        </div>
        <div className="favoriteHeading">
          <p>Favorites</p>
        </div>{" "}
        <div className="CenterMessage">Your Favorite Is Empty</div>
      </div>
    );
  }
};

export default Favorite;
