import React, { useState } from "react";
import { Box } from "@mui/material";

import Recipes from "../components/Recipes";
import SearchRecipes from "../components/SearchRecipes";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const [list, setList] = useState("all");
  const [recipes, setRecipes] = useState([]);

  return (
    <Box>
      <HeroBanner />
      <SearchRecipes setRecipes={setRecipes} list={list} setList={setList} />
      <Recipes setRecipes={setRecipes} list={list} recipes={recipes} />
    </Box>
  );
};

export default Home;
