import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { Box, Stack, Typography } from "@mui/material/";

import { recipeOptions, fetchData } from "../utils/fetchData";
import RecipeCard from "./RecipeCard";

const Recipes = ({ recipes, setRecipes, list }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 10;

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: 'smooth'})
  }

  // Add this useEffect for category filtering
  useEffect(() => {
    const fetchRecipesByCategory = async () => {
      try {
        const options = {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
            'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
          }
        };

        let url;
        if (list === 'all') {
          url = 'https://tasty.p.rapidapi.com/recipes/list';
        } else {
          url = `https://tasty.p.rapidapi.com/recipes/list?tags=${list.toLowerCase()}`;
        }

        const data = await fetchData(url, options);
        if (data?.results) {
          setRecipes(data.results);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipesByCategory();
  }, [list, setRecipes]);

  return (
    <Box id="recipes" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
      <Typography variant="h3" mb="46px">
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "110px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentRecipes.map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </Stack>
      <Stack mt="100px" alignItems="center" >
        {recipes.length > 9 && (
          <Pagination 
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(recipes.length / recipesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Recipes;

// import React, { useEffect, useState } from "react";
// import Pagination from "@mui/material/Pagination";
// import { Box, Stack, Typography } from "@mui/material/";

// import { recipeOptions, fetchData } from "../utils/fetchData";
// import RecipeCard from "./RecipeCard";

// const Recipes = ({ recipes, setRecipes, list }) => {
  
// const [currentPage, setCurrentPage] = useState(1);
// const recipesPerPage = 10;

// const indexOfLastRecipe = currentPage * recipesPerPage;
// const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
// const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

// const paginate = (e, value) => {
//   setCurrentPage(value);
//   window.scrollTo({ top: 1800, behavior: 'smooth'})

// }

//   return (
//     <Box id="recipes" sx={{ mt: { lg: "110px" } }} mt="50px" p="20px">
//       <Typography variant="h3" mb="46px">
//         Showing Results
//       </Typography>
//       <Stack
//         direction="row"
//         sx={{ gap: { lg: "110px", xs: "50px" } }}
//         flexWrap="wrap"
//         justifyContent="center"
//       >
//         {currentRecipes.map((recipe, index) => (
//           <RecipeCard key={index} recipe={recipe} />
//         ))}
//       </Stack>
//       <Stack mt="100px" alignItems="center" >
//         {recipes.length > 9 && (
//           <Pagination 
//           color="standard"
//           shape="rounded"
//           defaultPage={1}
//           count={Math.ceil(recipes.length / recipesPerPage)}
//           page={currentPage}
//           onChange={ paginate }
//           size="large"
//           />
//         )}
//       </Stack>
//     </Box>
//   );
// };

// export default Recipes;
