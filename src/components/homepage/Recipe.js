import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./Recipe.css";
import Aos from "aos";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import { Button, Col, Row, message } from "antd";
import { Input, Search } from "antd";
import { useNavigate } from "react-router-dom";
import Navbar from "../../navbar/Navbar";
const APP_ID = "a52b4d43";
const APP_KEY = "e0e5c667605f5e91d8275c973531b80a";

const RecipeComponent = (props) => {
  // console.log(props);

  const navigate = useNavigate();

  const [show, setShow] = useState("");

  const { label, image, ingredients, url, dishType } = props.recipe;

  return (
    <div className="RecipeContainer">
      <Dialog
        onClose={() => console.log("adsadad")}
        aria-labelledby="simple-dialog-title"
        open={!!show}
      >
        <DialogTitle>Ingredients</DialogTitle>
        <DialogContent>
          <div className="RecipeName">{label}</div>

          <table>
            <thead>
              <th>Ingredient</th>
              <th>Weight</th>
            </thead>
            <tbody>
              {ingredients.map((ingredient, index) => (
                <tr key={index} className="ingredient-list">
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
                  image: props?.recipe?.image,
                  calories: props?.recipe?.calories,
                  ingredients: props?.recipe?.ingredients,
                  label: props?.recipe?.label,
                  totalWeight: props?.recipe?.totalWeight,
                  healthLabel: props?.recipe?.healthLabels,
                },
              })
            }
          >
            See More
          </div>
          <div className="close" onClick={() => setShow("")}>
            Close
          </div>
        </DialogActions>
      </Dialog>
      <img className="CoverImage" src={image} alt={label} />
      <div className="RecipeName">
        {label.charAt(0).toUpperCase() + label.slice(1)}
      </div>
      <div className="DishType">
        {dishType[0].charAt(0).toUpperCase() + dishType[0].slice(1)}
      </div>

      <div className="IngredientsText" onClick={() => setShow(!show)}>
        Ingredients
      </div>

      <div
        className="SeeMore"
        onClick={() =>
          navigate("/recipeinfo", {
            state: {
              image: props?.recipe?.image,
              calories: props?.recipe?.calories,
              ingredients: props?.recipe?.ingredients,
              label: props?.recipe?.label,
              totalWeight: props?.recipe?.totalWeight,
              healthLabel: props?.recipe?.healthLabels,
              totalNutrients: props?.recipe?.totalNutrients,
              Yield: props?.recipe?.yield,
              totalTime: props?.recipe?.totalTime,
            },
          })
        }
      >
        See Complete Recipe
      </div>
      <div
        className="favorite"
        onClick={() => {
          props.addToFavorites();
        }}
      >
        Add To Favorite
      </div>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const { Search } = Input;
  const [favoriteRecipes, setFavoriteRecipes] = useState(() => {
    const storedRecipes = localStorage.getItem("favoriteRecipes");
    return storedRecipes ? JSON.parse(storedRecipes) : [];
  });
  const [activeTab, setActiveTab] = useState("All");
  const [searchQuery, updateSearchQuery] = useState("");
  const [recipeList, updateRecipeList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [totalRecipeCount, setTotalRecipeCount] = useState(0);
  // console.log(totalRecipeCount);
  const resultsPerPage = 12;

  const [selectedMealType, setSelectedMealType] = useState(null);

  const [timeoutId, updateTimeoutId] = useState();
  const fetchData = async (searchString, page = 0) => {
    const from = page * resultsPerPage;
    const to = (page + 1) * resultsPerPage;
    const response = await Axios.get(
      `https://api.edamam.com/search?q=${searchString}&app_id=${APP_ID}&app_key=${APP_KEY}&from=${from}&to=${to}`
    );

    setTotalRecipeCount(response.data.count);
    updateRecipeList(response.data.hits);
  };

  const goToNextPage = () => {
    // console.log("Going to next page");
    setCurrentPage(currentPage + 1);
  };
  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  useEffect(() => {
    fetchData(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  useEffect(() => {
    // console.log("Updated favoriteRecipes:", favoriteRecipes);
    localStorage.setItem("favoriteRecipes", JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const onTextChange = (e) => {
    clearTimeout(timeoutId);
    const value = e.target.value.toString();
    updateSearchQuery(value);
    const timeout = setTimeout(() => {
      if (e.target.value === "") {
        fetchData();
      } else {
        fetchData(e.target.value);
      }
    }, 500);
    updateTimeoutId(timeout);
  };
  const FilterData = () => {
    if (selectedMealType) {
      const filteredRecipes = recipeList.filter((data) =>
        data.recipe.mealType.includes(selectedMealType)
      );
      return filteredRecipes;
    } else {
      return recipeList;
    }
  };
  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const addToFavorites = (recipe) => {
    if (
      !favoriteRecipes.some((favRecipe) => favRecipe.label === recipe.label)
    ) {
      setFavoriteRecipes([...favoriteRecipes, recipe]);
      message.success("Successfully Added To Favorites");
    } else {
      message.error("Item Is Already Present In Your Favorites");
      return;
    }
  };
  useEffect(() => {
    Aos.init({
      duration: 1500,
    });
  }, []);
  return (
    <div className="container1">
      <Navbar />

      <Row justify="center">
        <div className="TabContainer">
          <Col lg={4} md={8} sm={24} xs={24}>
            {" "}
            <div
              className={`Tab ${activeTab === "All" ? "ActiveTab" : ""}`}
              onClick={() => {
                setSelectedMealType(null);
                setActiveTab("All");
              }}
            >
              All
            </div>
          </Col>
          <Col lg={4} md={8} sm={24} xs={24}>
            {" "}
            <div
              className={`Tab ${activeTab === "breakfast" ? "ActiveTab" : ""}`}
              onClick={() => {
                setSelectedMealType("breakfast");
                setActiveTab("breakfast");
              }}
            >
              BreakFast
            </div>
          </Col>
          <Col lg={4} md={8} sm={24} xs={24}>
            <div
              className={`Tab ${
                activeTab === "lunch/dinner" ? "ActiveTab" : ""
              }`}
              onClick={() => {
                setSelectedMealType("lunch/dinner");
                setActiveTab("lunch/dinner");
              }}
            >
              Lunch/Dinner
            </div>
          </Col>
          <Col lg={4} md={8} sm={24} xs={24}>
            {" "}
            <div className="total">
              Total Recipes :- {""}
              {totalRecipeCount}
            </div>
          </Col>
          <Col lg={4} md={8} sm={24} xs={24}>
            {" "}
            <div className="total">
              <Button onClick={() => navigate("/favorite")} className="button">
                Favorite
              </Button>
            </div>
          </Col>
          <Col lg={4} md={8} sm={24} xs={24}>
            {" "}
            <Search
              className="SearchInput"
              allowClear
              placeholder="Search Recipe"
              value={searchQuery}
              onChange={onTextChange}
            />
          </Col>
        </div>
      </Row>

      <div className="RecipeList">
        {FilterData()?.length ? (
          FilterData().map((recipe, index) => {
            {
              {
                {
                  /* console.log(recipe);  */
                }
              }
            }
            return (
              <>
                <RecipeComponent
                  key={index}
                  recipe={recipe.recipe}
                  addToFavorites={() => addToFavorites(recipe.recipe)}
                />
                {/* <Favorite favorite={favoriteRecipes} /> */}
              </>
            );
          })
        ) : (
          <div className="CenterMessage">No Recipes Found</div>
        )}
      </div>
      <div className="ButtonContainer">
        {totalRecipeCount > resultsPerPage && (
          <>
            <div className="StyledButton" onClick={goToPreviousPage}>
              Previous Page
            </div>
            <div className="StyledButton" onClick={goToNextPage}>
              Next Page
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomePage;
