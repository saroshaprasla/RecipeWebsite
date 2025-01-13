import React from 'react';
import { Box, Typography } from '@mui/material';
import RecipeCard from './RecipeCard';

const SimilarRecipes = ({ recipes, category }) => {
  if (!recipes?.length) return null;

  return (
    <Box sx={{ mt: { lg: '50px', xs: '20px' } }}>
      <Typography 
        variant="h4" 
        mb={3}
        sx={{
          fontSize: '28px',
          fontWeight: 'bold',
          color: '#2d2d2d'
        }}
      >
        More {category} Recipes You May Like
      </Typography>

      <Box 
        sx={{ 
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr'
          },
          gap: '20px',
          justifyContent: 'center'
        }}
      >
        {recipes.slice(0, 3).map((recipe) => (
          <RecipeCard 
            key={recipe.id} 
            recipe={recipe}
          />
        ))}
      </Box>
    </Box>
  );
};


export default SimilarRecipes;