import React from 'react';
import { Typography, Box, Stack } from '@mui/material';
import HorizontalScrollbar from './HorizontalScrollbar';
import Loader from './Loader';

const SimilarRecipes = ({ targetIngrediantRecipes }) => (
  <Box sx={{ mt: { lg: '100px', xs: '0px' } }}>
    <Typography 
      sx={{ 
        fontSize: { lg: '44px', xs: '25px' }, 
        ml: '20px' 
      }} 
      fontWeight={700} 
      color="#000" 
      mb="33px"
    >
      More recipes with similar <span style={{ color: '#FF2625', textTransform: 'capitalize' }}>ingredients</span>
    </Typography>
    <Stack direction="row" sx={{ p: 2, position: 'relative' }}>
      {targetIngrediantRecipes?.length !== 0 ? (
        <HorizontalScrollbar 
          data={targetIngrediantRecipes} 
          isLists={false}
        />
      ) : (
        <Loader />
      )}
    </Stack>
  </Box>
);

export default SimilarRecipes;






