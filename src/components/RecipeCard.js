import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const RecipeCard = ({ recipe }) => {
  return (
    <Link className="recipeCard " to={"/recipe/${recipe.id}"}>
      <img src={recipe.gifurl} alt={recipe.name} loading="lazy" />
    </Link>
  );
};

export default RecipeCard;
