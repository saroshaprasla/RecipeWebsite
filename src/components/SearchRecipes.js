import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchRecipes = ({ setRecipes, list, setList }) => {
  const [search, setSearch] = useState("");

  // Define meal categories
  const mealCategories = [
    "breakfast",
    "lunch",
    "dinner",
    "desserts",
    "drinks",
    "snacks"
  ];

  const handleSearch = async () => {
    if (search) {
      const recipeOptions = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '193af496famshd53dbfc9801ee71p12b3e3jsn2593c500ab6f',
          'x-rapidapi-host': 'tasty.p.rapidapi.com'
        }
      };

      try {
        const response = await fetch(
          `https://tasty.p.rapidapi.com/recipes/list?from=0&size=10&q=${search}`,
          recipeOptions
        );
        const data = await response.json();
        setRecipes(data.results || []);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    }
  };

  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="49px"
        textAlign="center"
      >
        Essential recipes <br /> for every food lover.
      </Typography>
      <Box position="relative" mb="72px">
        <input
          style={{
            height: "76px",
            fontSize: "18px",
            borderRadius: "4px",
            border: "none",
            outline: "none",
            width: "700px",
            backgroundColor: "#fff",
            paddingLeft: "20px"
          }}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Recipes"
          type="text"
        />
        <button
          className="search-btn"
          style={{
            backgroundColor: "#FF2625",
            color: "#fff",
            width: "173px",
            height: "56px",
            fontSize: "20px",
            border: "none",
            borderRadius: "4px",
            position: "absolute",
            right: "0px",
            top: "10px"
          }}
          onClick={handleSearch}
        >
          Search
        </button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar 
          data={mealCategories}
          list={list}
          setList={setList}
          isLists={true}
        />
      </Box>
    </Stack>
  );
};

export default SearchRecipes;

