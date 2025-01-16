// Detail.js
import React from 'react';
import { Stack, Typography, Box } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PeopleIcon from '@mui/icons-material/People';

const Detail = ({ recipeDetail }) => {
  const {
    name,
    cook_time_minutes,
    num_servings,
    thumbnail_url,
    description,
    instructions = [],
    sections = []
  } = recipeDetail;

  const ingredients = sections.flatMap(section => section.components || []);

  return (
    <Stack gap={4} sx={{ flexDirection: { lg: 'row' }, p: 4, alignItems: 'flex-start' }}>
      {/* Left side - Image */}
      <Box sx={{ maxWidth: { lg: '50%' }, width: '100%' }}>
        <img 
          src={thumbnail_url} 
          alt={name}
          style={{
            width: '100%',
            maxHeight: '500px',
            objectFit: 'cover',
            borderRadius: '8px'
          }}
        />
        
        <Stack direction="row" gap={4} mt={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ffd700', p: 2, borderRadius: '8px' }}>
            <AccessTimeIcon />
            <Typography>{cook_time_minutes || 0} minutes</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#ffd700', p: 2, borderRadius: '8px' }}>
            <PeopleIcon />
            <Typography>{num_servings || 0} servings</Typography>
          </Box>
        </Stack>
      </Box>

      {/* Right side - Recipe Details */}
      <Stack sx={{ maxWidth: { lg: '50%' }, width: '100%' }} gap={3}>
        <Typography variant="h4" fontWeight="bold">
          {name}
        </Typography>

        {description && (
          <Typography variant="body1">
            {description}
          </Typography>
        )}

        {/* Ingredients */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Ingredients
          </Typography>
          {ingredients.map((item, index) => (
            <Typography key={index} variant="body1" mb={1}>
              • {item.raw_text}
            </Typography>
          ))}
        </Box>

        {/* Instructions */}
        <Box>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Instructions
          </Typography>
          {instructions.map((instruction, index) => (
            <Box key={index} mb={2}>
              <Typography variant="body1">
                <strong>{index + 1}.</strong> {instruction.display_text}
              </Typography>
            </Box>
          ))}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Detail;




