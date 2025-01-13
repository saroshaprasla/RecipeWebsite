import React from 'react';
import { Typography, Stack, Button, Box } from '@mui/material';

const Detail = ({ recipeDetail }) => {
  const { 
    name, 
    description,
    instructions,
    sections,
    total_time_minutes,
    num_servings,
    thumbnail_url,
    beauty_url
  } = recipeDetail;

  const imageUrl = beauty_url || thumbnail_url;

  // Extract ingredients from sections
  const ingredients = sections?.flatMap(section => 
    section.components?.map(component => component.raw_text)
  ) || [];

  // Format instructions if they're in steps
  const formattedInstructions = instructions?.map(instruction => 
    instruction.display_text || instruction
  ) || [];

  return (
    <Stack gap="60px" sx={{ flexDirection: { lg: 'row' }, p: '20px', alignItems: 'center' }}>
      <img 
        src={imageUrl} 
        alt={name} 
        loading="lazy" 
        className="detail-image" 
        style={{ 
          width: '400px', 
          height: '400px', 
          objectFit: 'cover',
          borderRadius: '20px'
        }} 
      />
      
      <Stack sx={{ gap: { lg: '35px', xs: '20px' } }}>
        <Typography variant="h3" textTransform="capitalize">
          {name}
        </Typography>
        
        {description && (
          <Typography variant="h6">
            {description}
          </Typography>
        )}

        <Stack direction="row" gap="24px" alignItems="center">
          {total_time_minutes && (
            <Button
              sx={{
                background: '#ffa9a9',
                borderRadius: '20px',
                textTransform: 'capitalize',
                color: 'white'
              }}
            >
              Cook Time: {total_time_minutes} mins
            </Button>
          )}
          {num_servings && (
            <Button
              sx={{
                background: '#fcc757',
                borderRadius: '20px',
                textTransform: 'capitalize',
                color: 'white'
              }}
            >
              Servings: {num_servings}
            </Button>
          )}
        </Stack>

        {ingredients.length > 0 && (
          <>
            <Typography variant="h5" mt={2}>
              Ingredients:
            </Typography>
            <Box>
              {ingredients.map((item, index) => (
                <Typography key={index} variant="body1" sx={{ marginY: '5px' }}>
                  • {item}
                </Typography>
              ))}
            </Box>
          </>
        )}

        {formattedInstructions.length > 0 && (
          <>
            <Typography variant="h5" mt={2}>
              Instructions:
            </Typography>
            <Box>
              {formattedInstructions.map((step, index) => (
                <Typography key={index} variant="body1" mb={2}>
                  {index + 1}. {step}
                </Typography>
              ))}
            </Box>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default Detail;