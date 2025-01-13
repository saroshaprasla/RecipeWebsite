
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { baseOptions, fetchData } from '../utils/fetchData';

import Detail from '../components/Detail';
import Recentarticles from '../components/RecentArticles';
import SimilarRecipes from '../components/SimilarRecipes';

const RecipeDetail = () => {
  const [recipeDetail, setRecipeDetail] = useState(null);
  const [recipeVideos, setRecipeVideos] = useState([]);
  const [similarRecipes, setSimilarRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchRecipeData = async () => {
      setIsLoading(true);
      setError(null);

      console.log('Fetching recipe with ID:', id);
      console.log('Using baseOptions:', baseOptions);

      try {
        // Try getting the recipe directly first
        const directRecipeResponse = await fetchData(
          `https://tasty.p.rapidapi.com/recipes/get-more-info`,
          {
            ...baseOptions,
            params: {
              id: id
            }
          }
        );

        console.log('Direct recipe response:', directRecipeResponse);

        if (directRecipeResponse) {
          setRecipeDetail(directRecipeResponse);

          // Get similar recipes if we have the recipe
          try {
            const similarResponse = await fetchData(
              'https://tasty.p.rapidapi.com/recipes/list',
              {
                ...baseOptions,
                params: {
                  from: '0',
                  size: '3',
                  tags: directRecipeResponse.tags?.[0]?.name || 'main course'
                }
              }
            );
            console.log('Similar recipes response:', similarResponse);
            setSimilarRecipes(similarResponse?.results || []);
          } catch (similarError) {
            console.error('Error fetching similar recipes:', similarError);
          }

          // Get YouTube videos
          try {
            const youtubeResponse = await fetchData(
              'https://youtube-search-and-download.p.rapidapi.com/search',
              {
                method: 'GET',
                headers: {
                  'x-rapidapi-key': baseOptions.headers['x-rapidapi-key'],
                  'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
                },
                params: {
                  query: `${directRecipeResponse.name} recipe cooking`
                }
              }
            );
            console.log('YouTube response:', youtubeResponse);
            setRecipeVideos(youtubeResponse?.contents || []);
          } catch (videoError) {
            console.error('Error fetching videos:', videoError);
          }
        } else {
          throw new Error('Recipe not found in direct lookup');
        }
      } catch (mainError) {
        console.error('Main error fetching recipe:', mainError);
        
        // Fallback to list endpoint if direct lookup fails
        try {
          console.log('Trying fallback to list endpoint');
          const listResponse = await fetchData(
            'https://tasty.p.rapidapi.com/recipes/list',
            {
              ...baseOptions,
              params: {
                from: '0',
                size: '1',
                id: id
              }
            }
          );
          
          console.log('List response:', listResponse);
          
          if (listResponse?.results?.[0]) {
            setRecipeDetail(listResponse.results[0]);
          } else {
            setError('Recipe not found');
          }
        } catch (fallbackError) {
          console.error('Fallback error:', fallbackError);
          setError('Recipe not found');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchRecipeData();
    }
  }, [id]);

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <Typography color="error" variant="h4">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!recipeDetail) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="60vh"
      >
        <Typography variant="h4">
          Recipe not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ mt: { lg: '96px', xs: '60px' } }}>
      <Detail recipeDetail={recipeDetail} />
      {recipeVideos.length > 0 && (
        <Recentarticles
          articles={Recentarticles} 
          name={recipeDetail.name} 
        />
      )}
      {similarRecipes.length > 0 && (
        <SimilarRecipes 
          recipes={similarRecipes}
          category={recipeDetail.tags?.[0]?.name || 'Related Recipes'} 
        />
      )}
    </Box>
  );
};

export default RecipeDetail;