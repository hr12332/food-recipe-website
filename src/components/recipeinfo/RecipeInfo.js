import { Col, Row } from "antd";
import React from "react";
import { useLocation } from "react-router-dom";
import "./info.css";
import { AiFillPushpin } from "react-icons/ai";
import { BsPatchCheck } from "react-icons/bs";
import Navbar from "../../navbar/Navbar";
const RecipeInfo = () => {
  const location = useLocation();

  const {
    image,
    label,
    calories,
    ingredients,
    totalWeight,
    healthLabel,
    totalTime,
    Yield,
  } = location.state;
  // console.log(location);

  const data = [
    ["Name", "Description"],
    ["calories", calories],
    ["totalWeight", totalWeight],
  ];
  const options = {
    title: "Ingredients Description",
    is3D: true,
  };

  return (
    <>
      <Navbar />
      <div className="info-container">
        <div className="image-container">
          <img src={image} alt={label} className="image" />
          <div className="label-overlay">{label}</div>
        </div>
        <div className="tab_rows">
          <Row>
            <Col lg={8} md={12} sm={24} xs={24}>
              <div className="info">
                <div className="value">{Math.round(calories.toFixed(2))}</div>
                <div className="label">CALORIES</div>
              </div>
            </Col>
            <Col lg={8} md={12} sm={24} xs={24}>
              <div className="info1">
                <div className="value">{totalTime}</div>
                <div className="label">TOTAL TIME</div>
              </div>
            </Col>
            <Col lg={8} md={12} sm={24} xs={24}>
              <div className="info2">
                <div className="value">{Yield}</div>
                <div className="label">SERVINGS</div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="combine_label_ingredients">
          <Row>
            <Col lg={12} md={24} sm={24} xs={24}>
              {" "}
              <div className="ingredients_container">
                <p className="ingredients_heading">Ingredients</p>
                <div className="list_container">
                  {ingredients.map((data, index) => {
                    return (
                      <li key={index} className="ingredientsList">
                        <AiFillPushpin className="pushpin_icon" />
                        {data.text}
                      </li>
                    );
                  })}
                </div>
              </div>
            </Col>
            <Col lg={12} md={24} sm={24} xs={24}>
              {" "}
              <div className="health_container">
                <p className="health_heading">Health Labels</p>
                <div className="health_list">
                  <Row>
                    {healthLabel.map((label) => {
                      return (
                        <>
                          <Col lg={6} md={12} sm={24} xs={24}>
                            <div className="label_container">
                              <BsPatchCheck />
                              {label}
                            </div>
                          </Col>
                        </>
                      );
                    })}
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default RecipeInfo;
