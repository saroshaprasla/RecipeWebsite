import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { recipeOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchRecipes = ({ setRecipes, list, setList }) => {
  const [search, setSearch] = useState("");
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetchData(
          "https://tasty.p.rapidapi.com/recipes/auto-complete",
          recipeOptions
          // "https://tasty.p.rapidapi.com/tags/list",
          // recipeOptions
        );
        console.log("Tags Response:", response); // Log the response

        if (response && response.results) {
          // Filter the tags to include only 'lunch', 'dinner', and 'breakfast'
          const selectedTags = response.results.filter((item) =>
            ["lunch", "dinner", "breakfast"].includes(item.name.toLowerCase())
          );
          console.log("Selected Tags:", selectedTags); // Log the filtered tags
          setLists(["all", ...selectedTags.map((tag) => tag.name)]);
        }
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchTags();
  }, []);

  // Handle the search functionality
  const handleSearch = async () => {
    if (search) {
      try {
        const response = await fetchData(
          "https://tasty.p.rapidapi.com/recipes/list",
          recipeOptions
        );
        console.log("Recipes Response:", response); // Log the response

        if (response && response.results) {
          const searchedRecipes = response.results.filter((recipe) =>
            recipe.name.toLowerCase().includes(search.toLowerCase())
          );
          console.log("Searched Recipes:", searchedRecipes); // Log the filtered recipes
          setRecipes(searchedRecipes);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }

      setSearch("");
    }
  };
  return (
    <Stack alignItems="center" mt="37px" justifyContent="center" p="20px">
      <Typography
        fontWeight={700}
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="50px"
        textAlign="center"
      >
        Essential recipes <br />
        for every food lover.
      </Typography>
      <Box position="relative" mb="72px">
        <TextField
          sx={{
            input: { fontWeight: "700", border: "none", borderRadius: "4px" },
            width: { lg: "800px", xs: "350px" },
            backgroundColor: "#fff",
            borderRadius: "40px",
          }}
          height="76px"
          value={search}
          onChange={(e) => setSearch(e.target.value.toLowerCase())}
          placeholder="Search Recipes"
          type="text"
        />
        <Button
          className="search-btn"
          sx={{
            bgcolor: "#006400",
            color: "#fff",
            textTransform: "none",
            width: { lg: "175px", xs: "80px" },
            fontSize: { lg: "20px", xs: "14px" },
            height: "56px",
            position: "absolute",
            right: "0",
          }}
          onClick={handleSearch}
        >
          Search
        </Button>
      </Box>
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar data={lists} list={list} setList={setList} />
      </Box>
    </Stack>
  );
};

export default SearchRecipes;
