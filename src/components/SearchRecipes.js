

import React, { useEffect, useState } from "react";
import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { searchOptions, recipeListOptions, fetchData } from "../utils/fetchData";
import HorizontalScrollbar from "./HorizontalScrollbar";

const SearchRecipes = ({ setRecipes, list, setList }) => {
  const [search, setSearch] = useState("");
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipeCategories = async () => {
      try {
        // Start with default categories
        const defaultCategories = ["all", "breakfast", "lunch", "dinner"];
        setLists(defaultCategories);

        const response = await fetchData(
          "https://tasty-api1.p.rapidapi.com/recipes/list",
          recipeListOptions
        );
        
        if (response?.results) {
          setRecipes(response.results);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
        setError("Failed to load recipes. Please try again later.");
      }
    };

    fetchRecipeCategories();
  }, [setRecipes]);

  const handleSearch = async () => {
    if (!search.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const options = {
        ...searchOptions,
        params: {
          ...searchOptions.params,
          q: search.trim(),
        },
      };

      
      const response = await fetchData(
        "https://tasty-api1.p.rapidapi.com/recipes/list",  // Updated URL to include "api1"
        options
      );

      if (response?.results) {
        setRecipes(response.results);
      } else {
        setRecipes([]);
        setError("No recipes found. Try a different search term.");
      }
    } catch (error) {
      console.error("Error searching recipes:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
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
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search Recipes"
          type="text"
          disabled={isLoading}
          error={!!error}
          helperText={error}
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
            "&:disabled": {
              bgcolor: "#cccccc",
            },
          }}
          onClick={handleSearch}
          disabled={isLoading || !search.trim()}
        >
          {isLoading ? "Searching..." : "Search"}
        </Button>
      </Box>
      {error && (
        <Typography color="error" mb={2}>
          {error}
        </Typography>
      )}
      <Box sx={{ position: "relative", width: "100%", p: "20px" }}>
        <HorizontalScrollbar data={lists} list={list} setList={setList} />
      </Box>
    </Stack>
  );
};

export default SearchRecipes;