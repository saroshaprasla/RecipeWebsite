import React, { useState } from "react";
import { Box } from "@mui/material";

import Recipes from "../components/Recipes";
import SearchRecipes from "../components/SearchRecipes";
import HeroBanner from "../components/HeroBanner";

const Home = () => {
  const [list, setList] = useState("all");
  const [recipes, setRecipes] = useState([]);

  console.log(list)

  return (
    <Box>
      <HeroBanner />
      <SearchRecipes setRecipes={setRecipes} list={list} setList={setList} />
     <Recipes recipes={recipes} setRecipes={setRecipes} list={list} />
     
    </Box>
  );
};

export default Home;
