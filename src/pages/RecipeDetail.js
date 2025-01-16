import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';

import Detail from '../components/Detail';
import RecipeVideos from '../components/RecipeVideos';
import SimilarRecipes from '../components/SimilarRecipes';

const RecipeDetail = () => {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [recipeVideos, setRecipeVideos] = useState([]);
  const [targetIngrediantRecipes, setTargetIngrediantRecipes] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeData = async () => {
      try {
        const recipeOptions = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '193af496famshd53dbfc9801ee71p12b3e3jsn2593c500ab6f',
            'x-rapidapi-host': 'tasty.p.rapidapi.com'
          }
        };

        // Fetch current recipe details
        const recipeDetailData = await fetch(
          `https://tasty.p.rapidapi.com/recipes/get-more-info?id=${id}`,
          recipeOptions
        ).then(res => res.json());

        setRecipeDetail(recipeDetailData);

        // Get main ingredients - take up to 3 main ingredients
        const mainIngredients = recipeDetailData.sections?.[0]?.components
          ?.slice(0, 3)
          ?.map(comp => comp.ingredient?.name)
          ?.filter(Boolean);

        // Fetch similar recipes based on ingredients
        if (mainIngredients?.length) {
          const similarResponse = await fetch(
            `https://tasty.p.rapidapi.com/recipes/list?from=0&size=12&q=${mainIngredients.join(' ')}`,
            recipeOptions
          ).then(res => res.json());

          const filteredIngredientRecipes = similarResponse.results
            ?.filter(recipe => recipe.id !== parseInt(id))
            ?.slice(0, 4);

          setTargetIngrediantRecipes(filteredIngredientRecipes || []);
        }

        // Fetch YouTube videos
        const searchTerm = `${recipeDetailData.name} recipe`;
        const youtubeOptions = {
          method: 'GET',
          headers: {
            'x-rapidapi-key': '193af496famshd53dbfc9801ee71p12b3e3jsn2593c500ab6f',
            'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
          }
        };

        const videoResponse = await fetch(
          `https://youtube-search-and-download.p.rapidapi.com/search?query=${encodeURIComponent(searchTerm)}`,
          youtubeOptions
        ).then(res => res.json());

        setRecipeVideos(videoResponse.contents || []);

      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  if (!recipeDetail) return <div>Loading...</div>;

  return (
    <Box>
      <Detail recipeDetail={recipeDetail} />
      <RecipeVideos recipeVideos={recipeVideos} name={recipeDetail.name} />
      <SimilarRecipes 
        targetIngrediantRecipes={targetIngrediantRecipes}
      />
    </Box>
  );
};

export default RecipeDetail;





