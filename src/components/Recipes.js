import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material/";

import { recipeOptions, fetchData } from "../utils/fetchData";
import RecipeCard from "./RecipeCard";

const Recipes = ({ recipes, setRecipes, list }) => {
  console.log(recipes);
  return (
    <Box id="recipes" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {recipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </stack>
    </Box>
  );
};

export default Recipes;
